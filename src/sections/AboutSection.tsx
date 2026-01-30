import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  className?: string;
}

const AboutSection = ({ className = '' }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(
        portraitRef.current,
        { x: '-60vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30%-70%): Static

      // EXIT (70%-100%)
      scrollTl.fromTo(
        portraitRef.current,
        { x: 0, opacity: 1 },
        { x: '-35vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '35vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToQualifications = () => {
    const element = document.getElementById('kwalificaties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="over"
      className={`relative w-screen h-screen overflow-hidden bg-[#0B0F0B] ${className}`}
    >
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center px-6 lg:px-[6vw] py-20 lg:py-0">
        {/* Portrait Card - Left */}
        <div
          ref={portraitRef}
          className="w-full lg:w-[44vw] h-[40vh] lg:h-[72vh] rounded-[28px] overflow-hidden card-shadow-dark flex-shrink-0 mb-8 lg:mb-0"
        >
          <img
            src="/images/portrait_fara.jpg"
            alt="Fara - Move to Fit coach"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Text Content - Right */}
        <div className="lg:ml-auto lg:text-right flex flex-col items-start lg:items-end">
          {/* Headline */}
          <div
            ref={headlineRef}
            className="font-display font-black uppercase tracking-tight-display leading-[0.9]"
          >
            <div className="text-[clamp(42px,8vw,120px)] text-white">OVER</div>
            <div className="text-[clamp(42px,8vw,120px)] text-[#FF4D2E]">FARA</div>
          </div>

          {/* Body */}
          <p
            ref={bodyRef}
            className="mt-8 text-lg lg:text-xl text-white/80 max-w-md lg:text-right"
          >
            Ik geloof dat iedereen kan stralen als de beweging past bij wie je bent. 
            Geen druk, alleen vooruitgang.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToContact}
              className="group bg-[#FF4D2E] text-white font-ui text-sm uppercase tracking-wide-ui px-6 py-3.5 rounded-[14px] hover:bg-[#e54326] transition-all flex items-center gap-2"
            >
              Lees meer
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToQualifications}
              className="text-white/80 font-ui text-sm uppercase tracking-wide-ui hover:text-[#FF4D2E] transition-colors flex items-center gap-2"
            >
              <Award size={18} />
              Bekijk kwalificaties
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
