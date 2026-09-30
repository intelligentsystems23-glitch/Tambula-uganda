import React from 'react';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

interface FooterProps {
  onPlanTripClick: () => void;
  onViewGroupDepartures: () => void;
  onSelectDestinationById: (destId: string) => void;
  onBookFlightServices: () => void;
  onNavigatePage?: (pageId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onPlanTripClick,
  onViewGroupDepartures,
  onSelectDestinationById,
  onBookFlightServices,
  onNavigatePage,
}) => {
  const handleNav = (pageId: string) => {
    if (onNavigatePage) {
      onNavigatePage(pageId);
      window.location.hash = pageId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <footer id="contact" className="bg-[#07130b] text-white/80 pt-16 pb-10 border-t border-white/10 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#183a26] flex items-center justify-center text-[#ee5f27]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <button
                onClick={() => handleNav('home')}
                className="text-left cursor-pointer"
              >
                <span className="font-bold text-xl sm:text-2xl text-white block leading-none">
                  TAMBULA
                </span>
                <span className="italic text-xs sm:text-[13px] text-[#ee5f27]">
                  Uganda Tours and Travel
                </span>
              </button>
            </div>

            <p className="text-white/70 leading-relaxed text-sm max-w-sm">
              Ugandan and East African tour specialist creating unforgettable journeys across
              Africa and premier global destinations. Certified gorilla permits, savannah game drives,
              airport transfers, domestic flights, and international holiday extensions.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-2.5 pt-2 text-white/80">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <span className="text-sm font-bold">f</span>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <span className="text-sm font-bold">𝕏</span>
              </a>
              <a
                href="https://wa.me/256781674358"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors hover:text-[#048310]"
              >
                <span className="text-sm">💬</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <span className="text-sm">📷</span>
              </a>
            </div>
          </div>

          {/* Column 2: Safari & Travel Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold tracking-wider text-xs sm:text-sm uppercase text-white/95">
              SAFARI & TRAVEL SERVICES
            </h4>
            <ul className="space-y-2.5 text-white/70 text-sm sm:text-[15px]">
              <li>
                <button
                  onClick={() => handleNav('group-trips')}
                  className="hover:text-[#ee5f27] transition-colors text-left cursor-pointer"
                >
                  Group Safari Departures
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="text-[#ee5f27] hover:underline font-medium text-left flex items-center gap-1 cursor-pointer"
                >
                  <span>★</span>
                  <span>Solo &amp; Private Tailored Safaris</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-[#ee5f27] transition-colors text-left cursor-pointer"
                >
                  Fleet &amp; 4x4 Cruiser Rentals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('genesis')}
                  className="hover:text-[#ee5f27] transition-colors text-left cursor-pointer"
                >
                  Our Genesis &amp; Conservation Roots
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#ee5f27] transition-colors text-left cursor-pointer"
                >
                  Airport Transfers &amp; Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Destinations (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold tracking-wider text-xs sm:text-sm uppercase text-white/95">
              DESTINATIONS
            </h4>
            <ul className="space-y-2.5 text-white/70 text-sm sm:text-[15px]">
              <li>
                <button
                  onClick={() => handleNav('destinations')}
                  className="hover:text-[#ee5f27] transition-colors text-left cursor-pointer"
                >
                  Uganda Gorilla &amp; Wildlife
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectDestinationById('kenya-masai-mara')}
                  className="hover:text-[#ee5f27] transition-colors text-left cursor-pointer"
                >
                  Kenya (Masai Mara &amp; Amboseli)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectDestinationById('tanzania-zanzibar')}
                  className="hover:text-[#ee5f27] transition-colors text-left cursor-pointer"
                >
                  Zanzibar Beach Holidays
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectDestinationById('uae-dubai')}
                  className="hover:text-[#ee5f27] transition-colors text-left cursor-pointer"
                >
                  Dubai Luxury &amp; Desert Tours
                </button>
              </li>
              <li>
                <button
                  onClick={onPlanTripClick}
                  className="hover:text-[#ee5f27] transition-colors text-left cursor-pointer"
                >
                  Rwanda Primate Circuits
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold tracking-wider text-xs sm:text-sm uppercase text-white/95">
              DIRECT CONTACT
            </h4>
            <ul className="space-y-3 text-white/80 text-sm sm:text-[15px]">
              <li>
                <a
                  href="tel:+256781674358"
                  className="flex items-center gap-2.5 hover:text-[#ee5f27] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#048310]" />
                  <span>+256 781 674358</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@tambulaugandatours.com"
                  className="flex items-center gap-2.5 hover:text-[#ee5f27] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#ee5f27]" />
                  <span>info@tambulaugandatours.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://tambulagandatours.com"
                  className="flex items-center gap-2.5 hover:text-[#ee5f27] transition-colors"
                >
                  <Globe className="w-4 h-4 text-[#a3b899]" />
                  <span>www.tambulagandatours.com</span>
                </a>
              </li>
              <li className="pt-1 flex items-start gap-2 text-white/60 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-[#ee5f27] shrink-0 mt-0.5" />
                <span>Headquarters: Kampala &amp; Entebbe, Uganda. Regional Concierge &amp; 24/7 Dispatch Desk.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-white/60 gap-4">
          <div>
            © 2026 Tambula Uganda Tours and Travel. All rights reserved. Travel with purpose. Explore with heart.
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleNav('admin')}
              className="text-white/70 hover:text-[#ee5f27] transition-colors flex items-center gap-1 font-medium"
            >
              <span>CMS /admin</span>
            </button>
            <span>·</span>
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
