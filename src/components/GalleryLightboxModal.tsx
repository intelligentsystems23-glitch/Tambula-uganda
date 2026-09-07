import React from 'react';
import { X, MapPin, Camera, Info } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface GalleryLightboxModalProps {
  photo: GalleryPhoto | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GalleryLightboxModal: React.FC<GalleryLightboxModalProps> = ({
  photo,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="gallery-lightbox-modal"
        className="relative max-w-4xl w-full bg-[#0b1710] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Image */}
        <div className="relative aspect-16/10 sm:aspect-16/9 w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Caption & Field Notes */}
        <div className="p-6 bg-[#0e2117] text-white border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#ee5f27] text-xs font-bold tracking-widest uppercase">
                {photo.category}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs text-white/80 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#048310]" />
                <span>{photo.location}</span>
              </span>
            </div>
          </div>

          <h3 className="font-display text-2xl font-bold text-white">
            {photo.title}
          </h3>

          <p className="text-sm text-white/90 font-editorial italic">
            "{photo.caption}"
          </p>

          {photo.details && (
            <div className="pt-2 text-xs text-white/70 leading-relaxed border-t border-white/10 flex items-start gap-2">
              <Info className="w-4 h-4 text-[#ee5f27] shrink-0 mt-0.5" />
              <span>{photo.details}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
