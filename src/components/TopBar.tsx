import React, { useState } from 'react';
import { Phone, Mail, Compass, Award, ChevronDown } from 'lucide-react';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../data/safariData';

interface TopBarProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentCurrency, onCurrencyChange }) => {
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  return (
    <header className="bg-[#0e2117] text-white/85 text-xs border-b border-white/10 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-y-2">
        {/* Left Contact & Regions */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <a
            id="topbar-whatsapp-link"
            href="https://wa.me/256781674358"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#ee5f27] transition-colors"
          >
            <span className="text-[#048310] text-sm">●</span>
            <span className="text-white/90 font-medium">WhatsApp:</span>
            <span>+256 781 674358</span>
          </a>

          <a
            id="topbar-email-link"
            href="mailto:okellopius971@gmail.com"
            className="flex items-center gap-1.5 hover:text-[#ee5f27] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#ee5f27]" />
            <span>okellopius971@gmail.com</span>
          </a>

          <div className="hidden lg:flex items-center gap-1.5 text-white/65">
            <Compass className="w-3.5 h-3.5 text-[#a3b899]" />
            <span>Uganda · Kenya · Zanzibar · Dubai · Rwanda</span>
          </div>
        </div>

        {/* Right Certification & Currency Switcher */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-[#ee5f27] font-medium">
            <Award className="w-3.5 h-3.5 text-[#ee5f27]" />
            <span>Certified Tour Operator & Air Concierge</span>
          </div>

          <div className="relative">
            <button
              id="currency-selector-button"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded text-white text-xs transition-colors"
              aria-expanded={currencyDropdownOpen}
            >
              <span className="text-white/70">Currency:</span>
              <span>{CURRENCIES[currentCurrency].flag}</span>
              <span className="font-semibold">{currentCurrency} ({CURRENCIES[currentCurrency].symbol.trim()})</span>
              <ChevronDown className="w-3 h-3 text-white/60" />
            </button>

            {currencyDropdownOpen && (
              <div
                id="currency-dropdown-menu"
                className="absolute right-0 mt-1 w-44 bg-[#14291e] border border-white/15 rounded-md shadow-2xl py-1 z-50"
              >
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                  const curr = CURRENCIES[code];
                  return (
                    <button
                      key={code}
                      onClick={() => {
                        onCurrencyChange(code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-white/10 transition-colors ${
                        currentCurrency === code ? 'text-[#ee5f27] font-semibold bg-white/5' : 'text-white/80'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{curr.flag}</span>
                        <span>{code}</span>
                      </span>
                      <span className="text-white/50">{curr.symbol}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
