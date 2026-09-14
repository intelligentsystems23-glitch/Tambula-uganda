import React, { useState } from 'react';
import { Compass, Globe, Sparkles, Check, ChevronLeft, ChevronRight, MapPin, HeartHandshake } from 'lucide-react';
import { HERO_SLIDES } from '../data/safariData';

interface HeroSectionProps {
  onExploreServices: () => void;
  onExploreDestinations: () => void;
  onCustomItinerary: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreServices,
  onExploreDestinations,
  onCustomItinerary,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section id="home" className="pt-10 pb-16 lg:pt-14 lg:pb-20 overflow-hidden bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8efe8] border border-[#cfded0] text-[#1c3826] text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#048310] animate-pulse" />
              <span>UGANDA, EAST AFRICA & INTERNATIONAL EXPEDITIONS</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.65rem] font-bold text-[#102318] leading-[1.1] tracking-tight">
              Feel the Beauty of Uganda.
              <br />
              <span className="font-editorial italic font-normal text-[#ee5f27]">
                Journey
              </span>{' '}
              Beyond Borders.
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-[#4a554c] leading-relaxed max-w-xl font-normal">
              At Tambula Uganda Tours and Travel, every journey is curated with passion and
              purpose. From legendary mountain gorillas and savannah Big Five safaris to turquoise
              island escapes and international holidays, we create transformative travel experiences.
            </p>

            {/* Editorial Quote Banner */}
            <div className="border-l-4 border-[#ee5f27] pl-4 py-1.5 bg-[#fdf2ec] rounded-r-md">
              <p className="font-editorial italic text-lg sm:text-xl text-[#3b433c]">
                “Travel that connects hearts, honors nature, and stays with you forever.”
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  id="hero-explore-safaris-button"
                  onClick={onExploreServices}
                  className="inline-flex items-center gap-2.5 bg-[#0f2418] hover:bg-[#1b3b28] text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-98"
                >
                  <Compass className="w-4 h-4 text-[#ee5f27]" />
                  <span>Explore Safari Services</span>
                </button>

                <button
                  id="hero-destinations-button"
                  onClick={onExploreDestinations}
                  className="inline-flex items-center gap-2.5 bg-[#ee5f27] hover:bg-[#d64e18] text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-98"
                >
                  <Globe className="w-4 h-4 text-white" />
                  <span>Regional & World Destinations</span>
                </button>
              </div>

              {/* Secondary Custom Itinerary Button */}
              <div>
                <button
                  id="hero-custom-itinerary-button"
                  onClick={onCustomItinerary}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#f5f1eb] text-[#1c2e22] border border-[#d8cfc3] px-5 py-2.5 rounded-xl font-medium text-xs shadow-2xs transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#ee5f27]" />
                  <span>Custom Itinerary</span>
                </button>
              </div>
            </div>

            {/* Trust Checkmarks */}
            <div className="pt-3 border-t border-[#e8e0d4] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#3b463d] font-medium">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#048310]" />
                <span>Primate & Big 5 Safaris</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#048310]" />
                <span>Airport Shuttles & Flights</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#048310]" />
                <span>Direct Community & Conservation Give-Back</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Silverback Gorilla & Controls */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-[#0e1f16] group">
              {/* Image with Dark Vignette */}
              <div className="aspect-4/5 sm:aspect-1/1 md:aspect-5/4 lg:aspect-4/5 max-h-[580px] w-full relative">
                <img
                  src={currentSlide.imageUrl}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 brightness-95 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30" />

                {/* Top Badge: Rating */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs">
                  <span className="text-[#f59e0b] text-xs font-bold">★★★★★</span>
                  <span className="font-semibold">5.0 Certified Tour Operator</span>
                </div>

                {/* Location Badge Top Left */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white/90 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#ee5f27]" />
                  <span>{currentSlide.location}</span>
                </div>

                {/* Prev & Next Arrows */}
                <button
                  id="hero-slider-prev-button"
                  onClick={prevSlide}
                  aria-label="Previous Safari Slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all border border-white/15"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  id="hero-slider-next-button"
                  onClick={nextSlide}
                  aria-label="Next Safari Slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-all border border-white/15"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Bottom Overlay Text Box */}
                <div className="absolute bottom-12 left-0 right-0 p-6 z-20 text-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[#ee5f27] text-[11px] font-bold tracking-widest uppercase">
                      {currentSlide.regionTag}
                    </span>
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded text-[11px] font-medium text-white/90">
                      {currentSlide.countryTag}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1.5">
                    {currentSlide.title}
                  </h2>
                  <p className="text-xs text-white/80 line-clamp-2 max-w-md">
                    {currentSlide.fact}
                  </p>
                </div>

                {/* Carousel Dots */}
                <div className="absolute bottom-4 right-6 z-20 flex items-center space-x-1.5">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentSlideIndex
                          ? 'w-6 bg-[#ee5f27]'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Impact Card at Bottom */}
            <div
              id="hero-impact-badge"
              className="absolute -bottom-6 left-6 right-6 sm:left-10 sm:right-10 z-30 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-[#d6cbbe] shadow-lg flex items-center gap-3 text-xs"
            >
              <div className="w-9 h-9 rounded-lg bg-[#e8efe8] text-[#1b3f27] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5 text-[#048310]" />
              </div>
              <div>
                <span className="font-bold text-[#0f2418] uppercase tracking-wider text-[10px] block text-[#ee5f27]">
                  TAMBULA IMPACT
                </span>
                <p className="text-[#3b473e] font-medium text-xs leading-snug">
                  Every journey directly funds local community conservation and native tree planting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
