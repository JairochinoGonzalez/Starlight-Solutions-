import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface ShingleSpec {
  id: string;
  top: string;
  side: 'left' | 'right';
  offsetX: string;
  width: number;
  height: number;
  initialRotate: number;
  targetRotate: number;
  scrollTravelY: number;
  scrollTravelX: number;
  opacity: number;
  blur?: boolean;
  hideOnMobile?: boolean;
}

const SHINGLES: ShingleSpec[] = [
  {
    id: 'shingle-hero-top',
    top: '18vh',
    side: 'left',
    offsetX: '0.6vw',
    width: 82,
    height: 40,
    initialRotate: -18,
    targetRotate: 14,
    scrollTravelY: -140,
    scrollTravelX: 12,
    opacity: 0.45,
    hideOnMobile: true,
  },
  {
    id: 'shingle-hero-right',
    top: '28vh',
    side: 'right',
    offsetX: '0.6vw',
    width: 86,
    height: 42,
    initialRotate: 20,
    targetRotate: -16,
    scrollTravelY: -180,
    scrollTravelX: -14,
    opacity: 0.45,
    hideOnMobile: true,
  },
  {
    id: 'shingle-mid-left',
    top: '52vh',
    side: 'left',
    offsetX: '0.6vw',
    width: 88,
    height: 42,
    initialRotate: 12,
    targetRotate: -20,
    scrollTravelY: -200,
    scrollTravelX: 14,
    opacity: 0.42,
    hideOnMobile: true,
  },
  {
    id: 'shingle-mid-right',
    top: '65vh',
    side: 'right',
    offsetX: '0.8vw',
    width: 78,
    height: 38,
    initialRotate: -22,
    targetRotate: 16,
    scrollTravelY: -190,
    scrollTravelX: -12,
    opacity: 0.38,
    blur: true,
    hideOnMobile: true,
  },
  {
    id: 'shingle-low-left',
    top: '78vh',
    side: 'left',
    offsetX: '0.8vw',
    width: 80,
    height: 40,
    initialRotate: -10,
    targetRotate: 22,
    scrollTravelY: -220,
    scrollTravelX: 12,
    opacity: 0.4,
    hideOnMobile: true,
  },
];

const ShinglePiece: React.FC<{ spec: ShingleSpec }> = ({ spec }) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : spec.scrollTravelY]
  );
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : spec.scrollTravelX]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [spec.initialRotate, shouldReduceMotion ? spec.initialRotate : spec.targetRotate]
  );

  const positionStyle: React.CSSProperties = {
    top: spec.top,
    [spec.side]: spec.offsetX,
    width: `${spec.width}px`,
    height: `${spec.height}px`,
    opacity: spec.opacity,
  };

  return (
    <motion.div
      style={{
        ...positionStyle,
        x,
        y,
        rotate,
      }}
      className="fixed pointer-events-none hidden 2xl:block"
      aria-hidden="true"
    >
      {/* Dimensional Black Asphalt Shingle Slab */}
      <div
        className={`relative w-full h-full rounded-md overflow-hidden border border-[#F5B800]/35 shadow-[0_18px_35px_rgba(0,0,0,0.7)] ${
          spec.blur ? 'blur-[0.6px]' : ''
        }`}
        style={{
          clipPath:
            'polygon(0% 0%, 100% 0%, 100% 100%, 69% 100%, 67% 72%, 64% 72%, 62% 100%, 36% 100%, 34% 72%, 31% 72%, 29% 100%, 0% 100%)',
        }}
      >
        <img
          src="/images/black-asphalt-shingle-detail.jpg"
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover brightness-[0.65] contrast-125"
          loading="lazy"
        />
        {/* Asphalt shingle seal strip & subtle solar gold edge highlight */}
        <div className="absolute inset-x-0 top-[26%] h-[2px] bg-[#F5B800]/30" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/75" />
      </div>
    </motion.div>
  );
};

export const FloatingShingles: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-20" aria-hidden="true">
      {SHINGLES.map((spec) => (
        <ShinglePiece key={spec.id} spec={spec} />
      ))}
    </div>
  );
};
