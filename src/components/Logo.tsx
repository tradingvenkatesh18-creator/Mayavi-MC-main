import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  theme?: 'dark' | 'light';
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  layout?: 'horizontal' | 'vertical';
  useOfficial?: boolean;
}

export default function Logo({ 
  className = '', 
  showText = true,
  iconSize = 'sm',
  layout = 'horizontal',
  useOfficial = false,
  theme = 'dark',
}: LogoProps) {
  // Height sizing mapping for maximum visibility across headers and footers
  const heightMap: Record<string, string> = {
    xs: 'h-8 md:h-9',
    sm: 'h-10 md:h-12',
    md: 'h-16 md:h-20',
    lg: 'h-24 md:h-28',
    xl: 'h-32 md:h-40',
    '2xl': 'h-40 md:h-48'
  };

  if (useOfficial) {
    return (
      <div className={`relative flex items-center shrink-0 ${className} select-none group`}>
        {/* Ambient Warm Golden Halo Glow behind emblem matching Brand Guidelines */}
        <div
          className="absolute -top-4 left-6 w-36 h-36 rounded-full pointer-events-none opacity-45 blur-2xl group-hover:opacity-65 transition-opacity duration-500 -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(245, 227, 2, 0.85) 0%, rgba(123, 81, 168, 0.45) 55%, transparent 80%)'
          }}
        />
        <img 
          src="/official-mayavi-logo.png" 
          alt="Mayavi Media Creations" 
          className={`${heightMap[iconSize] || heightMap.xl} w-auto object-contain brightness-105 contrast-105 drop-shadow-[0_0_20px_rgba(245,227,2,0.45)] transition-all duration-300 hover:scale-[1.03] shrink-0`}
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center space-x-2 sm:space-x-3 shrink-0 ${className} select-none group`}>
      {/* Ambient warm golden halo behind navbar emblem */}
      <div
        className="absolute -top-1 -left-2 w-16 h-16 rounded-full pointer-events-none opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-300 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(245, 227, 2, 0.75) 0%, rgba(123, 81, 168, 0.3) 60%, transparent 100%)'
        }}
      />
      {/* 1st Image: logo-e.png with high contrast & ambient amber glow */}
      <img 
        src="/logo-e.png" 
        alt="Mayavi Emblem Logo" 
        className={`${heightMap[iconSize]} w-auto object-contain brightness-110 contrast-105 drop-shadow-[0_0_12px_rgba(245,227,2,0.4)] transition-all duration-300 hover:scale-105 shrink-0`}
      />
      {/* 2nd Image: logo-alabaster.png with official #f0ebd8 Alabaster cream text & #b00045 dot (Page 13 Brand Guidelines) */}
      {showText && (
        <img 
          src={theme === 'light' ? "/logo.png" : "/logo-alabaster.png"} 
          alt="Mayavi Brand Text Logo" 
          className={`${heightMap[iconSize]} w-auto object-contain brightness-110 contrast-105 drop-shadow-[0_2px_12px_rgba(240,235,216,0.3)] transition-all duration-300 hover:scale-105 shrink-0`}
        />
      )}
    </div>
  );
}
