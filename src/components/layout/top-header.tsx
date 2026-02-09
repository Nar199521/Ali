'use client';

import { useAppContext } from "@/context/AppContext";
import { ChevronDown, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function TopHeader() {
  const { country } = useAppContext();

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto flex justify-between items-center py-2 text-sm">
        <div className="flex items-center gap-4">
          <span>Follow us on:</span>
          <div className="flex gap-2">
            <Facebook className="h-5 w-5" />
            <Instagram className="h-5 w-5" />
            <Twitter className="h-5 w-5" />
            <Linkedin className="h-5 w-5" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`} width="20" alt={`${country.name} flag`} />
            <span>{country.name}</span>
            <span>({country.currency})</span>
          </div>
          <span>|</span>
          <span>Help</span>
        </div>
      </div>
    </div>
  );
}
