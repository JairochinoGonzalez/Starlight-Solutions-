import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FloatingCTAProps {
  lang: Language;
  onOpenSchedule: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ lang, onOpenSchedule }) => {
  const t = translations[lang];

  return (
    <aside
      aria-label="Acciones directas de contacto"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#071426]/95 backdrop-blur-md border-t border-[#F5B800]/30 py-1.5 sm:py-2 px-3 sm:px-6 shadow-2xl transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Desktop Brand Note */}
        <div className="hidden lg:flex items-center gap-2.5 text-xs">
          <span className="font-mono font-black text-[#F5B800]">STARLIGHT SOLUTIONS</span>
          <span className="text-[#4A4F54]">·</span>
          <span className="text-[#ECE7DF]/80">
            {lang === 'es'
              ? 'Inspecciones gratuitas en Las Vegas, Summerlin y Henderson'
              : 'Free roof inspections in Las Vegas, Summerlin & Henderson'}
          </span>
        </div>

        {/* Compact Actions: Strictly constrained for mobile <15% viewport height */}
        <div className="grid grid-cols-3 lg:flex items-center w-full lg:w-auto gap-1.5 sm:gap-2">
          {/* Direct Call */}
          <a
            href={`tel:${t.brand.rawPhone}`}
            className="h-9 sm:h-10 px-2.5 sm:px-3.5 rounded-full bg-[#0D2340] hover:bg-[#0D2340]/80 border border-[#4A4F54]/50 text-[#ECE7DF] font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
            title={t.brand.phone}
          >
            <Phone className="w-3.5 h-3.5 text-[#F5B800] shrink-0" />
            <span className="sm:hidden">{t.hero.callUs}</span>
            <span className="hidden sm:inline font-mono">{t.brand.phone}</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${t.brand.whatsappNumber}?text=${encodeURIComponent(
              lang === 'es'
                ? 'Hola Starlight Solutions, requiero información para una inspección gratuita.'
                : 'Hello Starlight Solutions, I would like information regarding a free inspection.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 sm:h-10 px-2.5 sm:px-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm whitespace-nowrap"
            title="WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0" />
            <span>WhatsApp</span>
          </a>

          {/* Free Inspection button */}
          <button
            type="button"
            onClick={onOpenSchedule}
            className="h-9 sm:h-10 px-2.5 sm:px-4 rounded-full bg-[#F5B800] hover:bg-[#FFD54F] text-[#0D2340] font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#F5B800]/25 whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 shrink-0 text-[#0D2340]" />
            <span>{lang === 'es' ? 'Cotizar $0' : 'Free Quote'}</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
