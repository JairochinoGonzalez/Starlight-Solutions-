import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Phone, MessageSquare, Send, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroSectionProps {
  lang: Language;
  onScrollToForm: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onScrollToForm,
}) => {
  const t = translations[lang];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#071426] border-b border-[#4A4F54]/25">
      {/* Deep Aurora & Halftone Dot Atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 aurora-mesh pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 dot-matrix-subtle opacity-70 pointer-events-none"
      />

      {/* Flowing Wireframe Particle Wave SVG in Bottom Right (Inspired by Reference) */}
      <svg
        aria-hidden="true"
        className="absolute -bottom-10 right-0 w-[620px] sm:w-[900px] h-[340px] pointer-events-none opacity-45"
        viewBox="0 0 900 340"
        fill="none"
      >
        <defs>
          <linearGradient id="waveGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D2340" stopOpacity="0" />
            <stop offset="45%" stopColor="#F5B800" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#F5B800" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {Array.from({ length: 14 }).map((_, idx) => {
          const offset = idx * 14;
          return (
            <path
              key={idx}
              d={`M ${80 + idx * 10} 340 C ${260 + offset} ${250 - idx * 8}, ${480 - idx * 6} ${120 + idx * 9}, 900 ${40 + offset}`}
              stroke="url(#waveGold)"
              strokeWidth="1.2"
              strokeDasharray="3 6"
            />
          );
        })}
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Dynamic Floating Black Asphalt Roof Shingles Composition (Zero People) */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-6 lg:py-4 order-2 lg:order-1">
            {/* Circular Halftone Backdrop */}
            <div
              aria-hidden="true"
              className="absolute w-[290px] h-[290px] sm:w-[410px] sm:h-[410px] rounded-full dot-matrix-bg opacity-65 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] rounded-full bg-gradient-to-tr from-[#0D2340] via-[#F5B800]/15 to-transparent blur-2xl pointer-events-none"
            />

            {/* Crisp Minimal Geometric Accents (from reference layout) */}
            <svg
              aria-hidden="true"
              className="absolute top-3 left-6 sm:left-10 w-6 h-6 text-[#F5B800]/75 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12,3 21,19 3,19" />
            </svg>
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-10 w-4 h-4 rounded-sm bg-[#F5B800] rotate-45 opacity-80 pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute top-12 right-8 sm:right-12 w-7 h-7 rounded-full border-2 border-[#3B82F6]/60 pointer-events-none"
            />

            {/* Architectural 3-Trade Floating Stack Showcase */}
            <div className="relative w-full max-w-[460px] h-[320px] sm:h-[390px] flex items-center justify-center">
              
              {/* Back-Upper Floating Slab: White Aluminum Window */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [-6, 6, -6], rotate: [-6, -4, -6] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1 left-2 sm:left-4 w-[58%] h-[165px] sm:h-[205px] rounded-2xl overflow-hidden border border-[#F5B800]/45 shadow-[0_25px_50px_rgba(0,0,0,0.75)] bg-[#0A0F18]"
              >
                <img
                  src="/assets/aistudio/___5__156e6afc.jpeg"
                  alt="Ventanas de aluminio blanco de alta eficiencia térmica"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#071426]/65 via-transparent to-[#F5B800]/10" />
              </motion.div>

              {/* Center Primary Slab: Black Asphalt Shingles (Kept Intact) */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [5, -7, 5] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-[80%] h-[195px] sm:h-[235px] rounded-2xl overflow-hidden border-2 border-[#F5B800]/60 shadow-[0_30px_65px_rgba(0,0,0,0.85)] bg-[#080C14]"
              >
                <img
                  src="/images/black-asphalt-shingle-detail.jpg"
                  alt="Detalle de shingles negros de alta resistencia para el calor de Las Vegas"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-95 contrast-125"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/90 via-transparent to-transparent" />

                {/* Clean Technical Footer Inside Focal Shingle Card */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#F5B800] font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>BLACK ARCHITECTURAL SHINGLE</span>
                  </span>
                  <span className="text-[#ECE7DF] font-bold">130 MPH</span>
                </div>
              </motion.div>

              {/* Lower-Right Small Front Floating Slab: Residential HVAC Unit */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [-8, 5, -8], rotate: [7, 10, 7] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-1 right-1 sm:right-2 z-20 w-[44%] h-[120px] sm:h-[145px] rounded-xl overflow-hidden border-2 border-[#F5B800]/55 shadow-[0_20px_40px_rgba(0,0,0,0.85)] bg-[#0A0F18]"
              >
                <img
                  src="/assets/aistudio/56fa90dc5649de8acf480f9a0b8ca669_b809d6f9.jpg"
                  alt="Sistema de aire acondicionado HVAC residencial"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/70 via-transparent to-transparent" />
              </motion.div>

            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Typography Stack (Inspired by Reference) */}
          <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
            
            {/* Unboxed Quiet Kicker */}
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-[#F5B800] uppercase">
              <span>{t.hero.kicker}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#ECE7DF]/70">NV LIC #0091842</span>
            </div>

            {/* Bold Kinetic Two-Tone Headline (White + Italic Solar Gold) */}
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.08] font-display text-balance">
              <span className="block text-[#ECE7DF]">{t.hero.titleLine1}</span>
              <span className="block italic text-gold-metallic mt-1">{t.hero.titleLine2}</span>
            </h1>

            {/* Clean Value Statement */}
            <p className="text-sm sm:text-base text-[#ECE7DF]/80 leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* Primary Rounded CTA + 3 Compact Action Buttons */}
            <div className="pt-2 space-y-4">
              <div>
                <button
                  type="button"
                  onClick={onScrollToForm}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#F5B800] hover:bg-[#FFD54F] active:scale-[0.98] text-[#0D2340] font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-[#F5B800]/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer group min-h-[48px]"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4 text-[#0D2340] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* 3 Compact Direct Contact Triggers: Llamar, Mensaje, WhatsApp */}
              <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3">
                <a
                  href={`tel:${t.brand.rawPhone}`}
                  className="px-3.5 py-2.5 rounded-full bg-[#0D2340]/90 hover:bg-[#0D2340] border border-[#4A4F54]/50 hover:border-[#F5B800]/60 text-[#ECE7DF] hover:text-[#F5B800] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
                  title={t.brand.phone}
                >
                  <Phone className="w-3.5 h-3.5 text-[#F5B800] shrink-0" />
                  <span>{t.hero.callUs}</span>
                </a>

                <a
                  href={`sms:${t.brand.rawPhone}?body=${encodeURIComponent(
                    lang === 'es'
                      ? 'Hola Starlight Solutions, requiero una inspección gratis para mi techo en Las Vegas.'
                      : 'Hello Starlight Solutions, I would like a free roof inspection in Las Vegas.'
                  )}`}
                  className="px-3.5 py-2.5 rounded-full bg-[#0D2340]/90 hover:bg-[#0D2340] border border-[#4A4F54]/50 hover:border-[#F5B800]/60 text-[#ECE7DF] hover:text-[#F5B800] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
                  title="SMS"
                >
                  <Send className="w-3.5 h-3.5 text-[#F5B800] shrink-0" />
                  <span>{t.hero.sms}</span>
                </a>

                <a
                  href={`https://wa.me/${t.brand.whatsappNumber}?text=${encodeURIComponent(
                    lang === 'es'
                      ? 'Hola Starlight Solutions, quiero agendar una inspección gratis para mi techo.'
                      : 'Hello Starlight Solutions, I would like to schedule a free roof inspection.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
                  title="WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{t.hero.whatsapp}</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Clean Quantitative Metrics Strip */}
        <div className="mt-10 lg:mt-14 pt-8 border-t border-[#4A4F54]/25 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {t.hero.metrics.map((metric, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl glass-panel text-center sm:text-left"
            >
              <span className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-[#F5B800] tracking-tight block">
                {metric.value}
              </span>
              <span className="text-xs font-semibold text-[#ECE7DF]/80 mt-1 block">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Continuous Marquee in Solar Gold & Navy */}
      <div className="w-full bg-[#F5B800] text-[#0D2340] py-2.5 sm:py-3 border-y border-[#D49A00] overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center text-[11px] sm:text-xs font-black font-mono tracking-widest uppercase">
          {[...t.marquee, ...t.marquee].map((item, idx) => (
            <span key={idx} className="inline-flex items-center mx-4 sm:mx-6">
              <span>{item}</span>
              <span className="mx-4 sm:mx-6 text-[#0D2340]/50">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
