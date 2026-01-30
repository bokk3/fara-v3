import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users, Sparkles, DoorOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GroupSectionProps {
  className?: string;
}

const GroupSection = ({ className = '' }: GroupSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Only enable scroll animations on desktop (lg breakpoint = 1024px)
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    
    if (!isDesktop) {
      // On mobile, just show everything immediately
      const chips = chipsRef.current?.querySelectorAll('.chip');
      gsap.set([headlineRef.current, subheadlineRef.current, chips, ctaRef.current, cardRef.current, bgRef.current], {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
      });
      return;
    }

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
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        subheadlineRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      const chips = chipsRef.current?.querySelectorAll('.chip');
      if (chips) {
        scrollTl.fromTo(
          chips,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.1
        );
      }

      scrollTl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: '-60vw', opacity: 0, rotate: -1.5 },
        { x: 0, opacity: 1, rotate: 0, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.06 },
        { scale: 1, ease: 'none' },
        0
      );

      // SETTLE (30%-70%): Static

      // EXIT (70%-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '35vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subheadlineRef.current,
        { x: 0, opacity: 1 },
        { x: '35vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (chips) {
        scrollTl.fromTo(
          chips,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
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
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-35vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1 },
        { scale: 1.05, ease: 'none' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const classes = [
    'Start to Dance',
    'Intervaltraining',
    'Kracht & stabiliteit',
  ];

  return (
    <section
      ref={sectionRef}
      id="groep"
      className={`relative w-screen lg:h-screen min-h-screen overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/images/group_class.jpg"
          alt="Group fitness class"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay - Right */}
        <div className="absolute inset-0 gradient-overlay-right" />
      </div>

      {/* Content - Right Aligned */}
      <div className="relative z-10 h-full flex flex-col justify-center items-end px-6 lg:px-[6vw] py-20 lg:py-0 pb-8 lg:pb-0">
        {/* Headline */}
        <div
          ref={headlineRef}
          className="font-display font-black uppercase tracking-tight-display leading-[0.9] text-right"
        >
          <div className="text-[clamp(42px,8vw,120px)] text-[#0B0F0B]">GROEPS</div>
          <div className="text-[clamp(42px,8vw,120px)] text-[#00CED1]">LESSEN</div>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-6 text-xl lg:text-2xl text-[#3A4A3A] text-right max-w-md"
        >
          Dans, conditie, kracht—voor elk niveau.
        </p>

        {/* Class Chips */}
        <div ref={chipsRef} className="mt-8 flex flex-wrap justify-end gap-3">
          {classes.map((cls) => (
            <span
              key={cls}
              className="chip inline-block bg-white/90 backdrop-blur-sm text-[#0B0F0B] font-ui text-sm px-4 py-2 rounded-full border border-[#0B0F0B]/10"
            >
              {cls}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-8">
          <button
            onClick={scrollToContact}
            className="group bg-[#00CED1] text-white font-ui text-sm uppercase tracking-wide-ui px-6 py-3.5 rounded-[14px] hover:bg-[#00B8BB] transition-all flex items-center gap-2"
          >
            Bekijk het rooster
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Info Card - Left Side on desktop, below on mobile */}
        <div
          ref={cardRef}
          className="lg:absolute static lg:left-[6vw] lg:top-[22vh] w-full lg:w-[34vw] mt-12 lg:mt-0 min-h-[auto] lg:min-h-[56vh] bg-white rounded-[28px] card-shadow p-6 lg:p-8"
        >
          <h3 className="font-display font-bold text-xl lg:text-2xl text-[#0B0F0B] mb-6">
            Hoe het werkt
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F6FBF6] flex items-center justify-center flex-shrink-0">
                <Users size={16} className="text-[#00CED1]" />
              </div>
              <div>
                <p className="font-medium text-[#0B0F0B]">Kleine groepen</p>
                <p className="text-sm text-[#3A4A3A]">Persoonlijke aandacht gegarandeerd</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F6FBF6] flex items-center justify-center flex-shrink-0">
                <Sparkles size={16} className="text-[#00CED1]" />
              </div>
              <div>
                <p className="font-medium text-[#0B0F0B]">Techniek + fun</p>
                <p className="text-sm text-[#3A4A3A]">Leren en genieten tegelijk</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F6FBF6] flex items-center justify-center flex-shrink-0">
                <DoorOpen size={16} className="text-[#00CED1]" />
              </div>
              <div>
                <p className="font-medium text-[#0B0F0B]">Flexibele instap</p>
                <p className="text-sm text-[#3A4A3A]">Start wanneer het jou uitkomt</p>
              </div>
            </li>
          </ul>
          <button
            onClick={scrollToContact}
            className="mt-6 text-[#00CED1] font-ui text-sm uppercase tracking-wide-ui hover:underline flex items-center gap-2"
          >
            Vraag proefles aan
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default GroupSection;
