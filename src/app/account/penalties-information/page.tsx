'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PenaltiesInformationPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Penalties Information</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Penalties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-20 text-muted-foreground">You have no penalties.</p>
        </CardContent>
      </Card>
    </div>
  );
}
