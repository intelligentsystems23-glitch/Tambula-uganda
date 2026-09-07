import React, { useState } from 'react';
import { X, Plane, Clock, ShieldCheck, Car, Check } from 'lucide-react';
import { FLIGHT_SERVICES_INFO } from '../data/safariData';

interface FlightConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlightConciergeModal: React.FC<FlightConciergeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'shuttle' | 'bushflights'>('shuttle');
  const [transferType, setTransferType] = useState('4x4 Safari Land Cruiser');
  const [flightNumber, setFlightNumber] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [passengers, setPassengers] = useState('2');
  const [hotelDestination, setHotelDestination] = useState('');
  const [booked, setBooked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="flight-concierge-modal-container"
        className="bg-[#faf8f5] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-[#ded5c7] flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#0e2117] text-white p-6 rounded-t-2xl flex items-center justify-between border-b border-white/10">
          <div>
            <div className="flex items-center gap-1.5 text-[#ee5f27] text-xs font-bold tracking-widest uppercase">
              <Plane className="w-3.5 h-3.5" />
              <span>AIR CONCIERGE &amp; GROUND TRANSFERS</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              Entebbe Airport &amp; Domestic Bush Flights
            </h2>
            <p className="text-xs text-white/70">
              24/7 VIP airport greetings, flight reconfirmations, and chartered bush connections.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="border-b border-[#e5dccf] bg-white px-6 flex space-x-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('shuttle')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'shuttle'
                ? 'border-[#ee5f27] text-[#0e2117]'
                : 'border-transparent text-[#66746a] hover:text-[#0e2117]'
            }`}
          >
            Entebbe (EBB) Airport Transfers
          </button>
          <button
            onClick={() => setActiveTab('bushflights')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'bushflights'
                ? 'border-[#ee5f27] text-[#0e2117]'
                : 'border-transparent text-[#66746a] hover:text-[#0e2117]'
            }`}
          >
            Domestic Bush Flight Timetable
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {booked ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#e8efe8] text-[#048310] mx-auto flex items-center justify-center text-2xl">
                ✓
              </div>
              <h3 className="font-display text-2xl font-bold text-[#102419]">
                Transfer Request Dispatched!
              </h3>
              <p className="text-xs text-[#4d5950] max-w-md mx-auto">
                Our Entebbe airport operations team has logged your transfer for Flight{' '}
                <strong>{flightNumber || 'EBB Arrival'}</strong> on <strong>{arrivalDate || 'your arrival date'}</strong>. A dedicated chauffeur confirmation will be sent shortly.
              </p>
              <button
                onClick={() => {
                  setBooked(false);
                  onClose();
                }}
                className="bg-[#0e2117] text-white px-6 py-2 rounded-xl text-xs font-semibold"
              >
                Done
              </button>
            </div>
          ) : activeTab === 'shuttle' ? (
            <div className="space-y-6">
              {/* Fleet Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102419] mb-3">
                  Select Chauffeur Vehicle
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {FLIGHT_SERVICES_INFO.transfers.map((v) => (
                    <button
                      type="button"
                      key={v.type}
                      onClick={() => setTransferType(v.type)}
                      className={`p-4 rounded-xl border text-left text-xs transition-all ${
                        transferType === v.type
                          ? 'bg-[#fdf2ec] border-[#ee5f27] text-[#102419] shadow-xs'
                          : 'bg-white border-[#e0d6c8] text-[#4d5950] hover:bg-[#f8f5f0]'
                      }`}
                    >
                      <div className="font-bold text-sm text-[#102419] mb-1 flex items-center justify-between">
                        <span>{v.type}</span>
                        {transferType === v.type && <Check className="w-4 h-4 text-[#ee5f27]" />}
                      </div>
                      <div className="text-[11px] text-[#ee5f27] font-semibold mb-1">
                        Capacity: {v.passengers}
                      </div>
                      <div className="text-[11px] text-[#637267] leading-tight">
                        {v.features}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl border border-[#e4dbce] space-y-4">
                <h4 className="font-display font-bold text-sm text-[#102419]">
                  Arrival &amp; Drop-off Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[#4b594e] font-medium mb-1">
                      Flight Number (e.g. EK 729, QR 1383, KL 535)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. EK 729"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#d8cebe] bg-[#faf8f5] focus:outline-hidden focus:border-[#ee5f27]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4b594e] font-medium mb-1">
                      Arrival Date &amp; Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#d8cebe] bg-[#faf8f5] focus:outline-hidden focus:border-[#ee5f27]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4b594e] font-medium mb-1">
                      Number of Passengers &amp; Luggage
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2 Adults, 3 Suitcases"
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#d8cebe] bg-[#faf8f5] focus:outline-hidden focus:border-[#ee5f27]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4b594e] font-medium mb-1">
                      Destination / Hotel (Entebbe / Kampala)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Serena Hotel Kampala or Lake Victoria Hotel Entebbe"
                      value={hotelDestination}
                      onChange={(e) => setHotelDestination(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#d8cebe] bg-[#faf8f5] focus:outline-hidden focus:border-[#ee5f27]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#0e2117] hover:bg-[#193a27] text-white px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm"
                  >
                    Confirm Airport Dispatch Request
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-[#4d5950] leading-relaxed">
                Tambula coordinates scheduled bush flights and private charters connecting Entebbe
                International Airport directly to the heart of Uganda’s national parks, saving 8–10 hours
                of overland highway travel.
              </p>

              <div className="bg-white rounded-xl border border-[#e4dbce] overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#fdf2ec] text-[#102419] font-bold border-b border-[#e4dbce]">
                    <tr>
                      <th className="p-3">Airstrip</th>
                      <th className="p-3">Serves National Park</th>
                      <th className="p-3">Est. Flight Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eee5d7]">
                    {FLIGHT_SERVICES_INFO.destinationsServed.map((d, i) => (
                      <tr key={i} className="hover:bg-[#faf7f2]">
                        <td className="p-3 font-semibold text-[#102419]">{d.name}</td>
                        <td className="p-3 text-[#4c5a50]">{d.connects}</td>
                        <td className="p-3 text-[#ee5f27] font-medium">{d.flightTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-[#e8efe8] border border-[#cfded0] text-xs text-[#1e4828] flex items-center justify-between">
                <div>
                  <span className="font-bold block">Looking for a chartered bush flight?</span>
                  <span className="text-[11px]">We charter Cessna Caravans &amp; Pilatus PC-12 for private parties.</span>
                </div>
                <a
                  href="https://wa.me/256781674358"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#048310] hover:bg-[#036e0d] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  WhatsApp Flight Desk
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
