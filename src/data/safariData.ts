import { CurrencyCode, CurrencyConfig, DestinationItinerary, FormerTrip, GalleryPhoto, GroupDeparture, TestimonialItem } from '../types';

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
    id: 'tanzania-serengeti',
    country: 'Tanzania',
    countryCode: 'TZ',
    flag: '🇹🇿',
    badge: 'TANZANIA',
    title: 'Serengeti & Ngorongoro Crater',
    subtitle: 'The Endless Plains & World Wonder Caldera',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    highlights: ['🌋 Ngorongoro Crater', '🦁 Serengeti Big Five'],
    description: 'Immerse in the greatest wildlife spectacle on earth across the endless plains of the Serengeti and descend into the breathtaking 600m volcanic caldera of Ngorongoro Crater teeming with black rhinos and massive lion prides.',
    duration: '5 to 8 Days',
    lodgingType: 'Luxury Safari Lodges',
    specialFeature: 'Caldera & Migration Safari',
    departureSchedule: 'Weekly Group & Private Departures',
    priceFromUSD: 2150,
    days: [
      {
        day: 1,
        title: 'Arusha to Tarangire National Park (Elephant Kingdom)',
        description: 'Morning departure from Arusha or Kilimanjaro Airport into Tarangire, famous for its ancient baobab trees and largest concentration of elephants in East Africa. Afternoon game drive along the Tarangire River.',
        meals: 'Lunch & Dinner',
        accommodation: 'Tarangire Safari Lodge or Maramboi Tented Camp'
      },
      {
        day: 2,
        title: 'Tarangire to Central Serengeti National Park (Seronera)',
        description: 'Traverse the scenic Great Rift Valley escarpment into the central Serengeti plains. Experience exhilarating afternoon game drives tracking big cats, leopards in acacia trees, and cheetah coalitions.',
        meals: 'All inclusive',
        accommodation: 'Serengeti Serena Safari Lodge or Kubu Kubu Tented Lodge'
      },
      {
        day: 3,
        title: 'Full Day Serengeti Savanna Expedition',
        description: 'Sunrise game drive across endless grasslands. Witness wildebeest herds, zebra columns, hyena clans, and vulture colonies with picnic bush lunch under acacia canopy.',
        meals: 'All inclusive',
        accommodation: 'Serengeti Luxury Tented Camp'
      },
      {
        day: 4,
        title: 'Serengeti to Ngorongoro Conservation Area',
        description: 'Morning game drive exiting Serengeti toward the misty highland rim of Ngorongoro. Visit an authentic Maasai boma community and enjoy sunset panoramas over the caldera floor.',
        meals: 'All inclusive',
        accommodation: 'Ngorongoro Serena Safari Lodge (Crater Rim)'
      },
      {
        day: 5,
        title: 'Ngorongoro Crater Floor Safari & Return to Arusha',
        description: 'Early morning 600-meter descent to the crater floor. Encounter dense concentrations of wildlife including rare black rhinos, hippos in Lake Magadi, and flamingo flocks before afternoon return to Arusha.',
        meals: 'Breakfast & Crater Picnic Lunch',
        accommodation: 'Arusha Hotel or Kilimanjaro Departure'
      }
    ],
    included: [
      'Custom 4x4 Safari Land Cruiser with pop-up roof & unlimited game drive mileage',
      'All Tanzania National Parks (TANAPA) entry fees and Ngorongoro Crater service fees',
      'Professional certified English/Swahili naturalist driver-guide',
      'Full board safari lodge & tented camp accommodation',
      'Arusha / Kilimanjaro Airport (JRO) meet and transfer services'
    ],
    notIncluded: [
      'International flights to Kilimanjaro (JRO) or Dar es Salaam',
      'Tanzania tourist visa ($50-$100 depending on nationality)',
      'Hot air balloon safari in Serengeti ($550 per person)',
      'Gratuities for driver-guide and lodge staff'
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
    id: 'grp-kigali',
    title: 'Kigali City Escape',
    destination: 'Kigali & Lake Kivu',
    country: 'Rwanda',
    flag: '🇷🇼',
    route: 'Kampala / Entebbe → Kigali City → Nyamirambo → Lake Kivu → Return',
    startDate: '2026-10-10',
    endDate: '2026-10-12',
    departureTimestamp: new Date('2026-10-10T06:00:00Z').getTime(),
    duration: '3 Days',
    datesDisplay: '10–12 Oct',
    days: 3,
    priceUSD: 350,
    priceUGX: 1300000,
    maxGroupSize: 12,
    seatsBooked: 8,
    spotsLeft: 4,
    badge: 'Popular Cross-Border',
    highlights: ['Kigali Genocide Memorial', 'Kigali City Cultural Walk', 'Lake Kivu Sunset Boat Cruise'],
    status: 'Book Now',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
    included: [
      'Round-trip comfortable overland executive coaster transportation from Kampala',
      '2 Nights accommodation in quality 3-star Kigali hotel (Bed & Breakfast)',
      'Cross-border border clearing assistance by Tambula tour manager',
      'Guided Kigali city tour, Nyamirambo walking tour & Genocide Memorial visit',
      'Lake Kivu scenic boat ride and team beach games'
    ],
    notIncluded: ['Rwanda / East Africa Tourist Visa fees (if applicable)', 'Personal dinners and shopping'],
    itinerary: [
      {
        day: 1,
        title: 'Scenic Drive from Kampala to Kigali via Katuna Border',
        description: 'Morning executive transit across rolling hills of Kigezi ("Switzerland of Africa"). Smooth border clearance into Rwanda. Evening check-in and panoramic welcome dinner overlooking Kigali city lights.',
        meals: 'Packed snacks & Welcome Dinner',
        accommodation: 'Kigali City Hotel'
      },
      {
        day: 2,
        title: 'Kigali Memorial & Lake Kivu Resort Sunset',
        description: 'Inspiring visit to the Kigali Genocide Memorial followed by scenic transit to Gisenyi on the shores of Lake Kivu. Afternoon relaxing boat cruise, swimming, and lakeside barbecue.',
        meals: 'Breakfast & Lunch',
        accommodation: 'Lake Kivu Beachfront Hotel'
      },
      {
        day: 3,
        title: 'Coffee Experience & Return to Uganda',
        description: 'Morning artisan Rwandan coffee tasting, souvenir craft shopping, and comfortable return journey back to Kampala/Entebbe.',
        meals: 'Breakfast & En-route Lunch'
      }
    ]
  },
  {
    id: 'grp-mombasa',
    title: 'Mombasa Beach Holiday',
    destination: 'Mombasa & Diani Beach',
    country: 'Kenya',
    flag: '🇰🇪',
    route: 'Entebbe / Nairobi → SGR Madaraka Express → Diani Beach & Fort Jesus',
    startDate: '2026-11-22',
    endDate: '2026-11-26',
    departureTimestamp: new Date('2026-11-22T06:00:00Z').getTime(),
    duration: '5 Days',
    datesDisplay: '22–26 Nov',
    days: 5,
    priceUSD: 650,
    priceUGX: 2450000,
    maxGroupSize: 14,
    seatsBooked: 12,
    spotsLeft: 2,
    badge: 'Limited Seats Left',
    highlights: ['Diani White Sands Beach', 'Fort Jesus Swahili Tour', 'Wasini Island Dolphin Dhow'],
    status: 'Limited Seats',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    included: [
      'SGR Madaraka Express train tickets (First / Economy Class)',
      '4 Nights accommodation at beachfront resort (Half Board / All Inclusive)',
      'All local ground transfers in private air-conditioned coach',
      'Wasini Dolphin Dhow boat excursion with marine park snorkeling fees',
      'Dedicated Tambula tour host and group activities'
    ],
    notIncluded: ['Optional watersports (Jet ski, kitesurfing)', 'Personal shopping & drinks'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Scenic Coastal Transit to Diani Beach',
        description: 'Check-in to our beachfront resort on the world-renowned white sands of Diani. Evening sundowner cocktails and welcome beach barbecue.',
        meals: 'Dinner',
        accommodation: 'Diani Sea Resort or Baobab Beach Resort'
      },
      {
        day: 2,
        title: 'Full Day Wasini Dolphin Dhow Safari & Kisite Mpunguti',
        description: 'Traditional Arabian dhow sail tracking wild bottlenose dolphins. Snorkeling in protected coral gardens followed by a legendary Swahili crab and seafood feast on Wasini Island.',
        meals: 'Breakfast, Seafood Lunch, Dinner',
        accommodation: 'Diani Beachfront Resort'
      },
      {
        day: 3,
        title: 'Diani Beach Games, Camel Rides & Leisure Day',
        description: 'Relaxation day: turquoise ocean swimming, group beach volleyball, optional quad biking in sacred Kaya Kinondo forest, and sunset beach bonfire.',
        meals: 'Breakfast & Dinner',
        accommodation: 'Diani Beachfront Resort'
      },
      {
        day: 4,
        title: 'Historic Fort Jesus & Old Mombasa Town Exploration',
        description: 'Cross the Likoni ferry to explore 16th-century Fort Jesus, historic Swahili spice markets, and carved wooden doorways of Old Mombasa.',
        meals: 'Breakfast & Lunch',
        accommodation: 'Diani Beachfront Resort'
      },
      {
        day: 5,
        title: 'Morning Dip & Return Connections',
        description: 'Final sunrise swim in the Indian Ocean, souvenir shopping, and transfer to airport or train station for return flight.',
        meals: 'Breakfast'
      }
    ]
  },
  {
    id: 'grp-addis',
    title: 'Addis Ababa Discovery',
    destination: 'Addis Ababa & Entoto Hills',
    country: 'Ethiopia',
    flag: '🇪🇹',
    route: 'Entebbe → Addis Ababa Bole → National Museum → Entoto Park → Mercato',
    startDate: '2026-12-05',
    endDate: '2026-12-08',
    departureTimestamp: new Date('2026-12-05T08:00:00Z').getTime(),
    duration: '4 Days',
    datesDisplay: '5–8 Dec',
    days: 4,
    priceUSD: 700,
    priceUGX: 2625000,
    maxGroupSize: 12,
    seatsBooked: 6,
    spotsLeft: 6,
    badge: 'Cultural Highland',
    highlights: ['Lucy (3.2 Million Yr Fossil)', 'Entoto Forest Park', 'Traditional Ethiopian Coffee & Dance'],
    status: 'Open',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
    included: [
      '3 Nights 4-star hotel in downtown Addis Ababa with daily breakfast',
      'All airport pick-up and drop-off transfers in executive bus',
      'Museum entry fees including National Museum (Lucy) & Holy Trinity Cathedral',
      'Authentic Ethiopian coffee ceremony and cultural dinner with traditional live folklore dancers',
      'English-speaking licensed Ethiopian guide + Tambula tour leader'
    ],
    notIncluded: ['International flight ticket EBB-ADD (can be bundled)', 'Personal tips'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Addis Ababa & Panoramic Entoto Mountain',
        description: 'VIP meet at Bole International Airport. Ascend Mount Entoto for breathtaking views over the diplomatic capital of Africa.',
        meals: 'Welcome Dinner',
        accommodation: 'Skylight Hotel or Jupiter International'
      },
      {
        day: 2,
        title: 'National Museum, Lucy & Holy Trinity Cathedral',
        description: 'Encounter the world-famous 3.2-million-year-old fossil "Lucy" (Dinkenesh). Tour the imperial tombs of Emperor Haile Selassie.',
        meals: 'Breakfast & Injera Lunch',
        accommodation: 'Addis Downtown Hotel'
      },
      {
        day: 3,
        title: 'Africa’s Largest Open Market (Mercato) & Cultural Night',
        description: 'Explore the vibrant Mercato artisan quarters, spice stalls, and leather goods. Evening grand cultural feast with honey wine (Tej) and live Eskista dancing.',
        meals: 'Breakfast & Cultural Feast Dinner',
        accommodation: 'Addis Downtown Hotel'
      },
      {
        day: 4,
        title: 'Tomoca Coffee Heritage & Departure',
        description: 'Morning pilgrimage to legendary Tomoca coffee roasting house for world-renowned Ethiopian espresso before airport transfer.',
        meals: 'Breakfast'
      }
    ]
  },
  {
    id: 'grp-mburo',
    title: 'Lake Mburo Weekend Safari',
    destination: 'Lake Mburo National Park',
    country: 'Uganda',
    flag: '🦓',
    route: 'Kampala / Entebbe → Equator Line Monument → Lake Mburo → Return',
    startDate: '2026-09-26',
    endDate: '2026-09-27',
    departureTimestamp: new Date('2026-09-26T05:30:00Z').getTime(),
    duration: '2 Days',
    datesDisplay: 'Every Month',
    days: 2,
    priceUSD: 200,
    priceUGX: 750000,
    maxGroupSize: 14,
    seatsBooked: 10,
    spotsLeft: 4,
    badge: 'Monthly Departure',
    highlights: ['Equator Water Experiment', 'Zebra & Giraffe Cycling Safari', 'Lake Mburo Boat Cruise & Hippo Pods'],
    status: 'Book Now',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80',
    included: [
      'Round trip executive safari van / Land Cruiser with pop-up roof',
      '1 Night safari lodge accommodation in Lake Mburo (Full Board)',
      'Uganda Wildlife Authority park entry fees for 2 days',
      'Boat cruise on Lake Mburo tracking hippos, crocs, and African fish eagles',
      'Guided game drive & walking safari among zebras and impalas'
    ],
    notIncluded: ['Optional night game drive ($30)', 'Personal beverages'],
    itinerary: [
      {
        day: 1,
        title: 'Equator Stop & Afternoon Hippo Boat Cruise',
        description: 'Early morning pick-up in Kampala. Stop at the famous Kayabwe Equator landmark for photos and scientific Coriolis water demonstration. Arrive in Lake Mburo for hot lunch and afternoon 2-hour boat cruise.',
        meals: 'Lunch & Campfire Bush Dinner',
        accommodation: 'Rwakobo Rock Lodge or Mburo Safari Lodge'
      },
      {
        day: 2,
        title: 'Morning Bush Walk, Zebras & Return to Kampala',
        description: 'Experience an exhilarating nature walk alongside armed rangers to see zebras, elands, topis, and Rothschild giraffes up close on foot. Depart after lunch arriving back in Kampala by evening.',
        meals: 'Breakfast & En-route Lunch'
      }
    ]
  },
  {
    id: 'grp-western-uganda',
    title: 'Western Uganda Explorer',
    destination: 'Queen Elizabeth & Kibale Forest',
    country: 'Uganda',
    flag: '🦍',
    route: 'Entebbe → Kibale Chimps → Queen Elizabeth Savanna → Kazinga Channel → Entebbe',
    startDate: '2027-01-15',
    endDate: '2027-01-19',
    departureTimestamp: new Date('2027-01-15T06:00:00Z').getTime(),
    duration: '5 Days',
    datesDisplay: '15–19 Jan',
    days: 5,
    priceUSD: 900,
    priceUGX: 3375000,
    maxGroupSize: 12,
    seatsBooked: 5,
    spotsLeft: 7,
    badge: 'Ultimate Wildlife',
    highlights: ['Chimpanzee Tracking in Kibale', 'Kazinga Channel Boat Launch', 'Ishasha Tree-Climbing Lions'],
    status: 'Open',
    image: 'https://images.unsplash.com/photo-1614027164847-1b28caa1440f?auto=format&fit=crop&w=1000&q=80',
    included: [
      '4x4 Safari Land Cruiser with pop-up roof and charging ports',
      '4 Nights mid-range eco-lodge accommodation (Full Board)',
      'All UWA park entry fees for Queen Elizabeth & Kibale',
      'Chimpanzee tracking permit in Kibale Forest National Park',
      'Kazinga Channel 2-hour boat safari & certified naturalist driver-guide'
    ],
    notIncluded: ['Optional hot air balloon safari', 'Personal laundry & gratuities'],
    itinerary: [
      {
        day: 1,
        title: 'Kampala to Fort Portal Crater Lakes & Kibale',
        description: 'Scenic drive past lush tea plantations into Fort Portal town. Afternoon hike around stunning Ndali-Kasenda volcanic crater lakes.',
        meals: 'Lunch & Dinner',
        accommodation: 'Chimpanzee Forest Lodge'
      },
      {
        day: 2,
        title: 'Kibale Chimpanzee Tracking & Queen Elizabeth Savanna',
        description: 'Morning trek into the primate capital of the world to spend an hour observing wild chimpanzee troops. Afternoon drive crossing the equator into Queen Elizabeth National Park.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Enganzi Game Lodge or Bush Lodge'
      },
      {
        day: 3,
        title: 'Kasenyi Morning Game Drive & Kazinga Channel Boat',
        description: 'Dawn game drive tracking lions, leopards, Uganda kobs, and elephants. Afternoon boat cruise on Kazinga Channel with the world’s highest density of hippos.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Enganzi Game Lodge'
      },
      {
        day: 4,
        title: 'Ishasha Tree-Climbing Lions Safari',
        description: 'Game drive through Ishasha sector searching for majestic lions resting on sycamore fig branches and herds of topi.',
        meals: 'Breakfast, Bush Picnic, Dinner',
        accommodation: 'Ishasha Jungle Lodge'
      },
      {
        day: 5,
        title: 'Scenic Return via Igongo Cultural Centre',
        description: 'Morning breakfast followed by leisurely return drive with stop at Igongo Cultural Museum for traditional Ankole lunch and arrival back in Kampala.',
        meals: 'Breakfast & Cultural Lunch'
      }
    ]
  },
  {
    id: 'grp-tanzania-serengeti',
    title: 'Serengeti & Ngorongoro Expedition',
    destination: 'Serengeti & Ngorongoro Crater',
    country: 'Tanzania',
    flag: '🇹🇿',
    route: 'Arusha / JRO → Tarangire Elephants → Serengeti Migration → Ngorongoro Crater',
    startDate: '2027-02-08',
    endDate: '2027-02-13',
    departureTimestamp: new Date('2027-02-08T06:00:00Z').getTime(),
    duration: '6 Days',
    datesDisplay: '8–13 Feb',
    days: 6,
    priceUSD: 1250,
    priceUGX: 4680000,
    maxGroupSize: 12,
    seatsBooked: 9,
    spotsLeft: 3,
    badge: 'Tanzania Special',
    highlights: ['Serengeti Great Migration Plains', '600m Ngorongoro Crater Descent', 'Tarangire Ancient Baobabs'],
    status: 'Limited Seats',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    included: [
      'Custom Tanzanian 4x4 Safari Land Cruiser with pop-up roof & unlimited game drives',
      '5 Nights full board lodging and luxury tented camp accommodation',
      'All TANAPA national park fees and Ngorongoro Crater vehicle permit ($300 value)',
      'Professional certified English/Swahili naturalist driver-guide',
      'Airport transfers from Kilimanjaro (JRO) or Arusha Airport'
    ],
    notIncluded: ['Tanzania visa ($50-$100)', 'International flights', 'Optional balloon safari'],
    itinerary: [
      {
        day: 1,
        title: 'Arusha to Tarangire National Park (Elephant Paradise)',
        description: 'Meet in Arusha and journey to Tarangire National Park, famous for colossal elephant herds and ancient baobab trees. Afternoon game drive.',
        meals: 'Lunch & Dinner',
        accommodation: 'Maramboi Tented Camp'
      },
      {
        day: 2,
        title: 'Tarangire to Serengeti National Park (Central Seronera)',
        description: 'Ascend the Great Rift Valley into the legendary Serengeti. Spot leopards lounging in acacia branches and cheetah coalitions on the hunt.',
        meals: 'All inclusive',
        accommodation: 'Serengeti Serena Safari Lodge'
      },
      {
        day: 3,
        title: 'Full Day Wildlife Spectacle on the Serengeti Plains',
        description: 'Full day immersed in wildebeest migration herds, zebra columns, and resident lion prides with champagne bush lunch.',
        meals: 'All inclusive',
        accommodation: 'Serengeti Luxury Bush Camp'
      },
      {
        day: 4,
        title: 'Serengeti to Ngorongoro Highland Rim',
        description: 'Morning game drive tracking hyenas and lions, transiting to the volcanic rim of Ngorongoro with magnificent sunset views.',
        meals: 'All inclusive',
        accommodation: 'Ngorongoro Rhino Lodge'
      },
      {
        day: 5,
        title: 'Ngorongoro Crater Floor Safari',
        description: 'Dawn descent into the 600m deep caldera. View endangered black rhinos, flamingo flocks in Lake Magadi, and dense lion prides.',
        meals: 'Breakfast & Crater Picnic Lunch',
        accommodation: 'Ngorongoro Farm House'
      },
      {
        day: 6,
        title: 'Return to Arusha & Airport Transfers',
        description: 'Morning cultural crafts market visit in Mto wa Mbu, returning to Arusha for departure flights.',
        meals: 'Breakfast & Lunch'
      }
    ]
  },
  {
    id: 'grp-jinja',
    title: 'Jinja Nile Adventure & Rafting',
    destination: 'Jinja & Source of the Nile',
    country: 'Uganda',
    flag: '🇺🇬',
    route: 'Kampala → Mabira Forest → Source of the Nile Boat → White Water Rafting → Return',
    startDate: '2026-10-24',
    endDate: '2026-10-25',
    departureTimestamp: new Date('2026-10-24T06:30:00Z').getTime(),
    duration: '2 Days',
    datesDisplay: '24–25 Oct',
    days: 2,
    priceUSD: 175,
    priceUGX: 650000,
    maxGroupSize: 14,
    seatsBooked: 8,
    spotsLeft: 6,
    badge: 'Adventure Thrill',
    highlights: ['Grade 5 Nile White Water Rafting', 'Source of the Nile Boat Cruise', 'Tubing & Quad Biking'],
    status: 'Book Now',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80',
    included: [
      'Round-trip coaster / van transportation from Kampala',
      '1 Night Nile riverfront resort lodging (Bed & Breakfast)',
      'Motorized boat ride to the exact Source of the Nile landmark where Lake Victoria meets the river',
      'Full day Grade 3 or Grade 5 white water rafting with professional river guides, safety kayaks & lunch',
      'High-resolution rafting action photos & video package'
    ],
    notIncluded: ['Optional Bungee jumping ($115)', 'Personal dinner drinks'],
    itinerary: [
      {
        day: 1,
        title: 'Mabira Forest Zip-line & Source of the Nile Cruise',
        description: 'Morning transit to Jinja. Enjoy optional canopy zip-lining in Mabira rainforest, lunch in Jinja colonial town, and sunset boat cruise to John Speke’s Source of the Nile monument.',
        meals: 'Lunch & Welcome Dinner',
        accommodation: 'Nile River Camp or Jinja Grand Hotel'
      },
      {
        day: 2,
        title: 'Full Day White Water Rafting on the Mighty Nile',
        description: 'Tackle the roaring rapids of the Victoria Nile with expert safety crew. Feast on a fresh riverside barbecue lunch before heading back to Kampala.',
        meals: 'Breakfast & River Barbecue Lunch'
      }
    ]
  }
];

export const FORMER_TRIPS: FormerTrip[] = [
  {
    id: 'past-mburo-aug2026',
    title: 'Lake Mburo Bush Camp & Cycling Safari',
    destination: 'Lake Mburo National Park, Uganda',
    flag: '🇺🇬',
    dates: 'August 22–23, 2026',
    travelersCount: 16,
    coverImage: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    ],
    hasVideo: true,
    videoTitle: 'Lake Mburo Sunset Campfire & Cycling Video Reel',
    summary: 'A 16-member group of adventure lovers from Kampala, Nairobi, and the UK joined our team for an unforgettable weekend cycling safari right next to grazing zebra herds and impalas, culminating in a campfire sundowner overlooking Lake Mburo.',
    leadGuide: 'Tambula Safari Team & Ronald (UWA Naturalist)',
    verifiedTestimonial: {
      author: 'Sarah K. & Friends',
      location: 'Kampala, Uganda',
      quote: 'Tambula and their crew took care of every single detail! We were hesitant to book online because of so many fake agencies, but Tambula proved 100% genuine. The campfire and zebra cycling were memories for life!',
      rating: 5
    }
  },
  {
    id: 'past-kigali-jul2026',
    title: 'Kigali City & Lake Kivu Retreat',
    destination: 'Kigali & Gisenyi, Rwanda',
    flag: '🇷🇼',
    dates: 'July 18–20, 2026',
    travelersCount: 20,
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80'
    ],
    hasVideo: true,
    videoTitle: 'Lake Kivu Boat Party & Kigali Street Tour Highlights',
    summary: '20 travelers joined our cross-border escape into Rwanda. Smooth border crossing at Katuna, moving educational walk at Kigali Genocide Memorial, followed by an epic boat cruise with fresh grilled tilapia on Lake Kivu.',
    leadGuide: 'Tambula Expedition Team & Jean-Paul (Rwanda Specialist)',
    verifiedTestimonial: {
      author: 'David & Maureen M.',
      location: 'Entebbe, Uganda',
      quote: 'Our first cross-border trip with Tambula! Smooth border clearance, top-notch hotel, and the operations team was checking in on every family 24/7. Worth every shilling.',
      rating: 5
    }
  },
  {
    id: 'past-bwindi-jun2026',
    title: 'Bwindi Primate Troop Expedition',
    destination: 'Bwindi Impenetrable NP, Uganda',
    flag: '🦍',
    dates: 'June 12–15, 2026',
    travelersCount: 8,
    coverImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80'
    ],
    hasVideo: true,
    videoTitle: 'Eye to Eye with Silverback Makiza: Live Trek Video',
    summary: 'An intimate 8-person gorilla trekking troop tracked the Habinyanja gorilla family in Buhoma. Everyone received their official UWA trekking certificate, followed by a visit to the local Batwa cultural project.',
    leadGuide: 'Tambula Expedition Team & Geoffrey (Senior Primate Tracker)',
    verifiedTestimonial: {
      author: 'Michael & Claire Stewart',
      location: 'Edinburgh, United Kingdom',
      quote: 'Looking into the eyes of a wild silverback is indescribable. If you have trust issues about wiring money to Africa, book with Tambula. Legit, registered, and genuine care from the whole team.',
      rating: 5
    }
  },
  {
    id: 'past-mombasa-may2026',
    title: 'Mombasa Coastal Beach & Diani Holiday',
    destination: 'Diani Beach & Fort Jesus, Kenya',
    flag: '🇰🇪',
    dates: 'May 01–05, 2026',
    travelersCount: 24,
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80'
    ],
    hasVideo: true,
    videoTitle: 'Diani Beach Camel Rides & Wasini Island Dolphin Cruise',
    summary: '24 travelers enjoyed the scenic SGR Madaraka train to Mombasa and 4 days of beach bliss in Diani. Spotted wild dolphins on our Wasini dhow and shared delicious Swahili seafood feasts.',
    leadGuide: 'Tambula Expedition Team & Captain Ali',
    verifiedTestimonial: {
      author: 'Grace N. (Fellowship Tour Group)',
      location: 'Jinja, Uganda',
      quote: 'We traveled as a 24-person family & fellowship group. Tambula organized train tickets, hotel resort bookings, and transfers seamlessly. Everyone felt safe, happy, and thoroughly entertained.',
      rating: 5
    }
  },
  {
    id: 'past-murchison-apr2026',
    title: 'Murchison Falls Wild River Safari',
    destination: 'Murchison Falls NP, Uganda',
    flag: '🇺🇬',
    dates: 'April 14–17, 2026',
    travelersCount: 18,
    coverImage: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1614027164847-1b28caa1440f?auto=format&fit=crop&w=1000&q=80'
    ],
    hasVideo: true,
    videoTitle: 'The Roar of Murchison Falls & Nile Elephants Riverboat',
    summary: 'Hiked to the explosive top of Murchison Falls where the whole Nile crushes through a 7-meter rock crevice. Saw over 40 elephants at the delta and 3 lionesses resting on termite mounds.',
    leadGuide: 'Tambula Expedition Team & Brian (Field Naturalist)',
    verifiedTestimonial: {
      author: 'Brian O. & Travel Club',
      location: 'Nairobi, Kenya',
      quote: 'The boat cruise to the base of the falls was mesmerizing. The Land Cruisers were in immaculate mechanical condition and Tambula is one of the most honest operators you will ever meet.',
      rating: 5
    }
  },
  {
    id: 'past-serengeti-feb2026',
    title: 'Tanzania Serengeti & Ngorongoro Expedition',
    destination: 'Serengeti & Ngorongoro, Tanzania',
    flag: '🇹🇿',
    dates: 'February 10–15, 2026',
    travelersCount: 14,
    coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80'
    ],
    hasVideo: true,
    videoTitle: 'Ngorongoro Caldera Descent & Serengeti Wildebeest Calving',
    summary: 'A 14-person cross-border expedition into northern Tanzania. Descended into the Ngorongoro Crater, spotting a rare black rhino and witnessing the Southern Serengeti calving season.',
    leadGuide: 'Tambula Expedition Team & Amani (Tanzanian Naturalist)',
    verifiedTestimonial: {
      author: 'Dr. Emmanuel T.',
      location: 'Gulu, Uganda',
      quote: 'Tambula coordinated our travel between Uganda and Tanzania like clockwork. The company is trustworthy, transparent with prices, and delivers far above expectations.',
      rating: 5
    }
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
