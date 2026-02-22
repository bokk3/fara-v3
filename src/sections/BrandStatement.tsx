import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BrandStatementProps {
  className?: string;
}

const BrandStatement = ({ className = '' }: BrandStatementProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Only enable scroll animations on desktop (lg breakpoint = 1024px)
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    
    if (!isDesktop) {
      // On mobile, just show everything immediately
      gsap.set([headlineRef.current, taglineRef.current, bgRef.current], {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Entrance animation only - no exit
      gsap.fromTo(
        headlineRef.current,
        { x: '60vw', opacity: 0, scale: 0.96 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
            once: false,
          },
        }
      );

      gsap.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 1,
            once: false,
          },
        }
      );

      gsap.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0.7 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
            once: false,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-screen h-screen overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/images/gym_functional.jpg"
          alt="Functional training"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay - Right to Left */}
        <div className="absolute inset-0 gradient-overlay-right" />
      </div>

      {/* Content - Right Aligned */}
      <div className="relative z-10 h-full flex flex-col justify-center items-end px-6 lg:px-[6vw] py-20 lg:py-0">
        {/* Big Stacked Word */}
        <div
          ref={headlineRef}
          className="font-display font-black uppercase tracking-tight-display leading-[0.9] text-right"
        >
          <div className="text-[clamp(48px,9vw,140px)] text-[#F4A261] text-shine-warm">MOVE</div>
          <div className="text-[clamp(48px,9vw,140px)] text-[#0B0F0B]">TO</div>
          <div className="text-[clamp(48px,9vw,140px)] text-[#0B0F0B]">FIT</div>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="mt-6 text-xl lg:text-2xl text-[#3A4A3A] text-right max-w-md"
        >
          Coaching die écht bij je past.
        </p>
      </div>
    </section>
  );
};

export default BrandStatement;
