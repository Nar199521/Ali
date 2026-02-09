'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { formatPrice } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

const initialOrders = [
  { id: '12345', date: '2023-10-26', total: 120.50, status: 'Shipped', product: 'AC 220V 1CH 10...' },
  { id: '67890', date: '2023-10-22', total: 45.00, status: 'Processed', product: '4K WIFI 4G Secur...' },
  { id: '11223', date: '2023-10-15', total: 89.99, status: 'To pay', product: 'Usb DAC Type C...' },
  { id: '11224', date: '2023-11-01', total: 25.00, status: 'To ship', product: '2088 LED Display...' },
  { id: '11225', date: '2023-11-02', total: 50.00, status: 'Shipped', product: 'Automatic Electri...' },
];

const tabs = ['View all', 'To pay', 'To ship', 'Shipped', 'Processed'];

export default function AccountOrdersPage() {
  const { country } = useAppContext();
  const [activeTab, setActiveTab] = useState('View all');
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders
    .filter(order => activeTab === 'View all' || order.status === activeTab)
    .filter(order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Orders</h1>
            <Button variant="link" className="text-sm">Deleted orders</Button>
        </div>

        <div className="flex items-center space-x-4 border-b mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-1 py-2 text-sm font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      
        <div className="flex items-center mb-4 gap-2">
            <Select defaultValue="order">
                <SelectTrigger className="w-[120px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="order">Order</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                </SelectContent>
            </Select>
            <div className="relative flex-grow flex gap-0">
                <Input 
                    placeholder="Order ID, product or store name" 
                    className="rounded-r-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button className="rounded-l-none">
                    <Search className="h-5 w-5" />
                </Button>
            </div>
            <Select defaultValue="last-year">
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="last-year">Last year</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
            </Select>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="py-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">Order #{order.id}</CardTitle>
                    <span className="text-xs text-muted-foreground">{order.date}</span>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <div className="grid grid-cols-3 items-center">
                  <div className="col-span-2">
                    <p className="font-semibold">{order.product}</p>
                    <p className="text-sm text-muted-foreground">{formatPrice(order.total, country)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold mb-2">{order.status}</p>
                    <Button variant="outline" size="sm">Track Order</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
            <div className="mx-auto bg-gray-100 rounded-full h-20 w-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
            </div>
          <p className="mt-4 text-muted-foreground">No orders yet. Please switch account or feedback.</p>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">More to love</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
                <div className="w-48 flex-shrink-0">
                <Card>
                    <CardContent className="p-0">
                    <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-2">
                        <p className="font-semibold text-sm truncate">{product.name}</p>
                        <p className="text-primary font-bold">{formatPrice(product.price, country)}</p>
                        <p className="text-xs text-muted-foreground">{product.sold} sold</p>
                    </div>
                    </CardContent>
                </Card>
                </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
