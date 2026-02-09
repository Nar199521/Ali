'use client';

import PaymentForm from '@/components/payment-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <PaymentForm />
        </CardContent>
      </Card>
    </div>
  );
}
