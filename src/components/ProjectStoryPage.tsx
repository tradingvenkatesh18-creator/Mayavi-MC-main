import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ArrowRight, 
  Camera, 
  Sliders, 
  Layers, 
  Activity, 
  Compass, 
  Tv, 
  Cpu, 
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Info
} from 'lucide-react';
import { getVideoEmbedUrl, detectVideoPlatform } from '../lib/videoUtils';

// Re-declare interface to guarantee alignment
export interface CinematicProject {
  id: string;
  title: string;
  category: string;
  duration: string;
  imageUrl: string;
  camera: string;
  lens: string;
  location: string;
  storyBrief: string;
  scenes: string[];
  editorialSentence: string;
  detailedStory?: string;
  behindTheScenes?: string;
  productionProcess?: { step: string; title: string; desc: string; }[];
  results?: string;
  videoUrl?: string;
}

interface ProjectStoryPageProps {
  project: CinematicProject;
  onClose: () => void;
  onNavigateToProject: (project: CinematicProject) => void;
  allProjects: CinematicProject[];
  soundEnabled: boolean;
  toggleSound: () => void;
}

export function ProjectStoryPage({ 
  project, 
  onClose, 
  onNavigateToProject, 
  allProjects,
  soundEnabled,
  toggleSound
}: ProjectStoryPageProps) {
  const [activeTab, setActiveTab] = useState<'story' | 'process' | 'tech'>('story');
  const [selectedLut, setSelectedLut] = useState<'LOG-C' | 'KODAK-5207' | 'FUJI-ETERNAL' | 'MONO-GRAIN'>('LOG-C');
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [waveformValue, setWaveformValue] = useState<number[]>(Array.from({ length: 24 }, () => Math.random() * 80 + 20));
  const [sensorTemperature, setSensorTemperature] = useState<string>('34.2 °C');
  const [videoOpen, setVideoOpen] = useState<boolean>(false);

  // Next project finder
  const currentIdx = allProjects.findIndex(p => p.id === project.id);
  const nextProject = allProjects[(currentIdx + 1) % allProjects.length];

  // Simulating live telemetry / wave animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setWaveformValue(Array.from({ length: 24 }, () => Math.random() * 80 + 20));
        setSensorTemperature((34.0 + Math.random() * 0.8).toFixed(1) + ' °C');
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle scene cycling
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveSceneIndex(prev => (prev + 1) % project.scenes.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, project.scenes.length]);

  // Look-up-table color transformation presets
  const getLutClass = () => {
    switch (selectedLut) {
      case 'KODAK-5207': return 'brightness-[1.05] contrast-[1.12] saturate-[1.15] sepia-[0.1]';
      case 'FUJI-ETERNAL': return 'brightness-[0.98] contrast-[1.05] saturate-[0.9] hue-rotate-[5deg]';
      case 'MONO-GRAIN': return 'grayscale brightness-[1.1] contrast-[1.2]';
      case 'LOG-C':
      default: return 'brightness-[0.85] contrast-[0.95] saturate-[0.8]';
    }
  };

  return (
    <div id={`story-page-${project.id}`} className="min-h-screen w-full bg-[#03010a] text-white overflow-x-hidden font-sans relative selection:bg-amber-400 selection:text-black">
      {/* Sci-fi glow assets & grid watermarks */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,3,15,1)_0%,rgba(10,5,30,0.4)_50%,rgba(3,1,10,1)_100%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(109,40,217,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-[30vh] -left-48 w-[500px] h-[500px] bg-purple-950/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20vh] -right-48 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Cybernetic Grid Overlay Lines & Ambient Pattern Watermarks */}
      <div className="absolute inset-0 bg-grid-light opacity-[0.02] pointer-events-none" />

      <div
        className="absolute top-20 -right-20 w-[550px] h-[650px] opacity-[0.08] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none"
        style={{ backgroundImage: "url('/patterns/pattern-8.svg')" }}
      />
      <div
        className="absolute top-[45%] -left-20 w-[500px] h-[600px] opacity-[0.07] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none"
        style={{ backgroundImage: "url('/patterns/pattern-4.svg')" }}
      />
      <div
        className="absolute bottom-20 -right-20 w-[500px] h-[600px] opacity-[0.07] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none"
        style={{ backgroundImage: "url('/patterns/pattern-10.svg')" }}
      />

      {/* FIXED METADATA DOCKED HEADER BAR */}
      <header className="sticky top-0 z-50 w-full bg-[#03010a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 md:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button 
            onClick={onClose}
            className="flex items-center space-x-2.5 text-[10px] font-mono tracking-[0.25em] text-white/50 hover:text-amber-400 hover:scale-[1.02] transition-all uppercase cursor-pointer"
          >
            <span>← EXIT TO EXHIBITION</span>
          </button>
          <span className="h-4 w-[1px] bg-white/10 hidden md:block" />
          <div className="hidden md:flex items-center space-x-3 font-mono text-[9px] text-white/30 tracking-widest">
            <span>INDEX // {project.id}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span>REC2020 CINE</span>
          </div>
        </div>

        {/* Dynamic Project Status / Telemetry bar */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-3 text-[9px] font-mono tracking-widest border border-white/5 px-3.5 py-1.5 rounded bg-white/5">
            <span className="text-white/40">LUT:</span>
            <span className="text-amber-400 font-bold">{selectedLut}</span>
            <span className="text-white/20">|</span>
            <span className="text-white/40">TEMP:</span>
            <span className="text-[#8B5CF6] font-mono">{sensorTemperature}</span>
          </div>
          
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 transition-all flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      </header>

      {/* HERO SECTION — STAGE 1 */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-end p-6 md:p-16 overflow-hidden">
        {/* Dynamic background canvas displaying active cinematic scene */}
        <div className="absolute inset-0">
          {!videoOpen ? (
            <>
              <motion.img 
                key={activeSceneIndex}
                src={project.scenes[activeSceneIndex]} 
                alt={project.title}
                referrerPolicy="no-referrer"
                initial={{ scale: 1.05, opacity: 0.3 }}
                animate={{ scale: 1, opacity: 0.55 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className={`w-full h-full object-cover transition-all duration-1000 ${getLutClass()}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03010a] via-transparent to-black/30" />
              {/* Subtle scanning horizontal line overlay */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/[0.04] pointer-events-none" />
            </>
          ) : (
            <div className="absolute inset-0 z-20 bg-black flex items-center justify-center">
              {detectVideoPlatform(project.videoUrl || '') === 'direct' ? (
                <video
                  src={project.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={getVideoEmbedUrl(project.videoUrl || '')}
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              )}
              {/* Floating Close Button */}
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-6 right-6 z-30 flex items-center space-x-2 px-4 py-2.5 rounded-full bg-neutral-900/90 backdrop-blur-md border border-white/10 text-white/70 hover:text-[#EAB308] hover:border-[#EAB308]/30 transition-all cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
              >
                <X size={14} className="transform transition-transform group-hover:rotate-90 duration-300" />
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold">CLOSE VIDEO</span>
              </button>
            </div>
          )}
        </div>

        {/* HERO COORD / SPEC BLOCKS */}
        <div className="absolute top-12 right-6 md:right-16 text-right font-mono space-y-2 hidden md:block opacity-60">
          <div className="text-[8px] tracking-[0.25em] text-white/30 uppercase">CINEMATIC GEOMETRICS</div>
          <div className="text-[10px] text-amber-400 tracking-wider">LAT. 15.3350° N // LONG. 74.6225° E</div>
          <div className="text-[9px] text-white/50">{project.camera}</div>
        </div>

        {/* Main Header Text */}
        <div className="relative z-10 max-w-5xl text-left space-y-4">
          <div className="inline-flex items-center space-x-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-amber-400 uppercase font-bold bg-amber-400/10 px-2.5 py-1 rounded">
              {project.category}
            </span>
            <span className="w-8 h-[1px] bg-white/10" />
            <span className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase">
              RUNTIME: {project.duration}
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-serif font-light italic text-white tracking-wide leading-tight">
            {project.title}
          </h1>

          <p className="font-mono text-xs md:text-sm text-amber-400/80 tracking-[0.15em] uppercase max-w-2xl font-light">
            // {project.editorialSentence}
          </p>
        </div>

        {/* Bottom Scroll / Interactive prompt bar */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center border-t border-white/5 pt-8 mt-12 gap-4">
          <div className="flex space-x-4 text-left font-mono">
            <div>
              <span className="text-[8px] text-white/30 tracking-widest block uppercase">LENS PAIRING</span>
              <span className="text-[11px] text-white/80">{project.lens}</span>
            </div>
            <div className="border-l border-white/10 pl-4">
              <span className="text-[8px] text-white/30 tracking-widest block uppercase">STUDIO SITE</span>
              <span className="text-[11px] text-white/80">{project.location}</span>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            {project.videoUrl && (
              <button 
                onClick={() => {
                  setVideoOpen(true);
                  if (soundEnabled) {
                    toggleSound();
                  }
                }}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-full text-[10px] font-mono tracking-widest bg-amber-500 hover:bg-amber-600 text-black font-extrabold transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_5px_15px_rgba(234,179,8,0.3)] cursor-pointer uppercase"
              >
                <Tv size={11} className="mr-1" />
                <span>PLAY PRODUCTION FILM</span>
              </button>
            )}
            <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase">SCROLLER MATRIX</span>
            <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:border-amber-400/30 transition-all cursor-pointer animate-bounce">
              ↓
            </div>
          </div>
        </div>
      </section>

      {/* CORE PORTFOLIO PROJECT METRICS & SPECS — STAGE 2 */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Playfair Editorial & Live LUT Tuning Suite */}
          <div className="lg:col-span-4 space-y-8 text-left bg-[#070514]/40 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
            <div className="space-y-2">
              <span className="font-mono text-[9px] text-[#EAB308] tracking-[0.25em] font-bold block uppercase">
                // SYSTEM CORE CONTROLS
              </span>
              <h3 className="text-xl md:text-2xl font-serif font-light italic text-white">
                Cinematographer's Desk
              </h3>
              <p className="text-white/50 text-xs font-light leading-relaxed">
                Tweak custom grading look-up-tables and monitor camera sensor parameters in real-time.
              </p>
            </div>

            {/* Simulated Live Audio-Visual Waveform HUD */}
            <div className="p-4 bg-black/60 rounded-xl border border-white/10 space-y-3 relative overflow-hidden">
              <div className="absolute top-2 right-3 font-mono text-[7px] text-[#EAB308] tracking-widest">
                WAVEFORM OSCILLOSCOPE
              </div>
              <div className="flex items-end justify-between h-14 pt-2 gap-0.5">
                {waveformValue.map((val, i) => (
                  <motion.div 
                    key={i} 
                    className="w-[3px] bg-gradient-to-t from-violet-600 via-amber-400 to-amber-300 rounded-full"
                    animate={{ height: `${val}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center text-[8px] font-mono text-white/40 pt-1">
                <span>0.00ms</span>
                <span>CINE EXPOSURE WAVE</span>
                <span>12.50ms</span>
              </div>
            </div>

            {/* Dynamic Preset Switcher LUTs */}
            <div className="space-y-3">
              <label className="font-mono text-[8px] text-white/40 tracking-widest block uppercase">
                CINE LUT PROFILES
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'LOG-C', label: 'Arri Log-C', desc: 'Raw cinematic neutral' },
                  { id: 'KODAK-5207', label: 'Kodak 5207', desc: 'Warm shadows & grain' },
                  { id: 'FUJI-ETERNAL', label: 'Fuji Eternal', desc: 'Cold editorial greens' },
                  { id: 'MONO-GRAIN', label: 'Classic Mono', desc: 'High-contrast black & white' }
                ].map((lut) => (
                  <button
                    key={lut.id}
                    onClick={() => setSelectedLut(lut.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      selectedLut === lut.id 
                        ? 'border-[#EAB308] bg-[#EAB308]/5' 
                        : 'border-white/5 bg-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-white block uppercase font-bold">{lut.label}</span>
                      {selectedLut === lut.id && <Check size={10} className="text-[#EAB308]" />}
                    </div>
                    <span className="text-[8px] text-white/40 leading-tight block mt-1">{lut.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-full py-3 rounded-xl font-mono text-[10px] tracking-widest bg-white/5 border border-white/10 hover:border-amber-400/30 text-white hover:bg-white/10 transition-all flex items-center justify-center space-x-2"
            >
              <Sliders size={12} className="text-[#EAB308]" />
              <span>{isPlaying ? 'PAUSE MONITOR FEED' : 'RESUME MONITOR FEED'}</span>
            </button>
          </div>

          {/* Right Column: Narrative Tabs & Editorial Story Layout */}
          <div className="lg:col-span-8 space-y-10 text-left">
            {/* Elegant Tab Headers */}
            <div className="flex border-b border-white/5 pb-2 overflow-x-auto gap-8">
              {[
                { id: 'story', label: 'THE NARRATIVE', icon: Compass },
                { id: 'process', label: 'PRODUCTION STEPS', icon: Layers },
                { id: 'tech', label: 'OPTICS & CAMERA SPECS', icon: Camera }
              ].map((tab) => {
                const isSelected = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2.5 pb-4 font-mono text-[10px] tracking-widest uppercase transition-all relative cursor-pointer ${
                      isSelected ? 'text-[#EAB308]' : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    <Icon size={12} />
                    <span>{tab.label}</span>
                    {isSelected && (
                      <motion.div 
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 inset-x-0 h-[2px] bg-[#EAB308]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT VIEWER */}
            <div className="min-h-[300px]">
              {activeTab === 'story' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <h4 className="text-2xl font-serif italic text-white/90 leading-normal font-light">
                      {project.storyBrief}
                    </h4>
                    <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed font-light">
                      {project.detailedStory || "Every frame was meticulously visualised and designed to capture emotional authenticity. Our editorial process was driven not by the technology itself, but by the physical interplay of shadow, texture, and silence. Through extreme discipline and selective lens parameters, we composed this cinematic masterpiece, establishing a signature mood that is remembered long after the credits fade."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 space-y-4">
                    <h5 className="font-mono text-[9px] text-[#EAB308] tracking-widest uppercase font-bold">
                      // BEHIND THE SCENES INSIGHT
                    </h5>
                    <p className="text-white/50 text-xs md:text-sm leading-relaxed font-light italic">
                      "{project.behindTheScenes || "We waited forty-eight hours on location for the exact overcast diffusion to align with the camera direction, bypassing simulated stage lights entirely. Raw authenticity means respect for nature's geometry."}"
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'process' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] text-[#EAB308] tracking-widest uppercase">METHODOLOGY SPEC</span>
                    <h4 className="text-xl font-serif italic text-white/90">From Raw Vision to Polished Composition</h4>
                  </div>

                  <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                    {(project.productionProcess || [
                      { step: "01", title: "Creative Blueprint & Scripting", desc: "Crafting a unique editorial narrative centered on emotional conviction and elegant geometry." },
                      { step: "02", title: "Optical Selection & Prep", desc: "Rigorous testing of anamorphic lens distortion and custom coloring look-up-tables inside our studio." },
                      { step: "03", title: "On-Location Execution", desc: "Capturing pristine RAW elements under specialized directors and certified physical camera crews." },
                      { step: "04", title: "Cine-Color Grading Lab", desc: "Mapping color spectrums in our master studio, rendering final files inside cinema-standard Rec2020 matrices." }
                    ]).map((proc, index) => (
                      <div key={index} className="flex items-start space-x-6 relative pl-1">
                        <div className="w-6 h-6 rounded-full bg-[#03010a] border border-[#EAB308]/40 flex items-center justify-center font-mono text-[9px] text-[#EAB308] font-bold z-10 shrink-0">
                          {proc.step}
                        </div>
                        <div className="space-y-1 text-left">
                          <h5 className="font-display text-sm font-bold text-white/90">{proc.title}</h5>
                          <p className="text-xs text-white/50 leading-relaxed font-light">{proc.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'tech' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  {[
                    { label: "PRIMARY CAMERA SYSTEM", val: project.camera, desc: "Direct large format RAW sensor readout" },
                    { label: "ANAMORPHIC OPTICS", val: project.lens, desc: "Ultra-wide rendering with premium vintage bokeh" },
                    { label: "CHRONO SPECTRA", val: "24.000 FPS // 180° SHUTTER", desc: "Standard cinematic interval settings" },
                    { label: "POST PIPELINE COLOUR", val: "LOG-C TO ARRI REC2020", desc: "Preserving maximum sensor dynamic range" },
                    { label: "SHOOT SITE LOCATION", val: project.location, desc: "Pristine physical environment" },
                    { label: "ACCOLADES & FORMAT", val: "CURATED ARTWORK SELECTION", desc: "Independently audited by Mayavi Directors" }
                  ].map((techSpec, index) => (
                    <div key={index} className="bg-white/5 p-5 rounded-2xl border border-white/5 text-left space-y-1 hover:border-amber-400/20 transition-all duration-300">
                      <span className="font-mono text-[7px] text-white/40 tracking-widest uppercase block">{techSpec.label}</span>
                      <p className="font-display font-medium text-xs text-white uppercase">{techSpec.val}</p>
                      <p className="text-[10px] text-white/40 leading-relaxed font-light">{techSpec.desc}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* DETAILED INTERACTIVE INTERSTELLAR SCENE MATRIX — STAGE 3 */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-white/5">
        <div className="space-y-3 mb-10 text-left">
          <span className="font-mono text-[9px] text-[#EAB308] tracking-[0.25em] font-bold block uppercase">
            // INTERACTIVE PREVIEW PANEL
          </span>
          <h3 className="text-2xl md:text-4xl font-serif font-light italic text-white tracking-wide">
            Cine Frame Archives
          </h3>
          <p className="text-white/50 text-xs md:text-sm font-light max-w-2xl leading-relaxed">
            Every segment represents a continuous film reel. Select an individual keyframe below to preview optical alignment on the main screen.
          </p>
        </div>

        {/* Cinematic Grid of scenes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {project.scenes.map((sceneUrl, index) => {
            const isSelected = activeSceneIndex === index;
            return (
              <div 
                key={index}
                onClick={() => {
                  setActiveSceneIndex(index);
                  setIsPlaying(false); // pause autoplay on user manual select
                }}
                className={`relative aspect-[16/10] rounded-2xl overflow-hidden border cursor-pointer transition-all duration-500 group ${
                  isSelected ? 'border-[#EAB308] scale-[1.02] shadow-2xl shadow-amber-500/5' : 'border-white/5 hover:border-white/15'
                }`}
              >
                <img 
                  src={sceneUrl} 
                  alt={`Cinematic sequence scene preview ${index + 1}`}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isSelected ? 'scale-105' : 'scale-100 group-hover:scale-[1.03]'
                  }`}
                />
                
                {/* Visual HUD overlay indicators */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                
                <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10 font-mono text-[7px] text-white/80 tracking-widest">
                  {isSelected ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      <span>SELECTED FEED</span>
                    </>
                  ) : (
                    <span>FRAME 0{index + 1}</span>
                  )}
                </div>

                <div className="absolute bottom-3 inset-x-3 flex justify-between items-center">
                  <span className="font-mono text-[8px] text-white/50 tracking-wider">REEL SEC. 0{index * 3 + 2}</span>
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#EAB308] group-hover:text-black transition-all">
                    <Eye size={10} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* EDITORIAL RECONSTITUTED AWARD & RESULTS — STAGE 4 */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20 border-t border-white/5 bg-[#070514]/20 rounded-3xl mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left p-6 md:p-12">
            <span className="font-mono text-[9px] text-[#EAB308] tracking-[0.25em] font-bold block uppercase">
              // RECOGNITION & OUTCOMES
            </span>
            <h3 className="text-2xl md:text-4xl font-serif font-light italic text-white leading-tight">
              A story remembered long after the credits.
            </h3>
            <p className="text-white/60 font-sans text-xs md:text-sm leading-relaxed font-light">
              {project.results || "Selected and featured at premium international creative festivals. Celebrated for pristine visual grammar, meticulous shadow density, and pioneering 9:16 vertical orientation layout logic."}
            </p>

            <div className="flex items-center space-x-4 pt-4">
              <span className="h-[1px] w-12 bg-white/20" />
              <span className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase">MAYAVI DIRECTORS GUILD</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-6 md:p-12">
            {[
              { title: "Best Cinematography", host: "Southern Cinema Awards" },
              { title: "Editorial Excellence", host: "Indian Design Assembly" },
              { title: "Visual Story of the Year", host: "Curators Pavilion" },
              { title: "Best Brand Campaign", host: "Creative Alliance Forum" }
            ].map((award, index) => (
              <div key={index} className="border border-white/5 bg-black/40 p-5 rounded-2xl hover:border-amber-400/25 transition-all text-left">
                <span className="font-mono text-[8px] text-amber-400 block tracking-widest uppercase">HONORABLE ACCUMULATE</span>
                <h5 className="font-display font-bold text-xs text-white/90 mt-1 leading-tight">{award.title}</h5>
                <span className="text-[10px] text-white/40 font-mono tracking-wider block mt-0.5">{award.host}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LUXURIOUS NEXT STORY LINK TRIGGER — STAGE 5 */}
      <section className="relative z-10 w-full bg-[#070514] border-t border-white/5 py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="font-mono text-[9px] text-[#EAB308] tracking-[0.3em] font-bold block uppercase">
            CONTINUE THE NARRATIVE JOURNEY
          </span>
          <h2 className="text-3xl md:text-6xl font-serif font-light italic text-white tracking-wide">
            {nextProject.title}
          </h2>
          <p className="text-white/50 text-xs md:text-sm font-sans font-light max-w-md mx-auto leading-relaxed">
            "{nextProject.editorialSentence}"
          </p>

          <div className="pt-8">
            <button
              onClick={() => onNavigateToProject(nextProject)}
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-full text-[10px] font-mono tracking-widest bg-white text-black font-extrabold hover:bg-amber-400 hover:text-black hover:scale-[1.02] transition-all duration-300 shadow-2xl cursor-pointer uppercase"
            >
              <span>ENTER NEXT STORY</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER BREATHING BLOCK */}
      <footer className="w-full bg-[#03010a] border-t border-white/5 py-12 px-6 md:px-12 text-center text-white/30 font-mono text-[9px] tracking-[0.2em] uppercase">
        MAYAVI RECTIFY DIRECTORIAL PLATFORM // ALL RIGHTS REGISTERED 2026.
      </footer>
    </div>
  );
}
