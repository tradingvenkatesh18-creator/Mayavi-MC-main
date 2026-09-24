"use client";

import React from "react";
import { InfiniteMovingCards, TestimonialExhibitionItem } from "@/src/components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="py-8 rounded-3xl flex flex-col antialiased bg-[#050505] border border-white/5 items-center justify-center relative overflow-hidden my-6 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.04)_0%,transparent_75%)] pointer-events-none" />
      
      <div className="mb-4 space-y-1.5 text-center relative z-10 px-4">
        <span className="font-mono text-[8.5px] tracking-[0.3em] text-[#EAB308] uppercase font-bold block">
          CONTINUOUS CREATIVE STREAM // ARCHIVAL REELS
        </span>
        <h3 className="text-2xl font-light font-serif italic text-white">
          Enduring Words From Industry Leaders
        </h3>
      </div>

      <InfiniteMovingCards
        items={demoTestimonials}
        direction="right"
        speed="slow"
        pauseOnHover={true}
      />
    </div>
  );
}

const demoTestimonials: TestimonialExhibitionItem[] = [
  {
    id: 'demo-1',
    author: 'Vikranth Varma',
    role: 'Lead Campaign Director',
    company: 'Tamada Media',
    category: 'BRAND FILMS',
    project: 'Digital Identity Integration',
    quote: 'Mayavi transformed our campaign into a cinematic experience, raising our brand presence to an absolute art form. Every shot was a masterpiece.',
    metrics: '+340% Audience Engagement • 1.8M Reach',
    image: '/testimonial_cameras.png',
    timecode: 'CAM A // TIMECODE [01:24:08]',
    audioDuration: '0:42',
    avatarBg: 'from-[#EAB308]/20 to-purple-600/10',
    publication: 'CINEPHILE QUARTERLY 2026',
    laurel: 'OFFICIAL SELECTION • SOUTH INDIA FILM FESTIVAL',
    rating: '★★★★★ 5.0 / CRITIC CHOICE',
    btsNotes: {
      camera: 'ARRI Alexa LF with Anamorphic Primes',
      lighting: 'Volumetric Tungsten Key & Cyan Edge Rim',
      grading: 'Kodak 250D Spectral Film LUT Emulation',
      directorComment: 'We lit the stage to evoke classic 70s neo-noir contrast while maintaining modern 9:16 mobile framing density.'
    }
  },
  {
    id: 'demo-2',
    author: 'Neha Reddy',
    role: 'Executive Creative Director',
    company: 'Nailed It Studios',
    category: 'FOUNDER PORTFOLIOS',
    project: 'Founder Legacy Series',
    quote: "Their ability to craft a visual identity that resonates with executive presence is unparalleled. They don't just shoot films; they write histories.",
    metrics: '98% Executive Approval • Global Syndication',
    image: '/testimonial_executive.png',
    timecode: 'CAM B // TIMECODE [02:11:45]',
    audioDuration: '0:35',
    avatarBg: 'from-purple-500/20 to-amber-500/10',
    publication: 'EXECUTIVE VISUAL DIGEST',
    laurel: 'WINNER • BEST EXECUTIVE BRAND FILM 2025',
    rating: '★★★★★ 5.0 / MASTERPIECE',
    btsNotes: {
      camera: 'RED V-Raptor 8K VV',
      lighting: 'Soft Octabox Diffusion + Warm Amber Rim',
      grading: 'Custom Monochrome Silver Halide LUT',
      directorComment: 'The goal was absolute authority—framing the founder against quiet negative space to amplify every spoken word.'
    }
  }
];
