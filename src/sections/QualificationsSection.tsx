import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Music, Heart, Apple } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface QualificationsSectionProps {
  className?: string;
}

const QualificationsSection = ({ className = '' }: QualificationsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { x: '-12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.4,
          },
        }
      );

      // Intro animation
      gsap.fromTo(
        introRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.4,
          },
        }
      );

      // Cards staggered animation
      const cards = cardsRef.current?.querySelectorAll('.qual-card');
      if (cards) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { x: '10vw', opacity: 0, y: 24 },
            {
              x: 0,
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 55%',
                scrub: 0.4,
              },
            }
          );

          // Subtle parallax
          gsap.fromTo(
            card,
            { y: 0 },
            {
              y: -20,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.4,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const qualifications = [
    {
      icon: GraduationCap,
      title: 'Professionele Bachelor Sport en Bewegen',
      subtitle: 'Thomas More Turnhout',
    },
    {
      icon: Music,
      title: 'Diploma Initiatie Jazzdance',
      subtitle: 'Vlaamse Trainersschool',
    },
    {
      icon: Heart,
      title: 'EHBO',
      subtitle: 'Wit-Gele Kruis',
    },
    {
      icon: Apple,
      title: 'Basiskennis Sportvoeding en Sportmassage',
      subtitle: 'Gecertificeerd',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="kwalificaties"
      className={`relative w-full min-h-screen bg-[#F6FBF6] py-20 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
          {/* Left Column - Text */}
          <div className="lg:w-[46vw]">
            <h2
              ref={headlineRef}
              className="font-display font-black text-[clamp(36px,6vw,80px)] uppercase tracking-tight-display text-[#0B0F0B]"
            >
              KWALIFICATIES
            </h2>
            <p
              ref={introRef}
              className="mt-6 text-lg text-[#3A4A3A] max-w-lg"
            >
              Opleiding, ervaring en certificeringen die garant staan voor 
              veilige, effectieve begeleiding.
            </p>
          </div>

          {/* Right Column - Cards */}
          <div
            ref={cardsRef}
            className="lg:w-[40vw] space-y-4"
          >
            {qualifications.map(({ icon: Icon, title, subtitle }) => (
              <div
                key={title}
                className="qual-card bg-white rounded-[28px] card-shadow p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#F6FBF6] flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-[#FF4D2E]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#0B0F0B]">
                    {title}
                  </h3>
                  <p className="text-sm text-[#3A4A3A] mt-1">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualificationsSection;
