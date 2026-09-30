import React, { useState, useEffect } from 'react';
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
  Calendar,
  X,
  Facebook,
  Instagram,
  Linkedin,
  Globe,
  ExternalLink,
  MessageSquare,
  Edit3
} from 'lucide-react';
import { TeamMember } from '../types';
import { useSafariData } from '../context/SafariDataContext';

interface GenesisPageProps {
  onNavigatePage: (pageId: string) => void;
  onPlanTrip: (initialSubject?: string) => void;
}

export const GenesisPage: React.FC<GenesisPageProps> = ({
  onNavigatePage,
  onPlanTrip,
}) => {
  const { teamMembers } = useSafariData();
  const [selectedGuide, setSelectedGuide] = useState<TeamMember | null>(null);

  // Close modal on Escape key press and prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedGuide(null);
    };
    if (selectedGuide) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedGuide]);

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

          {/* 4 Pillars: On one line on desktop, scrollable on smaller screens */}
          <div className="lg:col-span-12 pt-6 border-t border-[#e8dfd2]/80 mt-2">
            <div className="flex items-center justify-between mb-3 lg:hidden">
              <span className="text-[11px] font-bold text-[#ee5f27] uppercase tracking-wider">
                Tambula Core Guiding Pillars
              </span>
              <span className="text-[11px] text-[#6d7c70] flex items-center gap-1 font-medium">
                <span>Swipe horizontally</span>
                <span>→</span>
              </span>
            </div>

            <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 pb-3 scrollbar-thin scrollbar-thumb-[#d5cbbe] scrollbar-track-transparent snap-x snap-mandatory">
              {/* Card 1: Indigenous Guide Expertise */}
              <div className="min-w-[270px] sm:min-w-[290px] lg:min-w-0 flex-1 shrink-0 snap-start bg-white p-5 rounded-2xl border border-[#e5ded2] shadow-2xs hover:shadow-md transition-shadow space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0e2117] text-[#ee5f27] flex items-center justify-center shadow-2xs">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-[#0e2117]">Indigenous Guide Expertise</h3>
                  <p className="text-sm sm:text-[15px] text-[#526055] leading-relaxed">
                    Our guides are born naturalists, certified by the Uganda Safari Guides Association (USAGA) with deep wilderness knowledge.
                  </p>
                </div>
              </div>

              {/* Card 2: Zero-Trace Conservation */}
              <div className="min-w-[270px] sm:min-w-[290px] lg:min-w-0 flex-1 shrink-0 snap-start bg-white p-5 rounded-2xl border border-[#e5ded2] shadow-2xs hover:shadow-md transition-shadow space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#048310] text-white flex items-center justify-center shadow-2xs">
                    <TreePine className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-[#0e2117]">Zero-Trace Conservation</h3>
                  <p className="text-sm sm:text-[15px] text-[#526055] leading-relaxed">
                    We enforce strict distance regulations around gorillas, avoid single-use plastics in all vehicles, and fund tree nurseries.
                  </p>
                </div>
              </div>

              {/* Card 3: Community Empowerment */}
              <div className="min-w-[270px] sm:min-w-[290px] lg:min-w-0 flex-1 shrink-0 snap-start bg-white p-5 rounded-2xl border border-[#e5ded2] shadow-2xs hover:shadow-md transition-shadow space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#ee5f27] text-white flex items-center justify-center shadow-2xs">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-[#0e2117]">Community Empowerment</h3>
                  <p className="text-sm sm:text-[15px] text-[#526055] leading-relaxed">
                    Every safari directly subsidizes school desks, clean water filtration, and cooperative salaries for Batwa artisan women.
                  </p>
                </div>
              </div>

              {/* Card 4: Safety & Reliability */}
              <div className="min-w-[270px] sm:min-w-[290px] lg:min-w-0 flex-1 shrink-0 snap-start bg-white p-5 rounded-2xl border border-[#e5ded2] shadow-2xs hover:shadow-md transition-shadow space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0e2117] text-[#048310] flex items-center justify-center shadow-2xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-[#0e2117]">Safety & Reliability</h3>
                  <p className="text-sm sm:text-[15px] text-[#526055] leading-relaxed">
                    Modern 4x4 fleet with satellite GPS tracking, wilderness first-aid kits, and official licensing under UTB and UWA.
                  </p>
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
            <span className="text-[#ee5f27] text-xs sm:text-sm font-bold uppercase tracking-widest">
              THE PEOPLE BEHIND YOUR JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0e2117]">
              Meet Our Senior Naturalist Guides
            </h2>
            <p className="text-[#556358] text-base sm:text-lg">
              Your safari is only as extraordinary as the eyes guiding you. Meet the passionate storytellers who lead our expeditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((guide) => (
              <div 
                key={guide.id || guide.name}
                onClick={() => setSelectedGuide(guide)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedGuide(guide);
                  }
                }}
                className="group bg-white rounded-2xl overflow-hidden border border-[#e3dacf] hover:border-[#ee5f27]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1.5 focus:outline-hidden focus:ring-2 focus:ring-[#ee5f27]"
              >
                <div>
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={guide.image}
                      alt={guide.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-sm font-medium flex items-center gap-1.5 drop-shadow-md">
                        <span>Click to view full bio</span>
                        <ArrowRight className="w-4 h-4 text-[#ee5f27]" />
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0e2117] group-hover:text-[#ee5f27] transition-colors">
                        {guide.name}
                      </h3>
                    </div>
                    <div className="text-sm font-semibold text-[#ee5f27]">{guide.role}</div>
                    <p className="text-sm text-[#526055] leading-relaxed pt-2 border-t border-[#f2ece2] line-clamp-3">
                      {guide.bio}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-1">
                  <div className="w-full py-2.5 px-4 rounded-xl bg-[#faf6f0] group-hover:bg-[#0e2117] text-[#0e2117] group-hover:text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all border border-[#e8ded0] group-hover:border-transparent">
                    <span>View Full Profile</span>
                    <ArrowRight className="w-4 h-4 text-[#ee5f27] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Guide Profile Pop-up Modal Window */}
          {selectedGuide && (
            <div 
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedGuide(null);
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-guide-name"
            >
              <div 
                className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-[#ded5c7] animate-in zoom-in-95 duration-200 my-auto flex flex-col-reverse md:flex-row items-stretch"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedGuide(null)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all shadow-md active:scale-95 focus:outline-hidden cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* LEFT SIDE: Details of the Team Member */}
                <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
                  <div className="space-y-5">
                    {/* Category Tag */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f3ede3] text-[#0e2117] text-xs font-bold tracking-wider uppercase border border-[#e2d8c8]">
                      <ShieldCheck className="w-4 h-4 text-[#048310]" />
                      <span>Naturalist Leadership</span>
                    </div>

                    {/* Name & Role */}
                    <div>
                      <h2 id="modal-guide-name" className="text-2xl sm:text-3xl font-extrabold text-[#0e2117] tracking-tight">
                        {selectedGuide.name}
                      </h2>
                      <p className="text-sm sm:text-base font-semibold text-[#ee5f27] mt-1">
                        {selectedGuide.role}
                      </p>
                    </div>

                    {/* Full In-Depth Story / Bio */}
                    <div className="space-y-2 pt-2 border-t border-[#f0e9dc]">
                      <h4 className="text-sm font-bold text-[#0e2117] uppercase tracking-wider">
                        Guide Background &amp; Story
                      </h4>
                      <p className="text-sm sm:text-base text-[#47544b] leading-relaxed whitespace-pre-line">
                        {selectedGuide.fullBio}
                      </p>
                    </div>
                  </div>

                  {/* Modal Action Footer */}
                  <div className="mt-8 pt-4 border-t border-[#eee6da] flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        const guideName = selectedGuide.name;
                        setSelectedGuide(null);
                        onPlanTrip(`Private Safari with Guide: ${guideName}`);
                      }}
                      className="flex-1 bg-[#ee5f27] hover:bg-[#d64e18] text-white py-3.5 px-4 rounded-xl text-sm font-bold transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Request {selectedGuide.name.split(' ')[0]} for Safari</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedGuide(null);
                        onNavigatePage('admin-team');
                      }}
                      className="px-4 py-3.5 rounded-xl border border-[#ded5c7] hover:bg-[#f2ece2] text-[#0e2117] text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Edit this naturalist guide in the CMS"
                    >
                      <Edit3 className="w-4 h-4 text-[#ee5f27]" />
                      <span>Edit in CMS</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedGuide(null)}
                      className="px-5 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#0e2117] text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Close Profile
                    </button>
                  </div>
                </div>

                {/* RIGHT SIDE: Image on the Right */}
                <div className="md:w-5/12 bg-[#f8f4ee] p-6 sm:p-8 flex flex-col justify-center items-center border-b md:border-b-0 md:border-l border-[#eadecb]">
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full relative rounded-2xl overflow-hidden shadow-lg border-2 border-white aspect-4/5 sm:aspect-square md:aspect-4/5">
                      <img
                        src={selectedGuide.image}
                        alt={selectedGuide.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <span className="text-sm font-bold text-[#0e2117] block">
                        {selectedGuide.name}
                      </span>
                      <span className="text-xs text-[#718073]">
                        {selectedGuide.role}
                      </span>
                    </div>

                    <div className="pt-3">
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#048310] font-semibold bg-[#e7f5ea] px-2.5 py-1 rounded-full border border-[#c4e8cb]">
                        <CheckCircle2 className="w-3 h-3 text-[#048310]" />
                        <span>Verified Field Profile</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
