import React from 'react';
import { Camera, ZoomIn } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/safariData';
import { GalleryPhoto } from '../types';

interface GallerySectionProps {
  onPhotoClick: (photo: GalleryPhoto) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onPhotoClick }) => {
  return (
    <section id="gallery" className="bg-[#0b1710] py-14 text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#e5a93c] text-xs font-bold tracking-widest uppercase mb-1">
              <Camera className="w-3.5 h-3.5" />
              <span>VISUAL JOURNEY</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Captured Across East Africa & Beyond
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/70">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
            <span>Live Safari & Expedition Moments · Hover to Pause</span>
          </div>
        </div>

        {/* 4 Image Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY_PHOTOS.slice(0, 4).map((photo) => (
            <div
              key={photo.id}
              onClick={() => onPhotoClick(photo)}
              className="group relative rounded-xl overflow-hidden aspect-4/3 cursor-pointer shadow-lg bg-[#14281e] border border-white/10 transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-[#e5a93c]" />
              </div>

              {/* Bottom Caption Box matching screenshot */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[10px] font-bold tracking-wider text-[#e5a93c] uppercase block">
                  {photo.category}
                </span>
                <span className="text-sm font-bold text-white leading-tight block truncate">
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
