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
    top: '15vh',
    side: 'left',
    offsetX: '1.2vw',
    width: 104,
    height: 50,
    initialRotate: -18,
    targetRotate: 16,
    scrollTravelY: -170,
    scrollTravelX: 22,
    opacity: 0.65,
    hideOnMobile: true,
  },
  {
    id: 'shingle-hero-right',
    top: '27vh',
    side: 'right',
    offsetX: '1.2vw',
    width: 110,
    height: 54,
    initialRotate: 22,
    targetRotate: -18,
    scrollTravelY: -220,
    scrollTravelX: -28,
    opacity: 0.62,
  },
  {
    id: 'shingle-mid-left',
    top: '50vh',
    side: 'left',
    offsetX: '1vw',
    width: 116,
    height: 56,
    initialRotate: 12,
    targetRotate: -24,
    scrollTravelY: -260,
    scrollTravelX: 24,
    opacity: 0.58,
  },
  {
    id: 'shingle-mid-right',
    top: '64vh',
    side: 'right',
    offsetX: '1.5vw',
    width: 92,
    height: 44,
    initialRotate: -26,
    targetRotate: 18,
    scrollTravelY: -240,
    scrollTravelX: -22,
    opacity: 0.48,
    blur: true,
    hideOnMobile: true,
  },
  {
    id: 'shingle-low-left',
    top: '79vh',
    side: 'left',
    offsetX: '1.5vw',
    width: 106,
    height: 52,
    initialRotate: -10,
    targetRotate: 26,
    scrollTravelY: -290,
    scrollTravelX: 26,
    opacity: 0.55,
    hideOnMobile: true,
  },
  {
    id: 'shingle-low-right',
    top: '82vh',
    side: 'right',
    offsetX: '1vw',
    width: 96,
    height: 46,
    initialRotate: 16,
    targetRotate: -22,
    scrollTravelY: -270,
    scrollTravelX: -20,
    opacity: 0.54,
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
      className={`fixed pointer-events-none z-20 ${
        spec.hideOnMobile ? 'hidden xl:block' : 'block scale-[0.55] sm:scale-75 lg:scale-100 opacity-50 sm:opacity-100'
      }`}
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
          src="/src/assets/images/roof_shingle_detail_1793999755504.jpg"
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
