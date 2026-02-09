'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ReturnsRefundsPage() {
  const [activeTab, setActiveTab] = useState('in-progress');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Returns/refunds</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab('in-progress')}
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'in-progress' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'}`}
          >
            In progress(0)
          </button>
          <button
            onClick={() => setActiveTab('awaiting-returns')}
            className={`py-2 px-4 text-sm font-medium ${activeTab === 'awaiting-returns' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'}`}
          >
            Awaiting returns(0)
          </button>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <Input placeholder="Order number" className="w-1/3" />
          <Input placeholder="Store name" className="w-1/3" />
          <Select>
            <SelectTrigger className="w-1/3">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-red-500 text-white">Search</Button>
        </div>
        <div className="border-t">
          <div className="flex justify-between py-2 text-sm text-gray-500">
            <span className="w-2/3">Order information</span>
            <span className="w-1/3">Current status</span>
          </div>
          <div className="text-center py-8 text-gray-500">
            No results for this term. Please try another.
          </div>
        </div>
      </div>
    </div>
  );
}
