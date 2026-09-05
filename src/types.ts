export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'UGX' | 'KES' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateFromUSD: number; // multiplier against USD
  flag: string;
}

export interface DestinationItinerary {
  id: string;
  country: string;
  countryCode: string;
  flag: string;
  badge: string;
  title: string;
  subtitle?: string;
  image: string;
  highlights: string[];
  description: string;
  duration: string;
  lodgingType: string;
  specialFeature: string;
  departureSchedule: string;
  priceFromUSD: number;
  days: {
    day: number;
    title: string;
    description: string;
    meals?: string;
    accommodation?: string;
  }[];
  included: string[];
  notIncluded: string[];
}

export interface GroupDeparture {
  id: string;
  title: string;
  route: string;
  startDate: string;
  endDate: string;
  days: number;
  priceUSD: number;
  maxGroupSize: number;
  spotsLeft: number;
  badge: string;
  highlights: string[];
  status: 'Guaranteed' | 'Filling Fast' | 'Open';
}

export interface TestimonialItem {
  id: string;
  rating: number;
  quote: string;
  author: string;
  initials: string;
  location: string;
  safariType: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  location: string;
  category: string;
  imageUrl: string;
  caption: string;
  details?: string;
}

export interface BookingFormState {
  fullName: string;
  email: string;
  phone: string;
  destinations: string[];
  travelers: number;
  estimatedDate: string;
  safariStyle: 'private' | 'group' | 'luxury-fly-in' | 'conservation-focused';
  budgetLevel: 'Standard' | 'Mid-Range' | 'Luxury' | 'Ultra-Bespoke';
  needsFlights: boolean;
  notes: string;
}
