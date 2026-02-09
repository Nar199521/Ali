'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppContext } from '@/context/AppContext';
import { formatPrice } from '@/lib/utils';

export default function PaymentForm() {
  const { country, cart, clearCart } = useAppContext();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handlePayment = async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        address,
        cart: cart.map(item => ({ productId: item.product.id, quantity: item.quantity })),
      }),
    });

    if (response.ok) {
      const { orderId, paymentUrl } = await response.json();
      if (paymentUrl) {
        // Redirect user to ShurjoPay hosted payment page
        window.location.href = paymentUrl;
        return;
      }

      // Fallback: clear cart and navigate to success
      clearCart();
      router.push(`/checkout/success?orderId=${orderId}`);
    } else {
      console.error('Payment initiation failed');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="address">Shipping Address</Label>
          <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="font-bold text-lg">
          Total: {formatPrice(totalAmount, country)}
        </div>
        <Button onClick={handlePayment} className="w-full">
          Pay with ShurjoPay
        </Button>
      </CardContent>
    </Card>
  );
}
