'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SuggestionPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Suggestions</h1>
      <Card>
        <CardHeader>
          <CardTitle>Share Your Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">We value your feedback! Please share any suggestions you have to help us improve.</p>
          <Textarea placeholder="Enter your suggestion here..." className="mb-4" />
          <Button>Submit Suggestion</Button>
        </CardContent>
      </Card>
    </div>
  );
}
