import React, { useState, useRef, useEffect } from 'react';
import { Mail, Compass, Award, ChevronDown } from 'lucide-react';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../data/safariData';

interface TopBarProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onNavigatePage?: (pageId: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentCurrency, onCurrencyChange }) => {
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCurrencyDropdownOpen(false);
      }
    };

    if (currencyDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [currencyDropdownOpen]);

  return (
    <header className="bg-[#0e2117] text-white/85 text-xs border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3 sm:gap-4 whitespace-nowrap overflow-visible">
        {/* Left Contact & Regions */}
        <div className="flex items-center gap-x-3 sm:gap-x-4 shrink min-w-0 overflow-x-auto no-scrollbar">
          <a
            id="topbar-whatsapp-link"
            href="https://wa.me/256781674358"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#ee5f27] transition-colors shrink-0"
          >
            <span className="text-[#048310] text-sm leading-none">●</span>
            <span className="text-white/90 font-medium">WhatsApp:</span>
            <span>+256 781 674358</span>
          </a>

          <a
            id="topbar-email-link"
            href="mailto:info@tambulaugandatours.com"
            className="hidden sm:flex items-center gap-1.5 hover:text-[#ee5f27] transition-colors shrink-0"
          >
            <Mail className="w-3.5 h-3.5 text-[#ee5f27] shrink-0" />
            <span className="hidden md:inline">info@tambulaugandatours.com</span>
            <span className="md:hidden">Email Us</span>
          </a>

          <div className="hidden xl:flex items-center gap-1.5 text-white/65 shrink truncate">
            <Compass className="w-3.5 h-3.5 text-[#a3b899] shrink-0" />
            <span className="truncate">Uganda · Kenya · Tanzania · Zanzibar · Dubai · Rwanda</span>
          </div>
        </div>

        {/* Right Certification & Currency Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-1 text-[#ee5f27] font-medium shrink-0">
            <Award className="w-3.5 h-3.5 text-[#ee5f27] shrink-0" />
            <span className="hidden xl:inline">Certified Tour Operator &amp; Air Concierge</span>
            <span className="xl:hidden">Certified Operator</span>
          </div>

          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              id="currency-selector-button"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 sm:gap-1.5 bg-white/10 hover:bg-white/15 px-2 py-1 sm:px-2.5 sm:py-1 rounded text-white text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
              aria-expanded={currencyDropdownOpen}
              aria-haspopup="listbox"
            >
              <span className="text-white/70 hidden sm:inline">Currency:</span>
              <span>{CURRENCIES[currentCurrency].flag}</span>
              <span className="font-semibold">{currentCurrency} ({CURRENCIES[currentCurrency].symbol.trim()})</span>
              <ChevronDown className={`w-3 h-3 text-white/60 shrink-0 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {currencyDropdownOpen && (
              <div
                id="currency-dropdown-menu"
                className="absolute right-0 top-full mt-1.5 w-48 bg-[#10241a] border border-white/20 rounded-lg shadow-2xl py-1.5 z-60 animate-in fade-in zoom-in-95 duration-100"
                role="listbox"
              >
                <div className="px-3 py-1 text-[10px] font-semibold tracking-wider text-white/50 uppercase border-b border-white/10 mb-1">
                  Select Currency
                </div>
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                  const curr = CURRENCIES[code];
                  const isSelected = currentCurrency === code;
                  return (
                    <button
                      key={code}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onCurrencyChange(code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer ${
                        isSelected ? 'text-[#ee5f27] font-semibold bg-white/5' : 'text-white/85'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm leading-none">{curr.flag}</span>
                        <span>{code}</span>
                      </span>
                      <span className="text-white/50 font-mono text-[11px]">{curr.symbol}</span>
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
