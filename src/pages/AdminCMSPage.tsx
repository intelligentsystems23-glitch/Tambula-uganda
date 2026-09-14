import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Copy, 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Upload, 
  RotateCcw, 
  ExternalLink,
  ShieldCheck,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { useSafariData } from '../context/SafariDataContext';
import { DestinationItinerary, GroupDeparture, CurrencyConfig } from '../types';
import { DestinationModal } from '../components/admin/DestinationModal';
import { GroupDepartureModal } from '../components/admin/GroupDepartureModal';
import { DeleteConfirmModal } from '../components/admin/DeleteConfirmModal';

interface AdminCMSPageProps {
  currency: CurrencyConfig;
  onNavigatePage: (pageId: string) => void;
  onSelectDestination?: (dest: DestinationItinerary) => void;
}

export const AdminCMSPage: React.FC<AdminCMSPageProps> = ({
  currency,
  onNavigatePage,
  onSelectDestination,
}) => {
  const {
    destinations,
    groupDepartures,
    addDestination,
    updateDestination,
    deleteDestination,
    addGroupDeparture,
    updateGroupDeparture,
    deleteGroupDeparture,
    resetToDefaults,
    exportAllData,
    importAllData,
  } = useSafariData();

  // Active view tab
  const [activeTab, setActiveTab] = useState<'group-departures' | 'destinations' | 'overview'>('group-departures');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCountry, setFilterCountry] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Modals state
  const [isDestModalOpen, setIsDestModalOpen] = useState(false);
  const [selectedDestForEdit, setSelectedDestForEdit] = useState<DestinationItinerary | null>(null);

  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [selectedGroupForEdit, setSelectedGroupForEdit] = useState<GroupDeparture | null>(null);

  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    itemType: 'destination' | 'group-trip';
    id: string;
    title: string;
  }>({
    isOpen: false,
    itemType: 'destination',
    id: '',
    title: '',
  });

  // Feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Reset confirmation
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // File import ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Filtered Group Departures
  const filteredGroupDepartures = useMemo(() => {
    return groupDepartures.filter((dep) => {
      const matchSearch =
        dep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dep.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dep.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dep.route.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCountry = filterCountry === 'All' || dep.country.toLowerCase() === filterCountry.toLowerCase();
      const matchStatus = filterStatus === 'All' || dep.status === filterStatus;

      return matchSearch && matchCountry && matchStatus;
    });
  }, [groupDepartures, searchQuery, filterCountry, filterStatus]);

  // Filtered Destinations
  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchSearch =
        dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dest.subtitle && dest.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCountry = filterCountry === 'All' || dest.country.toLowerCase() === filterCountry.toLowerCase();

      return matchSearch && matchCountry;
    });
  }, [destinations, searchQuery, filterCountry]);

  // Handlers for Destinations
  const handleOpenAddDestination = () => {
    setSelectedDestForEdit(null);
    setIsDestModalOpen(true);
  };

  const handleOpenEditDestination = (dest: DestinationItinerary) => {
    setSelectedDestForEdit(dest);
    setIsDestModalOpen(true);
  };

  const handleSaveDestination = (dest: DestinationItinerary) => {
    if (selectedDestForEdit) {
      updateDestination(dest.id, dest);
      showToast(`Updated destination: "${dest.title}"`);
    } else {
      addDestination(dest);
      showToast(`Added new destination: "${dest.title}"`);
    }
  };

  const handleDuplicateDestination = (dest: DestinationItinerary) => {
    const duplicated: DestinationItinerary = {
      ...dest,
      id: `dest-${Date.now()}`,
      title: `${dest.title} (Copy)`,
      badge: 'New Circuit',
    };
    addDestination(duplicated);
    showToast(`Duplicated destination as: "${duplicated.title}"`);
  };

  const handleDeleteDestinationClick = (dest: DestinationItinerary) => {
    setDeleteModalState({
      isOpen: true,
      itemType: 'destination',
      id: dest.id,
      title: dest.title,
    });
  };

  // Handlers for Group Departures
  const handleOpenAddGroupDeparture = () => {
    setSelectedGroupForEdit(null);
    setIsGroupModalOpen(true);
  };

  const handleOpenEditGroupDeparture = (dep: GroupDeparture) => {
    setSelectedGroupForEdit(dep);
    setIsGroupModalOpen(true);
  };

  const handleSaveGroupDeparture = (dep: GroupDeparture) => {
    if (selectedGroupForEdit) {
      updateGroupDeparture(dep.id, dep);
      showToast(`Updated group trip: "${dep.title}"`);
    } else {
      addGroupDeparture(dep);
      showToast(`Added new group trip: "${dep.title}"`);
    }
  };

  const handleDuplicateGroupDeparture = (dep: GroupDeparture) => {
    const duplicated: GroupDeparture = {
      ...dep,
      id: `grp-${Date.now()}`,
      title: `${dep.title} (Next Departure)`,
      datesDisplay: 'Upcoming Dates',
      seatsBooked: 0,
      spotsLeft: dep.maxGroupSize,
      status: 'Open',
    };
    addGroupDeparture(duplicated);
    showToast(`Duplicated group departure: "${duplicated.title}"`);
  };

  const handleDeleteGroupClick = (dep: GroupDeparture) => {
    setDeleteModalState({
      isOpen: true,
      itemType: 'group-trip',
      id: dep.id,
      title: dep.title,
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModalState.itemType === 'destination') {
      deleteDestination(deleteModalState.id);
      showToast(`Removed destination: "${deleteModalState.title}"`);
    } else {
      deleteGroupDeparture(deleteModalState.id);
      showToast(`Removed group trip: "${deleteModalState.title}"`);
    }
  };

  // Export / Import JSON
  const handleExport = () => {
    const jsonStr = exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tambula-catalog-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Catalog exported successfully as JSON');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        const success = importAllData(parsed);
        if (success) {
          showToast('Catalog imported and synced successfully!');
        } else {
          alert('Invalid catalog backup file format.');
        }
      } catch (err) {
        alert('Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Metrics for overview
  const totalGroupSpots = groupDepartures.reduce((acc, curr) => acc + curr.spotsLeft, 0);
  const totalBookedSeats = groupDepartures.reduce((acc, curr) => acc + curr.seatsBooked, 0);

  return (
    <div className="min-h-screen bg-[#f7f5f1] text-[#14261b]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0e2117] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2.5 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-[#048310]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Hidden File Input for Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportFile}
        accept=".json"
        className="hidden"
      />

      {/* Admin Top Header Banner */}
      <div className="bg-[#0e2117] text-white border-b border-white/10 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigatePage('home')}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-xl text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Live Website</span>
            </button>

            <div className="h-5 w-px bg-white/20 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-base sm:text-lg tracking-tight">
                  Tambula Safari CMS
                </h1>
                <span className="bg-[#ee5f27] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-white/60 hidden sm:block">
                Manage group departures, custom wildlife circuits, pricing and real-time inventory
              </p>
            </div>
          </div>

          {/* Quick Utility Tools */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="bg-white/10 hover:bg-white/15 text-white/90 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
              title="Backup current destinations and group trips"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Export JSON</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/10 hover:bg-white/15 text-white/90 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
              title="Import destinations from a backup JSON"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Import JSON</span>
            </button>

            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
              title="Reset catalog back to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-300" />
              <span className="hidden md:inline">Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 border-t border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab('group-departures')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'group-departures'
                ? 'border-[#ee5f27] text-white bg-white/5'
                : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4 text-[#ee5f27]" />
            <span>Group Destinations & Departures</span>
            <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {groupDepartures.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('destinations')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'destinations'
                ? 'border-[#ee5f27] text-white bg-white/5'
                : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="w-4 h-4 text-[#048310]" />
            <span>All Other Destinations & Circuits</span>
            <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {destinations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'overview'
                ? 'border-[#ee5f27] text-white bg-white/5'
                : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-[#9db2a3]" />
            <span>Overview & Catalog Stats</span>
          </button>
        </div>
      </div>

      {/* Main CMS Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* TAB 1: GROUP DEPARTURES CMS */}
        {activeTab === 'group-departures' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="bg-white p-5 rounded-2xl border border-[#e5ddcf] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 grow">
                {/* Search */}
                <div className="relative grow sm:max-w-xs">
                  <Search className="w-4 h-4 text-[#758678] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search group departures..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#d6ccbe] bg-[#fcfbfa] text-[#0e2117] focus:border-[#048310] focus:outline-hidden"
                  />
                </div>

                {/* Country Filter */}
                <select
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-[#d6ccbe] bg-[#fcfbfa] text-[#0e2117] focus:border-[#048310] focus:outline-hidden"
                >
                  <option value="All">All Countries</option>
                  <option value="Uganda">🇺🇬 Uganda</option>
                  <option value="Rwanda">🇷🇼 Rwanda</option>
                  <option value="Kenya">🇰🇪 Kenya</option>
                  <option value="Tanzania">🇹🇿 Tanzania</option>
                  <option value="Dubai">🇦🇪 Dubai</option>
                </select>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-[#d6ccbe] bg-[#fcfbfa] text-[#0e2117] focus:border-[#048310] focus:outline-hidden"
                >
                  <option value="All">All Statuses</option>
                  <option value="Book Now">Book Now</option>
                  <option value="Limited Seats">Limited Seats</option>
                  <option value="Open">Open</option>
                  <option value="Guaranteed">Guaranteed</option>
                  <option value="Filling Fast">Filling Fast</option>
                </select>
              </div>

              {/* Add New Group Trip Button */}
              <button
                onClick={handleOpenAddGroupDeparture}
                className="bg-[#048310] hover:bg-[#036a0d] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 active:scale-98"
              >
                <Plus className="w-4 h-4" />
                <span>Add Group Departure</span>
              </button>
            </div>

            {/* Metric Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#e5ddcf] shadow-xs">
                <span className="text-[11px] text-[#6d7e70] font-medium block">Total Group Trips</span>
                <span className="text-2xl font-bold text-[#0e2117]">{groupDepartures.length}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#e5ddcf] shadow-xs">
                <span className="text-[11px] text-[#6d7e70] font-medium block">Seats Booked</span>
                <span className="text-2xl font-bold text-[#ee5f27]">{totalBookedSeats}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#e5ddcf] shadow-xs">
                <span className="text-[11px] text-[#6d7e70] font-medium block">Available Spots</span>
                <span className="text-2xl font-bold text-[#048310]">{totalGroupSpots}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#e5ddcf] shadow-xs">
                <span className="text-[11px] text-[#6d7e70] font-medium block">Public Group Trips Page</span>
                <button
                  onClick={() => onNavigatePage('group-trips')}
                  className="mt-1 text-xs font-bold text-[#0e2117] hover:text-[#048310] flex items-center gap-1 transition-colors"
                >
                  <span>View Public Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* List / Table of Group Departures */}
            {filteredGroupDepartures.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-[#e5ddcf]">
                <Users className="w-12 h-12 text-[#9bb0a0] mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#0e2117]">No group departures found</h3>
                <p className="text-xs text-[#637466] mt-1 mb-4">
                  Try adjusting your search query or add a brand new group departure.
                </p>
                <button
                  onClick={handleOpenAddGroupDeparture}
                  className="bg-[#048310] text-white px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add First Departure</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGroupDepartures.map((dep) => {
                  const percentFilled = Math.round((dep.seatsBooked / dep.maxGroupSize) * 100);

                  return (
                    <div
                      key={dep.id}
                      className="bg-white rounded-2xl border border-[#e5ddcf] p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                    >
                      {/* Left side: Thumbnail & Information */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 grow">
                        <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden shrink-0 relative bg-black/5">
                          <img
                            src={dep.image}
                            alt={dep.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80';
                            }}
                          />
                          <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[9px] font-semibold px-1 rounded">
                            {dep.duration}
                          </span>
                        </div>

                        <div className="space-y-1 grow">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold">{dep.flag}</span>
                            <span className="text-[11px] font-bold text-[#5c6e60] uppercase tracking-wider">
                              {dep.country}
                            </span>
                            <span className="bg-[#edf6ee] text-[#1e4c27] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#c4e2c7]">
                              {dep.status}
                            </span>
                            {dep.badge && (
                              <span className="bg-[#fef3ee] text-[#b83e15] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                {dep.badge}
                              </span>
                            )}
                          </div>

                          <h3 className="text-sm sm:text-base font-bold text-[#0e2117] leading-snug">
                            {dep.title}
                          </h3>

                          <p className="text-xs text-[#526456] flex items-center gap-1.5 flex-wrap">
                            <MapPin className="w-3.5 h-3.5 text-[#ee5f27] shrink-0" />
                            <span>{dep.destination}</span>
                            <span className="text-[#a4b5a6]">·</span>
                            <Calendar className="w-3.5 h-3.5 text-[#048310] shrink-0" />
                            <strong className="text-[#0e2117]">{dep.datesDisplay}</strong>
                          </p>

                          <div className="text-[11px] text-[#718274] line-clamp-1">
                            Route: {dep.route}
                          </div>
                        </div>
                      </div>

                      {/* Middle: Capacity & Price */}
                      <div className="flex items-center justify-between sm:justify-start lg:justify-center gap-6 shrink-0 py-2 sm:py-0 border-y lg:border-y-0 lg:border-x border-[#ece3d6] px-0 lg:px-6">
                        <div>
                          <span className="text-[10px] font-semibold text-[#6e7f72] uppercase block">
                            Group Price
                          </span>
                          <span className="text-base font-extrabold text-[#0e2117]">
                            ${dep.priceUSD}
                          </span>
                          {dep.priceUGX && (
                            <span className="text-[10px] text-[#6d7e71] block">
                              UGX {dep.priceUGX.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] font-semibold text-[#6e7f72] uppercase block">
                            Capacity ({dep.spotsLeft} left)
                          </span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="w-20 bg-[#ece3d6] h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-[#048310] h-full rounded-full"
                                style={{ width: `${Math.min(100, percentFilled)}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-[#0e2117]">
                              {dep.seatsBooked}/{dep.maxGroupSize}
                            </span>
                          </div>
                          <span className="text-[9px] text-[#6e7f71] block">
                            {percentFilled}% booked
                          </span>
                        </div>
                      </div>

                      {/* Right: CMS Action Buttons */}
                      <div className="flex items-center justify-end gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenEditGroupDeparture(dep)}
                          className="p-2 text-xs font-bold bg-[#edf6ee] hover:bg-[#d8eedb] text-[#1c4c26] rounded-xl transition-colors flex items-center gap-1"
                          title="Edit departure details"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDuplicateGroupDeparture(dep)}
                          className="p-2 text-xs text-[#506253] hover:bg-gray-100 rounded-xl transition-colors"
                          title="Duplicate as new date"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteGroupClick(dep)}
                          className="p-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Delete departure"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ALL OTHER DESTINATIONS CMS */}
        {activeTab === 'destinations' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="bg-white p-5 rounded-2xl border border-[#e5ddcf] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 grow">
                {/* Search */}
                <div className="relative grow sm:max-w-xs">
                  <Search className="w-4 h-4 text-[#758678] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search safari circuits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#d6ccbe] bg-[#fcfbfa] text-[#0e2117] focus:border-[#ee5f27] focus:outline-hidden"
                  />
                </div>

                {/* Country Filter */}
                <select
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-[#d6ccbe] bg-[#fcfbfa] text-[#0e2117] focus:border-[#ee5f27] focus:outline-hidden"
                >
                  <option value="All">All Countries</option>
                  <option value="Uganda">🇺🇬 Uganda</option>
                  <option value="Rwanda">🇷🇼 Rwanda</option>
                  <option value="Kenya">🇰🇪 Kenya</option>
                  <option value="Tanzania">🇹🇿 Tanzania</option>
                  <option value="Dubai">🇦🇪 Dubai</option>
                  <option value="South Africa">🇿🇦 South Africa</option>
                </select>
              </div>

              {/* Add New Destination Button */}
              <button
                onClick={handleOpenAddDestination}
                className="bg-[#ee5f27] hover:bg-[#d44e19] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 active:scale-98"
              >
                <Plus className="w-4 h-4" />
                <span>Add Destination Circuit</span>
              </button>
            </div>

            {/* Metric Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#e5ddcf] shadow-xs">
                <span className="text-[11px] text-[#6d7e70] font-medium block">Total Circuits</span>
                <span className="text-2xl font-bold text-[#0e2117]">{destinations.length}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#e5ddcf] shadow-xs">
                <span className="text-[11px] text-[#6d7e70] font-medium block">Countries Covered</span>
                <span className="text-2xl font-bold text-[#048310]">
                  {new Set(destinations.map((d) => d.country)).size}
                </span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#e5ddcf] shadow-xs">
                <span className="text-[11px] text-[#6d7e70] font-medium block">Avg Starting Price</span>
                <span className="text-2xl font-bold text-[#ee5f27]">
                  ${Math.round(destinations.reduce((a, b) => a + b.priceFromUSD, 0) / (destinations.length || 1))}
                </span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#e5ddcf] shadow-xs">
                <span className="text-[11px] text-[#6d7e70] font-medium block">Public Destinations Page</span>
                <button
                  onClick={() => onNavigatePage('destinations')}
                  className="mt-1 text-xs font-bold text-[#0e2117] hover:text-[#ee5f27] flex items-center gap-1 transition-colors"
                >
                  <span>View Public Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Grid of Destinations */}
            {filteredDestinations.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-[#e5ddcf]">
                <Compass className="w-12 h-12 text-[#9bb0a0] mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#0e2117]">No destinations found</h3>
                <p className="text-xs text-[#637466] mt-1 mb-4">
                  Try adjusting your search query or add a brand new safari destination.
                </p>
                <button
                  onClick={handleOpenAddDestination}
                  className="bg-[#ee5f27] text-white px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add First Destination</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="bg-white rounded-2xl border border-[#e5ddcf] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                  >
                    {/* Image Header with Badges */}
                    <div className="relative h-44 w-full bg-black/5 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        <span>{dest.flag}</span>
                        <span>{dest.country}</span>
                      </div>

                      <div className="absolute top-3 right-3 bg-[#ee5f27] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {dest.badge}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] text-white/80 block uppercase tracking-wider">
                          From ${dest.priceFromUSD} / person
                        </span>
                        <h3 className="text-sm font-bold leading-snug line-clamp-1">
                          {dest.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-4 space-y-3 grow flex flex-col justify-between text-xs">
                      <div className="space-y-2">
                        {dest.subtitle && (
                          <p className="text-[11px] font-medium text-[#687a6c] line-clamp-1">
                            {dest.subtitle}
                          </p>
                        )}

                        <p className="text-[#455648] line-clamp-2 text-[11px] leading-relaxed">
                          {dest.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {dest.highlights.slice(0, 3).map((hl, idx) => (
                            <span
                              key={idx}
                              className="bg-[#faf7f2] text-[#344637] border border-[#e5ddcf] px-2 py-0.5 rounded text-[10px]"
                            >
                              {hl}
                            </span>
                          ))}
                          {dest.highlights.length > 3 && (
                            <span className="text-[10px] text-[#718274] self-center">
                              +{dest.highlights.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Logistics & Actions */}
                      <div className="pt-3 border-t border-[#ece4d8] space-y-3">
                        <div className="flex items-center justify-between text-[11px] text-[#637566]">
                          <span>Duration: <strong>{dest.duration}</strong></span>
                          <span>Itinerary: <strong>{dest.days.length} Days</strong></span>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => onSelectDestination?.(dest)}
                            className="text-xs font-semibold text-[#0e2117] hover:text-[#ee5f27] flex items-center gap-1 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleDuplicateDestination(dest)}
                              className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Duplicate Destination"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleOpenEditDestination(dest)}
                              className="px-2.5 py-1.5 text-xs font-bold bg-[#edf6ee] hover:bg-[#d8eedb] text-[#1c4c26] rounded-lg transition-colors flex items-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteDestinationClick(dest)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Destination"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: OVERVIEW & CATALOG BACKUP */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#e5ddcf] shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-[#0e2117]">Catalog Overview & Synchronization</h2>
              <p className="text-xs text-[#526355] leading-relaxed max-w-2xl">
                The Tambula CMS operates in live synchronization with the client application. Any adjustments
                made to group departures, itinerary days, seat capacities, or destinations are automatically persisted
                and immediately rendered on the public landing page, the dedicated Group Trips page, and interactive booking modals.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#ece4d8]">
                  <h4 className="font-bold text-xs text-[#0e2117] mb-1">Group Inventory</h4>
                  <p className="text-2xl font-extrabold text-[#048310]">{groupDepartures.length}</p>
                  <p className="text-[11px] text-[#6d7e71] mt-1">Scheduled group departure circuits</p>
                </div>

                <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#ece4d8]">
                  <h4 className="font-bold text-xs text-[#0e2117] mb-1">Private Safari Circuits</h4>
                  <p className="text-2xl font-extrabold text-[#ee5f27]">{destinations.length}</p>
                  <p className="text-[11px] text-[#6d7e71] mt-1">Custom private itineraries</p>
                </div>

                <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#ece4d8]">
                  <h4 className="font-bold text-xs text-[#0e2117] mb-1">Total Available Capacity</h4>
                  <p className="text-2xl font-extrabold text-[#0e2117]">{totalGroupSpots} Seats</p>
                  <p className="text-[11px] text-[#6d7e71] mt-1">Across all open group departures</p>
                </div>
              </div>
            </div>

            {/* Quick Actions & Backup */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#e5ddcf] shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0e2117]">
                  <Download className="w-4 h-4 text-[#048310]" />
                  <span>Backup & Data Export</span>
                </div>
                <p className="text-xs text-[#526355] leading-relaxed">
                  Export all currently active destinations, group departures, days, and pricing to a clean JSON backup file.
                </p>
                <button
                  type="button"
                  onClick={handleExport}
                  className="bg-[#048310] hover:bg-[#036a0d] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Catalog Backup (.JSON)</span>
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#e5ddcf] shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-red-600">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Factory Catalog</span>
                </div>
                <p className="text-xs text-[#526355] leading-relaxed">
                  Reset the entire catalog back to original factory defaults (Lake Mburo, Bwindi Gorillas, Rwanda, Kenya, Serengeti, Zanzibar).
                </p>
                <button
                  type="button"
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      {/* 1. Destination Modal */}
      <DestinationModal
        isOpen={isDestModalOpen}
        destination={selectedDestForEdit}
        onClose={() => setIsDestModalOpen(false)}
        onSave={handleSaveDestination}
      />

      {/* 2. Group Departure Modal */}
      <GroupDepartureModal
        isOpen={isGroupModalOpen}
        departure={selectedGroupForEdit}
        onClose={() => setIsGroupModalOpen(false)}
        onSave={handleSaveGroupDeparture}
      />

      {/* 3. Delete Confirmation Dialog */}
      <DeleteConfirmModal
        isOpen={deleteModalState.isOpen}
        itemType={deleteModalState.itemType}
        itemName={deleteModalState.title}
        onClose={() => setDeleteModalState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmDelete}
      />

      {/* 4. Reset Confirmation Dialog */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-red-100 text-[#14261b]">
            <h3 className="text-lg font-bold text-[#0e2117] mb-2">Reset to Factory Catalog?</h3>
            <p className="text-xs text-[#526456] leading-relaxed mb-6">
              This will overwrite any newly created or customized destinations and restore the original Tambula Uganda safari itineraries and group trips.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-[#506153] hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetToDefaults();
                  setIsResetConfirmOpen(false);
                  showToast('Catalog restored to factory defaults');
                }}
                className="px-4 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-sm transition-colors"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
