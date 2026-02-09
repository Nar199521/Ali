'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { countries } from '@/lib/countries';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';

export function CountrySelector() {
  const { country, setCountry } = useAppContext();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="justify-start gap-2">
          <span className="text-2xl">{country.flag}</span>
          <span>{country.currency}</span>
          <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2">
        <ul className="space-y-1">
          {countries.map((c) => (
            <li key={c.code}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={() => setCountry(c)}
              >
                <span className="text-2xl">{c.flag}</span>
                <span>{c.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
