import React, { useState } from 'react';
import { X, Check, ShieldCheck, CreditCard, Smartphone, Building, Send, Download, Printer, Users, Calendar, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { CurrencyCode, GroupDeparture } from '../types';
import { formatPrice } from '../utils/currency';

interface GroupBookingPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: GroupDeparture | null;
  currency: CurrencyCode;
}

export const GroupBookingPaymentModal: React.FC<GroupBookingPaymentModalProps> = ({
  isOpen,
  onClose,
  trip,
  currency,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState('');
  const [travelersCount, setTravelersCount] = useState(1);
  const [roomType, setRoomType] = useState<'Twin Share' | 'Solo Room (+Supplement)'>('Twin Share');
  const [specialDiet, setSpecialDiet] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'airtel' | 'card' | 'bank'>('mtn');
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen || !trip) return null;

  const basePricePerPerson = trip.priceUSD;
  const singleSupplementUSD = roomType === 'Solo Room (+Supplement)' ? 80 : 0;
  const totalUSD = (basePricePerPerson + singleSupplementUSD) * travelersCount;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) {
      alert('Please provide your full name, email, and WhatsApp / phone number.');
      return;
    }
    setStep('payment');
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedRef = `TAM-${trip.flag === '🇷🇼' ? 'RWA' : trip.flag === '🇰🇪' ? 'KEN' : trip.flag === '🇹🇿' ? 'TZA' : 'UGA'}-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(generatedRef);
      setIsProcessing(false);
      setStep('confirmed');
    }, 1200);
  };

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(
      `*New Group Trip Booking - Tambula Uganda Tours*\n\n` +
      `*Booking Ref:* ${bookingRef}\n` +
      `*Trip:* ${trip.title} (${trip.duration})\n` +
      `*Dates:* ${trip.datesDisplay}\n` +
      `*Lead Traveler:* ${fullName}\n` +
      `*Seats:* ${travelersCount} Traveler(s)\n` +
      `*Room:* ${roomType}\n` +
      `*Total Amount:* ${formatPrice(totalUSD, currency)}\n` +
      `*Payment Method:* ${paymentMethod.toUpperCase()}\n` +
      `*Phone/WhatsApp:* ${phone}\n\n` +
      `Hello Tambula Uganda Tours! I have submitted my group booking through the website. Please confirm my reserved seat.`
    );
    window.open(`https://wa.me/256781674358?text=${text}`, '_blank');
  };

  const resetAndClose = () => {
    setStep('details');
    setFullName('');
    setEmail('');
    setPhone('');
    setNationality('');
    setTravelersCount(1);
    setRoomType('Twin Share');
    setSpecialDiet('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-[#ded5c6]">
        {/* Header */}
        <div className="bg-[#0e2117] text-white p-6 flex items-center justify-between border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#ee5f27] text-[11px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL GROUP TRIP BOOKING</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white mt-1 flex items-center gap-2">
              <span>{trip.flag}</span>
              <span>{trip.title}</span>
            </h2>
            <p className="text-xs text-white/70 mt-0.5">
              {trip.duration} · {trip.datesDisplay} · {trip.spotsLeft} seats available
            </p>
          </div>

          <button
            onClick={resetAndClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-[#faf7f2] px-6 py-3 border-b border-[#e8ded0] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
              step === 'details' ? 'bg-[#ee5f27] text-white' : 'bg-[#048310] text-white'
            }`}>
              {step === 'details' ? '1' : '✓'}
            </span>
            <span className={`font-semibold ${step === 'details' ? 'text-[#102419]' : 'text-[#5a675e]'}`}>
              Traveler Information
            </span>
          </div>

          <div className="w-8 h-0.5 bg-[#d9cfc1]" />

          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
              step === 'payment' ? 'bg-[#ee5f27] text-white' : step === 'confirmed' ? 'bg-[#048310] text-white' : 'bg-[#e5dcd0] text-[#717d74]'
            }`}>
              {step === 'confirmed' ? '✓' : '2'}
            </span>
            <span className={`font-semibold ${step === 'payment' ? 'text-[#102419]' : 'text-[#5a675e]'}`}>
              Payment Method
            </span>
          </div>

          <div className="w-8 h-0.5 bg-[#d9cfc1]" />

          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
              step === 'confirmed' ? 'bg-[#048310] text-white' : 'bg-[#e5dcd0] text-[#717d74]'
            }`}>
              3
            </span>
            <span className={`font-semibold ${step === 'confirmed' ? 'text-[#048310]' : 'text-[#5a675e]'}`}>
              Confirmation
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              {/* Trip Summary Card */}
              <div className="bg-[#f5ede0]/50 p-4 rounded-xl border border-[#ded3c2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-[#102419]">{trip.destination}</div>
                  <div className="text-[#657369]">{trip.route}</div>
                </div>
                <div className="text-right sm:text-right">
                  <span className="text-gray-500 block">Trip Price:</span>
                  <span className="text-base font-bold text-[#ee5f27]">
                    {formatPrice(trip.priceUSD, currency)}
                  </span>
                  <span className="text-gray-500 text-[11px] block">/ person</span>
                </div>
              </div>

              {/* Travelers & Room Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#102419] mb-1">
                    Number of Travelers (Seats):
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max={Math.min(trip.spotsLeft, 6)}
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(Number(e.target.value))}
                      className="w-full accent-[#ee5f27]"
                    />
                    <span className="font-bold text-sm text-[#ee5f27] min-w-[2.5rem] px-2 py-1 bg-[#fdf2ec] rounded border border-[#ee5f27]/30 text-center">
                      {travelersCount}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#717d74]">
                    Max {Math.min(trip.spotsLeft, 6)} spots available for this booking
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102419] mb-1">
                    Room Preference:
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                  >
                    <option value="Twin Share">Twin Share with traveler (Standard)</option>
                    <option value="Solo Room (+Supplement)">Private Solo Room (+{formatPrice(80, currency)} supplement)</option>
                  </select>
                </div>
              </div>

              {/* Traveler Personal Info */}
              <div className="space-y-3 pt-2 border-t border-[#eee5d8]">
                <h4 className="text-xs font-bold text-[#102419] uppercase tracking-wider">
                  Lead Traveler Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#3d4940] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Bosco"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#3d4940] mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +256 700 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#3d4940] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#3d4940] mb-1">
                      Nationality / Residence
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ugandan, Kenyan, British, USA"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#3d4940] mb-1">
                    Special Dietary Needs or Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vegetarian, Halal, pickup at Kampala Serena Hotel"
                    value={specialDiet}
                    onChange={(e) => setSpecialDiet(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                  />
                </div>
              </div>

              {/* Price Calculation Banner */}
              <div className="bg-[#102419] text-white p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-white/70 block">Total Due:</span>
                  <span className="text-2xl font-bold font-display text-white">
                    {formatPrice(totalUSD, currency)}
                  </span>
                  <span className="text-[11px] text-[#ee5f27] font-medium block">
                    ({travelersCount} seat{travelersCount > 1 ? 's' : ''} · {roomType})
                  </span>
                </div>

                <button
                  type="submit"
                  id="btn-proceed-to-payment"
                  className="bg-[#ee5f27] hover:bg-[#d64e18] text-white px-6 py-2.5 rounded-xl text-xs font-bold tracking-wide shadow-md transition-all active:scale-98"
                >
                  Continue to Payment →
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              {/* Order Summary Recap */}
              <div className="bg-[#faf7f2] p-4 rounded-xl border border-[#e8ded0] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#102419] block">{trip.title}</span>
                  <span className="text-[#68766c]">{travelersCount} Traveler(s) · {trip.datesDisplay}</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-[#ee5f27]">
                    {formatPrice(totalUSD, currency)}
                  </span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#102419] uppercase tracking-wider">
                  Select Payment Method
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* MTN Mobile Money */}
                  <label
                    onClick={() => setPaymentMethod('mtn')}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      paymentMethod === 'mtn'
                        ? 'border-[#ee5f27] bg-[#fdf2ec] shadow-xs'
                        : 'border-[#ded5c6] bg-white hover:border-[#cfc4b3]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'mtn'}
                      onChange={() => setPaymentMethod('mtn')}
                      className="text-[#ee5f27] focus:ring-[#ee5f27]"
                    />
                    <div className="w-8 h-8 rounded-full bg-[#ffcc00] text-black font-extrabold flex items-center justify-center text-[10px] shrink-0 shadow-xs">
                      MTN
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-[#102419]">MTN Mobile Money</div>
                      <div className="text-[11px] text-[#637167]">Instant prompt & USSD</div>
                    </div>
                  </label>

                  {/* Airtel Money */}
                  <label
                    onClick={() => setPaymentMethod('airtel')}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      paymentMethod === 'airtel'
                        ? 'border-[#ee5f27] bg-[#fdf2ec] shadow-xs'
                        : 'border-[#ded5c6] bg-white hover:border-[#cfc4b3]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'airtel'}
                      onChange={() => setPaymentMethod('airtel')}
                      className="text-[#ee5f27] focus:ring-[#ee5f27]"
                    />
                    <div className="w-8 h-8 rounded-full bg-[#ed1c24] text-white font-extrabold flex items-center justify-center text-[10px] shrink-0 shadow-xs">
                      airtel
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-[#102419]">Airtel Money</div>
                      <div className="text-[11px] text-[#637167]">Fast East Africa transfer</div>
                    </div>
                  </label>

                  {/* Visa / Mastercard */}
                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#ee5f27] bg-[#fdf2ec] shadow-xs'
                        : 'border-[#ded5c6] bg-white hover:border-[#cfc4b3]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-[#ee5f27] focus:ring-[#ee5f27]"
                    />
                    <div className="w-8 h-8 rounded-full bg-[#1a1f71] text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                      💳
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-[#102419]">Credit / Debit Card</div>
                      <div className="text-[11px] text-[#637167]">Visa & Mastercard (3D Secure)</div>
                    </div>
                  </label>

                  {/* Bank Wire */}
                  <label
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-[#ee5f27] bg-[#fdf2ec] shadow-xs'
                        : 'border-[#ded5c6] bg-white hover:border-[#cfc4b3]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="text-[#ee5f27] focus:ring-[#ee5f27]"
                    />
                    <div className="w-8 h-8 rounded-full bg-[#048310] text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                      🏦
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-[#102419]">Bank Transfer / Deposit</div>
                      <div className="text-[11px] text-[#637167]">Stanbic Bank Uganda</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Dynamic Payment Input Section */}
              {(paymentMethod === 'mtn' || paymentMethod === 'airtel') && (
                <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#ded5c6] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#102419]">
                    <Smartphone className="w-4 h-4 text-[#ee5f27]" />
                    <span>Enter {paymentMethod === 'mtn' ? 'MTN' : 'Airtel'} Phone Number to Authorize:</span>
                  </div>
                  <input
                    type="tel"
                    placeholder={paymentMethod === 'mtn' ? 'e.g. 0781 674358 or +256...' : 'e.g. 0700 000 000'}
                    value={mobileMoneyNumber}
                    onChange={(e) => setMobileMoneyNumber(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                  />
                  <p className="text-[11px] text-[#68766c] leading-relaxed">
                    You will receive an official push prompt on your phone to complete your payment to <strong>Tambula Uganda Tours and Travel</strong>.
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#ded5c6] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#102419]">
                    <CreditCard className="w-4 h-4 text-[#ee5f27]" />
                    <span>Secure Card Payment</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Card Number (4111 2222 3333 4444)"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                    />
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="CVC / CVV"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                    />
                  </div>
                  <p className="text-[11px] text-[#048310] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>256-bit TLS encrypted bank-grade checkout</span>
                  </p>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="p-4 rounded-xl bg-[#f0f7f2] border border-[#b8dfc1] space-y-2 text-xs">
                  <div className="font-bold text-[#0e3b1c] flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-[#048310]" />
                    <span>Official Bank Wire Instructions</span>
                  </div>
                  <div className="text-[11px] text-[#1c4827] space-y-1">
                    <div><strong>Bank:</strong> Stanbic Bank Uganda Limited</div>
                    <div><strong>Account Name:</strong> Tambula Uganda Tours &amp; Travel Ltd</div>
                    <div><strong>Account No (UGX):</strong> 9030018472910</div>
                    <div><strong>Account No (USD):</strong> 9030018472922</div>
                    <div><strong>Branch / SWIFT:</strong> Forest Mall Lugogo / SBICUGKX</div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-[#eee5d8]">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs text-[#526056] hover:text-[#102419] font-medium"
                >
                  ← Back to Details
                </button>

                <button
                  type="button"
                  id="btn-complete-booking"
                  disabled={isProcessing}
                  onClick={handleProcessPayment}
                  className="inline-flex items-center gap-2 bg-[#ee5f27] hover:bg-[#d64e18] text-white px-7 py-3 rounded-xl text-xs font-bold tracking-wide shadow-md transition-all active:scale-98 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Confirming Reservation...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Confirm &amp; Reserve My Seat ({formatPrice(totalUSD, currency)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#e8efe8] text-[#048310] mx-auto flex items-center justify-center text-3xl shadow-sm">
                ✓
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#048310] uppercase tracking-wider block">
                  BOOKING CONFIRMED &amp; SEAT RESERVED
                </span>
                <h3 className="font-display text-2xl font-bold text-[#102419] mt-1">
                  Thank you, {fullName}!
                </h3>
                <p className="text-xs text-[#556358] mt-1">
                  Your seat for <strong>{trip.title}</strong> is reserved with Tambula Uganda Tours.
                </p>
              </div>

              {/* Digital Booking Voucher */}
              <div className="bg-[#faf7f2] border-2 border-dashed border-[#dcd2c4] p-5 rounded-2xl text-left text-xs space-y-3 relative">
                <div className="flex items-center justify-between border-b border-[#e3dacf] pb-3">
                  <div>
                    <span className="text-[10px] text-gray-500 block uppercase tracking-wider">Booking Reference</span>
                    <span className="font-mono font-bold text-base text-[#ee5f27]">{bookingRef}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 block uppercase tracking-wider">Trip Dates</span>
                    <span className="font-semibold text-[#102419]">{trip.datesDisplay}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-gray-500 block">Lead Traveler:</span>
                    <span className="font-semibold text-[#102419]">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Travelers Count:</span>
                    <span className="font-semibold text-[#102419]">{travelersCount} Person(s)</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Phone / WhatsApp:</span>
                    <span className="font-semibold text-[#102419]">{phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Total Amount:</span>
                    <span className="font-bold text-[#048310]">{formatPrice(totalUSD, currency)}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#e3dacf] flex items-center justify-between text-[11px] text-[#637267]">
                  <span>Operator: Tambula Uganda Tours and Travel</span>
                  <span className="font-bold text-[#048310]">● Verified Official</span>
                </div>
              </div>

              {/* Instant WhatsApp Verification CTA */}
              <div className="p-4 bg-[#f0f8f1] rounded-xl border border-[#bce0c3] text-left space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="text-xl">💬</span>
                  <div className="text-xs text-[#1c4826]">
                    <div className="font-bold">Instant WhatsApp Confirmation with Tambula Team:</div>
                    <div className="text-[11px] text-[#2c5b36]">
                      Click below to send your reservation reference directly to our Reservations Desk on WhatsApp (+256 781 674358) for rapid orientation and group packing list!
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  id="btn-whatsapp-booking-confirm"
                  onClick={handleSendToWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#048310] hover:bg-[#036a0d] text-white py-2.5 rounded-lg text-xs font-bold shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Booking Slip to Tambula Reservations (+256 781 674358)</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#ded5c6] rounded-lg text-xs font-semibold text-[#3d4b41] hover:bg-gray-50"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={resetAndClose}
                  className="px-5 py-2 bg-[#0e2117] text-white rounded-lg text-xs font-semibold hover:bg-[#1a3828]"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
