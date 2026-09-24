"use client";

import { cn } from "@/src/lib/utils";
import React, { useState } from "react";
import { Sparkles, Award, Sliders } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface TestimonialExhibitionItem {
  id: string;
  author: string;
  role: string;
  company: string;
  category: string;
  project: string;
  quote: string;
  metrics: string;
  image: string;
  timecode: string;
  publication: string;
  laurel: string;
  rating: string;
  audioDuration?: string;
  avatarBg?: string;
  btsNotes: {
    camera: string;
    lighting: string;
    grading: string;
    directorComment: string;
  };
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: TestimonialExhibitionItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow" | string | number;
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeBtsId, setActiveBtsId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const durationStr =
    typeof speed === "number"
      ? `${speed}s`
      : speed === "fast"
        ? "70s"
        : speed === "normal"
          ? "40s"
          : speed === "slow"
            ? "90s"
            : speed;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "scroller relative z-20 w-full max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_4%,white_96%,transparent)]",
        className
      )}
    >
      <ul
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-6",
          "animate-scroll"
        )}
        style={{
          animationDuration: durationStr,
          animationDirection: direction === "left" ? "forwards" : "reverse",
          animationPlayState: (isHovered || activeBtsId !== null) && pauseOnHover ? "paused" : "running"
        }}
      >
        {/* Render doubled list items for seamless continuous looping with full React event interactivity */}
        {[...items, ...items].map((item, idx) => {
          const uniqueKey = `${item.id}-${idx}`;
          const isBtsOpen = activeBtsId === uniqueKey;

          return (
            <li
              key={uniqueKey}
              className="relative w-[310px] sm:w-[420px] md:w-[580px] max-w-full shrink-0 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c0920]/95 via-[#070514]/95 to-[#030208] p-5 sm:p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)] transition-all duration-500 text-left group"
            >
              {/* Top Laurel & Rating Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/5">
                <div className="flex items-center space-x-2">
                  <Award size={13} className="text-[#EAB308]" />
                  <span className="font-mono text-[8px] text-amber-300 font-bold tracking-[0.2em] uppercase">
                    {item.laurel}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 font-mono text-[7.5px] text-amber-400 font-bold">
                  {item.rating}
                </span>
              </div>

              {/* Quote & Image Split */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                <div className="md:col-span-7 space-y-4">
                  <span className="font-mono text-[7.5px] text-white/40 tracking-widest uppercase block">
                    {item.publication}
                  </span>

                  <blockquote className="font-serif italic text-base md:text-lg leading-relaxed text-white/95 group-hover:text-white transition-colors line-clamp-3">
                    "{item.quote}"
                  </blockquote>

                  <div className="pt-3 border-t border-white/5 space-y-0.5">
                    <h4 className="font-sans text-sm text-white font-bold">{item.author}</h4>
                    <p className="font-mono text-[8.5px] text-[#EAB308] tracking-widest uppercase">
                      {item.company} // {item.role}
                    </p>
                    <p className="font-mono text-[7.5px] text-white/40 tracking-wider uppercase">
                      {item.metrics}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-xl group/img">
                    <img
                      src={item.image}
                      alt={item.author}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter grayscale brightness-[0.5] contrast-[1.05] group-hover/img:grayscale-0 group-hover/img:brightness-90 group-hover/img:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[7px] text-amber-400 font-bold">
                      <span>{item.company}</span>
                      <span className="text-white/40">EXHIBIT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Director BTS Button */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">
                  PROJECT: {item.project}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveBtsId(isBtsOpen ? null : uniqueKey);
                  }}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-[8px] tracking-widest uppercase border transition-all duration-300 cursor-pointer flex items-center space-x-1.5 ${isBtsOpen
                    ? 'bg-amber-500 text-black font-extrabold border-amber-400 shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                    : 'bg-white/5 text-white/80 hover:text-white hover:bg-white/10 border-white/15'
                    }`}
                >
                  <Sliders size={11} />
                  <span>{isBtsOpen ? 'HIDE BTS' : 'DIRECTOR BTS'}</span>
                </button>
              </div>

              {/* Director BTS Drawer Overlay inside Card */}
              <AnimatePresence>
                {isBtsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-4 pt-4 border-t border-amber-500/30 bg-black/60 rounded-2xl p-4 space-y-3 font-mono text-[8.5px] text-left"
                  >
                    <div className="flex items-center space-x-1.5 text-amber-400">
                      <Sparkles size={12} />
                      <span className="font-bold tracking-widest uppercase">DIRECTOR'S OPTICS BLUEPRINT</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[8px]">
                      <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                        <span className="text-white/40 uppercase block">RIG:</span>
                        <span className="text-white font-bold">{item.btsNotes.camera}</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                        <span className="text-white/40 uppercase block">LUT:</span>
                        <span className="text-white font-bold">{item.btsNotes.grading}</span>
                      </div>
                    </div>

                    <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 font-serif italic text-xs text-white/90">
                      "{item.btsNotes.directorComment}"
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </li>
          );
        })}
      </ul>
    </div>
  );
};
