'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MessageCenterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Message Center</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-20 text-muted-foreground">
            You have no new messages.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
