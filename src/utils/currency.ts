import { CurrencyCode } from '../types';
import { CURRENCIES } from '../data/safariData';

export function formatPrice(amountInUSD: number, currencyCode: CurrencyCode): string {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = amountInUSD * currency.rateFromUSD;

  if (currencyCode === 'UGX' || currencyCode === 'KES') {
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
  }

  return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
}
