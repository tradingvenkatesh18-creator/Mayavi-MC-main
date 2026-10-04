import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Trophy,
  Lightbulb,
  Newspaper,
  Star,
  Calendar,
  X,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Film
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
    { id: 'ALL', label: 'All Dispatches', icon: <Sparkles size={11} /> },
    { id: 'CONTEST', label: 'Castings & Contests', icon: <Trophy size={11} /> },
    { id: 'DIRECTOR_TIP', label: "Director's Tips", icon: <Lightbulb size={11} /> },
    { id: 'STUDIO_NEWS', label: 'Studio News', icon: <Newspaper size={11} /> },
    { id: 'TALENT_SPOTLIGHT', label: 'Talent Spotlight', icon: <Star size={11} /> }
  ];

  // Filter published posts
  const publishedPosts = posts.filter(p => p.published !== false);

  const filteredPosts = publishedPosts.filter(post => {
    if (selectedCategory === 'ALL') return true;
    return post.category === selectedCategory;
  });

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

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'CONTEST':
        return {
          label: 'CASTING & CONTEST',
          bg: 'bg-[#b00045]/15',
          border: 'border-[#b00045]/40',
          text: 'text-[#f0ebd8]',
          badgeDot: 'bg-[#b00045]',
          icon: <Trophy size={12} className="text-[#f7e503]" />
        };
      case 'DIRECTOR_TIP':
        return {
          label: "DIRECTOR'S CRAFT",
          bg: 'bg-[#400582]/30',
          border: 'border-[#f7e503]/40',
          text: 'text-[#f7e503]',
          badgeDot: 'bg-[#f7e503]',
          icon: <Lightbulb size={12} className="text-[#f7e503]" />
        };
      case 'STUDIO_NEWS':
        return {
          label: 'STUDIO NEWS',
          bg: 'bg-[#a2d865]/15',
          border: 'border-[#a2d865]/35',
          text: 'text-[#a2d865]',
          badgeDot: 'bg-[#a2d865]',
          icon: <Newspaper size={12} className="text-[#a2d865]" />
        };
      case 'TALENT_SPOTLIGHT':
        return {
          label: 'TALENT ENDORSEMENT',
          bg: 'bg-[#f7e503]/15',
          border: 'border-[#f7e503]/40',
          text: 'text-[#f7e503]',
          badgeDot: 'bg-[#f7e503]',
          icon: <Star size={12} className="text-[#f7e503]" />
        };
      default:
        return {
          label: 'DISPATCH',
          bg: 'bg-white/10',
          border: 'border-white/20',
          text: 'text-white',
          badgeDot: 'bg-white',
          icon: <Sparkles size={12} className="text-white" />
        };
    }
  };

  return (
    <section id="gazette" className="relative z-10 py-24 lg:py-36 bg-[#050505] border-t border-white/5 overflow-visible">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-5 w-[450px] h-[450px] bg-[#400582]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-5 w-[450px] h-[450px] bg-[#f7e503]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle geometric watermark backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-[0.03]">
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] stroke-white stroke-[0.5]" fill="none">
          <circle cx="450" cy="450" r="350" />
          <circle cx="450" cy="450" r="250" strokeDasharray="8 8" />
          <circle cx="450" cy="450" r="150" />
          <line x1="450" y1="0" x2="450" y2="900" />
          <line x1="0" y1="450" x2="900" y2="450" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* SECTION HEADER */}
        <div className="max-w-3xl space-y-4 mb-14 text-left">
          {/* Glowing Founder Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#400582]/40 border border-[#f7e503]/35 backdrop-blur-md shadow-[0_0_20px_rgba(247,229,3,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f7e503] animate-pulse" />
            <span className="font-mono text-[8.5px] tracking-[0.25em] text-[#f7e503] uppercase font-bold">
              FOUNDER'S GAZETTE // CURATED BY {founderName.toUpperCase()}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-light font-serif text-[#f0ebd8] tracking-wide leading-tight">
            The Studio Dispatch
          </h2>

          <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed tracking-wide font-light max-w-2xl">
            Live audition calls, cinema craft notes, and talent endorsements published directly from the studio floor. Spearheaded by Founder &amp; CEO <span className="text-[#f7e503] font-serif italic font-medium">{founderName}</span> to empower emerging actors, models, and visual storytellers.
          </p>

          {/* Founder Identity Card */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#f7e503]/40 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#400582] via-[#7b51a8] to-[#f7e503]/40 border border-[#f7e503]/50 flex items-center justify-center text-xs font-serif italic text-[#f0ebd8] font-bold shadow-[0_0_15px_rgba(247,229,3,0.25)]">
                VS
              </div>
              <div>
                <p className="font-serif italic text-xs text-white font-medium">{founderName}</p>
                <p className="font-mono text-[7.5px] tracking-[0.2em] text-[#f7e503] uppercase font-semibold">Founder &amp; Executive Editor</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-white/50 font-mono text-[9px] tracking-wider uppercase">
              <Sparkles size={11} className="text-[#f7e503]" />
              <span>Direct Studio Broadcast &amp; Talent Pipeline</span>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="flex items-center gap-2.5 mb-10 border-b border-white/5 pb-6 overflow-x-auto no-scrollbar max-w-full">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[8.5px] tracking-widest uppercase transition-all duration-300 border cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#400582]/60 border-[#f7e503]/60 text-[#f7e503] font-bold shadow-[0_0_20px_rgba(247,229,3,0.2)]'
                    : 'bg-white/[0.02] border-white/10 text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* POSTS GRID */}
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/10 my-8">
            <p className="text-white/50 font-mono text-xs uppercase tracking-widest">
              No dispatches currently listed in this category. Check back shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post) => {
              const theme = getCategoryTheme(post.category);
              return (
                <div
                  key={post.id}
                  onClick={() => setActiveModalPost(post)}
                  className={`group relative flex flex-col justify-between p-6 lg:p-7 rounded-2xl bg-[#0a071b]/60 backdrop-blur-xl border border-white/10 hover:border-[#f7e503]/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] cursor-pointer overflow-hidden ${
                    post.featured ? 'ring-1 ring-[#f7e503]/30' : ''
                  }`}
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#400582]/20 via-transparent to-[#f7e503]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Top: Category Pill, Badge & Date */}
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[7.5px] font-mono tracking-widest uppercase font-semibold border ${theme.bg} ${theme.border} ${theme.text}`}>
                        <span className={`w-1 h-1 rounded-full ${theme.badgeDot}`} />
                        <span>{theme.label}</span>
                      </div>

                      <div className="flex items-center gap-1 text-white/40 font-mono text-[8px] tracking-wider uppercase">
                        <Calendar size={10} className="text-white/30" />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    {post.badgeText && (
                      <p className="font-mono text-[8px] tracking-[0.2em] text-[#f7e503] uppercase font-bold">
                        {post.badgeText}
                      </p>
                    )}

                    {/* Title */}
                    <h3 className="font-serif text-xl lg:text-2xl text-[#f0ebd8] group-hover:text-white transition-colors duration-300 font-light leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-white/60 font-sans text-xs leading-relaxed font-light line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Bottom: Action Button & Author signature */}
                  <div className="relative z-10 pt-6 mt-6 border-t border-white/5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-serif italic text-xs text-white/50 group-hover:text-white/80 transition-colors">
                        {post.author || `By ${founderName}`}
                      </span>

                      <span className="inline-flex items-center gap-1 font-mono text-[8.5px] text-[#f7e503] tracking-widest uppercase font-bold group-hover:translate-x-1 transition-transform">
                        <span>{post.actionText || 'Read Note'}</span>
                        <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================ */}
        {/* VIP NEWSLETTER SUBSCRIPTION BAR — THE DIRECTOR'S CIRCLE      */}
        {/* ============================================================ */}
        <div className="mt-16 lg:mt-24 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12092b] via-[#090616] to-[#050505] border border-white/10 p-8 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
          {/* Subtle brand graphic wave backdrop */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#400582]/25 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-[#f7e503]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            {/* Left: Value Proposition */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f7e503]/10 border border-[#f7e503]/30">
                <Sparkles size={11} className="text-[#f7e503]" />
                <span className="font-mono text-[8px] text-[#f7e503] tracking-widest uppercase font-bold">
                  VIP DISPATCH // ZERO NOISE
                </span>
              </div>

              <h3 className="font-serif text-2xl md:text-4xl text-[#f0ebd8] font-light leading-tight">
                Step Inside the Director's Circle
              </h3>

              <p className="text-white/70 font-sans text-xs md:text-sm font-light leading-relaxed max-w-xl">
                Get priority notifications for upcoming auditions, private acting masterclasses, and executive branding essays curated by <span className="text-[#f7e503] font-serif italic">{founderName}</span> before they are released publicly on social media.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-white/40 font-mono text-[8px] tracking-widest uppercase pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#a2d865]" />
                  Priority Casting Alerts
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#f7e503]" />
                  Directorial Masterclasses
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#b00045]" />
                  Exclusive Screenings
                </span>
              </div>
            </div>

            {/* Right: Subscription Input */}
            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full px-5 py-3.5 rounded-full bg-white/[0.04] border border-white/15 focus:border-[#f7e503] text-white placeholder-white/40 font-sans text-xs tracking-wide focus:outline-none transition-all shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="px-6 py-3.5 rounded-full bg-[#f7e503] hover:bg-[#ffe600] text-[#050505] font-mono text-[9px] tracking-[0.2em] uppercase font-extrabold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_5px_20px_rgba(247,229,3,0.3)] cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    <span>{isSubscribing ? 'JOINING...' : 'JOIN CIRCLE'}</span>
                    <Send size={11} className="text-[#050505]" />
                  </button>
                </div>

                {subscribeStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-sans font-light ${
                      subscribeStatus.success
                        ? 'bg-[#a2d865]/15 border border-[#a2d865]/40 text-[#a2d865]'
                        : 'bg-red-500/15 border border-red-500/40 text-red-300'
                    }`}
                  >
                    <CheckCircle2 size={13} className="shrink-0" />
                    <span className="text-[11px]">{subscribeStatus.message}</span>
                  </motion.div>
                )}

                <p className="text-white/30 font-mono text-[7.5px] tracking-wider uppercase text-left pl-2">
                  Encrypted &amp; confidential. Unsubscribe anytime with 1-click.
                </p>
              </form>
            </div>
          </div>
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
                    <span className="px-3 py-1 rounded-full bg-[#400582] text-[#f7e503] font-mono text-[8px] tracking-widest uppercase font-bold border border-[#f7e503]/40">
                      {activeModalPost.category.replace('_', ' ')}
                    </span>
                    <span className="text-white/40 font-mono text-[8.5px] tracking-wider uppercase">
                      {activeModalPost.date}
                    </span>
                  </div>

                  {activeModalPost.badgeText && (
                    <p className="font-mono text-[9px] tracking-[0.25em] text-[#f7e503] uppercase font-bold">
                      {activeModalPost.badgeText}
                    </p>
                  )}

                  <h3 className="font-serif text-2xl md:text-3xl text-[#f0ebd8] font-light leading-snug">
                    {activeModalPost.title}
                  </h3>
                </div>

                {/* Author Monogram */}
                <div className="flex items-center gap-3 py-3 border-y border-white/5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#400582] via-[#7b51a8] to-[#f7e503]/40 border border-[#f7e503]/50 flex items-center justify-center text-xs font-serif italic text-[#f0ebd8] font-bold">
                    VS
                  </div>
                  <div>
                    <p className="font-serif italic text-xs text-white font-medium">
                      {activeModalPost.author || founderName}
                    </p>
                    <p className="font-mono text-[7.5px] tracking-[0.2em] text-[#f7e503] uppercase font-semibold">
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
                      Official Mayavi Studio Dispatch
                    </span>

                    <a
                      href={activeModalPost.actionUrl}
                      target={activeModalPost.actionUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (onSelectAction) onSelectAction(activeModalPost.actionUrl || '');
                        setActiveModalPost(null);
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#f7e503] hover:bg-[#ffe600] text-[#050505] font-mono text-[9px] tracking-[0.2em] uppercase font-extrabold flex items-center justify-center gap-2 transition-all shadow-[0_5px_20px_rgba(247,229,3,0.3)]"
                    >
                      <span>{activeModalPost.actionText || 'Take Action'}</span>
                      <ArrowUpRight size={12} />
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
