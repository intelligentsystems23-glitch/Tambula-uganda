import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, 
  MessageCircle, CreditCard, ChevronDown, ChevronUp, Sparkles, 
  Upload, Film, Image, Check, AlertCircle, Info, ArrowRight, 
  PhoneCall, ExternalLink, Play, Eye
} from 'lucide-react';
import { CurrencyCode, GroupDeparture, FormerTrip } from '../types';
import { FORMER_TRIPS as initialFormerTrips } from '../data/safariData';
import { useSafariData } from '../context/SafariDataContext';
import { formatPrice } from '../utils/currency';
import { GroupBookingPaymentModal } from './GroupBookingPaymentModal';
import { UploadTripMemoryModal } from './UploadTripMemoryModal';
import { TripVideoModal } from './TripVideoModal';

interface GroupTripsPageProps {
  currency: CurrencyCode;
  onOpenBookingModal?: (tripId: string) => void;
  onNavigatePage?: (pageId: string) => void;
}

// Countdown timer helper
function calculateTimeLeft(targetTimestamp?: number) {
  if (!targetTimestamp) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false };
  }
  const difference = targetTimestamp - Date.now();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);
  return { days, hours, minutes, seconds, isPast: false };
}

export const GroupTripsPage: React.FC<GroupTripsPageProps> = ({ currency, onNavigatePage }) => {
  const { groupDepartures } = useSafariData();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'former'>('upcoming');
  const trips = groupDepartures;
  const [formerTrips, setFormerTrips] = useState<FormerTrip[]>(initialFormerTrips);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  
  // Modals state
  const [selectedTripForBooking, setSelectedTripForBooking] = useState<GroupDeparture | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [expandedItineraryId, setExpandedItineraryId] = useState<string | null>(null);
  
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedVideoTrip, setSelectedVideoTrip] = useState<FormerTrip | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Live timer tick every second for real-time countdown
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBookTrip = (trip: GroupDeparture) => {
    setSelectedTripForBooking(trip);
    setIsBookingModalOpen(true);
  };

  const handleWhatsAppInquiry = (trip: GroupDeparture) => {
    const text = encodeURIComponent(
      `Hello Tambula Uganda Tours! I am viewing your official website and I am interested in the upcoming group trip:\n\n` +
      `*Trip:* ${trip.title} (${trip.duration})\n` +
      `*Dates:* ${trip.datesDisplay}\n` +
      `*Price:* ${formatPrice(trip.priceUSD, currency)}\n` +
      `*Seats Left:* ${trip.spotsLeft}\n\n` +
      `Could you please send me more details or help me reserve my slot?`
    );
    window.open(`https://wa.me/256781674358?text=${text}`, '_blank');
  };

  const handleAddFormerTrip = (newTrip: FormerTrip) => {
    setFormerTrips([newTrip, ...formerTrips]);
  };

  const filteredTrips = trips.filter((t) => {
    if (filterCountry === 'all') return true;
    return t.country?.toLowerCase().includes(filterCountry.toLowerCase());
  });

  return (
    <div id="group-trips" className="min-w-0 bg-[#f8f5ef] pb-16">
      {/* Top Breadcrumb Bar */}
      {onNavigatePage && (
        <div className="bg-white border-b border-[#e8dfd2] mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#647266]">
              <button
                onClick={() => onNavigatePage('home')}
                className="hover:text-[#ee5f27] transition-colors font-medium cursor-pointer"
              >
                Home
              </button>
              <span className="text-[#a8b3aa]">/</span>
              <span className="text-[#0e2117] font-semibold">Group Trips &amp; Expeditions</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigatePage?.('admin')}
                className="text-[11px] font-bold text-[#048310] bg-[#edf6ee] hover:bg-[#d9eedc] px-2.5 py-1 rounded-lg border border-[#c5e4c8] transition-colors inline-flex items-center gap-1"
                title="Manage group trips in CMS"
              >
                <span>Manage in CMS</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-[#4f5c52]">
                <span className="w-2 h-2 rounded-full bg-[#048310] animate-pulse" />
                <span>Real-Time Seat Tracking &amp; Countdowns</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust & Legitimacy Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-[#fdf2ec] border border-[#ee5f27]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#ee5f27] mb-3">
            <ShieldCheck className="w-4 h-4 text-[#048310]" />
            <span>100% VERIFIED &amp; LICENSED TOUR OPERATOR · REG # 800200034981</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#102419] tracking-tight">
            Group Trips &amp; Verified Expeditions
          </h1>
          
          <p className="mt-3 text-sm sm:text-base text-[#506054] leading-relaxed">
            Travel together, make lifelong friends, and explore East Africa at unbeatable shared rates.
            Browse upcoming departures with live countdowns and verified media proof from our former travelers!
          </p>

          {/* Quick Contact & Direct Operations Line */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-white border border-[#ded4c3] px-3 py-1.5 rounded-lg shadow-xs text-[#2c3b30]">
              <span className="w-2 h-2 rounded-full bg-[#048310]" />
              <span>Tour Operations: <strong>Tambula Safari Desk</strong></span>
            </div>
            <a
              href="https://wa.me/256781674358"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#048310] hover:bg-[#036a0d] text-white px-3 py-1.5 rounded-lg font-semibold shadow-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us: +256 781 674358</span>
            </a>
            <a
              href="mailto:info@tambulaugandatours.com"
              className="flex items-center gap-1.5 bg-white border border-[#ded4c3] hover:border-[#ee5f27] px-3 py-1.5 rounded-lg text-[#2c3b30] transition-colors"
            >
              <span>Email: info@tambulaugandatours.com</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation (Upcoming vs Previous Trips) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#ded5c6] pb-4 mb-8">
          <div className="flex items-center p-1 bg-white rounded-xl border border-[#ded5c6] shadow-xs w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('upcoming')}
              id="tab-upcoming-trips"
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-[#ee5f27] text-white shadow-xs'
                  : 'text-[#506054] hover:text-[#102419]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Upcoming Group Trips ({trips.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('former')}
              id="tab-previous-trips"
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'former'
                  ? 'bg-[#048310] text-white shadow-xs'
                  : 'text-[#506054] hover:text-[#102419]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Previous Trips &amp; Proof ({formerTrips.length})</span>
            </button>
          </div>

          {/* Controls: Upload Proof Button & View Switcher */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {activeTab === 'upcoming' && (
              <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-[#ded5c6] text-xs">
                <span className="text-[11px] text-gray-500 font-medium">View:</span>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-2 py-1 rounded font-semibold ${viewMode === 'cards' ? 'bg-[#f0e7d8] text-[#102419]' : 'text-gray-500 hover:text-black'}`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-2 py-1 rounded font-semibold ${viewMode === 'table' ? 'bg-[#f0e7d8] text-[#102419]' : 'text-gray-500 hover:text-black'}`}
                >
                  Table
                </button>
              </div>
            )}

            {activeTab === 'former' && (
              <button
                onClick={() => setIsUploadModalOpen(true)}
                id="btn-upload-memory"
                className="inline-flex items-center gap-1.5 bg-[#ee5f27] hover:bg-[#d64e18] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all active:scale-98"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>+ Upload Former Trip Memory</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: UPCOMING GROUP TRIPS */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-gray-500 font-semibold mr-1">Filter Region:</span>
              {[
                { id: 'all', label: 'All Destinations' },
                { id: 'uganda', label: '🇺🇬 Uganda' },
                { id: 'rwanda', label: '🇷🇼 Rwanda' },
                { id: 'kenya', label: '🇰🇪 Kenya' },
                { id: 'tanzania', label: '🇹🇿 Tanzania' },
                { id: 'ethiopia', label: '🇪🇹 Ethiopia' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterCountry(f.id)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    filterCountry === f.id
                      ? 'bg-[#102419] text-white border-[#102419]'
                      : 'bg-white text-[#4f5c53] border-[#ded5c6] hover:border-[#ee5f27]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* TABLE VIEW (matching screenshot requested by user) */}
            {viewMode === 'table' && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#ded5c6] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#2c3b30]">
                    <thead className="bg-[#faf7f2] text-[#102419] font-bold text-[11px] uppercase tracking-wider border-b border-[#ded5c6]">
                      <tr>
                        <th className="py-3.5 px-4">Destination</th>
                        <th className="py-3.5 px-4">Duration</th>
                        <th className="py-3.5 px-4">Departure Dates</th>
                        <th className="py-3.5 px-4">Cost / Person</th>
                        <th className="py-3.5 px-4">Seats Left</th>
                        <th className="py-3.5 px-4">Countdown</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#eee6da]">
                      {filteredTrips.map((trip) => {
                        const countdown = calculateTimeLeft(trip.departureTimestamp);
                        return (
                          <tr key={trip.id} className="hover:bg-[#faf7f2]/70 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2.5">
                                <span className="text-xl shrink-0">{trip.flag}</span>
                                <div>
                                  <div className="font-bold text-[#102419] text-sm">
                                    {trip.title}
                                  </div>
                                  <div className="text-[11px] text-[#6d7c71]">
                                    {trip.destination}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-4 font-semibold text-[#102419]">
                              {trip.duration}
                            </td>

                            <td className="py-4 px-4">
                              <div className="font-semibold text-[#102419]">{trip.datesDisplay}</div>
                              <div className="text-[10px] text-gray-500">{trip.route}</div>
                            </td>

                            <td className="py-4 px-4">
                              <div className="font-bold text-sm text-[#ee5f27]">
                                {formatPrice(trip.priceUSD, currency)}
                              </div>
                              {currency !== 'UGX' && (
                                <div className="text-[10px] text-gray-500">
                                  UGX {trip.priceUGX?.toLocaleString()}
                                </div>
                              )}
                            </td>

                            <td className="py-4 px-4">
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#fdf2ec] border border-[#ee5f27]/30 text-[#ee5f27] font-bold text-xs">
                                <span>{trip.spotsLeft} seats left</span>
                              </div>
                              <div className="text-[10px] text-gray-400 mt-1">
                                {trip.seatsBooked} of {trip.maxGroupSize} booked
                              </div>
                            </td>

                            <td className="py-4 px-4 font-mono text-[11px]">
                              {countdown.isPast ? (
                                <span className="text-gray-400 font-sans">Departed</span>
                              ) : (
                                <div className="text-[#048310] font-bold">
                                  {countdown.days}d {countdown.hours}h {countdown.minutes}m
                                </div>
                              )}
                            </td>

                            <td className="py-4 px-4 text-right">
                              <div className="inline-flex items-center gap-2">
                                <button
                                  onClick={() => handleWhatsAppInquiry(trip)}
                                  className="p-2 rounded-lg bg-[#048310]/10 hover:bg-[#048310]/20 text-[#048310] transition-colors"
                                  title="Inquire on WhatsApp"
                                >
                                  <MessageCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleBookTrip(trip)}
                                  className="bg-[#ee5f27] hover:bg-[#d64e18] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95"
                                >
                                  Book Now
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CARD / GRID VIEW */}
            {viewMode === 'cards' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrips.map((trip) => {
                  const countdown = calculateTimeLeft(trip.departureTimestamp);
                  const isExpanded = expandedItineraryId === trip.id;
                  const percentBooked = Math.round((trip.seatsBooked / trip.maxGroupSize) * 100);

                  return (
                    <div
                      key={trip.id}
                      className="bg-white rounded-2xl border border-[#ded5c6] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                    >
                      <div>
                        {/* Image Header with Countdown & Badges */}
                        <div className="relative aspect-16/10 overflow-hidden bg-black/5">
                          <img
                            src={trip.image}
                            alt={trip.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                          {/* Country & Status Badge */}
                          <div className="absolute top-3 left-3 flex items-center gap-1.5">
                            <span className="bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1">
                              <span>{trip.flag}</span>
                              <span>{trip.country}</span>
                            </span>
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold text-white ${
                              trip.status === 'Limited Seats' ? 'bg-[#ee5f27]' : 'bg-[#048310]'
                            }`}>
                              {trip.status}
                            </span>
                          </div>

                          {/* Days Pill */}
                          <div className="absolute top-3 right-3 bg-white text-[#102419] px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs">
                            {trip.duration}
                          </div>

                          {/* Countdown Bar on Bottom of Photo */}
                          <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md rounded-xl p-2 px-3 text-white flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 text-xs text-[#f4d160] font-semibold">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Countdown:</span>
                            </div>
                            <div className="font-mono text-xs font-bold tracking-wider">
                              {countdown.isPast ? (
                                <span className="text-gray-300">Departed</span>
                              ) : (
                                <span>
                                  {countdown.days}d : {countdown.hours}h : {countdown.minutes}m : {countdown.seconds}s
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 space-y-4">
                          <div>
                            <h3 className="font-display text-lg font-bold text-[#102419] group-hover:text-[#ee5f27] transition-colors">
                              {trip.title}
                            </h3>
                            <p className="text-xs text-[#637267] mt-1 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#ee5f27] shrink-0" />
                              <span>{trip.route}</span>
                            </p>
                          </div>

                          {/* Highlights */}
                          {trip.highlights && (
                            <div className="flex flex-wrap gap-1.5">
                              {trip.highlights.slice(0, 3).map((h, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] bg-[#f5efe4] text-[#3e4b41] px-2 py-0.5 rounded-md font-medium"
                                >
                                  ✓ {h}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Seat Capacity Progress */}
                          <div className="bg-[#faf7f2] p-3 rounded-xl border border-[#eee5d8] space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[#59675e] font-semibold flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-[#ee5f27]" />
                                <span>Seats Availability:</span>
                              </span>
                              <span className="font-bold text-[#ee5f27]">
                                {trip.spotsLeft} Seats Left
                              </span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full h-2 bg-[#e5ddd1] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-linear-to-r from-[#048310] to-[#ee5f27] rounded-full transition-all duration-500"
                                style={{ width: `${percentBooked}%` }}
                              />
                            </div>
                            <div className="text-[10px] text-gray-400 text-right">
                              {trip.seatsBooked} of {trip.maxGroupSize} spots confirmed
                            </div>
                          </div>

                          {/* Price Display */}
                          <div className="flex items-baseline justify-between border-t border-[#eee5d8] pt-3">
                            <div>
                              <span className="text-[10px] text-gray-400 block uppercase">Price per person</span>
                              <div className="text-xl font-bold font-display text-[#ee5f27]">
                                {formatPrice(trip.priceUSD, currency)}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-gray-400 block uppercase">Trip Dates</span>
                              <span className="text-xs font-bold text-[#102419]">{trip.datesDisplay}</span>
                            </div>
                          </div>

                          {/* Itinerary Accordion Button */}
                          <button
                            onClick={() => setExpandedItineraryId(isExpanded ? null : trip.id)}
                            className="w-full py-1.5 text-xs text-[#526056] hover:text-[#102419] font-semibold flex items-center justify-center gap-1 border-t border-[#eee5d8]"
                          >
                            <span>{isExpanded ? 'Hide Itinerary & Inclusions' : 'View Itinerary & What’s Included'}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {/* Expanded Itinerary & Inclusions Drawer */}
                          {isExpanded && (
                            <div className="pt-2 space-y-3 text-xs border-t border-[#e8ded0] bg-[#faf7f2] -mx-5 px-5 py-4">
                              {trip.itinerary && (
                                <div className="space-y-2">
                                  <h4 className="font-bold text-[#102419] uppercase tracking-wider text-[10px]">
                                    Day-by-Day Schedule:
                                  </h4>
                                  {trip.itinerary.map((day) => (
                                    <div key={day.day} className="border-l-2 border-[#ee5f27] pl-2.5 py-0.5">
                                      <div className="font-bold text-[#102419]">
                                        Day {day.day}: {day.title}
                                      </div>
                                      <p className="text-[11px] text-[#556358] leading-relaxed mt-0.5">
                                        {day.description}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {trip.included && (
                                <div className="space-y-1.5 pt-2 border-t border-[#e8ded0]">
                                  <h4 className="font-bold text-[#048310] uppercase tracking-wider text-[10px]">
                                    What’s Included:
                                  </h4>
                                  <ul className="space-y-1 text-[11px] text-[#334237]">
                                    {trip.included.map((inc, i) => (
                                      <li key={i} className="flex items-start gap-1.5">
                                        <span className="text-[#048310] font-bold">✓</span>
                                        <span>{inc}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleWhatsAppInquiry(trip)}
                          className="inline-flex items-center justify-center gap-1.5 bg-[#048310] hover:bg-[#036a0d] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Us</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleBookTrip(trip)}
                          className="inline-flex items-center justify-center gap-1.5 bg-[#ee5f27] hover:bg-[#d64e18] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-98"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Book Now</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PREVIOUS TRIPS & PROOF OF LEGITIMACY */}
        {activeTab === 'former' && (
          <div className="space-y-8">
            {/* Trust Assurance Banner */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#ded5c6] shadow-sm relative overflow-hidden">
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#048310] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Proof of Genuine Trips &amp; Traveler Trust</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#102419]">
                  Have Trust Issues? We Understand!
                </h2>
                <p className="text-xs sm:text-sm text-[#506054] leading-relaxed">
                  We know booking a tour in Africa can feel daunting with fraudulent online operators.
                  Tambula Uganda Tours is officially registered and accredited. Here are real photos,
                  video clips, traveler group memories, and verified reviews from former trips led by
                  our certified naturalist expedition team.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-[#102419]">
                  <span className="flex items-center gap-1 text-[#048310]">
                    ✓ Over 300+ Happy Group Travelers
                  </span>
                  <span className="flex items-center gap-1 text-[#048310]">
                    ✓ Registered with Uganda Wildlife Authority (UWA)
                  </span>
                  <span className="flex items-center gap-1 text-[#048310]">
                    ✓ Official Member of Association of Uganda Tour Operators (AUTO)
                  </span>
                </div>
              </div>

              {/* Operations stamp */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-6 sm:right-6 bg-[#faf7f2] border border-[#ded5c6] p-3 rounded-xl text-center">
                <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                  24/7 Operations Desk
                </div>
                <div className="text-xs font-bold text-[#102419]">Tambula Expeditions</div>
                <div className="text-[11px] text-[#048310] font-mono font-semibold">+256 781 674358</div>
              </div>
            </div>

            {/* Former Trips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formerTrips.map((past) => (
                <div
                  key={past.id}
                  className="bg-white rounded-2xl border border-[#ded5c6] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Media Cover with Video Play Action */}
                    <div className="relative aspect-16/10 overflow-hidden bg-black">
                      <img
                        src={past.coverImage}
                        alt={past.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Flag & Date */}
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1">
                        <span>{past.flag}</span>
                        <span>{past.dates}</span>
                      </div>

                      {/* Participant Count */}
                      <div className="absolute top-3 right-3 bg-[#048310] text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{past.travelersCount} Travelers</span>
                      </div>

                      {/* Video Button */}
                      {past.hasVideo && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedVideoTrip(past);
                            setIsVideoModalOpen(true);
                          }}
                          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#ee5f27] hover:bg-[#d64e18] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
                          title="Watch Former Trip Video"
                        >
                          <Play className="w-5 h-5 ml-0.5 fill-white" />
                        </button>
                      )}

                      {/* Destination label bottom */}
                      <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                        <div className="font-bold flex items-center gap-1 text-[#f4d160]">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{past.destination}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3 text-xs">
                      <h3 className="font-display text-base font-bold text-[#102419]">
                        {past.title}
                      </h3>

                      <p className="text-[#59685e] leading-relaxed text-[11px]">
                        {past.summary}
                      </p>

                      {/* Lead Guide & Date Tag */}
                      <div className="text-[11px] text-[#2e3c32] bg-[#faf7f2] p-2.5 rounded-lg border border-[#eee5d8] flex items-center justify-between">
                        <span>Lead Guide: <strong>{past.leadGuide}</strong></span>
                        <span className="text-[#048310] font-semibold">● Completed</span>
                      </div>

                      {/* Verified Testimonial Quote */}
                      {past.verifiedTestimonial && (
                        <div className="p-3 bg-[#fdf2ec] border border-[#ee5f27]/20 rounded-xl space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#102419] text-[11px]">
                              {past.verifiedTestimonial.author}
                            </span>
                            <span className="text-[#ee5f27] font-bold text-[10px]">
                              ★★★★★ 5.0
                            </span>
                          </div>
                          <p className="text-[11px] italic text-[#634e44] leading-normal">
                            "{past.verifiedTestimonial.quote}"
                          </p>
                          <span className="text-[9px] text-[#8a7266] block">
                            {past.verifiedTestimonial.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 flex items-center gap-2">
                    {past.hasVideo ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedVideoTrip(past);
                          setIsVideoModalOpen(true);
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#048310] hover:bg-[#036a0d] text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs"
                      >
                        <Film className="w-3.5 h-3.5" />
                        <span>Watch Video Reel</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsUploadModalOpen(true)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-[#102419] py-2.5 rounded-xl text-xs font-semibold transition-all"
                      >
                        <Image className="w-3.5 h-3.5" />
                        <span>View Photos</span>
                      </button>
                    )}

                    <a
                      href={`https://wa.me/256781674358?text=${encodeURIComponent(`Hello Tambula Team! I saw the past trip "${past.title}" on your website. When is your next upcoming group departure for this destination?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#faf7f2] hover:bg-[#f0e7d8] border border-[#ded5c6] text-[#102419] transition-colors"
                      title="Ask Tambula team about this trip"
                    >
                      <MessageCircle className="w-4 h-4 text-[#048310]" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload CTA Card */}
            <div className="bg-[#102419] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-[#ee5f27] text-xs font-bold tracking-widest uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>JOIN OUR TOUR ARCHIVES</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  Traveled with Tambula Uganda Tours recently?
                </h3>
                <p className="text-xs text-white/70 max-w-xl">
                  Upload your group photos or video clips directly to our website archive to help prospective travelers book with complete peace of mind!
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-[#ee5f27] hover:bg-[#d64e18] text-white px-6 py-3 rounded-xl text-xs font-bold tracking-wide shadow-md transition-all shrink-0 active:scale-98"
              >
                + Upload Photo / Video Proof
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Online Booking & Payment Modal */}
      <GroupBookingPaymentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        trip={selectedTripForBooking}
        currency={currency}
      />

      {/* Upload Memory Modal */}
      <UploadTripMemoryModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAddMemory={handleAddFormerTrip}
      />

      {/* Video Highlight Player Modal */}
      <TripVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        trip={selectedVideoTrip}
      />
    </div>
  );
};
