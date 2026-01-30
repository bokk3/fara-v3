import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ApproachSectionProps {
  className?: string;
}

const ApproachSection = ({ className = '' }: ApproachSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.4,
          },
        }
      );

      // Subheadline animation
      gsap.fromTo(
        subheadlineRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.4,
          },
        }
      );

      // Steps staggered animation
      const steps = stepsRef.current?.querySelectorAll('.step-item');
      if (steps) {
        steps.forEach((step) => {
          gsap.fromTo(
            step,
            { x: '-8vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 0.4,
              },
            }
          );
        });
      }

      // Image card animation
      gsap.fromTo(
        imageRef.current,
        { x: '10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4,
          },
        }
      );

      // Image parallax
      gsap.fromTo(
        imageRef.current,
        { y: 0 },
        {
          y: -24,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    { number: '1', title: 'Intake', desc: 'Kennismaken en doelen bepalen' },
    { number: '2', title: 'Plan op maat', desc: 'Persoonlijk programma samenstellen' },
    { number: '3', title: 'Trainen met feedback', desc: 'Begeleiding en bijsturing' },
    { number: '4', title: 'Blijven groeien', desc: 'Resultaten boeken en doorontwikkelen' },
  ];

  return (
    <section
      ref={sectionRef}
      id="aanpak"
      className={`relative w-full min-h-screen bg-[#F6FBF6] py-20 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
          {/* Left Column - Text & Steps */}
          <div className="lg:w-[42vw]">
            <h2
              ref={headlineRef}
              className="font-display font-black text-[clamp(36px,6vw,80px)] uppercase tracking-tight-display text-[#0B0F0B]"
            >
              AANPAK
            </h2>
            <p
              ref={subheadlineRef}
              className="mt-4 text-lg text-[#3A4A3A]"
            >
              Stap voor stap van stilzitten naar stralen.
            </p>

            {/* Steps */}
            <div ref={stepsRef} className="mt-12 space-y-6">
              {steps.map(({ number, title, desc }) => (
                <div
                  key={number}
                  className="step-item flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[#00CED1] text-white font-display font-bold text-lg flex items-center justify-center flex-shrink-0">
                    {number}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#0B0F0B]">
                      {title}
                    </h3>
                    <p className="text-sm text-[#3A4A3A] mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            ref={imageRef}
            className="lg:w-[44vw] h-[50vh] lg:h-[62vh] rounded-[28px] overflow-hidden card-shadow"
          >
            <img
              src="/images/action_jump.jpg"
              alt="Dynamic fitness action"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
