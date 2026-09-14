import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, ShieldCheck, MapPin, Users, Calendar, Award } from 'lucide-react';
import { FormerTrip } from '../types';

interface TripVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: FormerTrip | null;
}

export const TripVideoModal: React.FC<TripVideoModalProps> = ({
  isOpen,
  onClose,
  trip,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen || !trip) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#0d1611] rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-white/10 text-white">
        {/* Top bar */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-[#0e2117]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#048310] animate-pulse" />
            <span className="text-xs font-bold text-[#ee5f27] uppercase tracking-wider">
              VERIFIED TRIP VIDEO HIGHLIGHT
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Display */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <img
            src={trip.coverImage}
            alt={trip.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/30" />

          {/* Center Play/Pause Graphic */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-10 w-16 h-16 rounded-full bg-[#ee5f27] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1 fill-white" />}
          </button>

          {/* Floating Live Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-semibold">
            <span className="text-base">{trip.flag}</span>
            <span>{trip.destination}</span>
          </div>

          {/* Bottom video controls simulation */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-[#ee5f27] transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-[#ee5f27] transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-[11px] text-white/80 font-mono">01:42 / 03:15</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#048310] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Authentic Tour Reel</span>
            </div>
          </div>
        </div>

        {/* Video Info & Legitimacy Seal */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              {trip.videoTitle || `${trip.title} - Video Diary`}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70 mt-2">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#ee5f27]" />
                {trip.dates}
              </span>
              <span className="inline-flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#ee5f27]" />
                {trip.travelersCount} Verified Participants
              </span>
              <span className="inline-flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#048310]" />
                Lead Guide: {trip.leadGuide}
              </span>
            </div>
          </div>

          <p className="text-xs text-white/80 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
            {trip.summary}
          </p>

          {trip.verifiedTestimonial && (
            <div className="p-3 bg-[#048310]/15 border border-[#048310]/30 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-1 text-[#4ade80] font-semibold text-[11px]">
                <span>★★★★★ Verified Review by</span>
                <span className="text-white font-bold">{trip.verifiedTestimonial.author} ({trip.verifiedTestimonial.location})</span>
              </div>
              <p className="italic text-white/90">
                "{trip.verifiedTestimonial.quote}"
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="text-[11px] text-white/50">
              Tambula Uganda Tours and Travel · Reg # 800200034981
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#ee5f27] hover:bg-[#d64e18] text-white rounded-lg text-xs font-bold transition-colors"
            >
              Close Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
