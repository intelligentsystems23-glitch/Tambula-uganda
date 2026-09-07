import React from 'react';
import { Sparkles, Compass, Users2, Heart, Award, Quote } from 'lucide-react';

export const GenesisSection: React.FC = () => {
  return (
    <section id="genesis" className="py-20 bg-[#faf8f5] border-t border-[#eee7dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-[#ee5f27] text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE GENESIS OF TAMBULA</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#102419] tracking-tight leading-tight">
            Born from the Pearl of Africa.
            <br />
            <span className="font-editorial italic font-normal text-[#ee5f27]">
              Walked with purpose.
            </span>
          </h2>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Story & 3 Pillars */}
          <div className="lg:col-span-7 space-y-6 text-[#455047] text-sm sm:text-base leading-relaxed">
            <p>
              In Luganda—one of Uganda’s oldest native tongues—
              <strong className="text-[#102419] font-semibold">“Tambula”</strong> carries a profound
              meaning:{' '}
              <em className="font-editorial text-[#ee5f27] text-lg">
                to journey, to walk, to embark on a purposeful expedition.
              </em>
            </p>

            <p>
              Tambula Uganda Tours and Travel was born not in a corporate boardroom, but amidst the
              campfire smoke of Queen Elizabeth National Park and the mist-shrouded ridges of Bwindi
              Impenetrable Forest. Founded by indigenous Ugandan safari guides and passionate
              conservationists, we set out with a resolute mission: to break away from sterile,
              cookie-cutter tourism and restore reverence to the African journey.
            </p>

            <p>
              We recognized that the greatest safari memories are not merely seeing animals through
              a lens; they are the genuine kinship with local communities who preserve these ancestral
              habitats, the unhurried respect for wildlife corridors, and the authentic stories whispered
              across the savannah.
            </p>

            {/* 3 Impact Pillars in a horizontal row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {/* Pillar 1 */}
              <div className="bg-white rounded-xl p-4 border border-[#e8dfd2] shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#0e2117] text-white flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#ee5f27]" />
                </div>
                <h3 className="font-display font-bold text-sm text-[#102419]">
                  Rooted in Uganda
                </h3>
                <p className="text-xs text-[#5a675e] leading-snug">
                  Born & raised guides deeply tied to every national park and indigenous culture.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white rounded-xl p-4 border border-[#e8dfd2] shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#ee5f27] text-white flex items-center justify-center">
                  <Users2 className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-[#102419]">
                  Locally Guided
                </h3>
                <p className="text-xs text-[#5a675e] leading-snug">
                  Direct community mentorship and senior licensed naturalists on every expedition.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-white rounded-xl p-4 border border-[#e8dfd2] shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#048310]/15 text-[#048310] flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-sm text-[#102419]">
                  100% Impact Driven
                </h3>
                <p className="text-xs text-[#5a675e] leading-snug">
                  Every booking directly reinvests in local schools, tree nurseries, and conservation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Founder's Philosophy Card */}
          <div className="lg:col-span-5">
            <div
              id="genesis-philosophy-card"
              className="bg-[#fbf7f0] rounded-2xl p-7 sm:p-8 border border-[#e2d5c3] shadow-md relative"
            >
              {/* Quote Mark Icon */}
              <div className="w-10 h-10 rounded-full bg-[#0e2117] text-[#ee5f27] flex items-center justify-center mb-4">
                <Quote className="w-5 h-5" />
              </div>

              {/* Header */}
              <div className="mb-4">
                <span className="text-[10px] font-bold tracking-widest text-[#ee5f27] uppercase block">
                  FOUNDER'S PHILOSOPHY
                </span>
                <h3 className="font-display text-xl font-bold text-[#102419]">
                  Why We Guide With Heart
                </h3>
              </div>

              {/* Italic Callout */}
              <div className="border-l-2 border-[#ee5f27] pl-4 my-4">
                <p className="font-editorial italic text-base sm:text-lg text-[#323d35] leading-relaxed">
                  “Uganda is not simply a destination you tick off a bucket list. It is an emotional
                  embrace—a land where the Nile begins, where chimpanzees laugh in the canopy, and
                  where a child’s smile at a village school stays with you across oceans. When you walk
                  with Tambula, you are our honored family.”
                </p>
              </div>

              {/* Council & Partner Badge */}
              <div className="pt-4 border-t border-[#e8ded0] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-[#102419]">Tambula Guide Council</div>
                  <div className="text-[#647268] text-[11px]">Kampala · Entebbe · Bwindi Outpost</div>
                </div>

                <div className="inline-flex items-center gap-1.5 bg-[#fdf2ec] text-[#ee5f27] px-3 py-1 rounded-full font-semibold text-[11px] border border-[#ee5f27]/25">
                  <Award className="w-3.5 h-3.5 text-[#ee5f27]" />
                  <span>Registered UWA Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
