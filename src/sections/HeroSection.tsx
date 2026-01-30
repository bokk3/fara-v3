import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background fade in
      tl.fromTo(
        bgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 }
      );

      // Headline lines staggered rise
      const lines = headlineRef.current?.querySelectorAll('.headline-line');
      if (lines) {
        tl.fromTo(
          lines,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.6 },
          '-=0.3'
        );
      }

      // CTA row
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      // Scroll hint
      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            const lines = headlineRef.current?.querySelectorAll('.headline-line');
            if (lines && lines.length > 0) {
              gsap.set(lines, {
                x: 0,
                opacity: 1,
              });
            }
            gsap.set(ctaRef.current, { y: 0, opacity: 1 });
            gsap.set(bgRef.current, { scale: 1, x: 0 });
          },
        },
      });

      // ENTRANCE (0%-30%): Hold - no changes (matches load end state)
      // SETTLE (30%-70%): Static

      // EXIT (70%-100%)
      const lines = headlineRef.current?.querySelectorAll('.headline-line');
      if (lines) {
        scrollTl.fromTo(
          lines,
          { x: 0, opacity: 1 },
          { x: '-55vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, x: 0 },
        { scale: 1.06, x: '8vw', ease: 'none' },
        0.7
      );

      scrollTl.fromTo(
        scrollHintRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative w-screen h-screen overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/hero_stretch.jpg"
          alt="Fitness coaching"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-overlay-left" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[6vw]">
        {/* Big Stacked Word */}
        <div
          ref={headlineRef}
          className="font-display font-black uppercase tracking-tight-display leading-[0.9]"
          style={{ marginTop: '-5vh' }}
        >
          <div
            className="headline-line text-[clamp(48px,9vw,140px)] text-[#0B0F0B]"
            style={{ opacity: 0 }}
          >
            VAN
          </div>
          <div
            className="headline-line text-[clamp(48px,9vw,140px)] text-[#0B0F0B]"
            style={{ opacity: 0 }}
          >
            STILZITTEN
          </div>
          <div
            className="headline-line text-[clamp(48px,9vw,140px)] text-[#0B0F0B]"
            style={{ opacity: 0 }}
          >
            NAAR
          </div>
          <div
            className="headline-line text-[clamp(48px,9vw,140px)] text-[#FF4D2E]"
            style={{ opacity: 0 }}
          >
            STRALEN
          </div>
        </div>

        {/* Subheadline */}
        <p className="mt-8 lg:mt-12 text-lg lg:text-xl text-[#3A4A3A] max-w-md">
          Personal coaching + groepslessen in Turnhout.
        </p>

        {/* CTA Row */}
        <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4" style={{ opacity: 0 }}>
          <button
            onClick={() => scrollToSection('contact')}
            className="group bg-[#FF4D2E] text-white font-ui text-sm uppercase tracking-wide-ui px-6 py-3.5 rounded-[14px] hover:bg-[#e54326] transition-all flex items-center gap-2"
          >
            Plan een gratis intake
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection('coaching')}
            className="text-[#0B0F0B] font-ui text-sm uppercase tracking-wide-ui hover:text-[#FF4D2E] transition-colors flex items-center gap-2"
          >
            Bekijk aanbod
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="font-ui text-xs uppercase tracking-[0.14em] text-[#3A4A3A]">
          Scroll
        </span>
        <ChevronDown size={20} className="text-[#3A4A3A] animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
