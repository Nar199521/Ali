
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Country } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') 
    .replace(/[^\w\-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatPrice(price: number, country?: Country) {
  const defaultLocale = 'bn-BD';
  const defaultCurrency = 'BDT';

  const locale = country?.locale || defaultLocale;
  const currency = country?.currency || defaultCurrency;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(price);
}
