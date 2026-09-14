import React, { useState, useRef } from 'react';
import { X, Upload, Image, Film, Sparkles, Check, AlertCircle } from 'lucide-react';
import { FormerTrip } from '../types';

interface UploadTripMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMemory: (trip: FormerTrip) => void;
}

export const UploadTripMemoryModal: React.FC<UploadTripMemoryModalProps> = ({
  isOpen,
  onClose,
  onAddMemory,
}) => {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travelersCount, setTravelersCount] = useState(12);
  const [summary, setSummary] = useState('');
  const [leadGuide, setLeadGuide] = useState('Tambula Expedition Team');
  const [authorName, setAuthorName] = useState('');
  const [testimonialQuote, setTestimonialQuote] = useState('');
  const [hasVideo, setHasVideo] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !destination) {
      alert('Please fill out the trip title and destination.');
      return;
    }

    const finalImage =
      previewImage ||
      imageUrl ||
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80';

    const lowerDest = destination.toLowerCase();
    const flag = lowerDest.includes('rwanda')
      ? '🇷🇼'
      : lowerDest.includes('kenya')
      ? '🇰🇪'
      : lowerDest.includes('tanzania')
      ? '🇹🇿'
      : lowerDest.includes('ethiopia')
      ? '🇪🇹'
      : '🇺🇬';

    const newTrip: FormerTrip = {
      id: `past-user-${Date.now()}`,
      title,
      destination,
      flag,
      dates: dates || 'Recent Expedition',
      travelersCount: Number(travelersCount) || 10,
      coverImage: finalImage,
      galleryImages: [finalImage],
      hasVideo,
      videoTitle: hasVideo ? (videoTitle || `${title} Trip Video Highlights`) : undefined,
      summary: summary || `Memorable expedition to ${destination} with Tambula Uganda Tours.`,
      leadGuide: leadGuide || 'Tambula Expedition Team',
      verifiedTestimonial: testimonialQuote
        ? {
            author: authorName || 'Happy Traveler',
            location: 'Uganda / East Africa',
            quote: testimonialQuote,
            rating: 5,
          }
        : undefined,
    };

    onAddMemory(newTrip);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-[#ded5c6]">
        {/* Header */}
        <div className="bg-[#0e2117] text-white p-6 flex items-center justify-between border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1 text-[#ee5f27] text-[11px] font-bold tracking-widest uppercase">
              <Upload className="w-3.5 h-3.5" />
              <span>COMMUNITY &amp; TOUR ARCHIVES</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white mt-1">
              Upload Former Trip Photo or Video
            </h3>
            <p className="text-xs text-white/70 mt-0.5">
              Showcase memories and prove Tambula Uganda Tours is 100% verified &amp; legit!
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {isSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-[#048310]/10 text-[#048310] rounded-full mx-auto flex items-center justify-center text-3xl">
                ✓
              </div>
              <h4 className="text-lg font-bold text-[#102419]">Trip Memory Uploaded!</h4>
              <p className="text-xs text-[#526056]">
                Your photo/video proof has been published to the Former Trips gallery.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Image Upload Area */}
              <div>
                <label className="block font-semibold text-[#102419] mb-1">
                  Trip Photo or Video Poster *
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#d3c8b7] hover:border-[#ee5f27] bg-[#faf7f2] rounded-xl p-5 text-center cursor-pointer transition-colors relative overflow-hidden group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {previewImage ? (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg object-cover shadow-xs"
                      />
                      <div className="mt-2 text-[11px] text-[#ee5f27] font-semibold">
                        Click to change photo
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-full bg-[#fdf2ec] text-[#ee5f27] mx-auto flex items-center justify-center">
                        <Image className="w-5 h-5" />
                      </div>
                      <div className="font-semibold text-[#102419]">
                        Click to upload photo or video clip from device
                      </div>
                      <div className="text-[11px] text-[#78877d]">
                        PNG, JPG, MP4 or WebM (or use web URL below)
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-2">
                  <input
                    type="url"
                    placeholder="Or paste an image / photo URL (https://...)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                  />
                </div>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#102419] mb-1">
                    Trip Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bwindi Gorilla Trek Experience"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#102419] mb-1">
                    Destination &amp; Country *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bwindi Impenetrable, Uganda"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#102419] mb-1">
                    Dates / Season
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. August 2026 or Easter 2026"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#102419] mb-1">
                    Number of Travelers in Group
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                  />
                </div>
              </div>

              {/* Video Toggle */}
              <div className="p-3 bg-[#fdf2ec] rounded-xl border border-[#ee5f27]/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#ee5f27]" />
                  <div>
                    <span className="font-semibold text-[#102419] block">Include Video Reel?</span>
                    <span className="text-[11px] text-[#69786e]">Add video highlight badge</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={hasVideo}
                  onChange={(e) => setHasVideo(e.target.checked)}
                  className="w-4 h-4 accent-[#ee5f27]"
                />
              </div>

              {hasVideo && (
                <div>
                  <label className="block font-semibold text-[#102419] mb-1">
                    Video Highlight Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dancing with the Batwa &amp; Gorilla Encounters"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                  />
                </div>
              )}

              {/* Summary / Notes */}
              <div>
                <label className="block font-semibold text-[#102419] mb-1">
                  Trip Description / Experience Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="Share a short summary of how the trip went..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                />
              </div>

              {/* Testimonial Quote */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#eee5d8]">
                <div>
                  <label className="block font-semibold text-[#102419] mb-1">
                    Traveler / Group Name (Quote)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John &amp; Mary (Kampala)"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#102419] mb-1">
                    Lead Guide
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tambula Safari Team & Field Naturalist"
                    value={leadGuide}
                    onChange={(e) => setLeadGuide(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#102419] mb-1">
                  Verified Traveler Review
                </label>
                <input
                  type="text"
                  placeholder="e.g. 100% legit company, highly recommended!"
                  value={testimonialQuote}
                  onChange={(e) => setTestimonialQuote(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#ded5c6] bg-white text-xs text-[#1c241e] focus:outline-hidden focus:border-[#ee5f27]"
                />
              </div>

              <div className="pt-3 border-t border-[#eee5d8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-[#ded5c6] text-xs font-semibold rounded-lg hover:bg-gray-50 text-[#4c5950]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-submit-trip-memory"
                  className="bg-[#048310] hover:bg-[#036a0d] text-white px-6 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
                >
                  Publish Trip Memory
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
