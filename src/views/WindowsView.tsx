import React from 'react';
import { AppWindow, CheckCircle2, ArrowRight, ShieldCheck, Sun, VolumeX } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface WindowsViewProps {
  lang: Language;
  onOpenForm: () => void;
}

export const WindowsView: React.FC<WindowsViewProps> = ({ lang, onOpenForm }) => {
  const t = translations[lang];

  const windowsGallery = [
    {
      src: '/assets/aistudio/___7__c45078ff.jpeg',
      title: lang === 'es' ? 'Marco Blanco sobre Fachada de Piedra' : 'White Aluminum on Stone Exterior',
      caption:
        lang === 'es'
          ? 'Acabado limpio en aluminio blanco corredizo que moderniza tu fachada mientras detiene la entrada de calor.'
          : 'Clean white sliding aluminum profile modernizing curb appeal while blocking solar heat.',
    },
    {
      src: '/assets/aistudio/___5__156e6afc.jpeg',
      title: lang === 'es' ? 'Vidrio Reflectivo Solar Low-E' : 'Solar Reflective Low-E Glass',
      caption:
        lang === 'es'
          ? 'Rechaza la radiación solar intensa de Nevada sin oscurecer el interior ni perder iluminación natural.'
          : 'Reflects harsh Nevada infrared radiation while keeping natural daylight bright inside.',
    },
    {
      src: '/assets/aistudio/___6__e221bf65.jpeg',
      title: lang === 'es' ? 'Sellado Perimetral Contra Polvo y Ruido' : 'Tight Dust & Acoustic Perimeter Seal',
      caption:
        lang === 'es'
          ? 'Doble hoja hermética que sella corrientes de aire caliente, polvo del desierto y ruido de tráfico.'
          : 'Airtight double sliding sashes stopping hot drafts, desert dust, and outdoor noise.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#071426] text-[#ECE7DF] animate-in fade-in duration-300 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-[#F5B800] uppercase mb-3">
            <AppWindow className="w-4 h-4 text-[#F5B800]" />
            <span>{t.windowsView.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display text-white leading-tight text-balance">
            {t.windowsView.title}
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-[#ECE7DF]/80 leading-relaxed max-w-3xl mx-auto">
            {t.windowsView.subtitle}
          </p>
        </div>

        {/* 3 Real Aluminum Window Photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {windowsGallery.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#0D2340] border border-[#F5B800]/30 overflow-hidden shadow-xl flex flex-col justify-between group"
            >
              <div className="relative h-72 sm:h-80 w-full overflow-hidden border-b border-[#4A4F54]/40 bg-[#071426]">
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#F5B800] font-display mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#ECE7DF]/80 leading-relaxed">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pain-Point Callout & Direct Estimate Action */}
        <div className="rounded-3xl bg-[#0D2340] border border-[#F5B800]/35 p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono font-bold text-[#F5B800] uppercase tracking-wider block">
              {lang === 'es' ? 'Aislamiento Real en Casa' : 'Home Thermal Relief'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ECE7DF] font-display">
              {lang === 'es'
                ? '¿Sientes el Calor Entrar Apenas Te Acercas a tus Ventanas?'
                : 'Feel Radiant Heat Pouring Through Your Windows Every Afternoon?'}
            </h2>
            <p className="text-sm text-[#ECE7DF]/85 leading-relaxed">
              {lang === 'es'
                ? 'Las ventanas antiguas de un solo vidrio desperdician hasta el 30% del aire frío que paga tu familia. Instalamos a la medida en toda la casa con mínimo tiempo de obra.'
                : 'Aging single-pane windows waste up to 30% of your home cooling energy. We custom-measure and install cleanly with minimal disruption.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#ECE7DF]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B800] shrink-0" />
                <span>{lang === 'es' ? 'Ahorro en aire acondicionado' : 'Cuts cooling electricity bills'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B800] shrink-0" />
                <span>{lang === 'es' ? 'Cero polvo del desierto' : 'Blocks desert dust drafts'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B800] shrink-0" />
                <span>{lang === 'es' ? 'Financiamiento disponible' : 'Flexible financing options'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={onOpenForm}
              className="w-full py-4 px-6 rounded-full bg-[#F5B800] hover:bg-[#FFD54F] text-[#0D2340] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#F5B800]/25 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
            >
              <span>{lang === 'es' ? 'Cotizar Ventanas Gratis' : 'Request Window Estimate'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl glass-panel">
            <div className="w-10 h-10 rounded-xl bg-[#F5B800]/15 border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] mb-4">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#ECE7DF] mb-2">{t.windowsView.card1Title}</h3>
            <p className="text-xs sm:text-sm text-[#ECE7DF]/75 leading-relaxed">{t.windowsView.card1Desc}</p>
          </div>

          <div className="p-7 rounded-3xl glass-panel">
            <div className="w-10 h-10 rounded-xl bg-[#F5B800]/15 border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#ECE7DF] mb-2">{t.windowsView.card2Title}</h3>
            <p className="text-xs sm:text-sm text-[#ECE7DF]/75 leading-relaxed">{t.windowsView.card2Desc}</p>
          </div>

          <div className="p-7 rounded-3xl glass-panel">
            <div className="w-10 h-10 rounded-xl bg-[#F5B800]/15 border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] mb-4">
              <VolumeX className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#ECE7DF] mb-2">{t.windowsView.card3Title}</h3>
            <p className="text-xs sm:text-sm text-[#ECE7DF]/75 leading-relaxed">{t.windowsView.card3Desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
