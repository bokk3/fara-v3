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
      // Entrance animations only
      gsap.fromTo(
        headlineRef.current,
        { x: '60vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        subheadlineRef.current,
        { x: '40vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      const chips = chipsRef.current?.querySelectorAll('.chip');
      if (chips) {
        gsap.fromTo(
          chips,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        );
      }

      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { x: '-60vw', opacity: 0, rotate: -1.5 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        bgRef.current,
        { scale: 1.06 },
        {
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
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
          <div className="text-[clamp(42px,8vw,120px)] text-[#3AAFA9] text-shine-subtle">LESSEN</div>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="mt-6 text-xl lg:text-2xl text-[#3A4A3A] text-right max-w-md"
        >
          Druk jezelf uit door beweging met professionele groepslessen. Van beginners tot gevorderden, Move to Fit biedt sport- en beweegactiviteiten aan in verschillende vormen die technische vaardigheden combineren met creatieve expressie.
        </p>

        {/* Class Chips */}
        <div ref={chipsRef} className="mt-8 flex flex-wrap justify-end gap-3">
          <span className="chip inline-block bg-white/90 backdrop-blur-sm text-[#0B0F0B] font-ui text-sm px-4 py-2 rounded-full border border-[#0B0F0B]/10">
            Conditiesport (Aerobics, BBB, Intervaltraining, Zumba, ...)
          </span>
          <span className="chip inline-block bg-white/90 backdrop-blur-sm text-[#0B0F0B] font-ui text-sm px-4 py-2 rounded-full border border-[#0B0F0B]/10">
            Dansles (Start to dance, Jazz, ...)
          </span>
          <span className="chip inline-block bg-white/90 backdrop-blur-sm text-[#0B0F0B] font-ui text-sm px-4 py-2 rounded-full border border-[#0B0F0B]/10">
            Kracht- en stabiliteitstraining
          </span>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-8">
          <button
            onClick={scrollToContact}
            className="group bg-[#3AAFA9] text-white font-ui text-sm uppercase tracking-wide-ui px-6 py-3.5 rounded-[14px] hover:bg-[#2D9B9B] transition-all flex items-center gap-2"
          >
            Plan een proefles
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
                <Users size={16} className="text-[#3AAFA9]" />
              </div>
              <div>
                <p className="font-medium text-[#0B0F0B]">Kleine groepen</p>
                <p className="text-sm text-[#3A4A3A]">Persoonlijke aandacht gegarandeerd</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F6FBF6] flex items-center justify-center flex-shrink-0">
                <Sparkles size={16} className="text-[#3AAFA9]" />
              </div>
              <div>
                <p className="font-medium text-[#0B0F0B]">Techniek + fun</p>
                <p className="text-sm text-[#3A4A3A]">Leren en genieten tegelijk</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F6FBF6] flex items-center justify-center flex-shrink-0">
                <DoorOpen size={16} className="text-[#3AAFA9]" />
              </div>
              <div>
                <p className="font-medium text-[#0B0F0B]">Flexibele instap</p>
                <p className="text-sm text-[#3A4A3A]">Start wanneer het jou uitkomt</p>
              </div>
            </li>
          </ul>
          <button
            onClick={scrollToContact}
            className="mt-6 text-[#3AAFA9] font-ui text-sm uppercase tracking-wide-ui hover:underline flex items-center gap-2"
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
