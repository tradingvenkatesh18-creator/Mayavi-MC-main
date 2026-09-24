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
}: LogoProps) {
  // Height sizing mapping for maximum visibility across headers and footers
  const heightMap = {
    xs: 'h-6 md:h-7',
    sm: 'h-7 md:h-8',
    md: 'h-12 md:h-14',
    lg: 'h-20 md:h-24',
    xl: 'h-32 md:h-36'
  };

  return (
    <div className={`flex items-center space-x-2 sm:space-x-3 shrink-0 ${className} select-none`}>
      {/* 1st Image: logo-e.png with high contrast & ambient amber glow */}
      <img 
        src="/logo-e.png" 
        alt="Mayavi Emblem Logo" 
        className={`${heightMap[iconSize]} w-auto object-contain brightness-110 contrast-110 drop-shadow-[0_0_12px_rgba(234,179,8,0.35)] transition-all duration-300 hover:scale-105 shrink-0`}
      />
      {/* 2nd Image: logo.png with vivid white contrast */}
      <img 
        src="/logo.png" 
        alt="Mayavi Brand Text Logo" 
        className={`${heightMap[iconSize]} w-auto object-contain brightness-110 contrast-105 drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 shrink-0`}
      />
    </div>
  );
}
