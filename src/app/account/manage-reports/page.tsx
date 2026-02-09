'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManageReportsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-20 text-muted-foreground">You have not submitted any reports.</p>
        </CardContent>
      </Card>
    </div>
  );
}
