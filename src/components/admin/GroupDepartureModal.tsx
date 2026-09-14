import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Calendar, Check, Users } from 'lucide-react';
import { GroupDeparture } from '../../types';

interface GroupDepartureModalProps {
  isOpen: boolean;
  departure: GroupDeparture | null; // null means Add New
  onClose: () => void;
  onSave: (dep: GroupDeparture) => void;
}

const COUNTRY_OPTIONS = [
  { name: 'Uganda', flag: '🇺🇬' },
  { name: 'Rwanda', flag: '🇷🇼' },
  { name: 'Kenya', flag: '🇰🇪' },
  { name: 'Tanzania', flag: '🇹🇿' },
  { name: 'Dubai', flag: '🇦🇪' },
  { name: 'South Africa', flag: '🇿🇦' },
];

const STATUS_OPTIONS: GroupDeparture['status'][] = [
  'Book Now',
  'Limited Seats',
  'Open',
  'Guaranteed',
  'Filling Fast',
];

const PRESET_IMAGES = [
  {
    name: 'Bwindi Gorillas',
    url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Lake Mburo Zebras',
    url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Murchison Nile Elephants',
    url: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Rwanda Kivu & Kigali',
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Diani Beach & Wasini',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Ngorongoro & Serengeti',
    url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1000&q=80',
  },
];

export const GroupDepartureModal: React.FC<GroupDepartureModalProps> = ({
  isOpen,
  departure,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<GroupDeparture>({
    id: '',
    title: '',
    destination: '',
    country: 'Uganda',
    flag: '🇺🇬',
    route: '',
    startDate: '2026-11-15',
    endDate: '2026-11-17',
    departureTimestamp: Date.now() + 1000 * 60 * 60 * 24 * 30,
    duration: '3 Days',
    datesDisplay: '15–17 Nov 2026',
    days: 3,
    priceUSD: 420,
    priceUGX: 1550000,
    maxGroupSize: 14,
    seatsBooked: 8,
    spotsLeft: 6,
    badge: 'Filling Fast',
    highlights: ['Group Campfire', '4x4 Game Drives', 'Bush Sundowner'],
    status: 'Limited Seats',
    image: PRESET_IMAGES[0].url,
    included: [
      'Round-trip 4x4 safari land cruiser transport',
      '2 nights safari lodge accommodation',
      'All meals on safari (full board)',
      'Certified English-speaking safari guides',
      'All park entrance fees and game drives',
    ],
    notIncluded: ['Personal alcoholic beverages', 'Tips and personal souvenirs'],
    itinerary: [
      {
        day: 1,
        title: 'Departure & Savannah Arrival',
        description: 'Meet at Kampala rendezvous point at 06:00 AM. Scenic transfer with Equator photo-stop.',
        meals: 'Lunch & Dinner',
        accommodation: 'Safari Camp',
      },
      {
        day: 2,
        title: 'Sunrise Game Drive & Evening Campfire Sundowner',
        description: 'Morning game drive tracking lions and leopards. Evening campfire storytelling.',
        meals: 'All Inclusive',
        accommodation: 'Safari Camp',
      },
      {
        day: 3,
        title: 'Morning Bush Walk & Return',
        description: 'Guided nature walk followed by leisure drive back to Kampala/Entebbe.',
        meals: 'Breakfast & Lunch',
      },
    ],
  });

  const [highlightInput, setHighlightInput] = useState('');
  const [includedInput, setIncludedInput] = useState('');
  const [notIncludedInput, setNotIncludedInput] = useState('');

  useEffect(() => {
    if (departure) {
      setFormData(departure);
    } else {
      const departureDate = new Date();
      departureDate.setDate(departureDate.getDate() + 30);
      const departureDateStr = departureDate.toISOString().split('T')[0];

      const endDate = new Date(departureDate);
      endDate.setDate(endDate.getDate() + 2);
      const endDateStr = endDate.toISOString().split('T')[0];

      setFormData({
        id: `grp-${Date.now()}`,
        title: '',
        destination: '',
        country: 'Uganda',
        flag: '🇺🇬',
        route: 'Kampala / Entebbe → Savannah Circuit → Return',
        startDate: departureDateStr,
        endDate: endDateStr,
        departureTimestamp: departureDate.getTime(),
        duration: '3 Days',
        datesDisplay: 'Next Month',
        days: 3,
        priceUSD: 380,
        priceUGX: 1400000,
        maxGroupSize: 16,
        seatsBooked: 6,
        spotsLeft: 10,
        badge: 'Guaranteed Departure',
        highlights: ['Group Bonding', '4x4 Game Drives', 'Savannah Campfire'],
        status: 'Open',
        image: PRESET_IMAGES[1].url,
        included: [
          'Group transport in 4x4 custom safari cruiser',
          'Shared/twin safari lodge accommodation',
          'Daily buffet meals',
          'Professional guide and park ranger fees',
        ],
        notIncluded: ['Personal tips', 'Personal drinks'],
        itinerary: [
          {
            day: 1,
            title: 'Departure & Check-in',
            description: 'Early morning meetup and scenic transfer to the park.',
            meals: 'Lunch & Dinner',
            accommodation: 'Safari Lodge',
          },
          {
            day: 2,
            title: 'Full Day Safari Adventure',
            description: 'Game drives and group sundowner dinner.',
            meals: 'All Meals Included',
            accommodation: 'Safari Lodge',
          },
          {
            day: 3,
            title: 'Return to Kampala/Entebbe',
            description: 'Morning activity and return journey.',
            meals: 'Breakfast & Lunch',
          },
        ],
      });
    }
  }, [departure, isOpen]);

  if (!isOpen) return null;

  const handleCountryChange = (countryName: string) => {
    const selected = COUNTRY_OPTIONS.find((c) => c.name === countryName);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        country: selected.name,
        flag: selected.flag,
      }));
    }
  };

  // Recalculate spots left automatically when maxGroupSize or seatsBooked changes
  const handleCapacityChange = (max: number, booked: number) => {
    const validMax = Math.max(1, max);
    const validBooked = Math.max(0, Math.min(booked, validMax));
    const left = validMax - validBooked;
    setFormData((prev) => ({
      ...prev,
      maxGroupSize: validMax,
      seatsBooked: validBooked,
      spotsLeft: left,
      status: left <= 2 ? 'Limited Seats' : left <= 5 ? 'Filling Fast' : prev.status,
    }));
  };

  const handleStartDateChange = (dateStr: string) => {
    const ts = new Date(dateStr).getTime();
    setFormData((prev) => ({
      ...prev,
      startDate: dateStr,
      departureTimestamp: isNaN(ts) ? prev.departureTimestamp : ts,
    }));
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
        notIncluded: [...(prev.notIncluded || []), notIncludedInput.trim()],
      }));
      setNotIncludedInput('');
    }
  };

  const handleRemoveNotIncluded = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      notIncluded: (prev.notIncluded || []).filter((_, i) => i !== index),
    }));
  };

  const handleAddDay = () => {
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: prev.itinerary.length + 1,
          title: `Day ${prev.itinerary.length + 1}: Safari Activity`,
          description: 'Group activity and adventure description.',
          meals: 'Breakfast & Lunch',
          accommodation: 'Safari Camp',
        },
      ],
      days: prev.itinerary.length + 1,
      duration: `${prev.itinerary.length + 1} Days`,
    }));
  };

  const handleUpdateDay = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.itinerary];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, itinerary: updated };
    });
  };

  const handleRemoveDay = (index: number) => {
    setFormData((prev) => {
      const filtered = prev.itinerary.filter((_, i) => i !== index);
      const reindexed = filtered.map((d, i) => ({ ...d, day: i + 1 }));
      return {
        ...prev,
        itinerary: reindexed,
        days: reindexed.length,
        duration: `${reindexed.length} Days`,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a title for the group departure');
      return;
    }
    if (!formData.destination.trim()) {
      formData.destination = formData.title;
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
            <div className="w-8 h-8 rounded-lg bg-[#048310] flex items-center justify-center text-white font-bold">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                {departure ? 'Edit Group Departure' : 'Add New Group Departure'}
              </h2>
              <p className="text-xs text-white/70">
                Manage dates, live countdown, seat capacity, pricing, route & itinerary
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-7 space-y-6 text-xs">
          {/* Section 1: Basic Trip Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#0e2117] pb-2 border-b border-[#ece4d8] flex items-center gap-2">
              <span>1. Group Departure Title & Destination</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Trip Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lake Mburo Weekend Cycling & Campfire Safari"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#048310] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Destination / Park *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lake Mburo National Park"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#048310] focus:outline-hidden"
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
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#048310] focus:outline-hidden"
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
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as GroupDeparture['status'] })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#048310] focus:outline-hidden"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Badge (Display Tag)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Guaranteed Departure, Hot Special"
                  value={formData.badge || ''}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#048310] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                Route Description
              </label>
              <input
                type="text"
                placeholder="e.g. Kampala / Entebbe → Mpambire Drum Makers → Equator → Lake Mburo"
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117] focus:border-[#048310] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Section 2: Dates & Live Countdown */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#0e2117] pb-2 border-b border-[#ece4d8] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#048310]" />
              <span>2. Dates & Live Countdown Timer</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Dates Display Text *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10–12 Oct or 14–17 Nov"
                  value={formData.datesDisplay}
                  onChange={(e) => setFormData({ ...formData, datesDisplay: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Start Departure Date (Countdown Timer) *
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Duration Text (e.g. 3 Days / 2 Nights)
                </label>
                <input
                  type="text"
                  placeholder="3 Days"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Total Number of Days
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Pricing & Seat Capacity */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#0e2117] pb-2 border-b border-[#ece4d8] flex items-center gap-2">
              <span>3. Pricing & Group Seat Capacity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Price per Person ($ USD) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.priceUSD}
                  onChange={(e) => {
                    const usd = Number(e.target.value);
                    setFormData({
                      ...formData,
                      priceUSD: usd,
                      priceUGX: formData.priceUGX ? formData.priceUGX : usd * 3700,
                    });
                  }}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Price in UGX (Ugandan Shillings)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 1550000"
                  value={formData.priceUGX || ''}
                  onChange={(e) => setFormData({ ...formData, priceUGX: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#faf7f2] p-3.5 rounded-xl border border-[#ece4d8]">
              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Max Group Size *
                </label>
                <input
                  type="number"
                  required
                  min="2"
                  value={formData.maxGroupSize}
                  onChange={(e) => handleCapacityChange(Number(e.target.value), formData.seatsBooked)}
                  className="w-full p-2 rounded border border-[#d6ccbd] bg-white text-xs text-[#0e2117]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#5a6b5d] uppercase mb-1">
                  Seats Booked *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max={formData.maxGroupSize}
                  value={formData.seatsBooked}
                  onChange={(e) => handleCapacityChange(formData.maxGroupSize, Number(e.target.value))}
                  className="w-full p-2 rounded border border-[#d6ccbd] bg-white text-xs text-[#0e2117]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#048310] uppercase mb-1">
                  Spots Remaining (Auto-Calculated)
                </label>
                <div className="p-2 rounded border border-[#c6dfca] bg-[#eef7f0] text-xs font-bold text-[#048310]">
                  {formData.spotsLeft} spots available
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Cover Image */}
          <div className="space-y-3 bg-[#faf7f2] p-4 rounded-xl border border-[#ece4d8]">
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
                  className="w-full p-2.5 rounded-lg border border-[#d6ccbd] bg-white text-xs text-[#0e2117]"
                />

                <div>
                  <span className="text-[10px] text-[#718274] font-medium block mb-1">
                    Preset Images:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_IMAGES.map((preset) => (
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

          {/* Section 5: Highlights */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#0e2117] pb-2 border-b border-[#ece4d8] flex items-center justify-between">
              <span>5. Group Experience Highlights</span>
              <span className="text-[11px] font-normal text-[#6f8072]">
                {formData.highlights.length} tags
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
                placeholder="Add a new group highlight (e.g. Sunset Boat Cruise)"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHighlight();
                  }
                }}
                className="grow p-2.5 rounded-lg border border-[#d6ccbd] bg-[#fcfbfa] text-xs text-[#0e2117]"
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

          {/* Section 6: Itinerary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#ece4d8]">
              <h3 className="text-sm font-bold text-[#0e2117]">
                6. Day-by-Day Group Itinerary ({formData.itinerary.length} Days)
              </h3>
              <button
                type="button"
                onClick={handleAddDay}
                className="bg-[#048310] hover:bg-[#036a0d] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Day</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.itinerary.map((day, idx) => (
                <div
                  key={idx}
                  className="bg-[#faf7f2] border border-[#ece4d8] p-3.5 rounded-xl space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#0e2117] bg-[#e7ded1] px-2 py-0.5 rounded">
                      Day {day.day}
                    </span>
                    {formData.itinerary.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDay(idx)}
                        className="text-red-500 hover:text-red-700 text-xs p-1"
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
                      placeholder="Accommodation"
                      value={day.accommodation || ''}
                      onChange={(e) => handleUpdateDay(idx, 'accommodation', e.target.value)}
                      className="p-2 rounded border border-[#d6ccbd] bg-white text-xs text-[#0e2117]"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Day activities..."
                    value={day.description}
                    onChange={(e) => handleUpdateDay(idx, 'description', e.target.value)}
                    className="w-full p-2 rounded border border-[#d6ccbd] bg-white text-xs text-[#0e2117]"
                  />

                  <input
                    type="text"
                    placeholder="Meals plan"
                    value={day.meals || ''}
                    onChange={(e) => handleUpdateDay(idx, 'meals', e.target.value)}
                    className="w-full p-1.5 rounded border border-[#d6ccbd] bg-white text-xs text-[#0e2117]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: Inclusions / Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-[#048310] uppercase">
                What's Included ({formData.included.length})
              </label>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
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
                  placeholder="e.g. All park entrance tickets"
                  value={includedInput}
                  onChange={(e) => setIncludedInput(e.target.value)}
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

            <div className="space-y-2">
              <label className="block text-[11px] font-semibold text-[#bd3715] uppercase">
                Not Included ({(formData.notIncluded || []).length})
              </label>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {(formData.notIncluded || []).map((item, idx) => (
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
                  placeholder="e.g. Personal alcoholic drinks"
                  value={notIncludedInput}
                  onChange={(e) => setNotIncludedInput(e.target.value)}
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
              <span>{departure ? 'Save Group Departure Changes' : 'Publish Group Departure'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
