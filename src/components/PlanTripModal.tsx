import React, { useState } from 'react';
import { X, Check, Sparkles, Send } from 'lucide-react';
import { CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface PlanTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  initialDestination?: string;
}

export const PlanTripModal: React.FC<PlanTripModalProps> = ({
  isOpen,
  onClose,
  currency,
  initialDestination,
}) => {
  const [destinations, setDestinations] = useState<string[]>(
    initialDestination ? [initialDestination] : ['Uganda Mountain Gorillas']
  );
  const [safariStyle, setSafariStyle] = useState<'private' | 'group' | 'fly-in' | 'conservation'>('private');
  const [tier, setTier] = useState<'Mid-Range' | 'Luxury' | 'Ultra-Luxury'>('Luxury');
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(7);
  const [needsFlights, setNeedsFlights] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const destinationOptions = [
    'Uganda Mountain Gorillas & Big Five',
    'Kenya Masai Mara & Amboseli',
    'Zanzibar Beach & Spice Island',
    'Dubai Luxury & Desert Safari',
    'Rwanda Volcanoes & Chimpanzees',
  ];

  const toggleDestination = (dest: string) => {
    if (destinations.includes(dest)) {
      if (destinations.length > 1) {
        setDestinations(destinations.filter((d) => d !== dest));
      }
    } else {
      setDestinations([...destinations, dest]);
    }
  };

  // Base estimate per person per day
  const baseRatePerDay =
    tier === 'Mid-Range' ? 290 : tier === 'Luxury' ? 440 : 750;
  const flightAddon = needsFlights ? 380 : 0;
  const styleMultiplier = safariStyle === 'private' ? 1.15 : safariStyle === 'fly-in' ? 1.3 : 1.0;
  const estimatedPerPersonUSD = Math.round((baseRatePerDay * days * styleMultiplier + flightAddon) / 10) * 10;
  const totalEstimateUSD = estimatedPerPersonUSD * travelers;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="plan-trip-modal-container"
        className="bg-[#faf8f5] w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl border border-[#dfd5c7] flex flex-col"
      >
        {/* Modal Header */}
        <div className="bg-[#0e2117] text-white p-6 rounded-t-2xl flex items-center justify-between border-b border-white/10 relative">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#ee5f27] text-[11px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CUSTOM SAFARI DESIGNER</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              Craft Your African Expedition
            </h2>
            <p className="text-xs text-white/70">
              Personalized proposal prepared by Tambula senior naturalist guides within 12 hours.
            </p>
          </div>

          <button
            id="modal-close-button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#e8efe8] text-[#048310] mx-auto flex items-center justify-center text-3xl">
              ✓
            </div>
            <h3 className="font-display text-2xl font-bold text-[#102419]">
              Safari Request Received!
            </h3>
            <p className="text-sm text-[#48564b] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#102419]">{fullName}</strong>! Our head safari director
              is curating your tailored itinerary for{' '}
              <strong>{destinations.join(', ')}</strong>. A comprehensive proposal with confirmed lodge
              options will be dispatched to <strong>{email}</strong>.
            </p>
            <div className="p-4 bg-white rounded-xl border border-[#e4dbcd] max-w-md mx-auto text-xs text-[#556458] text-left">
              <div className="font-semibold text-[#102419] mb-1">Estimated Journey Summary:</div>
              <div>• {travelers} Traveler(s) · {days} Days · {tier} Tier</div>
              <div>• Safari Style: {safariStyle.toUpperCase()}</div>
              <div>• Indicative Range: <span className="font-bold text-[#ee5f27]">{formatPrice(totalEstimateUSD, currency)}</span> ({formatPrice(estimatedPerPersonUSD, currency)} / person)</div>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#0e2117] text-white px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#1a3828] transition-all"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Step 1: Select Destinations */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#102419] mb-2.5">
                1. Select Regions &amp; Destinations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {destinationOptions.map((opt) => {
                  const isChecked = destinations.includes(opt);
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => toggleDestination(opt)}
                      className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-[#0e2117] text-white border-[#0e2117] shadow-xs'
                          : 'bg-white text-[#3c4a3f] border-[#e0d6c8] hover:bg-[#f6f2ec]'
                      }`}
                    >
                      <span>{opt}</span>
                      {isChecked && <Check className="w-4 h-4 text-[#ee5f27]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Safari Style & Lodging Tier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102419] mb-2.5">
                  2. Safari Style
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'private', label: 'Bespoke Solo & Private (Custom Cruiser)' },
                    { id: 'group', label: 'Scheduled Small Group (Shared departures)' },
                    { id: 'fly-in', label: 'Luxury Fly-In (Bush Flights included)' },
                    { id: 'conservation', label: 'Conservation & Community Trek' },
                  ].map((s) => (
                    <label
                      key={s.id}
                      className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                        safariStyle === s.id
                          ? 'bg-[#fdf2ec] border-[#ee5f27] text-[#102419] font-semibold'
                          : 'bg-white border-[#e3dacf] text-[#4d5950]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="safariStyle"
                        checked={safariStyle === s.id}
                        onChange={() => setSafariStyle(s.id as any)}
                        className="text-[#ee5f27] focus:ring-[#ee5f27]"
                      />
                      <span>{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102419] mb-2.5">
                  3. Accommodation Level
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'Mid-Range', title: 'Comfort & Heritage Lodges', desc: 'Private en-suite, solar power, lush garden views' },
                    { id: 'Luxury', title: 'Luxury Tented Camps', desc: 'Boutique riverfront villas, fine dining, gourmet wine' },
                    { id: 'Ultra-Luxury', title: 'Ultra-Exclusive Private Estates', desc: 'Private plunge pools, dedicated butler & open bar' },
                  ].map((lvl) => (
                    <label
                      key={lvl.id}
                      className={`block p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                        tier === lvl.id
                          ? 'bg-[#fdf2ec] border-[#ee5f27] text-[#102419]'
                          : 'bg-white border-[#e3dacf] text-[#4d5950]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="lodgingTier"
                          checked={tier === lvl.id}
                          onChange={() => setTier(lvl.id as any)}
                          className="text-[#ee5f27] focus:ring-[#ee5f27]"
                        />
                        <span className="font-semibold text-[#102419]">{lvl.title}</span>
                      </div>
                      <span className="text-[11px] text-[#69766d] block pl-5 mt-0.5">{lvl.desc}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Travelers, Days, Bush Flights */}
            <div className="bg-white p-4 rounded-xl border border-[#e2d8ca] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#102419] mb-1">
                  Travelers: <span className="text-[#ee5f27] font-bold">{travelers}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full accent-[#ee5f27]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#102419] mb-1">
                  Duration: <span className="text-[#ee5f27] font-bold">{days} Days</span>
                </label>
                <input
                  type="range"
                  min="3"
                  max="21"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-[#ee5f27]"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 text-xs text-[#2c372f] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needsFlights}
                    onChange={(e) => setNeedsFlights(e.target.checked)}
                    className="rounded text-[#ee5f27] focus:ring-[#ee5f27] w-4 h-4"
                  />
                  <span>Include Airport &amp; Bush Flights</span>
                </label>
              </div>
            </div>

            {/* Price Preview Banner */}
            <div className="bg-[#12281c] text-white p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
              <div>
                <span className="text-[11px] text-[#ee5f27] font-bold uppercase tracking-wider block">
                  INDICATIVE QUOTE ESTIMATE
                </span>
                <span className="text-2xl font-bold font-display text-white">
                  {formatPrice(totalEstimateUSD, currency)}
                </span>
                <span className="text-xs text-white/70 ml-2">
                  ({formatPrice(estimatedPerPersonUSD, currency)} / person)
                </span>
              </div>
              <div className="text-right text-[11px] text-white/60">
                Includes private transport, park permits, full-board lodges &amp; VAT
              </div>
            </div>

            {/* Step 4: Contact Information */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#102419]">
                4. Your Contact Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="p-3 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                />
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-3 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Specific animal sightings, dates, dietary requirements, or special milestones..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-[#637267] hover:text-[#102419]"
              >
                Cancel
              </button>

              <button
                type="submit"
                id="btn-submit-safari-proposal"
                className="inline-flex items-center gap-2 bg-[#ee5f27] hover:bg-[#d64e18] text-white px-7 py-3 rounded-xl text-xs font-bold tracking-wide shadow-md transition-all active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Detailed Safari Proposal</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
