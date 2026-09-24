import React from 'react';
import { motion } from 'motion/react';

// 1. Golden Line-Drawn Botanical Leaves Background (3-5% Opacity)
export function BotanicalLeaves() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-[0.04]">
      {/* Top Left Leaves */}
      <svg className="absolute -top-12 -left-20 w-[600px] h-[600px] text-amber-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.15">
        <path d="M10,90 Q40,60 80,10" />
        <path d="M80,10 Q65,25 55,45 Q45,65 40,80 Q38,50 50,30 Q62,10 80,10" fill="none" />
        <path d="M10,90 Q20,60 40,40 Q60,20 80,10 Q50,20 35,40 Q20,60 10,90" fill="none" />
        <path d="M40,60 Q60,50 75,30 M30,70 Q50,60 65,40 M20,80 Q40,70 55,50" />
        <path d="M30,50 Q15,40 5,20 M50,40 Q35,30 20,10 M65,30 Q50,20 35,5" />
      </svg>

      {/* Top Right Leaves */}
      <svg className="absolute -top-24 right-10 w-[700px] h-[700px] text-amber-400 rotate-45" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.15">
        <path d="M10,90 Q40,60 85,15" />
        <path d="M85,15 Q70,30 60,50 Q50,70 45,85 Q43,55 55,35 Q67,15 85,15" fill="none" />
        <path d="M50,55 Q70,45 85,25 M40,65 Q60,55 75,35 M30,75 Q50,65 65,45" />
        <path d="M40,45 Q25,35 15,15 M60,35 Q45,25 30,5" />
      </svg>

      {/* Bottom Center Leaves */}
      <svg className="absolute -bottom-40 left-1/3 w-[800px] h-[800px] text-amber-400 -rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.15">
        <path d="M10,90 Q40,60 90,20" />
        <path d="M90,20 Q75,35 65,55 Q55,75 50,90" />
        <path d="M40,60 Q70,50 85,30 M30,70 Q60,60 75,40 M20,80 Q50,70 65,50" />
      </svg>
    </div>
  );
}

// 2. Studio Tripod/Light Stand (Top Left)
export function LightStand() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      whileHover={{ y: -5, rotate: -1, scale: 1.02 }}
      className="absolute top-12 left-4 xl:left-8 w-44 h-80 pointer-events-auto z-10 opacity-30 xl:opacity-60 hidden lg:block"
    >
      <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
        {/* Metal tubes in dark carbon/onyx */}
        <line x1="100" y1="10" x2="100" y2="280" stroke="#1E1E24" strokeWidth="6" strokeLinecap="round" />
        <line x1="100" y1="10" x2="100" y2="280" stroke="#080512" strokeWidth="3" strokeLinecap="round" />
        
        {/* Gold brass locking collar rings */}
        <rect x="94" y="60" width="12" height="8" rx="2" fill="#EAB308" />
        <rect x="94" y="140" width="12" height="8" rx="2" fill="#EAB308" />
        <rect x="94" y="210" width="12" height="10" rx="2" fill="#6D28D9" />

        {/* Adjusting gold T-knob */}
        <path d="M 106,64 H 116 V 61 H 118 V 67 H 116 V 64 Z" fill="#EAB308" />
        <path d="M 106,144 H 116 V 141 H 118 V 147 H 116 V 144 Z" fill="#EAB308" />
        
        {/* Tripod base collar */}
        <path d="M 85,240 L 115,240 L 100,260 Z" fill="#1E1E24" />
        
        {/* Triple spread legs */}
        <line x1="100" y1="245" x2="30" y2="390" stroke="#1E1E24" strokeWidth="5" strokeLinecap="round" />
        <line x1="100" y1="245" x2="170" y2="390" stroke="#1E1E24" strokeWidth="5" strokeLinecap="round" />
        <line x1="100" y1="245" x2="100" y2="390" stroke="#080512" strokeWidth="4" strokeLinecap="round" />
        
        {/* Rubber feet */}
        <circle cx="30" cy="390" r="5" fill="#050505" />
        <circle cx="170" cy="390" r="5" fill="#050505" />
        <circle cx="100" cy="390" r="4" fill="#050505" />

        {/* Fluid head elements top */}
        <rect x="88" y="10" width="24" height="12" rx="3" fill="#1E1E24" />
        <line x1="90" y1="16" x2="50" y2="30" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
        <rect x="46" y="27" width="8" height="6" rx="1" fill="#6D28D9" />
      </svg>
    </motion.div>
  );
}

// 3. Gold/Purple Camera Rig Handle/Monitor Mount (Bottom Left)
export function GoldPurpleRigHandle() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60, y: 60 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
      whileHover={{ y: 5, x: -2, rotate: 1, scale: 1.03 }}
      className="absolute bottom-6 left-2 xl:left-8 w-48 h-48 pointer-events-auto z-10 opacity-30 xl:opacity-75 hidden lg:block"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
        {/* Heavy duty support bracket */}
        <path d="M20,130 C20,100 50,70 100,70 C130,70 150,90 150,110 L140,115 C140,100 125,85 100,85 C60,85 35,110 35,130 Z" fill="#EAB308" />
        
        {/* Purple anodized block weight */}
        <rect x="25" y="115" width="45" height="50" rx="6" fill="#6D28D9" stroke="#EAB308" strokeWidth="1" />
        <rect x="32" y="125" width="31" height="30" rx="3" fill="#2E1065" />
        <line x1="48" y1="125" x2="48" y2="155" stroke="#EAB308" strokeWidth="1" strokeDasharray="2" />
        
        {/* Machinery knurled gold knobs */}
        <circle cx="100" cy="70" r="14" fill="#EAB308" />
        <circle cx="100" cy="70" r="8" fill="#1E1E24" />
        <line x1="100" y1="56" x2="100" y2="84" stroke="#EAB308" strokeWidth="2" />
        <line x1="86" y1="70" x2="114" y2="70" stroke="#EAB308" strokeWidth="2" />

        {/* Mounting tubes */}
        <line x1="10" y1="170" x2="100" y2="170" stroke="#1E1E24" strokeWidth="8" strokeLinecap="round" />
        <line x1="10" y1="170" x2="100" y2="170" stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="160" x2="160" y2="160" stroke="#6D28D9" strokeWidth="6" strokeLinecap="round" />

        {/* Gold lock clamp lever */}
        <path d="M 130,150 Q 150,145 160,130 L 165,133 Q 153,152 130,156 Z" fill="#EAB308" />
      </svg>
    </motion.div>
  );
}

// 4. Gold-Wheeled Camera Dolly (Top Center)
export function CameraDolly() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.8, ease: 'easeOut', delay: 0.1 }}
      whileHover={{ y: -3, scale: 1.02 }}
      className="absolute top-8 left-[38%] w-56 h-32 pointer-events-auto z-10 opacity-20 xl:opacity-55 hidden lg:block"
    >
      <svg viewBox="0 0 300 150" className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
        {/* Heavy double tracks */}
        <line x1="10" y1="110" x2="290" y2="110" stroke="#1E1E24" strokeWidth="4" />
        <line x1="10" y1="118" x2="290" y2="118" stroke="#1E1E24" strokeWidth="4" />
        
        {/* Solid gold aluminum custom skate body */}
        <rect x="70" y="55" width="160" height="40" rx="8" fill="#EAB308" />
        
        {/* Machinery weight reduction circular cutouts */}
        <circle cx="100" cy="75" r="12" fill="#080512" />
        <circle cx="150" cy="75" r="12" fill="#080512" />
        <circle cx="200" cy="75" r="12" fill="#080512" />

        {/* Camera ballhead mounting plate purple */}
        <rect x="130" y="32" width="40" height="23" rx="3" fill="#6D28D9" />
        <ellipse cx="150" cy="32" rx="14" ry="4" fill="#EAB308" />
        
        {/* Skateboard dolly wheels (Double grouped) */}
        {/* Wheel Left */}
        <circle cx="85" cy="108" r="15" fill="#1E1E24" stroke="#EAB308" strokeWidth="2.5" />
        <circle cx="85" cy="108" r="5" fill="#EAB308" />
        {/* Wheel Right */}
        <circle cx="215" cy="108" r="15" fill="#1E1E24" stroke="#EAB308" strokeWidth="2.5" />
        <circle cx="215" cy="108" r="5" fill="#EAB308" />
      </svg>
    </motion.div>
  );
}

// 5. Cinema Lens Group (Top Right)
export function LensGroup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, y: -40 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.7, ease: 'easeOut', delay: 0.3 }}
      whileHover={{ y: -4, rotate: 1, scale: 1.03 }}
      className="absolute top-12 right-[15%] xl:right-[18%] w-52 h-44 pointer-events-auto z-10 opacity-35 xl:opacity-70 hidden lg:block"
    >
      <svg viewBox="0 0 240 200" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
        {/* Core lens body (Anodized purple & golden knurling) */}
        <path d="M30,110 L90,110 L100,140 L100,165 L20,165 L20,140 Z" fill="#2E1065" stroke="#EAB308" strokeWidth="1" />
        <rect x="30" y="115" width="60" height="8" fill="#EAB308" />
        <rect x="40" y="125" width="40" height="5" fill="#6D28D9" />
        <rect x="30" y="145" width="60" height="15" fill="#1E1E24" />
        {/* Laser etched focal length */}
        <text x="45" y="156" fill="#EAB308" fontSize="8" fontFamily="monospace" letterSpacing="1">50mm</text>

        {/* Second premium lens body stand */}
        <path d="M120,60 L210,60 L215,160 L115,160 Z" fill="#1E1E24" stroke="#6D28D9" strokeWidth="2" />
        
        {/* Gold focus/aperture gear ring segments */}
        <rect x="123" y="70" width="84" height="8" fill="#EAB308" />
        <rect x="123" y="115" width="84" height="12" fill="#6D28D9" />
        
        {/* Knurled grip lines */}
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={i} x1={128 + i * 5} y1="70" x2={128 + i * 5} y2="78" stroke="#080512" strokeWidth="1.5" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1={133 + i * 7} y1="115" x2={133 + i * 7} y2="127" stroke="#080512" strokeWidth="2" />
        ))}

        {/* Glossy lens reflection circles */}
        <ellipse cx="165" cy="60" rx="35" ry="6" fill="#6D28D9" opacity="0.8" />
        <ellipse cx="165" cy="60" rx="20" ry="3" fill="#A78BFA" opacity="0.6" />
      </svg>
    </motion.div>
  );
}

// 6. Professional Purple Cinema Camera (Right Center)
export function PurpleCinemaCamera() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.1 }}
      whileHover={{ x: 5, y: -2, scale: 1.02 }}
      className="absolute top-[28%] right-4 xl:right-10 w-56 h-56 pointer-events-auto z-10 opacity-30 xl:opacity-75 hidden lg:block"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)]">
        {/* Camera Main Body Box (ARRI style - Deep Purple / Carbon) */}
        <rect x="30" y="40" width="120" height="110" rx="8" fill="#2E1065" stroke="#6D28D9" strokeWidth="3" />
        
        {/* Heat dissipation vents */}
        <rect x="40" y="55" width="45" height="35" rx="3" fill="#080512" />
        <line x1="45" y1="62" x2="80" y2="62" stroke="#6D28D9" strokeWidth="1.5" />
        <line x1="45" y1="72" x2="80" y2="72" stroke="#6D28D9" strokeWidth="1.5" />
        <line x1="45" y1="82" x2="80" y2="82" stroke="#6D28D9" strokeWidth="1.5" />

        {/* Gold lettering plate */}
        <text x="40" y="115" fill="#EAB308" fontSize="10" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">ALEXA</text>
        <rect x="40" y="122" width="28" height="5" fill="#EAB308" />

        {/* Large lens PL port mount on left */}
        <circle cx="150" cy="95" r="32" fill="#1E1E24" stroke="#EAB308" strokeWidth="3" />
        <circle cx="150" cy="95" r="24" fill="#6D28D9" />
        
        {/* Gold security locking ears */}
        <path d="M 144,60 L 156,60 L 150,70 Z" fill="#EAB308" />
        <path d="M 144,130 L 156,130 L 150,120 Z" fill="#EAB308" />
        <path d="M 115,90 L 115,102 L 125,96 Z" fill="#EAB308" />

        {/* Camera side-panel LCD details */}
        <rect x="95" y="55" width="45" height="50" rx="4" fill="#050505" stroke="#6D28D9" strokeWidth="1" />
        <circle cx="103" cy="65" r="3" fill="#EAB308" />
        <circle cx="113" cy="65" r="3" fill="#6D28D9" />
        <text x="100" y="90" fill="#00FF00" fontSize="7" fontFamily="monospace">TC 24.00</text>
        
        {/* Accessories audio XLR golden plugs */}
        <circle cx="102" cy="125" r="5" fill="#1E1E24" stroke="#EAB308" strokeWidth="1" />
        <circle cx="118" cy="125" r="5" fill="#1E1E24" stroke="#EAB308" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}

// 7. Gold & Purple Cine Lens (Bottom Right)
export function GoldPurpleLens() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, y: 60 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.6, ease: 'easeOut', delay: 0.3 }}
      whileHover={{ y: 3, x: 3, rotate: -2, scale: 1.03 }}
      className="absolute bottom-12 right-2 xl:right-12 w-48 h-48 pointer-events-auto z-10 opacity-30 xl:opacity-85 hidden lg:block"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]">
        {/* Lens Barrel standing vertically-angled */}
        <path d="M50,30 L150,30 L160,170 L40,170 Z" fill="#EAB308" />
        
        {/* Multi-layered custom knurled focus rings */}
        <rect x="47" y="55" width="106" height="15" fill="#2E1065" />
        {Array.from({ length: 22 }).map((_, i) => (
          <line key={i} x1={51 + i * 4.8} y1="55" x2={51 + i * 4.8} y2="70" stroke="#EAB308" strokeWidth="1.5" />
        ))}

        <rect x="43" y="110" width="114" height="20" fill="#1E1E24" />
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={i} x1={48 + i * 6} y1="110" x2={48 + i * 6} y2="130" stroke="#6D28D9" strokeWidth="2.2" />
        ))}

        {/* Golden focal length scale markings */}
        <text x="60" y="98" fill="#FDFBF7" fontSize="9" fontFamily="monospace" fontWeight="bold">T 1.5</text>
        <text x="110" y="98" fill="#6D28D9" fontSize="9" fontFamily="monospace" fontWeight="bold">85mm</text>

        {/* Shiny Lens elements top */}
        <ellipse cx="100" cy="30" rx="50" ry="10" fill="#6D28D9" />
        <ellipse cx="100" cy="30" rx="35" ry="6" fill="#A78BFA" opacity="0.8" />
        <ellipse cx="100" cy="30" rx="15" ry="3" fill="#FFF" opacity="0.6" />
      </svg>
    </motion.div>
  );
}

// 8. Winding BNC Cables & Connectors (Bottom Left Center)
export function BncCables() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, delay: 0.4 }}
      className="absolute bottom-0 left-[20%] xl:left-[24%] w-60 h-28 pointer-events-none z-10 opacity-30 xl:opacity-65 hidden lg:block"
    >
      <svg viewBox="0 0 300 120" className="w-full h-full">
        {/* Flowing purple cable paths */}
        <path d="M10,110 Q80,20 180,90 T290,50" fill="none" stroke="#6D28D9" strokeWidth="4" strokeLinecap="round" />
        <path d="M10,110 Q80,20 180,90 T290,50" fill="none" stroke="#2E1065" strokeWidth="1.5" strokeLinecap="round" />

        {/* Dynamic audio connector on cable tail */}
        <g transform="translate(265, 45) rotate(35)">
          <rect x="0" y="0" width="25" height="10" rx="2" fill="#1E1E24" stroke="#EAB308" strokeWidth="1" />
          <rect x="25" y="2" width="12" height="6" fill="#EAB308" />
          <line x1="33" y1="2" x2="33" y2="8" stroke="#1E1E24" strokeWidth="1" />
        </g>

        {/* Golden BNC connector plug lying down */}
        <g transform="translate(60, 60) rotate(-15)">
          <rect x="0" y="0" width="30" height="12" rx="3" fill="#EAB308" />
          <rect x="30" y="2" width="6" height="8" fill="#1E1E24" />
          <circle cx="6" cy="6" r="3" fill="#2E1065" />
          <path d="M-10,6 L0,6" stroke="#6D28D9" strokeWidth="4" />
        </g>
      </svg>
    </motion.div>
  );
}

// 9. Brass-Finished Lens Filters Case with multi-tinted glasses (Bottom Center)
export function FiltersCase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.6, ease: 'easeOut', delay: 0.5 }}
      whileHover={{ y: -4, scale: 1.04 }}
      className="absolute bottom-4 left-[38%] w-56 h-28 pointer-events-auto z-20 opacity-30 xl:opacity-85 hidden lg:block"
    >
      <svg viewBox="0 0 220 110" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
        {/* Open heavy brass metal container */}
        <rect x="15" y="20" width="190" height="80" rx="8" fill="#080512" stroke="#EAB308" strokeWidth="2.5" />
        
        {/* Metal hinges */}
        <rect x="40" y="16" width="15" height="8" rx="1" fill="#EAB308" />
        <rect x="165" y="16" width="15" height="8" rx="1" fill="#EAB308" />

        {/* Multiple slots containing glass filters with beautiful color tints */}
        {/* Filter 1: Gold ND flare */}
        <rect x="35" y="32" width="22" height="55" rx="3" fill="rgba(234,179,8,0.4)" stroke="#EAB308" strokeWidth="1" />
        
        {/* Filter 2: Purple Mist */}
        <rect x="65" y="32" width="22" height="55" rx="3" fill="rgba(109,40,217,0.4)" stroke="#6D28D9" strokeWidth="1" />

        {/* Filter 3: Cosmic Blue */}
        <rect x="95" y="32" width="22" height="55" rx="3" fill="rgba(59,130,246,0.35)" stroke="#3B82F6" strokeWidth="1" />

        {/* Filter 4: Cine Ruby */}
        <rect x="125" y="32" width="22" height="55" rx="3" fill="rgba(239,68,68,0.35)" stroke="#EF4444" strokeWidth="1" />

        {/* Filter 5: Emerald Polarizer */}
        <rect x="155" y="32" width="22" height="55" rx="3" fill="rgba(16,185,129,0.3)" stroke="#10B981" strokeWidth="1" />

        {/* Laser engrave badge */}
        <text x="68" y="10" fill="#EAB308" fontSize="7" fontFamily="monospace" letterSpacing="0.5">MC OPTICAL SET</text>
      </svg>
    </motion.div>
  );
}

// 10. Heavy Duty Matte Black Clapperboard (Bottom Right Center)
export function ClapperBoard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 40 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.6, ease: 'easeOut', delay: 0.4 }}
      whileHover={{ y: -2, rotate: -2, scale: 1.03 }}
      className="absolute bottom-4 right-[22%] xl:right-[26%] w-52 h-40 pointer-events-auto z-10 opacity-30 xl:opacity-75 hidden lg:block"
    >
      <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.75)]">
        {/* Main clapper slate body (Deep Onyx / Charcoal) */}
        <rect x="20" y="55" width="160" height="95" rx="4" fill="#1E1E24" />
        
        {/* Chalk board grids */}
        <line x1="20" y1="85" x2="180" y2="85" stroke="#FDFBF7" strokeWidth="1" opacity="0.3" />
        <line x1="75" y1="85" x2="75" y2="150" stroke="#FDFBF7" strokeWidth="1" opacity="0.3" />
        <line x1="130" y1="85" x2="130" y2="150" stroke="#FDFBF7" strokeWidth="1" opacity="0.3" />

        {/* Chalk labels */}
        <text x="25" y="75" fill="#FDFBF7" fontSize="6" fontFamily="sans-serif" opacity="0.6">SCENE</text>
        <text x="80" y="75" fill="#FDFBF7" fontSize="6" fontFamily="sans-serif" opacity="0.6">TAKE</text>
        <text x="135" y="75" fill="#FDFBF7" fontSize="6" fontFamily="sans-serif" opacity="0.6">ROLL</text>
        
        {/* Written custom text */}
        <text x="35" y="110" fill="#FFF" fontSize="13" fontFamily="sans-serif" fontWeight="bold">05</text>
        <text x="92" y="110" fill="#FFF" fontSize="13" fontFamily="sans-serif" fontWeight="bold">B</text>
        <text x="142" y="110" fill="#EAB308" fontSize="13" fontFamily="sans-serif" fontWeight="bold">M2</text>

        <text x="25" y="138" fill="#EAB308" fontSize="6" fontFamily="monospace">DIRECTOR: MAYAVI</text>

        {/* Top clapper sticks with stripes */}
        <g transform="translate(0, 10)">
          {/* Base clapper bar */}
          <rect x="20" y="30" width="160" height="14" fill="#050505" />
          <path d="M25,30 L35,44 H45 L35,30 Z" fill="#FDFBF7" />
          <path d="M55,30 L65,44 H75 L65,30 Z" fill="#FDFBF7" />
          <path d="M85,30 L95,44 H105 L95,30 Z" fill="#FDFBF7" />
          <path d="M115,30 L125,44 H135 L125,30 Z" fill="#FDFBF7" />
          <path d="M145,30 L155,44 H165 L155,30 Z" fill="#FDFBF7" />
          
          {/* Angled top arm clapper stick (OPEN STATE) */}
          <g transform="rotate(-18, 20, 30)">
            <rect x="20" y="14" width="160" height="14" fill="#050505" />
            <path d="M25,14 L35,28 H45 L35,14 Z" fill="#FDFBF7" />
            <path d="M55,14 L65,28 H75 L65,14 Z" fill="#FDFBF7" />
            <path d="M85,14 L95,28 H105 L95,14 Z" fill="#FDFBF7" />
            <path d="M115,14 L125,28 H135 L125,14 Z" fill="#FDFBF7" />
            <path d="M145,14 L155,28 H165 L155,14 Z" fill="#FDFBF7" />
          </g>
          
          {/* Gold connecting hinge bracket */}
          <circle cx="25" cy="30" r="4.5" fill="#EAB308" />
        </g>
      </svg>
    </motion.div>
  );
}
