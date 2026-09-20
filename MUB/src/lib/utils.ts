import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyUSD(val: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(val);
}

export function formatCurrencyIQD(val: number): string {
  return new Intl.NumberFormat('ar-IQ', {
    maximumFractionDigits: 0,
  }).format(val) + ' د.ع';
}
