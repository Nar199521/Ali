'use client';

import * as React from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export function FilterSidebar() {
  const { 
    priceRange, setPriceRange, 
    rating, setRating, 
    deals, setDeals, 
    clearFilters 
  } = useSidebar()

  const handleDealChange = (deal: string) => {
    const newDeals = deals.includes(deal)
      ? deals.filter((d) => d !== deal)
      : [...deals, deal]
    setDeals(newDeals)
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>Clear</Button>
      </div>

      <div>
        <h4 className="font-medium mb-2">Deals & Discounts</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="sale" checked={deals.includes('sale')} onCheckedChange={() => handleDealChange('sale')} />
            <Label htmlFor="sale">Sale</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="free-shipping" checked={deals.includes('free-shipping')} onCheckedChange={() => handleDealChange('free-shipping')} />
            <Label htmlFor="free-shipping">Free shipping</Label>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Quality & Trust</h4>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className={`cursor-pointer ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              onClick={() => setRating(star)}
            />
          ))}
          <span className="ml-2 text-sm text-gray-500">{rating} & up</span>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Price</h4>
        <div className="flex items-center gap-2">
          <Input 
            type="number" 
            placeholder="Min" 
            value={priceRange[0]} 
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])} 
          />
          <span>-</span>
          <Input 
            type="number" 
            placeholder="Max" 
            value={priceRange[1]} 
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])} 
          />
        </div>
      </div>
    </div>
  )
}
