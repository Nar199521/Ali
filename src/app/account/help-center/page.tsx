'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HelpCenterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Help Center</h1>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-20 text-muted-foreground">Help Center is coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
