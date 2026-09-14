import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image as ImageIcon, Sparkles, Check, Compass } from 'lucide-react';
import { DestinationItinerary } from '../../types';

interface DestinationModalProps {
  isOpen: boolean;
  destination: DestinationItinerary | null; // null means Add New
  onClose: () => void;
  onSave: (dest: DestinationItinerary) => void;
}

const COUNTRY_OPTIONS = [
  { name: 'Uganda', code: 'UG', flag: '🇺🇬' },
  { name: 'Rwanda', code: 'RW', flag: '🇷🇼' },
  { name: 'Kenya', code: 'KE', flag: '🇰🇪' },
  { name: 'Tanzania', code: 'TZ', flag: '🇹🇿' },
  { name: 'Dubai', code: 'AE', flag: '🇦🇪' },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
];

const IMAGE_PRESETS = [
  {
    name: 'Bwindi Gorillas',
    url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Murchison Falls Nile',
    url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Serengeti Lions',
    url: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Zanzibar Beach',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Dubai Skyline',
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Kibale Chimpanzees',
    url: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1000&q=80',
  },
];

export const DestinationModal: React.FC<DestinationModalProps> = ({
  isOpen,
  destination,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<DestinationItinerary>({
    id: '',
    title: '',
    subtitle: '',
    country: 'Uganda',
    countryCode: 'UG',
    flag: '🇺🇬',
    badge: 'Popular',
    image: IMAGE_PRESETS[0].url,
    highlights: ['Mountain Gorilla Tracking', 'Batwa Cultural Trail', 'Lake Bunyonyi Canoeing'],
    description: '',
    duration: '3 Days / 2 Nights',
    lodgingType: 'Luxury Eco-Lodge & Tented Camp',
    specialFeature: 'Official UWA Gorilla Trekking Permits Guaranteed',
    departureSchedule: 'Daily Departures (Private) · Guaranteed Any Day',
    priceFromUSD: 850,
    days: [
      {
        day: 1,
        title: 'Journey from Kampala/Entebbe to the Primate Haven',
        description: 'Scenic drive crossing the Equator line with lunch stop in Mbarara before ascending into mist-shrouded rainforest.',
        meals: 'Lunch & Dinner',
        accommodation: 'Buhoma Haven Lodge',
      },
      {
        day: 2,
        title: 'Gorilla Trekking Expedition & Cultural Immersion',
        description: 'Briefing at park headquarters followed by tracking an assigned gorilla family. Spend an unforgettable hour in their presence.',
        meals: 'All Meals Included',
        accommodation: 'Buhoma Haven Lodge',
      },
    ],
    included: [
      'Official UWA Gorilla / National Park Permit ($800 value)',
      'Private 4x4 Safari Land Cruiser with pop-up photography roof & fuel',
      'Certified English-speaking professional naturalist guide',
      'All meals and luxury lodge accommodation',
      'Airport transfers from Entebbe International Airport',
    ],
    notIncluded: [
      'International flight tickets',
      'Uganda Tourist Visa ($50 online)',
      'Gratuities and tips for rangers and camp staff',
    ],
  });

  const [highlightInput, setHighlightInput] = useState('');
  const [includedInput, setIncludedInput] = useState('');
  const [notIncludedInput, setNotIncludedInput] = useState('');

  useEffect(() => {
    if (destination) {
      setFormData(destination);
    } else {
      setFormData({
        id: `dest-${Date.now()}`,
        title: '',
        subtitle: '',
        country: 'Uganda',
        countryCode: 'UG',
        flag: '🇺🇬',
        badge: 'New Destination',
        image: IMAGE_PRESETS[0].url,
        highlights: ['Wildlife Safari', 'Naturalist Guide', 'Luxury Lodging'],
        description: '',
        duration: '4 Days',
        lodgingType: 'Luxury Safari Lodge',
        specialFeature: '4x4 Land Cruiser with pop-up roof',
        departureSchedule: 'Daily Departures Available',
        priceFromUSD: 950,
        days: [
          {
            day: 1,
            title: 'Arrival & Scenic Transfer',
            description: 'Meet your guide at Entebbe or lodge and transfer through picturesque valleys.',
            meals: 'Dinner',
            accommodation: 'Safari Lodge',
          },
          {
            day: 2,
            title: 'Full Day Wildlife Game Drives',
            description: 'Morning and sunset game drives searching for leopards, lions, elephants and herds.',
            meals: 'All Inclusive',
            accommodation: 'Safari Lodge',
          },
        ],
        included: [
          '4x4 Land Cruiser with professional naturalist driver-guide',
          'Full board lodging and park entrance conservation fees',
          'Drinking water and binoculars in vehicle',
        ],
        notIncluded: ['International flights', 'Travel insurance', 'Personal tips'],
      });
    }
  }, [destination, isOpen]);

  if (!isOpen) return null;

  const handleCountryChange = (countryName: string) => {
    const selected = COUNTRY_OPTIONS.find((c) => c.name === countryName);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        country: selected.name,
        countryCode: selected.code,
        flag: selected.flag,
      }));
    }
  };

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        highlights: [...prev.highlights, highlightInput.trim()],
      }));
      setHighlightInput('');
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  const handleAddIncluded = () => {
    if (includedInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        included: [...prev.included, includedInput.trim()],
      }));
      setIncludedInput('');
    }
  };

  const handleRemoveIncluded = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      included: prev.included.filter((_, i) => i !== index),
    }));
  };

  const handleAddNotIncluded = () => {
    if (notIncludedInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        notIncluded: [...prev.notIncluded, notIncludedInput.trim()],
      }));
      setNotIncludedInput('');
    }
  };

  const handleRemoveNotIncluded = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      notIncluded: prev.notIncluded.filter((_, i) => i !== index),
    }));
  };

  const handleAddDay = () => {
    setFormData((prev) => ({
      ...prev,
      days: [
        ...prev.days,
        {
          day: prev.days.length + 1,
          title: `Day ${prev.days.length + 1}: Safari Activity`,
          description: 'Detailed description of activities and game drives.',
          meals: 'Breakfast, Lunch & Dinner',
          accommodation: 'Lodge / Camp',
        },
      ],
    }));
  };

  const handleUpdateDay = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedDays = [...prev.days];
      updatedDays[index] = { ...updatedDays[index], [field]: value };
      return { ...prev, days: updatedDays };
    });
  };

  const handleRemoveDay = (index: number) => {
    setFormData((prev) => {
      const filtered = prev.days.filter((_, i) => i !== index);
      // Re-index days
      const reindexed = filtered.map((d, i) => ({ ...d, day: i + 1 }));
      return { ...prev, days: reindexed };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please provide a destination title');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full my-auto shadow-2xl border border-[#e2d9cc] text-[#14261b] max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#0e2117] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ee5f27] flex items-center justify-center text-white font-bold">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {destination ? 'Edit Safari Destination' : 'Add New Safari Destination'}
              </h2>
              <p className="text-xs text-white/70">
                Manage destination itinerary, imagery, highlights, pricing and inclusions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-7 space-y-6 text-xs">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#0e2117] pb-2 border-b border-[#ece4d8] flex items-center gap-2">
              <span>1. Basic Destination Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Destination / Safari Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bwindi Gorilla & Lake Bunyonyi Expedition"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#ee5f27] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Subtitle / Region
                </label>
                <input
                  type="text"
                  placeholder="e.g. Southwest Uganda · Bwindi Impenetrable NP"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#ee5f27] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#ee5f27] focus:outline-hidden"
                >
                  {COUNTRY_OPTIONS.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Badge Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Most Popular, Primate Legend"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#ee5f27] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Starting Price ($ USD) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.priceFromUSD}
                  onChange={(e) => setFormData({ ...formData, priceFromUSD: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#ee5f27] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Logistics & Cover Image */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#0e2117] pb-2 border-b border-[#ece4d8] flex items-center gap-2">
              <span>2. Logistics & Photography</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3 Days / 2 Nights"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#ee5f27] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Lodging Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. Luxury Eco-Lodge & Tented Camp"
                  value={formData.lodgingType}
                  onChange={(e) => setFormData({ ...formData, lodgingType: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#ee5f27] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Departure Schedule
                </label>
                <input
                  type="text"
                  placeholder="e.g. Daily Departures (Private)"
                  value={formData.departureSchedule}
                  onChange={(e) => setFormData({ ...formData, departureSchedule: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#ee5f27] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                Special Highlight Feature
              </label>
              <input
                type="text"
                placeholder="e.g. Guaranteed Gorilla Permits · 4x4 Land Cruiser with Pop-Up Roof"
                value={formData.specialFeature}
                onChange={(e) => setFormData({ ...formData, specialFeature: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#ee5f27] focus:outline-hidden"
              />
            </div>

            {/* Cover Image URL & Preview */}
            <div className="bg-[#faf7f2] p-4 rounded-xl border border-[#ece4d8] space-y-3">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-36 h-24 rounded-lg overflow-hidden border border-[#d6ccbd] shrink-0 relative bg-black/5">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 rounded">
                    Preview
                  </div>
                </div>

                <div className="grow w-full space-y-2">
                  <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase">
                    Cover Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-white text-xs text-[#0e2117] focus:border-[#ee5f27] focus:outline-hidden"
                  />

                  <div>
                    <span className="text-[10px] text-[#718274] font-medium block mb-1">
                      Quick Preset Images:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {IMAGE_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, image: preset.url })}
                          className={`px-2 py-0.5 rounded text-[10px] border transition-colors ${
                            formData.image === preset.url
                              ? 'bg-[#048310] text-white border-[#048310]'
                              : 'bg-white text-[#455648] border-[#d6ccbd] hover:bg-[#f0ebe1]'
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description / Summary */}
            <div>
              <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                Overview & Description *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Detailed description of what makes this safari unforgettable..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#ee5f27] focus:outline-hidden leading-relaxed"
              />
            </div>
          </div>

          {/* Section 3: Highlights Chips */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#0e2117] pb-2 border-b border-[#ece4d8] flex items-center justify-between">
              <span>3. Key Highlights & Tags</span>
              <span className="text-[11px] font-normal text-[#6f8072]">
                {formData.highlights.length} highlights
              </span>
            </h3>

            <div className="flex flex-wrap gap-2 mb-2">
              {formData.highlights.map((hl, idx) => (
                <span
                  key={idx}
                  className="bg-[#edf6ee] border border-[#c4e2c7] text-[#1c4826] px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5"
                >
                  <span>{hl}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(idx)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a new highlight (e.g. Tree-Climbing Lions of Ishasha)"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHighlight();
                  }
                }}
                className="grow p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#ee5f27] focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="bg-[#0e2117] hover:bg-[#183a26] text-white px-4 py-2 rounded-lg text-xs font-semibold shrink-0"
              >
                + Add
              </button>
            </div>
          </div>

          {/* Section 4: Day-by-Day Itinerary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#ece4d8]">
              <h3 className="text-sm font-bold text-[#0e2117]">
                4. Day-by-Day Itinerary ({formData.days.length} Days)
              </h3>
              <button
                type="button"
                onClick={handleAddDay}
                className="bg-[#048310] hover:bg-[#036a0d] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Day</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.days.map((day, idx) => (
                <div
                  key={idx}
                  className="bg-[#faf7f2] border border-[#ece4d8] p-3.5 rounded-xl space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0e2117] bg-[#e7ded1] px-2 py-0.5 rounded">
                      Day {day.day}
                    </span>
                    {formData.days.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDay(idx)}
                        className="text-red-500 hover:text-red-700 text-xs p-1"
                        title="Remove Day"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Day Title"
                      value={day.title}
                      onChange={(e) => handleUpdateDay(idx, 'title', e.target.value)}
                      className="p-2 rounded border border-[#d6ccbd] bg-white text-xs text-[#0e2117]"
                    />
                    <input
                      type="text"
                      placeholder="Accommodation (e.g. Paraa Safari Lodge)"
                      value={day.accommodation || ''}
                      onChange={(e) => handleUpdateDay(idx, 'accommodation', e.target.value)}
                      className="p-2 rounded border border-[#d6ccbd] bg-white text-xs text-[#0e2117]"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Day activities and schedule description..."
                    value={day.description}
                    onChange={(e) => handleUpdateDay(idx, 'description', e.target.value)}
                    className="w-full p-2 rounded border border-[#d6ccbd] bg-white text-xs text-[#0e2117]"
                  />

                  <input
                    type="text"
                    placeholder="Meals plan (e.g. Breakfast, Packed Bush Lunch & Dinner)"
                    value={day.meals || ''}
                    onChange={(e) => handleUpdateDay(idx, 'meals', e.target.value)}
                    className="w-full p-1.5 rounded border border-[#d6ccbd] bg-white text-xs text-[#0e2117]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Inclusions */}
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-[#048310] uppercase">
                What's Included ({formData.included.length})
              </label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {formData.included.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-1.5 bg-[#edf6ee] rounded text-[11px] text-[#1f4528]"
                  >
                    <span>✓ {item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveIncluded(idx)}
                      className="text-red-500 font-bold px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. All national park entrance fees"
                  value={includedInput}
                  onChange={(e) => setIncludedInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddIncluded();
                    }
                  }}
                  className="grow p-2 rounded border border-[#d6ccbd] text-xs bg-[#fcfbfa]"
                />
                <button
                  type="button"
                  onClick={handleAddIncluded}
                  className="bg-[#048310] text-white px-3 py-1 rounded text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Exclusions */}
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-[#bd3715] uppercase">
                Not Included ({formData.notIncluded.length})
              </label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {formData.notIncluded.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-1.5 bg-[#fbf0ee] rounded text-[11px] text-[#782813]"
                  >
                    <span>✕ {item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveNotIncluded(idx)}
                      className="text-red-500 font-bold px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. International airfare tickets"
                  value={notIncludedInput}
                  onChange={(e) => setNotIncludedInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddNotIncluded();
                    }
                  }}
                  className="grow p-2 rounded border border-[#d6ccbd] text-xs bg-[#fcfbfa]"
                />
                <button
                  type="button"
                  onClick={handleAddNotIncluded}
                  className="bg-[#ee5f27] text-white px-3 py-1 rounded text-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-[#ece4d8] flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-[#546557] hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold bg-[#048310] hover:bg-[#036a0d] text-white rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{destination ? 'Save Destination Changes' : 'Publish Destination'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
