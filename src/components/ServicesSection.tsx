import React from 'react';
import { Users, User, Plane, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onViewGroupDepartures: () => void;
  onTailorPrivateSafari: () => void;
  onBookFlightServices: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onViewGroupDepartures,
  onTailorPrivateSafari,
  onBookFlightServices,
}) => {
  return (
    <section id="services" className="py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#0e2117] text-white text-[11px] font-bold tracking-widest uppercase">
            COMPREHENSIVE TRAVEL SERVICES
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102419] tracking-tight">
            How We Travel Together
          </h2>

          <p className="font-editorial italic text-xl sm:text-2xl text-[#bf7d1b]">
            Tailored safaris, group adventures & seamless air travel concierge
          </p>

          <p className="text-sm sm:text-base text-[#4d5a50] leading-relaxed pt-1">
            From the mist of Uganda’s rainforests to golden savannahs and international gateways,
            Tambula Uganda Tours and Travel provides end-to-end safari and travel management.
          </p>
        </div>

        {/* 3 Travel Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Group Safaris */}
          <div
            id="service-card-group-safaris"
            className="bg-white rounded-2xl p-7 border border-[#e4dcce] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-5">
              {/* Badges */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-[#2e7d32] uppercase">
                  COMMUNITY & CAMARADERIE
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#f1ede6] text-[#3d4b41] text-[11px] font-medium">
                  Fixed Departures
                </span>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#eaf3eb] text-[#1c4b2b] flex items-center justify-center">
                <Users className="w-6 h-6 text-[#1c4b2b]" />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display text-2xl font-bold text-[#102419] mb-2.5">
                  Group Safaris
                </h3>
                <p className="text-xs text-[#525f55] leading-relaxed">
                  Join scheduled departures with like-minded adventurers from around the world.
                  Experience thrilling shared wildlife encounters, expert safari guides, and
                  cost-effective adventures across Uganda, Kenya, and Rwanda without sacrificing lodge
                  comfort.
                </p>
              </div>

              {/* Bullet Points */}
              <div className="pt-2 space-y-2.5 border-t border-[#f0eae0] text-xs text-[#303d33]">
                <div className="flex items-start gap-2">
                  <span className="text-[#bf7d1b] font-bold text-sm leading-none">•</span>
                  <span>Scheduled small group departures throughout the year</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#bf7d1b] font-bold text-sm leading-none">•</span>
                  <span>Shared 4x4 safari transport with guaranteed window seats</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#bf7d1b] font-bold text-sm leading-none">•</span>
                  <span>Licensed senior naturalists & safari directors</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#bf7d1b] font-bold text-sm leading-none">•</span>
                  <span>Budget-friendly pricing with premium lodge selections</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-6">
              <button
                id="btn-view-group-departures"
                onClick={onViewGroupDepartures}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0e2117] hover:bg-[#1a3828] text-white py-3 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all"
              >
                <span>View Group Departures</span>
                <ArrowRight className="w-4 h-4 text-[#e5a93c]" />
              </button>
            </div>
          </div>

          {/* Card 2: Solo & Private Safaris (Featured with Ochre styling) */}
          <div
            id="service-card-private-safaris"
            className="bg-white rounded-2xl p-7 border-2 border-[#bf7d1b] shadow-lg relative flex flex-col justify-between -translate-y-1"
          >
            {/* Top Highlight Ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#bf7d1b] text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">
              ★ BESPOKE VIP EXPERIENCE
            </div>

            <div className="space-y-5 pt-1">
              {/* Badges */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-[#bf7d1b] uppercase">
                  100% CUSTOMIZED FOR YOU
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#fbf3e7] text-[#92550e] text-[11px] font-medium border border-[#ebd8bd]">
                  Flexible Dates
                </span>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#fbf2e5] text-[#bf7d1b] flex items-center justify-center">
                <User className="w-6 h-6 text-[#bf7d1b]" />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display text-2xl font-bold text-[#102419] mb-2.5">
                  Solo & Private Safaris
                </h3>
                <p className="text-xs text-[#525f55] leading-relaxed">
                  Bespoke itineraries tailored exclusively to your timeline, interests, and pace.
                  Travel in your own dedicated 4x4 Land Cruiser with pop-up roof, private safari
                  driver-guide, and boutique luxury lodges designed for solo travelers, couples, or
                  private families.
                </p>
              </div>

              {/* Bullet Points */}
              <div className="pt-2 space-y-2.5 border-t border-[#f0eae0] text-xs text-[#303d33]">
                <div className="flex items-start gap-2">
                  <span className="text-[#bf7d1b] font-bold text-sm leading-none">•</span>
                  <span>Dedicated private 4x4 Land Cruiser with pop-up viewing roof</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#bf7d1b] font-bold text-sm leading-none">•</span>
                  <span>Personal professional guide focused entirely on your preferences</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#bf7d1b] font-bold text-sm leading-none">•</span>
                  <span>Custom photography stops, flexible start times & game drives</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#bf7d1b] font-bold text-sm leading-none">•</span>
                  <span>Perfect for solo adventurers, honeymooners & multi-gen families</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-6">
              <button
                id="btn-tailor-private-safari"
                onClick={onTailorPrivateSafari}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#bf7d1b] hover:bg-[#a56710] text-white py-3 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-md"
              >
                <span>Tailor A Private Safari</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Card 3: Airport Pickup & Flight Bookings */}
          <div
            id="service-card-flight-bookings"
            className="bg-white rounded-2xl p-7 border border-[#e4dcce] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-5">
              {/* Badges */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-[#1d5c36] uppercase">
                  AIR CONCIERGE & TRANSFERS
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#f1ede6] text-[#3d4b41] text-[11px] font-medium">
                  24/7 Dispatch
                </span>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#eaf3eb] text-[#1c4b2b] flex items-center justify-center">
                <Plane className="w-6 h-6 text-[#1c4b2b]" />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display text-2xl font-bold text-[#102419] mb-2.5">
                  Airport Pickup & Flight Bookings
                </h3>
                <p className="text-xs text-[#525f55] leading-relaxed">
                  Hassle-free arrival and transit services from touch down to takeoff. We provide
                  Entebbe International Airport (EBB) meet-and-greet, luxury transfer shuttles,
                  domestic bush flight bookings (Aerolink to Kihihi, Kasese, Pakuba), and international
                  flight ticketing services.
                </p>
              </div>

              {/* Bullet Points */}
              <div className="pt-2 space-y-2.5 border-t border-[#f0eae0] text-xs text-[#303d33]">
                <div className="flex items-start gap-2">
                  <span className="text-[#bf7d1b] font-bold text-sm leading-none">•</span>
                  <span>Entebbe International Airport (EBB) VIP meet & greet desk</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#bf7d1b] font-bold text-sm leading-none">•</span>
                  <span>Modern air-conditioned transfer vans & executive sedans</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#bf7d1b] font-bold text-sm leading-none">•</span>
                  <span>Domestic bush flights to Bwindi (Kihihi), Queen Elizabeth & Murchison</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#bf7d1b] font-bold text-sm leading-none">•</span>
                  <span>Regional & international flight ticketing and reconfirmation</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-6">
              <button
                id="btn-book-airport-flights"
                onClick={onBookFlightServices}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0e2117] hover:bg-[#1a3828] text-white py-3 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all"
              >
                <span>Book Airport / Flight Services</span>
                <ArrowRight className="w-4 h-4 text-[#e5a93c]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
