'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InviteFriendsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Invite Friends</h1>
      <Card>
        <CardHeader>
          <CardTitle>Invite Your Friends & Earn Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Share your referral link with your friends. When they sign up, you both get rewarded!</p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" value="https://example.com/invite?ref=12345" readOnly />
            <Button type="submit">Copy Link</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
