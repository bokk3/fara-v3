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
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      
      // Create a global snap that works with the pinned sections
      ScrollTrigger.create({
        snap: {
          snapTo: 'labelsDirectional',
          duration: { min: 0.2, max: 0.5 },
          delay: 0.1,
          ease: 'power1.inOut',
        },
      });
    }, 300);

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
