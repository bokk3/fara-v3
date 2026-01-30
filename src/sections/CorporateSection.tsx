import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Briefcase, Coffee, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CorporateSectionProps {
  className?: string;
}

const CorporateSection = ({ className = '' }: CorporateSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
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
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        bodyRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        bulletsRef.current,
        { x: '-30vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: '-20vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: '60vw', opacity: 0, rotate: 1.5 },
        { x: 0, opacity: 1, rotate: 0, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.08 },
        { scale: 1, ease: 'none' },
        0
      );

      // SETTLE (30%-70%): Static

      // EXIT (70%-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-35vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bodyRef.current,
        { x: 0, opacity: 1 },
        { x: '-35vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bulletsRef.current,
        { x: 0, opacity: 1 },
        { x: '-35vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '-35vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '35vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, x: 0 },
        { scale: 1.06, x: '6vw', ease: 'none' },
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

  const bullets = [
    { icon: Briefcase, text: 'Bewegen op de werkvloer' },
    { icon: Coffee, text: 'Gezond vergaderen' },
    { icon: Users, text: 'Workshops & teambuilding' },
  ];

  return (
    <section
      ref={sectionRef}
      id="begeleiding"
      className={`relative w-screen h-screen overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img
          src="/images/gym_weights.jpg"
          alt="Corporate fitness"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay - Left */}
        <div className="absolute inset-0 gradient-overlay-left" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[6vw]">
        {/* Headline */}
        <div
          ref={headlineRef}
          className="font-display font-black uppercase tracking-tight-display leading-[0.9]"
        >
          <div className="text-[clamp(42px,8vw,120px)] text-[#0B0F0B]">BEGELEIDING</div>
          <div className="text-[clamp(42px,8vw,120px)] text-[#FF4D2E]">OP MAAT</div>
        </div>

        {/* Body */}
        <div ref={bodyRef} className="mt-8 max-w-lg">
          <p className="text-lg text-[#3A4A3A]">
            Voor bedrijven, teams en organisaties die inzetten op fitte medewerkers.
          </p>
        </div>

        {/* Bullets */}
        <div ref={bulletsRef} className="mt-6 flex flex-wrap gap-4">
          {bullets.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-[#0B0F0B]">
              <Icon size={18} className="text-[#FF4D2E]" />
              <span className="text-sm">{text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-8">
          <button
            onClick={scrollToContact}
            className="group bg-[#FF4D2E] text-white font-ui text-sm uppercase tracking-wide-ui px-6 py-3.5 rounded-[14px] hover:bg-[#e54326] transition-all flex items-center gap-2"
          >
            Vraag een voorstel aan
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Info Card - Right Side */}
        <div
          ref={cardRef}
          className="absolute right-[6vw] top-[22vh] w-[90vw] lg:w-[34vw] min-h-[auto] lg:min-h-[56vh] bg-white rounded-[28px] card-shadow p-6 lg:p-8"
        >
          <h3 className="font-display font-bold text-xl lg:text-2xl text-[#0B0F0B] mb-6">
            Mogelijkheden
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F6FBF6] flex items-center justify-center flex-shrink-0">
                <Briefcase size={16} className="text-[#FF4D2E]" />
              </div>
              <div>
                <p className="font-medium text-[#0B0F0B]">Op locatie of online</p>
                <p className="text-sm text-[#3A4A3A]">Flexibel naar jouw situatie</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F6FBF6] flex items-center justify-center flex-shrink-0">
                <Users size={16} className="text-[#FF4D2E]" />
              </div>
              <div>
                <p className="font-medium text-[#0B0F0B]">Programma's op maat</p>
                <p className="text-sm text-[#3A4A3A]">Afgestemd op jullie doelen</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F6FBF6] flex items-center justify-center flex-shrink-0">
                <ArrowRight size={16} className="text-[#FF4D2E]" />
              </div>
              <div>
                <p className="font-medium text-[#0B0F0B]">Meetbare resultaten</p>
                <p className="text-sm text-[#3A4A3A]">Data-gedreven aanpak</p>
              </div>
            </li>
          </ul>
          <button
            onClick={scrollToContact}
            className="mt-6 text-[#FF4D2E] font-ui text-sm uppercase tracking-wide-ui hover:underline flex items-center gap-2"
          >
            Plan een kennismaking
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CorporateSection;
