import React, { useState, useRef, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import {
  ArrowUpRight,
  Instagram,
  Youtube,
  Linkedin,
  MessageSquare,
  Mail
} from 'lucide-react';
import { CMSData, recordNewsletterSubscriber } from '../lib/cmsStore';
import Logo from './Logo';

interface FooterSectionProps {
  cms: CMSData;
  setContactOpen: (open: boolean) => void;
  navigateToAdmin?: () => void;
  setShowreelOpen?: (open: boolean) => void;
}

export default function FooterSection({
  cms,
  setContactOpen,
  navigateToAdmin,
  setShowreelOpen
}: FooterSectionProps) {
  const footerRef = useRef<HTMLElement>(null);
  const [footerEmail, setFooterEmail] = useState('');
  const [isFooterSubscribing, setIsFooterSubscribing] = useState(false);
  const [footerSubscribeStatus, setFooterSubscribeStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Interactive mouse spotlight & 3D parallax
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const mouseX = useSpring(0, { stiffness: 45, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 45, damping: 25 });

  const ribbonLeftX = useTransform(mouseX, [-1, 1], [-18, 18]);
  const ribbonLeftY = useTransform(mouseY, [-1, 1], [-14, 14]);

  const ribbonRightX = useTransform(mouseX, [-1, 1], [20, -20]);
  const ribbonRightY = useTransform(mouseY, [-1, 1], [15, -15]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail.trim()) return;
    setIsFooterSubscribing(true);
    setTimeout(() => {
      const res = recordNewsletterSubscriber(footerEmail, 'website_footer_vip_dispatch');
      setFooterSubscribeStatus(res);
      setIsFooterSubscribing(false);
      if (res.success) {
        setFooterEmail('');
      }
    }, 400);
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 w-full bg-[#07020e] border-t border-white/10 overflow-hidden py-16 sm:py-24 lg:py-32 select-none transition-colors duration-700"
    >
      {/* ============================================================ */}
      {/* 1. LAYERED 3D VOLUMETRIC ACOUSTIC SILK RIBBONS BACKDROP      */}
      {/* 100% Faithful to Approved Nano Banana Visual Concept Mockup */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Atmospheric Ambient Light Blooms */}
        {/* Left Royal Purple Glow */}
        <div className="absolute top-1/4 -left-20 w-[600px] h-[550px] bg-[#410682]/35 rounded-full blur-[140px]" />
        {/* Center-Top Warm Golden Amber Bloom */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-amber-500/18 rounded-full blur-[130px]" />
        {/* Right Pistachio Lime & Crimson Bloom */}
        <div className="absolute top-1/3 -right-20 w-[550px] h-[500px] bg-[#a2d865]/16 rounded-full blur-[130px]" />
        <div className="absolute -bottom-20 right-1/4 w-[500px] h-[400px] bg-[#b00045]/18 rounded-full blur-[140px]" />

        {/* ------------------------------------------------------------ */}
        {/* 3D FLOWING SILK SOUNDWAVE RIBBONS (Zero Gravity Physics)     */}
        {/* ------------------------------------------------------------ */}

        {/* Left Purple Silk Ribbon */}
        <motion.div
          style={{ x: ribbonLeftX, y: ribbonLeftY }}
          className="absolute top-[18%] -left-12 sm:-left-6 md:left-[1%] z-[1] opacity-75 mix-blend-screen pointer-events-none"
        >
          <motion.img
            src="/patterns/official/footer/ribbon_left.png"
            alt="Acoustic Soundwave Ribbon Left"
            className="w-[180px] sm:w-[220px] md:w-[260px] h-auto drop-shadow-[0_15px_35px_rgba(65,6,130,0.5)]"
            animate={{
              y: [0, -14, 0],
              rotate: [0, 2.5, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Right Pistachio Lime Silk Ribbon */}
        <motion.div
          style={{ x: ribbonRightX, y: ribbonRightY }}
          className="absolute top-[22%] -right-12 sm:-right-6 md:right-[1%] z-[1] opacity-75 mix-blend-screen pointer-events-none"
        >
          <motion.img
            src="/patterns/official/footer/ribbon_right.png"
            alt="Acoustic Soundwave Ribbon Right"
            className="w-[180px] sm:w-[220px] md:w-[260px] h-auto drop-shadow-[0_15px_35px_rgba(162,216,101,0.35)]"
            animate={{
              y: [0, -18, 0],
              rotate: [0, -2.5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </motion.div>

        {/* Interactive Studio Spotlight Torch */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen transition-opacity duration-500 z-[2]"
          style={{
            background: `radial-gradient(circle 520px at ${cursorPos.x}px ${cursorPos.y}px, rgba(234, 179, 8, 0.14) 0%, rgba(65, 6, 130, 0.08) 40%, transparent 75%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>

      {/* ============================================================ */}
      {/* 2. THE GRAND ARCHITECTURAL FROSTED GLASS MONOLITH            */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="relative rounded-[28px] sm:rounded-[36px] md:rounded-[42px] border border-white/10 bg-[#0c051a]/65 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.95)] overflow-hidden p-7 sm:p-10 md:p-12 lg:p-16">
          
          {/* Specular Corner Glints matching Nano Banana approved mockup */}
          {/* Top-Left Corner Golden Amber Flare */}
          <div
            className="absolute -top-10 -left-10 w-44 h-44 pointer-events-none rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, rgba(245, 227, 2, 0.45) 0%, rgba(234, 179, 8, 0.18) 45%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />

          {/* Top 1px Specular Gradient Edge */}
          <div
            className="absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none opacity-85"
            style={{
              background: 'linear-gradient(90deg, rgba(245, 227, 2, 0.6) 0%, rgba(245, 227, 2, 0.2) 25%, transparent 55%, rgba(245, 227, 2, 0.3) 100%)',
            }}
          />

          {/* Right 1px Specular Vertical Line Edge */}
          <div
            className="absolute top-0 right-0 bottom-0 w-[1.5px] pointer-events-none opacity-70"
            style={{
              background: 'linear-gradient(180deg, rgba(245, 227, 2, 0.4) 0%, transparent 60%, rgba(162, 216, 101, 0.25) 100%)',
            }}
          />

          {/* Inner Ambient Sheen */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/50 pointer-events-none" />

          {/* Card Content Container */}
          <div className="relative z-10 space-y-10 sm:space-y-12 lg:space-y-14">

            {/* -------------------------------------------------------- */}
            {/* TOP HERO CTA ZONE: "LET'S CREATE CINEMA TOGETHER"         */}
            {/* -------------------------------------------------------- */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-10 border-b border-white/10">
              <div className="space-y-3 max-w-2xl text-left">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-white font-normal tracking-tight leading-[1.08] drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                  LET’S CREATE CINEMA
                  <br />
                  TOGETHER
                </h2>
                <p className="text-white/70 font-sans text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl">
                  Crafting iconic films, personal brands, bespoke creative talent, and memorable global experiences.
                </p>
              </div>

              {/* Action Buttons (Illuminated Gold + Frosted Dark Pill) */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 w-full sm:w-auto">
                {/* Primary Button: START A PROJECT ↗ */}
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5e302] to-[#c59b27] hover:brightness-110 active:scale-95 text-[#07020e] font-sans text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,227,2,0.35)] transition-all cursor-pointer group"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight size={14} className="text-black transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                {/* Secondary Button: SCHEDULE A CALL */}
                <a
                  href={`https://wa.me/${cms.integrations.whatsappNumber || '919971410306'}?text=Greetings%20Mayavi!%20I%20would%20love%20to%20schedule%20a%20direct%20consultation%20call%20with%20your%20directorial%20team.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#181126]/80 hover:bg-[#201734] border border-white/15 hover:border-white/30 text-white font-sans text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-md shadow-sm active:scale-95"
                >
                  <span>SCHEDULE A CALL</span>
                </a>
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* MIDDLE VIP NEWSLETTER CAPSULE DOCK (Streamlined)         */}
            {/* -------------------------------------------------------- */}
            <div className="rounded-full border border-white/10 bg-black/40 backdrop-blur-xl p-2 sm:p-2.5 flex flex-col md:flex-row items-center justify-between gap-3 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
              {/* Left Pill Toggle Beacon & Title */}
              <div className="flex items-center gap-3 px-3 py-1">
                <div className="px-3.5 py-1.5 rounded-full bg-[#1b152b] border border-white/10 flex items-center gap-2 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#a2d865] shadow-[0_0_10px_#a2d865] animate-pulse" />
                </div>
                <span className="font-mono text-xs sm:text-sm tracking-[0.2em] text-white/90 uppercase font-semibold whitespace-nowrap">
                  VIP NEWSLETTER // STUDIO UPDATES
                </span>
              </div>

              {/* Form: Glass Input + Champagne Subscribe Pill */}
              <form onSubmit={handleSubscribe} className="flex-1 max-w-xl flex items-center gap-2 w-full px-2">
                <div className="relative w-full">
                  <input
                    type="email"
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder="Email"
                    required
                    disabled={isFooterSubscribing}
                    className="w-full bg-[#120a22]/70 border border-white/10 focus:border-amber-400/60 rounded-full px-5 py-2.5 text-xs text-white placeholder-white/40 outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isFooterSubscribing}
                  className="px-6 sm:px-7 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5e302] to-[#c59b27] hover:brightness-110 active:scale-95 text-[#07020e] font-sans text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-[0_0_15px_rgba(245,227,2,0.25)] whitespace-nowrap disabled:opacity-50"
                >
                  {isFooterSubscribing ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                </button>
              </form>
            </div>

            {/* VIP Status Message */}
            {footerSubscribeStatus && (
              <div className={`text-xs font-mono tracking-wider text-center p-2 rounded-lg ${footerSubscribeStatus.success ? 'text-[#a2d865] bg-[#a2d865]/10 border border-[#a2d865]/30' : 'text-rose-400 bg-rose-950/20 border border-rose-500/30'}`}>
                {footerSubscribeStatus.message}
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* LOWER ZONE: 3D EMBLEM & 3-COLUMN STUDIO DIRECTORY        */}
            {/* -------------------------------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 text-left items-start pt-2">

              {/* COLUMN 1: OFFICIAL MAYAVI BRAND LOGO */}
              <div className="md:col-span-3 space-y-4">
                <div className="flex flex-col items-start gap-3">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    title="Mayavi Media Creations // Scroll to Top"
                    className="inline-block transition-transform hover:scale-105"
                  >
                    <Logo iconSize="lg" useOfficial={true} className="justify-start inline-block opacity-100 transition-opacity" />
                  </a>
                  <p className="text-white/55 text-xs leading-relaxed font-sans font-light max-w-xs">
                    Broadcasting, cinema production, personal brands, and high-impact visual storytelling.
                  </p>
                </div>

                {/* Social Icon Pills */}
                <div className="pt-2 flex flex-wrap gap-2 items-center">
                  {[
                    { icon: <Instagram size={13} />, href: 'https://instagram.com/mayavi_mediacreations', label: 'Instagram' },
                    { icon: <Youtube size={13} />, href: 'https://youtube.com/mayavimedia', label: 'YouTube' },
                    { icon: <Linkedin size={13} />, href: 'https://linkedin.com/company/mayavimedia', label: 'LinkedIn' },
                    { icon: <MessageSquare size={13} />, href: `https://wa.me/${cms.integrations.whatsappNumber || '919971410306'}?text=Greetings%20Mayavi!%20I%20would%20love%20to%20collaborate.`, label: 'WhatsApp' },
                    { icon: <Mail size={13} />, href: 'mailto:mayavistudios25@gmail.com', label: 'Email' }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      className="w-8 h-8 rounded-full border border-white/10 hover:border-[#f7e503]/60 flex items-center justify-center text-white/60 hover:text-[#f7e503] bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-300 hover:scale-110 shadow-sm"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Vertical Divider (Desktop) */}
              <div className="hidden md:block md:col-span-1 border-r border-white/10 h-32 my-auto" />

              {/* COLUMN 2: CREATIVE WORLDS */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f7e503]" />
                  <span className="font-mono text-xs text-[#f7e503] tracking-[0.2em] uppercase block font-bold">
                    CREATIVE WORLDS
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {[
                    { name: 'Media Production', href: '#creative-worlds' },
                    { name: 'Personal Branding', href: '#creative-worlds' },
                    { name: 'Talent Development', href: '#creative-worlds' },
                    { name: 'Events & Experiences', href: '#creative-worlds' }
                  ].map((world, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#f7e503]/50" />
                      <a
                        href={world.href}
                        className="group inline-block font-sans text-sm text-white/70 hover:text-white transition-colors duration-300 relative py-0.5"
                      >
                        {world.name}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#f7e503] group-hover:w-full transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COLUMN 3: DIRECTORIAL SLATE */}
              <div className="md:col-span-3 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#a2d865]" />
                  <span className="font-mono text-xs text-[#a2d865] tracking-[0.2em] uppercase block font-bold">
                    DIRECTORIAL SLATE
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {[
                    { name: 'Featured Films', href: '#portfolio' },
                    { name: 'Commercials', href: '#portfolio' },
                    { name: 'Docuseries', href: '#portfolio' },
                    { name: 'News & Tips', href: '#gazette' }
                  ].map((slate, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#a2d865]/50" />
                      <a
                        href={slate.href}
                        className="group inline-block font-sans text-sm text-white/70 hover:text-white transition-colors duration-300 relative py-0.5"
                      >
                        {slate.name}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#a2d865] group-hover:w-full transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COLUMN 4: COMPANY & CHANNELS */}
              <div className="md:col-span-3 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  <span className="font-mono text-xs text-white/90 tracking-[0.2em] uppercase block font-bold">
                    COMPANY &amp; CHANNELS
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {[
                    { name: 'Studio Story', href: '#about' },
                    { name: 'Collaborations', href: '#collaborations' },
                    { name: 'Client Stories', href: '#client-stories' },
                    { name: 'Contact & Slate', href: '#contact' }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-white/40" />
                      <a
                        href={item.href}
                        className="group inline-block font-sans text-sm text-white/70 hover:text-white transition-colors duration-300 relative py-0.5"
                      >
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/60 group-hover:w-full transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* CARD BASELINE & STUDIO TELEMETRY */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-white/70 font-mono text-xs tracking-wider uppercase">
                <span className="text-white/80">STUDIO HQ: HYDERABAD, INDIA</span>
                <span>•</span>
                <span className="text-white/80">GLOBAL REACH: AVAILABLE WORLDWIDE</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-mono text-xs tracking-widest text-[#EAB308] font-bold uppercase">
                  DIRECTED BY MAYAVI.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM COPYRIGHT STRIP */}
        <div className="mt-8 text-center">
          <span className="font-mono text-xs tracking-widest text-white/50 uppercase">
            © 2026 MAYAVI MEDIA CREATIONS. ALL ARCHITECTURAL RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </footer>
  );
}
