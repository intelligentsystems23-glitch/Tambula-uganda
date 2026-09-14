import React from 'react';
import { 
  Users, 
  User, 
  Plane, 
  Compass, 
  ShieldCheck, 
  Car, 
  Building2, 
  TreePine, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ArrowRight, 
  MessageSquare,
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';
import { CurrencyConfig } from '../types';

interface ServicesPageProps {
  currency: CurrencyConfig;
  onNavigatePage: (pageId: string) => void;
  onPlanTrip: (initialSubject?: string) => void;
  onBookFlightConcierge: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  currency,
  onNavigatePage,
  onPlanTrip,
  onBookFlightConcierge,
}) => {
  const servicesList = [
    {
      id: 'bespoke-private',
      title: 'Bespoke Private & Solo Safaris',
      category: 'EXCLUSIVE & CUSTOMIZED',
      badge: 'Most Flexible',
      icon: User,
      color: '#ee5f27',
      description:
        'Crafted entirely around your schedule, personal wildlife bucket-list, and lodging style. Includes your own dedicated customized 4x4 safari vehicle and an expert private naturalist guide throughout your journey.',
      highlights: [
        'Private 4x4 Toyota Land Cruiser with pop-up safari roof & cooler',
        'Certified English-speaking senior ranger guide & wildlife spotter',
        'Custom pace—pause as long as you wish for lion prides or rare birds',
        'Hand-picked luxury tented lodges, intimate eco-villas, or budget cottages',
        'Full flexibility on dates, park entries, and photography angles'
      ],
      idealFor: 'Couples, solo explorers, families, honeymooners, and serious wildlife photographers.',
      startingFromUSD: 1450,
      actionText: 'Design Private Safari',
      onAction: () => onPlanTrip('Bespoke Private & Solo Safari'),
    },
    {
      id: 'group-expeditions',
      title: 'Scheduled Group Expeditions',
      category: 'COMMUNITY & VALUE',
      badge: 'Best Value',
      icon: Users,
      color: '#048310',
      description:
        'Join camaraderie-filled, fixed-departure small group expeditions across Uganda, Rwanda, Tanzania, and Zanzibar. Share the thrill of the trail and the vehicle costs while making lifelong international friends.',
      highlights: [
        'Guaranteed departure dates with max 6–8 travelers per vehicle',
        'Guaranteed window seat for every traveler on all game drives',
        'Live seat tracking and real-time departure countdowns',
        'Comprehensive packages covering all park fees, permits, and meals',
        'Twin-share lodging with optional solo room supplement'
      ],
      idealFor: 'Solo travelers seeking companions, small groups of friends, and budget-conscious adventurers.',
      startingFromUSD: 850,
      actionText: 'View Group Departures',
      onAction: () => onNavigatePage('group-trips'),
    },
    {
      id: 'gorilla-chimp-permits',
      title: 'Gorilla & Chimpanzee Permits Concierge',
      category: 'WILDLIFE TREKKING',
      badge: 'Official UWA & RDB',
      icon: TreePine,
      color: '#0f2418',
      description:
        'We handle 100% of the official regulatory bureaucracy to secure your high-demand gorilla habituation and tracking permits from the Uganda Wildlife Authority (UWA) and Rwanda Development Board (RDB).',
      highlights: [
        'Official UWA Mountain Gorilla Trekking Permits ($800 Uganda)',
        'Habituation Experience Permits for 4 full hours with gorillas ($1,500)',
        'Kibale & Budongo Forest Chimpanzee Trekking & Habituation permits',
        'Advance quota reservations even during peak June–September dry season',
        'Direct permit collection and ranger station logistics coordination'
      ],
      idealFor: 'Trekkers targeting Bwindi Impenetrable Forest, Mgahinga, or Volcanoes National Park.',
      startingFromUSD: 250,
      actionText: 'Inquire for Permits',
      onAction: () => onPlanTrip('Gorilla & Chimpanzee Trekking Permits'),
    },
    {
      id: 'flight-concierge',
      title: 'Air Travel Concierge & Bush Flights',
      category: 'SEAMLESS TRANSIT',
      badge: 'IATA & Domestic',
      icon: Plane,
      color: '#ee5f27',
      description:
        'End-to-end air travel assistance from international long-haul ticketing to scenic domestic bush charter hops that cut 9-hour road journeys down to a 75-minute scenic flight.',
      highlights: [
        'Domestic scheduled flights connecting Entebbe (EBB) to Kihihi, Kidepo, Mweya & Kisoro',
        'International airline bookings via Emirates, Qatar, Ethiopian, Turkish & KLM',
        'VIP Entebbe airport tarmac meet-and-greet with luggage assistance',
        'Private aircraft charter arrangements for remote luxury bush landings',
        '24/7 flight schedule monitoring and emergency rebooking support'
      ],
      idealFor: 'Travelers with limited vacation days, luxury lodge guests, and international flyers.',
      startingFromUSD: 180,
      actionText: 'Book Flight Concierge',
      onAction: onBookFlightConcierge,
    },
    {
      id: 'cruiser-fleet-rentals',
      title: '4x4 Safari Land Cruiser Fleet Rentals',
      category: 'EXPEDITION VEHICLES',
      badge: 'Specialized Fleet',
      icon: Car,
      color: '#048310',
      description:
        'Traverse rugged African terrain safely in our purpose-built Toyota Land Cruiser 4x4 safari cruisers equipped with pop-up photography roofs, high-lift jacks, and all bush accessories.',
      highlights: [
        'Custom safari-extended chassis with 5, 7, or 8 window seats',
        'Full pop-up roof hatch for 360-degree unobstructed wildlife photography',
        'On-board 12V/220V inverter chargers, electric fridge/cooler box',
        'VHF two-way communication radio with ranger networks',
        'Available with certified professional driver-guide or self-drive for vetted travelers'
      ],
      idealFor: 'Independent explorers, production film crews, NGO teams, and self-planned travelers.',
      startingFromUSD: 150,
      actionText: 'Rent a Safari Cruiser',
      onAction: () => onPlanTrip('4x4 Safari Land Cruiser Rental'),
    },
    {
      id: 'international-holidays',
      title: 'International Holidays & Beach Escapes',
      category: 'GLOBAL DESTINATIONS',
      badge: 'Regional & World',
      icon: Compass,
      color: '#0f2418',
      description:
        'Journey beyond East Africa with our hand-crafted holiday extensions. Combine your dusty Ugandan gorilla trek with turquoise Zanzibar waters, Dubai desert safaris, or Cape Town vineyards.',
      highlights: [
        'Zanzibar Spice Island all-inclusive beachfront resorts & Stone Town dhow cruises',
        'Dubai modern luxury: Desert dune bashing, Marina yacht cruises & Burj Khalifa',
        'South Africa Garden Route, Table Mountain & Cape Point penguin colonies',
        'Victoria Falls helicopter flights and Zambezi River sunset boat expeditions',
        'Full visa advisory, hotel reservations, and private airport transfers included'
      ],
      idealFor: 'Honeymooners, post-safari relaxers, family holidaymakers, and multi-country travelers.',
      startingFromUSD: 1200,
      actionText: 'Plan Holiday Extension',
      onAction: () => onPlanTrip('International Holiday / Beach Gateway'),
    },
    {
      id: 'cultural-homestays',
      title: 'Cultural Immersions & Village Homestays',
      category: 'COMMUNITY & TRADITIONS',
      badge: 'Ethical Tourism',
      icon: Sparkles,
      color: '#ee5f27',
      description:
        'Connect directly with the people who call this land home. Experience genuine hospitality, traditional cooking, and storytelling without artificial tourist stagings.',
      highlights: [
        'Batwa forest trail led by indigenous forest elders around Bwindi & Mgahinga',
        'Karamojong Manyatta traditional homestead stays and cattle kraal herding',
        'Buganda Kingdom cultural heritage trail: Kasubi Tombs, Kabaka Palace & barkcloth crafting',
        'Direct revenue sharing: 100% of cultural fees go to local village cooperative funds',
        'Ethical photography protocols honoring human dignity and authentic consent'
      ],
      idealFor: 'Culture enthusiasts, researchers, conscious travelers, and student groups.',
      startingFromUSD: 95,
      actionText: 'Explore Cultural Immersions',
      onAction: () => onPlanTrip('Cultural Immersion & Village Homestay'),
    },
    {
      id: 'corporate-mice',
      title: 'Corporate Retreats & MICE Expeditions',
      category: 'ORGANIZATIONAL TRAVEL',
      badge: 'Corporate & MICE',
      icon: Building2,
      color: '#048310',
      description:
        'Elevate your executive team, board of directors, or incentive group with wilderness retreats in Uganda’s most inspiring natural settings.',
      highlights: [
        'Executive board sessions and team bonding in five-star wilderness safari lodges',
        'Sound system, projector, and high-speed satellite Wi-Fi setups in bush conference rooms',
        'Curated team-building challenges: boat cruises, bush breakfasts, and sunrise wildlife rallies',
        'Turnkey logistics: VIP bus & 4x4 convoy, airport fast-track, branded itinerary gifts',
        'Strict risk assessment, corporate billing statements, and duty-of-care protocols'
      ],
      idealFor: 'Corporations, NGOs, international embassies, executive boards, and incentive award trips.',
      startingFromUSD: 1800,
      actionText: 'Plan Corporate Retreat',
      onAction: () => onPlanTrip('Corporate Retreat / MICE'),
    },
  ];

  return (
    <div className="bg-[#faf8f5] text-[#1c221e] min-h-screen">
      {/* Breadcrumb & Top Bar */}
      <div className="bg-white border-b border-[#e8dfd2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#647266]">
            <button
              onClick={() => onNavigatePage('home')}
              className="hover:text-[#ee5f27] transition-colors font-medium"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#a8b3aa]" />
            <span className="text-[#0e2117] font-semibold">Our Services</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[#4f5c52]">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#048310]" />
              <span>Licensed UTB Tour Operator</span>
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#ee5f27]" />
              <span>Official UWA Permit Desk</span>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative bg-[#07170e] text-white py-20 lg:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07170e] via-[#07170e]/90 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ee5f27]/20 border border-[#ee5f27]/40 text-[#ee5f27] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Comprehensive Travel Services</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Crafted Journeys.
              <br />
              <span className="text-[#ee5f27]">Flawless Execution.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl font-light pt-2">
              From the mist-shrouded ridges of Bwindi Impenetrable Forest to white-sand Zanzibar coastlines
              and international skies, Tambula Uganda provides end-to-end safari and travel logistics.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onPlanTrip('General Safari Inquiry')}
                className="bg-[#ee5f27] hover:bg-[#d64e18] text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl active:scale-98 inline-flex items-center gap-2"
              >
                <span>Request Custom Safari Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/256781674358?text=Hello%20Tambula%20Tours%2C%20I%20would%20like%20to%20inquire%20about%20your%20travel%20services."
                target="_blank"
                rel="noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3.5 rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#048310]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[#ee5f27] text-xs font-bold uppercase tracking-widest">
            ALL 8 TRAVEL DIVISIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f2418]">
            Everything You Need for Africa & Beyond
          </h2>
          <p className="text-[#556358] text-sm sm:text-base">
            Whether you want a private family safari, a high-camaraderie group departure, flight booking,
            or gorilla trekking permits, explore our specialized divisions below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={`service-block-${service.id}`}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-[#e5ded2] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider text-[#ee5f27] uppercase">
                      {service.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#f4eee6] text-[#2b3930] text-xs font-semibold">
                      {service.badge}
                    </span>
                  </div>

                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${service.color}15`, color: service.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0e2117]">
                        {service.title}
                      </h3>
                      <p className="text-xs text-[#6a796e] mt-0.5">
                        Starting from ~{currency.symbol}{Math.round(service.startingFromUSD * currency.rateFromUSD).toLocaleString()} {currency.code}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-[#47554b] leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#f0eae0]">
                    <span className="text-[11px] font-bold text-[#0e2117] uppercase tracking-wider block">
                      Key Inclusions & Features:
                    </span>
                    <ul className="space-y-1.5">
                      {service.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#3f4d43]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#048310] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#faf7f2] p-3 rounded-lg text-xs text-[#526055]">
                    <strong className="text-[#0e2117]">Ideal for:</strong> {service.idealFor}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f0eae0] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#78887b] uppercase block">Price Guide</span>
                    <span className="text-sm font-bold text-[#0e2117]">
                      {currency.symbol}{Math.round(service.startingFromUSD * currency.rateFromUSD).toLocaleString()} <span className="text-xs font-normal text-[#6a796e]">/ person</span>
                    </span>
                  </div>

                  <button
                    onClick={service.onAction}
                    className="bg-[#0e2117] hover:bg-[#183928] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <span>{service.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#ee5f27]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How We Craft Your Journey (4 Steps) */}
      <div className="bg-[#f2eee7] py-20 border-y border-[#e2d8c9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[#048310] text-xs font-bold uppercase tracking-widest">
              PEACE OF MIND
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0e2117]">
              How Your Journey Unfolds
            </h2>
            <p className="text-[#556358] text-sm">
              We eliminate anxiety through transparent planning, real local relationships, and 24/7 on-the-ground support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#ded4c5] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#ee5f27]/10 text-[#ee5f27] flex items-center justify-center font-bold text-base">
                01
              </div>
              <h3 className="font-bold text-base text-[#0e2117]">Inquiry & Vision</h3>
              <p className="text-xs text-[#526055] leading-relaxed">
                Tell us your target dates, wildlife wishlist, and budget preference. We assign you a dedicated safari specialist.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#ded4c5] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#048310]/10 text-[#048310] flex items-center justify-center font-bold text-base">
                02
              </div>
              <h3 className="font-bold text-base text-[#0e2117]">Tailored Proposal</h3>
              <p className="text-xs text-[#526055] leading-relaxed">
                Receive an itemized, day-by-day safari itinerary with lodge descriptions, private 4x4 logistics, and permit inclusions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#ded4c5] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0e2117]/10 text-[#0e2117] flex items-center justify-center font-bold text-base">
                03
              </div>
              <h3 className="font-bold text-base text-[#0e2117]">Permits & Confirmation</h3>
              <p className="text-xs text-[#526055] leading-relaxed">
                Secure your booking with a verifiable bank wire (Stanbic Bank) or Mobile Money deposit. We immediately purchase your UWA permits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#ded4c5] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#ee5f27]/10 text-[#ee5f27] flex items-center justify-center font-bold text-base">
                04
              </div>
              <h3 className="font-bold text-base text-[#0e2117]">Warm Ugandan Welcome</h3>
              <p className="text-xs text-[#526055] leading-relaxed">
                Arrive at Entebbe Airport where your lead guide greets you with a warm smile, private Land Cruiser, and ice-cold water.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Direct CTA Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#0e2117] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[#ee5f27] text-xs font-bold tracking-widest uppercase">
              READY TO EXPLORE?
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Let’s design your unforgettable African journey.
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Contact our Kampala & Entebbe office today for a free, customized quotation without obligation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onPlanTrip('Custom Safari Consultation')}
              className="bg-[#ee5f27] hover:bg-[#d64e18] text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md active:scale-98"
            >
              Plan Your Trip Now
            </button>
            <button
              onClick={() => onNavigatePage('contact')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl text-sm font-medium transition-colors"
            >
              Visit Contact Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
