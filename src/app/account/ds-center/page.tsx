'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DSCenterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">DS Center</h1>
      <Card>
        <CardHeader>
          <CardTitle>DS Center Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-20 text-muted-foreground">DS Center is coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
