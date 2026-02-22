import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Send, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    onderwerp: '',
    bericht: '',
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { x: '-14vw', opacity: 0 },
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

      // Contact details animation
      const contactItems = contactRef.current?.querySelectorAll('.contact-item');
      if (contactItems) {
        contactItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `top ${75 - index * 5}%`,
                end: `top ${50 - index * 5}%`,
                scrub: 0.4,
              },
            }
          );
        });
      }

      // Form card animation
      gsap.fromTo(
        formRef.current,
        { x: '12vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.4,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://formspree.io/f/xgooapgw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowDialog(true);
        setFormData({ naam: '', email: '', onderwerp: '', bericht: '' });
      } else {
        setSubmitError('Er is iets misgegaan. Probeer het later opnieuw.');
      }
    } catch (error) {
      setSubmitError('Er is een fout opgetreden. Controleer je internetverbinding.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative w-full min-h-screen bg-[#0B0F0B] py-20 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
          {/* Left Column - Headline & Contact */}
          <div className="lg:w-[45vw]">
            {/* Big Stacked Word */}
            <div
              ref={headlineRef}
              className="font-display font-black uppercase tracking-tight-display leading-[0.9]"
            >
              <div className="text-[clamp(42px,7vw,100px)] text-white">KLAAR</div>
              <div className="text-[clamp(42px,7vw,100px)] text-white">OM TE</div>
              <div className="text-[clamp(42px,7vw,100px)] text-[#E76F51] text-shine-warm">STARTEN?</div>
            </div>

            {/* Contact Info */}
            <div ref={contactRef} className="mt-12 space-y-4">
              <div className="contact-item flex items-center gap-3 text-white/80">
                <Mail size={20} className="text-[#3AAFA9]" />
                <span>info@movetofit.be</span>
              </div>
              
              {/* Prominent SMS CTA */}
              <div className="contact-item mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-[20px] border-2 border-[#F4A261]">
                <div className="flex items-start gap-3 mb-3">
                  <Phone size={24} className="text-[#F4A261] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white text-xl font-bold mb-2">
                      Stuur 'MOVE' naar +32 471 05 26 09
                    </p>
                    <p className="text-white/70 text-sm">
                      We bellen je zo snel mogelijk terug! (Liever geen telefoontjes, graag SMS)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            ref={formRef}
            className="lg:w-[40vw] bg-white rounded-[28px] card-shadow p-6 lg:p-8"
          >
            <h3 className="font-display font-bold text-xl lg:text-2xl text-[#0B0F0B] mb-6">
              Stuur een bericht
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0B0F0B] mb-1">
                  Naam
                </label>
                <input
                  type="text"
                  name="naam"
                  value={formData.naam}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-[14px] border border-[#0B0F0B]/10 focus:border-[#3AAFA9] focus:outline-none transition-colors"
                  placeholder="Jouw naam"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0B0F0B] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-[14px] border border-[#0B0F0B]/10 focus:border-[#3AAFA9] focus:outline-none transition-colors"
                  placeholder="jouw@email.be"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0B0F0B] mb-1">
                  Onderwerp
                </label>
                <select
                  name="onderwerp"
                  value={formData.onderwerp}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-[14px] border border-[#0B0F0B]/10 focus:border-[#3AAFA9] focus:outline-none transition-colors bg-white"
                >
                  <option value="">Kies een onderwerp</option>
                  <option value="coaching">Personal Coaching</option>
                  <option value="groep">Groepslessen</option>
                  <option value="bedrijf">Begeleiding op maat</option>
                  <option value="anders">Anders</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0B0F0B] mb-1">
                  Bericht
                </label>
                <textarea
                  name="bericht"
                  value={formData.bericht}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-[14px] border border-[#0B0F0B]/10 focus:border-[#3AAFA9] focus:outline-none transition-colors resize-none"
                  placeholder="Vertel meer over jouw doelen..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex-1 bg-[#3AAFA9] text-white font-ui text-sm uppercase tracking-wide-ui px-6 py-3.5 rounded-[14px] hover:bg-[#2D9B9B] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                  {isSubmitting ? 'Verzenden...' : 'Verstuur bericht'}
                </button>
              </div>

              {submitError && (
                <p className="text-red-600 text-sm mt-2">{submitError}</p>
              )}

              <button
                type="button"
                onClick={() => setShowDialog(true)}
                className="w-full border-2 border-[#3AAFA9] text-[#3AAFA9] font-ui text-sm uppercase tracking-wide-ui px-6 py-3.5 rounded-[14px] hover:bg-[#3AAFA9] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Calendar size={18} />
                Plan direct een intake
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-32 pt-12 border-t border-white/20 px-6 lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-4">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="font-display font-black text-2xl text-white">
              Move to Fit
            </div>
            <p className="text-white/60 text-sm max-w-xs">
               Van stilzitten naar stralen! Coaching die écht bij je past.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <h4 className="font-ui text-xs uppercase tracking-wide-ui text-white/40 mb-1">
              Navigatie
            </h4>
            <a href="#coaching" className="text-white/70 hover:text-[#3AAFA9] transition-colors text-sm">
              Coaching
            </a>
            <a href="#groep" className="text-white/70 hover:text-[#3AAFA9] transition-colors text-sm">
              Groepslessen
            </a>
            <a href="#begeleiding" className="text-white/70 hover:text-[#3AAFA9] transition-colors text-sm">
              Begeleiding
            </a>
            <a href="#over" className="text-white/70 hover:text-[#3AAFA9] transition-colors text-sm">
              Over Fara
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <h4 className="font-ui text-xs uppercase tracking-wide-ui text-white/40 mb-1">
              Contact
            </h4>
            <a href="mailto:info@movetofit.be" className="text-white/70 hover:text-[#3AAFA9] transition-colors text-sm flex items-center gap-2">
              <Mail size={14} />
              info@movetofit.be
            </a>
            <a href="tel:+32471052609" className="text-white/70 hover:text-[#3AAFA9] transition-colors text-sm flex items-center gap-2">
              <Phone size={14} />
              +32 471 05 26 09
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-white/40 text-xs">
            <p>© {new Date().getFullYear()} Move to Fit. Alle rechten voorbehouden.</p>
            <p>
              Gemaakt met ❤️ voor beweging door{' '}
              <a 
                href="https://truyens.pro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#F4A261] hover:text-[#E76F51] transition-colors"
              >
                truyens.pro
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Bedankt voor je bericht!</DialogTitle>
            <DialogDescription className="text-[#3A4A3A]">
              We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op. Meestal reageren we binnen 1 werkdag.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setShowDialog(false)}
              className="bg-[#3AAFA9] text-white font-ui text-sm uppercase tracking-wide-ui px-6 py-3 rounded-[14px] hover:bg-[#2D9B9B] transition-colors"
            >
              Sluiten
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ContactSection;
