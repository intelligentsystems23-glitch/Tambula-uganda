import { CurrencyCode, CurrencyConfig, DestinationItinerary, GalleryPhoto, GroupDeparture, TestimonialItem } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rateFromUSD: 1, flag: '🇺🇸' },
  EUR: { code: 'EUR', symbol: '€', rateFromUSD: 0.92, flag: '🇪🇺' },
  GBP: { code: 'GBP', symbol: '£', rateFromUSD: 0.79, flag: '🇬🇧' },
  UGX: { code: 'UGX', symbol: 'USh ', rateFromUSD: 3750, flag: '🇺🇬' },
  KES: { code: 'KES', symbol: 'KSh ', rateFromUSD: 130, flag: '🇰🇪' },
  AED: { code: 'AED', symbol: 'AED ', rateFromUSD: 3.67, flag: '🇦🇪' },
};

export const HERO_SLIDES = [
  {
    id: 'silverback-bwindi',
    regionTag: 'ANCIENT CLOUD FOREST',
    title: 'Silverback Mountain Gorillas',
    location: 'Bwindi Impenetrable National Park',
    countryTag: 'Bwindi Forest',
    imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=85',
    subCaption: 'Bwindi Impenetrable National Park',
    fact: 'Home to over half of the world’s remaining endangered mountain gorillas, sheltered under dense primary equatorial mist.',
  },
  {
    id: 'ishasha-lions',
    regionTag: 'SAVANNAH & SYCAMORE FIG',
    title: 'Tree-Climbing Lions of Ishasha',
    location: 'Queen Elizabeth National Park',
    countryTag: 'Ishasha Sector',
    imageUrl: 'https://images.unsplash.com/photo-1614027164847-1b28caa1440f?auto=format&fit=crop&w=1400&q=85',
    subCaption: 'Queen Elizabeth National Park',
    fact: 'One of only two distinct populations on Earth known for resting gracefully in towering sycamore fig and acacia branches.',
  },
  {
    id: 'murchison-nile',
    regionTag: 'VICTORIA NILE CORRIDOR',
    title: 'Murchison Falls Savanna Herds',
    location: 'Murchison Falls National Park',
    countryTag: 'Victoria Nile',
    imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1400&q=85',
    subCaption: 'Murchison Falls National Park',
    fact: 'Where the world’s longest river violently surges through a 7-meter gorge before nourishing dense herds of elephants and buffalo.',
  },
];

export const DESTINATIONS: DestinationItinerary[] = [
  {
    id: 'kenya-masai-mara',
    country: 'Kenya',
    countryCode: 'KE',
    flag: '🇰🇪',
    badge: 'KENYA',
    title: 'Masai Mara & Amboseli',
    subtitle: 'Great Migration & Kilimanjaro Vistas',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    highlights: ['🦁 Big Five Safari', '🦓 Great Migration'],
    description: "Witness the world's most spectacular wildlife theatre. Experience iconic lion prides across savannah horizons, view Mount Kilimanjaro from Amboseli, and soar above the Mara in hot air balloon safaris.",
    duration: '3 to 7 Days',
    lodgingType: 'Luxury Tented Camps',
    specialFeature: 'Migration Crossings',
    departureSchedule: 'Daily 4x4 Departures',
    priceFromUSD: 1850,
    days: [
      {
        day: 1,
        title: 'Nairobi to Masai Mara National Reserve',
        description: 'Morning scenic drive or scheduled bush flight across the Great Rift Valley into the Mara. Afternoon 4x4 game drive tracking big cats and sunset sundowner over the golden savannah.',
        meals: 'Lunch & Dinner included',
        accommodation: 'Governors’ Camp or Mara Serena Safari Lodge'
      },
      {
        day: 2,
        title: 'Full Day Mara Plains & Mara River Crossing',
        description: 'Dawn hot air balloon safari gliding silently over migrating wildebeest herds, followed by a champagne bush breakfast and tracking cheetah coalitions across the Talek River.',
        meals: 'Breakfast, Bush Lunch, Dinner',
        accommodation: 'Luxury Tented Bush Suite'
      },
      {
        day: 3,
        title: 'Masai Mara to Amboseli National Park',
        description: 'Private charter flight to Amboseli. Enjoy game drives framed by the snow-capped peak of Mount Kilimanjaro, observing Africa’s largest free-ranging elephant herds.',
        meals: 'All inclusive',
        accommodation: 'Ol Tukai Lodge Amboseli'
      },
      {
        day: 4,
        title: 'Amboseli Sunrise & Return Concierge',
        description: 'Sunrise game drive capturing elephants crossing the dried lakebed with Kilimanjaro in full view. Afternoon VIP transfer back to Nairobi Wilson or Jomo Kenyatta International Airport.',
        meals: 'Breakfast & Lunch',
        accommodation: 'Departure or Connecting Flight'
      }
    ],
    included: [
      'Private 4x4 Safari Land Cruiser with pop-up roof & unlimited mileage',
      'All national reserve conservation & entry permits',
      'Full board luxury tented accommodation with selected beverages',
      'English-speaking certified professional naturalist driver-guide',
      'En-route bush flights and Nairobi airport transfers'
    ],
    notIncluded: [
      'International flights to Nairobi (NBO)',
      'Optional Hot Air Balloon Safari ($450 per person)',
      'Personal travel & medical insurance',
      'Discretionary gratuities for safari guides and camp staff'
    ]
  },
  {
    id: 'tanzania-zanzibar',
    country: 'Tanzania / Zanzibar',
    countryCode: 'TZ',
    flag: '🇹🇿',
    badge: 'TANZANIA / ZANZIBAR',
    title: 'Zanzibar Beach & Spice Island',
    subtitle: 'Turquoise Coral Reefs & Historic Stone Town',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    highlights: ['🌊 Indian Ocean', '🏛️ UNESCO Stone Town'],
    description: 'Pristine white powdery sands, warm turquoise waters, fragrant vanilla spice plantations, and evocative historic Stone Town alleys. Complete your gorilla safari with relaxing sunset dhow cruises.',
    duration: '4 to 6 Days',
    lodgingType: 'Beach Resorts',
    specialFeature: 'Snorkeling & Dhow Sails',
    departureSchedule: 'Safari + Beach Combos',
    priceFromUSD: 1420,
    days: [
      {
        day: 1,
        title: 'Arrival in Zanzibar & Stone Town Heritage',
        description: 'Private VIP airport reception at Abeid Amani Karume Airport. Guided walking tour through the labyrinthine UNESCO Stone Town, House of Wonders, and historic spice markets.',
        meals: 'Dinner overlooking the ocean',
        accommodation: 'Zanzibar Serena Hotel or Park Hyatt Stone Town'
      },
      {
        day: 2,
        title: 'Organic Spice Plantations & Prison Island Giant Tortoises',
        description: 'Sensory tour of historical clove, cardamom, and lemongrass farms. Traditional wooden boat crossing to Prison Island sanctuary to feed Aldabra giant tortoises.',
        meals: 'Breakfast & Swahili Farm Lunch',
        accommodation: 'Zanzibar Serena Hotel'
      },
      {
        day: 3,
        title: 'Transfer to Nungwi & Kendwa Coral Beaches',
        description: 'Scenic transit north to pristine white coral beaches. Afternoon at leisure swimming in tide-free turquoise lagoons and private sunset dhow sailing cruise with fresh seafood canapés.',
        meals: 'Breakfast & Beachside Dinner',
        accommodation: 'Zuri Zanzibar or Essque Zalu Beach Resort'
      },
      {
        day: 4,
        title: 'Mnemba Atoll Marine Reserve Dolphin & Snorkel Safari',
        description: 'Private catamaran charter to Mnemba Atoll. Snorkel through pristine kaleidoscopic coral gardens teeming with tropical reef fish and wild bottlenose dolphins.',
        meals: 'All inclusive',
        accommodation: 'Luxury Oceanfront Villa'
      }
    ],
    included: [
      'All internal transfers in private air-conditioned executive vehicle',
      'Private sunset wooden dhow cruise with refreshments',
      'UNESCO Stone Town guided walking tour with licensed historian',
      'Boat excursion to Mnemba Atoll with professional snorkeling gear',
      'Full board luxury beach resort lodging'
    ],
    notIncluded: [
      'Zanzibar Infrastructure Tax ($5 per person/night)',
      'Scuba diving certification dives',
      'Premium imported spirits'
    ]
  },
  {
    id: 'uae-dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    flag: '🇦🇪',
    badge: 'UNITED ARAB EMIRATES',
    title: 'Dubai Luxury & Desert Safari',
    subtitle: 'Arabian Dunes & Futuristic Skyline',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    highlights: ['🏜️ 4x4 Dune Bashing', '🏙️ Modern Skyline & Luxury'],
    description: 'Golden desert dune bashing, five-star Arabian hospitality, futuristic architecture, Burj Khalifa views, and world-class shopping. Ideal as a direct vacation or seamless stopover en route to Africa.',
    duration: '3 to 5 Days',
    lodgingType: 'Desert Glamping',
    specialFeature: 'City & Visa Concierge',
    departureSchedule: 'Year-Round Booking',
    priceFromUSD: 1650,
    days: [
      {
        day: 1,
        title: 'Dubai International (DXB) VIP Meet & City Check-in',
        description: 'Executive arrival service fast-tracking customs. Private transfer to downtown luxury hotel. Evening private dhow dinner cruise along the Dubai Marina skyline.',
        meals: 'Dinner cruise',
        accommodation: 'Address Downtown or Armani Hotel Dubai'
      },
      {
        day: 2,
        title: 'Old Dubai Heritage, Gold Souk & Burj Khalifa At the Top',
        description: 'Morning abra boat ride across Dubai Creek, exploring spice and gold souks. Afternoon VIP access to level 148 of Burj Khalifa followed by the Dubai Fountain spectacle.',
        meals: 'Breakfast & High Tea',
        accommodation: 'Armani Hotel Dubai'
      },
      {
        day: 3,
        title: 'Dubai Desert Conservation Reserve & Dune Bashing',
        description: 'Afternoon luxury 4x4 expedition into rolling red dunes. Sandboarding, falconry demonstration, camel riding, and a private gourmet Arabian barbecue under the desert starlight.',
        meals: 'Breakfast & Desert Gourmet Dinner',
        accommodation: 'Bab Al Shams Desert Resort or Al Maha Luxury Resort'
      },
      {
        day: 4,
        title: 'Private Yacht Charter & Flight Connection Concierge',
        description: 'Morning 2-hour private yacht cruise past Atlantis The Palm and Burj Al Arab. Luxury chauffeur transfer for onward international connection to Entebbe, Uganda.',
        meals: 'Breakfast & Refreshments',
        accommodation: 'Airport Departure'
      }
    ],
    included: [
      'VIP Airport Meet & Assist at DXB Terminal 1/3',
      'Private luxury vehicle transportation for all excursions',
      'Burj Khalifa Level 148 At The Top Sky fast-pass tickets',
      'Private 4x4 luxury desert safari with barbecue dinner and live performances',
      'Dedicated 24/7 UAE concierge and visa processing assistance'
    ],
    notIncluded: [
      'Tourism Dirham fee paid directly to hotel',
      'Helicopter city flight (optional add-on $280)',
      'Personal shopping and discretionary tips'
    ]
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'tree-lion',
    title: 'Tree-Climbing Lion',
    location: 'Queen Elizabeth National Park',
    category: 'QUEEN ELIZABETH NP',
    imageUrl: 'https://images.unsplash.com/photo-1614027164847-1b28caa1440f?auto=format&fit=crop&w=1000&q=80',
    caption: 'Tree-Climbing Lion resting in ancient sycamore fig branches in Ishasha.',
    details: 'Ishasha sector is one of the very few locations in the world where lions habitually climb trees to escape tsetse flies and catch cool afternoon breezes while surveying kob herds.'
  },
  {
    id: 'matriarch-herd',
    title: 'Sunset Matriarch Herd',
    location: 'Murchison Savanna',
    category: 'MURCHISON SAVANNA',
    imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80',
    caption: 'Gentle giants drinking along the delta banks during golden hour.',
    details: 'Murchison Falls National Park is home to thriving populations of African bush elephants who traverse ancient corridors between the Albertine rift and the Victoria Nile.'
  },
  {
    id: 'giraffes-kidepo',
    title: 'Rothschild Giraffes',
    location: 'River Nile / Kidepo Valley',
    category: 'RIVER NILE / KIDEPO',
    imageUrl: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80',
    caption: 'Tall silhouettes grazing among whistling thorn acacia trees.',
    details: 'Uganda shelters the largest single population of endangered Rothschild’s giraffes, distinguished by their creamy white stockings and unique mosaic coat patterns.'
  },
  {
    id: 'community-planting',
    title: 'Tree Planting & Education',
    location: 'Bwindi Fringe Community',
    category: 'COMMUNITY UPLIFT',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    caption: 'Local school students and village elders nursing native seedlings.',
    details: 'Through the Tambula Community Fund, every safari guest contributes to establishing indigenous green buffer zones that reduce crop raids and generate sustainable ecotourism income.'
  },
  {
    id: 'silverback-close',
    title: 'Silverback Bwindi Patriarch',
    location: 'Bwindi Impenetrable NP',
    category: 'MISTY CLOUD FOREST',
    imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
    caption: 'Gazing into the calm, thoughtful eyes of an ancient mountain gorilla.',
    details: 'A trekking experience limited to just 8 visitors per gorilla family per day, monitored closely by Uganda Wildlife Authority rangers to ensure respectful, zero-impact encounters.'
  },
  {
    id: 'zanzibar-dhow',
    title: 'Sunset Dhow in Zanzibar',
    location: 'Zanzibar Indian Ocean',
    category: 'COASTAL EXPEDITION',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    caption: 'Handcrafted wooden sails skimming turquoise lagoons at dusk.',
    details: 'For centuries, Arabian and Swahili traders sailed these spice waters. Today, they offer the ultimate tranquil ending after a rugged inland wildlife safari.'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'elena-mark',
    rating: 5,
    quote: 'Spotting the Ishasha tree-climbing lions resting high on the branches was surreal! Our private driver Geoffrey had an extraordinary eye for wildlife and knew every hidden bend along Murchison Falls.',
    author: 'Elena & Mark S.',
    initials: 'EM',
    location: 'San Francisco, California',
    safariType: '10-Day Private Wildlife Circuit'
  },
  {
    id: 'richard-h',
    rating: 5,
    quote: 'Combining 4 days of Dubai desert luxury with our Uganda mountain gorilla trek was flawless. Tambula handled our flight reconfirmations and VIP airport meet in Entebbe without a hitch.',
    author: 'Richard H.',
    initials: 'RH',
    location: 'London, United Kingdom',
    safariType: 'Dubai & Bwindi Gorilla Combo'
  },
  {
    id: 'kathleen-w',
    rating: 5,
    quote: 'Visiting the local community tree nursery outside Bwindi was just as powerful as looking into a silverback’s eyes. Knowing our safari directly uplifts these smiling kids gave this trip deep soul.',
    author: 'Kathleen W.',
    initials: 'KW',
    location: 'Melbourne, Australia',
    safariType: 'Community Conservation Trek'
  },
  {
    id: 'nathalie-d',
    rating: 5,
    quote: 'Joined as a solo female traveler on a small group safari. Met lifelong friends, felt completely safe at every turn, and our domestic flight directly to the Kihihi airstrip saved hours of driving!',
    author: 'Nathalie D.',
    initials: 'ND',
    location: 'Montreal, Canada',
    safariType: 'Small Group Primate Expedition'
  }
];

export const GROUP_DEPARTURES: GroupDeparture[] = [
  {
    id: 'grp-01',
    title: '7-Day Gorillas, Chimps & Savannah Wildlife',
    route: 'Entebbe → Kibale Forest → Queen Elizabeth → Bwindi → Entebbe',
    startDate: 'October 14, 2026',
    endDate: 'October 20, 2026',
    days: 7,
    priceUSD: 2450,
    maxGroupSize: 7,
    spotsLeft: 2,
    badge: 'Limited Availability',
    highlights: ['Gorilla Permit Included', 'Chimpanzee Habituation', 'Kazinga Channel Boat Cruise'],
    status: 'Filling Fast'
  },
  {
    id: 'grp-02',
    title: '10-Day Complete Uganda Grand Circuit',
    route: 'Entebbe → Murchison Falls → Kibale → Queen Elizabeth → Bwindi → Lake Mburo',
    startDate: 'November 05, 2026',
    endDate: 'November 14, 2026',
    days: 10,
    priceUSD: 3380,
    maxGroupSize: 7,
    spotsLeft: 4,
    badge: 'Guaranteed Departure',
    highlights: ['Rhino Sanctuary Trek', 'Murchison Nile Boat', 'Tree-Climbing Lions', 'Bwindi Silverbacks'],
    status: 'Guaranteed'
  },
  {
    id: 'grp-03',
    title: '5-Day Primate Express (Fly-In)',
    route: 'Entebbe → Kihihi Bush Flight → Bwindi Impenetrable → Entebbe',
    startDate: 'December 02, 2026',
    endDate: 'December 06, 2026',
    days: 5,
    priceUSD: 2890,
    maxGroupSize: 6,
    spotsLeft: 3,
    badge: 'Aviation Bush Flight',
    highlights: ['Aerolink Scenic Flights', 'Luxury Forest Cottage', '2 Gorilla Treks Optional'],
    status: 'Open'
  },
  {
    id: 'grp-04',
    title: '12-Day East Africa Wildlife & Zanzibar Escape',
    route: 'Entebbe → Bwindi Gorillas → Nairobi → Masai Mara → Zanzibar Beach',
    startDate: 'January 10, 2027',
    endDate: 'January 21, 2027',
    days: 12,
    priceUSD: 4650,
    maxGroupSize: 7,
    spotsLeft: 3,
    badge: 'Cross-Border Expedition',
    highlights: ['Primate Trekking', 'Great Migration Game Drives', 'Stone Town Spice Tour', 'Dhow Cruise'],
    status: 'Open'
  }
];

export const FLIGHT_SERVICES_INFO = {
  airport: 'Entebbe International Airport (EBB)',
  domesticCarriers: ['Aerolink Uganda', 'Bar Aviation', 'Eagle Air'],
  destinationsServed: [
    { name: 'Kihihi Airstrip', connects: 'Bwindi Impenetrable (North / Buhoma & Ruhija)', flightTime: '1h 10m' },
    { name: 'Kisoro Airstrip', connects: 'Bwindi (South / Rushaga & Nkuringo) & Mgahinga', flightTime: '1h 20m' },
    { name: 'Kasese / Mweya Airstrip', connects: 'Queen Elizabeth National Park & Rwenzori Mountains', flightTime: '1h 00m' },
    { name: 'Pakuba / Bugungu Airstrip', connects: 'Murchison Falls National Park', flightTime: '55m' },
    { name: 'Kidepo Valley Airstrip', connects: 'Kidepo Valley & Karamoja Region', flightTime: '1h 45m' },
  ],
  transfers: [
    { type: 'Executive VIP Sedan', passengers: '1-3 Pax', features: 'Air-conditioned, bottled mineral water, Wi-Fi, English chauffeur' },
    { type: '4x4 Safari Land Cruiser', passengers: '4-7 Pax', features: 'Pop-up viewing roof, fridge, inverter charging ports, all-terrain suspension' },
    { type: 'Toyota HiAce Safari Minivan', passengers: '4-8 Pax', features: 'Comfortable high roof, luggage space, dual AC' }
  ]
};
