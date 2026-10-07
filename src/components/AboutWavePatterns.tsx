import React from 'react';

/**
 * AboutWavePatterns (Option E / Full-Screen Framing Silk Ribbons)
 * Perfectly implements user requests:
 * 1. Spans FULL BROWSER WIDTH / FULL SCREEN (no square container cuts).
 * 2. Acts as an authentic luxury background layer underneath centered content.
 * 3. Top-Left Framing Silk Ribbons:
 *    - Curving gracefully along the top-left periphery in the brand trio:
 *      Pistachio Green (#a2d865), Royal Purple (#400582), Deep Crimson (#b00045).
 *    - Perfectly positioned to frame the corner without occluding or touching
 *      "OUR PHILOSOPHY" or the editorial headline across ALL screen sizes.
 * 4. Bottom-Right Full-Bleed Sweeping Silk Ribbons:
 *    - Sweeping edge-to-edge across the bottom from center-left to the bottom-right corner.
 *    - Flowing smoothly underneath the audition cards and Grand Diva banner.
 * 5. Deep obsidian canvas with concentric ripple waves and diamond matrix watermark.
 * 6. Multi-stop satin silk gradients and specular luster highlights for authentic 3D cloth depth.
 */
export default function AboutWavePatterns() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* -------------------------------------------------------------------------
          1. ATMOSPHERIC AMBIENT GLOWS
          ------------------------------------------------------------------------- */}
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-[#400582]/18 rounded-full blur-[160px]" />
      <div className="absolute top-12 left-0 w-[420px] h-[420px] bg-[#a2d865]/10 rounded-full blur-[140px]" />
      <div className="absolute -bottom-24 -right-24 w-[700px] h-[700px] bg-[#b00045]/18 rounded-full blur-[180px]" />
      <div className="absolute bottom-8 right-16 w-[500px] h-[500px] bg-[#400582]/15 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#a2d865]/8 rounded-full blur-[140px]" />

      {/* -------------------------------------------------------------------------
          2. CONCENTRIC RIPPLE WAVES (Subtle Luxury Acoustic Resonance from media_1791368100020.png)
          ------------------------------------------------------------------------- */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
        <svg className="w-[1400px] h-[1400px]" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="500" cy="500" r="100" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="500" cy="500" r="160" stroke="#a78bfa" strokeWidth="1" />
          <circle cx="500" cy="500" r="220" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="500" cy="500" r="280" stroke="#a78bfa" strokeWidth="1" />
          <circle cx="500" cy="500" r="340" stroke="#a78bfa" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="500" cy="500" r="400" stroke="#a78bfa" strokeWidth="1.2" />
          <circle cx="500" cy="500" r="460" stroke="#a78bfa" strokeWidth="1" strokeDasharray="6 6" />
        </svg>
      </div>

      {/* -------------------------------------------------------------------------
          3. DIAMOND MATRIX WATERMARK PATTERN (pattern-3.svg Full-Bleed Continuity)
          ------------------------------------------------------------------------- */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: "url('/patterns/pattern-3.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '190px 190px',
        }}
      />

      {/* -------------------------------------------------------------------------
          4. TOP-LEFT FRAMING SILK RIBBONS (Pistachio Green + Royal Purple + Crimson)
          Curling tightly in the top-left corner without occluding heading text
          ------------------------------------------------------------------------- */}
      <div className="absolute -top-12 -left-14 sm:-left-12 lg:-left-10 w-[200px] sm:w-[240px] lg:w-[270px] h-[400px] sm:h-[460px] lg:h-[520px] pointer-events-none select-none z-0 opacity-90">
        <svg
          className="w-full h-full"
          viewBox="0 0 270 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Top-Left Silk Gradients */}
            <linearGradient id="abSilkGreenTL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d9f99d" />
              <stop offset="25%" stopColor="#a2d865" />
              <stop offset="70%" stopColor="#4d7c0f" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
            <linearGradient id="abSilkPurpleTL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="30%" stopColor="#7c3aed" />
              <stop offset="70%" stopColor="#410682" />
              <stop offset="100%" stopColor="#1e0240" />
            </linearGradient>
            <linearGradient id="abSilkCrimsonTL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="30%" stopColor="#e11d48" />
              <stop offset="70%" stopColor="#b00045" />
              <stop offset="100%" stopColor="#4c0519" />
            </linearGradient>

            {/* Specular Silk Sheen Luster Gradients */}
            <linearGradient id="abLusterTL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Ambient Silk Drop Shadow */}
            <filter id="abSilkShadowTL" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#000000" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* Pistachio Green Ribbon - Outermost silk band */}
          <path
            d="M -30 -40 C -5 20, 5 70, -10 150 C -35 230, -65 310, -100 370"
            stroke="url(#abSilkGreenTL)"
            strokeWidth="36"
            strokeLinecap="round"
            filter="url(#abSilkShadowTL)"
          />
          {/* Green Specular Highlight Sheen */}
          <path
            d="M -30 -40 C -5 20, 5 70, -10 150 C -35 230, -65 310, -100 370"
            stroke="url(#abLusterTL)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Royal Purple Ribbon - Middle undulating silk band */}
          <path
            d="M 0 -35 C 25 25, 35 80, 20 160 C 0 240, -30 320, -65 385"
            stroke="url(#abSilkPurpleTL)"
            strokeWidth="30"
            strokeLinecap="round"
          />
          {/* Purple Specular Highlight Sheen */}
          <path
            d="M 0 -35 C 25 25, 35 80, 20 160 C 0 240, -30 320, -65 385"
            stroke="url(#abLusterTL)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Crimson Ribbon - Inner silk band */}
          <path
            d="M 30 -30 C 55 30, 65 90, 50 170 C 30 250, 0 330, -35 400"
            stroke="url(#abSilkCrimsonTL)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          {/* Crimson Specular Highlight Sheen */}
          <path
            d="M 30 -30 C 55 30, 65 90, 50 170 C 30 250, 0 330, -35 400"
            stroke="url(#abLusterTL)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* -------------------------------------------------------------------------
          5. BOTTOM FULL-BLEED SWEEPING SILK RIBBONS (Crimson + Purple + Pistachio)
          Sweeping edge-to-edge across the bottom screen width into the bottom-right corner
          ------------------------------------------------------------------------- */}
      <div className="absolute -bottom-6 left-0 right-0 w-full h-[220px] sm:h-[280px] lg:h-[340px] pointer-events-none select-none z-0 opacity-90 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1920 340"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Bottom-Right Silk Gradients */}
            <linearGradient id="abSilkCrimsonBR" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#4c0519" />
              <stop offset="20%" stopColor="#881337" />
              <stop offset="50%" stopColor="#b00045" />
              <stop offset="80%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#fda4af" />
            </linearGradient>
            <linearGradient id="abSilkPurpleBR" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#1e0240" />
              <stop offset="25%" stopColor="#410682" />
              <stop offset="60%" stopColor="#6d28d9" />
              <stop offset="85%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#c4b5fd" />
            </linearGradient>
            <linearGradient id="abSilkGreenBR" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#14532d" />
              <stop offset="25%" stopColor="#365314" />
              <stop offset="60%" stopColor="#4d7c0f" />
              <stop offset="85%" stopColor="#a2d865" />
              <stop offset="100%" stopColor="#d9f99d" />
            </linearGradient>

            {/* Specular Luster Highlight for Bottom Silk */}
            <linearGradient id="abLusterBR" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="85%" stopColor="#ffffff" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
            </linearGradient>

            {/* Silk Drop Shadow for Bottom Wave */}
            <filter id="abSilkShadowBR" x="-10%" y="-20%" width="120%" height="140%">
              <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#000000" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* Crimson Ribbon - Top layer of sweeping wave */}
          <path
            d="M -50 310 C 350 260, 750 180, 1150 210 C 1450 235, 1720 160, 2000 35"
            stroke="url(#abSilkCrimsonBR)"
            strokeWidth="36"
            strokeLinecap="round"
            filter="url(#abSilkShadowBR)"
          />
          {/* Crimson Specular Luster Sheen */}
          <path
            d="M -50 310 C 350 260, 750 180, 1150 210 C 1450 235, 1720 160, 2000 35"
            stroke="url(#abLusterBR)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Royal Purple Ribbon - Middle layer of sweeping wave */}
          <path
            d="M -50 338 C 360 288, 760 208, 1160 238 C 1460 263, 1730 188, 2000 63"
            stroke="url(#abSilkPurpleBR)"
            strokeWidth="32"
            strokeLinecap="round"
          />
          {/* Purple Specular Luster Sheen */}
          <path
            d="M -50 338 C 360 288, 760 208, 1160 238 C 1460 263, 1730 188, 2000 63"
            stroke="url(#abLusterBR)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Pistachio Green Ribbon - Bottom layer of sweeping wave */}
          <path
            d="M -50 366 C 370 316, 770 236, 1170 266 C 1470 291, 1740 216, 2000 91"
            stroke="url(#abSilkGreenBR)"
            strokeWidth="38"
            strokeLinecap="round"
          />
          {/* Green Specular Luster Sheen */}
          <path
            d="M -50 366 C 370 316, 770 236, 1170 266 C 1470 291, 1740 216, 2000 91"
            stroke="url(#abLusterBR)"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
