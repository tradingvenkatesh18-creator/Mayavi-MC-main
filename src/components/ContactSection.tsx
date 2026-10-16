import React, { useState, useRef, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import {
  MapPin,
  Globe,
  Mail,
  Phone,
  Instagram,
  Sparkles,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Play,
  Pause,
  Disc,
  Square
} from 'lucide-react';

interface ContactSectionProps {
  cms: {
    integrations: {
      studioAddress?: string;
      contactPhone?: string;
      contactEmail?: string;
      whatsappNumber?: string;
      socialInstagram?: string;
    };
  };
  setContactOpen: (open: boolean) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ cms, setContactOpen }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Interactive Mouse Coordinates
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeTag, setActiveTag] = useState<string>('Brand Films');

  // Springs for smooth organic ribbon sway
  const mouseX = useSpring(0, { stiffness: 45, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 45, damping: 25 });

  // Transforms for left & right curtains
  const leftRibbonX = useTransform(mouseX, [-1, 1], [-24, 24]);
  const leftRibbonY = useTransform(mouseY, [-1, 1], [-18, 18]);
  const leftRibbonRotate = useTransform(mouseX, [-1, 1], [-3.5, 3.5]);

  const rightRibbonX = useTransform(mouseX, [-1, 1], [24, -24]);
  const rightRibbonY = useTransform(mouseY, [-1, 1], [-18, 18]);
  const rightRibbonRotate = useTransform(mouseX, [-1, 1], [3.5, -3.5]);

  // Transform for subtle pattern depth parallax
  const patternX = useTransform(mouseX, [-1, 1], [15, -15]);
  const patternY = useTransform(mouseY, [-1, 1], [12, -12]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized [-1, 1] coordinates
    const normX = ((x / rect.width) * 2) - 1;
    const normY = ((y / rect.height) * 2) - 1;

    mouseX.set(normX);
    mouseY.set(normY);
    setCursorPos({ x, y });
  }, [mouseX, mouseY]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 pt-28 pb-24 lg:pt-36 lg:pb-32 bg-[#07020e] overflow-hidden border-t border-white/5 select-none transition-colors duration-700"
    >
      {/* -------------------------------------------------------------------------
          1. ATMOSPHERIC AMBIENT GLOWS & PATTERN 7 BACKDROP MESH
          ------------------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div className="absolute -top-24 -left-24 w-[550px] h-[550px] bg-[#410682]/25 rounded-full blur-[140px]" />
        <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-[#b00045]/20 rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-[#a2d865]/10 rounded-full blur-[130px]" />

        {/* Brand Pattern 7: Multimedia Pin Badges Matrix with Interactive Parallax */}
        <motion.div
          className="absolute -inset-10 opacity-20 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: "url('/patterns/official/pattern-7-matrix.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '650px auto',
            x: patternX,
            y: patternY,
          }}
        />

        {/* Interactive Studio Spotlight Torch (Follows cursor over the pattern) */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle 420px at ${cursorPos.x}px ${cursorPos.y}px, rgba(234, 179, 8, 0.22) 0%, rgba(162, 216, 101, 0.12) 40%, rgba(65, 6, 130, 0.05) 70%, transparent 100%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Secondary Specular Pin Glint on Cursor */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${cursorPos.x}px ${cursorPos.y}px, rgba(255, 235, 170, 0.25) 0%, transparent 75%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>

      {/* -------------------------------------------------------------------------
          2. CINEMATIC FRAMING RIBBONS (WITH DYNAMIC SWAY & SILK BREEZE PHYSICS)
          ------------------------------------------------------------------------- */}

      {/* Top-Left Ribbon Cluster (Pistachio + Purple + Crimson) */}
      <motion.div
        className="absolute -top-16 -left-16 sm:-left-8 w-[380px] sm:w-[540px] lg:w-[680px] h-[480px] sm:h-[620px] pointer-events-none select-none z-0"
        style={{
          x: leftRibbonX,
          y: leftRibbonY,
          rotate: leftRibbonRotate,
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
          opacity: isHovered ? 0.95 : 0.85,
        }}
        transition={{ duration: 0.6 }}
      >
        <svg className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]" viewBox="0 0 680 620" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="optEGreenTL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bced78" />
              <stop offset="45%" stopColor="#a2d865" />
              <stop offset="100%" stopColor="#639430" />
            </linearGradient>
            <linearGradient id="optEPurpleTL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7522c7" />
              <stop offset="50%" stopColor="#410682" />
              <stop offset="100%" stopColor="#1e0240" />
            </linearGradient>
            <linearGradient id="optECrimsonTL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e32d69" />
              <stop offset="50%" stopColor="#b00045" />
              <stop offset="100%" stopColor="#630026" />
            </linearGradient>
            <filter id="ribbonGlowTL" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.6" />
            </filter>
          </defs>
          {/* Green Ribbon - Outer flowing sweep */}
          <path
            d="M-40 40 C 140 70, 310 160, 270 340 C 230 490, 60 550, -30 580"
            stroke="url(#optEGreenTL)"
            strokeWidth="38"
            strokeLinecap="round"
            filter="url(#ribbonGlowTL)"
          />
          {/* Purple Ribbon - Middle undulating sweep */}
          <path
            d="M-30 95 C 150 120, 275 210, 235 385 C 195 520, 75 580, -20 610"
            stroke="url(#optEPurpleTL)"
            strokeWidth="32"
            strokeLinecap="round"
          />
          {/* Crimson Ribbon - Inner silk sweep */}
          <path
            d="M-20 145 C 160 170, 240 260, 200 425 C 160 550, 90 610, -10 635"
            stroke="url(#optECrimsonTL)"
            strokeWidth="26"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Top-Right & Bottom-Right Framing Ribbon Cluster (Crimson + Purple + Pistachio) */}
      <motion.div
        className="absolute -top-12 -right-16 sm:-right-8 w-[380px] sm:w-[540px] lg:w-[700px] h-[550px] sm:h-[750px] pointer-events-none select-none z-0"
        style={{
          x: rightRibbonX,
          y: rightRibbonY,
          rotate: rightRibbonRotate,
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
          opacity: isHovered ? 0.95 : 0.85,
        }}
        transition={{ duration: 0.6 }}
      >
        <svg className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]" viewBox="0 0 700 750" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="optECrimsonTR" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e32d69" />
              <stop offset="50%" stopColor="#b00045" />
              <stop offset="100%" stopColor="#630026" />
            </linearGradient>
            <linearGradient id="optEPurpleTR" x1="100%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7522c7" />
              <stop offset="50%" stopColor="#410682" />
              <stop offset="100%" stopColor="#1e0240" />
            </linearGradient>
            <linearGradient id="optEGreenTR" x1="100%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bced78" />
              <stop offset="50%" stopColor="#a2d865" />
              <stop offset="100%" stopColor="#639430" />
            </linearGradient>
            <filter id="ribbonGlowTR" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#000000" floodOpacity="0.65" />
            </filter>
          </defs>
          {/* Crimson Ribbon - Outer swoop */}
          <path
            d="M720 50 C 510 80, 400 230, 460 420 C 515 580, 620 700, 720 780"
            stroke="url(#optECrimsonTR)"
            strokeWidth="38"
            strokeLinecap="round"
            filter="url(#ribbonGlowTR)"
          />
          {/* Purple Ribbon - Middle undulating swoop */}
          <path
            d="M730 100 C 530 135, 440 275, 495 455 C 545 605, 645 720, 730 795"
            stroke="url(#optEPurpleTR)"
            strokeWidth="32"
            strokeLinecap="round"
          />
          {/* Pistachio Ribbon - Inner silky sweep */}
          <path
            d="M740 150 C 550 190, 480 320, 530 490 C 575 630, 670 740, 740 810"
            stroke="url(#optEGreenTR)"
            strokeWidth="26"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* -------------------------------------------------------------------------
          3. MAIN CONTENT LAYER
          ------------------------------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* SECTION TITLE — CENTERED EDITORIAL HEADER */}
        <div className="relative flex flex-col items-center justify-center text-center space-y-4 mb-14 lg:mb-20 max-w-3xl mx-auto">
          {/* Soft Radial Focus Scrim (Guarantees crystalline text legibility over Pattern 7 pins) */}
          <div 
            className="absolute -inset-x-20 -inset-y-10 rounded-full pointer-events-none -z-10"
            style={{
              background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(7, 2, 14, 0.92) 0%, rgba(7, 2, 14, 0.6) 55%, rgba(7, 2, 14, 0) 100%)',
              filter: 'blur(20px)',
            }}
          />

          {/* Brand Seal */}
          <div className="flex flex-col items-center gap-1 opacity-90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <span className="font-serif text-lg tracking-[0.35em] text-[#f0ebd8] font-normal">MAYAVI</span>
            <span className="text-[8.5px] font-mono tracking-[0.3em] text-[#f0ebd8]/60 uppercase">MEDIA CREATIONS</span>
          </div>

          {/* Category Pill with Interactive Pulse */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#090717]/85 border border-amber-400/35 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-default transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-[9px] text-amber-300 tracking-[0.28em] uppercase font-bold">
              START YOUR STORY
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-light font-serif text-white tracking-wide leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Every Great Story Begins <br className="hidden md:block" /> With A Conversation
          </h2>

          {/* Subquote */}
          <p className="font-serif italic text-xl md:text-2xl text-amber-200/90 font-light tracking-wide pt-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            "The finest stories are written together."
          </p>

          <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mt-2 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
        </div>

        {/* DUAL FROSTED GLASS SLATE ARCHITECTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-8">

          {/* LEFT SLATE: OUR APPROACH & STUDIO LOCATION */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-6 rounded-3xl bg-[#090717]/85 border border-white/10 backdrop-blur-2xl p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col justify-between space-y-8 text-left relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#410682]/15 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#410682]/25 transition-colors duration-500" />

            <div className="relative z-10 space-y-4">
              <span className="font-mono text-[8.5px] text-[#EAB308] tracking-widest uppercase block font-semibold">
                OUR APPROACH:
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light leading-snug">
                Tailored Productions for Ambitious Stories.
              </h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light font-sans">
                Every project is customized to your exact creative vision, target audience, and brand goals. We collaborate closely with founders, creators, and brands to deliver films that truly connect.
              </p>
            </div>

            {/* STUDIO LOCATION CARD */}
            <div className="relative z-10 p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] via-[#120B24]/70 to-white/[0.02] border border-white/10 hover:border-amber-400/40 backdrop-blur-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] group/loc">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-[#EAB308]">
                    <MapPin size={14} />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-amber-300/90 tracking-[0.25em] uppercase">
                    STUDIO LOCATION
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[8px] tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              <div className="space-y-1.5 pl-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h4 className="font-serif text-lg text-white font-light group-hover/loc:text-amber-100 transition-colors">
                    HYDERABAD HQ
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[7.5px] tracking-wider uppercase inline-flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    OPEN FOR COMMISSIONS
                  </span>
                </div>
                <p className="font-sans text-xs text-white/50 font-light">
                  {cms.integrations.studioAddress || 'Yapral, 500094 Hyd Telangana'} • Hyderabad, Telangana, India
                </p>
                <div className="pt-1 flex items-center space-x-2 text-[9px] font-mono text-[#f7e503] tracking-widest uppercase">
                  <Globe size={11} className="text-[#f7e503]" />
                  <span>www.mayavistudios.com</span>
                </div>
              </div>
            </div>

            {/* DIRECT CONNECT HOTLINE */}
            <div className="relative z-10 space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8.5px] font-bold text-white/50 tracking-[0.25em] uppercase">
                  DIRECT CONNECT HOTLINE
                </span>
                <a
                  href={`tel:${(cms.integrations.contactPhone || '+91 9971410306').replace(/\s+/g, '')}`}
                  className="font-mono text-xs text-amber-300 hover:text-amber-100 font-medium tracking-wider transition-colors"
                >
                  {cms.integrations.contactPhone || '+91 9971410306'}
                </a>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {/* Email Link */}
                <a
                  href={`mailto:${cms.integrations.contactEmail || 'mayavistudios25@gmail.com'}`}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 text-xs text-white/80 hover:text-white transition-all group/item hover:scale-[1.03]"
                  title="Send Email"
                >
                  <Mail size={13} className="text-amber-400 shrink-0" />
                  <span className="font-mono text-[10px] hidden sm:inline">Email</span>
                </a>

                {/* WhatsApp Link */}
                <a
                  href={`https://wa.me/${cms.integrations.whatsappNumber || '919971410306'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-400/40 text-xs text-white/80 hover:text-white transition-all group/item hover:scale-[1.03]"
                  title="WhatsApp Direct"
                >
                  <Phone size={13} className="text-[#a2d865] shrink-0" />
                  <span className="font-mono text-[10px] hidden sm:inline">WhatsApp</span>
                </a>

                {/* Instagram Link */}
                <a
                  href={cms.integrations.socialInstagram || 'https://www.instagram.com/mayavi_mediacreations/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 text-xs text-white/80 hover:text-white transition-all group/item hover:scale-[1.03]"
                  title="Instagram"
                >
                  <Instagram size={13} className="text-amber-400 shrink-0" />
                  <span className="font-mono text-[10px] hidden sm:inline">Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SLATE: PRODUCTION BRIEF & INTERACTIVE CONFIGURATOR */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-6 rounded-3xl bg-[#090717]/85 border border-white/10 backdrop-blur-2xl p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col justify-between space-y-8 text-left relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-amber-500/20 transition-colors duration-500" />

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#EAB308]">
                <Sparkles size={12} />
                <span className="font-mono text-[8.5px] font-bold tracking-[0.25em] uppercase">
                  PRODUCTION BRIEF
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-white font-light leading-tight">
                Ready to Bring Your Story to Life?
              </h3>

              <p className="text-white/60 text-xs sm:text-sm font-sans font-light leading-relaxed">
                Launch our 4-step Production Configurator to select your project type, creative style, timeline, and story requirements in under 60 seconds.
              </p>
            </div>

            {/* SERVICE TAGS (INTERACTIVE QUICK SELECTOR CHIPS) */}
            <div className="relative z-10 space-y-2.5">
              <span className="font-mono text-[8px] text-white/40 tracking-widest uppercase block font-semibold">
                SERVICE TAGS (CLICK TO SELECT)
              </span>
              <div className="flex flex-wrap gap-2">
                {['Brand Films', 'VFX / 3D', 'Commercials', 'Music Videos'].map((tag) => {
                  const isSelected = activeTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        setActiveTag(tag);
                        setContactOpen(true);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(234,179,8,0.3)] scale-[1.03]'
                          : 'bg-white/[0.04] hover:bg-amber-400/15 border-white/10 hover:border-amber-400/40 text-white/80 hover:text-amber-200'
                      } border`}
                    >
                      {isSelected && <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping" />}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4-STEP PROGRESS INDICATOR DOTS */}
            <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 shadow-[0_0_10px_rgba(245,227,2,0.6)]" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
              </div>
              <span className="font-mono text-[8.5px] text-white/40 tracking-wider">
                01 Scope • 02 Vision • 03 Timeline • 04 Launch
              </span>
            </div>

            {/* ACTION BUTTONS (RESTRAINED CHAMPAGNE-GOLD GLASS) */}
            <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                id="contact-section-launch-cta"
                onClick={() => setContactOpen(true)}
                className="flex-1 px-8 py-4 rounded-full text-xs font-mono tracking-[0.2em] bg-gradient-to-r from-[#d4af37]/90 via-[#f5e302]/85 to-[#c59b27]/90 hover:from-[#e0be47] hover:to-[#d4af37] text-black font-extrabold transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase flex items-center justify-center space-x-2.5"
              >
                <span>START YOUR PROJECT</span>
                <ArrowUpRight size={14} className="text-black" />
              </button>

              <a
                href={`https://wa.me/${cms.integrations.whatsappNumber || '919971410306'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-full text-xs font-mono tracking-[0.18em] border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-emerald-400/50 text-white/80 hover:text-white transition-all text-center uppercase flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Phone size={13} className="text-[#a2d865]" />
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </motion.div>

        </div>

        {/* INTEGRATED BOTTOM TELEMETRY DOCK */}
        <div className="rounded-2xl bg-[#090717]/80 border border-white/10 backdrop-blur-xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)] grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10 text-left">
          {/* Metric 1 */}
          <div className="flex items-center space-x-3.5 pt-2 md:pt-0 group cursor-default">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 group-hover:border-amber-400/50 transition-all">
              <Clock size={15} />
            </div>
            <div>
              <span className="block text-white/30 font-mono text-[7.5px] uppercase tracking-widest">RESPONSE TIME</span>
              <span className="font-mono text-xs sm:text-sm text-white/90 font-bold tracking-wider group-hover:text-amber-200 transition-colors">&lt; 2 HOURS // RAPID DISPATCH</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex items-center space-x-3.5 pt-3 md:pt-0 md:pl-6 group cursor-default">
            <div className="w-8 h-8 rounded-lg bg-[#a2d865]/10 border border-[#a2d865]/25 flex items-center justify-center text-[#a2d865] shrink-0 group-hover:scale-110 group-hover:border-[#a2d865]/50 transition-all">
              <Globe size={15} />
            </div>
            <div>
              <span className="block text-white/30 font-mono text-[7.5px] uppercase tracking-widest">GLOBAL DISPATCH</span>
              <span className="font-mono text-xs sm:text-sm text-white/90 font-bold tracking-wider group-hover:text-emerald-200 transition-colors">HYD HQ // GLOBAL DIRECT</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex items-center space-x-3.5 pt-3 md:pt-0 md:pl-6 group cursor-default">
            <div className="w-8 h-8 rounded-lg bg-[#b00045]/15 border border-[#b00045]/30 flex items-center justify-center text-[#e32d69] shrink-0 group-hover:scale-110 group-hover:border-[#b00045]/50 transition-all">
              <ShieldCheck size={15} />
            </div>
            <div>
              <span className="block text-white/30 font-mono text-[7.5px] uppercase tracking-widest">CONFIDENTIALITY</span>
              <span className="font-mono text-xs sm:text-sm text-white/90 font-bold tracking-wider group-hover:text-rose-200 transition-colors">100% STRICT NDA GUARANTEED</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
