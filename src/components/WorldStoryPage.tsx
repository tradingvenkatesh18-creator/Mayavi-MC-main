import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Camera, 
  Sliders, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Send,
  Loader2,
  SlidersHorizontal,
  Compass,
  Cpu,
  Tv,
  CheckCircle2,
  Film
} from 'lucide-react';
import { CreativeWorld } from '../App';

interface WorldStoryPageProps {
  world: CreativeWorld;
  onClose: () => void;
  onNavigateToWorld: (world: CreativeWorld) => void;
  allWorlds: CreativeWorld[];
}

export function WorldStoryPage({ 
  world, 
  onClose, 
  onNavigateToWorld, 
  allWorlds 
}: WorldStoryPageProps) {
  const [enrollName, setEnrollName] = useState<string>('');
  const [enrollEmail, setEnrollEmail] = useState<string>('');
  const [enrollMessage, setEnrollMessage] = useState<string>('');
  const [enrollTier, setEnrollTier] = useState<string>('Standard Suite');
  const [enrollSubmitted, setEnrollSubmitted] = useState<boolean>(false);
  const [enrollCode, setEnrollCode] = useState<string>('');
  const [enrollLoading, setEnrollLoading] = useState<boolean>(false);
  

  const handleEnrollmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollLoading(true);
    
    // Construct the WhatsApp message details
    const textMessage = `Greetings Mayavi! I would like to initiate an inquiry under ${world.title}:

• Name: ${enrollName}
• Email: ${enrollEmail}
• Tier: ${enrollTier}
• Message: ${enrollMessage}`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/916301761783?text=${encodedText}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      const randHex = Math.random().toString(16).substring(2, 7).toUpperCase();
      const code = `MAYAVI-${world.number}-${randHex}`;
      setEnrollCode(code);
      setEnrollLoading(false);
      setEnrollSubmitted(true);
    }, 1200);
  };

  const nextWorld = allWorlds.find(
    w => parseInt(w.number) === (parseInt(world.number) % allWorlds.length) + 1
  );

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-amber-500/30 overflow-x-hidden font-sans">
      
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 bg-grain opacity-[0.015] pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-[400px] h-[400px] bg-purple-950/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] bg-amber-950/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Tall Vertical Margin Stripe (pattern-8) & Ambient Pattern Watermarks */}
      <div 
        className="absolute left-2 md:left-6 top-0 bottom-0 w-[40px] md:w-[60px] opacity-[0.22] pointer-events-none mix-blend-screen bg-repeat-y z-0"
        style={{ backgroundImage: "url('/patterns/pattern-8.svg')", backgroundSize: 'contain' }}
      />
      <div
        className="absolute top-10 right-0 w-[450px] h-[550px] opacity-[0.08] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none"
        style={{ backgroundImage: "url('/patterns/pattern-9.svg')" }}
      />
      <div
        className="absolute bottom-10 right-0 w-[500px] h-[600px] opacity-[0.07] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none"
        style={{ backgroundImage: "url('/patterns/pattern-6.svg')" }}
      />

      {/* FIXED HEADER ACCENT FOR PREMIUM SUBPAGE FEEL */}
      <header className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 text-white/60 hover:text-white font-mono text-[9px] tracking-widest uppercase transition-colors group cursor-pointer"
          >
            <ArrowLeft size={12} className="transform transition-transform group-hover:-translate-x-1 duration-300" />
            <span>BACK TO HOMEPAGE</span>
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <span className="font-mono text-[9px] text-[#EAB308] tracking-[0.25em] uppercase font-bold">
            MAYAVI CREATIVE WORLD // {world.number}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full border border-white/10 hover:border-[#EAB308]/40 text-white/70 hover:text-[#EAB308] transition-all cursor-pointer group"
        >
          <X size={14} className="transform transition-transform group-hover:rotate-90 duration-300" />
        </button>
      </header>

      {/* HERO BANNER CHAPTER PORTAL */}
      <section className="relative w-full aspect-[21/10] md:aspect-[21/9] min-h-[350px] bg-neutral-950 overflow-hidden border-b border-white/10 flex items-end">
        <div className="absolute inset-0 z-0">
          <img 
            src={world.imageUrl} 
            alt={world.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[0.55] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 md:pb-20 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-3 bg-amber-400/5 border border-amber-400/15 px-3.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#EAB308] rounded-full animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#EAB308] uppercase font-bold">
                WORLD {world.number} • {world.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-light font-serif text-white tracking-wide leading-tight">
              {world.title}
            </h1>
            
            <p className="text-amber-100/80 font-serif italic text-base md:text-xl font-light leading-relaxed max-w-2xl">
              "{world.tagline}"
            </p>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-20">
          
          {/* LEFT SIDE: MAGAZINE EDITORIAL NARRATIVE */}
          <div className="md:col-span-7 space-y-16 relative">
            {/* Background Narrative Watermark (pattern-6) */}
            <div 
              className="absolute -top-10 -left-20 w-[450px] h-[550px] opacity-[0.15] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0" 
              style={{ backgroundImage: "url('/patterns/pattern-6.svg')" }} 
            />
            
            {/* Part 1: Narrative */}
            <div className="space-y-6 text-left relative z-10">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-[#EAB308] tracking-widest uppercase block font-bold">
                  // THE NARRATIVE
                </span>
                <h3 className="text-2xl md:text-3xl font-light font-serif italic text-white/95 leading-snug">
                  A vision tailored for visual distinction.
                </h3>
              </div>
              <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed tracking-wide font-light">
                {world.detailedStory}
              </p>
              <p className="text-white/60 font-sans text-xs md:text-sm leading-relaxed tracking-wide font-light">
                Every project commissioned under this world follows a hyper-custom production pipeline. We combine rigorous pre-visualization techniques with top-tier cinematography tools to build visual content that refuses to be ignored.
              </p>
              
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 mt-6">
                <span className="font-mono text-[9px] text-[#EAB308] tracking-widest uppercase block font-bold">
                  CREATIVE ORIENTATION
                </span>
                <p className="text-white/80 font-sans text-xs font-light leading-relaxed">
                  Mayavi Media Creations operates with a direct filmmaker-led approach. You communicate directly with creators, ensuring zero translation losses between your vision and final projection screens.
                </p>
              </div>
            </div>

            <div className="h-[1px] bg-white/5 w-full" />

            {/* Part 2: Core Disciplines */}
            <div className="space-y-8 text-left">
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-[#EAB308] tracking-widest uppercase block font-bold">
                  // CORE DISCIPLINES
                </span>
                <h3 className="text-2xl font-light font-serif text-white">
                  Creative Streams & Methods
                </h3>
              </div>

              <div className="space-y-6">
                {world.disciplines.map((d, index) => (
                  <div key={index} className="group relative overflow-hidden flex gap-4 p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all">
                    {/* Hover-brightening Background Pattern (Only this card glows) */}
                    <div 
                      className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.55] pointer-events-none mix-blend-screen bg-no-repeat bg-cover bg-center transition-opacity duration-[400ms]" 
                      style={{ backgroundImage: `url('/patterns/b${(index % 5) + 1}.svg')` }} 
                    />
                    <div className="relative z-10 w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 text-amber-400 font-mono text-xs font-bold">
                      0{index + 1}
                    </div>
                    <div className="relative z-10 space-y-1 text-left">
                      <h4 className="font-display font-bold text-sm text-white/95">{d.title}</h4>
                      <p className="text-xs text-white/60 leading-relaxed font-light">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: PREMIUM GATEWAY FORM & SYSTEM SPECS (40% width) */}
          <div className="md:col-span-5">
            <div className="sticky top-28 space-y-6">
              
              {/* Inquiry Registry Card */}
              <div className="relative overflow-hidden bg-[#090715]/90 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">

                <div className="space-y-2 text-left">
                  <span className="font-mono text-[8px] tracking-[0.3em] text-[#EAB308] uppercase block">
                    — ENTRANCE REGISTRY —
                  </span>
                  <h3 className="text-xl md:text-2xl font-light font-serif italic text-white">
                    Initiate Inquiry
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    A dedicated creative director will review your inquiry details within exactly twenty-four hours.
                  </p>
                </div>

                <div className="h-[1px] bg-white/5 w-full" />

                <AnimatePresence mode="wait">
                  {enrollSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 text-center py-10"
                    >
                      <div className="w-14 h-14 bg-amber-400/10 rounded-full border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400">
                        <CheckCircle2 size={24} />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-serif font-light text-xl text-white">
                          Inquiry Received
                        </h4>
                        <p className="text-xs text-white/60 max-w-sm mx-auto font-light leading-relaxed">
                          Your inquiry sequence is successfully registered on our security ledger. Write down your dynamic authorization token below.
                        </p>
                      </div>

                      <div className="bg-black/60 border border-amber-400/20 rounded-xl p-4 font-mono text-center space-y-1">
                        <span className="text-[7.5px] text-white/40 tracking-widest block uppercase">Inquiry ID Token</span>
                        <span className="text-xs text-amber-400 font-bold tracking-widest">{enrollCode}</span>
                      </div>

                      <button
                        onClick={() => setEnrollSubmitted(false)}
                        className="px-6 py-2.5 rounded-full border border-white/10 text-[9px] font-mono tracking-widest text-white hover:bg-white/5 transition-all cursor-pointer uppercase"
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleEnrollmentSubmit}
                      className="space-y-5 text-left"
                    >
                      {/* Tier Selection */}
                      <div className="space-y-2">
                        <label className="font-mono text-[8px] text-white/40 tracking-widest uppercase block">
                          Select Inquiry Engagement Tier
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {['Standard Suite', 'Bespoke Production'].map((tier) => (
                            <button
                              key={tier}
                              type="button"
                              onClick={() => setEnrollTier(tier)}
                              className={`px-3 py-2.5 rounded-xl border font-mono text-[9px] tracking-widest text-center transition-all cursor-pointer ${enrollTier === tier ? 'bg-amber-400/10 border-amber-400/40 text-amber-400 font-bold' : 'bg-black/40 border-white/5 text-white/50 hover:bg-white/[0.03]'}`}
                            >
                              {tier}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Coordinates */}
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] text-white/40 tracking-widest uppercase block">
                          Client Coordinates
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={enrollName}
                          onChange={(e) => setEnrollName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 text-xs font-light transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={enrollEmail}
                          onChange={(e) => setEnrollEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 text-xs font-light transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[8px] text-white/40 tracking-widest uppercase block">
                          Narrative Objective
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Tell us about your brand's story, creative ambitions, and expected deadlines..."
                          value={enrollMessage}
                          onChange={(e) => setEnrollMessage(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 text-xs font-light transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={enrollLoading}
                        className="w-full py-4 rounded-xl text-xs font-mono tracking-widest bg-[#EAB308] hover:bg-amber-600 text-black font-extrabold transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        {enrollLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>DRAFTING CONTRACT BLUEPRINT...</span>
                          </div>
                        ) : (
                          <>
                            <span>Transmit Secure Inquiry</span>
                            <Send size={11} className="text-black" />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Optics & Calibrations specs block */}
              <div className="relative overflow-hidden bg-neutral-900/40 border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                {/* Background Watermark Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.22] pointer-events-none mix-blend-screen bg-no-repeat bg-cover bg-center" 
                  style={{ backgroundImage: "url('/patterns/pattern-7.svg')" }} 
                />
                <div className="space-y-2 text-left">
                  <span className="font-mono text-[9px] text-[#EAB308] tracking-widest uppercase block font-bold">
                    // SYSTEM SPECS
                  </span>
                  <h3 className="text-xl font-light font-serif text-white">
                    Optics & Calibrations
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {world.specs.map((spec, index) => (
                    <div key={index} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-left">
                      <span className="font-mono text-[7px] text-[#EAB308] tracking-widest uppercase block">
                        {spec.label}
                      </span>
                      <p className="text-[11px] text-white/90 font-sans font-medium leading-snug">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl border border-dashed border-white/10 bg-black/45 flex items-center space-x-3 text-left">
                  <SlidersHorizontal size={18} className="text-amber-400 shrink-0" />
                  <div>
                    <span className="font-mono text-[7px] text-white/40 tracking-widest uppercase block">
                      SYSTEM INTEGRATION
                    </span>
                    <p className="text-[10px] text-white/75 font-light mt-0.5 leading-relaxed">
                      All camera sensor setups and sound calibration profiles are fully customized based on project requirements.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NAVIGATOR (NEXT WORLD TRAILER) */}
      {nextWorld && (
        <section className="border-t border-white/5 bg-[#0B0914] py-16 md:py-24 text-center relative overflow-hidden group/next-banner">
          <div className="absolute inset-0 z-0 opacity-40">
            <img 
              src={nextWorld.imageUrl} 
              alt={nextWorld.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.2] transition-transform duration-[2000ms] group-hover/next-banner:scale-103"
            />
          </div>
          
          {/* Interactive Pattern Watermark Overlay (pattern-11) */}
          <div 
            className="absolute top-0 right-0 w-[160px] h-[160px] md:w-[220px] md:h-[220px] opacity-[0.35] pointer-events-none mix-blend-screen bg-no-repeat bg-contain -translate-y-1/4 translate-x-1/4 transition-all duration-1000 ease-out group-hover/next-banner:rotate-[45deg] group-hover/next-banner:scale-110 z-0"
            style={{ backgroundImage: "url('/patterns/pattern-11.svg')" }}
          />
          
          <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-6">
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase font-bold block">
              NEXT CREATIVE CHAPTER
            </span>
            
            <h3 className="text-3xl md:text-5xl font-light font-serif italic text-white/90">
              World 0{nextWorld.number} — {nextWorld.title}
            </h3>
            
            <p className="text-white/50 text-xs md:text-sm font-light max-w-lg mx-auto leading-relaxed">
              "{nextWorld.tagline}"
            </p>

            <div className="pt-4">
              <button
                onClick={() => {
                  onNavigateToWorld(nextWorld);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-full border border-amber-400/20 hover:border-amber-400 bg-amber-400/5 hover:bg-amber-400/10 text-[9px] font-mono tracking-widest text-amber-400 transition-all cursor-pointer uppercase"
              >
                <span>ENTER NEXT WORLD</span>
                <ArrowRight size={11} />
              </button>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
