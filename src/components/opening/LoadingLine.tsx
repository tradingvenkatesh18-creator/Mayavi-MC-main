import React from 'react';
import { motion } from 'motion/react';
import { useOpeningExperience } from './OpeningProvider';

export default function LoadingLine() {
  const { activeStep } = useOpeningExperience();

  return (
    <div className="h-4 flex items-center justify-center mt-6">
      <div className="w-32 h-[1px] bg-white/5 relative overflow-hidden rounded-full">
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={activeStep >= 4 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EAB308] to-transparent shadow-[0_0_8px_#EAB308]"
        />
      </div>
    </div>
  );
}
