import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'motion/react';
import {
  Sparkles,
  ChevronDown,
  Star,
  Camera,
  Layers,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { TestimonialsConfig, TestimonialReview, DEFAULT_CMS_DATA } from '../lib/cmsStore';

interface TestimonialsSectionProps {
  onSelectAction?: (url: string) => void;
  config?: TestimonialsConfig;
}

export const getTestimonialThemeClasses = (theme?: string, fallbackIndex = 0) => {
  const t = theme || (fallbackIndex % 3 === 0 ? 'gold' : fallbackIndex % 3 === 1 ? 'purple' : 'emerald');
  switch (t) {
    case 'pink':
      return {
        rimBorder: 'border-[#db2777]/55 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(219,39,119,0.15)]',
        badgeColor: 'text-[#f472b6] border-[#db2777]/40 bg-[#db2777]/15',
        starColor: 'text-[#f472b6]',
        btsHighlight: 'text-[#f472b6]',
        accentHex: '#db2777'
      };
    case 'emerald':
      return {
        rimBorder: 'border-[#a2d865]/45 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(162,216,101,0.15)]',
        badgeColor: 'text-[#a2d865] border-[#a2d865]/40 bg-[#a2d865]/15',
        starColor: 'text-[#a2d865]',
        btsHighlight: 'text-[#a2d865]',
        accentHex: '#a2d865'
      };
    case 'cyan':
      return {
        rimBorder: 'border-[#06b6d4]/55 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)]',
        badgeColor: 'text-[#22d3ee] border-[#06b6d4]/40 bg-[#06b6d4]/15',
        starColor: 'text-[#22d3ee]',
        btsHighlight: 'text-[#22d3ee]',
        accentHex: '#06b6d4'
      };
    case 'purple':
      return {
        rimBorder: 'border-[#a855f7]/55 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(168,85,247,0.15)]',
        badgeColor: 'text-[#c084fc] border-[#a855f7]/40 bg-[#a855f7]/15',
        starColor: 'text-[#c084fc]',
        btsHighlight: 'text-[#c084fc]',
        accentHex: '#a855f7'
      };
    case 'gold':
    default:
      return {
        rimBorder: 'border-amber-400/50 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_35px_rgba(234,179,8,0.2)]',
        badgeColor: 'text-amber-300 border-amber-400/40 bg-amber-400/15',
        starColor: 'text-amber-400',
        btsHighlight: 'text-amber-400',
        accentHex: '#f5e302'
      };
  }
};

export default function TestimonialsSection({ onSelectAction, config }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedBtsId, setExpandedBtsId] = useState<string | null>(null);

  // Interactive mouse spotlight & 3D multi-plane parallax
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const mouseX = useSpring(0, { stiffness: 45, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 45, damping: 25 });

  // 3-Plane Parallax Transforms (Foreground, Midground, Background)
  const fgX = useTransform(mouseX, [-1, 1], [-26, 26]);
  const fgY = useTransform(mouseY, [-1, 1], [-20, 20]);

  const mgX = useTransform(mouseX, [-1, 1], [-14, 14]);
  const mgY = useTransform(mouseY, [-1, 1], [-11, 11]);

  const bgX = useTransform(mouseX, [-1, 1], [-8, 8]);
  const bgY = useTransform(mouseY, [-1, 1], [-6, 6]);

  const lanternTilt = useTransform(mouseX, [-1, 1], [-3.5, 3.5]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
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

  const activeConfig = config || DEFAULT_CMS_DATA.testimonials;
  const reviews: TestimonialReview[] = (activeConfig.items && activeConfig.items.length > 0)
    ? activeConfig.items
    : DEFAULT_CMS_DATA.testimonials.items;

  const toggleBts = (id: string) => {
    setExpandedBtsId(prev => (prev === id ? null : id));
  };

  return (
    <section
      id="client-stories"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 scroll-mt-36 pt-44 sm:pt-48 lg:pt-52 pb-24 lg:pb-32 bg-[#07020e] overflow-hidden border-t border-white/5 select-none transition-colors duration-700"
    >
      {/* ============================================================ */}
      {/* 1. LAYERED 2.5D VOLUMETRIC ZERO-GRAVITY ACOUSTIC ORBS & STAGE */}
      {/* 100% Faithful to Approved Nano Banana Visual Concept Mockup */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Cinematic Ambient Atmosphere Light Blooms */}
        {/* Lantern warm glow top-left */}
        <div className="absolute top-0 left-[18%] w-[420px] h-[320px] bg-amber-400/18 rounded-full blur-[110px]" />
        {/* Royal Purple glow on the left */}
        <div className="absolute top-1/4 -left-10 w-[550px] h-[550px] bg-[#410682]/35 rounded-full blur-[140px]" />
        {/* Warm amber / crimson glow top-right */}
        <div className="absolute top-0 right-0 w-[550px] h-[500px] bg-[#eab308]/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-[#b00045]/18 rounded-full blur-[130px]" />
        {/* Pistachio lime aura bottom-right */}
        <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] bg-[#a2d865]/16 rounded-full blur-[130px]" />

        {/* ------------------------------------------------------------ */}
        {/* LAYER 1: DEEP BACKGROUND (z-[1])                            */}
        {/* ------------------------------------------------------------ */}

        {/* 1. Top Hanging Acoustic Wireframe Lantern */}
        <motion.div
          style={{ x: bgX, y: bgY, rotate: lanternTilt }}
          className="absolute top-0 left-[18%] sm:left-[21%] z-[1]"
        >
          <motion.img
            src="/patterns/official/orbs/lantern_top.png"
            alt="Acoustic Lantern"
            className="w-[100px] sm:w-[125px] md:w-[135px] h-auto drop-shadow-[0_15px_30px_rgba(234,179,8,0.35)]"
            animate={{
              y: [0, -7, 0],
              rotate: [-1.2, 1.2, -1.2],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* 2. Top-Right Small Purple Ribbed Acoustic Sphere */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute top-1 right-[23%] sm:right-[26%] z-[1]"
        >
          <motion.img
            src="/patterns/official/orbs/orb_purple_tr.png"
            alt="Purple Soundwave Sphere"
            className="w-[95px] sm:w-[120px] md:w-[140px] h-auto drop-shadow-[0_10px_25px_rgba(65,6,130,0.5)]"
            animate={{
              y: [0, -9, 0],
            }}
            transition={{
              duration: 6.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* 3. Mid-Right Edge Purple Acoustic Sphere */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute top-[44%] -right-4 sm:right-[0%] z-[1]"
        >
          <motion.img
            src="/patterns/official/orbs/orb_purple_br_mid.png"
            alt="Purple Soundwave Sphere"
            className="w-[75px] sm:w-[95px] md:w-[115px] h-auto drop-shadow-[0_12px_24px_rgba(65,6,130,0.6)]"
            animate={{
              y: [0, -13, 0],
            }}
            transition={{
              duration: 5.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </motion.div>

        {/* ------------------------------------------------------------ */}
        {/* LAYER 2: MIDGROUND (z-[2])                                   */}
        {/* ------------------------------------------------------------ */}

        {/* 4. Top-Right Huge Golden-Amber Ribbed Sphere (Cleaned, no green slices) */}
        <motion.div
          style={{ x: mgX, y: mgY }}
          className="absolute top-0 -right-6 sm:top-1 sm:-right-3 md:-right-2 z-[2]"
        >
          <motion.img
            src="/patterns/official/orbs/orb_gold_tr.png"
            alt="Golden Amber Acoustic Sphere"
            className="w-[170px] sm:w-[210px] md:w-[245px] h-auto drop-shadow-[0_20px_50px_rgba(234,179,8,0.35)]"
            animate={{
              y: [0, -14, 0],
              rotate: [0, -2, 0],
            }}
            transition={{
              duration: 7.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
        </motion.div>

        {/* 5. Mid-Left Large Royal Purple Ribbed Sphere (Partially behind Card 1) */}
        <motion.div
          style={{ x: mgX, y: mgY }}
          className="absolute top-[26%] left-[7%] sm:left-[10%] md:left-[11%] z-[2]"
        >
          <motion.img
            src="/patterns/official/orbs/orb_purple_ml.png"
            alt="Royal Purple Acoustic Resonance Sphere"
            className="w-[140px] sm:w-[170px] md:w-[200px] h-auto drop-shadow-[0_20px_45px_rgba(65,6,130,0.7)]"
            animate={{
              y: [0, -15, 0],
              rotate: [0, -2.5, 0],
            }}
            transition={{
              duration: 7.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* ------------------------------------------------------------ */}
        {/* LAYER 3: CRISP SPHERES & CLUSTERS (z-[3])                    */}
        {/* ------------------------------------------------------------ */}

        {/* 6. Mid-Left Seamless Green Pair Cluster (100% Intact, NO slices!) */}
        <motion.div
          style={{ x: mgX, y: mgY }}
          className="absolute top-[39%] -left-6 sm:-left-3 md:left-[0%] z-[3]"
        >
          <motion.img
            src="/patterns/official/orbs/orb_green_left_cluster.png"
            alt="Lime Soundwave Spheres Cluster"
            className="w-[125px] sm:w-[155px] md:w-[175px] h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
            animate={{
              y: [0, -14, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />
        </motion.div>

        {/* 7. Mid-Right Crisp Green Ribbed Sphere (Partially behind Card 3) */}
        <motion.div
          style={{ x: mgX, y: mgY }}
          className="absolute top-[22%] right-[8%] sm:right-[11%] md:right-[12%] z-[3]"
        >
          <motion.img
            src="/patterns/official/orbs/orb_green_mr.png"
            alt="Crisp Lime Acoustic Sphere"
            className="w-[150px] sm:w-[190px] md:w-[225px] h-auto drop-shadow-[0_20px_45px_rgba(162,216,101,0.25)]"
            animate={{
              y: [0, -16, 0],
              rotate: [0, 2.5, 0],
            }}
            transition={{
              duration: 6.9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          />
        </motion.div>

        {/* ------------------------------------------------------------ */}
        {/* LAYER 4: FOREGROUND VOLUMETRICS (z-[4])                      */}
        {/* ------------------------------------------------------------ */}

        {/* 8. Top-Left Giant Pistachio Green Ribbed Sphere */}
        <motion.div
          style={{ x: fgX, y: fgY }}
          className="absolute top-3 -left-8 sm:top-6 sm:-left-4 md:-left-2 z-[4]"
        >
          <motion.img
            src="/patterns/official/orbs/orb_green_tl.png"
            alt="Pistachio Green Acoustic Sphere"
            className="w-[160px] sm:w-[200px] md:w-[235px] h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
            animate={{
              y: [0, -18, 0],
              rotate: [0, 3.5, 0],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* 9. Bottom-Right Enormous Foreground Pistachio Green Sphere (Complete unoccluded sphere, zero artifacts) */}
        <motion.div
          style={{ x: fgX, y: fgY }}
          className="absolute -bottom-10 -right-10 sm:-bottom-12 sm:-right-8 md:-bottom-14 md:-right-6 z-[4]"
        >
          <motion.img
            src="/patterns/official/orbs/orb_green_mr.png"
            alt="Foreground Acoustic Resonance Sphere"
            className="w-[200px] sm:w-[250px] md:w-[280px] h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] filter blur-[0.6px]"
            animate={{
              y: [0, -22, 0],
              rotate: [0, 4, 0],
            }}
            transition={{
              duration: 8.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </motion.div>

        {/* Interactive Mouse Spotlight on Acoustic Spheres */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-500 z-[5]"
          style={{
            background: `radial-gradient(circle 480px at ${cursorPos.x}px ${cursorPos.y}px, rgba(162, 216, 101, 0.18) 0%, rgba(234, 179, 8, 0.12) 35%, rgba(65, 6, 130, 0.05) 70%, transparent 100%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Center Specular Glint */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-300 z-[5]"
          style={{
            background: `radial-gradient(circle 220px at ${cursorPos.x}px ${cursorPos.y}px, rgba(255, 240, 180, 0.20) 0%, transparent 75%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>

      {/* ============================================================ */}
      {/* 2. SECTION CONTENT CONTAINER                                  */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* CENTERED EDITORIAL MASTHEAD (Matches Mockup 100%) */}
        <div className="relative flex flex-col items-center justify-center text-center space-y-3.5 mb-14 lg:mb-18 max-w-3xl mx-auto">
          {/* Soft Radial Focus Scrim (Guarantees crystalline typography readability) */}
          <div 
            className="absolute -inset-x-24 -inset-y-12 rounded-full pointer-events-none -z-10"
            style={{
              background: 'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(7, 2, 14, 0.92) 0%, rgba(7, 2, 14, 0.65) 55%, rgba(7, 2, 14, 0) 100%)',
              filter: 'blur(20px)',
            }}
          />

          {/* Brand Seal */}
          <div className="flex flex-col items-center gap-0.5 opacity-90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            <span className="font-serif text-lg sm:text-xl tracking-[0.38em] text-[#f0ebd8] font-normal">MAYAVI</span>
            <span className="text-xs font-mono tracking-[0.25em] text-[#f0ebd8]/80 uppercase">MEDIA CREATIONS</span>
          </div>

          {/* Category Pill with Ambient Pulse */}
          <motion.div 
            whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#140b25]/85 border border-amber-400/35 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-default transition-all"
          >
            <Sparkles size={13} className="text-amber-400 animate-pulse" />
            <span className="font-mono text-xs sm:text-sm text-amber-300 tracking-[0.2em] uppercase font-bold">
              ✦ CLIENT STORIES // ACOUSTIC RESONANCE
            </span>
          </motion.div>

          {/* Modern Geometric Sans Headline (Voices That Resonate / Across Screens) */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium font-sans text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)] max-w-2xl">
            Voices That Resonate
            <br />
            Across Screens
          </h2>

          {/* Subtitle / Quote */}
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-amber-200/90 font-light tracking-wide pt-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-xl">
            &ldquo;Trust is built through cinema that moves audiences.&rdquo;
          </p>
        </div>

        {/* ============================================================ */}
        {/* 3. 3 FROSTED GLASS TESTIMONIAL CARDS (Identical to Image 2)  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12">
          {reviews.map((item, idx) => {
            const isBtsOpen = expandedBtsId === item.id;
            const theme = getTestimonialThemeClasses(item.accentTheme, idx);

            // Card titles matching Image 2
            const cardTitle = idx === 0
              ? 'Enterprise brand film'
              : idx === 1
              ? 'Cinema OTT & 4K color grading'
              : 'Commercial & VFX production';

            // Metrics matching Image 2
            const metricBadge = idx === 0
              ? '+420% Viewership'
              : idx === 1
              ? 'Theatrical Grade Authority'
              : 'Flawless Visuals & Rapid Turnaround';

            // Center card gets highlighted golden rim glow matching mockup
            const isCenterCard = idx === 1;
            const cardBorderClasses = isCenterCard
              ? 'border-amber-400/50 shadow-[0_0_35px_rgba(234,179,8,0.22),0_20px_50px_rgba(0,0,0,0.85)] bg-[#0d071d]/60'
              : 'border-white/10 hover:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.75)] bg-[#0c0618]/50';

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`group relative rounded-2xl sm:rounded-3xl border backdrop-blur-2xl transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between text-left overflow-hidden ${cardBorderClasses}`}
              >
                {/* Top Specular Glint */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-80 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${isCenterCard ? '#f5e302' : theme.accentHex}, transparent)`,
                  }}
                />

                <div>
                  {/* Top Rating Row: 5 Golden Stars ★★★★★ */}
                  <div className="flex items-center space-x-1 pb-4 mb-4 border-b border-white/5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Card Title (Sans Bold White) */}
                  <h3 className="font-sans font-semibold text-lg sm:text-xl text-white tracking-wide mb-3 group-hover:text-amber-100 transition-colors">
                    {cardTitle}
                  </h3>

                  {/* Editorial Quote Body */}
                  <blockquote className="font-sans text-xs sm:text-sm text-white/80 font-light leading-relaxed line-clamp-4 mb-6">
                    {item.quote.replace(/^[“"]|[”"]$/g, '')}
                  </blockquote>

                  {/* Author / Metric Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 mb-4 border-t border-white/5">
                    {/* Author Byline with Initials Avatar */}
                    <div className="flex items-center gap-2.5">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center font-sans font-bold text-[11px] text-white border shrink-0 shadow-md"
                        style={{
                          backgroundColor: `${isCenterCard ? '#f5e302' : theme.accentHex}25`,
                          borderColor: isCenterCard ? '#f5e302' : theme.accentHex,
                        }}
                      >
                        {item.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="space-y-0.5 overflow-hidden">
                        <h4 className="font-sans text-sm text-white font-semibold tracking-wide truncate">
                          {item.author}
                        </h4>
                        <p className="font-mono text-xs text-white/70 tracking-wider uppercase truncate">
                          {item.role.split('//')[0]}
                        </p>
                      </div>
                    </div>

                    {/* Metric Pill Badge */}
                    <span 
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-semibold tracking-wider uppercase border shadow-sm ${
                        isCenterCard 
                          ? 'border-amber-400/40 bg-amber-400/10 text-amber-300' 
                          : idx === 0 
                          ? 'border-[#a2d865]/40 bg-[#a2d865]/10 text-[#a2d865]' 
                          : 'border-amber-300/35 bg-amber-300/10 text-amber-200'
                      }`}
                    >
                      {idx === 0 && <TrendingUp size={11} className="text-[#a2d865]" />}
                      {idx === 2 && <Sparkles size={11} className="text-amber-300" />}
                      {metricBadge}
                    </span>
                  </div>
                </div>

                {/* Bottom Expandable BTS Technicals Drawer */}
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => toggleBts(item.id)}
                    className="w-full py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white/80 font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98 font-semibold"
                  >
                    <span>{item.btsLabel || 'BTS TECHNICALS'}</span>
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-300 ${isBtsOpen ? `rotate-180 ${theme.btsHighlight}` : 'text-white/60'}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isBtsOpen && item.btsNotes && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden mt-3 pt-3 border-t border-white/10 space-y-2 font-sans text-xs text-white/80"
                      >
                        {item.btsNotes.camera && (
                          <div className="space-y-0.5">
                            <p className="font-mono text-xs text-amber-400 tracking-wider uppercase font-semibold flex items-center gap-1.5">
                              <Camera size={12} />
                              <span>Camera &amp; Optics</span>
                            </p>
                            <p className="text-white/90 text-xs font-light">{item.btsNotes.camera}</p>
                          </div>
                        )}

                        {(item.btsNotes.lighting || item.btsNotes.grading) && (
                          <div className="space-y-0.5">
                            <p className="font-mono text-xs text-amber-400 tracking-wider uppercase font-semibold flex items-center gap-1.5">
                              <Layers size={12} />
                              <span>Color &amp; Lighting</span>
                            </p>
                            <p className="text-white/90 text-xs font-light">
                              {item.btsNotes.lighting}{item.btsNotes.lighting && item.btsNotes.grading ? ' // ' : ''}{item.btsNotes.grading}
                            </p>
                          </div>
                        )}

                        {item.btsNotes.directorComment && (
                          <div className="space-y-0.5 pt-1">
                            <p className="font-mono text-xs text-white/60 tracking-wider uppercase font-semibold">
                              Director&apos;s Craft Note
                            </p>
                            <p className="text-white/85 text-xs italic font-serif leading-relaxed">
                              &ldquo;{item.btsNotes.directorComment}&rdquo;
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* 4. INTEGRATED TRUST BAR DOCK (100% Faithful to Image 2)      */}
        {/* ============================================================ */}
        <div className="flex flex-col items-center justify-center space-y-5">
          {/* Continuous Glass Capsule Dock matching Image 2 */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="rounded-full bg-[#0d071c]/80 border border-white/15 backdrop-blur-2xl px-3 py-2 sm:px-4 sm:py-2.5 flex flex-wrap items-center justify-center gap-3 sm:gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-xs font-mono transition-all"
          >
            {/* Solid Pill Button: 'Trust bar' */}
            <div className="px-4 py-1.5 rounded-full bg-[#1b1231] border border-white/10 text-white font-sans text-xs font-semibold shadow-inner">
              Trust bar
            </div>

            {/* Minimalist Studio */}
            <div className="flex items-center gap-2 text-white/85 font-mono text-[11px] tracking-wide">
              <Activity size={13} className="text-[#a2d865]" />
              <span>Minimalist Studio</span>
            </div>

            <span className="hidden sm:inline text-white/20">|</span>

            {/* Verified Badges */}
            <div className="flex items-center gap-2 text-white/85 font-mono text-[11px] tracking-wide">
              <ShieldCheck size={13} className="text-[#a2d865]" />
              <span>Verified Badges</span>
            </div>

            <span className="hidden sm:inline text-white/20">|</span>

            {/* 99.4% Client Satisfaction */}
            <div className="flex items-center gap-2 text-white/85 font-mono text-[11px] tracking-wide pr-2">
              <CheckCircle2 size={13} className="text-[#a2d865]" />
              <span className="font-semibold text-white">99.4% Client Satisfaction</span>
            </div>
          </motion.div>

          {/* Quick Production Inquiry CTA */}
          <button
            type="button"
            onClick={() => {
              const target = activeConfig.ctaTarget || '#contact';
              if (onSelectAction) {
                onSelectAction(target);
              } else {
                const el = document.querySelector(target);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5e302] to-[#c59b27] hover:brightness-110 active:scale-95 text-[#050505] font-mono text-xs sm:text-sm tracking-wider uppercase font-extrabold shadow-[0_4px_20px_rgba(212,175,55,0.35)] transition-all cursor-pointer"
          >
            <span>{activeConfig.ctaText || "START YOUR STORY"}</span>
            <ArrowUpRight size={15} className="text-black" />
          </button>
        </div>

      </div>
    </section>
  );
}
