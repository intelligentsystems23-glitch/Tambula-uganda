import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocs, 
  writeBatch 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { DestinationItinerary, GroupDeparture, TeamMember, FormerTrip, HeroSlide } from '../types';
import { 
  DESTINATIONS as initialDestinations, 
  GROUP_DEPARTURES as initialGroupDepartures, 
  DEFAULT_TEAM_MEMBERS as initialTeamMembers,
  FORMER_TRIPS as initialFormerTrips,
  HERO_SLIDES as initialHeroSlides
} from '../data/safariData';

export type DatabaseSyncStatus = 'connecting' | 'connected' | 'syncing' | 'offline' | 'error';

interface SafariDataContextType {
  destinations: DestinationItinerary[];
  groupDepartures: GroupDeparture[];
  teamMembers: TeamMember[];
  tripMemories: FormerTrip[];
  heroSlides: HeroSlide[];
  syncStatus: DatabaseSyncStatus;
  lastSyncedAt: Date | null;
  errorMessage: string | null;

  // Hero slide actions (Homepage slider)
  addHeroSlide: (slide: HeroSlide) => Promise<void>;
  updateHeroSlide: (id: string, updated: Partial<HeroSlide>) => Promise<void>;
  deleteHeroSlide: (id: string) => Promise<void>;

  // Destination actions
  addDestination: (destination: DestinationItinerary) => Promise<void>;
  updateDestination: (id: string, updated: Partial<DestinationItinerary>) => Promise<void>;
  deleteDestination: (id: string) => Promise<void>;

  // Group departure actions
  addGroupDeparture: (departure: GroupDeparture) => Promise<void>;
  updateGroupDeparture: (id: string, updated: Partial<GroupDeparture>) => Promise<void>;
  deleteGroupDeparture: (id: string) => Promise<void>;

  // Team member actions (including uploaded profile pictures)
  addTeamMember: (member: TeamMember) => Promise<void>;
  updateTeamMember: (id: string, updated: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  // Trip memories / uploads actions
  addTripMemory: (memory: FormerTrip) => Promise<void>;
  deleteTripMemory: (id: string) => Promise<void>;

  // Utility actions
  resetToDefaults: () => Promise<void>;
  importAllData: (data: { 
    destinations?: DestinationItinerary[]; 
    groupDepartures?: GroupDeparture[]; 
    teamMembers?: TeamMember[];
    tripMemories?: FormerTrip[];
    heroSlides?: HeroSlide[];
  }) => Promise<boolean>;
  exportAllData: () => string;
  forceSyncNow: () => Promise<void>;
}

const SafariDataContext = createContext<SafariDataContextType | undefined>(undefined);

// Local storage backup keys for offline resilience
const DESTINATIONS_STORAGE_KEY = 'tambula_cms_destinations_v3';
const GROUP_DEPARTURES_STORAGE_KEY = 'tambula_cms_group_departures_v3';
const TEAM_MEMBERS_STORAGE_KEY = 'tambula_cms_team_members_v3';
const TRIP_MEMORIES_STORAGE_KEY = 'tambula_cms_trip_memories_v3';
const HERO_SLIDES_STORAGE_KEY = 'tambula_cms_hero_slides_v3';

export const SafariDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initial State from localStorage (instant rendering)
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(HERO_SLIDES_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (err) {
        console.error('Failed reading hero slides cache:', err);
      }
    }
    return initialHeroSlides;
  });

  const [destinations, setDestinations] = useState<DestinationItinerary[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(DESTINATIONS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (err) {
        console.error('Failed reading destinations cache:', err);
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
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (err) {
        console.error('Failed reading group departures cache:', err);
      }
    }
    return initialGroupDepartures;
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(TEAM_MEMBERS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (err) {
        console.error('Failed reading team members cache:', err);
      }
    }
    return initialTeamMembers;
  });

  const [tripMemories, setTripMemories] = useState<FormerTrip[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(TRIP_MEMORIES_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (err) {
        console.error('Failed reading trip memories cache:', err);
      }
    }
    return initialFormerTrips;
  });

  const [syncStatus, setSyncStatus] = useState<DatabaseSyncStatus>('connecting');
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hasSeededRef = useRef(false);

  // Sync to local storage whenever states change
  useEffect(() => {
    try {
      localStorage.setItem(HERO_SLIDES_STORAGE_KEY, JSON.stringify(heroSlides));
    } catch (e) {
      console.warn('LocalStorage quota limit reached for hero slides:', e);
    }
  }, [heroSlides]);

  useEffect(() => {
    try {
      localStorage.setItem(DESTINATIONS_STORAGE_KEY, JSON.stringify(destinations));
    } catch (e) {
      console.warn('LocalStorage quota limit reached for destinations:', e);
    }
  }, [destinations]);

  useEffect(() => {
    try {
      localStorage.setItem(GROUP_DEPARTURES_STORAGE_KEY, JSON.stringify(groupDepartures));
    } catch (e) {
      console.warn('LocalStorage quota limit reached for departures:', e);
    }
  }, [groupDepartures]);

  useEffect(() => {
    try {
      localStorage.setItem(TEAM_MEMBERS_STORAGE_KEY, JSON.stringify(teamMembers));
    } catch (e) {
      console.warn('LocalStorage quota limit reached for team members:', e);
    }
  }, [teamMembers]);

  useEffect(() => {
    try {
      localStorage.setItem(TRIP_MEMORIES_STORAGE_KEY, JSON.stringify(tripMemories));
    } catch (e) {
      console.warn('LocalStorage quota limit reached for memories:', e);
    }
  }, [tripMemories]);

  // Seed Firestore if empty
  const seedFirestoreIfEmpty = useCallback(async () => {
    if (hasSeededRef.current) return;
    hasSeededRef.current = true;

    try {
      const [destSnap, depSnap, teamSnap, memSnap, slideSnap] = await Promise.all([
        getDocs(collection(db, 'destinations')),
        getDocs(collection(db, 'groupDepartures')),
        getDocs(collection(db, 'teamMembers')),
        getDocs(collection(db, 'tripMemories')),
        getDocs(collection(db, 'heroSlides')),
      ]);

      const batch = writeBatch(db);
      let needsCommit = false;

      if (slideSnap.empty) {
        initialHeroSlides.forEach((slide) => {
          batch.set(doc(db, 'heroSlides', slide.id), slide);
          needsCommit = true;
        });
      }

      if (destSnap.empty) {
        initialDestinations.forEach((dest) => {
          batch.set(doc(db, 'destinations', dest.id), dest);
          needsCommit = true;
        });
      }

      if (depSnap.empty) {
        initialGroupDepartures.forEach((dep) => {
          batch.set(doc(db, 'groupDepartures', dep.id), dep);
          needsCommit = true;
        });
      }

      const existingTeamIds = new Set(teamSnap.docs.map((d) => d.id));
      initialTeamMembers.forEach((member) => {
        if (!existingTeamIds.has(member.id)) {
          batch.set(doc(db, 'teamMembers', member.id), member);
          needsCommit = true;
        }
      });

      if (memSnap.empty) {
        initialFormerTrips.forEach((mem) => {
          batch.set(doc(db, 'tripMemories', mem.id), mem);
          needsCommit = true;
        });
      }

      if (needsCommit) {
        await batch.commit();
        console.info('Firestore database seeded with initial Tambula safari data.');
      }
    } catch (error) {
      console.warn('Could not automatically seed Firestore:', error);
    }
  }, []);

  // 2. Real-time Listeners (onSnapshot) to Firestore collections
  useEffect(() => {
    let unsubSlide: (() => void) | undefined;
    let unsubDest: (() => void) | undefined;
    let unsubGroup: (() => void) | undefined;
    let unsubTeam: (() => void) | undefined;
    let unsubMem: (() => void) | undefined;

    const setupListeners = async () => {
      try {
        setSyncStatus('connecting');

        // Check if database needs initial seeding
        await seedFirestoreIfEmpty();

        // 0. Hero Slides listener
        unsubSlide = onSnapshot(
          collection(db, 'heroSlides'),
          (snapshot) => {
            if (!snapshot.empty) {
              const list: HeroSlide[] = [];
              snapshot.forEach((d) => list.push(d.data() as HeroSlide));
              list.sort((a, b) => (a.order || 0) - (b.order || 0));
              setHeroSlides(list);
            }
            setSyncStatus('connected');
            setLastSyncedAt(new Date());
          },
          (err) => {
            console.error('HeroSlides onSnapshot error:', err);
            handleFirestoreError(err, OperationType.GET, 'heroSlides');
          }
        );

        // 1. Destinations listener
        unsubDest = onSnapshot(
          collection(db, 'destinations'),
          (snapshot) => {
            if (!snapshot.empty) {
              const list: DestinationItinerary[] = [];
              snapshot.forEach((d) => list.push(d.data() as DestinationItinerary));
              setDestinations(list);
            }
            setSyncStatus('connected');
            setLastSyncedAt(new Date());
          },
          (err) => {
            console.error('Destinations onSnapshot error:', err);
            handleFirestoreError(err, OperationType.GET, 'destinations');
          }
        );

        // 2. Group Departures listener
        unsubGroup = onSnapshot(
          collection(db, 'groupDepartures'),
          (snapshot) => {
            if (!snapshot.empty) {
              const list: GroupDeparture[] = [];
              snapshot.forEach((d) => list.push(d.data() as GroupDeparture));
              setGroupDepartures(list);
            }
            setSyncStatus('connected');
            setLastSyncedAt(new Date());
          },
          (err) => {
            console.error('GroupDepartures onSnapshot error:', err);
            handleFirestoreError(err, OperationType.GET, 'groupDepartures');
          }
        );

        // 3. Team Members listener
        unsubTeam = onSnapshot(
          collection(db, 'teamMembers'),
          (snapshot) => {
            if (!snapshot.empty) {
              const list: TeamMember[] = [];
              snapshot.forEach((d) => list.push(d.data() as TeamMember));
              setTeamMembers(list);
            }
            setSyncStatus('connected');
            setLastSyncedAt(new Date());
          },
          (err) => {
            console.error('TeamMembers onSnapshot error:', err);
            handleFirestoreError(err, OperationType.GET, 'teamMembers');
          }
        );

        // 4. Trip Memories listener
        unsubMem = onSnapshot(
          collection(db, 'tripMemories'),
          (snapshot) => {
            if (!snapshot.empty) {
              const list: FormerTrip[] = [];
              snapshot.forEach((d) => list.push(d.data() as FormerTrip));
              setTripMemories(list);
            }
            setSyncStatus('connected');
            setLastSyncedAt(new Date());
          },
          (err) => {
            console.error('TripMemories onSnapshot error:', err);
            handleFirestoreError(err, OperationType.GET, 'tripMemories');
          }
        );
      } catch (err) {
        console.error('Failed to initialize Firestore synchronization:', err);
        setSyncStatus('offline');
        setErrorMessage(err instanceof Error ? err.message : String(err));
      }
    };

    setupListeners();

    return () => {
      if (unsubSlide) unsubSlide();
      if (unsubDest) unsubDest();
      if (unsubGroup) unsubGroup();
      if (unsubTeam) unsubTeam();
      if (unsubMem) unsubMem();
    };
  }, [seedFirestoreIfEmpty]);

  // Hero Slide actions
  const addHeroSlide = async (slide: HeroSlide) => {
    setSyncStatus('syncing');
    setHeroSlides((prev) => [...prev.filter((s) => s.id !== slide.id), slide]);
    try {
      await setDoc(doc(db, 'heroSlides', slide.id), slide);
      setSyncStatus('connected');
      setLastSyncedAt(new Date());
    } catch (err) {
      setSyncStatus('error');
      handleFirestoreError(err, OperationType.WRITE, `heroSlides/${slide.id}`);
    }
  };

  const updateHeroSlide = async (id: string, updated: Partial<HeroSlide>) => {
    setSyncStatus('syncing');
    let fullTarget: HeroSlide | undefined;
    setHeroSlides((prev) =>
      prev.map((slide) => {
        if (slide.id === id) {
          fullTarget = { ...slide, ...updated };
          return fullTarget;
        }
        return slide;
      })
    );

    if (fullTarget) {
      try {
        await setDoc(doc(db, 'heroSlides', id), fullTarget, { merge: true });
        setSyncStatus('connected');
        setLastSyncedAt(new Date());
      } catch (err) {
        setSyncStatus('error');
        handleFirestoreError(err, OperationType.UPDATE, `heroSlides/${id}`);
      }
    }
  };

  const deleteHeroSlide = async (id: string) => {
    setSyncStatus('syncing');
    setHeroSlides((prev) => prev.filter((slide) => slide.id !== id));
    try {
      await deleteDoc(doc(db, 'heroSlides', id));
      setSyncStatus('connected');
      setLastSyncedAt(new Date());
    } catch (err) {
      setSyncStatus('error');
      handleFirestoreError(err, OperationType.DELETE, `heroSlides/${id}`);
    }
  };

  // Destination actions
  const addDestination = async (destination: DestinationItinerary) => {
    setSyncStatus('syncing');
    setDestinations((prev) => [destination, ...prev.filter((d) => d.id !== destination.id)]);
    try {
      await setDoc(doc(db, 'destinations', destination.id), destination);
      setSyncStatus('connected');
      setLastSyncedAt(new Date());
    } catch (err) {
      setSyncStatus('error');
      handleFirestoreError(err, OperationType.WRITE, `destinations/${destination.id}`);
    }
  };

  const updateDestination = async (id: string, updated: Partial<DestinationItinerary>) => {
    setSyncStatus('syncing');
    let fullTarget: DestinationItinerary | undefined;
    setDestinations((prev) =>
      prev.map((dest) => {
        if (dest.id === id) {
          fullTarget = { ...dest, ...updated };
          return fullTarget;
        }
        return dest;
      })
    );

    if (fullTarget) {
      try {
        await setDoc(doc(db, 'destinations', id), fullTarget, { merge: true });
        setSyncStatus('connected');
        setLastSyncedAt(new Date());
      } catch (err) {
        setSyncStatus('error');
        handleFirestoreError(err, OperationType.UPDATE, `destinations/${id}`);
      }
    }
  };

  const deleteDestination = async (id: string) => {
    setSyncStatus('syncing');
    setDestinations((prev) => prev.filter((dest) => dest.id !== id));
    try {
      await deleteDoc(doc(db, 'destinations', id));
      setSyncStatus('connected');
      setLastSyncedAt(new Date());
    } catch (err) {
      setSyncStatus('error');
      handleFirestoreError(err, OperationType.DELETE, `destinations/${id}`);
    }
  };

  // Group departure actions
  const addGroupDeparture = async (departure: GroupDeparture) => {
    setSyncStatus('syncing');
    setGroupDepartures((prev) => [departure, ...prev.filter((d) => d.id !== departure.id)]);
    try {
      await setDoc(doc(db, 'groupDepartures', departure.id), departure);
      setSyncStatus('connected');
      setLastSyncedAt(new Date());
    } catch (err) {
      setSyncStatus('error');
      handleFirestoreError(err, OperationType.WRITE, `groupDepartures/${departure.id}`);
    }
  };

  const updateGroupDeparture = async (id: string, updated: Partial<GroupDeparture>) => {
    setSyncStatus('syncing');
    let fullTarget: GroupDeparture | undefined;
    setGroupDepartures((prev) =>
      prev.map((dep) => {
        if (dep.id === id) {
          fullTarget = { ...dep, ...updated };
          return fullTarget;
        }
        return dep;
      })
    );

    if (fullTarget) {
      try {
        await setDoc(doc(db, 'groupDepartures', id), fullTarget, { merge: true });
        setSyncStatus('connected');
        setLastSyncedAt(new Date());
      } catch (err) {
        setSyncStatus('error');
        handleFirestoreError(err, OperationType.UPDATE, `groupDepartures/${id}`);
      }
    }
  };

  const deleteGroupDeparture = async (id: string) => {
    setSyncStatus('syncing');
    setGroupDepartures((prev) => prev.filter((dep) => dep.id !== id));
    try {
      await deleteDoc(doc(db, 'groupDepartures', id));
      setSyncStatus('connected');
      setLastSyncedAt(new Date());
    } catch (err) {
      setSyncStatus('error');
      handleFirestoreError(err, OperationType.DELETE, `groupDepartures/${id}`);
    }
  };

  // Team member actions (including uploaded profile picture)
  const addTeamMember = async (member: TeamMember) => {
    setSyncStatus('syncing');
    setTeamMembers((prev) => [member, ...prev.filter((m) => m.id !== member.id)]);
    try {
      await setDoc(doc(db, 'teamMembers', member.id), member);
      setSyncStatus('connected');
      setLastSyncedAt(new Date());
    } catch (err) {
      setSyncStatus('error');
      handleFirestoreError(err, OperationType.WRITE, `teamMembers/${member.id}`);
    }
  };

  const updateTeamMember = async (id: string, updated: Partial<TeamMember>) => {
    setSyncStatus('syncing');
    let fullTarget: TeamMember | undefined;
    setTeamMembers((prev) => {
      const existing = prev.find((m) => m.id === id);
      if (existing) {
        fullTarget = { ...existing, ...updated, id };
        return prev.map((m) => (m.id === id ? fullTarget! : m));
      }
      const fallback = initialTeamMembers.find((m) => m.id === id);
      fullTarget = {
        id,
        name: updated.name || fallback?.name || 'Guide',
        role: updated.role || fallback?.role || 'Senior Naturalist Guide',
        bio: updated.bio || fallback?.bio || '',
        fullBio: updated.fullBio || fallback?.fullBio || updated.bio || '',
        image: updated.image || fallback?.image || '',
        years: updated.years || fallback?.years || '5+ Years Guiding',
        specialty: updated.specialty || fallback?.specialty || 'Wildlife & Nature Guide',
        region: updated.region || fallback?.region || 'Uganda & East Africa',
        languages: updated.languages || fallback?.languages || ['English', 'Luganda', 'Swahili'],
        certifications: updated.certifications || fallback?.certifications || ['USAGA Certified Guide'],
        notableExpeditions: updated.notableExpeditions || fallback?.notableExpeditions || '',
        socials: updated.socials || fallback?.socials || {},
        ...fallback,
        ...updated,
      } as TeamMember;
      return [...prev, fullTarget];
    });

    if (fullTarget) {
      try {
        await setDoc(doc(db, 'teamMembers', id), fullTarget, { merge: true });
        setSyncStatus('connected');
        setLastSyncedAt(new Date());
      } catch (err) {
        setSyncStatus('error');
        handleFirestoreError(err, OperationType.UPDATE, `teamMembers/${id}`);
      }
    }
  };

  const deleteTeamMember = async (id: string) => {
    setSyncStatus('syncing');
    setTeamMembers((prev) => prev.filter((member) => member.id !== id));
    try {
      await deleteDoc(doc(db, 'teamMembers', id));
      setSyncStatus('connected');
      setLastSyncedAt(new Date());
    } catch (err) {
      setSyncStatus('error');
      handleFirestoreError(err, OperationType.DELETE, `teamMembers/${id}`);
    }
  };

  // Trip memories / uploads actions
  const addTripMemory = async (memory: FormerTrip) => {
    setSyncStatus('syncing');
    setTripMemories((prev) => [memory, ...prev.filter((m) => m.id !== memory.id)]);
    try {
      await setDoc(doc(db, 'tripMemories', memory.id), memory);
      setSyncStatus('connected');
      setLastSyncedAt(new Date());
    } catch (err) {
      setSyncStatus('error');
      handleFirestoreError(err, OperationType.WRITE, `tripMemories/${memory.id}`);
    }
  };

  const deleteTripMemory = async (id: string) => {
    setSyncStatus('syncing');
    setTripMemories((prev) => prev.filter((mem) => mem.id !== id));
    try {
      await deleteDoc(doc(db, 'tripMemories', id));
      setSyncStatus('connected');
      setLastSyncedAt(new Date());
    } catch (err) {
      setSyncStatus('error');
      handleFirestoreError(err, OperationType.DELETE, `tripMemories/${id}`);
    }
  };

  // Force re-fetch from Firestore
  const forceSyncNow = async () => {
    setSyncStatus('syncing');
    try {
      const [destSnap, depSnap, teamSnap, memSnap] = await Promise.all([
        getDocs(collection(db, 'destinations')),
        getDocs(collection(db, 'groupDepartures')),
        getDocs(collection(db, 'teamMembers')),
        getDocs(collection(db, 'tripMemories')),
      ]);

      if (!destSnap.empty) {
        const list: DestinationItinerary[] = [];
        destSnap.forEach((d) => list.push(d.data() as DestinationItinerary));
        setDestinations(list);
      }
      if (!depSnap.empty) {
        const list: GroupDeparture[] = [];
        depSnap.forEach((d) => list.push(d.data() as GroupDeparture));
        setGroupDepartures(list);
      }
      if (!teamSnap.empty) {
        const list: TeamMember[] = [];
        teamSnap.forEach((d) => list.push(d.data() as TeamMember));
        setTeamMembers(list);
      }
      if (!memSnap.empty) {
        const list: FormerTrip[] = [];
        memSnap.forEach((d) => list.push(d.data() as FormerTrip));
        setTripMemories(list);
      }

      setSyncStatus('connected');
      setLastSyncedAt(new Date());
    } catch (err) {
      setSyncStatus('error');
      handleFirestoreError(err, OperationType.GET, 'all_collections');
    }
  };

  // Reset to initial defaults and write to Firestore
  const resetToDefaults = async () => {
    setSyncStatus('syncing');
    setDestinations(initialDestinations);
    setGroupDepartures(initialGroupDepartures);
    setTeamMembers(initialTeamMembers);
    setTripMemories(initialFormerTrips);

    try {
      const batch = writeBatch(db);
      initialDestinations.forEach((dest) => batch.set(doc(db, 'destinations', dest.id), dest));
      initialGroupDepartures.forEach((dep) => batch.set(doc(db, 'groupDepartures', dep.id), dep));
      initialTeamMembers.forEach((member) => batch.set(doc(db, 'teamMembers', member.id), member));
      initialFormerTrips.forEach((mem) => batch.set(doc(db, 'tripMemories', mem.id), mem));

      await batch.commit();
      setSyncStatus('connected');
      setLastSyncedAt(new Date());

      localStorage.removeItem(DESTINATIONS_STORAGE_KEY);
      localStorage.removeItem(GROUP_DEPARTURES_STORAGE_KEY);
      localStorage.removeItem(TEAM_MEMBERS_STORAGE_KEY);
      localStorage.removeItem(TRIP_MEMORIES_STORAGE_KEY);
    } catch (err) {
      setSyncStatus('error');
      handleFirestoreError(err, OperationType.WRITE, 'reset_batch');
    }
  };

  const importAllData = async (data: { 
    destinations?: DestinationItinerary[]; 
    groupDepartures?: GroupDeparture[]; 
    teamMembers?: TeamMember[];
    tripMemories?: FormerTrip[];
  }) => {
    try {
      setSyncStatus('syncing');
      const batch = writeBatch(db);

      if (Array.isArray(data.destinations) && data.destinations.length > 0) {
        setDestinations(data.destinations);
        data.destinations.forEach((d) => batch.set(doc(db, 'destinations', d.id), d));
      }
      if (Array.isArray(data.groupDepartures) && data.groupDepartures.length > 0) {
        setGroupDepartures(data.groupDepartures);
        data.groupDepartures.forEach((d) => batch.set(doc(db, 'groupDepartures', d.id), d));
      }
      if (Array.isArray(data.teamMembers) && data.teamMembers.length > 0) {
        setTeamMembers(data.teamMembers);
        data.teamMembers.forEach((d) => batch.set(doc(db, 'teamMembers', d.id), d));
      }
      if (Array.isArray(data.tripMemories) && data.tripMemories.length > 0) {
        setTripMemories(data.tripMemories);
        data.tripMemories.forEach((d) => batch.set(doc(db, 'tripMemories', d.id), d));
      }

      await batch.commit();
      setSyncStatus('connected');
      setLastSyncedAt(new Date());
      return true;
    } catch (err) {
      setSyncStatus('error');
      console.error('Import failed:', err);
      return false;
    }
  };

  const exportAllData = () => {
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        cloudDatabaseId: 'ai-studio-tambulatourstrav-d9b9aec2-37a3-4bff-aa93-53c4cf572ba2',
        destinations,
        groupDepartures,
        teamMembers,
        tripMemories,
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
        teamMembers,
        tripMemories,
        syncStatus,
        lastSyncedAt,
        errorMessage,
        addDestination,
        updateDestination,
        deleteDestination,
        addGroupDeparture,
        updateGroupDeparture,
        deleteGroupDeparture,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addTripMemory,
        deleteTripMemory,
        resetToDefaults,
        importAllData,
        exportAllData,
        forceSyncNow,
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
