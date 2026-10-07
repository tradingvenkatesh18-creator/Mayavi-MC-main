import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Award,
  ChevronDown,
  Star,
  Film,
  Camera,
  Layers,
  Video,
  Clapperboard
} from 'lucide-react';

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  category: string;
  project: string;
  quote: string;
  metrics: string;
  image: string;
  timecode: string;
  audioDuration?: string;
  avatarBg?: string;
  publication: string;
  laurel: string;
  rating: string;
  btsNotes: {
    camera: string;
    lighting: string;
    grading: string;
    directorComment: string;
  };
}

interface TestimonialsSectionProps {
  onSelectAction?: (url: string) => void;
}

export default function TestimonialsSection({ onSelectAction }: TestimonialsSectionProps) {
  const [expandedBtsId, setExpandedBtsId] = useState<string | null>(null);

  const toggleBts = (id: string) => {
    setExpandedBtsId(prev => (prev === id ? null : id));
  };

  const handleCtaClick = () => {
    if (onSelectAction) {
      onSelectAction('#contact');
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // The 3 Flagship Reviews matching the approved design
  const reviews = [
    {
      id: 'granddiva',
      rimBorder: 'border-[#d4af37]/60 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.12)]',
      topBadgeLeft: 'Official Partner • Grand Diva Int.',
      topBadgeRight: '5.0 ★★★★',
      quote: '“Mayavi elevated our national auditions with broadcast-grade optics and unmatched talent direction...”',
      author: 'Rukmini Sharma',
      role: 'Grand Diva International // Festival Chairperson',
      image: '/posters/theatre-modelling-workshop.png',
      btsLabel: 'BTS TECHNICALS',
      btsNotes: {
        camera: 'Sony Venice 2 8K // Zeiss Supreme 35mm T1.5',
        lighting: 'Full Stage Follow-Spot + Volumetric Atmospheric Fog',
        grading: 'Rich Magenta Gold Glamour LUT Emulation',
        directorComment: 'We directed live runway auditions with dual 8K cameras to capture high-motion choreography with zero shutter blur.'
      }
    },
    {
      id: 'pronto',
      rimBorder: 'border-[#db2777]/55 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(219,39,119,0.15)]',
      topBadgeLeft: 'Enterprise Storytelling',
      topBadgeRight: 'Innovation Award',
      isRightPill: true,
      quote: '“Mayavi captured complex medical insights into an emotional, human response from investors...”',
      author: 'Dr. S. K. Rao',
      role: 'Director of Operations // Pronto Diagnostics',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
      hasVideoIcon: true,
      btsLabel: 'Expand BTS',
      btsNotes: {
        camera: 'ARRI Alexa Mini LF + Macro Cinema Optics',
        lighting: 'Clean Clinical Bi-Color Key Panel Diffusion',
        grading: 'Subtle Emerald Precision Technical LUT',
        directorComment: 'We focused macro lenses on microscopic diagnostic chips, treating medical engineering with cinematic grandeur.'
      }
    },
    {
      id: 'tamada',
      rimBorder: 'border-[#10b981]/55 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.15)]',
      topBadgeLeft: 'Official Selection • South India Film Festival',
      topBadgeRight: '',
      quote: '“Mayavi transformed our campaign into a cinematic experience, raising our brand presence to an absolute ...”',
      author: 'Vikranth Varma',
      role: 'Tamada Media // Lead Campaign Director',
      image: '/testimonial_cameras.png',
      btsLabel: 'BTS TECHNICALS',
      btsNotes: {
        camera: 'ARRI Alexa LF with Anamorphic Primes',
        lighting: 'Volumetric Tungsten Key & Cyan Edge Rim',
        grading: 'Kodak 250D Spectral Film LUT Emulation',
        directorComment: 'We lit the stage to evoke classic 70s neo-noir contrast while maintaining modern 9:16 mobile framing density.'
      }
    }
  ];

  return (
    <section
      id="client-stories"
      className="relative z-10 py-24 lg:py-32 bg-[#06020d] overflow-hidden border-t border-white/5 select-none"
    >
      {/* ============================================================ */}
      {/* OFFICIAL CLIENT PATTERN (BRAND GUIDELINES PAGES 25-26)       */}
      {/* Stylized Media Pennants & Pins with Play, Pause, Stop tokens  */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Ambient Color Blooms */}
        <div className="absolute top-10 left-10 w-[550px] h-[550px] bg-[#410682]/30 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#b00045]/22 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-[#0d9488]/16 rounded-full blur-[140px]" />

        {/* ============================================================ */}
        {/* OFFICIAL CLIENT PATTERN: SEAMLESS MEDIA PENNANTS & PINS     */}
        {/* Continuous Flowing Waves with Location Pins & Media Markers */}
        {/* 100% Mathematically Seamless (Zero cuts, Zero gaps)         */}
        {/* ============================================================ */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.32] pointer-events-none select-none mix-blend-screen"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="mayaviMediaSeamless" width="400" height="260" patternUnits="userSpaceOnUse">
              {/* WAVE 1: Cyan/Teal (y around 45) */}
              <path
                d="M 0,45 C 28,62 72,62 100,45 C 128,28 172,28 200,45 C 228,62 272,62 300,45 C 328,28 372,28 400,45 L 400,69 C 372,52 328,52 300,69 C 272,86 228,86 200,69 C 172,52 128,52 100,69 C 72,86 28,86 0,69 Z"
                fill="#38bdf8"
                fillOpacity="0.08"
                stroke="none"
              />
              <path
                d="M 0,45 C 28,62 72,62 100,45 C 128,28 172,28 200,45 C 228,62 272,62 300,45 C 328,28 372,28 400,45"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.3"
                strokeOpacity="0.88"
              />
              <path
                d="M 0,69 C 28,86 72,86 100,69 C 128,52 172,52 200,69 C 228,86 272,86 300,69 C 328,52 372,52 400,69"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.3"
                strokeOpacity="0.88"
              />

              {/* WAVE 2: Gold (y around 125) */}
              <path
                d="M 0,115 C 28,98 72,98 100,115 C 128,132 172,132 200,115 C 228,98 272,98 300,115 C 328,132 372,132 400,115 L 400,139 C 372,156 328,156 300,139 C 272,122 228,122 200,139 C 172,156 128,156 100,139 C 72,122 28,122 0,139 Z"
                fill="#f5e302"
                fillOpacity="0.08"
                stroke="none"
              />
              <path
                d="M 0,115 C 28,98 72,98 100,115 C 128,132 172,132 200,115 C 228,98 272,98 300,115 C 328,132 372,132 400,115"
                fill="none"
                stroke="#f5e302"
                strokeWidth="1.3"
                strokeOpacity="0.88"
              />
              <path
                d="M 0,139 C 28,156 72,156 100,139 C 128,122 172,122 200,139 C 228,156 272,156 300,139 C 328,122 372,122 400,139"
                fill="none"
                stroke="#f5e302"
                strokeWidth="1.3"
                strokeOpacity="0.88"
              />

              {/* WAVE 3: Purple/Magenta (y around 205) */}
              <path
                d="M 0,200 C 28,217 72,217 100,200 C 128,183 172,183 200,200 C 228,217 272,217 300,200 C 328,183 372,183 400,200 L 400,224 C 372,241 328,241 300,224 C 272,207 228,207 200,224 C 172,241 128,241 100,224 C 72,207 28,207 0,224 Z"
                fill="#c084fc"
                fillOpacity="0.08"
                stroke="none"
              />
              <path
                d="M 0,200 C 28,217 72,217 100,200 C 128,183 172,183 200,200 C 228,217 272,217 300,200 C 328,183 372,183 400,200"
                fill="none"
                stroke="#c084fc"
                strokeWidth="1.3"
                strokeOpacity="0.88"
              />
              <path
                d="M 0,224 C 28,241 72,241 100,224 C 128,207 172,207 200,224 C 228,241 272,241 300,224 C 328,207 372,207 400,224"
                fill="none"
                stroke="#c084fc"
                strokeWidth="1.3"
                strokeOpacity="0.88"
              />

              {/* MEDIA PIN 1: PLAY (Cyan) */}
              <g transform="translate(70, 80) scale(0.85)">
                <path d="M 15 0 C 23.28 0 30 6.72 30 15 C 30 25 15 38 15 38 C 15 38 0 25 0 15 C 0 6.72 6.72 0 15 0 Z" fill="#0d1f2d" stroke="#38bdf8" strokeWidth="1.4" />
                <circle cx="15" cy="15" r="9" fill="none" stroke="#38bdf8" strokeWidth="1" />
                <polygon points="13,10 20,15 13,20" fill="#38bdf8" />
              </g>

              {/* MEDIA PIN 2: PAUSE (Gold) */}
              <g transform="translate(270, 60) scale(0.85)">
                <path d="M 15 0 C 23.28 0 30 6.72 30 15 C 30 25 15 38 15 38 C 15 38 0 25 0 15 C 0 6.72 6.72 0 15 0 Z" fill="#241e06" stroke="#f5e302" strokeWidth="1.4" />
                <circle cx="15" cy="15" r="9" fill="none" stroke="#f5e302" strokeWidth="1" />
                <rect x="11.5" y="11" width="2.5" height="8" rx="1" fill="#f5e302" />
                <rect x="16" y="11" width="2.5" height="8" rx="1" fill="#f5e302" />
              </g>

              {/* MEDIA PIN 3: STOP (Magenta) */}
              <g transform="translate(160, 160) scale(0.85)">
                <path d="M 15 0 C 23.28 0 30 6.72 30 15 C 30 25 15 38 15 38 C 15 38 0 25 0 15 C 0 6.72 6.72 0 15 0 Z" fill="#2b0a23" stroke="#e879f9" strokeWidth="1.4" />
                <circle cx="15" cy="15" r="9" fill="none" stroke="#e879f9" strokeWidth="1" />
                <rect x="11.5" y="11.5" width="7" height="7" rx="1" fill="#e879f9" />
              </g>

              {/* MEDIA PIN 4: RECORD (Red/Pink) */}
              <g transform="translate(340, 170) scale(0.85)">
                <path d="M 15 0 C 23.28 0 30 6.72 30 15 C 30 25 15 38 15 38 C 15 38 0 25 0 15 C 0 6.72 6.72 0 15 0 Z" fill="#2b0d14" stroke="#f43f5e" strokeWidth="1.4" />
                <circle cx="15" cy="15" r="6" fill="#f43f5e" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mayaviMediaSeamless)" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/* SECTION CONTENT CONTAINER                                    */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* MASTHEAD HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif text-white tracking-tight leading-tight">
              Curated Press &amp; Client Reviews
            </h2>
            <p className="text-white/60 font-sans text-xs sm:text-sm font-light leading-relaxed max-w-xl">
              An archival gallery of film festival laurels, executive testimonials, and technical behind-the-scenes director notes.
            </p>
          </div>

          {/* Industry Critics Choice Badge (Approved Design) */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#d4af37]/40 bg-[#161009]/80 backdrop-blur-md self-start md:self-auto shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <Award size={13} className="text-[#f5e302]" />
            <span className="font-mono text-[9px] text-[#f5e302] tracking-[0.2em] uppercase font-bold">
              5★ INDUSTRY CRITICS CHOICE 2026
            </span>
          </div>
        </div>

        {/* 3-COLUMN LUXURY ACCREDITATION DOSSIER CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {reviews.map((item) => {
            const isBtsOpen = expandedBtsId === item.id;

            return (
              <div
                key={item.id}
                className={`group relative rounded-3xl bg-[#090717]/85 border backdrop-blur-2xl transition-all duration-300 p-6 flex flex-col justify-between text-left ${item.rimBorder}`}
              >
                <div>
                  {/* Top Laurel & Rating Row */}
                  <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium truncate">
                      <Award size={13} className="text-[#f5e302] shrink-0" />
                      <span className="truncate">{item.topBadgeLeft}</span>
                    </div>

                    {item.topBadgeRight && (
                      item.isRightPill ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 font-mono text-[8px] text-[#f5e302] font-semibold tracking-wider uppercase shrink-0">
                          {item.topBadgeRight}
                        </span>
                      ) : (
                        <span className="font-mono text-xs text-[#f5e302] font-semibold tracking-wider shrink-0">
                          {item.topBadgeRight}
                        </span>
                      )
                    )}
                  </div>

                  {/* Powerful Editorial Quote */}
                  <blockquote className="font-serif text-base lg:text-lg text-white font-normal leading-relaxed line-clamp-3 mb-5">
                    {item.quote}
                  </blockquote>

                  {/* Author Byline */}
                  <div className="mb-5 space-y-0.5">
                    <h4 className="font-sans text-sm text-white font-semibold tracking-wide">
                      {item.author}
                    </h4>
                    <p className="font-mono text-[9px] text-white/60 tracking-wider uppercase">
                      {item.role}
                    </p>
                  </div>

                  {/* Cinematic 16:9 Thumbnail Still */}
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-lg mb-5 group/img">
                    <img
                      src={item.image}
                      alt={item.author}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Optional Video Icon on middle card */}
                    {item.hasVideoIcon && (
                      <div className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15">
                        <Video size={12} className="text-white/80" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom BTS Technicals Drawer Toggle */}
                <div>
                  <button
                    type="button"
                    onClick={() => toggleBts(item.id)}
                    className="w-full py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white/80 font-mono text-[9.5px] tracking-[0.18em] uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
                  >
                    <span>{item.btsLabel}</span>
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-300 ${isBtsOpen ? 'rotate-180 text-[#f5e302]' : 'text-white/60'}`}
                    />
                  </button>

                  {/* Expandable BTS Notes Drawer */}
                  <AnimatePresence>
                    {isBtsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden mt-3 pt-3 border-t border-white/10 space-y-2.5 font-sans text-xs text-white/70"
                      >
                        <div className="space-y-1">
                          <p className="font-mono text-[8.5px] text-[#f5e302] tracking-wider uppercase font-semibold flex items-center gap-1.5">
                            <Camera size={11} />
                            <span>Camera &amp; Optics</span>
                          </p>
                          <p className="text-white/80 text-[11px] font-light">{item.btsNotes.camera}</p>
                        </div>

                        <div className="space-y-1">
                          <p className="font-mono text-[8.5px] text-[#f5e302] tracking-wider uppercase font-semibold flex items-center gap-1.5">
                            <Layers size={11} />
                            <span>Color &amp; Lighting</span>
                          </p>
                          <p className="text-white/80 text-[11px] font-light">{item.btsNotes.lighting} // {item.btsNotes.grading}</p>
                        </div>

                        <div className="space-y-1 pt-1">
                          <p className="font-mono text-[8px] text-white/40 tracking-wider uppercase font-semibold">
                            Director&apos;s Craft Note
                          </p>
                          <p className="text-white/70 text-[11px] italic font-serif leading-relaxed">
                            &ldquo;{item.btsNotes.directorComment}&rdquo;
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* BOTTOM MASTER TELEMETRY & CTA DOCK (APPROVED DESIGN)         */}
        {/* ============================================================ */}
        <div className="mt-14 lg:mt-16 flex justify-center">
          <div className="rounded-full bg-[#0d091e]/85 border border-white/15 backdrop-blur-2xl px-6 sm:px-8 py-3 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {/* Telemetry Stats */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-serif text-sm sm:text-base text-white/90 font-light">
              <span>
                <strong className="font-medium text-[#f5e302]">98.4%</strong> Retention
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>
                <strong className="font-medium text-[#f5e302]">14</strong> Festival Laurels
              </span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>
                <strong className="font-medium text-[#f5e302]">4K</strong> Mastered
              </span>
            </div>

            {/* Champagne Gold CTA Button */}
            <button
              type="button"
              onClick={handleCtaClick}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5e302] to-[#c59b27] hover:brightness-110 active:scale-95 text-[#050505] font-mono text-[10px] tracking-wider uppercase font-extrabold shadow-[0_2px_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer shrink-0"
            >
              CTA
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
