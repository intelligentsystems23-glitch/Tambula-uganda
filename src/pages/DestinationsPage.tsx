import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  Filter, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  TreePine,
  ExternalLink
} from 'lucide-react';
import { CurrencyConfig, DestinationItinerary } from '../types';
import { useSafariData } from '../context/SafariDataContext';

interface DestinationsPageProps {
  currency: CurrencyConfig;
  onNavigatePage: (pageId: string) => void;
  onSelectDestination: (dest: DestinationItinerary) => void;
  onPlanTrip: (initialSubject?: string) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  currency,
  onNavigatePage,
  onSelectDestination,
  onPlanTrip,
}) => {
  const { destinations } = useSafariData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const countries = ['All', 'Uganda', 'Tanzania', 'Kenya', 'Rwanda', 'Dubai', 'South Africa'];
  const categories = [
    'All',
    'Gorilla Trekking',
    'Big Five Savannah',
    'Beach & Islands',
    'International',
    'Mountains & Hiking'
  ];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchSearch =
        dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCountry =
        selectedCountry === 'All' ||
        dest.country.toLowerCase() === selectedCountry.toLowerCase();

      let matchCategory = true;
      if (selectedCategory === 'Gorilla Trekking') {
        matchCategory =
          dest.title.toLowerCase().includes('gorilla') ||
          dest.description.toLowerCase().includes('gorilla') ||
          dest.country === 'Uganda' ||
          dest.country === 'Rwanda';
      } else if (selectedCategory === 'Big Five Savannah') {
        matchCategory =
          dest.title.toLowerCase().includes('savannah') ||
          dest.title.toLowerCase().includes('mara') ||
          dest.title.toLowerCase().includes('serengeti') ||
          dest.country === 'Kenya' ||
          dest.country === 'Tanzania';
      } else if (selectedCategory === 'Beach & Islands') {
        matchCategory =
          dest.title.toLowerCase().includes('zanzibar') ||
          dest.description.toLowerCase().includes('beach');
      } else if (selectedCategory === 'International') {
        matchCategory =
          dest.country === 'Dubai' ||
          dest.country === 'South Africa' ||
          dest.country === 'Tanzania';
      } else if (selectedCategory === 'Mountains & Hiking') {
        matchCategory =
          dest.title.toLowerCase().includes('kilimanjaro') ||
          dest.title.toLowerCase().includes('rwenzori') ||
          dest.description.toLowerCase().includes('mountain');
      }

      return matchSearch && matchCountry && matchCategory;
    });
  }, [searchQuery, selectedCountry, selectedCategory]);

  return (
    <div className="bg-[#faf8f5] text-[#1c221e] min-h-screen">
      {/* Top Breadcrumb Bar */}
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
            <span className="text-[#0e2117] font-semibold">Destinations</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[#4f5c52]">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#048310]" />
              <span>Certified East Africa Specialists</span>
            </span>
            <span>·</span>
            <span>{destinations.length} Verified Itineraries</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative bg-[#07170e] text-white py-16 lg:py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07170e] via-[#07170e]/95 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ee5f27]/20 border border-[#ee5f27]/40 text-[#ee5f27] text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>East Africa & International Gateways</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Destinations Beyond
              <br />
              <span className="text-[#ee5f27]">Ordinary Horizons.</span>
            </h1>

            <p className="text-base text-white/80 leading-relaxed max-w-2xl font-light">
              From the primeval equatorial cloud mist of Bwindi to the thundering Serengeti migration,
              turquoise Indian Ocean lagoons, and Dubai desert luxury.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-5 rounded-2xl border border-[#e5ded2] shadow-xs space-y-4">
          {/* Search bar row */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative grow">
              <Search className="w-4 h-4 text-[#8a998e] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by destination name, park, or wildlife (e.g. Serengeti, Gorillas, Lions)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#ded5c6] text-xs sm:text-sm focus:outline-hidden focus:border-[#ee5f27] focus:ring-1 focus:ring-[#ee5f27]"
              />
            </div>

            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCountry('All');
                setSelectedCategory('All');
              }}
              className="text-xs text-[#6e7d70] hover:text-[#0e2117] font-medium px-3 py-2 shrink-0 underline"
            >
              Reset Filters
            </button>
          </div>

          {/* Country Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[#839286] font-semibold shrink-0 uppercase tracking-wider text-[10px]">
              Country:
            </span>
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCountry(c)}
                className={`px-3 py-1.5 rounded-full transition-colors shrink-0 font-medium ${
                  selectedCountry === c
                    ? 'bg-[#0e2117] text-white shadow-xs'
                    : 'bg-[#f4efe7] text-[#4d5b50] hover:bg-[#eae3d8]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs pt-1 border-t border-[#f4ede3]">
            <span className="text-[#839286] font-semibold shrink-0 uppercase tracking-wider text-[10px]">
              Theme:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg transition-colors shrink-0 text-xs ${
                  selectedCategory === cat
                    ? 'bg-[#ee5f27] text-white font-semibold'
                    : 'bg-[#faf6f0] text-[#556358] hover:bg-[#ece4d8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <p className="text-xs sm:text-sm text-[#556358]">
              Showing <strong className="text-[#0e2117]">{filteredDestinations.length}</strong> verified safari itineraries
            </p>
            <button
              onClick={() => onNavigatePage('admin')}
              className="text-[11px] font-bold text-[#ee5f27] bg-[#fef3ee] hover:bg-[#fae4d7] px-2.5 py-1 rounded-lg border border-[#fbd4c2] transition-colors inline-flex items-center gap-1"
              title="Open Destination CMS"
            >
              <span>Manage in CMS</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => onPlanTrip('Custom Tailored Destination')}
            className="text-xs font-semibold text-[#ee5f27] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Can’t find your dream route? Request Custom Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#e5ded2] max-w-md mx-auto space-y-4">
            <Compass className="w-10 h-10 text-[#a0b0a3] mx-auto" />
            <h3 className="font-bold text-lg text-[#0e2117]">No Destinations Found</h3>
            <p className="text-xs text-[#6e7d70]">
              We couldn’t find any itineraries matching your search query. Try resetting filters or request a bespoke custom itinerary.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCountry('All');
                setSelectedCategory('All');
              }}
              className="bg-[#0e2117] text-white px-4 py-2 rounded-lg text-xs font-semibold"
            >
              Show All Destinations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredDestinations.map((dest) => {
              const convertedPrice = Math.round(dest.priceFromUSD * currency.rateFromUSD);
              return (
                <div
                  key={dest.id}
                  id={`destination-card-${dest.id}`}
                  className="bg-white rounded-2xl overflow-hidden border border-[#e5ded2] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {/* Country & Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="bg-[#0e2117]/85 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <span>{dest.flag}</span>
                          <span>{dest.country}</span>
                        </span>
                      </div>

                      {/* Duration Tag */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#0e2117] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#ee5f27]" />
                        <span>{dest.duration}</span>
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="text-xl font-bold tracking-tight drop-shadow-sm">
                          {dest.title}
                        </h3>
                        <p className="text-xs text-white/90 font-light drop-shadow-sm">
                          {dest.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Details Body */}
                    <div className="p-5 space-y-3">
                      <p className="text-xs text-[#526055] line-clamp-3 leading-relaxed">
                        {dest.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {dest.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium bg-[#f5efe7] text-[#2c3930] px-2.5 py-0.5 rounded-md"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Metadata row */}
                      <div className="pt-3 border-t border-[#f0eae0] grid grid-cols-2 gap-2 text-[11px] text-[#69796d]">
                        <div>
                          <span className="block text-[10px] text-[#8e9f91] uppercase">Lodging</span>
                          <strong className="text-[#0e2117]">{dest.lodgingType}</strong>
                        </div>
                        <div>
                          <span className="block text-[10px] text-[#8e9f91] uppercase">Schedule</span>
                          <strong className="text-[#0e2117]">{dest.departureSchedule}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Price & CTA */}
                  <div className="p-5 pt-3 bg-[#faf7f2] border-t border-[#f0eae0] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#8e9f91] uppercase block">Starting from</span>
                      <span className="text-base font-bold text-[#0e2117]">
                        {currency.symbol}{convertedPrice.toLocaleString()}{' '}
                        <span className="text-xs font-normal text-[#647467]">/ person</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectDestination(dest)}
                      className="bg-[#0e2117] hover:bg-[#ee5f27] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <span>View Itinerary</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Multi-Country Custom Planner Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#0e2117] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[#ee5f27] text-xs font-bold tracking-widest uppercase">
              CROSS-BORDER EXPEDITIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Want to combine Uganda Gorillas + Serengeti Migration + Zanzibar Beach?
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              We specialize in multi-country East Africa circuits with scheduled bush flights and border crossing concierge.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onPlanTrip('Multi-Country East Africa Safari')}
              className="bg-[#ee5f27] hover:bg-[#d64e18] text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md active:scale-98"
            >
              Request Multi-Country Quote
            </button>
            <a
              href="https://wa.me/256781674358?text=Hello%20Tambula%20Tours%2C%20I%20want%20to%20combine%20Uganda%20gorillas%20with%20Serengeti%20and%20Zanzibar."
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl text-sm font-medium transition-colors text-center"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
