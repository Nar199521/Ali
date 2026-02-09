'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/data';
import { ShieldCheck, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, country } = useAppContext();

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="bg-gray-100">
        <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Cart ({cart.length})</h1>
                    {cart.length > 0 && (
                        <Button variant="ghost" onClick={() => cart.forEach(item => removeFromCart(item.product.id))}>Remove all</Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {cart.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-xl mb-4">Your cart is empty.</p>
                        <Button asChild>
                            <Link href="/">Continue Shopping</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cart.map(item => (
                            <div key={item.product.id} className="flex items-center justify-between p-4 border rounded-md">
                                <div className="flex items-center gap-4">
                                    <Image src={item.product.imageUrls[0]} alt={item.product.name} width={96} height={96} className="rounded-md"/>
                                    <div>
                                        <p>{item.product.name}</p>
                                        <p className="text-lg font-bold">{formatPrice(item.product.price, country)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}>-</Button>
                                        <span>{item.quantity}</span>
                                        <Button size="sm" onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}>+</Button>
                                    </div>
                                    <Button variant="ghost" onClick={() => removeFromCart(item.product.id)}>
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Estimated total</span>
                <span className="font-bold text-lg">{formatPrice(subtotal, country)}</span>
              </div>
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white">Checkout ({cart.length})</Button>
              <div className="space-y-2">
                <h3 className="font-semibold">Pay with</h3>
                <div className="flex gap-2 mt-2 items-center">
                  <span className="border p-1 rounded">Visa</span>
                  <span className="border p-1 rounded">MasterCard</span>
                  <span className="border p-1 rounded">...</span>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-4">
                <ShieldCheck className="text-gray-400"/>
                <div>
                    <h3 className="font-semibold">Buyer protection</h3>
                    <p className="text-sm text-gray-500">Get a full refund if the item is not as described or not delivered</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">More to love</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.slice(0, 18).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
            <Button variant='outline'>View more</Button>
        </div>
      </div>
    </div>
    </div>
  );
}
