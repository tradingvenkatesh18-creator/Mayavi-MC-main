import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOpeningExperience } from './OpeningProvider';

export default function Tagline() {
  const { activeStep, tagline } = useOpeningExperience();

  return (
    <div className="h-16 flex flex-col items-center justify-center mt-4 relative">
      <AnimatePresence mode="wait">
        {activeStep >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1"
          >
            <p className="font-serif italic text-white/95 text-lg md:text-xl tracking-[0.14em] font-light leading-snug">
              {tagline}
            </p>
            <p className="font-mono text-[8px] text-white/30 tracking-[0.45em] uppercase leading-none">
              MAYAVI MEDIA CREATIONS
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
