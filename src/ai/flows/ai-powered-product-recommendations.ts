'use server';
/**
 * @fileOverview AI-powered product recommendations flow.
 *
 * This file defines a Genkit flow that provides product recommendations to customers
 * based on their browsing history and current cart.
 *
 * @exported
 * - `getProductRecommendations` -  A function that takes a customer's browsing history and current cart
 *    and returns a list of recommended products.
 * - `ProductRecommendationInput` - The input type for the getProductRecommendations function.
 * - `ProductRecommendationOutput` - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationInputSchema = z.object({
  browsingHistory: z
    .array(z.string())
    .describe('A list of product IDs representing the customer\'s browsing history.'),
  currentCart: z
    .array(z.string())
    .describe('A list of product IDs currently in the customer\'s cart.'),
  numberOfRecommendations: z.number().default(5).describe('The number of product recommendations to return.'),
});
export type ProductRecommendationInput = z.infer<typeof ProductRecommendationInputSchema>;

const ProductRecommendationOutputSchema = z.object({
  recommendedProducts: z.array(z.string()).describe('A list of product IDs that are recommended for the customer.'),
});
export type ProductRecommendationOutput = z.infer<typeof ProductRecommendationOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationInput): Promise<ProductRecommendationOutput> {
  return productRecommendationsFlow(input);
}

const productRecommendationsPrompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationInputSchema},
  output: {schema: ProductRecommendationOutputSchema},
  prompt: `You are an expert e-commerce product recommendation engine.

  Based on the customer's browsing history and current cart, recommend products that the customer might be interested in.
  Return only product IDs.

  Browsing History: {{browsingHistory}}
  Current Cart: {{currentCart}}
  Number of Recommendations: {{numberOfRecommendations}}

  Recommended Products:`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationInputSchema,
    outputSchema: ProductRecommendationOutputSchema,
  },
  async input => {
    const {output} = await productRecommendationsPrompt(input);
    return output!;
  }
);
