"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from "motion/react";
import { ArrowRight, Play, Sparkles } from "lucide-react";

interface LensScrollProps {
  onExploreWork?: () => void;
  onWatchShowreel?: () => void;
  onStartProject?: () => void;
}

export default function LensScroll({ onExploreWork, onWatchShowreel, onStartProject }: LensScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFrameNum, setCurrentFrameNum] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameCount = 80;

  // Direct, instant 1-to-1 mapping from scroll position to frame index (1 to 80)
  const currentIndex = useTransform(scrollYProgress, [0, 0.88], [1, frameCount], { clamp: true });

  // Dynamic horizontal lens offset on desktop screens (percentage of canvas width)
  // Stage 1 (0% -> 22%): +22% to right, leaving left side clear for text
  // Stage 2 (26% -> 56%): -20% to left, leaving right side clear for optics text
  // Stage 3 (60% -> 95%): 0% center behind CTA box
  const lensXOffsetTransform = useTransform(
    scrollYProgress,
    [0, 0.22, 0.28, 0.56, 0.64],
    [0.22, 0.22, -0.20, -0.20, 0]
  );

  // STRICT STAGE TRANSITIONS & VISIBILITY (NO OVERLAP)
  // Stage 1 (Hero): 0% -> 22% scroll
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 1, 0]);
  const stage1Y = useTransform(scrollYProgress, [0, 0.22], ["0px", "-60px"]);
  const stage1Visibility = useTransform(scrollYProgress, (v) => (v >= 0.22 ? "hidden" : "visible"));

  // Stage 2 (Optics): 26% -> 56% scroll
  const stage2Opacity = useTransform(scrollYProgress, [0.26, 0.34, 0.48, 0.56], [0, 1, 1, 0]);
  const stage2Y = useTransform(scrollYProgress, [0.26, 0.34, 0.48, 0.56], ["60px", "0px", "0px", "-60px"]);
  const stage2Visibility = useTransform(scrollYProgress, (v) => (v >= 0.24 && v <= 0.57 ? "visible" : "hidden"));

  // Stage 3 (CTA): 60% -> 95% scroll
  const stage3Opacity = useTransform(scrollYProgress, [0.60, 0.68, 0.88, 0.95], [0, 1, 1, 0]);
  const stage3Y = useTransform(scrollYProgress, [0.60, 0.68], ["60px", "0px"]);
  const stage3Visibility = useTransform(scrollYProgress, (v) => (v >= 0.58 ? "visible" : "hidden"));

  // Layout Settlement & ResizeObserver Hook
  useEffect(() => {
    const forceLayoutUpdate = () => {
      window.dispatchEvent(new Event("resize"));
    };

    if ("fonts" in document) {
      document.fonts.ready.then(forceLayoutUpdate);
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(forceLayoutUpdate);
    });

    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      forceLayoutUpdate();
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll Locking & Reset during Asset Preloading
  useEffect(() => {
    if (isLoading) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const drawImage = (index: number) => {
    if (images.length === 0 || !canvasRef.current) return;

    const safeIndex = Math.min(Math.max(1, index), frameCount) - 1;
    const img = images[safeIndex];
    if (!img || !img.naturalWidth || !img.naturalHeight) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth || 300;
    const height = window.innerHeight || 300;

    const displayWidth = Math.round(width * dpr);
    const displayHeight = Math.round(height * dpr);

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }

    if (canvas.width <= 0 || canvas.height <= 0) return;

    const imgWidth = img.naturalWidth || img.width || 1;
    const imgHeight = img.naturalHeight || img.height || 1;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvas.width / canvas.height;

    let renderWidth, renderHeight, x, y;

    const isMobile = width < 768;

    if (isMobile) {
      // FULLSCREEN COVER ON MOBILE: Fills 100% of screen height and width edge-to-edge
      renderHeight = canvas.height;
      renderWidth = canvas.height * imgRatio;
      if (renderWidth < canvas.width) {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgRatio;
      }
      x = (canvas.width - renderWidth) / 2;
      y = (canvas.height - renderHeight) / 2;
    } else {
      if (canvasRatio < imgRatio) {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgRatio;
        x = 0;
        y = (canvas.height - renderHeight) / 2;
      } else {
        renderWidth = canvas.height * imgRatio;
        renderHeight = canvas.height;
        x = (canvas.width - renderWidth) / 2;
        y = 0;
      }

      // Apply smooth horizontal offset on desktop to prevent text overlap
      const offsetX = canvas.width * lensXOffsetTransform.get();
      x += offsetX;
    }

    // Pre-fill canvas with exact brand onyx background #0B0914 to ensure no color mismatch
    ctx.fillStyle = "#0B0914";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw 3D lens frame
    ctx.drawImage(img, x, y, renderWidth, renderHeight);

    // --- SOFT EDGE FEATHERING AROUND IMAGE BOUNDARIES ---
    // Calculate fade distances for 4 edges of the image rectangle
    const fadeW = Math.max(40, renderWidth * 0.20);
    const fadeH = Math.max(40, renderHeight * 0.20);

    // Left Edge Softening Gradient
    const leftGrad = ctx.createLinearGradient(x, 0, x + fadeW, 0);
    leftGrad.addColorStop(0, "rgba(11, 9, 20, 1)");
    leftGrad.addColorStop(0.5, "rgba(11, 9, 20, 0.7)");
    leftGrad.addColorStop(1, "rgba(11, 9, 20, 0)");
    ctx.fillStyle = leftGrad;
    ctx.fillRect(x - 2, y - 2, fadeW + 2, renderHeight + 4);

    // Right Edge Softening Gradient
    const rightGrad = ctx.createLinearGradient(x + renderWidth - fadeW, 0, x + renderWidth, 0);
    rightGrad.addColorStop(0, "rgba(11, 9, 20, 0)");
    rightGrad.addColorStop(0.5, "rgba(11, 9, 20, 0.7)");
    rightGrad.addColorStop(1, "rgba(11, 9, 20, 1)");
    ctx.fillStyle = rightGrad;
    ctx.fillRect(x + renderWidth - fadeW, y - 2, fadeW + 4, renderHeight + 4);

    // Top Edge Softening Gradient
    const topGrad = ctx.createLinearGradient(0, y, 0, y + fadeH);
    topGrad.addColorStop(0, "rgba(11, 9, 20, 1)");
    topGrad.addColorStop(0.5, "rgba(11, 9, 20, 0.7)");
    topGrad.addColorStop(1, "rgba(11, 9, 20, 0)");
    ctx.fillStyle = topGrad;
    ctx.fillRect(x - 2, y - 2, renderWidth + 4, fadeH + 2);

    // Bottom Edge Softening Gradient
    const bottomGrad = ctx.createLinearGradient(0, y + renderHeight - fadeH, 0, y + renderHeight);
    bottomGrad.addColorStop(0, "rgba(11, 9, 20, 0)");
    bottomGrad.addColorStop(0.5, "rgba(11, 9, 20, 0.7)");
    bottomGrad.addColorStop(1, "rgba(11, 9, 20, 1)");
    ctx.fillStyle = bottomGrad;
    ctx.fillRect(x - 2, y + renderHeight - fadeH, renderWidth + 4, fadeH + 4);

    // --- RADIAL SOFT VIGNETTE MASK CENTERED ON IMAGE ---
    const imgCenterX = x + (renderWidth / 2);
    const imgCenterY = y + (renderHeight / 2);
    const minDim = Math.min(renderWidth, renderHeight);
    const r0 = Math.max(0, minDim * 0.20);
    const r1 = Math.max(r0 + 10, minDim * 0.48);

    if (isFinite(r0) && isFinite(r1) && r0 >= 0 && r1 > 0) {
      const radGradient = ctx.createRadialGradient(
        imgCenterX, imgCenterY, r0,
        imgCenterX, imgCenterY, r1
      );
      radGradient.addColorStop(0, "rgba(11, 9, 20, 0)");
      radGradient.addColorStop(0.5, "rgba(11, 9, 20, 0.3)");
      radGradient.addColorStop(0.85, "rgba(11, 9, 20, 0.85)");
      radGradient.addColorStop(1, "rgba(11, 9, 20, 1.0)");
      ctx.fillStyle = radGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Linear bottom gradient mask for smooth section transition
    const bottomMask = ctx.createLinearGradient(0, canvas.height * 0.72, 0, canvas.height);
    bottomMask.addColorStop(0, "rgba(11, 9, 20, 0)");
    bottomMask.addColorStop(1, "rgba(11, 9, 20, 1.0)");
    ctx.fillStyle = bottomMask;
    ctx.fillRect(0, canvas.height * 0.72, canvas.width, canvas.height * 0.28);
  };

  useEffect(() => {
    let isCancelled = false;
    const loadImages = async () => {
      setIsLoading(true);
      const promises = Array.from({ length: frameCount }, (_, idx) => {
        const i = idx + 1;
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          const paddedIndex = i.toString().padStart(3, "0");
          img.onload = async () => {
            try {
              if ("decode" in img) {
                await img.decode();
              }
            } catch (e) { }
            resolve(img);
          };
          img.onerror = () => resolve(img);
          img.src = `/split-video/ffout${paddedIndex}.gif`;
        });
      });

      const loadedImages = await Promise.all(promises);
      if (!isCancelled) {
        setImages(loadedImages);
        setIsLoading(false);
      }
    };

    loadImages();
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isLoading && images.length > 0) {
      const initialFrame = Math.round(currentIndex.get()) || 1;
      drawImage(initialFrame);
      requestAnimationFrame(() => {
        drawImage(initialFrame);
      });
    }

    const handleResize = () => {
      const current = Math.round(currentIndex.get()) || 1;
      drawImage(current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoading, images, currentIndex]);

  useMotionValueEvent(currentIndex, "change", (latest) => {
    const rounded = Math.round(latest);
    drawImage(rounded);
  });

  useMotionValueEvent(lensXOffsetTransform, "change", () => {
    const current = Math.round(currentIndex.get()) || 1;
    drawImage(current);
  });

  return (
    <div id="home" ref={containerRef} className="relative h-[340vh] md:h-[380vh] bg-[#0B0914] text-white font-sans selection:bg-amber-500/30">

      {/* STICKY CANVAS CONTAINER */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-10">

        {/* Preloader */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0914] gap-5"
            >
              <div className="w-10 h-10 border border-white/10 border-t-[#EAB308] rounded-full animate-spin"></div>
              <span className="font-mono text-[10px] text-[#EAB308] tracking-[0.3em] uppercase">Preloading Optics</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Lens Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-contain pointer-events-none will-change-transform transform-gpu" />

        {/* ============================================================== */}
        {/* STAGE 1: HERO (0% -> 22% Scroll) */}
        {/* ============================================================== */}
        <motion.div
          style={{ opacity: stage1Opacity, y: stage1Y, visibility: stage1Visibility }}
          className="absolute inset-0 z-30 flex flex-col justify-center items-center md:items-start px-4 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto w-full pointer-events-none"
        >
          <div className="max-w-xl text-center md:text-left pointer-events-auto space-y-4 sm:space-y-6 bg-[#0B0914]/75 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-5 sm:p-6 md:p-0 rounded-2xl md:rounded-none border border-white/10 md:border-none shadow-2xl md:shadow-none mx-2 sm:mx-0 relative z-40">
            <div className="flex items-center gap-2.5 justify-center md:justify-start">
              <div className="w-6 md:w-8 h-[1px] bg-[#EAB308]/60"></div>
              <span className="text-[#EAB308] font-mono text-[8.5px] sm:text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] uppercase font-semibold">
                Stories That Inspire • Visuals That Stay
              </span>
            </div>

            <h1 className="font-serif font-light text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] md:leading-[1.08] tracking-tight text-white">
              We Craft Powerful <br className="hidden sm:block" />
              <span className="italic font-serif text-[#EAB308] drop-shadow-md">
                Visual Stories
              </span>
            </h1>

            <p className="text-white/70 md:text-white/60 font-sans text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-md mx-auto md:mx-0">
              From brand films to digital experiences, we transform ideas into cinematic stories that connect and inspire.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center md:justify-start relative z-50 pointer-events-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onExploreWork?.();
                }}
                className="bg-[#EAB308] hover:bg-amber-400 text-black font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-bold py-3.5 px-7 md:px-8 rounded-full shadow-[0_4px_25px_rgba(234,179,8,0.3)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-98 w-full sm:w-auto pointer-events-auto"
              >
                <span>EXPLORE OUR WORK</span>
                <ArrowRight size={13} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onWatchShowreel?.();
                }}
                className="bg-white/10 md:bg-white/5 border border-white/20 md:border-white/15 hover:border-[#EAB308]/40 hover:bg-white/15 text-white font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase py-3.5 px-7 md:px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer active:scale-98 w-full sm:w-auto pointer-events-auto"
              >
                <div className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center">
                  <Play size={8} className="fill-white text-white ml-0.5" />
                </div>
                <span>WATCH SHOWREEL</span>
              </button>
            </div>
          </div>
        </motion.div>


        {/* ============================================================== */}
        {/* STAGE 2: PRECISION CRAFT (26% -> 56% Scroll) */}
        {/* ============================================================== */}
        <motion.div
          style={{ opacity: stage2Opacity, y: stage2Y, visibility: stage2Visibility }}
          className="absolute inset-0 z-20 flex flex-col justify-center items-center md:items-end px-4 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto w-full pointer-events-none text-center md:text-right"
        >
          <div className="max-w-xl text-center md:text-right pointer-events-auto flex flex-col items-center md:items-end space-y-4 sm:space-y-6 bg-[#0c081e]/85 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-5 sm:p-6 md:p-0 rounded-2xl md:rounded-none border border-[#EAB308]/20 md:border-none shadow-2xl md:shadow-none mx-2 sm:mx-0">
            <div className="flex items-center gap-2.5 justify-center md:justify-end">
              <span className="text-[#EAB308] font-mono text-[8.5px] sm:text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] uppercase font-semibold">02 / OPTICAL DISASSEMBLY</span>
              <div className="w-6 md:w-8 h-[1px] bg-[#EAB308]/60"></div>
            </div>

            <h2 className="font-serif font-light text-2.5xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white">
              Unrivaled Precision in <br className="hidden sm:block" />
              <span className="italic font-serif text-[#EAB308]">
                Every Optics Layer
              </span>
            </h2>

            <p className="text-white/70 md:text-white/60 font-sans text-xs sm:text-sm md:text-base font-light max-w-md leading-relaxed mx-auto md:mx-0">
              Every element is engineered to capture light, depth, and raw emotion with uncompromised clarity.
            </p>

            <div className="bg-[#0c081e]/90 md:bg-[#0c081e]/85 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-[#EAB308]/25 max-w-xs text-left font-mono text-[10px] sm:text-[11px] text-white/70 space-y-2 shadow-xl mx-auto md:mr-0 w-full sm:w-auto">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/40">FORMAT</span>
                <span className="text-white/90">ANAMORPHIC RAW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">ELEMENTS</span>
                <span className="text-[#EAB308] font-bold">14 OPTICAL GROUPS</span>
              </div>
            </div>
          </div>
        </motion.div>


        {/* ============================================================== */}
        {/* STAGE 3: CALL TO ACTION (60% -> 95% Scroll) */}
        {/* ============================================================== */}
        <motion.div
          style={{ opacity: stage3Opacity, y: stage3Y, visibility: stage3Visibility }}
          className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4 sm:px-6 text-center max-w-3xl mx-auto w-full pointer-events-none"
        >
          <div className="bg-[#070414]/90 backdrop-blur-xl p-6 sm:p-12 md:p-14 rounded-2xl border border-[#EAB308]/25 pointer-events-auto flex flex-col items-center shadow-[0_0_60px_rgba(0,0,0,0.85)] w-full">
            <span className="text-[#EAB308] font-mono text-[8.5px] sm:text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] uppercase font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <Sparkles size={12} className="text-[#EAB308]" />
              MAYAVI MEDIA CREATIONS
            </span>

            <h2 className="font-serif font-light text-2.5xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 sm:mb-6 text-white leading-tight">
              Ready to Craft Your <br />
              <span className="italic font-serif text-[#EAB308]">
                Next Masterpiece?
              </span>
            </h2>

            <p className="text-white/70 md:text-white/60 font-sans text-xs sm:text-sm md:text-base font-light max-w-md mb-6 sm:mb-8 leading-relaxed">
              We partner with visionary brands and creators to build cinematic films that leave a lasting imprint.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onStartProject}
                className="bg-[#EAB308] hover:bg-amber-400 text-black font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-bold py-3.5 px-8 sm:px-9 rounded-full transition-all duration-300 cursor-pointer shadow-[0_4px_25px_rgba(234,179,8,0.3)] hover:scale-105 active:scale-98 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>START A PROJECT</span>
                <ArrowRight size={13} />
              </button>
              <button
                onClick={onExploreWork}
                className="bg-white/10 md:bg-white/5 border border-white/20 md:border-white/15 hover:border-[#EAB308]/40 hover:bg-white/15 text-white font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase py-3.5 px-8 sm:px-9 rounded-full transition-all duration-300 cursor-pointer active:scale-98 w-full sm:w-auto"
              >
                VIEW PORTFOLIO
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
