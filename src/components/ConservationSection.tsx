import React from 'react';
import { Leaf, GraduationCap, Sprout, Users, HeartHandshake } from 'lucide-react';

interface ConservationSectionProps {
  onSupportOutreach: () => void;
}

export const ConservationSection: React.FC<ConservationSectionProps> = ({ onSupportOutreach }) => {
  return (
    <section id="conservation" className="bg-[#0e2217] py-20 text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative & 3 Initiatives */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 text-[#ee5f27] text-xs font-bold tracking-widest uppercase">
              <Leaf className="w-4 h-4 text-[#048310]" />
              <span>SUSTAINABLE TOURISM IN ACTION</span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Community Outreach &amp;
              <br />
              Habitat Conservation
            </h2>

            {/* Paragraph */}
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              We believe that genuine conservation begins on the fringes of the forest, where
              indigenous communities live side-by-side with wildlife. Every Tambula itinerary
              directly contributes to native tree reforestation, school supply distributions, and
              community-led buffer zone stewardship around Bwindi Impenetrable, Kibale, and Queen
              Elizabeth National Parks.
            </p>

            {/* 3 Program Feature Blocks */}
            <div className="space-y-4 pt-2">
              {/* Program 1 */}
              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#048310]/20 text-[#048310] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white mb-1">
                    Education &amp; School Supplies
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Providing exercise books, pens, textbooks, and hygiene kits to primary schools
                    bordering gorilla habitats so children grow up seeing the living forest as a
                    beacon of opportunity.
                  </p>
                </div>
              </div>

              {/* Program 2 */}
              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#ee5f27]/20 text-[#ee5f27] flex items-center justify-center shrink-0">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white mb-1">
                    Native Tree Planting &amp; Buffer Corridors
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Establishing indigenous tree nurseries that reforest degraded wildlife migratory
                    corridors and mitigate human-wildlife encounters along park boundaries.
                  </p>
                </div>
              </div>

              {/* Program 3 */}
              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#274433] text-[#a3b899] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white mb-1">
                    Local Guide Mentorship &amp; Sustainable Livelihoods
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Training and certifying former poachers and local youth as professional field
                    rangers, porters, and interpretive eco-guides.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-3">
              <button
                id="btn-support-outreach"
                onClick={onSupportOutreach}
                className="inline-flex items-center gap-2 bg-[#ee5f27] hover:bg-[#d64e18] text-white px-6 py-3 rounded-xl text-xs font-semibold tracking-wide shadow-md transition-all active:scale-98"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Support or Visit Our Outreach</span>
              </button>
            </div>
          </div>

          {/* Right Column: Photo Card with Overlay Box */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#09150e]">
              <div className="aspect-4/3 sm:aspect-5/4 relative">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
                  alt="Ugandan students and community tree planting"
                  className="w-full h-full object-cover object-center brightness-95 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Bottom Overlay Box matching screenshot */}
                <div className="absolute bottom-5 left-5 right-5 p-5 rounded-xl bg-black/65 backdrop-blur-md border border-white/15">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-sm sm:text-base font-bold text-white tracking-wide">
                      PLANTING ROOTS FOR TOMORROW
                    </span>
                    <span className="bg-[#048310] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Active Program
                    </span>
                  </div>

                  <p className="text-xs text-white/85 leading-relaxed">
                    Travelers are welcome to join an afternoon tree-planting ceremony or donate
                    educational materials directly to rural forest fringe schools during their safari.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
