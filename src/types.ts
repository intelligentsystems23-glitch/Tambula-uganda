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
  destination: string;
  country: string;
  flag: string;
  route: string;
  startDate: string;
  endDate: string;
  departureTimestamp: number; // For live countdown calculation
  duration: string; // e.g. "3 Days", "5 Days", "2 Days"
  datesDisplay: string; // e.g. "10–12 Oct", "22–26 Nov", "Every Month"
  days: number;
  priceUSD: number;
  priceUGX?: number; // Optional local currency representation
  maxGroupSize: number;
  seatsBooked: number;
  spotsLeft: number;
  badge?: string;
  highlights: string[];
  status: 'Book Now' | 'Limited Seats' | 'Open' | 'Guaranteed' | 'Filling Fast';
  image: string;
  included: string[];
  notIncluded?: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    meals?: string;
    accommodation?: string;
  }[];
}

export interface FormerTripPhoto {
  id: string;
  url: string;
  caption: string;
}

export interface FormerTrip {
  id: string;
  title: string;
  destination: string;
  flag: string;
  dates: string;
  travelersCount: number;
  coverImage: string;
  galleryImages: string[];
  hasVideo?: boolean;
  videoUrl?: string;
  videoTitle?: string;
  summary: string;
  leadGuide: string;
  verifiedTestimonial?: {
    author: string;
    location: string;
    quote: string;
    rating: number;
  };
}

export interface GroupBookingSubmission {
  bookingRef: string;
  tripId: string;
  tripTitle: string;
  departureDate: string;
  fullName: string;
  email: string;
  phone: string;
  travelersCount: number;
  roomType: 'Twin Share' | 'Solo Room (+Supplement)';
  paymentMethod: 'MTN Mobile Money' | 'Airtel Money' | 'Credit/Debit Card' | 'Bank Transfer';
  totalAmountUSD: number;
  totalAmountFormatted: string;
  status: 'Confirmed' | 'Pending Verification';
  timestamp: string;
  notes?: string;
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
