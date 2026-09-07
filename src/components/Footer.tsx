import React from 'react';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

interface FooterProps {
  onPlanTripClick: () => void;
  onViewGroupDepartures: () => void;
  onSelectDestinationById: (destId: string) => void;
  onBookFlightServices: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onPlanTripClick,
  onViewGroupDepartures,
  onSelectDestinationById,
  onBookFlightServices,
}) => {
  return (
    <footer id="contact" className="bg-[#07130b] text-white/80 pt-16 pb-10 border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#183a26] flex items-center justify-center text-[#ee5f27]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white block leading-none">
                  TAMBULA
                </span>
                <span className="font-editorial italic text-xs text-[#ee5f27]">
                  Uganda Tours and Travel
                </span>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed text-xs max-w-sm">
              Ugandan and East African tour specialist creating unforgettable journeys across
              Africa and premier global destinations. Certified gorilla permits, savannah game drives,
              airport transfers, domestic flights, and international holiday extensions.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-2 pt-2 text-white/80">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
              >
                <span className="text-xs font-bold">f</span>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
              >
                <span className="text-xs font-bold">𝕏</span>
              </a>
              <a
                href="https://wa.me/256781674358"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors hover:text-[#048310]"
              >
                <span className="text-xs">💬</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
              >
                <span className="text-xs">📷</span>
              </a>
            </div>
          </div>

          {/* Column 2: Safari & Travel Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase text-white/90">
              SAFARI & TRAVEL SERVICES
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <button
                  onClick={onViewGroupDepartures}
                  className="hover:text-[#ee5f27] transition-colors text-left"
                >
                  Group Safari Departures
                </button>
              </li>
              <li>
                <button
                  onClick={onPlanTripClick}
                  className="text-[#ee5f27] hover:underline font-medium text-left flex items-center gap-1"
                >
                  <span>★</span>
                  <span>Solo & Private Tailored Safaris</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onBookFlightServices}
                  className="hover:text-[#ee5f27] transition-colors text-left"
                >
                  Entebbe Airport (EBB) Pickups
                </button>
              </li>
              <li>
                <button
                  onClick={onBookFlightServices}
                  className="hover:text-[#ee5f27] transition-colors text-left"
                >
                  Domestic Bush Flight Bookings
                </button>
              </li>
              <li>
                <button
                  onClick={onBookFlightServices}
                  className="hover:text-[#ee5f27] transition-colors text-left"
                >
                  International Flight Ticketing
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Destinations (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase text-white/90">
              DESTINATIONS
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a
                  href="#home"
                  className="hover:text-[#ee5f27] transition-colors block"
                >
                  Uganda Gorilla & Wildlife
                </a>
              </li>
              <li>
                <button
                  onClick={() => onSelectDestinationById('kenya-masai-mara')}
                  className="hover:text-[#ee5f27] transition-colors text-left"
                >
                  Kenya (Masai Mara & Amboseli)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectDestinationById('tanzania-zanzibar')}
                  className="hover:text-[#ee5f27] transition-colors text-left"
                >
                  Zanzibar Beach Holidays
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectDestinationById('uae-dubai')}
                  className="hover:text-[#ee5f27] transition-colors text-left"
                >
                  Dubai Luxury & Desert Tours
                </button>
              </li>
              <li>
                <button
                  onClick={onPlanTripClick}
                  className="hover:text-[#ee5f27] transition-colors text-left"
                >
                  Rwanda Primate Circuits
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white tracking-wider text-xs uppercase text-white/90">
              DIRECT CONTACT
            </h4>
            <ul className="space-y-2.5 text-white/75">
              <li>
                <a
                  href="tel:+256781674358"
                  className="flex items-center gap-2 hover:text-[#ee5f27] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#048310]" />
                  <span>+256 781 674358</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:okellopius971@gmail.com"
                  className="flex items-center gap-2 hover:text-[#ee5f27] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#ee5f27]" />
                  <span>okellopius971@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://tambulagandatours.com"
                  className="flex items-center gap-2 hover:text-[#ee5f27] transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-[#a3b899]" />
                  <span>www.tambulagandatours.com</span>
                </a>
              </li>
              <li className="pt-1 flex items-start gap-2 text-white/60">
                <MapPin className="w-3.5 h-3.5 text-[#ee5f27] shrink-0 mt-0.5" />
                <span>Headquarters: Kampala & Entebbe, Uganda. Regional Concierge & 24/7 Dispatch Desk.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <div>
            © 2026 Tambula Uganda Tours and Travel. All rights reserved. Travel with purpose. Explore with heart.
          </div>

          <div className="flex items-center space-x-4">
            <a href="#home" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <span className="text-white/70">Licensed Tour Operator</span>
            <span>·</span>
            <a
              href="https://wa.me/256781674358"
              target="_blank"
              rel="noreferrer"
              className="text-[#048310] hover:underline font-medium"
            >
              WhatsApp Direct
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
