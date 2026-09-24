import React from 'react';
import { motion } from 'motion/react';
import Logo from '../Logo';
import { useOpeningExperience } from './OpeningProvider';

export default function OpeningLogo() {
  const { activeStep } = useOpeningExperience();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      animate={activeStep >= 1 ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center z-20"
    >
      {/* Cinematic Backlight behind the logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={activeStep >= 1 ? { opacity: [0.12, 0.32, 0.18] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute w-28 h-28 rounded-full blur-2xl z-0"
        style={{
          background: "radial-gradient(circle, rgba(234, 179, 8, 0.4) 0%, rgba(139, 92, 246, 0.1) 60%, transparent 100%)"
        }}
      />
      
      {/* Official Logo Wrapper */}
      <div className="relative z-10 p-2">
        <Logo layout="vertical" iconSize="lg" theme="dark" useOfficial={true} showText={false} />
      </div>
    </motion.div>
  );
}
