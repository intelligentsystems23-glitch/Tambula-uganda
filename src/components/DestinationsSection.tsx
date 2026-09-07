import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../data/safariData';
import { DestinationItinerary } from '../types';

interface DestinationsSectionProps {
  onSelectDestination: (dest: DestinationItinerary) => void;
  onRequestAllGuides: () => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectDestination,
  onRequestAllGuides,
}) => {
  return (
    <section id="destinations" className="py-20 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-[#ee5f27] text-xs font-bold tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5" />
              <span>BEYOND UGANDA</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102419] tracking-tight">
              International & Regional Destinations
            </h2>

            <p className="text-sm sm:text-base text-[#4d5a50] leading-relaxed">
              Tambula Uganda Tours and Travel operates premier expeditions throughout East Africa
              and curated worldwide travel extensions.
            </p>
          </div>

          <div>
            <button
              id="btn-request-all-guides"
              onClick={onRequestAllGuides}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#102419] hover:text-[#ee5f27] transition-colors group"
            >
              <span>Request All Destination Guides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3 Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              id={`destination-card-${dest.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-[#e5dcce] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Image with Badge */}
                <div className="relative aspect-16/10 overflow-hidden bg-[#112318]">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Country Flag Badge */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                    <span>{dest.flag}</span>
                    <span className="tracking-wide uppercase text-[11px]">{dest.badge}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="font-display text-2xl font-bold text-[#102419]">
                    {dest.title}
                  </h3>

                  {/* Highlights Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {dest.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-block bg-[#f3ede3] text-[#334237] text-xs font-medium px-2.5 py-1 rounded-md"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#526056] leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Feature Tags Row */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="bg-[#faf7f2] border border-[#e8ded0] text-[#556358] text-[11px] px-2.5 py-0.5 rounded">
                      {dest.duration}
                    </span>
                    <span className="bg-[#faf7f2] border border-[#e8ded0] text-[#556358] text-[11px] px-2.5 py-0.5 rounded">
                      {dest.lodgingType}
                    </span>
                    <span className="bg-[#faf7f2] border border-[#e8ded0] text-[#556358] text-[11px] px-2.5 py-0.5 rounded">
                      {dest.specialFeature}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Schedule & Explore Button */}
              <div className="px-6 py-4 bg-[#faf7f2] border-t border-[#eee5d8] flex items-center justify-between text-xs">
                <span className="text-[#68766c] font-medium">
                  {dest.departureSchedule}
                </span>

                <button
                  id={`btn-explore-itinerary-${dest.id}`}
                  onClick={() => onSelectDestination(dest)}
                  className="inline-flex items-center gap-1.5 bg-[#0e2117] hover:bg-[#1a3828] text-white px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all active:scale-98 shadow-xs"
                >
                  <span>Explore Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ee5f27]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
