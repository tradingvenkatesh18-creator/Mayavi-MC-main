import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { useOpeningExperience } from './OpeningProvider';

export default function Particles() {
  const { activeStep, reducedMotion } = useOpeningExperience();

  // Create lightweight particle dataset
  const particles = useMemo(() => {
    if (reducedMotion) return [];

    // Determine particle count based on window/device width
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;
    const count = isMobile ? 12 : isTablet ? 20 : 32;

    return Array.from({ length: count }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 85 + 40; // Clustered near the energy ring
      const targetRadius = radius + (Math.random() * 40 + 15);
      
      const startX = Math.cos(angle) * radius;
      const startY = Math.sin(angle) * radius;
      const endX = Math.cos(angle) * targetRadius;
      const endY = Math.sin(angle) * targetRadius;

      return {
        id: i,
        startX,
        startY,
        endX,
        endY,
        size: Math.random() * 2 + 0.8,
        color: Math.random() > 0.45 ? "rgba(234, 179, 8, 0.55)" : "rgba(139, 92, 246, 0.45)",
        delay: Math.random() * 0.12,
        duration: Math.random() * 0.7 + 0.6
      };
    });
  }, [reducedMotion]);

  if (reducedMotion || activeStep < 1) return null;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          animate={activeStep >= 5 ? { opacity: 0 } : {
            opacity: [0, 0.9, 0.6, 0],
            x: [p.startX, p.endX],
            y: [p.startY, p.endY],
            scale: [0.6, 1.2, 0.5]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut"
          }}
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 6px ${p.color}`
          }}
        />
      ))}
    </div>
  );
}
