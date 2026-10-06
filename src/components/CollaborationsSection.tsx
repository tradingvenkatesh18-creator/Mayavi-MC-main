import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface CollaborationsSectionProps {
  onSelectAction?: (url: string) => void;
}

interface CollaboratorBrand {
  name: string;
  sub: string;
  category: string;
  rimBorder: string;
  tagColor: string;
  dotColor: string;
}

const COLLABORATORS: CollaboratorBrand[] = [
  {
    name: 'Tamada Media',
    sub: 'DIGITAL NETWORKS',
    category: 'PARTNER',
    rimBorder: 'border-[#d4af37]/50 hover:border-[#d4af37] shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(212,175,55,0.12)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_28px_rgba(212,175,55,0.22)]',
    tagColor: 'text-[#d4af37] bg-[#d4af37]/10 border-[#d4af37]/35',
    dotColor: 'bg-[#d4af37] shadow-[0_0_8px_#d4af37]'
  },
  {
    name: 'TeluguOne',
    sub: 'MEDIA BROADCASTS',
    category: 'NETWORK',
    rimBorder: 'border-[#8b5cf6]/50 hover:border-[#8b5cf6] shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(139,92,246,0.14)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_28px_rgba(139,92,246,0.25)]',
    tagColor: 'text-[#c4b5fd] bg-[#8b5cf6]/10 border-[#8b5cf6]/35',
    dotColor: 'bg-[#a78bfa] shadow-[0_0_8px_#a78bfa]'
  },
  {
    name: 'AGVR Creations',
    sub: 'THEATRICAL ART',
    category: 'PRODUCTION',
    rimBorder: 'border-[#f59e0b]/50 hover:border-[#f59e0b] shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(245,158,11,0.12)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_28px_rgba(245,158,11,0.22)]',
    tagColor: 'text-[#fbbf24] bg-[#f59e0b]/10 border-[#f59e0b]/35',
    dotColor: 'bg-[#fbbf24] shadow-[0_0_8px_#fbbf24]'
  },
  {
    name: 'Wadbros',
    sub: 'LUXURY PRODUCTION',
    category: 'CREATIVE',
    rimBorder: 'border-[#10b981]/50 hover:border-[#10b981] shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(16,185,129,0.12)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_28px_rgba(16,185,129,0.22)]',
    tagColor: 'text-[#6ee7b7] bg-[#10b981]/10 border-[#10b981]/35',
    dotColor: 'bg-[#34d399] shadow-[0_0_8px_#34d399]'
  },
  {
    name: 'Nailed It',
    sub: 'IDENTITY SUITES',
    category: 'BRANDING',
    rimBorder: 'border-[#c084fc]/50 hover:border-[#c084fc] shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(192,132,252,0.12)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_28px_rgba(192,132,252,0.22)]',
    tagColor: 'text-[#e9d5ff] bg-[#c084fc]/10 border-[#c084fc]/35',
    dotColor: 'bg-[#c084fc] shadow-[0_0_8px_#c084fc]'
  },
  {
    name: 'Neetho',
    sub: 'CINEMATIC SERIES',
    category: 'ORIGINALS',
    rimBorder: 'border-[#8b5cf6]/50 hover:border-[#8b5cf6] shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(139,92,246,0.12)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_28px_rgba(139,92,246,0.22)]',
    tagColor: 'text-[#c4b5fd] bg-[#8b5cf6]/10 border-[#8b5cf6]/35',
    dotColor: 'bg-[#a78bfa] shadow-[0_0_8px_#a78bfa]'
  },
  {
    name: 'Pista House',
    sub: 'LEGACY HERITAGE',
    category: 'CULTURE',
    rimBorder: 'border-[#10b981]/50 hover:border-[#10b981] shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(16,185,129,0.12)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_28px_rgba(16,185,129,0.22)]',
    tagColor: 'text-[#6ee7b7] bg-[#10b981]/10 border-[#10b981]/35',
    dotColor: 'bg-[#34d399] shadow-[0_0_8px_#34d399]'
  },
  {
    name: 'Kalamandir',
    sub: 'TRADITIONAL TEXTILES',
    category: 'FASHION',
    rimBorder: 'border-[#7c3aed]/50 hover:border-[#7c3aed] shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(124,58,237,0.12)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_28px_rgba(124,58,237,0.22)]',
    tagColor: 'text-[#ddd6fe] bg-[#7c3aed]/10 border-[#7c3aed]/35',
    dotColor: 'bg-[#8b5cf6] shadow-[0_0_8px_#8b5cf6]'
  },
  {
    name: 'Pronto Diagnostics',
    sub: 'CLINICAL SYSTEMS',
    category: 'ENTERPRISE',
    rimBorder: 'border-[#10b981]/50 hover:border-[#10b981] shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(16,185,129,0.12)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_28px_rgba(16,185,129,0.22)]',
    tagColor: 'text-[#6ee7b7] bg-[#10b981]/10 border-[#10b981]/35',
    dotColor: 'bg-[#34d399] shadow-[0_0_8px_#34d399]'
  },
  {
    name: 'Veda Shakti Homes',
    sub: 'RESIDENTIAL DESIGN',
    category: 'ESTATE',
    rimBorder: 'border-[#d4af37]/50 hover:border-[#d4af37] shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(212,175,55,0.12)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_28px_rgba(212,175,55,0.22)]',
    tagColor: 'text-[#d4af37] bg-[#d4af37]/10 border-[#d4af37]/35',
    dotColor: 'bg-[#d4af37] shadow-[0_0_8px_#d4af37]'
  }
];

export default function CollaborationsSection({ onSelectAction }: CollaborationsSectionProps) {
  return (
    <section
      id="collaborations"
      className="relative z-10 py-24 lg:py-36 bg-[#06020d] border-t border-white/5 overflow-hidden select-none"
    >
      {/* ============================================================ */}
      {/* OFFICIAL CLIENT PATTERN: PATTERN-3 (DIAMOND WAVE MATRIX)     */}
      {/* Brand Guidelines Page 20 Symmetrical Wavy Diamonds Texture   */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Atmospheric Halos */}
        <div className="absolute top-10 left-10 w-[550px] h-[550px] bg-[#f59e0b]/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#410682]/25 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#d4af37]/8 rounded-full blur-[140px]" />

        {/* Official Client Brand Pattern 3 Watermark */}
        <div
          className="absolute inset-0 opacity-[0.065] pointer-events-none select-none mix-blend-screen"
          style={{
            backgroundImage: "url('/patterns/pattern-3.svg')",
            backgroundRepeat: 'repeat',
            backgroundSize: '240px 240px'
          }}
        />
      </div>

      {/* ============================================================ */}
      {/* SECTION CONTENT CONTAINER                                    */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* MASTHEAD HEADER */}
        <div className="max-w-3xl space-y-4 mb-16 text-left">
          {/* Founder Leadership Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#400582]/50 border border-[#f59e0b]/40 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5e302] animate-pulse" />
            <span className="font-mono text-[8.5px] tracking-[0.25em] text-[#f5e302] uppercase font-bold">
              CURATED BY FOUNDER &amp; CEO // VISHISHTA SAXENA
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif text-white tracking-tight leading-tight">
            Collaborations That Matter
          </h2>

          {/* Subtitle */}
          <p className="text-white/70 font-sans text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl">
            Every alliance represents a deliberate bridge between artistic cinema and industry influence. Connected, spearheaded, and collaborated directly under the vision of Founder &amp; CEO{' '}
            <span className="text-[#f5e302] font-serif italic font-medium">Vishishta Saxena</span>, these strategic partnerships unite Mayavi with South India&apos;s premier broadcast networks, production houses, and visionary brand leaders.
          </p>

          {/* Founder Identity Card & Executive Directorial Indicator */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#f5e302]/40 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#400582] via-[#7b51a8] to-[#f5e302]/40 border border-[#f5e302]/50 flex items-center justify-center text-xs font-serif italic text-[#f0ebd8] font-bold shadow-[0_0_15px_rgba(245,227,2,0.25)]">
                VS
              </div>
              <div className="text-left">
                <p className="font-serif italic text-sm text-white font-medium">Vishishta Saxena</p>
                <p className="font-mono text-[8px] tracking-[0.2em] text-[#f5e302] uppercase font-semibold">
                  Founder &amp; CEO • Executive Curator
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-white/50 font-mono text-[9px] tracking-wider uppercase">
              <Sparkles size={11} className="text-[#f5e302]" />
              <span>Executive Directorial Network</span>
            </div>
          </div>
        </div>

        {/* SECTION DIVIDER WITH ARCHITECTURAL NODES */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 mb-8 text-left">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[8.5px] text-[#f5e302] tracking-[0.25em] uppercase font-bold">
              SELECTED COLLABORATORS &amp; ALLIANCES
            </span>
          </div>
          <span className="font-mono text-[8px] text-white/40 tracking-wider uppercase hidden sm:inline">
            CURATED UNDER VISHISHTA SAXENA
          </span>
        </div>

        {/* 10 COLLABORATOR CARDS (2 ROWS OF 5 GRID) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5 mb-14">
          {COLLABORATORS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`relative overflow-hidden bg-[#0a0618]/75 backdrop-blur-md border rounded-xl p-5 flex flex-col justify-between text-left group transition-all duration-300 min-h-[145px] hover:-translate-y-1 ${brand.rimBorder}`}
            >
              {/* Subtle Backlight Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Top: Category Tag Chip & Glowing Status Node */}
              <div className="flex items-center justify-between w-full relative z-10">
                <span
                  className={`font-mono text-[7px] tracking-[0.2em] px-2 py-0.5 rounded-full border font-bold uppercase ${brand.tagColor}`}
                >
                  {brand.category}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${brand.dotColor}`} />
              </div>

              {/* Middle: Brand Name & Industry Subtitle */}
              <div className="space-y-1 relative z-10 my-3">
                <h4 className="font-serif text-sm md:text-base text-white/90 group-hover:text-white transition-colors duration-200 font-normal leading-snug">
                  {brand.name}
                </h4>
                <p className="font-mono text-[7.5px] tracking-[0.2em] text-white/40 group-hover:text-white/60 transition-colors duration-200 uppercase">
                  {brand.sub}
                </p>
              </div>

              {/* Bottom Subtle Rule Line */}
              <div className="w-full h-[1px] bg-white/[0.04] group-hover:bg-white/[0.1] transition-colors duration-300 relative z-10" />
            </motion.div>
          ))}
        </div>

        {/* BOTTOM FLOATING TELEMETRY DOCK */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-white/10 bg-[#0e071e]/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            <span className="font-mono text-[8.5px] sm:text-[9.5px] text-white/80 tracking-wider">
              10+ Strategic Alliances <span className="text-[#f5e302] mx-2">•</span> 4 Broadcast Networks{' '}
              <span className="text-[#f5e302] mx-2">•</span> Hyderabad // Pan-India Direct
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
