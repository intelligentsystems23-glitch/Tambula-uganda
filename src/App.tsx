import React, { useState, useEffect } from 'react';
import { CurrencyCode, DestinationItinerary, GalleryPhoto, GroupDeparture } from './types';
import { CURRENCIES } from './data/safariData';
import { SafariDataProvider, useSafariData } from './context/SafariDataContext';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Independent Pages
import { HomePage } from './pages/HomePage';
import { GroupTripsPage } from './components/GroupTripsPage';
import { ServicesPage } from './pages/ServicesPage';
import { GenesisPage } from './pages/GenesisPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminCMSPage } from './pages/AdminCMSPage';

// Modals
import { PlanTripModal } from './components/PlanTripModal';
import { ItineraryModal } from './components/ItineraryModal';
import { GroupDeparturesModal } from './components/GroupDeparturesModal';
import { FlightConciergeModal } from './components/FlightConciergeModal';
import { GalleryLightboxModal } from './components/GalleryLightboxModal';

type PageId = 'home' | 'group-trips' | 'services' | 'genesis' | 'destinations' | 'contact' | 'admin';

function AppContent() {
  const { destinations } = useSafariData();
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  
  // Page routing state
  const getInitialPage = (): PageId => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (pathname === '/admin' || pathname === '/admin/' || hash === 'admin' || hash === '/admin') {
        return 'admin';
      }
      if (['home', 'group-trips', 'services', 'genesis', 'destinations', 'contact', 'admin'].includes(hash)) {
        return hash as PageId;
      }
    }
    return 'home';
  };

  const [activePage, setActivePage] = useState<PageId>(getInitialPage());

  // Listen to hash changes (e.g. browser back/forward or external links)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'admin' || hash === '/admin') {
        setActivePage('admin');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (['home', 'group-trips', 'services', 'genesis', 'destinations', 'contact', 'admin'].includes(hash)) {
        setActivePage(hash as PageId);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation action that opens newly at top
  const handleNavigatePage = (pageId: string) => {
    const validPages: PageId[] = ['home', 'group-trips', 'services', 'genesis', 'destinations', 'contact', 'admin'];
    const targetPage = validPages.includes(pageId as PageId) ? (pageId as PageId) : 'home';
    setActivePage(targetPage);
    window.location.hash = targetPage;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Modals state
  const [planTripModalOpen, setPlanTripModalOpen] = useState(false);
  const [selectedDestinationForPlan, setSelectedDestinationForPlan] = useState<string | undefined>(undefined);

  const [itineraryModalOpen, setItineraryModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<DestinationItinerary | null>(null);

  const [groupDeparturesModalOpen, setGroupDeparturesModalOpen] = useState(false);
  const [flightConciergeModalOpen, setFlightConciergeModalOpen] = useState(false);

  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [lightboxModalOpen, setLightboxModalOpen] = useState(false);

  // Handlers
  const handleOpenPlanTrip = (initialDest?: string) => {
    setSelectedDestinationForPlan(initialDest);
    setPlanTripModalOpen(true);
  };

  const handleOpenItinerary = (dest: DestinationItinerary) => {
    setSelectedDestination(dest);
    setItineraryModalOpen(true);
  };

  const handleOpenItineraryById = (destId: string) => {
    const found = destinations.find((d) => d.id === destId);
    if (found) {
      setSelectedDestination(found);
      setItineraryModalOpen(true);
    }
  };

  const handlePhotoClick = (photo: GalleryPhoto) => {
    setLightboxPhoto(photo);
    setLightboxModalOpen(true);
  };

  const handleSelectGroupDeparture = (departure: GroupDeparture) => {
    setGroupDeparturesModalOpen(false);
    setSelectedDestinationForPlan(departure.title);
    setPlanTripModalOpen(true);
  };

  const currentCurrencyConfig = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1c221e]">
      {/* 1. Dark Top Bar with Currency Switcher & Direct Contacts */}
      <TopBar
        currentCurrency={currency}
        onCurrencyChange={(newCurr) => setCurrency(newCurr)}
        onNavigatePage={handleNavigatePage}
      />

      {/* 2. Primary Navigation Bar */}
      {activePage !== 'admin' && (
        <Navbar
          onPlanTripClick={() => handleOpenPlanTrip()}
          activePage={activePage}
          onNavigatePage={handleNavigatePage}
        />
      )}

      {/* 3. Independent Page Content */}
      <main className="grow">
        {activePage === 'home' && (
          <HomePage
            currency={currentCurrencyConfig}
            onNavigatePage={handleNavigatePage}
            onPlanTrip={handleOpenPlanTrip}
            onSelectDestination={handleOpenItinerary}
            onPhotoClick={handlePhotoClick}
            onBookFlightConcierge={() => setFlightConciergeModalOpen(true)}
          />
        )}

        {activePage === 'group-trips' && (
          <GroupTripsPage
            currency={currency}
            onNavigatePage={handleNavigatePage}
            onOpenBookingModal={(tripTitle) => handleOpenPlanTrip(tripTitle)}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            currency={currentCurrencyConfig}
            onNavigatePage={handleNavigatePage}
            onPlanTrip={handleOpenPlanTrip}
            onBookFlightConcierge={() => setFlightConciergeModalOpen(true)}
          />
        )}

        {activePage === 'genesis' && (
          <GenesisPage
            onNavigatePage={handleNavigatePage}
            onPlanTrip={handleOpenPlanTrip}
          />
        )}

        {activePage === 'destinations' && (
          <DestinationsPage
            currency={currentCurrencyConfig}
            onNavigatePage={handleNavigatePage}
            onSelectDestination={handleOpenItinerary}
            onPlanTrip={handleOpenPlanTrip}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            currency={currentCurrencyConfig}
            onNavigatePage={handleNavigatePage}
            onPlanTrip={handleOpenPlanTrip}
          />
        )}

        {activePage === 'admin' && (
          <AdminCMSPage
            currency={currentCurrencyConfig}
            onNavigatePage={handleNavigatePage}
            onSelectDestination={handleOpenItinerary}
          />
        )}
      </main>

      {/* 4. Global Footer with Independent Page Navigation */}
      {activePage !== 'admin' && (
        <Footer
          onPlanTripClick={() => handleOpenPlanTrip()}
          onViewGroupDepartures={() => handleNavigatePage('group-trips')}
          onSelectDestinationById={handleOpenItineraryById}
          onBookFlightServices={() => setFlightConciergeModalOpen(true)}
          onNavigatePage={handleNavigatePage}
        />
      )}

      {/* Interactive Global Modals */}
      {planTripModalOpen && (
        <PlanTripModal
          isOpen={planTripModalOpen}
          onClose={() => setPlanTripModalOpen(false)}
          currency={currency}
          initialDestination={selectedDestinationForPlan}
        />
      )}

      {itineraryModalOpen && selectedDestination && (
        <ItineraryModal
          destination={selectedDestination}
          isOpen={itineraryModalOpen}
          onClose={() => {
            setItineraryModalOpen(false);
            setSelectedDestination(null);
          }}
          currency={currency}
          onBookThisItinerary={(title) => {
            setItineraryModalOpen(false);
            handleOpenPlanTrip(title);
          }}
        />
      )}

      {groupDeparturesModalOpen && (
        <GroupDeparturesModal
          isOpen={groupDeparturesModalOpen}
          onClose={() => setGroupDeparturesModalOpen(false)}
          currency={currency}
          onSelectDeparture={handleSelectGroupDeparture}
        />
      )}

      {flightConciergeModalOpen && (
        <FlightConciergeModal
          isOpen={flightConciergeModalOpen}
          onClose={() => setFlightConciergeModalOpen(false)}
        />
      )}

      {lightboxModalOpen && lightboxPhoto && (
        <GalleryLightboxModal
          photo={lightboxPhoto}
          isOpen={lightboxModalOpen}
          onClose={() => {
            setLightboxModalOpen(false);
            setLightboxPhoto(null);
          }}
        />
      )}
    </div>
  );
}

export function App() {
  return (
    <SafariDataProvider>
      <AppContent />
    </SafariDataProvider>
  );
}

export default App;
