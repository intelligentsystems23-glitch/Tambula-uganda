import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  HelpCircle,
  Building,
  CreditCard,
  ChevronDown
} from 'lucide-react';
import { CurrencyConfig } from '../types';

interface ContactPageProps {
  currency: CurrencyConfig;
  onNavigatePage: (pageId: string) => void;
  onPlanTrip: (initialSubject?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  currency,
  onNavigatePage,
  onPlanTrip,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Uganda Mountain Gorillas',
    travelMonth: 'July 2026',
    travelers: '2 Adults',
    notes: '',
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const faqs = [
    {
      q: 'How far in advance should I book my Mountain Gorilla trekking permit?',
      a: 'We strongly recommend booking gorilla permits 3 to 6 months in advance, particularly for peak dry months (June through September and December through February). Uganda Wildlife Authority (UWA) issues a strict limit of only 8 permits per habituated gorilla group per day to protect the primates.',
    },
    {
      q: 'What are your payment terms and deposit requirements?',
      a: 'To guarantee gorilla and chimpanzee permits and reserve your safari 4x4 vehicle, a 30% deposit (or 100% of the permit fee) is required upon itinerary confirmation. The balance is due 30 days prior to departure, or upon arrival in Entebbe by prior written agreement. Payments can be made via Stanbic Bank Wire Transfer, MTN/Airtel Mobile Money, or Credit/Debit card.',
    },
    {
      q: 'What visas and vaccinations do I need for Uganda & East Africa?',
      a: 'Most travelers require an eVisa obtained online prior to departure via visas.immigration.go.ug. If you are combining Uganda, Rwanda, and Kenya, the East Africa Tourist Visa ($100) allows multi-entry across all three countries. Yellow Fever vaccination certificate is mandatory for entry into Uganda.',
    },
    {
      q: 'Can you accommodate solo travelers and custom dietary requirements?',
      a: 'Absolutely! Solo travelers can join our Scheduled Group Expeditions (matching with a same-sex roommate or paying a modest solo room supplement) or book a Bespoke Private Safari. All lodges cater to vegan, vegetarian, gluten-free, halal, and lactose-free requirements with advance notice.',
    },
  ];

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
            <span className="text-[#0e2117] font-semibold">Contact & Support</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[#4f5c52]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#048310] animate-pulse" />
              <span>Safari Concierge Desk Online (EAT UTC+3)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative bg-[#07170e] text-white py-16 lg:py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07170e] via-[#07170e]/95 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ee5f27]/20 border border-[#ee5f27]/40 text-[#ee5f27] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>We’re Here for You</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Start a Conversation.
              <br />
              <span className="text-[#ee5f27]">Plan with Tambula Safari Experts.</span>
            </h1>

            <p className="text-base text-white/80 leading-relaxed max-w-2xl font-light">
              Speak directly with indigenous safari experts in Kampala and Entebbe. Whether you have questions
              about gorilla trekking fitness or want a customized quote, we respond promptly within a few hours.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Fast Contact Cards & Payment Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Quick Chat Highlight */}
            <div className="bg-[#048310]/10 border border-[#048310]/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#048310] text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0e2117]">Fastest Response on WhatsApp</h3>
                  <p className="text-xs text-[#526055]">Direct line to Safari Operations &amp; Bookings Desk</p>
                </div>
              </div>

              <p className="text-xs text-[#415045] leading-relaxed">
                Send us a message with your rough travel dates or questions. We can share real-time permit availability
                and lodge photos directly on WhatsApp.
              </p>

              <a
                href="https://wa.me/256781674358?text=Hello%20Tambula%20Uganda%20Tours%2C%20I%20am%20planning%20a%20trip%20with%20your%20company."
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#048310] hover:bg-[#036c0d] text-white py-3 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Chat on WhatsApp (+256 781 674358)</span>
              </a>
            </div>

            {/* Direct Contact Cards */}
            <div className="bg-white rounded-2xl p-6 border border-[#e5ded2] shadow-xs space-y-5">
              <h3 className="font-bold text-sm text-[#0e2117] uppercase tracking-wider">
                Direct Contact Details
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#ee5f27] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#78887b] block">Telephone Hotline</span>
                    <a href="tel:+256781674358" className="font-semibold text-[#0e2117] hover:text-[#ee5f27]">
                      +256 781 674358
                    </a>
                    <span className="text-[#8e9f91] block text-[11px]">Mon–Sat: 7:30 AM – 8:00 PM EAT</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#ee5f27] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#78887b] block">Official Email</span>
                    <a href="mailto:info@tambulaugandatours.com" className="font-semibold text-[#0e2117] hover:text-[#ee5f27]">
                      info@tambulaugandatours.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#ee5f27] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#78887b] block">Physical Offices</span>
                    <strong className="text-[#0e2117] block">Entebbe International Airport Road, Entebbe</strong>
                    <span className="text-[#59665c] block">Branch: Plot 14 Kampala Road, Central Division, Kampala, Uganda</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#048310] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#78887b] block">24/7 Field Dispatch</span>
                    <span className="text-[#0e2117] font-medium">Emergency on-safari support team is available 24 hours a day, 7 days a week.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#e5ded2] shadow-xs">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#048310]/15 text-[#048310] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0e2117]">Inquiry Received!</h3>
                <p className="text-sm text-[#526055] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. The Tambula Uganda safari team
                  has received your details. We will review lodge and permit availability and send you an itemized
                  safari proposal to <strong>{formData.email}</strong> within 4 hours.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={`https://wa.me/256781674358?text=Hello%20Tambula%20Tours%2C%20I%20just%20submitted%20a%20safari%20inquiry%20on%20your%20website%20for%20${encodeURIComponent(formData.destination)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#048310] hover:bg-[#036c0d] text-white px-5 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Follow up on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-[#faf6f0] text-[#0e2117] hover:bg-[#eee6dc] px-5 py-2.5 rounded-xl text-xs font-semibold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#ee5f27] uppercase block">
                    ONLINE SAFARI INQUIRY
                  </span>
                  <h3 className="text-2xl font-bold text-[#0e2117] mt-1">
                    Tell Us About Your Dream Trip
                  </h3>
                  <p className="text-xs text-[#526055] mt-1">
                    No payment required to inquire. We create a customized, obligation-free itinerary proposal for you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0e2117] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c6] text-xs focus:outline-hidden focus:border-[#ee5f27]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0e2117] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. eleanor@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c6] text-xs focus:outline-hidden focus:border-[#ee5f27]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0e2117] mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +1 555 123 4567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c6] text-xs focus:outline-hidden focus:border-[#ee5f27]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0e2117] mb-1">
                      Target Destination / Expedition
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c6] text-xs focus:outline-hidden focus:border-[#ee5f27] bg-white"
                    >
                      <option value="Uganda Mountain Gorillas">Uganda Mountain Gorillas & Bwindi</option>
                      <option value="Tanzania Serengeti & Ngorongoro">Tanzania Serengeti & Ngorongoro</option>
                      <option value="Zanzibar Spice Island Beach">Zanzibar Spice Island & Beach</option>
                      <option value="Kenya Masai Mara Migration">Kenya Masai Mara & Amboseli</option>
                      <option value="Rwanda Volcanoes Trekking">Rwanda Volcanoes & Nyungwe</option>
                      <option value="Dubai International Holiday">Dubai Luxury Holiday Extension</option>
                      <option value="Bespoke Multi-Country Circuit">Bespoke Multi-Country East Africa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0e2117] mb-1">
                      Approximate Travel Month / Year
                    </label>
                    <input
                      type="text"
                      value={formData.travelMonth}
                      onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
                      placeholder="e.g. August 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c6] text-xs focus:outline-hidden focus:border-[#ee5f27]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0e2117] mb-1">
                      Number of Travelers
                    </label>
                    <input
                      type="text"
                      value={formData.travelers}
                      onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                      placeholder="e.g. 2 Adults, 1 Child"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c6] text-xs focus:outline-hidden focus:border-[#ee5f27]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0e2117] mb-1">
                    Special Requests, Interests or Dietary Preferences
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us if you prefer luxury lodges or budget cottages, photography-oriented vehicles, specific bird species, or room preferences..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ded5c6] text-xs focus:outline-hidden focus:border-[#ee5f27]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#ee5f27] hover:bg-[#d64e18] text-white py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Safari Inquiry to Tambula Team</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-[#f3ede3] py-20 border-t border-[#e2d8c9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="text-[#ee5f27] text-xs font-bold uppercase tracking-widest">
              TRAVELER ESSENTIALS
            </span>
            <h2 className="text-3xl font-bold text-[#0e2117]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#556358]">
              Everything you need to know before stepping foot on East African soil.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#ded4c5] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left font-semibold text-sm text-[#0e2117] flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8a998e] transition-transform ${
                        isOpen ? 'rotate-180 text-[#ee5f27]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-[#526055] leading-relaxed border-t border-[#f2ece2] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
