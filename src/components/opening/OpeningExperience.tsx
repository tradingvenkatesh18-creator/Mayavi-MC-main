import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OpeningProvider, useOpeningExperience } from './OpeningProvider';
import OpeningLogo from './OpeningLogo';
import EnergyRing from './EnergyRing';
import LoadingLine from './LoadingLine';
import Particles from './Particles';
import Tagline from './Tagline';

function OpeningContent() {
  const { activeStep, setActiveStep, completeExperience } = useOpeningExperience();
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Stage transition timeline matching exactly the 1.1s cinematic sequence
    const t0 = setTimeout(() => setActiveStep(1), 150);  // 0.15s: Logo reveal
    const t1 = setTimeout(() => setActiveStep(2), 400);  // 0.4s: Golden energy wave ring draws
    const t2 = setTimeout(() => setActiveStep(3), 650);  // 0.65s: Editorial statement fades in
    const t3 = setTimeout(() => setActiveStep(4), 800);  // 0.8s: Golden progress line draws
    const t4 = setTimeout(() => setActiveStep(5), 950);  // 0.95s: Outro fade/dissolve starts
    const t5 = setTimeout(() => completeExperience(), 1100); // 1.1s: Complete opening sequence

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [setActiveStep, completeExperience]);

  // Play a very soft, high-end synthesizer cinematic riser (using Web Audio API for 0B size)
  const playCinematicRiser = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filterNode = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(45, ctx.currentTime); // Low cinematic note
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.9); // Smooth low riser

      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.2); // Fade in
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0); // Smooth fade out

      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(200, ctx.currentTime);
      filterNode.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.9);

      osc.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.1);
    } catch (e) {
      // Audio autoplay restrictions or errors handled gracefully
    }
  };

  // Attempt to play a subtle sound if the user interacts, or default to mute
  useEffect(() => {
    const handleFirstInteraction = () => {
      playCinematicRiser();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return (
    <motion.div
      key="opening-experience-panel"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(24px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Background Film Grain Noise Layer */}
      <div className="absolute inset-0 bg-grain z-0 opacity-20 pointer-events-none" />

      {/* Volumetric ambient glow projection elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {/* Soft background ambient royal purple & imperial violet glow */}
        <motion.div
          animate={{
            scale: [0.95, 1.05, 0.98],
            opacity: [0.12, 0.22, 0.15],
          }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          className="absolute w-[500px] h-[500px] rounded-full filter blur-[120px] mix-blend-screen"
          style={{
            background: "radial-gradient(circle, rgba(109,40,217,0.3) 0%, rgba(46,16,101,0.1) 60%, transparent 100%)"
          }}
        />

        {/* Bottom glowing beam (soft projection light beginning from center bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-gradient-to-t from-[#EAB308]/15 via-[#6D28D9]/5 to-transparent blur-[60px] pointer-events-none rounded-t-full mix-blend-screen"
        />
      </div>

      {/* Central Brand Narrative Frame */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-lg px-6 text-center">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <EnergyRing />
          <Particles />
          <OpeningLogo />
        </div>

        <Tagline />
        <LoadingLine />
      </div>

      {/* Outer Aesthetic HUD Elements */}
      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center font-mono text-[8px] text-white/20 tracking-[0.25em] uppercase">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 bg-[#EAB308] rounded-full animate-pulse" />
          <span>ESTABLISHING LUXURY CONTRAST</span>
        </div>
        <span>SYS.OP // SEC.L_V2</span>
      </div>
    </motion.div>
  );
}

export default function OpeningExperience({ onComplete }: { onComplete: () => void }) {
  return (
    <OpeningProvider onComplete={onComplete}>
      <OpeningContent />
    </OpeningProvider>
  );
}
export { OpeningProvider, useOpeningExperience };
