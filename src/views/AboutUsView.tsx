import React from 'react';
import { Compass, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { OfficialLogo } from '../components/OfficialLogo';

interface AboutUsViewProps {
  lang: Language;
  onOpenForm: () => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({ lang, onOpenForm }) => {
  const t = translations[lang];

  return (
    <div className="py-16 bg-[#071426] text-[#ECE7DF] animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header - Wide layout in 2 lines, taking full advantage of page width */}
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D2340] border border-[#F5B800]/40 text-[#F5B800] text-xs font-mono font-bold tracking-wider uppercase mb-3 shadow">
            <Compass className="w-4 h-4 text-[#F5B800]" />
            <span>{t.aboutUsView.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display text-white leading-tight max-w-4xl mx-auto">
            {t.aboutUsView.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#ECE7DF]/80 leading-relaxed max-w-3xl mx-auto">
            {t.aboutUsView.subtitle}
          </p>
        </div>

        {/* Brand Showcase */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D2340] border border-[#F5B800]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <OfficialLogo size="lg" variant="full" showSubtitle />
            <p className="text-sm text-[#ECE7DF]/80 mt-3 max-w-md leading-relaxed">
              {t.brand.specialty} · {t.brand.location}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#071426] border border-[#4A4F54]/40 text-xs font-mono space-y-1 text-[#ECE7DF]/90 text-right shrink-0">
            <span className="text-[#F5B800] font-bold block">{t.brand.license}</span>
            <span>Commercial & Residential Monitored</span>
            <span className="text-emerald-400 block">Active Status · Good Standing</span>
          </div>
        </div>

        {/* Narrative */}
        <div className="space-y-5 text-base sm:text-lg text-[#ECE7DF]/85 leading-relaxed bg-[#0D2340]/40 p-8 sm:p-10 rounded-3xl border border-[#4A4F54]/30">
          <p>{t.aboutUsView.p1}</p>
          <p>{t.aboutUsView.p2}</p>
        </div>

        {/* Quality Standards Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel">
            <span className="text-xs font-mono text-[#F5B800] font-bold uppercase block mb-2">01 · Estándar Residencial</span>
            <h4 className="text-base font-bold text-[#ECE7DF] mb-2">Summerlin & Henderson HOA</h4>
            <p className="text-xs text-[#ECE7DF]/70">
              {lang === 'es'
                ? 'Paletas de color y tejas aprobadas por comités arquitectónicos en The Ridges y Summerlin North.'
                : 'Color palettes strictly compliant with The Ridges and Summerlin North architectural committees.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel">
            <span className="text-xs font-mono text-[#F5B800] font-bold uppercase block mb-2">02 · Asistencia con Aseguranza</span>
            <h4 className="text-base font-bold text-[#ECE7DF] mb-2">Defensa Técnica con el Perito</h4>
            <p className="text-xs text-[#ECE7DF]/70">
              {lang === 'es'
                ? 'Subimos al techo con el ajustador para defender la aprobación completa del reemplazo sin sobrecostos.'
                : 'We climb the roof side-by-side with your adjuster to substantiate full storm replacement coverage.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel">
            <span className="text-xs font-mono text-[#F5B800] font-bold uppercase block mb-2">03 · Garantía Total</span>
            <h4 className="text-base font-bold text-[#ECE7DF] mb-2">Garantía Escrita de 50 Años</h4>
            <p className="text-xs text-[#ECE7DF]/70">
              {lang === 'es'
                ? 'Materiales Owens Corning y GAF certificados con garantía de mano de obra por escrito.'
                : 'Owens Corning and GAF certified materials backed by written workmanship warranties.'}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onOpenForm}
            className="px-8 py-4 rounded-xl bg-[#F5B800] hover:bg-[#FFD54F] text-[#0D2340] font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-[#F5B800]/25 cursor-pointer inline-flex items-center gap-2"
          >
            <span>{lang === 'es' ? 'Solicitar Inspección Gratuita' : 'Request Free Inspection'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
