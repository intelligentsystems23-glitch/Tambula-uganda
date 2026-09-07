import React, { useState } from 'react';
import { X, Check, Clock, ShieldCheck, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { CurrencyCode, DestinationItinerary } from '../types';
import { formatPrice } from '../utils/currency';

interface ItineraryModalProps {
  destination: DestinationItinerary | null;
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onBookThisItinerary: (destTitle: string) => void;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({
  destination,
  isOpen,
  onClose,
  currency,
  onBookThisItinerary,
}) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'included' | 'packing'>('schedule');

  if (!isOpen || !destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="itinerary-modal-container"
        className="bg-[#faf8f5] w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl border border-[#ded5c7] flex flex-col"
      >
        {/* Banner with Destination Image */}
        <div className="relative aspect-21/9 sm:aspect-3/1 w-full overflow-hidden rounded-t-2xl bg-[#0f2218]">
          <img
            src={destination.image}
            alt={destination.title}
            className="w-full h-full object-cover brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Overlay Details */}
          <div className="absolute bottom-4 left-6 right-6 z-10 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">{destination.flag}</span>
              <span className="text-[#ee5f27] text-xs font-bold tracking-widest uppercase">
                {destination.country}
              </span>
              <span className="text-white/60">•</span>
              <span className="text-xs text-white/80">{destination.duration}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {destination.title}
            </h2>
          </div>
        </div>

        {/* Pricing Bar & Quick Specs */}
        <div className="bg-[#12281c] text-white px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 text-xs">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-white/60 text-[10px] block uppercase font-bold">FROM</span>
              <span className="font-display text-xl font-bold text-[#ee5f27]">
                {formatPrice(destination.priceFromUSD, currency)}
              </span>
              <span className="text-white/60 text-[11px]"> / person</span>
            </div>
            <div className="hidden sm:block border-l border-white/15 pl-4">
              <span className="text-white/60 text-[10px] block uppercase font-bold">LODGING STYLE</span>
              <span className="text-white font-medium">{destination.lodgingType}</span>
            </div>
            <div className="hidden sm:block border-l border-white/15 pl-4">
              <span className="text-white/60 text-[10px] block uppercase font-bold">DEPARTURES</span>
              <span className="text-white font-medium">{destination.departureSchedule}</span>
            </div>
          </div>

          <button
            onClick={() => onBookThisItinerary(destination.title)}
            className="inline-flex items-center gap-2 bg-[#ee5f27] hover:bg-[#d64e18] text-white px-5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm"
          >
            <span>Reserve or Customize</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-[#e5dccf] bg-white px-6 flex space-x-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'schedule'
                ? 'border-[#ee5f27] text-[#0e2117]'
                : 'border-transparent text-[#66746a] hover:text-[#0e2117]'
            }`}
          >
            Day-by-Day Itinerary
          </button>
          <button
            onClick={() => setActiveTab('included')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'included'
                ? 'border-[#ee5f27] text-[#0e2117]'
                : 'border-transparent text-[#66746a] hover:text-[#0e2117]'
            }`}
          >
            What's Included &amp; Excluded
          </button>
          <button
            onClick={() => setActiveTab('packing')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'packing'
                ? 'border-[#ee5f27] text-[#0e2117]'
                : 'border-transparent text-[#66746a] hover:text-[#0e2117]'
            }`}
          >
            Safari Essentials &amp; Permits
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <p className="text-xs text-[#526055] leading-relaxed">
                {destination.description} All game drives and boat safaris are conducted in private
                4x4 safari vehicles with guaranteed window seating and unlimited water.
              </p>

              <div className="space-y-4">
                {destination.days.map((d) => (
                  <div
                    key={d.day}
                    className="p-4 rounded-xl bg-white border border-[#e5dcce] shadow-2xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f4eee5] text-[#93560f] text-[11px] font-bold">
                        Day {d.day}
                      </span>
                      {d.meals && (
                        <span className="text-[11px] text-[#69766d]">{d.meals}</span>
                      )}
                    </div>
                    <h4 className="font-display font-bold text-base text-[#102419]">
                      {d.title}
                    </h4>
                    <p className="text-xs text-[#4c5950] leading-relaxed">
                      {d.description}
                    </p>
                    {d.accommodation && (
                      <div className="pt-2 text-[11px] text-[#048310] font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>Lodging: {d.accommodation}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'included' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-white border border-[#e5dcce] space-y-3">
                <h4 className="font-display font-bold text-sm text-[#048310] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#048310]" />
                  <span>Everything Included in This Tour</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#435146]">
                  {destination.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#048310] font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#e5dcce] space-y-3">
                <h4 className="font-display font-bold text-sm text-[#7f3922] flex items-center gap-2">
                  <X className="w-4 h-4 text-[#b91c1c]" />
                  <span>Not Included / Optional</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#435146]">
                  {destination.notIncluded.map((notInc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#b91c1c] font-bold">✗</span>
                      <span>{notInc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'packing' && (
            <div className="bg-white p-6 rounded-xl border border-[#e5dcce] space-y-4 text-xs text-[#49564c]">
              <h4 className="font-display font-bold text-base text-[#102419]">
                Expedition Preparation &amp; Wildlife Protocol
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="font-semibold text-[#102419]">Clothing &amp; Footwear</div>
                  <p>Light neutral colors (khaki, olive, tan). Avoid dark blue or black in tsetse fly zones. Sturdy, waterproof hiking boots with grip for forest slopes.</p>
                </div>
                <div className="space-y-1.5">
                  <div className="font-semibold text-[#102419]">Camera &amp; Optics</div>
                  <p>Binoculars (8x42 or 10x42), telephoto lens (300mm–600mm recommended for savannah, wide fast f/2.8 for dim rainforest canopy), extra camera batteries.</p>
                </div>
                <div className="space-y-1.5">
                  <div className="font-semibold text-[#102419]">Health &amp; Visas</div>
                  <p>Yellow Fever vaccination certificate required for entry to Uganda &amp; Kenya. East Africa Tourist Visa ($100) covers Uganda, Rwanda, and Kenya on one joint permit.</p>
                </div>
                <div className="space-y-1.5">
                  <div className="font-semibold text-[#102419]">Gorilla &amp; Chimp Etiquette</div>
                  <p>Maintain a 7-meter distance from primates, no flash photography, wear light face masks during habituation to safeguard primates against respiratory illness.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-[#f4eee5] border-t border-[#e5dcce] rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-[#637267]">
            Need adjustments? Tambula customizes every route to your preferred pace.
          </span>
          <button
            onClick={() => onBookThisItinerary(destination.title)}
            className="bg-[#0e2117] hover:bg-[#1a3828] text-white px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm"
          >
            Request Custom Quotation
          </button>
        </div>
      </div>
    </div>
  );
};
