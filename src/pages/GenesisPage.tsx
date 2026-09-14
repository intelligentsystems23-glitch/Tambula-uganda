import React from 'react';
import { 
  Sparkles, 
  Compass, 
  Users2, 
  Heart, 
  Award, 
  Quote, 
  ShieldCheck, 
  TreePine, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  MapPin,
  Calendar
} from 'lucide-react';

interface GenesisPageProps {
  onNavigatePage: (pageId: string) => void;
  onPlanTrip: (initialSubject?: string) => void;
}

export const GenesisPage: React.FC<GenesisPageProps> = ({
  onNavigatePage,
  onPlanTrip,
}) => {
  const guideTeam = [
    {
      name: 'Expedition Directorate',
      role: 'Head of Safari Operations & Field Guiding',
      years: '12+ Years Guiding',
      specialty: 'Primate Tracking, Savannah Big Cats & Cultural Heritage',
      bio: 'Grounded in Western Uganda within sight of the Rwenzori foothills, our expedition leaders grew up with a deep reverence for wildlife corridors, coordinating over 350 successful gorilla treks and savannah safaris across Uganda and Rwanda.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Sarah Namubiru',
      role: 'Senior Naturalist & Ornithology Specialist',
      years: '9 Years Guiding',
      specialty: 'Albertine Endemics, Shoebill Stork Tracking & Eco-Lodge Logistics',
      bio: 'One of Uganda’s premier female naturalist guides, Sarah holds degrees in Wildlife Management and can identify over 700 bird species by call alone.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'David Mukasa',
      role: 'Head of Fleet & Bush 4x4 Expedition Mechanics',
      years: '15 Years Experience',
      specialty: 'Off-Road Navigation, Bush Mechanics & Kidepo Valley Expeditions',
      bio: 'David oversees Tambula’s customized 4x4 Land Cruiser fleet. There is no remote mountain pass or muddy savannah track in East Africa that David has not conquered with calm confidence.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const milestones = [
    {
      year: '2018',
      title: 'The Campfire Seed',
      description:
        'A group of passionate Ugandan naturalist field guides sat around a campfire in Queen Elizabeth National Park, committed to building an authentic, locally-owned safari enterprise. The vision for Tambula was born.',
    },
    {
      year: '2020',
      title: 'Resilience & Community Support',
      description:
        'During global travel lockdowns, Tambula mobilized direct emergency relief food baskets and scholastic supplies for Batwa and ranger families bordering Bwindi and Kibale National Parks.',
    },
    {
      year: '2022',
      title: 'Official Fleet & Licensure',
      description:
        'Registered with the Uganda Tourism Board (UTB) and acquired our custom high-suspension 4x4 Toyota Land Cruisers fitted with pop-up safari photography roofs and dual spare tanks.',
    },
    {
      year: '2024',
      title: 'Regional Expansion: Tanzania & Zanzibar',
      description:
        'Partnered with indigenous Maasai guides in Serengeti and Swahili dhow captains in Zanzibar to offer cross-border East Africa expeditions under one seamless standard.',
    },
    {
      year: '2026',
      title: 'The Verified Scheduled Expeditions Era',
      description:
        'Launched guaranteed group departure dates, transparent digital booking slips, real-time seat availability, and verified traveler memories archives.',
    },
  ];

  return (
    <div className="bg-[#faf8f5] text-[#1c221e] min-h-screen">
      {/* Breadcrumb & Top Bar */}
      <div className="bg-white border-b border-[#e8dfd2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#647266]">
            <button
              onClick={() => onNavigatePage('home')}
              className="hover:text-[#ee5f27] transition-colors font-medium"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#a8b3aa]" />
            <span className="text-[#0e2117] font-semibold">Our Genesis</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[#4f5c52]">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#048310]" />
              <span>Indigenous Ugandan Guided & Owned</span>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative bg-[#07170e] text-white py-20 lg:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07170e] via-[#07170e]/95 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ee5f27]/20 border border-[#ee5f27]/40 text-[#ee5f27] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Genesis of Tambula</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Born from the Pearl of Africa.
              <br />
              <span className="text-[#ee5f27]">Walked with Purpose.</span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl font-light pt-2">
              In Luganda, <strong className="text-white font-semibold">“Tambula”</strong> means to walk, to journey,
              and to travel with deliberate intention. We are not a broker behind a desk; we are the guides who know
              every bend in the savannah and every family of mountain gorillas by name.
            </p>
          </div>
        </div>
      </div>

      {/* Company Genesis & Ethos Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Letter & Ethos */}
          <div className="lg:col-span-7 space-y-6 text-[#455047] text-sm sm:text-base leading-relaxed">
            <div className="bg-[#f5ede2] border-l-4 border-[#ee5f27] p-5 rounded-r-xl">
              <Quote className="w-7 h-7 text-[#ee5f27] mb-2 opacity-80" />
              <p className="font-medium text-[#102419] italic leading-relaxed">
                “When you travel with Tambula, you are not a client being processed through an itinerary;
                you are a guest in our ancestral homeland. We show you the Uganda that books cannot capture:
                the scent of morning mist on tea terraces, the rhythm of village drums, and the quiet awe
                of looking straight into the golden eyes of a silverback.”
              </p>
              <div className="mt-3 text-xs text-[#6e7d70] font-semibold">
                — Tambula Uganda Tours &amp; Travel, Expedition Directorate
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#0e2117] pt-4">
              Why We Started Tambula Uganda
            </h2>

            <p>
              For decades, African tourism was dominated by international intermediaries who outsourced ground logistics
              to subcontractors. The indigenous trackers, wildlife scouts, and local communities who protect these
              habitats received only a fraction of the traveler’s investment.
            </p>

            <p>
              Tambula was created to change that dynamic forever. As an indigenous Ugandan-owned and operated tour outfit,
              we eliminate the middleman. Your travel dollars flow directly into certified local guide salaries,
              community school sponsorships, habitat reforestation, and ethical family-owned eco-lodges.
            </p>

            <p>
              We believe that a true safari is an exchange of spirits. When you leave, you leave behind lasting goodwill
              and take home memories etched forever into your soul.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <div className="bg-white p-5 rounded-xl border border-[#e5ded2] shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#0e2117] text-[#ee5f27] flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#0e2117]">Indigenous Guide Expertise</h3>
                <p className="text-xs text-[#526055] leading-relaxed">
                  Our guides are born naturalists, certified by the Uganda Safari Guides Association (USAGA) with deep wilderness knowledge.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#e5ded2] shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#048310] text-white flex items-center justify-center">
                  <TreePine className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#0e2117]">Zero-Trace Conservation</h3>
                <p className="text-xs text-[#526055] leading-relaxed">
                  We enforce strict distance regulations around gorillas, avoid single-use plastics in all vehicles, and fund tree nurseries.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#e5ded2] shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#ee5f27] text-white flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#0e2117]">Community Empowerment</h3>
                <p className="text-xs text-[#526055] leading-relaxed">
                  Every safari directly subsidizes school desks, clean water filtration, and cooperative salaries for Batwa artisan women.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#e5ded2] shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-lg bg-[#0e2117] text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#048310]" />
                </div>
                <h3 className="font-bold text-sm text-[#0e2117]">Safety & Reliability</h3>
                <p className="text-xs text-[#526055] leading-relaxed">
                  Modern 4x4 fleet with satellite GPS tracking, wilderness first-aid kits, and official licensing under UTB and UWA.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Photo & Official Accreditations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#e3dacd]">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80"
                alt="Tambula Uganda Safari Guide on the savannah"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2117] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold tracking-widest text-[#ee5f27] uppercase block">
                  ON THE SAVANNAH TRAIL
                </span>
                <p className="text-sm font-semibold">
                  Tambula safari guides and travelers tracking lions in Ishasha Sector
                </p>
              </div>
            </div>

            {/* Official Accreditations Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#e5ded2] shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-[#0e2117] uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-[#ee5f27]" />
                <span>Verified Licensing & Memberships</span>
              </h3>

              <div className="space-y-3 text-xs text-[#4c5850]">
                <div className="flex items-start gap-2.5 pb-2 border-b border-[#f1ebd7]">
                  <CheckCircle2 className="w-4 h-4 text-[#048310] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0e2117] block">Uganda Tourism Board (UTB)</strong>
                    <span>Licensed Tour Operator & Destination Management Specialist</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pb-2 border-b border-[#f1ebd7]">
                  <CheckCircle2 className="w-4 h-4 text-[#048310] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0e2117] block">Uganda Wildlife Authority (UWA)</strong>
                    <span>Authorized Gorilla & Chimpanzee Trekking Permit Partner</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pb-2 border-b border-[#f1ebd7]">
                  <CheckCircle2 className="w-4 h-4 text-[#048310] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0e2117] block">Uganda Safari Guides Association (USAGA)</strong>
                    <span>Certified Professional Naturalists & Wildlife Biologists</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#048310] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0e2117] block">Banking Partner: Stanbic Bank Uganda</strong>
                    <span>Regulated escrow and commercial safari payment protection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Leadership Team */}
      <div className="bg-[#f5ede3] py-20 border-t border-[#e5dcce]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[#ee5f27] text-xs font-bold uppercase tracking-widest">
              THE PEOPLE BEHIND YOUR JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0e2117]">
              Meet Our Senior Naturalist Guides
            </h2>
            <p className="text-[#556358] text-sm">
              Your safari is only as extraordinary as the eyes guiding you. Meet the passionate storytellers who lead our expeditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guideTeam.map((guide) => (
              <div 
                key={guide.name}
                className="bg-white rounded-2xl overflow-hidden border border-[#e3dacf] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={guide.image}
                      alt={guide.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#0e2117]/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      {guide.years}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-[#0e2117]">{guide.name}</h3>
                    <div className="text-xs font-semibold text-[#ee5f27]">{guide.role}</div>
                    <div className="text-xs text-[#048310] font-medium">Specialty: {guide.specialty}</div>
                    <p className="text-xs text-[#526055] leading-relaxed pt-2 border-t border-[#f2ece2]">
                      {guide.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones / Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[#048310] text-xs font-bold uppercase tracking-widest">
            OUR TIMELINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0e2117]">
            The Journey of Tambula Uganda
          </h2>
          <p className="text-[#556358] text-sm">
            From humble beginnings around a Queen Elizabeth campfire to East Africa’s most trusted safari company.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {milestones.map((m, idx) => (
            <div 
              key={m.year}
              className="flex items-start gap-5 bg-white p-6 rounded-2xl border border-[#e5ded2] shadow-2xs"
            >
              <div className="w-14 h-14 rounded-xl bg-[#0e2117] text-[#ee5f27] flex items-center justify-center font-bold text-base shrink-0">
                {m.year}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#0e2117]">{m.title}</h3>
                <p className="text-xs sm:text-sm text-[#526055] leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#0e2117] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[#ee5f27] text-xs font-bold tracking-widest uppercase">
              BECOME PART OF OUR STORY
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Ready to journey with indigenous guides who care?
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Explore our upcoming group trips or craft your bespoke private safari today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onNavigatePage('group-trips')}
              className="bg-[#ee5f27] hover:bg-[#d64e18] text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md active:scale-98"
            >
              Explore Group Trips
            </button>
            <button
              onClick={() => onPlanTrip('Custom Safari Consultation')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-xl text-sm font-medium transition-colors"
            >
              Plan Private Safari
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
