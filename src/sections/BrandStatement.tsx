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
  const pillRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

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
        headlineRef.current,
        { x: '60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        pillRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0.7 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // SETTLE (30%-70%): Static - no animation needed

      // EXIT (70%-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '40vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        taglineRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        pillRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, x: 0 },
        { scale: 1.05, x: '-6vw', ease: 'none' },
        0.7
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
      <div className="relative z-10 h-full flex flex-col justify-center items-end px-6 lg:px-[6vw]">
        {/* Big Stacked Word */}
        <div
          ref={headlineRef}
          className="font-display font-black uppercase tracking-tight-display leading-[0.9] text-right"
        >
          <div className="text-[clamp(48px,9vw,140px)] text-[#FF4D2E]">MOVE</div>
          <div className="text-[clamp(48px,9vw,140px)] text-[#0B0F0B]">TO</div>
          <div className="text-[clamp(48px,9vw,140px)] text-[#0B0F0B]">FIT</div>
        </div>

        {/* Pill */}
        <span
          ref={pillRef}
          className="mt-8 inline-block bg-[#0B0F0B] text-white font-ui text-xs uppercase tracking-[0.14em] px-4 py-2 rounded-full"
        >
          Turnhout
        </span>

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
