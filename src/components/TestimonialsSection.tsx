import React from 'react';
import { TESTIMONIALS } from '../data/safariData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-[#faf8f5] border-t border-[#ede5d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block px-3.5 py-1.5 rounded-full bg-[#0e2117] text-white text-[11px] font-bold tracking-widest uppercase">
            TRAVELER EXPERIENCES
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102419] tracking-tight">
            Voices from the Trail
          </h2>

          <p className="font-editorial italic text-xl sm:text-2xl text-[#ee5f27]">
            Unfiltered stories from travelers who walked with Tambula
          </p>

          <p className="text-sm sm:text-base text-[#4d5a50] leading-relaxed pt-1">
            Read how our private guides, conservation visits, and cross-continental itineraries
            delivered once-in-a-lifetime journeys.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              id={`testimonial-${item.id}`}
              className="bg-white rounded-2xl p-6 border border-[#e5dcce] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center space-x-1 text-[#f59e0b] text-sm">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-editorial italic text-sm sm:text-[15px] text-[#334036] leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-[#f1ede6] mt-6 flex items-center gap-3">
                {/* Avatar Initials Circle */}
                <div className="w-10 h-10 rounded-full bg-[#eee9df] text-[#1c2e21] font-bold text-xs flex items-center justify-center shrink-0 border border-[#ded5c5]">
                  {item.initials}
                </div>

                <div className="overflow-hidden">
                  <div className="font-bold text-xs text-[#102419] truncate">
                    {item.author}
                  </div>
                  <div className="text-[11px] text-[#637267] truncate">
                    {item.location}
                  </div>
                  <div className="text-[10px] font-medium text-[#ee5f27] truncate mt-0.5">
                    • {item.safariType}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
