import React from 'react';
import { motion } from 'motion/react';
import { useOpeningExperience } from './OpeningProvider';

export default function EnergyRing() {
  const { activeStep } = useOpeningExperience();

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <svg width="220" height="220" className="rotate-[-90deg]">
        <motion.circle
          cx="110"
          cy="110"
          r="95"
          fill="transparent"
          stroke="url(#goldenEnergyGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ strokeDasharray: "597", strokeDashoffset: "597" }}
          animate={activeStep >= 2 ? { strokeDashoffset: 0 } : { strokeDashoffset: "597" }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
        />
        <defs>
          <linearGradient id="goldenEnergyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EAB308" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#EAB308" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Subtle luxury outer halo expander with spring */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={activeStep >= 2 ? { scale: 1.06, opacity: [0, 0.22, 0] } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute w-[210px] h-[210px] rounded-full border border-[#EAB308]/20 bg-gradient-to-r from-transparent via-[#EAB308]/5 to-transparent"
      />
    </div>
  );
}
