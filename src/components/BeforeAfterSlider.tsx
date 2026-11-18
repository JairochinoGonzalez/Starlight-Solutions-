import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeftRight, AlertTriangle, ShieldCheck, Layers } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface BeforeAfterSliderProps {
  lang: Language;
  onCtaClick?: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ lang, onCtaClick }) => {
  const t = translations[lang];
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // EXACT SAME architectural roof photo used on BOTH sides for 100% 1:1 pixel alignment
  const sameRoofImage = "/src/assets/images/roof_shingle_pristine_1794452425063.jpg";

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const clamped = Math.max(0, Math.min(rect.width, offsetX));
    const percentage = (clamped / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  useEffect(() => {
    const handlePointerUp = () => setIsDragging(false);
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        updatePosition(e.clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, updatePosition]);

  return (
    <section id="comparador" className="relative py-16 sm:py-24 bg-[#071426] border-b border-[#4A4F54]/30 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-[#F5B800] uppercase mb-3">
            <Layers className="w-4 h-4" />
            <span>{t.beforeAfter.kicker}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#ECE7DF] tracking-tight font-display text-balance">
            {t.beforeAfter.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#ECE7DF]/80 leading-relaxed">
            {t.beforeAfter.subtitle}
          </p>

          {/* Interactive Comparison Presets */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <button
              type="button"
              onClick={() => setSliderPosition(18)}
              className={`px-3.5 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer min-h-[40px] ${
                sliderPosition <= 25
                  ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                  : 'bg-[#0D2340]/70 border-[#4A4F54]/50 text-[#ECE7DF]/75 hover:text-white'
              }`}
            >
              {lang === 'es' ? 'Ver Daño Previo' : 'View Prior Damage'}
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(50)}
              className={`px-3.5 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer min-h-[40px] ${
                sliderPosition > 25 && sliderPosition < 75
                  ? 'bg-[#F5B800]/20 border-[#F5B800] text-[#F5B800]'
                  : 'bg-[#0D2340]/70 border-[#4A4F54]/50 text-[#ECE7DF]/75 hover:text-white'
              }`}
            >
              50 / 50
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(82)}
              className={`px-3.5 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer min-h-[40px] ${
                sliderPosition >= 75
                  ? 'bg-[#F5B800] border-[#F5B800] text-[#0D2340]'
                  : 'bg-[#0D2340]/70 border-[#4A4F54]/50 text-[#ECE7DF]/75 hover:text-white'
              }`}
            >
              {lang === 'es' ? 'Ver Techo Nuevo' : 'View New Roof'}
            </button>
          </div>
        </div>

        {/* Same-Image Interactive Comparison Frame */}
        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            role="slider"
            aria-label={t.beforeAfter.title}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setSliderPosition((p) => Math.max(0, p - 5));
              if (e.key === 'ArrowRight') setSliderPosition((p) => Math.min(100, p + 5));
            }}
            className="relative h-[320px] sm:h-[480px] lg:h-[560px] w-full rounded-2xl sm:rounded-3xl overflow-hidden select-none touch-none cursor-ew-resize border border-[#F5B800]/40 shadow-2xl bg-[#0D2340]"
          >
            {/* RIGHT / BASE LAYER: Brand New Pristine Black Architectural Shingles */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={sameRoofImage}
                alt={t.beforeAfter.afterLabel}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/60 via-transparent to-transparent pointer-events-none" />

              {/* AFTER Label */}
              <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex flex-col items-end max-w-[46%]">
                <div className="px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#0D2340]/92 backdrop-blur-md border border-[#F5B800] text-[#F5B800] text-[10px] sm:text-xs font-black shadow-lg flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t.beforeAfter.afterLabel}</span>
                </div>
                <span className="hidden md:block text-[11px] text-[#ECE7DF] mt-1.5 bg-[#0D2340]/85 px-2.5 py-1 rounded-lg border border-[#4A4F54]/40 text-right">
                  {t.beforeAfter.afterDesc}
                </span>
              </div>
            </div>

            {/* LEFT / CLIPPED LAYER: Exact Same Image + Mapped Storm & UV Damage */}
            <div
              className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <img
                src={sameRoofImage}
                alt={t.beforeAfter.beforeLabel}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale-[0.45] sepia-[0.38] contrast-[1.08] brightness-[0.76]"
                loading="eager"
              />

              {/* Stormy Overcast Sky Tint & UV Oxidation Layer */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/55 via-[#3d2e1b]/25 to-black/50 mix-blend-multiply" />

              {/* Mapped Shingle Damage SVG (Missing tabs, exposed wood/felt, hail pitting & fractures along the exact hip roof plane) */}
              <svg
                className="absolute inset-0 w-full h-full opacity-90"
                viewBox="0 0 1000 600"
                preserveAspectRatio="none"
              >
                <defs>
                  <radialGradient id="moisturePatch" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#17120c" stopOpacity="0.88" />
                    <stop offset="65%" stopColor="#2b2116" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Moisture & Granule Erosion Zones */}
                <ellipse cx="330" cy="360" rx="140" ry="70" fill="url(#moisturePatch)" />
                <ellipse cx="470" cy="240" rx="95" ry="50" fill="url(#moisturePatch)" />

                {/* Blown-Off / Missing Shingle Cutouts Exposing Decking/Tar Paper */}
                <polygon points="210,330 265,315 270,342 215,358" fill="#2c1f14" opacity="0.92" />
                <polygon points="215,333 255,322 258,339 218,350" fill="#7c5636" opacity="0.65" />

                <polygon points="390,260 445,245 450,268 395,284" fill="#1b150f" opacity="0.94" />
                <polygon points="340,420 410,400 418,432 348,452" fill="#211911" opacity="0.9" />
                <polygon points="140,450 205,432 212,460 146,478" fill="#18120c" opacity="0.88" />

                {/* Lifted & Fractured Hip Ridge Caps */}
                <path
                  d="M 485 160 L 455 245 M 475 265 L 442 365 M 438 395 L 405 510"
                  stroke="#0d0a07"
                  strokeWidth="6"
                  strokeDasharray="14 8"
                />
                {/* Shingle Crack Lines */}
                <path
                  d="M 275 380 L 315 365 L 330 390 M 180 390 L 230 375 M 415 315 L 445 305"
                  stroke="#0f0b07"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>

              {/* BEFORE Label */}
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 flex flex-col items-start max-w-[46%]">
                <div className="px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-950/92 backdrop-blur-md border border-rose-500/75 text-rose-300 text-[10px] sm:text-xs font-black shadow-lg flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="truncate">{t.beforeAfter.beforeLabel}</span>
                </div>
                <span className="hidden md:block text-[11px] text-[#ECE7DF] mt-1.5 bg-slate-950/85 px-2.5 py-1 rounded-lg border border-[#4A4F54]/40">
                  {t.beforeAfter.beforeDesc}
                </span>
              </div>
            </div>

            {/* Central Vertical Divider Line & Solar Gold Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-[#F5B800] shadow-[0_0_20px_#F5B800] z-30 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FFF0B3] via-[#F5B800] to-[#D49A00] text-[#0D2340] flex items-center justify-center shadow-[0_4px_24px_rgba(245,184,0,0.65)] border-2 border-[#0D2340] transition-transform ${
                  isDragging ? 'scale-110' : ''
                }`}
              >
                <ArrowLeftRight className="w-5 h-5 stroke-[2.75]" />
              </div>
            </div>

            {/* Bottom Callout Bar */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#0D2340]/90 backdrop-blur-md border border-[#F5B800]/25 flex items-center justify-between gap-2 text-[11px] sm:text-xs text-[#ECE7DF]">
              <span className="font-semibold truncate">
                {lang === 'es' ? 'Desliza para comparar el mismo techo' : 'Slide across the exact same roof'}
              </span>
              {onCtaClick && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCtaClick();
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="px-3 py-1.5 rounded-full bg-[#F5B800] hover:bg-[#FFD54F] text-[#0D2340] font-black uppercase text-[10px] sm:text-xs tracking-wider transition-all cursor-pointer shrink-0"
                >
                  {lang === 'es' ? 'Inspeccionar Techo' : 'Inspect Roof'}
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
