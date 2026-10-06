import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Eye } from 'lucide-react';

export interface ExhibitionProject {
  id: string;
  title: string;
  category: string;
  duration: string;
  imageUrl: string;
  camera: string;
  lens: string;
  location: string;
  storyBrief: string;
  scenes?: string[];
  editorialSentence: string;
  detailedStory?: string;
  behindTheScenes?: string;
  productionProcess?: { step: string; title: string; desc: string; }[];
  results?: string;
  videoUrl?: string;
}

interface CuratedExhibitionsSectionProps {
  projects: ExhibitionProject[];
  onSelectProject: (project: ExhibitionProject) => void;
  onDiscussProduction: () => void;
  whatsappNumber?: string;
  onExploreWorlds?: () => void;
}

export const CuratedExhibitionsSection: React.FC<CuratedExhibitionsSectionProps> = ({
  projects,
  onSelectProject,
  onDiscussProduction,
  whatsappNumber = '919971410306',
  onExploreWorlds
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: null, label: 'ALL ARCHIVES' },
    { id: 'Brand Films', label: 'BRAND FILMS' },
    { id: 'Creative Campaigns', label: 'CAMPAIGNS' },
    { id: 'Luxury Events', label: 'LUXURY EVENTS' },
    { id: 'Personal Branding', label: 'PERSONAL BRANDING' },
    { id: 'Vertical Fiction', label: 'VERTICAL FICTION' },
    { id: 'Commercial Productions', label: 'COMMERCIALS' }
  ];

  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())
    : projects;

  return (
    <section id="portfolio" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36 border-t border-white/5 overflow-visible">
      {/* =========================================================================
          BACKGROUND ATMOSPHERE & BRAND GUIDELINES PAGE 22 SWEEPING WAVE CRESTS
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
        {/* Radial Imperial Violet Atmosphere Core */}
        <div
          className="absolute -top-32 right-0 w-[800px] h-[750px] opacity-[0.22] blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 70% 30%, rgba(65, 6, 130, 0.85) 0%, rgba(176, 0, 69, 0.25) 50%, transparent 75%)'
          }}
        />

        {/* Ambient Warm Golden Rim Glow behind Header CTA */}
        <div
          className="absolute top-12 right-12 w-[500px] h-[350px] opacity-[0.14] blur-2xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(245, 227, 2, 0.6) 0%, transparent 65%)'
          }}
        />

        {/* =====================================================================
            AUTHENTIC BRAND GUIDELINES PAGE 22: SWEEPING WAVE CRESTS / CINEMA SWARM
            Using exact vector geometry from client assets/patterns/b1-b5 and a1-a5
            ===================================================================== */}
        <div className="absolute top-0 right-0 w-full max-w-3xl h-[460px] pointer-events-none opacity-90 overflow-hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 1100 460"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMaxYMin meet"
          >
            <defs>
              {/* Authentic Wave Fin from Page 22 / b1, b3, a2, a4 */}
              <path
                id="page22-wave-fin"
                d="M415.9,28.5 C385.6,-1.5 309.3,-4.9 247.5,9.3 C212.0,17.5 126.1,72.6 0,18.7 L0,46.9 C125.8,100.4 211.5,45.5 247.0,37.3 C309.2,23.0 386.0,26.5 415.9,57.0 Z"
              />

              {/* Reverse Flowing Wave Fin */}
              <path
                id="page22-wave-rev"
                d="M0,28.6 C30.3,-1.4 106.6,-4.8 168.4,9.4 C203.9,17.6 289.8,72.7 415.9,18.8 L415.9,47.0 C290.1,100.5 204.4,45.6 168.9,37.4 C106.7,23.1 29.9,26.6 0,57.1 Z"
              />

              {/* Linear Gradients matching Concept 1 & Brand Palette */}
              <linearGradient id="p22-gold-flow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F5E302" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#E5A800" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0.6" />
              </linearGradient>

              <linearGradient id="p22-crimson-flow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B00045" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#8A0035" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#550020" stopOpacity="0.5" />
              </linearGradient>

              <linearGradient id="p22-violet-flow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7B2CBF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#410682" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Cascading Sweeping Wave Crests Swarm (Page 22 / Concept 1) */}
            <g transform="translate(420, 10)">
              {/* Row 1: High subtle wave ripples */}
              <g opacity="0.35">
                <path d="M120,25 C160,10 220,10 260,25 C300,40 360,40 400,25" stroke="#B00045" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M260,15 C300,0 360,0 400,15 C440,30 500,30 540,15" stroke="#F5E302" strokeWidth="2.5" strokeLinecap="round" />
              </g>

              {/* Row 2: Gentle cresting wave ripples */}
              <g opacity="0.45">
                <path d="M80,65 C125,48 190,48 235,65 C280,82 345,82 390,65" stroke="#B00045" strokeWidth="3" strokeLinecap="round" />
                <path d="M220,55 C265,38 330,38 375,55 C420,72 485,72 530,55" stroke="#F5E302" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* Row 3: Transition wave fins */}
              <g transform="translate(60, 105)">
                <use href="#page22-wave-fin" x="0" y="0" transform="scale(0.62)" fill="url(#p22-crimson-flow)" opacity="0.7" />
                <use href="#page22-wave-fin" x="220" y="-12" transform="scale(0.62)" fill="url(#p22-gold-flow)" opacity="0.75" />
              </g>

              {/* Row 4: Primary focal wave crests */}
              <g transform="translate(-10, 185)">
                <use href="#page22-wave-fin" x="0" y="0" transform="scale(0.82)" fill="url(#p22-crimson-flow)" opacity="0.88" />
                <use href="#page22-wave-fin" x="250" y="-18" transform="scale(0.82)" fill="url(#p22-gold-flow)" opacity="0.95" />
              </g>

              {/* Row 5: Bold anchor wave crests */}
              <g transform="translate(-70, 280)">
                <use href="#page22-wave-fin" x="0" y="0" transform="scale(0.96)" fill="url(#p22-crimson-flow)" opacity="0.85" />
                <use href="#page22-wave-fin" x="280" y="-22" transform="scale(0.96)" fill="url(#p22-gold-flow)" opacity="0.9" />
              </g>

              {/* Row 6: Tapering base wave crests */}
              <g transform="translate(30, 380)">
                <use href="#page22-wave-fin" x="0" y="0" transform="scale(0.85)" fill="url(#p22-crimson-flow)" opacity="0.65" />
                <use href="#page22-wave-fin" x="260" y="-15" transform="scale(0.85)" fill="url(#p22-gold-flow)" opacity="0.7" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* =========================================================================
          SECTION HEADER & DISCUSS A PRODUCTION CTA
          ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 relative z-10">
        <div className="space-y-4 max-w-2xl text-left">
          {/* Editorial Kicker */}
          <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-full bg-white/[0.04] border border-amber-400/25 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5E302] shadow-[0_0_8px_#F5E302]" />
            <span className="font-mono text-[9px] tracking-[0.28em] text-[#F5E302] uppercase font-bold">
              ANTHOLOGY ARCHIVE // 2026
            </span>
          </div>

          {/* Main Section Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-light font-serif text-[#F0EBD8] tracking-wide leading-[1.08]">
            Curated{' '}
            <span className="italic font-normal text-[#F5E302] drop-shadow-[0_0_35px_rgba(245,227,2,0.45)]">
              Exhibitions
            </span>
          </h2>

          {/* Editorial Description */}
          <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed tracking-wide font-light max-w-xl">
            A handpicked anthology of our deepest creative directions. Each narrative is built on architectural rigor, cinema-grade optics, and a relentless commitment to visual storytelling that endures.
          </p>
        </div>

        {/* Header CTA Button - Liquid Glass with Gold Neon Rim */}
        <button
          onClick={onDiscussProduction}
          className="group relative inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full backdrop-blur-xl bg-white/[0.05] hover:bg-[#F5E302]/10 border border-[#F5E302]/60 hover:border-[#F5E302] text-white font-mono text-[10px] tracking-[0.25em] uppercase transition-all duration-500 shadow-[0_4px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(245,227,2,0.18)] hover:shadow-[0_0_35px_rgba(245,227,2,0.45)] hover:scale-105 active:scale-98 cursor-pointer overflow-hidden self-start md:self-auto"
        >
          {/* Subtle Specular Glint Sweep */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent pointer-events-none" />
          <span className="text-[#F5E302] font-bold">DISCUSS A PRODUCTION</span>
          <ArrowRight size={13} className="text-[#F5E302] transform transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* =========================================================================
          CATEGORY FILTER RAIL (LIQUID GLASS FLOATING PILL RAIL)
          ========================================================================= */}
      <div className="flex items-center justify-start gap-2.5 mb-16 pb-6 overflow-x-auto no-scrollbar max-w-full relative z-10 border-b border-white/5">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.label}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative px-5 py-2.5 rounded-full font-mono text-[9px] tracking-widest uppercase transition-all duration-500 border cursor-pointer whitespace-nowrap overflow-hidden group ${
                isSelected
                  ? 'bg-gradient-to-r from-[#F5E302] via-[#F5B800] to-[#E5A800] text-black font-extrabold border-[#F5E302] shadow-[0_0_25px_rgba(245,227,2,0.5)] scale-105'
                  : 'backdrop-blur-md bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border-white/10 hover:border-amber-400/40'
              }`}
            >
              {!isSelected && (
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent pointer-events-none" />
              )}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          FEATURED EXHIBITIONS GRID (12-COLUMN RESPONSIVE LAYOUT)
          ========================================================================= */}
      <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10 lg:gap-y-16 relative z-10">
        {filteredProjects.map((project, index) => {
          const layoutClass = 'col-span-12 lg:col-span-6';
          const aspectClass = 'aspect-[16/9]';

          return (
            <motion.div
              key={project.id}
              onClick={() => onSelectProject(project)}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, delay: (index % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`${layoutClass} flex flex-col group cursor-pointer text-left`}
            >
              {/* Liquid Glass Card Enclosure */}
              <div className="relative rounded-3xl p-4 sm:p-5 bg-gradient-to-b from-white/[0.07] via-[#100A24]/40 to-black/60 backdrop-blur-2xl border border-white/[0.12] group-hover:border-amber-400/60 transition-all duration-700 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] group-hover:shadow-[0_25px_70px_-15px_rgba(65,6,130,0.5),0_0_35px_rgba(245,227,2,0.25)] group-hover:-translate-y-2 overflow-hidden flex flex-col h-full">
                {/* Hover Specular Light Sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none z-30" />

                {/* Ambient Caustic Backlight on Hover */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#410682]/40 via-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none -z-10" />

                {/* Top Prismatic Light Rim */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 group-hover:via-amber-300/70 to-transparent pointer-events-none transition-all duration-700" />

                {/* Cinematic Cover Frame */}
                <div className={`relative ${aspectClass} rounded-2xl overflow-hidden bg-neutral-950/80 border border-white/10 mb-5 relative group/frame`}>
                  {/* Viewfinder Corner Reticle Brackets (Futuristic HUD) */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-amber-400/80 z-20 pointer-events-none opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-amber-400/80 z-20 pointer-events-none opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-amber-400/80 z-20 pointer-events-none opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-amber-400/80 z-20 pointer-events-none opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />

                  {/* Project Still */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[20%] brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-[1.0] group-hover:scale-104 transition-all duration-[1400ms] ease-[0.16, 1, 0.3, 1]"
                  />

                  {/* Gradient Shutter Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none opacity-90 transition-opacity duration-500 group-hover:opacity-60" />

                  {/* Centered Glowing Gold Play / View Lens Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F5E302] via-[#F5B800] to-[#E5A800] text-black flex items-center justify-center backdrop-blur-md shadow-[0_0_35px_rgba(245,227,2,0.65)]">
                      {project.videoUrl ? <Play size={20} className="fill-black ml-0.5" /> : <Eye size={20} />}
                    </div>
                  </div>

                  {/* Top-Left Archive Duration Tag */}
                  <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 px-3 py-1 bg-black/75 backdrop-blur-md rounded-md border border-white/10 font-mono text-[8px] tracking-wider text-white">
                    <span className={`w-1.5 h-1.5 rounded-full ${project.videoUrl ? 'bg-emerald-400 animate-pulse shadow-[0_0_6px_#10B981]' : 'bg-[#F5E302] shadow-[0_0_6px_#F5E302]'}`} />
                    <span className="text-[#F5E302] font-bold">{project.videoUrl ? 'STREAM READY' : 'ARCHIVE STILL'}</span>
                    <span className="text-white/30">|</span>
                    <span>{project.duration}</span>
                  </div>

                  {/* Top-Right Museum Exhibition Catalog Code */}
                  <div className="absolute top-4 right-4 z-20 px-2.5 py-1 bg-black/75 backdrop-blur-md rounded-md border border-white/10 font-mono text-[8px] text-[#F5E302] tracking-widest uppercase font-bold">
                    EXHIBITION // 0{project.id}
                  </div>

                  {/* Bottom Optical Rig Telemetry Strip */}
                  <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-lg border border-white/5 font-mono text-[7.5px] text-white/50 tracking-wider">
                    <span className="text-amber-200/90 truncate max-w-[60%]">
                      {project.camera || 'ARRI ALEXA MINI LF'}
                    </span>
                    <span className="text-white/40 truncate max-w-[38%] text-right uppercase">
                      {project.lens || 'ZEISS SUPREME PRIME'}
                    </span>
                  </div>
                </div>

                {/* Project Editorial Meta Details */}
                <div className="space-y-3 px-1 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    {/* Category & Location Badges (Brand Dot instead of star) */}
                    <div className="flex items-center justify-between text-left">
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5E302] shadow-[0_0_6px_#F5E302]" />
                        <span className="font-mono text-[9px] tracking-widest text-[#F5E302] uppercase font-bold">
                          {project.category}
                        </span>
                      </div>
                      <span className="font-mono text-[8px] text-white/40 tracking-widest uppercase">
                        [ {project.location || 'HYDERABAD STUDIO'} ]
                      </span>
                    </div>

                    {/* Title with Gold Reveal Underline */}
                    <h3 className="text-xl sm:text-2xl font-light font-serif text-[#F0EBD8] tracking-wide relative inline-block group-hover:text-amber-100 transition-colors leading-snug">
                      {project.title}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#F5E302] to-amber-200 transition-all duration-700 group-hover:w-full" />
                    </h3>

                    {/* Editorial Excerpt */}
                    <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed tracking-wide font-light">
                      {project.editorialSentence}
                    </p>
                  </div>

                  {/* Bottom Action Rail */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-3">
                    <span className="inline-flex items-center space-x-2 text-[9px] font-mono tracking-[0.25em] text-[#F5E302] group-hover:text-amber-200 transition-colors font-bold uppercase">
                      <span>{project.videoUrl ? 'WATCH EXHIBITION FILM' : 'VIEW EXHIBITION ARCHIVE'}</span>
                      <span className="transform transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                    </span>
                    <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase hidden sm:inline-block">
                      DIRECTOR ARCHIVE // MMXXVI
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* =========================================================================
          CLOSING BANNER: CREATIVE HORIZONS SANCTUARY (MATCHING APPROVED MOCKUP)
          Featuring Undulating Brand Wave Ribbons & Floating Frosted Glass Console
          ========================================================================= */}
      <div
        id="conversation-sanctuary"
        className="mt-32 md:mt-48 relative rounded-3xl md:rounded-[40px] overflow-hidden border border-white/15 hover:border-amber-400/40 bg-[#0B0416] p-4 sm:p-8 md:p-14 text-center shadow-[0_40px_100px_-20px_rgba(0,0,0,0.95),0_0_50px_rgba(65,6,130,0.25)] transition-all duration-700 group/sanctuary flex items-center justify-center"
      >
        {/* Top Prismatic Light Rim in Solar Gold */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F5E302]/70 to-transparent pointer-events-none transition-all duration-700 z-10" />

        {/* Ambient Specular Glint Sweep on Hover */}
        <div className="absolute inset-0 -translate-x-full group-hover/sanctuary:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none z-20" />

        {/* =====================================================================
            ORGANIC BRAND WAVE RIBBONS (FULL 4-COLOR PALETTE)
            Pistachio Green (#A2D865), Crimson Rose (#B00045),
            Solar Flare Gold (#F5E302), and Imperial Violet (#410682)
            ===================================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="bannerRibbonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Continuous Undulating Ribbon Waves matching approved mockup */}
            {/* Stream 1: Pistachio Green top wave */}
            <path
              d="M -60,65 C 120,30 260,110 440,75 C 620,40 780,105 960,75 C 1100,50 1200,90 1280,65"
              fill="none"
              stroke="#A2D865"
              strokeWidth="22"
              strokeLinecap="round"
              opacity="0.9"
              filter="url(#bannerRibbonGlow)"
            />

            {/* Stream 2: Crimson Rose wave */}
            <path
              d="M -80,135 C 100,100 240,180 420,145 C 600,110 760,175 940,145 C 1080,120 1190,165 1290,140"
              fill="none"
              stroke="#B00045"
              strokeWidth="24"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Stream 3: Deep Imperial Violet / Magenta wave */}
            <path
              d="M -50,210 C 130,175 270,255 450,220 C 630,185 790,250 970,220 C 1110,195 1210,240 1280,215"
              fill="none"
              stroke="#7A1D54"
              strokeWidth="22"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Stream 4: Solar Gold luminous wave & Pistachio Green mid wave */}
            <path
              d="M 520,290 C 680,255 820,335 980,300 C 1100,270 1200,315 1280,290"
              fill="none"
              stroke="#F5E302"
              strokeWidth="22"
              strokeLinecap="round"
              opacity="0.95"
              filter="url(#bannerRibbonGlow)"
            />
            <path
              d="M -60,290 C 120,255 260,335 440,300 C 580,270 700,315 820,290"
              fill="none"
              stroke="#A2D865"
              strokeWidth="24"
              strokeLinecap="round"
              opacity="0.9"
              filter="url(#bannerRibbonGlow)"
            />

            {/* Stream 5: Deep Imperial Violet wave */}
            <path
              d="M -70,370 C 110,335 250,415 430,380 C 610,345 770,410 950,380 C 1090,355 1200,400 1280,375"
              fill="none"
              stroke="#651C7A"
              strokeWidth="24"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Stream 6: Crimson Rose wave */}
            <path
              d="M -50,450 C 130,415 270,495 450,460 C 630,425 790,490 970,460 C 1110,435 1210,480 1280,455"
              fill="none"
              stroke="#B00045"
              strokeWidth="24"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Stream 7: Pistachio Green & Crimson bottom waves */}
            <path
              d="M -60,530 C 120,495 260,575 440,540 C 600,510 740,560 900,530"
              fill="none"
              stroke="#A2D865"
              strokeWidth="20"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M 860,530 C 980,500 1100,555 1280,530"
              fill="none"
              stroke="#B00045"
              strokeWidth="20"
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* =====================================================================
            FLOATING FROSTED GLASS SANCTUARY PLACARD (EXACT MATCH TO MOCKUP)
            ===================================================================== */}
        <div className="relative z-10 w-full max-w-3xl rounded-[28px] sm:rounded-[34px] md:rounded-[38px] border border-amber-400/40 bg-[#100720]/50 backdrop-blur-3xl p-8 sm:p-12 md:p-16 text-center space-y-6 shadow-[0_30px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(245,184,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.25)]">
          {/* Editorial Kicker */}
          <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded-full bg-white/[0.04] border border-[#F5E302]/30 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5E302] shadow-[0_0_8px_#F5E302]" />
            <span className="font-mono text-[9px] tracking-[0.28em] text-[#F5E302] uppercase font-bold">
              DIRECTORIAL DIALOGUE // 2026
            </span>
          </div>

          {/* Main Statement */}
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-serif text-[#F0EBD8] leading-tight tracking-wide">
            Every story begins <br />with a{' '}
            <span className="italic font-normal text-[#F5E302] drop-shadow-[0_0_35px_rgba(245,227,2,0.5)]">
              conversation.
            </span>
          </h3>

          {/* Subtitle */}
          <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed tracking-wide font-light max-w-xl mx-auto">
            Whether pioneering an international theatrical release, a high-fashion digital anthology, or an intimate founder narrative — let us sculpt your vision into cinema that endures.
          </p>

          {/* Call to Action Controls */}
          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4 relative z-30">
            <button
              onClick={() => {
                window.open(
                  `https://wa.me/${whatsappNumber}?text=Hello%20Mayavi!%20I'm%20interested%20in%20starting%20a%20project%20and%20would%20love%20to%20initiate%20a%20creative%20inquiry%20regarding%20your%20production%20services.`,
                  '_blank'
                );
              }}
              className="w-full sm:w-auto px-9 py-4 rounded-full text-[10px] font-mono tracking-[0.22em] bg-gradient-to-r from-[#F5E302] via-[#F5B800] to-[#E5A800] hover:from-amber-300 hover:to-yellow-300 text-black font-extrabold transition-all duration-500 shadow-[0_0_35px_rgba(245,227,2,0.55),0_10px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_50px_rgba(245,227,2,0.85)] hover:scale-105 active:scale-98 cursor-pointer uppercase"
            >
              Initiate Creative Inquiry
            </button>
            <button
              onClick={() => {
                if (onExploreWorlds) {
                  onExploreWorlds();
                } else {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto px-9 py-4 rounded-full text-[10px] font-mono tracking-[0.22em] backdrop-blur-xl bg-white/[0.04] hover:bg-white/[0.1] text-white/85 hover:text-[#F5E302] transition-all duration-500 border border-white/15 hover:border-[#F5E302]/60 cursor-pointer uppercase shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(245,227,2,0.25)] hover:scale-105 active:scale-98"
            >
              Explore Creative Worlds
            </button>
          </div>

          {/* Bottom Telemetry Stamp */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-white/40 font-mono text-[8px] tracking-widest uppercase">
            <span>STUDIO DIRECT: +91 9971410306</span>
            <span>•</span>
            <span>HYDERABAD PRODUCTION HQ</span>
            <span>•</span>
            <span className="text-[#F5E302]/80">ANTHOLOGY ARCHIVES OPEN</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratedExhibitionsSection;
