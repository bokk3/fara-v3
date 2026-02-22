import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import BrandStatement from './sections/BrandStatement';
import CoachingSection from './sections/CoachingSection';
import GroupSection from './sections/GroupSection';
import CorporateSection from './sections/CorporateSection';
import AboutSection from './sections/AboutSection';
import QualificationsSection from './sections/QualificationsSection';
import ApproachSection from './sections/ApproachSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger after all sections mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      <Navigation />
      <main className="relative">
        <HeroSection className="z-10" />
        <BrandStatement className="z-20" />
        <CoachingSection className="z-30" />
        <GroupSection className="z-40" />
        <CorporateSection className="z-50" />
        <AboutSection className="z-[60]" />
        <QualificationsSection className="z-[70]" />
        <ApproachSection className="z-[80]" />
        <ContactSection className="z-[90]" />
      </main>
    </div>
  );
}

export default App;
