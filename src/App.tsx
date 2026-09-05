import React, { useState, useEffect } from 'react';
import { CurrencyCode, DestinationItinerary, GalleryPhoto, GroupDeparture } from './types';
import { DESTINATIONS } from './data/safariData';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TickerMarquee } from './components/TickerMarquee';
import { ServicesSection } from './components/ServicesSection';
import { GenesisSection } from './components/GenesisSection';
import { GallerySection } from './components/GallerySection';
import { DestinationsSection } from './components/DestinationsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ConservationSection } from './components/ConservationSection';
import { Footer } from './components/Footer';
import { PlanTripModal } from './components/PlanTripModal';
import { ItineraryModal } from './components/ItineraryModal';
import { GroupDeparturesModal } from './components/GroupDeparturesModal';
import { FlightConciergeModal } from './components/FlightConciergeModal';
import { GalleryLightboxModal } from './components/GalleryLightboxModal';

export function App() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [activeSection, setActiveSection] = useState<string>('home');

  // Modals state
  const [planTripModalOpen, setPlanTripModalOpen] = useState(false);
  const [selectedDestinationForPlan, setSelectedDestinationForPlan] = useState<string | undefined>(undefined);

  const [itineraryModalOpen, setItineraryModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<DestinationItinerary | null>(null);

  const [groupDeparturesModalOpen, setGroupDeparturesModalOpen] = useState(false);
  const [flightConciergeModalOpen, setFlightConciergeModalOpen] = useState(false);

  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [lightboxModalOpen, setLightboxModalOpen] = useState(false);

  // Intersection observer to track active section for navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'genesis', 'gallery', 'destinations', 'testimonials', 'conservation', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const found = DESTINATIONS.find((d) => d.id === destId);
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

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1c221e]">
      {/* 1. Dark Top Bar */}
      <TopBar
        currentCurrency={currency}
        onCurrencyChange={(newCurr) => setCurrency(newCurr)}
      />

      {/* 2. Primary Navigation Bar */}
      <Navbar
        onPlanTripClick={() => handleOpenPlanTrip()}
        activeSection={activeSection}
      />

      {/* Main Page Sections matching the visual design */}
      <main className="grow">
        {/* 3. Hero Section */}
        <HeroSection
          onExploreServices={() => scrollToSection('services')}
          onExploreDestinations={() => scrollToSection('destinations')}
          onCustomItinerary={() => handleOpenPlanTrip('Uganda Mountain Gorillas & Big Five')}
        />

        {/* 4. Safari Ticker Marquee */}
        <TickerMarquee />

        {/* 5. Comprehensive Travel Services ("How We Travel Together") */}
        <ServicesSection
          onViewGroupDepartures={() => setGroupDeparturesModalOpen(true)}
          onTailorPrivateSafari={() => handleOpenPlanTrip('Bespoke Solo & Private Safari')}
          onBookFlightServices={() => setFlightConciergeModalOpen(true)}
        />

        {/* 6. The Genesis of Tambula ("Born from the Pearl of Africa") */}
        <GenesisSection />

        {/* 7. Visual Journey Gallery ("Captured Across East Africa & Beyond") */}
        <GallerySection onPhotoClick={handlePhotoClick} />

        {/* 8. International & Regional Destinations */}
        <DestinationsSection
          onSelectDestination={handleOpenItinerary}
          onRequestAllGuides={() => handleOpenPlanTrip('All East Africa & International Guides')}
        />

        {/* 9. Traveler Experiences ("Voices from the Trail") */}
        <TestimonialsSection />

        {/* 10. Sustainable Tourism in Action ("Community Outreach & Habitat Conservation") */}
        <ConservationSection
          onSupportOutreach={() => handleOpenPlanTrip('Community Outreach & Reforestation Visit')}
        />
      </main>

      {/* 11. Footer */}
      <Footer
        onPlanTripClick={() => handleOpenPlanTrip()}
        onViewGroupDepartures={() => setGroupDeparturesModalOpen(true)}
        onSelectDestinationById={handleOpenItineraryById}
        onBookFlightServices={() => setFlightConciergeModalOpen(true)}
      />

      {/* Interactive Modals */}
      <PlanTripModal
        isOpen={planTripModalOpen}
        onClose={() => setPlanTripModalOpen(false)}
        currency={currency}
        initialDestination={selectedDestinationForPlan}
      />

      <ItineraryModal
        destination={selectedDestination}
        isOpen={itineraryModalOpen}
        onClose={() => setItineraryModalOpen(false)}
        currency={currency}
        onBookThisItinerary={(title) => {
          setItineraryModalOpen(false);
          handleOpenPlanTrip(title);
        }}
      />

      <GroupDeparturesModal
        isOpen={groupDeparturesModalOpen}
        onClose={() => setGroupDeparturesModalOpen(false)}
        currency={currency}
        onSelectDeparture={handleSelectGroupDeparture}
      />

      <FlightConciergeModal
        isOpen={flightConciergeModalOpen}
        onClose={() => setFlightConciergeModalOpen(false)}
      />

      <GalleryLightboxModal
        photo={lightboxPhoto}
        isOpen={lightboxModalOpen}
        onClose={() => setLightboxModalOpen(false)}
      />
    </div>
  );
}

export default App;
