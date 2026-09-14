import React from 'react';
import { 
  ArrowRight, 
  Users, 
  Compass, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  TreePine,
  Plane,
  Heart
} from 'lucide-react';
import { CurrencyConfig, DestinationItinerary, GalleryPhoto } from '../types';
import { HeroSection } from '../components/HeroSection';
import { TickerMarquee } from '../components/TickerMarquee';
import { GallerySection } from '../components/GallerySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ConservationSection } from '../components/ConservationSection';
import { useSafariData } from '../context/SafariDataContext';

interface HomePageProps {
  currency: CurrencyConfig;
  onNavigatePage: (pageId: string) => void;
  onPlanTrip: (initialDest?: string) => void;
  onSelectDestination: (dest: DestinationItinerary) => void;
  onPhotoClick: (photo: GalleryPhoto) => void;
  onBookFlightConcierge: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currency,
  onNavigatePage,
  onPlanTrip,
  onSelectDestination,
  onPhotoClick,
  onBookFlightConcierge,
}) => {
  const { destinations, groupDepartures } = useSafariData();

  return (
    <div className="bg-[#faf8f5] text-[#1c221e]">
      {/* 1. Hero Section with Interactive Carousel */}
      <HeroSection
        onExploreServices={() => onNavigatePage('services')}
        onExploreDestinations={() => onNavigatePage('destinations')}
        onCustomItinerary={() => onPlanTrip('Uganda Mountain Gorillas & Big Five')}
      />

      {/* 2. Safari Ticker Marquee */}
      <TickerMarquee />

      {/* 3. Quick Navigation Hub to Independent Pages */}
      <section className="py-12 bg-white border-y border-[#ede6db]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[#ee5f27] text-xs font-bold uppercase tracking-widest">
              EXPLORE TAMBULA UGANDA
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0e2117] mt-1">
              Where Would You Like to Journey Next?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Group Trips */}
            <button
              onClick={() => onNavigatePage('group-trips')}
              className="bg-[#faf7f2] hover:bg-[#f3ede3] p-6 rounded-2xl border border-[#e5ded2] text-left transition-all group flex flex-col justify-between shadow-2xs hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#048310]/15 text-[#048310] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#048310] bg-[#048310]/10 px-2 py-0.5 rounded-full">
                  Upcoming 2026
                </div>
                <h3 className="font-bold text-lg text-[#0e2117]">Group Expeditions</h3>
                <p className="text-xs text-[#526055] leading-relaxed">
                  Join scheduled departures with live seat tracking, countdown clocks, and verified traveler photos.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold text-[#048310] group-hover:translate-x-1 transition-transform">
                <span>View Group Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Card 2: Our Services */}
            <button
              onClick={() => onNavigatePage('services')}
              className="bg-[#faf7f2] hover:bg-[#f3ede3] p-6 rounded-2xl border border-[#e5ded2] text-left transition-all group flex flex-col justify-between shadow-2xs hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#ee5f27]/15 text-[#ee5f27] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#ee5f27] bg-[#ee5f27]/10 px-2 py-0.5 rounded-full">
                  All 8 Divisions
                </div>
                <h3 className="font-bold text-lg text-[#0e2117]">Travel Services</h3>
                <p className="text-xs text-[#526055] leading-relaxed">
                  Bespoke solo safaris, IATA flight bookings, 4x4 cruiser rentals, gorilla permits, and corporate retreats.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold text-[#ee5f27] group-hover:translate-x-1 transition-transform">
                <span>Explore All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Card 3: Destinations */}
            <button
              onClick={() => onNavigatePage('destinations')}
              className="bg-[#faf7f2] hover:bg-[#f3ede3] p-6 rounded-2xl border border-[#e5ded2] text-left transition-all group flex flex-col justify-between shadow-2xs hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#0e2117]/15 text-[#0e2117] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#0e2117] bg-[#0e2117]/10 px-2 py-0.5 rounded-full">
                  East Africa & Beyond
                </div>
                <h3 className="font-bold text-lg text-[#0e2117]">Destinations</h3>
                <p className="text-xs text-[#526055] leading-relaxed">
                  Uganda gorilla cloud forests, Serengeti migration plains, Zanzibar beaches, Dubai, and Rwanda.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold text-[#0e2117] group-hover:translate-x-1 transition-transform">
                <span>Browse Itineraries</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Card 4: Our Genesis */}
            <button
              onClick={() => onNavigatePage('genesis')}
              className="bg-[#faf7f2] hover:bg-[#f3ede3] p-6 rounded-2xl border border-[#e5ded2] text-left transition-all group flex flex-col justify-between shadow-2xs hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#183a26]/15 text-[#183a26] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#183a26] bg-[#183a26]/10 px-2 py-0.5 rounded-full">
                  Our Story
                </div>
                <h3 className="font-bold text-lg text-[#0e2117]">Our Genesis</h3>
                <p className="text-xs text-[#526055] leading-relaxed">
                  Learn about our indigenous naturalist guides, sustainable safari philosophy, and community conservation roots.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold text-[#183a26] group-hover:translate-x-1 transition-transform">
                <span>Read Our Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Featured Group Trips Teaser */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#048310] text-xs font-bold uppercase tracking-widest">
                VERIFIED 2026 DEPARTURES
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0e2117] mt-1">
                Upcoming Group Expeditions
              </h2>
              <p className="text-[#556358] text-xs sm:text-sm mt-1 max-w-xl">
                Small-group camaraderie, guaranteed window seats in high-suspension 4x4 Land Cruisers, and transparent pricing.
              </p>
            </div>

            <button
              onClick={() => onNavigatePage('group-trips')}
              className="bg-[#0e2117] hover:bg-[#183a26] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors inline-flex items-center gap-2 shrink-0 self-start md:self-auto shadow-xs"
            >
              <span>View Full Group Trips Page & Countdowns</span>
              <ArrowRight className="w-4 h-4 text-[#ee5f27]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groupDepartures.slice(0, 3).map((dep) => {
              const convertedPrice = Math.round(dep.priceUSD * currency.rateFromUSD);
              return (
                <div
                  key={dep.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#e5ded2] shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={dep.image}
                        alt={dep.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 bg-[#0e2117]/85 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <span>{dep.flag}</span>
                        <span>{dep.destination}</span>
                      </div>
                      <div className="absolute top-3 right-3 bg-[#ee5f27] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {dep.spotsLeft} Seats Left
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white font-bold text-base">
                        {dep.title}
                      </div>
                    </div>

                    <div className="p-5 space-y-3 text-xs">
                      <div className="flex items-center justify-between text-[#68786d] pb-2 border-b border-[#f0eae0]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#ee5f27]" />
                          <span>{dep.datesDisplay}</span>
                        </span>
                        <span className="font-semibold text-[#0e2117]">{dep.duration}</span>
                      </div>

                      <p className="text-[#526055] line-clamp-2 leading-relaxed">
                        {dep.route}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-3 bg-[#faf7f2] border-t border-[#f0eae0] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#8e9f91] uppercase block">Cost Per Person</span>
                      <strong className="text-sm text-[#0e2117]">
                        {currency.symbol}{convertedPrice.toLocaleString()} {currency.code}
                      </strong>
                    </div>

                    <button
                      onClick={() => onNavigatePage('group-trips')}
                      className="bg-[#048310] hover:bg-[#036c0d] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Book Seat
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Visual Journey Gallery */}
      <GallerySection onPhotoClick={onPhotoClick} />

      {/* 6. Featured Destinations Teaser */}
      <section className="py-20 bg-white border-y border-[#ede6db]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#ee5f27] text-xs font-bold uppercase tracking-widest">
                DESTINATIONS DIRECTORY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0e2117] mt-1">
                From Mountain Corridors to Global Horizons
              </h2>
              <p className="text-[#556358] text-xs sm:text-sm mt-1 max-w-xl">
                Explore hand-crafted safari routes with full day-by-day breakdowns across Uganda, Tanzania, Kenya, and beyond.
              </p>
            </div>

            <button
              onClick={() => onNavigatePage('destinations')}
              className="bg-[#0e2117] hover:bg-[#183a26] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors inline-flex items-center gap-2 shrink-0 self-start md:self-auto shadow-xs"
            >
              <span>Explore All {destinations.length} Destinations</span>
              <ArrowRight className="w-4 h-4 text-[#ee5f27]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinations.slice(0, 3).map((dest) => {
              const convertedPrice = Math.round(dest.priceFromUSD * currency.rateFromUSD);
              return (
                <div
                  key={dest.id}
                  className="bg-[#faf7f2] rounded-2xl overflow-hidden border border-[#e5ded2] shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 bg-[#0e2117]/85 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <span>{dest.flag}</span>
                        <span>{dest.country}</span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white font-bold text-lg">
                        {dest.title}
                      </div>
                    </div>

                    <div className="p-5 space-y-2 text-xs">
                      <p className="text-[#526055] line-clamp-2 leading-relaxed">
                        {dest.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {dest.highlights.map((h, i) => (
                          <span key={i} className="bg-white text-[#2b382f] px-2 py-0.5 rounded-md text-[11px] border border-[#e8e0d4]">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-3 bg-white border-t border-[#f0eae0] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#8e9f91] uppercase block">Starting from</span>
                      <strong className="text-sm text-[#0e2117]">
                        {currency.symbol}{convertedPrice.toLocaleString()} {currency.code}
                      </strong>
                    </div>

                    <button
                      onClick={() => onSelectDestination(dest)}
                      className="bg-[#0e2117] hover:bg-[#ee5f27] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                    >
                      View Itinerary
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Testimonials Section ("Voices from the Trail" - kept on the landing page as requested!) */}
      <TestimonialsSection />

      {/* 8. Conservation Section ("Community Outreach & Habitat Conservation" - kept on the landing page as requested!) */}
      <ConservationSection
        onSupportOutreach={() => onPlanTrip('Community Outreach & Reforestation Visit')}
      />

      {/* 9. Fast Consultation & Action Banner */}
      <section className="py-16 bg-[#0e2117] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <span className="text-[#ee5f27] text-xs font-bold tracking-widest uppercase">
                YOUR SAFARI ADVISOR IS READY
              </span>
              <h2 className="text-3xl font-bold">
                Feel the Beauty of Uganda. Journey Beyond Borders.
              </h2>
              <p className="text-sm text-white/80 leading-relaxed font-light">
                Connect directly with our expedition team to craft your custom wildlife circuit, reserve high-demand gorilla permits, or book flight concierge.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => onPlanTrip('General Safari Inquiry')}
                className="bg-[#ee5f27] hover:bg-[#d64e18] text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md active:scale-98"
              >
                Plan Your Safari
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
      </section>
    </div>
  );
};
