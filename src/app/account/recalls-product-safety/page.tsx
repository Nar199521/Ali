'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecallsAndProductSafetyAlertsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Recalls and Product Safety Alerts</h1>
      <Card>
        <CardHeader>
          <CardTitle>Important Safety Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-20 text-muted-foreground">There are no current recalls or product safety alerts.</p>
        </CardContent>
      </Card>
    </div>
  );
}
