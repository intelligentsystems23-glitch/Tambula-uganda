import React from 'react';

export const TickerMarquee: React.FC = () => {
  const tickerItems = [
    { icon: '🦍', text: 'Gorilla Trekking' },
    { icon: '🦁', text: 'Tree-Climbing Lions' },
    { icon: '🦏', text: 'Murchison Savanna Herds' },
    { icon: '🦒', text: 'Rothschild Giraffes' },
    { icon: '✈️', text: 'Airport Shuttles & Flights' },
    { icon: '🐒', text: 'Kibale Chimpanzee Tracking' },
    { icon: '🌊', text: 'Zanzibar Dhow Cruises' },
    { icon: '🏜️', text: 'Dubai Desert Glamping' },
  ];

  return (
    <div
      id="safari-ticker-banner"
      className="bg-[#efe8dd] border-y border-[#dbcfbf] py-3.5 overflow-hidden select-none relative"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
          <div key={index} className="inline-flex items-center mx-6 text-xs sm:text-sm font-semibold tracking-wide text-[#233528]">
            <span className="mr-2 text-base">{item.icon}</span>
            <span>{item.text}</span>
            <span className="ml-6 text-[#ee5f27]/70 font-bold">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
