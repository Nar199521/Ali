'use server';

/**
 * @fileOverview AI-powered search summarizer flow.
 *
 * This file defines a Genkit flow that takes a search query as input and returns a short summary of the search results.
 *
 * @remarks
 * - aiPoweredSearchSummarizer - The main function that triggers the flow.
 * - AiPoweredSearchSummarizerInput - The input type for the aiPoweredSearchSummarizer function.
 * - AiPoweredSearchSummarizerOutput - The output type for the aiPoweredSearchSummarizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPoweredSearchSummarizerInputSchema = z.object({
  query: z.string().describe('The search query to summarize.'),
  searchResults: z.string().describe('The raw search results from the e-commerce platform.'),
});
export type AiPoweredSearchSummarizerInput = z.infer<
  typeof AiPoweredSearchSummarizerInputSchema
>;

const AiPoweredSearchSummarizerOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the search results.'),
});
export type AiPoweredSearchSummarizerOutput = z.infer<
  typeof AiPoweredSearchSummarizerOutputSchema
>;

export async function aiPoweredSearchSummarizer(
  input: AiPoweredSearchSummarizerInput
): Promise<AiPoweredSearchSummarizerOutput> {
  return aiPoweredSearchSummarizerFlow(input);
}

const summarizeSearchPrompt = ai.definePrompt({
  name: 'summarizeSearchPrompt',
  input: {
    schema: AiPoweredSearchSummarizerInputSchema,
  },
  output: {
    schema: AiPoweredSearchSummarizerOutputSchema,
  },
  prompt: `You are an AI assistant summarizing search results from an e-commerce platform.
  The user searched for "{{query}}".
  Here are the search results:
  """
  {{searchResults}}
  """
  Provide a concise summary of the search results, highlighting key themes and relevant products.
  The summary should be no more than two sentences.
  `,
});

const aiPoweredSearchSummarizerFlow = ai.defineFlow(
  {
    name: 'aiPoweredSearchSummarizerFlow',
    inputSchema: AiPoweredSearchSummarizerInputSchema,
    outputSchema: AiPoweredSearchSummarizerOutputSchema,
  },
  async input => {
    const {output} = await summarizeSearchPrompt(input);
    return output!;
  }
);
