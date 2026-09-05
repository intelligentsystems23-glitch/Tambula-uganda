import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onPlanTripClick: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onPlanTripClick, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Our Services', href: '#services' },
    { label: 'Our Genesis', href: '#genesis' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Conservation', href: '#conservation' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#e7e1d7] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a
            id="brand-logo-link"
            href="#home"
            className="flex items-center gap-3 group"
          >
            {/* Logo Emblem */}
            <div className="w-10 h-10 rounded-full bg-[#122b1e] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-[#e5a93c]"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-[#0f2418] leading-none">
                TAMBULA
              </span>
              <span className="font-editorial italic text-xs tracking-wider text-[#bf7d1b] font-medium mt-0.5">
                Tours & Travel
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#0f2418] font-semibold'
                      : 'text-[#475249] hover:text-[#0f2418]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-[#bf7d1b] rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action & Socials */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Social Icons matching screenshot */}
            <div className="flex items-center space-x-2.5 text-[#556358] border-r border-[#e3dbce] pr-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full hover:bg-[#f1ede6] flex items-center justify-center transition-colors hover:text-[#0f2418]"
              >
                <span className="text-xs font-semibold">f</span>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-7 h-7 rounded-full hover:bg-[#f1ede6] flex items-center justify-center transition-colors hover:text-[#0f2418]"
              >
                <span className="text-xs font-semibold">𝕏</span>
              </a>
              <a
                href="https://wa.me/17049409953"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-7 h-7 rounded-full hover:bg-[#f1ede6] flex items-center justify-center transition-colors hover:text-[#25D366]"
              >
                <span className="text-xs font-semibold">💬</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full hover:bg-[#f1ede6] flex items-center justify-center transition-colors hover:text-[#0f2418]"
              >
                <span className="text-xs font-semibold">📷</span>
              </a>
            </div>

            {/* Plan Your Trip CTA */}
            <button
              id="navbar-plan-trip-button"
              onClick={onPlanTripClick}
              className="bg-[#0e2117] text-white hover:bg-[#1a3828] px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-98"
            >
              Plan Your Trip
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-plan-trip-cta"
              onClick={onPlanTripClick}
              className="bg-[#0e2117] text-white px-3 py-1.5 rounded-md text-xs font-medium"
            >
              Plan Trip
            </button>
            <button
              id="mobile-nav-toggle-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#0e2117] hover:bg-[#f4efe8]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#e7e1d7] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-sm font-medium text-[#2d372f] hover:text-[#bf7d1b] py-1.5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#ece4d8] flex items-center justify-between">
            <div className="flex space-x-3 text-sm text-[#4d5a50]">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <span>·</span>
              <a href="https://x.com" target="_blank" rel="noreferrer">𝕏</a>
              <span>·</span>
              <a href="https://wa.me/17049409953" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onPlanTripClick();
              }}
              className="bg-[#bf7d1b] text-white px-4 py-1.5 rounded-md text-xs font-semibold"
            >
              Custom Safari Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
