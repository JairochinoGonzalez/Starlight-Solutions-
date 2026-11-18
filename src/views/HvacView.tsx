import React from 'react';
import { Wind, Zap, ShieldCheck, ArrowRight, CheckCircle2, ThermometerSnowflake } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HvacViewProps {
  lang: Language;
  onOpenForm: () => void;
}

export const HvacView: React.FC<HvacViewProps> = ({ lang, onOpenForm }) => {
  const t = translations[lang];

  const hvacGallery = [
    {
      src: '/assets/aistudio/Licensed_HVAC_Service___Repair___Installation_CALL_NOW____ALL_USA_ONLY_1__855-468-1848_6601d29e.jpeg',
      title: lang === 'es' ? 'Unidades Paquete Lennox en Azotea' : 'Lennox Rooftop Package Systems',
      caption:
        lang === 'es'
          ? 'Instalación de equipos de alta capacidad diseñados para resistir radiación solar directa sobre techos en Las Vegas.'
          : 'High-capacity rooftop units engineered to endure direct desert sun exposure.',
    },
    {
      src: '/assets/aistudio/56fa90dc5649de8acf480f9a0b8ca669_b809d6f9.jpg',
      title: lang === 'es' ? 'Sellado HVAC sobre Techo de Shingles' : 'Sealed HVAC Curbs on Shingle Roofs',
      caption:
        lang === 'es'
          ? 'Integración hermética de ductos y base metálica para evitar goteras alrededor de tu unidad de aire acondicionado.'
          : 'Watertight metal flashing and curb sealing preventing leaks around rooftop HVAC mounts.',
    },
    {
      src: '/assets/aistudio/5f9db408e978ef2f246afb10b42ad2b7_ba2f73e9.jpg',
      title: lang === 'es' ? 'Condensadores Residenciales de Piso' : 'High-Efficiency Ground Condensers',
      caption:
        lang === 'es'
          ? 'Reemplazo rápido de condensadores Carrier y líneas aisladas para bajar tu recibo eléctrico en verano.'
          : 'Fast replacement of residential Carrier condensers and insulated lines to slash summer utility bills.',
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-[#071426] text-[#ECE7DF] animate-in fade-in duration-300 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-[#F5B800] uppercase mb-3">
            <ThermometerSnowflake className="w-4 h-4 text-[#F5B800] shrink-0" />
            <span>{t.hvacView.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display text-white leading-tight text-balance">
            {t.hvacView.title}
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-[#ECE7DF]/80 leading-relaxed max-w-3xl mx-auto">
            {t.hvacView.subtitle}
          </p>
        </div>

        {/* 3 Real HVAC Installation Photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {hvacGallery.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#0D2340] border border-[#F5B800]/30 overflow-hidden shadow-xl flex flex-col justify-between group"
            >
              <div className="relative h-60 sm:h-64 lg:h-72 w-full overflow-hidden border-b border-[#4A4F54]/40 bg-[#071426]">
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              </div>
              <div className="p-5 lg:p-6">
                <h3 className="text-base lg:text-lg font-bold text-[#F5B800] font-display mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#ECE7DF]/80 leading-relaxed">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Pain-Point Diagnostic & Action Box */}
        <div className="rounded-3xl bg-[#0D2340] border border-[#F5B800]/35 p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono font-bold text-[#F5B800] uppercase tracking-wider block">
              {lang === 'es' ? 'Climatización para el Desierto' : 'Desert Climate Protection'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ECE7DF] font-display">
              {lang === 'es'
                ? '¿Tu Aire Saca Aire Tibio o Nunca Descansa en la Tarde?'
                : 'A/C Blowing Warm Air or Running Nonstop All Afternoon?'}
            </h2>
            <p className="text-sm text-[#ECE7DF]/85 leading-relaxed">
              {lang === 'es'
                ? 'Esperar a que colapse el compresor en julio puede costar miles de dólares y días sin enfriamiento. Revisamos tu equipo, limpiamos serpentines y te damos presupuesto claro de reparación o cambio.'
                : 'Waiting for a July compressor failure costs thousands and leaves your family in dangerous heat. We inspect coils, airflow, and electrical health with honest repair or replacement pricing.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#ECE7DF]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B800] shrink-0" />
                <span>{lang === 'es' ? 'Hasta 30% menos luz en verano' : 'Up to 30% lower summer bills'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B800] shrink-0" />
                <span>{lang === 'es' ? 'Servicio rápido el mismo día' : 'Fast same-day diagnostics'}</span>
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
              <span>{lang === 'es' ? 'Cotizar Revisión HVAC' : 'Request HVAC Quote'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl glass-panel">
            <div className="w-10 h-10 rounded-xl bg-[#F5B800]/15 border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#ECE7DF] mb-2">{t.hvacView.card1Title}</h3>
            <p className="text-xs sm:text-sm text-[#ECE7DF]/75 leading-relaxed">{t.hvacView.card1Desc}</p>
          </div>

          <div className="p-7 rounded-3xl glass-panel">
            <div className="w-10 h-10 rounded-xl bg-[#F5B800]/15 border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#ECE7DF] mb-2">{t.hvacView.card2Title}</h3>
            <p className="text-xs sm:text-sm text-[#ECE7DF]/75 leading-relaxed">{t.hvacView.card2Desc}</p>
          </div>

          <div className="p-7 rounded-3xl glass-panel">
            <div className="w-10 h-10 rounded-xl bg-[#F5B800]/15 border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] mb-4">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#ECE7DF] mb-2">{t.hvacView.card3Title}</h3>
            <p className="text-xs sm:text-sm text-[#ECE7DF]/75 leading-relaxed">{t.hvacView.card3Desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
