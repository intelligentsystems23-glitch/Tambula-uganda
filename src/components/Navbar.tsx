import React, { useState } from 'react';
import { Menu, X as CloseIcon, Facebook, Instagram, Youtube } from 'lucide-react';

interface NavbarProps {
  onPlanTripClick?: () => void;
  activePage: string;
  onNavigatePage: (pageId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onPlanTripClick, 
  activePage, 
  onNavigatePage 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'group-trips', label: 'Group Trips', href: '#group-trips', badge: 'Hot' },
    { id: 'services', label: 'Our Services', href: '#services' },
    { id: 'genesis', label: 'Our Genesis', href: '#genesis' },
    { id: 'destinations', label: 'Destinations', href: '#destinations' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigatePage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#e7e1d7] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            id="brand-logo-link"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
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
                className="w-5 h-5 text-[#ee5f27]"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-[#0f2418] leading-none">
                TAMBULA
              </span>
              <span className="italic text-xs tracking-wider text-[#ee5f27] font-medium mt-0.5">
                Uganda Tours and Travel
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`text-sm font-medium transition-colors relative py-1 inline-flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-[#0f2418] font-semibold'
                      : 'text-[#475249] hover:text-[#0f2418]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] uppercase font-extrabold bg-[#ee5f27] text-white px-1.5 py-0.5 rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-[#ee5f27] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action: Black circular social icons matching design */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-black hover:bg-[#222222] text-white flex items-center justify-center transition-all hover:scale-105 shadow-xs"
            >
              <Facebook className="w-4 h-4 fill-white text-white" />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="w-8 h-8 rounded-full bg-black hover:bg-[#222222] text-white flex items-center justify-center transition-all hover:scale-105 shadow-xs"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5 fill-white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-black hover:bg-[#222222] text-white flex items-center justify-center transition-all hover:scale-105 shadow-xs"
            >
              <Instagram className="w-4 h-4 text-white" />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-black hover:bg-[#222222] text-white flex items-center justify-center transition-all hover:scale-105 shadow-xs"
            >
              <Youtube className="w-4 h-4 fill-white text-white" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              id="mobile-nav-toggle-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#0e2117] hover:bg-[#f4efe8]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#e7e1d7] px-4 pt-2 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-between text-left cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-[#0e2117] text-white font-semibold'
                      : 'text-[#2d372f] hover:bg-[#faf7f2] hover:text-[#ee5f27]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] font-bold bg-[#ee5f27] text-white px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#ece4d8] flex items-center justify-between">
            <div className="flex space-x-2.5 items-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center"
              >
                <Facebook className="w-3.5 h-3.5 fill-white text-white" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3 h-3 fill-white">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center"
              >
                <Instagram className="w-3.5 h-3.5 text-white" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center"
              >
                <Youtube className="w-3.5 h-3.5 fill-white text-white" />
              </a>
            </div>

            {onPlanTripClick && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onPlanTripClick();
                }}
                className="bg-[#ee5f27] hover:bg-[#d64e18] text-white px-4 py-1.5 rounded-md text-xs font-semibold"
              >
                Safari Inquiry
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
