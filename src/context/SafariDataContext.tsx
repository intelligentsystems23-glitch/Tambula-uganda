import React, { createContext, useContext, useState, useEffect } from 'react';
import { DestinationItinerary, GroupDeparture } from '../types';
import { DESTINATIONS as initialDestinations, GROUP_DEPARTURES as initialGroupDepartures } from '../data/safariData';

interface SafariDataContextType {
  destinations: DestinationItinerary[];
  groupDepartures: GroupDeparture[];
  addDestination: (destination: DestinationItinerary) => void;
  updateDestination: (id: string, updated: Partial<DestinationItinerary>) => void;
  deleteDestination: (id: string) => void;
  addGroupDeparture: (departure: GroupDeparture) => void;
  updateGroupDeparture: (id: string, updated: Partial<GroupDeparture>) => void;
  deleteGroupDeparture: (id: string) => void;
  resetToDefaults: () => void;
  importAllData: (data: { destinations?: DestinationItinerary[]; groupDepartures?: GroupDeparture[] }) => boolean;
  exportAllData: () => string;
}

const SafariDataContext = createContext<SafariDataContextType | undefined>(undefined);

const DESTINATIONS_STORAGE_KEY = 'tambula_cms_destinations_v2';
const GROUP_DEPARTURES_STORAGE_KEY = 'tambula_cms_group_departures_v2';

export const SafariDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [destinations, setDestinations] = useState<DestinationItinerary[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(DESTINATIONS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (err) {
        console.error('Failed to parse stored destinations:', err);
      }
    }
    return initialDestinations;
  });

  const [groupDepartures, setGroupDepartures] = useState<GroupDeparture[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(GROUP_DEPARTURES_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (err) {
        console.error('Failed to parse stored group departures:', err);
      }
    }
    return initialGroupDepartures;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(DESTINATIONS_STORAGE_KEY, JSON.stringify(destinations));
    } catch (err) {
      console.error('Failed to save destinations to localStorage:', err);
    }
  }, [destinations]);

  useEffect(() => {
    try {
      localStorage.setItem(GROUP_DEPARTURES_STORAGE_KEY, JSON.stringify(groupDepartures));
    } catch (err) {
      console.error('Failed to save group departures to localStorage:', err);
    }
  }, [groupDepartures]);

  // Destination actions
  const addDestination = (destination: DestinationItinerary) => {
    setDestinations((prev) => [destination, ...prev]);
  };

  const updateDestination = (id: string, updated: Partial<DestinationItinerary>) => {
    setDestinations((prev) =>
      prev.map((dest) => (dest.id === id ? { ...dest, ...updated } : dest))
    );
  };

  const deleteDestination = (id: string) => {
    setDestinations((prev) => prev.filter((dest) => dest.id !== id));
  };

  // Group departure actions
  const addGroupDeparture = (departure: GroupDeparture) => {
    setGroupDepartures((prev) => [departure, ...prev]);
  };

  const updateGroupDeparture = (id: string, updated: Partial<GroupDeparture>) => {
    setGroupDepartures((prev) =>
      prev.map((dep) => (dep.id === id ? { ...dep, ...updated } : dep))
    );
  };

  const deleteGroupDeparture = (id: string) => {
    setGroupDepartures((prev) => prev.filter((dep) => dep.id !== id));
  };

  // Reset to original data
  const resetToDefaults = () => {
    setDestinations(initialDestinations);
    setGroupDepartures(initialGroupDepartures);
    try {
      localStorage.removeItem(DESTINATIONS_STORAGE_KEY);
      localStorage.removeItem(GROUP_DEPARTURES_STORAGE_KEY);
    } catch (err) {
      console.error('Error resetting CMS storage:', err);
    }
  };

  const importAllData = (data: { destinations?: DestinationItinerary[]; groupDepartures?: GroupDeparture[] }) => {
    try {
      if (Array.isArray(data.destinations) && data.destinations.length > 0) {
        setDestinations(data.destinations);
      }
      if (Array.isArray(data.groupDepartures) && data.groupDepartures.length > 0) {
        setGroupDepartures(data.groupDepartures);
      }
      return true;
    } catch {
      return false;
    }
  };

  const exportAllData = () => {
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        destinations,
        groupDepartures,
      },
      null,
      2
    );
  };

  return (
    <SafariDataContext.Provider
      value={{
        destinations,
        groupDepartures,
        addDestination,
        updateDestination,
        deleteDestination,
        addGroupDeparture,
        updateGroupDeparture,
        deleteGroupDeparture,
        resetToDefaults,
        importAllData,
        exportAllData,
      }}
    >
      {children}
    </SafariDataContext.Provider>
  );
};

export const useSafariData = (): SafariDataContextType => {
  const context = useContext(SafariDataContext);
  if (!context) {
    throw new Error('useSafariData must be used within a SafariDataProvider');
  }
  return context;
};
