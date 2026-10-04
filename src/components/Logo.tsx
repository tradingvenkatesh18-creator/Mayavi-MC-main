import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  theme?: 'dark' | 'light';
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'horizontal' | 'vertical';
  useOfficial?: boolean;
}

export default function Logo({ 
  className = '', 
  iconSize = 'sm',
  useOfficial = false,
}: LogoProps) {
  // Height sizing mapping for maximum visibility across headers and footers
  const heightMap = {
    xs: 'h-7 md:h-8',
    sm: 'h-9 md:h-11',
    md: 'h-14 md:h-16',
    lg: 'h-20 md:h-24',
    xl: 'h-32 md:h-36'
  };

  if (useOfficial) {
    return (
      <div className={`flex items-center shrink-0 ${className} select-none`}>
        <img 
          src="/official-mayavi-logo.png" 
          alt="Mayavi Media Creations" 
          className={`${heightMap[iconSize]} w-auto object-contain brightness-110 drop-shadow-[0_0_15px_rgba(234,179,8,0.35)] transition-all duration-300 hover:scale-105 shrink-0`}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 sm:space-x-3 shrink-0 ${className} select-none`}>
      {/* 1st Image: logo-e.png with high contrast & ambient amber glow */}
      <img 
        src="/logo-e.png" 
        alt="Mayavi Emblem Logo" 
        className={`${heightMap[iconSize]} w-auto object-contain brightness-110 contrast-110 drop-shadow-[0_0_12px_rgba(234,179,8,0.35)] transition-all duration-300 hover:scale-105 shrink-0`}
      />
      {/* 2nd Image: logo-alabaster.png with official #f0ebd8 Alabaster cream text & #b00045 dot (Page 13 Brand Guidelines) */}
      <img 
        src={theme === 'light' ? "/logo.png" : "/logo-alabaster.png"} 
        alt="Mayavi Brand Text Logo" 
        className={`${heightMap[iconSize]} w-auto object-contain brightness-105 contrast-105 drop-shadow-[0_2px_12px_rgba(240,235,216,0.25)] transition-all duration-300 hover:scale-105 shrink-0`}
      />
    </div>
  );
}
