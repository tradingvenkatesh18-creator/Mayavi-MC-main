import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CreativeWorld } from '../App';

interface CreativeWorldsSectionProps {
  worlds: any[];
  onOpenWorldDetails: (world: any) => void;
  onOpenAudition?: () => void;
}

export default function CreativeWorldsSection({ worlds, onOpenWorldDetails, onOpenAudition }: CreativeWorldsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentWorldIndex, setCurrentWorldIndex] = useState<number>(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const currentWorldIndexRef = useRef<number>(1);

  // Active World counter state (1 to 6) - only update state when value changes
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let nextIdx = 1;
    if (v < 0.22) nextIdx = 1;
    else if (v < 0.42) nextIdx = 2;
    else if (v < 0.62) nextIdx = 3;
    else if (v < 0.82) nextIdx = 4;
    else if (v < 0.96) nextIdx = 5;
    else nextIdx = 6;

    if (nextIdx !== currentWorldIndexRef.current) {
      currentWorldIndexRef.current = nextIdx;
      setCurrentWorldIndex(nextIdx);
    }
  });

  // Progressive scroll bar indicator width (0% -> 100%)
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Keyframe Motion Transforms for all 6 cards with clean gap spacing offsets
  // Card 0 (Media Production)
  const x0 = useTransform(scrollYProgress, [0, 0.04, 0.20, 1.0], ["0%", "0%", "-108%", "-108%"]);
  const opacity0 = useTransform(scrollYProgress, [0, 0.04, 0.18, 0.22], [1, 1, 0.6, 0]);

  // Card 1 (Personal Branding)
  const x1 = useTransform(scrollYProgress, [0, 0.04, 0.20, 0.24, 0.40, 1.0], ["108%", "108%", "0%", "0%", "-108%", "-108%"]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.04, 0.18, 0.22, 0.38, 0.42], [0, 0, 1, 1, 0.6, 0]);

  // Card 2 (Talent Development)
  const x2 = useTransform(scrollYProgress, [0, 0.24, 0.40, 0.44, 0.60, 1.0], ["108%", "108%", "0%", "0%", "-108%", "-108%"]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.24, 0.38, 0.42, 0.58, 0.62], [0, 0, 1, 1, 0.6, 0]);

  // Card 3 (Events & Experiences)
  const x3 = useTransform(scrollYProgress, [0, 0.44, 0.60, 0.64, 0.80, 1.0], ["108%", "108%", "0%", "0%", "-108%", "-108%"]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.44, 0.58, 0.62, 0.78, 0.82], [0, 0, 1, 1, 0.6, 0]);

  // Card 4 (Social Media Strategy)
  const x4 = useTransform(scrollYProgress, [0, 0.64, 0.80, 0.84, 0.96, 1.0], ["108%", "108%", "0%", "0%", "-108%", "-108%"]);
  const opacity4 = useTransform(scrollYProgress, [0, 0.64, 0.78, 0.82, 0.94, 0.98], [0, 0, 1, 1, 0.6, 0]);

  // Card 5 (UGC & Creator Content)
  const x5 = useTransform(scrollYProgress, [0, 0.84, 0.96, 1.0], ["108%", "108%", "0%", "0%"]);
  const opacity5 = useTransform(scrollYProgress, [0, 0.84, 0.94, 1.0], [0, 0, 1, 1]);

  const cardsTransforms = [
    { x: x0, opacity: opacity0 },
    { x: x1, opacity: opacity1 },
    { x: x2, opacity: opacity2 },
    { x: x3, opacity: opacity3 },
    { x: x4, opacity: opacity4 },
    { x: x5, opacity: opacity5 }
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="relative z-10 h-[520vh] bg-[#0B0914] text-white border-t border-white/5"
    >
      {/* Ambient Pattern Watermarks (pattern-7 & pattern-9) */}
      <div
        className="absolute top-10 right-0 w-[450px] h-[550px] opacity-[0.08] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none animate-pattern-float"
        style={{ backgroundImage: "url('/patterns/pattern-7.svg')" }}
      />
      <div
        className="absolute bottom-10 left-0 w-[400px] h-[500px] opacity-[0.07] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none animate-pattern-wave"
        style={{ backgroundImage: "url('/patterns/pattern-9.svg')" }}
      />

      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 md:py-8 px-3 sm:px-6 md:px-12">
        
        {/* Header Bar inside Sticky Viewport */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-30 pt-2 pb-4">
          <div className="space-y-1 text-left">
            <span className="font-mono text-[9px] tracking-[0.35em] text-[#EAB308] uppercase font-bold flex items-center gap-2">
              <Sparkles size={11} className="text-[#EAB308]" />
              THE SIX PILLARS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light font-serif italic text-white/95 tracking-tight leading-tight">
              The Six Creative Worlds
            </h2>
          </div>

          {/* Active World Indicator Pill */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end font-mono text-[9px] text-white/50 tracking-widest uppercase">
              <span>ACTIVE WORLD</span>
              <span className="text-[#EAB308] font-bold text-xs">0{currentWorldIndex} / 06</span>
            </div>
            
            <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full font-mono text-[10px] text-[#EAB308]">
              <span>0{currentWorldIndex}</span>
              <span className="text-white/30">/</span>
              <span className="text-white/40">06</span>
            </div>
          </div>
        </div>

        {/* Main Center Cards Viewport Stage */}
        <div className="relative flex-1 max-w-7xl w-full mx-auto flex items-center justify-center min-h-0 my-auto">
          
          {/* 1. MEDIA PRODUCTION */}
          <motion.div 
            style={{ x: cardsTransforms[0].x, opacity: cardsTransforms[0].opacity }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto px-3 sm:px-6 md:px-8"
          >
            <div className="relative w-full h-full max-h-[420px] sm:max-h-[470px] md:max-h-[510px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 bg-[#05050f]/60 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] group flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <img 
                  src="/hero_stage_a.png" 
                  alt="Media Production" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.25] contrast-[1.05] scale-[1.02] group-hover:scale-100 transition-transform duration-[1600ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0914] via-transparent to-black/30" />
              </div>

              <div className="relative z-10 max-w-2xl py-8 px-6 sm:px-8 md:py-10 md:px-12 space-y-4 text-left my-auto">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-[10px] text-[#EAB308] font-bold tracking-widest">01</span>
                    <span className="w-6 h-[1px] bg-[#EAB308]/30" />
                    <span className="font-mono text-[8px] text-white/40 tracking-[0.25em] uppercase">CINEMATIC PRODUCTION GATEWAY</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light font-serif text-white leading-tight">
                    Media Production
                  </h3>
                  <p className="text-amber-100/90 font-serif italic text-sm sm:text-base font-light leading-relaxed">
                    "Stories remembered long after the credits roll."
                  </p>
                </div>

                <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed tracking-wide font-light max-w-lg">
                  High-value brand films, commercials, and visual systems crafted with cinema-grade optics.
                </p>

                <div className="pt-2">
                  <button 
                    onClick={() => onOpenWorldDetails(worlds[0])}
                    className="group inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#EAB308]/40 hover:border-[#EAB308] text-[#EAB308] bg-[#EAB308]/5 hover:bg-[#EAB308]/15 text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(234,179,8,0.08)] hover:shadow-[0_4px_25px_rgba(234,179,8,0.2)] cursor-pointer"
                  >
                    <span>Explore Media Production</span>
                    <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-1 duration-300" />
                  </button>
                </div>
              </div>

              <div className="relative z-20 p-5 flex items-center justify-between font-mono text-[7px] text-white/30 tracking-[0.2em] pointer-events-none border-t border-white/5">
                <span>ARRI SENSOR • 8K RAW</span>
                <span>1:2.39 ANAMORPHIC</span>
              </div>
            </div>
          </motion.div>

          {/* 2. PERSONAL BRANDING */}
          <motion.div 
            style={{ x: cardsTransforms[1].x, opacity: cardsTransforms[1].opacity }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto px-3 sm:px-6 md:px-8"
          >
            <div className="relative w-full h-full max-h-[420px] sm:max-h-[470px] md:max-h-[510px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 bg-[#0b050f]/60 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] group flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <img 
                  src="/personal_branding.png?v=2" 
                  alt="Personal Branding" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.85] contrast-[1.1] scale-[1.02] group-hover:scale-100 transition-transform duration-[1600ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0914] via-transparent to-black/30" />
              </div>

              <div className="relative z-10 max-w-2xl py-8 px-6 sm:px-8 md:py-10 md:px-12 space-y-4 text-left my-auto">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-[10px] text-[#EAB308] font-bold tracking-widest">02</span>
                    <span className="w-6 h-[1px] bg-[#EAB308]/30" />
                    <span className="font-mono text-[8px] text-white/40 tracking-[0.25em] uppercase">EXECUTIVE PRESENCE SYSTEM</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light font-serif text-white leading-tight">
                    Personal Branding
                  </h3>
                  <p className="text-amber-100/90 font-serif italic text-sm sm:text-base font-light leading-relaxed">
                    "Identity crafted with intention."
                  </p>
                </div>

                <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed tracking-wide font-light max-w-lg">
                  Executive presence systems, high-impact video profiles, and authority architecture for leaders.
                </p>

                <div className="pt-2">
                  <button 
                    onClick={() => onOpenWorldDetails(worlds[1])}
                    className="group inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#EAB308]/40 hover:border-[#EAB308] text-[#EAB308] bg-[#EAB308]/5 hover:bg-[#EAB308]/15 text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(234,179,8,0.08)] hover:shadow-[0_4px_25px_rgba(234,179,8,0.2)] cursor-pointer"
                  >
                    <span>Explore Personal Branding</span>
                    <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-1 duration-300" />
                  </button>
                </div>
              </div>

              <div className="relative z-20 p-5 flex items-center justify-between font-mono text-[7px] text-white/30 tracking-[0.2em] pointer-events-none border-t border-white/5">
                <span>ZEISS OPTICS • PORTRAIT JOURNAL</span>
                <span>ZEISS SUPREME PL</span>
              </div>
            </div>
          </motion.div>

          {/* 3. TALENT DEVELOPMENT */}
          <motion.div 
            style={{ x: cardsTransforms[2].x, opacity: cardsTransforms[2].opacity }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto px-3 sm:px-6 md:px-8"
          >
            <div className="relative w-full h-full max-h-[420px] sm:max-h-[470px] md:max-h-[510px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 bg-black/40 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] group flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <img 
                  src="/talent_development.png?v=2" 
                  alt="Talent Development" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.85] contrast-[1.05] group-hover:scale-101 transition-transform duration-[1600ms]"
                />
                <div className="absolute inset-0 bg-black/45 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0914] via-transparent to-[#0B0914]/65 pointer-events-none" />
              </div>

              <div className="relative z-10 max-w-2xl text-center space-y-4 px-6 sm:px-8 md:py-10 md:px-12 mx-auto my-auto">
                <div className="flex items-center justify-center space-x-3">
                  <span className="font-mono text-[10px] text-[#EAB308] font-bold tracking-widest">03</span>
                  <span className="w-6 h-[1px] bg-[#EAB308]/30" />
                  <span className="font-mono text-[8px] text-white/40 tracking-[0.25em] uppercase">ACADEMY MASTERCLASS MENTORSHIP</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light font-serif text-white/95 leading-tight">
                    Talent Development
                  </h3>
                  <p className="text-amber-100/90 font-serif italic text-sm sm:text-base md:text-lg font-light leading-relaxed">
                    "Teaching tomorrow's visual storytellers."
                  </p>
                </div>
                
                <p className="text-white/70 font-sans text-xs sm:text-sm md:text-base leading-relaxed tracking-wide font-light max-w-xl mx-auto">
                  Sharing advanced methodologies through camera workshops, spatial sound training, and design masterclasses.
                </p>
                
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button 
                    onClick={() => onOpenWorldDetails(worlds[2])}
                    className="group inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-[#EAB308]/60 text-white/80 hover:text-white bg-white/5 hover:bg-white/10 text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
                  >
                    <span>Explore Talent Development</span>
                    <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-1 duration-300" />
                  </button>

                  {onOpenAudition && (
                    <button
                      onClick={onOpenAudition}
                      className="group inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#EAB308] text-black bg-[#EAB308] hover:bg-[#FACC15] text-[10px] font-mono font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-105 cursor-pointer"
                    >
                      <Sparkles size={12} className="text-black animate-pulse" />
                      <span>Take Screen Test Audition</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="relative z-20 p-5 flex items-center justify-between font-mono text-[7px] text-white/30 tracking-[0.2em] pointer-events-none border-t border-white/5">
                <span>ACTIVE LAB WORKSHOPS</span>
                <span>OPTICS // CALIBRATION 03</span>
              </div>
            </div>
          </motion.div>

          {/* 4. EVENTS & EXPERIENCES */}
          <motion.div 
            style={{ x: cardsTransforms[3].x, opacity: cardsTransforms[3].opacity }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto px-3 sm:px-6 md:px-8"
          >
            <div className="relative w-full h-full max-h-[420px] sm:max-h-[470px] md:max-h-[510px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 bg-[#090518]/60 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] group flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <img 
                  src="/events_experience.png?v=2" 
                  alt="Events & Experiences" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.85] contrast-[1.05] scale-[1.02] group-hover:scale-100 transition-transform duration-[1600ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0914] via-transparent to-black/30" />
              </div>

              <div className="relative z-10 max-w-2xl py-8 px-6 sm:px-8 md:py-10 md:px-12 space-y-4 text-left my-auto">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-[10px] text-[#EAB308] font-bold tracking-widest">04</span>
                    <span className="w-6 h-[1px] bg-[#EAB308]/30" />
                    <span className="font-mono text-[8px] text-white/40 tracking-[0.25em] uppercase">GRAND EXPERIENTIAL SCENOGRAPHY</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light font-serif text-white leading-tight">
                    Events & Experiences
                  </h3>
                  <p className="text-amber-100/90 font-serif italic text-sm sm:text-base font-light leading-relaxed">
                    "Experiences designed to stay with people."
                  </p>
                </div>

                <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed tracking-wide font-light max-w-lg">
                  Full-scale sensory environments, luxury corporate reveals, multi-camera live feeds, and stage projection mapping.
                </p>

                <div className="pt-2">
                  <button 
                    onClick={() => onOpenWorldDetails(worlds[3])}
                    className="group inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#EAB308]/40 hover:border-[#EAB308] text-[#EAB308] bg-[#EAB308]/5 hover:bg-[#EAB308]/15 text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(234,179,8,0.08)] hover:shadow-[0_4px_25px_rgba(234,179,8,0.2)] cursor-pointer"
                  >
                    <span>Explore Events</span>
                    <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-1 duration-300" />
                  </button>
                </div>
              </div>

              <div className="relative z-20 p-5 flex items-center justify-between font-mono text-[7px] text-white/30 tracking-[0.2em] pointer-events-none border-t border-white/5">
                <span>VOLUMETRIC LIGHTING</span>
                <span>PROJECTION MAPPING 4K</span>
              </div>
            </div>
          </motion.div>

          {/* 5. SOCIAL MEDIA STRATEGY */}
          <motion.div 
            style={{ x: cardsTransforms[4].x, opacity: cardsTransforms[4].opacity }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto px-3 sm:px-6 md:px-8"
          >
            <div className="relative w-full h-full max-h-[420px] sm:max-h-[470px] md:max-h-[510px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 bg-[#0b0716]/60 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] group flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <img 
                  src="/social_media_strategy.png?v=2" 
                  alt="Social Media Strategy" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.85] contrast-[1.25] scale-[1.02] group-hover:scale-100 transition-transform duration-[1600ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0914] via-transparent to-black/15" />
              </div>

              <div className="relative z-10 max-w-2xl py-8 px-6 sm:px-8 md:py-10 md:px-12 space-y-4 text-left my-auto">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-[10px] text-[#EAB308] font-bold tracking-widest">05</span>
                    <span className="w-6 h-[1px] bg-[#EAB308]/30" />
                    <span className="font-mono text-[8px] text-white/40 tracking-[0.25em] uppercase">DIGITAL PLATFORM GROWTH</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light font-serif text-white leading-tight">
                    Social Media Strategy
                  </h3>
                  <p className="text-amber-100/90 font-serif italic text-sm sm:text-base font-light leading-relaxed">
                    "Platform-native content built to grow communities."
                  </p>
                </div>

                <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed tracking-wide font-light max-w-lg">
                  Algorithm-driven growth blueprints, high-retention short-form storytelling, and custom brand channel management.
                </p>

                <div className="pt-2">
                  <button 
                    onClick={() => onOpenWorldDetails(worlds[4])}
                    className="group inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#EAB308]/40 hover:border-[#EAB308] text-[#EAB308] bg-[#EAB308]/5 hover:bg-[#EAB308]/15 text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(234,179,8,0.08)] hover:shadow-[0_4px_25px_rgba(234,179,8,0.2)] cursor-pointer"
                  >
                    <span>Explore Strategy</span>
                    <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-1 duration-300" />
                  </button>
                </div>
              </div>

              <div className="relative z-20 p-5 flex items-center justify-between font-mono text-[7px] text-white/30 tracking-[0.2em] pointer-events-none border-t border-white/5">
                <span>ALGORITHM ENGINE</span>
                <span>VERTICAL RETENTION PIPELINE</span>
              </div>
            </div>
          </motion.div>

          {/* 6. UGC & CREATOR CONTENT */}
          <motion.div 
            style={{ x: cardsTransforms[5].x, opacity: cardsTransforms[5].opacity }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto px-3 sm:px-6 md:px-8"
          >
            <div className="relative w-full h-full max-h-[420px] sm:max-h-[470px] md:max-h-[510px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 bg-[#060814]/60 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] group flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <img 
                  src="/ugc_creator_content.jpg?v=2" 
                  alt="UGC & Creator Content" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.8] contrast-[1.25] scale-[1.02] group-hover:scale-100 transition-transform duration-[1600ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/25 via-fuchsia-500/20 to-transparent mix-blend-color-dodge pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0914] via-transparent to-black/15" />
              </div>

              <div className="relative z-10 max-w-2xl py-8 px-6 sm:px-8 md:py-10 md:px-12 space-y-4 text-left my-auto">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-[10px] text-[#EAB308] font-bold tracking-widest">06</span>
                    <span className="w-6 h-[1px] bg-[#EAB308]/30" />
                    <span className="font-mono text-[8px] text-white/40 tracking-[0.25em] uppercase">COMMUNITY INFLUENCE & TRUST</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light font-serif text-white leading-tight">
                    UGC & Creator Content
                  </h3>
                  <p className="text-amber-100/90 font-serif italic text-sm sm:text-base font-light leading-relaxed">
                    "Authentic creator-led storytelling that builds trust."
                  </p>
                </div>

                <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed tracking-wide font-light max-w-lg">
                  Authentic, high-converting video content created by talented regional creators and charismatic presenters.
                </p>

                <div className="pt-2">
                  <button 
                    onClick={() => onOpenWorldDetails(worlds[5])}
                    className="group inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#EAB308]/40 hover:border-[#EAB308] text-[#EAB308] bg-[#EAB308]/5 hover:bg-[#EAB308]/15 text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(234,179,8,0.08)] hover:shadow-[0_4px_25px_rgba(234,179,8,0.2)] cursor-pointer"
                  >
                    <span>Explore UGC Content</span>
                    <ArrowRight size={12} className="transform transition-transform group-hover:translate-x-1 duration-300" />
                  </button>
                </div>
              </div>

              <div className="relative z-20 p-5 flex items-center justify-between font-mono text-[7px] text-white/30 tracking-[0.2em] pointer-events-none border-t border-white/5">
                <span>CREATOR NETWORK</span>
                <span>VERTICAL SCRIPT HOOKS</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Footer Scroller Status Bar */}
        <div className="max-w-7xl mx-auto w-full z-30 pt-4 flex items-center justify-between font-mono text-[8px] text-white/40 tracking-[0.25em] uppercase">
          <span>SCROLL DOWN TO PROGRESS WORLDS</span>
          
          <div className="w-36 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div 
              style={{ width: progressWidth }}
              className="h-full bg-[#EAB308]"
            />
          </div>

          <span>WORLD 0{currentWorldIndex} OF 06</span>
        </div>

      </div>
    </section>
  );
}
