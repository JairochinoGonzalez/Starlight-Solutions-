import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Flame,
  Wind,
  Scale,
} from 'lucide-react';
import { Language } from '../types';

interface RoofingInsuranceViewProps {
  lang: Language;
  onOpenForm: () => void;
}

export const RoofingInsuranceView: React.FC<RoofingInsuranceViewProps> = ({
  lang,
  onOpenForm,
}) => {
  const gallery = [
    {
      src: '/assets/aistudio/___3__104dbcd7.jpeg',
      title: lang === 'es' ? 'Preparación Estructural y Tejas GAF HDZ' : 'Structural Decking & GAF HDZ Prep',
      caption:
        lang === 'es'
          ? 'Reemplazamos madera dañada por humedad y preparamos materiales certificados antes de sellar tu techo.'
          : 'We replace moisture-weakened decking and stage certified architectural shingles before sealing.',
      contain: false,
    },
    {
      src: '/assets/aistudio/___4__a6d8cb57.jpeg',
      title: lang === 'es' ? 'Membrana Titanium X30 & Blindaje' : 'Titanium X30 Membrane & Installation',
      caption:
        lang === 'es'
          ? 'Bajo-techo sintético de alta resistencia térmica con instalación precisa de shingles contra ráfagas de 130 mph.'
          : 'High-heat synthetic underlayment paired with precision-nailed shingles built for 130 mph gusts.',
      contain: false,
    },
    {
      src: '/assets/aistudio/cfbe8e94f7bdc64212a180544a3e0390_5dcc10ad.jpg',
      title: lang === 'es' ? 'Todo Tipo de Geometría Residencial' : 'Every Residential Roof Style Covered',
      caption:
        lang === 'es'
          ? 'Trabajamos techos Gable, Hip, Mansard, Flat y diseños arquitectónicos complejos en todo Las Vegas Valley.'
          : 'We service Gable, Hip, Mansard, Flat, and complex custom roof profiles across the Las Vegas Valley.',
      contain: true,
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#071426] text-[#ECE7DF] animate-in fade-in duration-300 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-[#F5B800] uppercase mb-3">
            <ShieldCheck className="w-4 h-4 text-[#F5B800]" />
            <span>{lang === 'es' ? 'Blindaje Estructural & Reclamos' : 'Structural Armor & Claims'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display text-white leading-tight text-balance">
            {lang === 'es'
              ? 'Detén Goteras Hoy y Reclama el Techo que Tu Seguro Debe Cubrir'
              : 'Stop Roof Leaks Today & Claim the Roof Your Insurance Owes'}
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-[#ECE7DF]/80 leading-relaxed max-w-3xl mx-auto">
            {lang === 'es'
              ? 'Una sola teja levantada por el viento deja entrar humedad y calor a tu hogar. Te ayudamos a conseguir un techo nuevo por seguro o con planes accesibles de financiamiento.'
              : 'A single wind-lifted shingle lets moisture and heat into your attic. We help homeowners secure full insurance roof replacements or fast financing.'}
          </p>
        </div>

        {/* 3 Real Project & Roof Architecture Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gallery.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#0D2340] border border-[#F5B800]/30 overflow-hidden shadow-xl flex flex-col justify-between group"
            >
              <div
                className={`relative h-72 sm:h-80 w-full overflow-hidden border-b border-[#4A4F54]/40 ${
                  item.contain ? 'bg-[#F8E2C8] p-2' : 'bg-[#071426]'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full ${
                    item.contain ? 'object-contain' : 'object-cover group-hover:scale-105 transition-transform duration-500'
                  }`}
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

        {/* 3 Material Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl glass-panel flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#F5B800]/15 border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] mb-4">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-[#ECE7DF] mb-2">
                {lang === 'es' ? 'Shingles Arquitectónicos 130 MPH' : '130 MPH Architectural Shingles'}
              </h3>
              <p className="text-xs sm:text-sm text-[#ECE7DF]/80 leading-relaxed mb-5">
                {lang === 'es'
                  ? 'Tejas dimensionales Owens Corning y GAF Timberline HDZ con banda de clavado reforzada diseñada para resistir vientos fuertes del desierto.'
                  : 'Owens Corning and GAF Timberline HDZ dimensional shingles with reinforced nailing strips built for severe desert wind shear.'}
              </p>
              <div className="space-y-2 text-xs text-[#ECE7DF]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B800]" />
                  <span>{lang === 'es' ? 'Garantía de fábrica de 50 años' : '50-year manufacturer warranty'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B800]" />
                  <span>{lang === 'es' ? 'Alta resistencia a impactos y calor' : 'Class 4 impact and UV resistance'}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#4A4F54]/30">
              <span className="text-xs font-mono text-[#F5B800] font-bold">Owens Corning & GAF Certified</span>
            </div>
          </div>

          <div className="p-7 rounded-3xl glass-panel flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#F5B800]/15 border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] mb-4">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-[#ECE7DF] mb-2">
                {lang === 'es' ? 'Membranas TPO de Alto Albedo' : 'High-Albedo Reflective TPO'}
              </h3>
              <p className="text-xs sm:text-sm text-[#ECE7DF]/80 leading-relaxed mb-5">
                {lang === 'es'
                  ? 'Ideal para techos planos o de baja pendiente en Las Vegas. Membrana blanca termosoldada que refleja hasta el 84% de la radiación solar.'
                  : 'Ideal for flat or low-slope roofs in Las Vegas. Heat-welded white membranes reflecting up to 84% of solar heat radiation.'}
              </p>
              <div className="space-y-2 text-xs text-[#ECE7DF]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B800]" />
                  <span>{lang === 'es' ? 'Cero filtraciones por termosoldadura' : 'Zero-leak hot air welded seams'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B800]" />
                  <span>{lang === 'es' ? 'Reduce la temperatura del ático hasta 35°F' : 'Drops attic temperature by up to 35°F'}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#4A4F54]/30">
              <span className="text-xs font-mono text-[#F5B800] font-bold">Firestone & Carlisle Certified</span>
            </div>
          </div>

          <div className="p-7 rounded-3xl glass-panel flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#F5B800]/15 border border-[#F5B800]/30 flex items-center justify-center text-[#F5B800] mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-[#ECE7DF] mb-2">
                {lang === 'es' ? 'Tejas de Concreto y Arcilla' : 'Concrete & Clay Tile'}
              </h3>
              <p className="text-xs sm:text-sm text-[#ECE7DF]/80 leading-relaxed mb-5">
                {lang === 'es'
                  ? 'Reinstalación y reemplazo de bajo-techo (underlayment sintético Eagle / Boral). Cambiamos el impermeabilizante degradado sin alterar la estética.'
                  : 'Underlayment restoration under concrete and clay tiles. Replacing weathered felt with high-temperature synthetic layers.'}
              </p>
              <div className="space-y-2 text-xs text-[#ECE7DF]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B800]" />
                  <span>{lang === 'es' ? 'Bajo-techo clasificado para +250°F' : 'Underlayment rated for +250°F'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B800]" />
                  <span>{lang === 'es' ? 'Protección para residencias en Summerlin' : 'Summerlin & Henderson luxury estates'}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#4A4F54]/30">
              <span className="text-xs font-mono text-[#F5B800] font-bold">Boral Tile Specialists</span>
            </div>
          </div>
        </div>

        {/* Nevada Law and Insurance Rights Box */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0D2340] via-[#09182C] to-[#0D2340] border-2 border-[#F5B800]/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F5B800] uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                <span>{lang === 'es' ? 'Protección Legal en Nevada' : 'Nevada Legal Homeowner Shield'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ECE7DF] font-display">
                {lang === 'es'
                  ? '¿Por qué tu aseguradora no puede penalizarte por un reclamo legítimo?'
                  : 'Why your insurer cannot single you out for a legitimate storm claim?'}
              </h2>
              <p className="text-sm text-[#ECE7DF]/85 leading-relaxed">
                {lang === 'es'
                  ? 'En el Estado de Nevada, los daños provocados por vientos monzónicos y tormentas se clasifican como "Actos de Dios". La ley prohíbe que las aseguradoras cancelen tu póliza o aumenten tus tarifas individualmente por reclamar daños causados por el clima.'
                  : 'In Nevada, storm and wind damages are legally classified as Acts of God. State guidelines protect homeowners from individual policy cancellations or surcharges when filing documented natural storm claims.'}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={onOpenForm}
                className="w-full py-4 px-6 rounded-full bg-[#F5B800] hover:bg-[#FFD54F] text-[#0D2340] font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span>{lang === 'es' ? 'Verificar Cobertura Gratis' : 'Verify Claim Eligibility'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
