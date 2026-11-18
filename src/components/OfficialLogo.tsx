import React from 'react';

interface OfficialLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only';
  showSubtitle?: boolean;
}

export const OfficialLogo: React.FC<OfficialLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  showSubtitle = false,
}) => {
  const iconHeights = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
    xl: 'h-20',
  };

  const textStyles = {
    sm: { title: 'text-base font-black', sub: 'text-[9px] tracking-[0.28em]' },
    md: { title: 'text-xl font-black', sub: 'text-[11px] tracking-[0.32em]' },
    lg: { title: 'text-3xl font-black', sub: 'text-xs tracking-[0.35em]' },
    xl: { title: 'text-5xl font-black', sub: 'text-sm tracking-[0.4em]' },
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Golden Roof & Shooting Star Isotype */}
      <div className={`relative shrink-0 flex items-center justify-center ${iconHeights[size]}`}>
        <img
          src="/assets/aistudio/1_2_61b0546e.png"
          alt="Starlight Solutions Logo Icon"
          className="h-full w-auto object-contain drop-shadow-[0_2px_14px_rgba(245,184,0,0.5)]"
          onError={(e) => {
            // Fallback to inline SVG if image path not available
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {variant === 'full' && (
        <div className="flex flex-col justify-center">
          <span
            className={`text-[#F5B800] leading-none tracking-tight font-brand-black ${textStyles[size].title}`}
            style={{
              textShadow: '0 2px 12px rgba(245, 184, 0, 0.3)',
            }}
          >
            STARLIGHT
          </span>
          <span
            className={`font-bold text-[#ECE7DF] leading-tight uppercase mt-0.5 ${textStyles[size].sub}`}
          >
            SOLUTIONS
          </span>
          {showSubtitle && (
            <span className="text-[9px] font-mono text-[#F5B800]/80 tracking-widest uppercase mt-0.5">
              Roofing LLC · Las Vegas NV
            </span>
          )}
        </div>
      )}
    </div>
  );
};
