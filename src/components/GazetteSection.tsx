import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Trophy,
  Lightbulb,
  Newspaper,
  Star,
  X,
  Send
} from 'lucide-react';
import { GazettePost, recordNewsletterSubscriber } from '../lib/cmsStore';

interface GazetteSectionProps {
  posts: GazettePost[];
  founderName?: string;
  onSelectAction?: (url: string) => void;
}

export default function GazetteSection({
  posts = [],
  founderName = 'Vishishta Saxena',
  onSelectAction
}: GazetteSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalPost, setActiveModalPost] = useState<GazettePost | null>(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const categories = [
    { id: 'ALL', label: 'All News & Tips', icon: <Sparkles size={12} className="text-[#f5e302]" /> },
    { id: 'CONTEST', label: 'Castings & Contests', icon: <Trophy size={12} className="text-[#f5e302]" /> },
    { id: 'DIRECTOR_TIP', label: "Director's Tips", icon: <Lightbulb size={12} className="text-[#f5e302]" /> },
    { id: 'STUDIO_NEWS', label: 'Studio News', icon: <Newspaper size={12} className="text-[#f5e302]" /> },
    { id: 'TALENT_SPOTLIGHT', label: 'Talent Spotlight', icon: <Star size={12} className="text-[#f5e302]" /> }
  ];

  // Filter published posts
  const publishedPosts = posts.filter(p => p.published !== false);

  const [showAllDispatches, setShowAllDispatches] = useState<boolean>(false);

  const filteredPosts = publishedPosts.filter(post => {
    if (selectedCategory === 'ALL') return true;
    return post.category === selectedCategory;
  });

  const displayedPosts = selectedCategory === 'ALL' && !showAllDispatches
    ? filteredPosts.slice(0, 3)
    : filteredPosts;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsSubscribing(true);
    setTimeout(() => {
      const res = recordNewsletterSubscriber(newsletterEmail, 'website_gazette_section');
      setSubscribeStatus(res);
      setIsSubscribing(false);
      if (res.success) {
        setNewsletterEmail('');
      }
    }, 400);
  };

  const getCategoryConfig = (cat: string) => {
    switch (cat) {
      case 'CONTEST':
        return {
          badgeLabel: 'CASTING & CONTEST',
          bannerGradient: 'bg-gradient-to-r from-[#70022d] via-[#b00045] to-[#70022d]',
          bannerBorder: 'border-[#b00045]/40',
          dotColor: 'bg-[#ff4d88]',
          isGoldCta: true,
          defaultCta: 'Apply For Audition',
          defaultTags: ['Ages 16–28', 'Hyderabad In-Person']
        };
      case 'DIRECTOR_TIP':
        return {
          badgeLabel: "DIRECTOR'S CRAFT",
          bannerGradient: 'bg-gradient-to-r from-[#2c045b] via-[#410682] to-[#2c045b]',
          bannerBorder: 'border-[#7c3aed]/40',
          dotColor: 'bg-[#a78bfa]',
          isGoldCta: false,
          defaultCta: 'Read Masterclass Note',
          defaultTags: ['Arri Alexa 35', '35mm Prime']
        };
      case 'STUDIO_NEWS':
        return {
          badgeLabel: 'STUDIO NEWS',
          bannerGradient: 'bg-gradient-to-r from-[#20400b] via-[#3f6e14] to-[#20400b]',
          bannerBorder: 'border-[#a2d865]/40',
          dotColor: 'bg-[#a2d865]',
          isGoldCta: false,
          defaultCta: 'Read Full Release',
          defaultTags: ['4K Web Series', 'Theatrical Standards']
        };
      case 'TALENT_SPOTLIGHT':
        return {
          badgeLabel: 'TALENT SPOTLIGHT',
          bannerGradient: 'bg-gradient-to-r from-[#503706] via-[#7d560c] to-[#503706]',
          bannerBorder: 'border-[#f5e302]/40',
          dotColor: 'bg-[#f5e302]',
          isGoldCta: false,
          defaultCta: 'View Talent Reel',
          defaultTags: ['Improv Lab', 'Hyderabad Direct']
        };
      default:
        return {
          badgeLabel: 'STUDIO UPDATE',
          bannerGradient: 'bg-gradient-to-r from-[#1c120c] via-[#38165c] to-[#1c120c]',
          bannerBorder: 'border-white/20',
          dotColor: 'bg-white',
          isGoldCta: false,
          defaultCta: 'Read Note',
          defaultTags: ['Official Slate', 'Mayavi Studio']
        };
    }
  };

  const getPostTags = (post: GazettePost) => {
    const config = getCategoryConfig(post.category);
    return config.defaultTags;
  };

  const getPostCta = (post: GazettePost) => {
    if (post.actionText) return post.actionText;
    const config = getCategoryConfig(post.category);
    return config.defaultCta;
  };

  return (
    <section id="gazette" className="relative z-10 py-24 lg:py-32 bg-[#07020e] overflow-hidden border-t border-white/5 select-none">
      {/* ============================================================ */}
      {/* BACKGROUND ATMOSPHERICS & OPTION D FRAMING SILK RIBBONS     */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Ambient Color Blooms */}
        <div className="absolute top-12 left-10 w-[550px] h-[550px] bg-[#410682]/35 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-5 w-[500px] h-[500px] bg-[#b00045]/28 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-[#a2d865]/18 rounded-full blur-[130px]" />

        {/* Diamond Matrix Watermark Pattern (Continuity with Footer & Contact pattern-3.svg) */}
        <div
          className="absolute inset-0 opacity-[0.16] pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: "url('/patterns/pattern-3.svg')",
            backgroundRepeat: 'repeat',
            backgroundSize: '180px 180px'
          }}
        />
      </div>

      {/* LEFT FLANK FRAMING RIBBONS (Pistachio Green + Purple + Crimson) */}
      <div className="absolute -top-10 -left-28 sm:-left-20 lg:-left-24 w-[320px] sm:w-[480px] lg:w-[580px] h-[650px] lg:h-[800px] pointer-events-none select-none z-0 opacity-85">
        <svg className="w-full h-full" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gzLeftGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bced78" />
              <stop offset="45%" stopColor="#a2d865" />
              <stop offset="100%" stopColor="#639430" />
            </linearGradient>
            <linearGradient id="gzLeftPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7522c7" />
              <stop offset="50%" stopColor="#410682" />
              <stop offset="100%" stopColor="#1e0240" />
            </linearGradient>
            <linearGradient id="gzLeftCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e32d69" />
              <stop offset="50%" stopColor="#b00045" />
              <stop offset="100%" stopColor="#630026" />
            </linearGradient>
            <filter id="gzGlowLeft" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.6" />
            </filter>
          </defs>
          {/* Pistachio Green Ribbon */}
          <path
            d="M-30 30 C 130 60, 260 170, 230 360 C 200 520, 60 620, -20 680"
            stroke="url(#gzLeftGreen)"
            strokeWidth="36"
            strokeLinecap="round"
            filter="url(#gzGlowLeft)"
          />
          {/* Imperial Purple Ribbon */}
          <path
            d="M-20 80 C 140 110, 230 220, 200 410 C 170 560, 70 650, -10 710"
            stroke="url(#gzLeftPurple)"
            strokeWidth="30"
            strokeLinecap="round"
          />
          {/* Crimson Ribbon */}
          <path
            d="M-10 130 C 150 160, 200 270, 170 450 C 140 590, 80 680, 0 740"
            stroke="url(#gzLeftCrimson)"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* RIGHT FLANK FRAMING RIBBONS (Crimson + Purple + Pistachio Green) */}
      <div className="absolute -top-10 -right-16 sm:-right-8 w-[320px] sm:w-[480px] lg:w-[600px] h-[650px] lg:h-[800px] pointer-events-none select-none z-0 opacity-85">
        <svg className="w-full h-full" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gzRightCrimson" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e32d69" />
              <stop offset="50%" stopColor="#b00045" />
              <stop offset="100%" stopColor="#630026" />
            </linearGradient>
            <linearGradient id="gzRightPurple" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7522c7" />
              <stop offset="50%" stopColor="#410682" />
              <stop offset="100%" stopColor="#1e0240" />
            </linearGradient>
            <linearGradient id="gzRightGreen" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bced78" />
              <stop offset="50%" stopColor="#a2d865" />
              <stop offset="100%" stopColor="#639430" />
            </linearGradient>
            <filter id="gzGlowRight" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#000000" floodOpacity="0.65" />
            </filter>
          </defs>
          {/* Crimson Ribbon */}
          <path
            d="M630 40 C 470 70, 360 210, 400 400 C 440 570, 530 680, 620 740"
            stroke="url(#gzRightCrimson)"
            strokeWidth="36"
            strokeLinecap="round"
            filter="url(#gzGlowRight)"
          />
          {/* Purple Ribbon */}
          <path
            d="M640 90 C 490 120, 390 260, 430 440 C 470 600, 550 700, 630 760"
            stroke="url(#gzRightPurple)"
            strokeWidth="30"
            strokeLinecap="round"
          />
          {/* Pistachio Green Ribbon */}
          <path
            d="M650 140 C 510 170, 420 300, 460 480 C 500 630, 570 720, 640 780"
            stroke="url(#gzRightGreen)"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* BOTTOM RIGHT SOLAR DOT ACCENT */}
      <div className="absolute bottom-28 right-8 md:right-16 pointer-events-none select-none opacity-45">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f5e302] block shadow-[0_0_12px_#f5e302]" />
      </div>

      {/* ============================================================ */}
      {/* MAIN CONTAINER CONTENT                                       */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* SECTION HEADER — MASTHEAD & FOUNDER SEAL (Shifted right for ribbon clearance) */}
        <div className="max-w-3xl space-y-3 mb-10 text-left pl-3 sm:pl-8 md:pl-14 lg:pl-16">
          {/* Dual Pill Indicators */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c120c]/80 border border-[#d4af37]/35 shadow-[0_0_15px_rgba(212,175,55,0.15)] backdrop-blur-md">
              <span className="font-mono text-[9px] tracking-[0.22em] text-[#e5c365] uppercase font-bold">
                MAYAVI NEWS &amp; TIPS // 2026
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a1e14]/80 border border-[#10b981]/35 shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#34d399] uppercase font-bold">
                UPDATED WEEKLY
              </span>
            </div>
          </div>

          {/* Section Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif text-white tracking-tight leading-tight pt-1">
            Studio News &amp; Tips
          </h2>

          {/* Subquote */}
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#f0ebd8]/80 font-normal">
            &ldquo;Where cinematic craft meets tomorrow&apos;s screen talent &mdash; casting calls, director filmmaking tips, and studio news.&rdquo;
          </p>

          {/* Founder Verification Seal */}
          <div className="inline-flex items-center gap-3 pt-2">
            <div className="w-8 h-8 rounded-full border border-[#d4af37]/60 bg-gradient-to-tr from-[#1a0f2b] via-[#38165c] to-[#0d091e] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <span className="font-serif italic font-bold text-xs text-[#f0ebd8]">VS</span>
            </div>
            <span className="font-sans text-xs sm:text-sm text-white/90 font-medium tracking-wide">
              {founderName} &mdash; Founder &amp; Director
            </span>
            <CheckCircle2 size={15} className="text-[#d4af37] shrink-0" />
          </div>
        </div>

        {/* CATEGORY FILTER PILLS STRIP (Shifted right to match header) */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto no-scrollbar pb-2 pl-3 sm:pl-8 md:pl-14 lg:pl-16">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-xs tracking-wide transition-all duration-300 border cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#d4af37]/25 via-[#f5e302]/15 to-[#d4af37]/25 border-[#d4af37] text-[#f5e302] font-semibold shadow-[0_0_20px_rgba(212,175,55,0.25)] scale-[1.02]'
                    : 'bg-[#120d24]/60 border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-white/5'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3-COLUMN FROSTED DOSSIER CARDS GRID */}
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#090717]/80 border border-white/10 my-8">
            <p className="text-white/50 font-mono text-xs uppercase tracking-widest">
              No articles currently listed in this category. Check back shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {displayedPosts.map((post) => {
              const config = getCategoryConfig(post.category);
              const tags = getPostTags(post);
              const ctaText = getPostCta(post);

              return (
                <div
                  key={post.id}
                  onClick={() => setActiveModalPost(post)}
                  className="group relative flex flex-col justify-between rounded-3xl bg-[#090717]/85 border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-[#d4af37]/45 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden text-left"
                >
                  {/* CARD TOP RADIANT GLOW BANNER */}
                  <div>
                    <div className={`${config.bannerGradient} ${config.bannerBorder} border-b px-5 py-2.5 flex items-center justify-between`}>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/35 border border-white/15 text-[8px] font-mono tracking-widest uppercase text-white font-medium">
                        <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
                        <span>{config.badgeLabel}</span>
                      </div>
                      <span className="font-mono text-[8px] tracking-widest uppercase text-white/70">
                        {post.date || 'OCTOBER 2026'}
                      </span>
                    </div>

                    {/* CARD BODY CONTENT */}
                    <div className="p-6 space-y-4">
                      {/* Title */}
                      <h3 className="font-serif text-lg md:text-xl text-white font-normal leading-snug group-hover:text-[#f0ebd8] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Requirement / Format Chips */}
                      <div className="flex flex-wrap items-center gap-2">
                        {tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-white/80 font-mono text-[9px] tracking-wider uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Excerpt */}
                      <p className="text-white/60 font-sans text-xs leading-relaxed font-light line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* CARD FOOTER */}
                  <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-white/5 mt-4">
                    {/* Author Byline */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full border border-[#d4af37]/40 bg-gradient-to-tr from-[#1a0f2b] to-[#38165c] flex items-center justify-center shrink-0">
                        <span className="font-serif italic font-bold text-[9px] text-[#f0ebd8]">VS</span>
                      </div>
                      <span className="font-sans text-xs text-white/80 font-medium truncate max-w-[120px]">
                        {post.author ? post.author.split('//')[0].trim() : founderName}
                      </span>
                    </div>

                    {/* Action Button */}
                    {config.isGoldCta ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (post.actionUrl) {
                            if (onSelectAction) onSelectAction(post.actionUrl);
                            else window.open(post.actionUrl, '_blank');
                          } else {
                            setActiveModalPost(post);
                          }
                        }}
                        className="bg-gradient-to-r from-[#d4af37] via-[#f5e302] to-[#c59b27] hover:brightness-110 active:scale-95 text-[#050505] font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 shadow-[0_4px_15px_rgba(212,175,55,0.35)] transition-all cursor-pointer shrink-0"
                      >
                        <span>{ctaText}</span>
                        <ArrowUpRight size={13} className="text-[#050505]" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (post.actionUrl && post.actionUrl.startsWith('http')) {
                            window.open(post.actionUrl, '_blank');
                          } else if (post.actionUrl && post.actionUrl.startsWith('#') && onSelectAction) {
                            onSelectAction(post.actionUrl);
                          } else {
                            setActiveModalPost(post);
                          }
                        }}
                        className="bg-white/[0.06] hover:bg-white/12 text-white border border-white/15 hover:border-white/30 text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 transition-all cursor-pointer shrink-0"
                      >
                        <span>{ctaText}</span>
                        <ArrowUpRight size={13} className="text-white/70" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Expandable toggle for additional archive posts when on All News & Tips */}
        {selectedCategory === 'ALL' && filteredPosts.length > 3 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAllDispatches(!showAllDispatches)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#d4af37]/40 text-white/70 hover:text-white font-mono text-[9px] tracking-widest uppercase transition-all cursor-pointer shadow-sm"
            >
              <span>{showAllDispatches ? 'Show 3 Featured Articles ▴' : `View All Articles (${filteredPosts.length}) ▾`}</span>
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* BOTTOM MASTER DOCK — TELEMETRY & NEWSLETTER UPDATES BAR      */}
        {/* ============================================================ */}
        <div className="mt-14 lg:mt-20 relative z-10">
          <div className="rounded-2xl md:rounded-full bg-[#0c081b]/85 border border-white/15 backdrop-blur-2xl p-4 sm:px-8 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            {/* Left Telemetry Zone */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-xs font-mono text-white/70 tracking-wider">
              <span>3 Active Castings</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>Weekly Notes</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>Verified NDA</span>
            </div>

            {/* Vertical Separator */}
            <div className="hidden md:block h-5 w-px bg-white/15 shrink-0" />

            {/* Right Newsletter Subscription Input */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <span className="font-serif text-sm text-[#f0ebd8] font-medium tracking-wide shrink-0">
                Studio Updates
              </span>
              <div className="relative w-full sm:w-auto flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email for audition & tip alerts..."
                  className="w-full sm:w-56 md:w-64 px-4 py-2 rounded-full bg-white/[0.04] border border-white/15 focus:border-[#d4af37] text-white placeholder-white/40 font-sans text-xs tracking-wide focus:outline-none transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5e302] to-[#c59b27] hover:brightness-110 active:scale-95 text-[#050505] font-mono text-[10px] tracking-wider uppercase font-bold transition-all shadow-[0_2px_15px_rgba(212,175,55,0.3)] cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {isSubscribing ? 'JOINING...' : 'GET UPDATES'}
                </button>
              </div>
            </form>
          </div>

          {/* Subscription Status Message Feedback */}
          {subscribeStatus && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-3 mx-auto max-w-md flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-sans ${
                subscribeStatus.success
                  ? 'bg-[#a2d865]/15 border border-[#a2d865]/40 text-[#a2d865]'
                  : 'bg-red-500/15 border border-red-500/40 text-red-300'
              }`}
            >
              <CheckCircle2 size={13} className="shrink-0" />
              <span>{subscribeStatus.message}</span>
            </motion.div>
          )}
        </div>

      </div>

      {/* ============================================================ */}
      {/* DETAILED ARTICLE / ANNOUNCEMENT MODAL                         */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModalPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalPost(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0b081c] border border-white/15 rounded-3xl p-6 md:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 max-h-[90vh] overflow-y-auto text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalPost(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="space-y-6">
                {/* Modal Top Metadata */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#410682]/60 text-[#f5e302] font-mono text-[8px] tracking-widest uppercase font-bold border border-[#d4af37]/40">
                      {activeModalPost.category.replace('_', ' ')}
                    </span>
                    <span className="text-white/40 font-mono text-[8.5px] tracking-wider uppercase">
                      {activeModalPost.date}
                    </span>
                  </div>

                  {activeModalPost.badgeText && (
                    <p className="font-mono text-[9px] tracking-[0.25em] text-[#f5e302] uppercase font-bold">
                      {activeModalPost.badgeText}
                    </p>
                  )}

                  <h3 className="font-serif text-2xl md:text-3xl text-white font-normal leading-snug">
                    {activeModalPost.title}
                  </h3>
                </div>

                {/* Author Monogram */}
                <div className="flex items-center gap-3 py-3 border-y border-white/5">
                  <div className="w-8 h-8 rounded-full border border-[#d4af37]/60 bg-gradient-to-tr from-[#1a0f2b] via-[#38165c] to-[#0d091e] flex items-center justify-center">
                    <span className="font-serif italic font-bold text-xs text-[#f0ebd8]">VS</span>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-white font-medium">
                      {activeModalPost.author || founderName}
                    </p>
                    <p className="font-mono text-[8px] tracking-[0.2em] text-[#e5c365] uppercase font-semibold">
                      Founder &amp; Executive Editor // Mayavi Media
                    </p>
                  </div>
                </div>

                {/* Image Banner if available */}
                {activeModalPost.imageUrl && (
                  <div className="rounded-2xl overflow-hidden border border-white/10 max-h-60">
                    <img
                      src={activeModalPost.imageUrl}
                      alt={activeModalPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Body Content */}
                <div className="space-y-4 font-sans text-xs md:text-sm text-white/80 font-light leading-relaxed whitespace-pre-line">
                  {activeModalPost.content || activeModalPost.excerpt}
                </div>

                {/* Modal Action CTA */}
                {activeModalPost.actionUrl && (
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-white/40 font-mono text-[8px] tracking-wider uppercase">
                      Official Mayavi Studio Article
                    </span>

                    <a
                      href={activeModalPost.actionUrl}
                      target={activeModalPost.actionUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (onSelectAction) onSelectAction(activeModalPost.actionUrl || '');
                        setActiveModalPost(null);
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5e302] to-[#c59b27] hover:brightness-110 active:scale-95 text-[#050505] font-mono text-[9px] tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                    >
                      <span>{activeModalPost.actionText || 'Take Action'}</span>
                      <ArrowUpRight size={13} className="text-[#050505]" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
