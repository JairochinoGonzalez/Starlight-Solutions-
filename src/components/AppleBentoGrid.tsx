import React from 'react';
import {
  ShieldCheck,
  Compass,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { Language, AppView } from '../types';
import { translations } from '../data/translations';

interface AppleBentoGridProps {
  lang: Language;
  onNavigate: (view: AppView) => void;
  onScrollToForm: () => void;
}

export const AppleBentoGrid: React.FC<AppleBentoGridProps> = ({
  lang,
  onNavigate,
  onScrollToForm,
}) => {
  const t = translations[lang];

  const handleOpenView = (view: AppView) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="bento-services"
      className="scroll-mt-20 py-14 sm:py-20 bg-[#071426] relative border-b border-[#4A4F54]/30 z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-[#F5B800] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{t.bento.kicker}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#ECE7DF] tracking-tight font-display text-balance">
            {t.bento.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#ECE7DF]/80">
            {t.bento.subtitle}
          </p>
        </div>

        {/* 3 Trade Pain-Point Cards on Home (1 Photo Each + Concise Need-Focused Copy) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-6 sm:mb-8">
          {t.bento.homePillars.map((pillar) => (
            <div
              key={pillar.key}
              className="rounded-3xl glass-panel glass-panel-hover transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Crisp Real Photo */}
                <div className="relative h-52 sm:h-56 lg:h-60 w-full overflow-hidden border-b border-[#4A4F54]/35">
                  <img
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071426] via-transparent to-transparent opacity-80 pointer-events-none" />
                </div>

                {/* Concise Pain-Point Content */}
                <div className="p-5 lg:p-6">
                  <span className="text-[11px] font-mono font-bold tracking-[0.16em] text-[#F5B800] uppercase block mb-2">
                    {pillar.eyebrow}
                  </span>
                  <h3 className="text-lg lg:text-xl font-extrabold text-[#ECE7DF] mb-2.5 font-display leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#ECE7DF]/80 leading-relaxed">
                    {pillar.painText}
                  </p>
                </div>
              </div>

              <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-2 flex flex-wrap items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={() => handleOpenView(pillar.view)}
                  className="text-xs font-bold text-[#F5B800] hover:text-[#FFD54F] flex items-center gap-1.5 transition-colors cursor-pointer min-h-[40px] whitespace-nowrap"
                >
                  <span>{pillar.ctaLabel}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={onScrollToForm}
                  className="px-4 py-2 rounded-full bg-[#0D2340] hover:bg-[#F5B800] text-[#ECE7DF] hover:text-[#0D2340] border border-[#F5B800]/35 text-xs font-bold transition-all cursor-pointer min-h-[40px] whitespace-nowrap shrink-0"
                >
                  {lang === 'es' ? 'Cotizar' : 'Quote'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lower Bento Strip: Insurance Process + Financing / Engineering */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Card 2: 4-Step Insurance Process - Spans 8 cols */}
          <div className="lg:col-span-8 rounded-3xl p-6 sm:p-8 glass-panel glass-panel-hover transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold tracking-[0.18em] text-[#F5B800] uppercase">
                  {t.bento.card2.badge}
                </span>
                <ShieldCheck className="w-5 h-5 text-[#F5B800]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#ECE7DF] mb-5 font-display">
                {t.bento.card2.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  t.bento.card2.step1,
                  t.bento.card2.step2,
                  t.bento.card2.step3,
                  t.bento.card2.step4,
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#071426]/65 border border-[#4A4F54]/35"
                  >
                    <span className="text-xs font-black font-mono text-[#F5B800] bg-[#0D2340] px-2 py-0.5 rounded border border-[#F5B800]/30 shrink-0">
                      {step.num}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#ECE7DF]">{step.title}</h4>
                      <p className="text-[11px] text-[#ECE7DF]/75 mt-0.5 leading-snug">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#4A4F54]/40 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#ECE7DF]/70">
                {lang === 'es'
                  ? 'Te ayudamos a ganar tu techo nuevo sin estrés ni trámites confusos.'
                  : 'We defend your storm claim end-to-end so nothing gets overlooked.'}
              </span>
              <button
                type="button"
                onClick={onScrollToForm}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#F5B800] hover:bg-[#FFD54F] text-[#0D2340] font-black uppercase text-xs tracking-wider transition-all shadow-md shadow-[#F5B800]/20 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <span>
                  {lang === 'es' ? 'Revisar mi Techo Gratis' : 'Check My Roof Free'}
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 5: Financing & Nevada Engineering - Spans 4 cols */}
          <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0D2340] via-[#09182C] to-[#071426] border border-[#F5B800]/30 hover:border-[#F5B800]/60 transition-all duration-300 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#F5B800]/15 border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] mb-4">
                <Compass className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-mono font-bold tracking-wider text-[#F5B800] uppercase block mb-1">
                {t.bento.card5.badge}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#ECE7DF] mb-2 font-display">
                {t.bento.card5.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#ECE7DF]/80 leading-relaxed mb-4">
                {t.bento.card5.desc}
              </p>
              <div className="p-3 rounded-xl bg-[#071426]/80 border border-[#4A4F54]/30 text-xs text-[#ECE7DF]/90 font-mono">
                <span>NV Lic #0091842 · {t.brand.phone}</span>
              </div>
            </div>

            <div className="pt-5 border-t border-[#4A4F54]/30 mt-5">
              <button
                type="button"
                onClick={() => handleOpenView('about-us')}
                className="text-xs font-bold text-[#F5B800] hover:underline flex items-center gap-1 cursor-pointer min-h-[36px]"
              >
                <span>
                  {lang === 'es' ? 'Conocer Nuestra Empresa' : 'About Starlight Solutions'}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
