import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue
} from 'motion/react';
import {
  Play,
  ArrowUpRight,
  X,
  Volume2,
  VolumeX,
  Sliders,
  Sparkles,
  Camera,
  Film,
  ChevronRight,
  ChevronLeft,
  User,
  GraduationCap,
  Calendar,
  Award,
  Heart,
  Users,
  CheckCircle2,
  Flame,
  Globe,
  Tv,
  ArrowRight,
  MonitorPlay,
  MapPin,
  Mail,
  Phone,
  Star,
  Send,
  MessageSquare,
  Map,
  Instagram,
  Youtube,
  Linkedin,
  Menu,
  Lock
} from 'lucide-react';

import Logo from './components/Logo';
import { BotanicalLeaves } from './components/StudioProps';
import { InfiniteMovingCards } from './components/ui/infinite-moving-cards';
import { ProjectStoryPage } from './components/ProjectStoryPage';
import { WorldStoryPage } from './components/WorldStoryPage';
import OpeningExperience from './components/opening/OpeningExperience';
import LensScroll from './components/LensScroll';
import CreativeWorldsSection from './components/CreativeWorldsSection';
import TalentAssessmentModal from './components/TalentAssessmentModal';
import { useCMS, recordNewInquiry } from './lib/cmsStore';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import { getVideoEmbedUrl, detectVideoPlatform } from './lib/videoUtils';

// Define rich structures for cinematic projects
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

const FEATURED_PROJECTS: CinematicProject[] = [
  {
    id: "01",
    title: "The Weight of Silence",
    category: "Vertical Fiction",
    duration: "04:12",
    imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=1200",
    camera: "ARRI ALEXA MINI LF",
    lens: "ZEISS SUPREME PRIME 50MM T1.5",
    location: "HAMPI ARCHAEOLOGICAL SITE",
    storyBrief: "A poetic vertical cinema piece framing the quiet, spatial geometry of ancestral ruins.",
    editorialSentence: "A vertical frame containing the entire gravity of an ancestral lineage.",
    detailedStory: "Shot entirely in 9:16 ARRI RAW, this film is an exercise in restraint. Every composition was treated as a permanent editorial painting, letting shadows crawl across five-hundred-year-old temple stones. No camera motion was permitted; the visual story is narrated purely through the passing of natural light and dust particles illuminated in air.",
    behindTheScenes: "We waited forty-eight hours on-site in Hampi for the exact overcast diffusion to align with the temple corridors, bypassing artificial lights to respect natural geometry.",
    productionProcess: [
      { step: "01", title: "Atmospheric Mapping", desc: "Studying historical light angles and celestial patterns over the ruins to compose natural shadows." },
      { step: "02", title: "Vertical Framing Prep", desc: "Calibrating the ARRI LF sensor rotation and viewport overlays to compose inside the 9:16 aspect constraint." },
      { step: "03", title: "Chrono-Capture", desc: "4K RAW high-dynamic capture on location during exactly forty minutes of golden dusk." },
      { step: "04", title: "Spectral Grading", desc: "Softening contrast curve transitions in the post color lab to mimic classic Kodak editorial prints." }
    ],
    results: "Awarded Best Vertical Cinematography at the Curators Pavilion and featured on the front cover of Cinematic Geometrics Monthly.",
    scenes: [
      "/desert_monolith.png",
      "/hero_stage_a.png",
      "/volumetric_soundstage.png"
    ],
    videoUrl: "https://drive.google.com/file/d/1dPMY7XM5rxcrPB9Z1ZBLPIU94xjZCWhf/preview"
  },
  {
    id: "02",
    title: "Heritage & Horology",
    category: "Brand Films",
    duration: "02:18",
    imageUrl: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=1200",
    camera: "RED V-RAPTOR 8K S35",
    lens: "LEICA NOCTILUX 50MM F/0.95",
    location: "COCHIN HERITAGE SUITE",
    storyBrief: "Capturing the intricate ticking mechanics of family watchmakers against dramatic sunset hues.",
    editorialSentence: "Ticking mechanics captured between silence and golden hour shadowlines.",
    detailedStory: "A high-end commercial piece detailing the dedication of multi-generational timepiece craftsman. Using specialized macro probes and ultra-shallow depth of field, we highlighted the microscopic tooth wheels and escape mechanisms, creating a rhythmic visual symphony set to slow acoustic reverberations.",
    behindTheScenes: "To preserve the micro textures of brass gears, we used custom optical macro-tubes designed specifically for the Leica Noctilux’s extreme f/0.95 aperture.",
    productionProcess: [
      { step: "01", title: "Macro Prep & Testing", desc: "Calibrating macro focus pullers to track distances shorter than 2mm with millimeter-level precision." },
      { step: "02", title: "Gilding the Shadows", desc: "Setting up golden optical reflectors to light gear edges without causing lens flare or hot spots." },
      { step: "03", title: "Chrono-Sync", desc: "Matching the cinematic framerate (48fps) to the natural mechanical heartbeat of the clock's escapement wheel." },
      { step: "04", title: "Warm Ivory Grading", desc: "Softening whites to warm ivory tones, reflecting the antique brand heritage of the heritage house." }
    ],
    results: "Winner of the Prestige Creative Commercial Award for outstanding macro composition and brand storytelling.",
    scenes: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600"
    ]
  }
];

export interface CreativeWorld {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  tagline: string;
  mood: string;
  description: string;
  detailedStory: string;
  imageUrl: string;
  specs: { label: string; value: string }[];
  disciplines: { title: string; desc: string }[];
  enrollmentLabel: string;
  formType: 'commission' | 'branding' | 'enroll' | 'event';
}

export const CREATIVE_WORLDS: CreativeWorld[] = [
  {
    id: "media",
    number: "01",
    title: "Media Production",
    subtitle: "Cinematic Craft",
    category: "PREMIUM FILM & COMMERCIALS",
    tagline: "A single vertical frame can carry the entire weight of a cinematic legacy.",
    mood: "Cinema, Direction, Storytelling, Premium Film Production",
    description: "We formulate and direct high-value brand films, commercials, and visual systems that transcend corporate standards. Leveraging state-of-the-art camera systems, we translate raw human concepts into grand visual legacies.",
    detailedStory: "In the era of hyper-saturated feeds, high-fidelity storytelling is the only true differentiator. Our production unit handles complete end-to-end cinematography: starting from intensive scriptboarding and narrative pre-visualization to state-of-the-art camera operations (ARRI, RED, Sony Venice) and high-end cinematic color grading in REC2020/LOG-C. We build visual assets designed to stand out on mobile displays and cinema screens alike.",
    imageUrl: "/hero_stage_a.png",
    specs: [
      { label: "CAMERA PACKS", value: "ARRI Alexa Mini LF // RED V-Raptor" },
      { label: "LENS SUITE", value: "Zeiss Supreme Primes // Cooke Anamorphic" },
      { label: "COLOR GRADING", value: "LOG-C to REC2020 Academy Standard" },
      { label: "RESOLUTION", value: "8K RAW Cinema Capture" }
    ],
    disciplines: [
      { title: "Brand Legacy Films", desc: "High-density cinematic portraits detailing the authentic mission, vision, and heartbeat of premium organizations." },
      { title: "Narrative Commercials", desc: "Compelling storytelling structures optimized for high-retention cinematic television and luxury social streams." },
      { title: "Product Cinematography", desc: "Ultra-macro, dynamic camera sweeps that highlight mathematical symmetry, textures, and elite craft." }
    ],
    enrollmentLabel: "COMMISSION FILM PRODUCTION",
    formType: "commission"
  },
  {
    id: "branding",
    number: "02",
    title: "Personal Branding",
    subtitle: "Executive Identity",
    category: "LUXURY PORTRAITURE & PORTFOLIOS",
    tagline: "Your story deserves more than a post.",
    mood: "Luxury Portraiture, Executive Identity, Personal Legacy, Fashion Editorial",
    description: "Whether you're a founder, creator, artist, model, or actor — you deserve a presence that people remember long after they scroll past. We help you become impossible to ignore.",
    detailedStory: "True leadership cannot be artificial. We build premium personal branding frameworks by pairing intimate, documentary-style cinematography with clean, Swiss-minimalist website designs. We help you articulate your philosophy, share your insights on professional platforms like LinkedIn, and host an impressive digital portfolio that commands respect from global investor networks.",
    imageUrl: "/personal_branding.png?v=2",
    specs: [
      { label: "PORTRAIT STYLE", value: "Classic Editorial // Cinematic Monochrome" },
      { label: "NARRATIVE INTERVIEW", value: "Multi-Camera Documentary Setups" },
      { label: "PORTFOLIO DESIGN", value: "Custom Swiss-Grid Clean Layouts" },
      { label: "PLATFORM STRATEGY", value: "High-Density Content Systems" }
    ],
    disciplines: [
      { title: "Content Strategy & Creation", desc: "Developing highly tailored content strategies and premium visual assets designed to make your personal brand impossible to ignore." },
      { title: "Founder's Documentary", desc: "A bespoke, cinema-grade documentary capturing your origins, philosophy, and industry-defining insights." },
      { title: "Executive Portraiture", desc: "Luxury, magazine-worthy editorial portraits using specialized studio-lighting configurations." },
      { title: "Digital Platform Curation", desc: "An outstanding web portfolio paired with high-value video assets to power your public presence." }
    ],
    enrollmentLabel: "ENGAGE BRAND PARTNERSHIP",
    formType: "branding"
  },
  {
    id: "talent",
    number: "03",
    title: "Talent Development",
    subtitle: "Mentorship Loops",
    category: "STUDIO WORKSHOPS & MASTERCLASSES",
    tagline: "Building people before brands.",
    mood: "Mentorship, Learning, Camera Training, Workshops, Masterclasses",
    description: "Sharing our advanced methodologies through hands-on camera workshops, spatial sound training, and design masterclasses. Equipping the next cohort of creative leaders with raw vision.",
    detailedStory: "Through the Mayavi Academy, we provide highly intensive, hands-on masterclasses for aspiring directors, videographers, and visual storytellers. From understanding advanced lens characteristics and optical dynamics to direct on-set production training with real actors, our academy bridges the gap between raw talent and high-end professional commercial careers.",
    imageUrl: "/talent_development.png?v=2",
    specs: [
      { label: "INSTRUCTION", value: "Direct Mentorship by Principal Directors" },
      { label: "HANDS-ON EQUIPMENT", value: "Industry-standard cinema cameras & lighting" },
      { label: "ACADEMY CERTIFICATE", value: "Mayavi Visual Arts Credentials" },
      { label: "ALUMNI PIPELINE", value: "Direct commercial recruitment network" }
    ],
    disciplines: [
      { title: "Theatre & Modelling Workshops", desc: "Interactive theatre exercises, improv games, modelling confidence, posture training, and interactive group activities for kids & adults alike." },
      { title: "Directing & Pre-Visualization", desc: "Mastering storyboarding, narrative rhythm, character arc design, and director-to-cast coordination." },
      { title: "Cinematography & Light Control", desc: "Understanding optical physics, depth-of-field control, three-point luxury setups, and shadows." },
      { title: "Post-Production Masterclass", desc: "A comprehensive dive into DaVinci Resolve color pipelines, sound-synthesizer styling, and editorial flow." }
    ],
    enrollmentLabel: "ENROLL IN MASTERCLASS",
    formType: "enroll"
  },
  {
    id: "events",
    number: "04",
    title: "Events & Experiences",
    subtitle: "Grand Design",
    category: "LARGE-SCALE EXPERIENTIAL PRODUCTION",
    tagline: "Synthesizing light, sound, and space into massive unforgettable moments.",
    mood: "Large-scale Productions, Luxury Corporate Events, Projection Mapping",
    description: "Architecting full-scale sensory environments, luxury corporate reveals, and high-intensity stage productions. We synthesize volumetric lighting, live routing, and high-density projection mapping to leave an indelible mark.",
    detailedStory: "We don't organize events; we design visual masterpieces. By integrating real-time laser systems, customized spatial acoustics, and high-density video projections that warp around physical architecture (projection mapping), we transform standard keynotes, product launches, and concerts into grand sensory chapters that leave audiences speechless.",
    imageUrl: "/events_experience.png?v=2",
    specs: [
      { label: "STAGE ARCHITECTURE", value: "Geometric Custom Frames" },
      { label: "VISUAL SYSTEMS", value: "3D Projection Mapping // Laser Grids" },
      { label: "SOUND DESIGN", value: "Synchronized Spatial Synthesizers" },
      { label: "LIVE STREAM", value: "Ultra-low latency Multi-Cam Routing" }
    ],
    disciplines: [
      { title: "Bespoke Product Reveals", desc: "Synchronized spatial sensory reveals combining cinematic pre-show streams with physical projection mapping." },
      { title: "Corporate Summits & Keynotes", desc: "Clean, high-prestige executive stage environments customized with dynamic live visual backdrops." },
      { title: "Interactive Spaces & Installations", desc: "Experiential gallery exhibits that react dynamically to visitors through movement trackers." }
    ],
    enrollmentLabel: "RESERVE COMMISSION",
    formType: "event"
  },
  {
    id: "social",
    number: "05",
    title: "Social Media Strategy",
    subtitle: "Platform Growth",
    category: "DIGITAL ENGAGEMENT & MANAGEMENT",
    tagline: "Native strategies built for high engagement.",
    mood: "Strategy, Social Growth, Engagement, Content Curation",
    description: "Platform-native content strategies and management that grow audiences and build loyal communities.",
    detailedStory: "To succeed in the modern attention economy, static content is no longer enough. We design native social blueprints, combining short-form vertical assets (Reels, TikToks, Shorts) with high-density copy and algorithm-optimized scheduling to amplify your brand voice, boost retention, and foster an active community.",
    imageUrl: "/social_media_strategy.png?v=2",
    specs: [
      { label: "CHANNELS", value: "Instagram Reels // TikTok // YouTube Shorts" },
      { label: "METRICS FOCUS", value: "Retention Rate // Community Growth" },
      { label: "MANAGEMENT", value: "End-to-End Grid & Copy Curation" },
      { label: "ANALYTICS", value: "High-Density Data & Trend Tracking" }
    ],
    disciplines: [
      { title: "Native Content Blueprinting", desc: "Crafting visual styles, hooks, and content schedules optimized specifically for platform algorithms." },
      { title: "Audience Engineering", desc: "Nurturing communities through copy, active comments management, and platform engagement loops." },
      { title: "Data-Driven Scaling", desc: "Analyzing platform analytics to continuously optimize production scripts and visual styling." }
    ],
    enrollmentLabel: "RESERVE STRATEGY INQUIRY",
    formType: "branding"
  },
  {
    id: "ugc",
    number: "06",
    title: "UGC & Creator Content",
    subtitle: "Creator Ecosystem",
    category: "COMMUNITY INFLUENCE & TRUST",
    tagline: "Authentic trust built by creator partnerships.",
    mood: "UGC, Creator Partnerships, Authenticity, Viral Systems",
    description: "Authentic creator-led content that builds trust, drives engagement, and converts followers into fans.",
    detailedStory: "Audiences crave authenticity. We bridge the gap between luxury brands and creative influencers by curating premium user-generated content campaigns. From pairing your products with the ideal charismatic talent to scripting native hooks and organic product demonstrations, we deliver high-retention video assets that sell.",
    imageUrl: "/ugc_creator_content.jpg?v=2",
    specs: [
      { label: "CREATOR POOL", value: "Premium Micro & Macro Influencers" },
      { label: "CONTENT FORMAT", value: "Short-Form Native Vertical Video" },
      { label: "ENGAGEMENT", value: "High-Retention Storytelling Hooks" },
      { label: "REACH STREAMS", value: "Viral Optimization & Brand Integration" }
    ],
    disciplines: [
      { title: "Creator Pairing", desc: "Connecting your brand with the ideal charismatic creators to present products authentically." },
      { title: "Native Video Scripting", desc: "Writing organic, hook-based script frameworks that feel genuine and keep viewers watching." },
      { title: "Conversion Campaigns", desc: "Directing creator assets specifically to drive landing page clicks and product signups." }
    ],
    enrollmentLabel: "COMMISSION CREATOR CONTENT",
    formType: "commission"
  }
];

const HERO_SCENES = [
  {
    title: "The Cinematographer",
    tag: "SCENE 01 // SPOTLIGHT FOCUS",
    camera: "ARRI Alexa LF",
    lens: "Zeiss Supreme Prime 35mm",
    specs: "8K RAW • 24 FPS • 180° SHUTTER",
    location: "Studio Stage A // Hyderabad",
    imageUrl: "/hero_stage_a.png",
    quote: "Stories remembered long after the credits roll."
  },
  {
    title: "Dialogue in Light",
    tag: "SCENE 02 // CHIAROSCURO PORTRAIT",
    camera: "Hasselblad H6D-100c",
    lens: "HC 80mm f/2.8 Reference",
    specs: "100MP RAW • ISO 64 • MEDIUM FORMAT",
    location: "Heritage Pavilion // Cochin",
    imageUrl: "/personal_branding.png?v=2",
    quote: "A portrait of raw leadership and deep creative conviction."
  },
  {
    title: "Volumetric Soundstage",
    tag: "SCENE 03 // PROJECTION GRID",
    camera: "Sony Venice 2 8K",
    lens: "Cooke Anamorphic SF 35mm",
    specs: "8K Anamorphic • 48 FPS • SPATIAL SYNC",
    location: "Experiential Warehouse // Bangalore",
    imageUrl: "/volumetric_soundstage.png",
    quote: "Synthesizing geometric grids and heavy spatial acoustics."
  }
];

// Cinematic Image with Lazy Blur-Up fade-in loading behavior
function FadeInImage({ src, alt, className }: { src?: string; alt?: string; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasRef, setHasRef] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [hasRef]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-neutral-950/40">
      <motion.img
        ref={(el) => {
          imgRef.current = el;
          if (el) setHasRef(true);
        }}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: isLoaded ? 1 : 0, filter: isLoaded ? "blur(0px)" : "blur(12px)" }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className={className}
      />
    </div>
  );
}

// Small, ultra-elegant high-precision tracking custom cursor
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, cursorX, cursorY]);

  // Respect prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!isVisible || reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      <motion.div
        className="w-2.5 h-2.5 bg-[#EAB308] rounded-full absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      <motion.div
        className="border border-[#EAB308]/40 rounded-full absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: isHovering ? 32 : 12,
          height: isHovering ? 32 : 12,
          opacity: isHovering ? 1 : 0.45,
          backgroundColor: isHovering ? "rgba(234,179,8,0.08)" : "rgba(234,179,8,0)"
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
      />
    </div>
  );
}

// Interactive Testimonials Dataset for Film Critique & Press Exhibition
interface TestimonialItem {
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
  audioDuration: string;
  avatarBg: string;
  publication: string;
  laurel: string;
  rating: string;
  btsNotes: {
    camera: string;
    lighting: string;
    grading: string;
    directorComment: string;
  };
}

const CLIENT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'tamada',
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
    id: 'nailedit',
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
  },
  {
    id: 'agvr',
    author: 'Karthik Raja',
    role: 'Chief Producer',
    company: 'AGVR Creations',
    category: 'LUXURY EVENTS',
    project: 'Grand Stage Design & Patterns',
    quote: 'The live production and projection mapping setups were completely flawless. Mayavi delivers visual perfection under rigorous live stage parameters.',
    metrics: '40,000+ Attendees • Zero Frame Drop',
    image: '/testimonial_stage.png',
    timecode: 'CAM C // TIMECODE [03:04:12]',
    audioDuration: '0:50',
    avatarBg: 'from-[#EAB308]/20 to-blue-600/10',
    publication: 'STAGE & EXPERIENTIAL ARTS',
    laurel: 'GOLD MEDAL • EXPERIENTIAL STAGE DESIGN',
    rating: '★★★★★ 5.0 / FLAWLESS EXECUTION',
    btsNotes: {
      camera: 'Sony FX6 Multi-Cam Rig + Projection Sync',
      lighting: '360° Synchronized LED Beam Array',
      grading: 'High Contrast Vivid Neon Space LUT',
      directorComment: 'We synchronized live 4K projection mapping with 24fps camera shutters, eliminating frequency flicker completely.'
    }
  },
  {
    id: 'pronto',
    author: 'Dr. S. K. Rao',
    role: 'Director of Operations',
    company: 'Pronto Diagnostics',
    category: 'BRAND FILMS',
    project: 'Enterprise Medical Tech Launch',
    quote: 'They captured complex medical innovation into an emotional, human story. The response from investors and key stakeholders was overwhelming.',
    metrics: '3X Conversion Speed • International Distribution',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    timecode: 'CAM A // TIMECODE [00:52:19]',
    audioDuration: '0:28',
    avatarBg: 'from-emerald-500/20 to-amber-500/10',
    publication: 'MEDTECH BRAND REVIEW',
    laurel: 'COMMENDED • ENTERPRISE STORYTELLING',
    rating: '★★★★★ 5.0 / INNOVATION AWARD',
    btsNotes: {
      camera: 'ARRI Alexa Mini LF + Macro Optics',
      lighting: 'Clean Clinical Bi-Color Key Panel',
      grading: 'Subtle Emerald Precision LUT',
      directorComment: 'We focused macro lenses on microscopic diagnostic chips, treating medical engineering like high art.'
    }
  },
  {
    id: 'granddiva',
    author: 'Rukmini Sharma',
    role: 'Festival Chairperson',
    company: 'Grand Diva International',
    category: 'TALENT & CASTING',
    project: 'Season 2 Pageant & Talent Grooming',
    quote: 'Mayavi elevated our national auditions with broadcast-grade optics and unmatched talent direction. The production value exceeded international standards.',
    metrics: '1,200+ Auditions • National Telecast',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    timecode: 'CAM D // TIMECODE [04:18:30]',
    audioDuration: '0:45',
    avatarBg: 'from-amber-400/20 to-pink-600/10',
    publication: 'NATIONAL ENTERTAINMENT JOURNAL',
    laurel: 'OFFICIAL PARTNER • GRAND DIVA INT.',
    rating: '★★★★★ 5.0 / EXCELLENCE IN CASTING',
    btsNotes: {
      camera: 'Sony Venice 2 8K',
      lighting: 'Full Stage Follow-Spot + Atmospheric Fog',
      grading: 'Rich Magenta Gold Glamour LUT',
      directorComment: 'We directed live runway auditions with dual 8K cameras to capture high-motion choreography without motion blur.'
    }
  }
];

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(true);
  const [heroBgAnimated, setHeroBgAnimated] = useState<boolean>(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const visited = sessionStorage.getItem("mayavi_visited");
    if (visited === "true") {
      setIsIntroComplete(true);
    }
  }, []);

  const [activeProject, setActiveProject] = useState<CinematicProject | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [showreelOpen, setShowreelOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#showreel';
    }
    return false;
  });
  const [showreelScene, setShowreelScene] = useState<number>(0);
  const [showreelAutoPlay, setShowreelAutoPlay] = useState<boolean>(false);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [assessmentOpen, setAssessmentOpen] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState<number>(15000);
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string | null>(null);
  const [activePatternUrl, setActivePatternUrl] = useState<string | null>("https://lh3.googleusercontent.com/d/1vm51BflgcA-fWtEKA9SlP67C_osJEkw8");

  // Dynamic Central CMS Store
  const { cms } = useCMS();

  // Admin Portal & Authentication States (/admin single-user dashboard)
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      return path === '/admin' || hash === '#/admin' || hash === '#admin';
    }
    return false;
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('mayavi_admin_session_auth') === 'true';
    }
    return false;
  });

  // Listen to popstate, hashchange, and Ctrl+Shift+A hotkey
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const onAdmin = path === '/admin' || hash === '#/admin' || hash === '#admin';
      setIsAdminRoute(onAdmin);
      if (onAdmin) {
        setIsAdminAuthenticated(sessionStorage.getItem('mayavi_admin_session_auth') === 'true');
      } else if (hash === '#showreel') {
        setShowreelOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Hotkey: Ctrl + Shift + A or Cmd + Shift + A to open admin
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminRoute) {
          window.history.pushState(null, '', '/');
          setIsAdminRoute(false);
        } else {
          window.history.pushState(null, '', '/admin');
          setIsAdminRoute(true);
          setIsAdminAuthenticated(sessionStorage.getItem('mayavi_admin_session_auth') === 'true');
        }
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminRoute]);

  const navigateToAdmin = () => {
    window.history.pushState(null, '', '/admin');
    setIsAdminRoute(true);
    setIsAdminAuthenticated(sessionStorage.getItem('mayavi_admin_session_auth') === 'true');
  };

  const exitAdmin = () => {
    window.history.pushState(null, '', '/');
    setIsAdminRoute(false);
  };

  // Interactive Testimonial Exhibition & BTS States
  const [testimonialCategory, setTestimonialCategory] = useState<string>('ALL');
  const [activeBtsId, setActiveBtsId] = useState<string | null>(null);

  // Hero Section Interactive Viewfinder States
  const [activeHeroScene, setActiveHeroScene] = useState<number>(0);
  const [heroTimecode, setHeroTimecode] = useState<string>("08:14:22:00");
  const [heroVideoEnded, setHeroVideoEnded] = useState<boolean>(true);

  useEffect(() => {
    let frame = 0;
    let sec = 22;
    let min = 14;
    let hr = 8;
    const interval = setInterval(() => {
      frame++;
      if (frame >= 24) {
        frame = 0;
        sec++;
        if (sec >= 60) {
          sec = 0;
          min++;
          if (min >= 60) {
            min = 0;
            hr = (hr + 1) % 24;
          }
        }
      }
      const pad = (n: number) => String(n).padStart(2, '0');
      setHeroTimecode(`${pad(hr)}:${pad(min)}:${pad(sec)}:${pad(frame)}`);
    }, 1000 / 24); // Exactly 24 FPS Standard Film Framerate
    return () => clearInterval(interval);
  }, []);

  // Dedicated Service Modal States
  const [activeWorld, setActiveWorld] = useState<CreativeWorld | null>(null);
  const [shouldRestoreScroll, setShouldRestoreScroll] = useState(false);
  const savedScrollPositionRef = useRef<number>(0);


  // Responsive and Active Section Header States
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Dynamic scroll spy to track the active section and manage header visual transition
  useEffect(() => {
    let lastScrolled = false;
    let lastSection = "home";

    const handleScroll = () => {
      // Update scrolled state only when value changes
      const scrolled = window.scrollY > 40;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }

      // Scroll spy to highlight active section in real-time
      const sections = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 180; // offset trigger

      for (const sectionId of sections) {
        const domId = sectionId === 'testimonials' ? 'client-stories' : sectionId;
        const el = document.getElementById(domId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            if (sectionId !== lastSection) {
              lastSection = sectionId;
              setActiveSection(sectionId);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Service Enrollment Form States
  const [enrollName, setEnrollName] = useState<string>('');
  const [enrollEmail, setEnrollEmail] = useState<string>('');
  const [enrollMessage, setEnrollMessage] = useState<string>('');
  const [enrollOption, setEnrollOption] = useState<string>('');
  const [enrollTier, setEnrollTier] = useState<string>('Standard Suite');
  const [enrollSubmitted, setEnrollSubmitted] = useState<boolean>(false);
  const [enrollCode, setEnrollCode] = useState<string>('');
  const [enrollLoading, setEnrollLoading] = useState<boolean>(false);

  // Contact Form & Configurator States
  const [formStep, setFormStep] = useState<number>(1);
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientBrief, setClientBrief] = useState<string>('');
  const [clientWhatsApp, setClientWhatsApp] = useState<string>('');
  const [clientCompany, setClientCompany] = useState<string>('');
  const [clientCreativeWorld, setClientCreativeWorld] = useState<string>('Media Production');
  const [clientFormat, setClientFormat] = useState<string>('Brand Film');
  const [clientCamera, setClientCamera] = useState<string>('ARRI Alexa Mini LF');
  const [clientGoals, setClientGoals] = useState<string>('');
  const [clientTimeline, setClientTimeline] = useState<string>('Standard (4-6 Weeks)');
  const [clientBudget, setClientBudget] = useState<number>(25000);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [leadId, setLeadId] = useState<string>('');

  // Audio synthesizer references
  const audioContextRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Cinematic backdrop scene loop inside active custom project modal
  const [projectSceneIndex, setProjectSceneIndex] = useState<number>(0);

  // Toggle ambient cinematic drone
  const toggleSound = () => {
    if (soundEnabled) {
      if (gainNodeRef.current && audioContextRef.current) {
        const ctx = audioContextRef.current;
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1.2);

        setTimeout(() => {
          try {
            osc1Ref.current?.stop();
            osc2Ref.current?.stop();
            audioContextRef.current?.close();
          } catch (e) { }
          osc1Ref.current = null;
          osc2Ref.current = null;
          audioContextRef.current = null;
          setSoundEnabled(false);
        }, 1300);
      }
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, ctx.currentTime);
        filterRef.current = filter;

        // Sub-harmonic master drone
        const osc1 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(55.00, ctx.currentTime); // A1 note
        osc1Ref.current = osc1;

        // Warm pure harmonic fifth
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(82.41, ctx.currentTime); // E2 note
        osc2Ref.current = osc2;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 1.6);
        gainNodeRef.current = gainNode;

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();
        setSoundEnabled(true);
      } catch (e) {
        console.warn("Audio Context block bypass failed.", e);
      }
    }
  };

  // Automated scene switcher for active project lightbox simulator
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeProject) {
      interval = setInterval(() => {
        setProjectSceneIndex(prev => (prev + 1) % activeProject.scenes.length);
      }, 3500);
    } else {
      setProjectSceneIndex(0);
    }
    return () => clearInterval(interval);
  }, [activeProject]);

  // Dynamic automatic scene swapper for vertical showreel device
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const totalChapters = cms.showreel?.chapters?.length || 4;
    if (showreelOpen && showreelAutoPlay && totalChapters > 0) {
      interval = setInterval(() => {
        setShowreelScene(prev => (prev + 1) % totalChapters);
      }, 9000);
    }
    return () => clearInterval(interval);
  }, [showreelOpen, showreelAutoPlay, cms.showreel?.chapters?.length]);

  // Clean up soundscapes
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        try {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          audioContextRef.current.close();
        } catch (e) { }
      }
    };
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowreelOpen(false);
        setActiveProject(null);
        setContactOpen(false);
        setActiveWorld(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleServiceSelect = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(s => s !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormSubmitted(false);

    // Format the WhatsApp message payload
    const textMessage = `Greetings Mayavi! I would like to initiate a production brief inquiry:

• Name: ${clientName}
• Email: ${clientEmail}
• WhatsApp: ${clientWhatsApp}
• Company: ${clientCompany || 'N/A'}
• Service World: ${clientCreativeWorld}
• Production Format: ${clientFormat}
• Camera Optics: ${clientCamera}
• Timeline: ${clientTimeline}
• Budget Scale: $${clientBudget.toLocaleString()} USD
• Narrative Vision: ${clientBrief}`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappNum = cms.integrations.whatsappNumber || '916301761783';
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodedText}`;

    // Record inquiry locally into CMS store for admin dashboard review
    recordNewInquiry({
      name: clientName,
      email: clientEmail,
      phone: clientWhatsApp,
      category: clientCreativeWorld || 'Production Brief',
      budget: `$${clientBudget.toLocaleString()} USD`,
      message: clientBrief || `Format: ${clientFormat}, Camera: ${clientCamera}, Timeline: ${clientTimeline}`
    });

    // Serverless API Google Sheets Dispatch (Deliverable #6)
    if (cms.integrations.googleSheetsWebhookUrl && !cms.integrations.googleSheetsWebhookUrl.includes('SAMPLE')) {
      try {
        fetch(cms.integrations.googleSheetsWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name: clientName,
            email: clientEmail,
            phone: clientWhatsApp,
            company: clientCompany,
            category: clientCreativeWorld,
            format: clientFormat,
            budget: clientBudget,
            brief: clientBrief
          })
        }).catch(err => console.log('Sheets dispatch note:', err));
      } catch (err) {
        console.error('Sheets webhook dispatch error:', err);
      }
    }

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Simulate premium backend sequence matching requested architecture
    setTimeout(() => {
      const uniqueId = `MYV-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setLeadId(uniqueId);
      setFormLoading(false);
      setFormSubmitted(true);
    }, 2400);
  };

  const openWorldDetails = (world: CreativeWorld) => {
    savedScrollPositionRef.current = window.scrollY;
    setActiveWorld(world);
    window.scrollTo({ top: 0, behavior: 'auto' });
    setEnrollName('');
    setEnrollEmail('');
    setEnrollMessage('');
    setEnrollOption('');
    setEnrollTier('Standard Suite');
    setEnrollSubmitted(false);
    setEnrollCode('');
    setEnrollLoading(false);
  };

  const handleEnrollmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollLoading(true);

    setTimeout(() => {
      const randHex = Math.random().toString(16).substring(2, 7).toUpperCase();
      const code = `MAYAVI-${activeWorld?.number || '00'}-${randHex}`;
      setEnrollCode(code);
      setEnrollLoading(false);
      setEnrollSubmitted(true);
    }, 1200);
  };

  // SECURE SINGLE-USER ADMIN ROUTE (/admin or #/admin)
  if (isAdminRoute) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => setIsAdminAuthenticated(true)}
          onExit={exitAdmin}
        />
      );
    }
    return <AdminDashboard onExit={exitAdmin} />;
  }

  return (
    <>
      {/* High-End Interactive Custom Cursor */}
      <CustomCursor />

      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          if (shouldRestoreScroll) {
            requestAnimationFrame(() => {
              window.scrollTo({
                top: savedScrollPositionRef.current,
                behavior: 'auto'
              });
              setShouldRestoreScroll(false);
            });
          }
        }}
      >
        {!isIntroComplete ? (
          <OpeningExperience
            onComplete={() => {
              sessionStorage.setItem("mayavi_visited", "true");
              setIsIntroComplete(true);
            }}
          />
        ) : activeWorld ? (
          <motion.div
            key={`world-page-${activeWorld.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <WorldStoryPage
              world={activeWorld}
              onClose={() => {
                setShouldRestoreScroll(true);
                setActiveWorld(null);
              }}
              onNavigateToWorld={(w) => {
                setActiveWorld(w);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              allWorlds={CREATIVE_WORLDS}
            />
          </motion.div>
        ) : (
          <motion.div
            key="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-screen bg-[#0B0914] text-white selection:bg-amber-500/30 font-sans"
          >
            {/* Absolute Background Master Layer */}
            <div className="absolute inset-0 bg-[#0B0914] z-0" />
            <div className="absolute inset-0 bg-grain z-0 opacity-15 pointer-events-none" />

            {/* Elegant gold line-drawn botanical leaves background */}
            <BotanicalLeaves />

            {/* Active Pattern Watermark Layer */}
            {activePatternUrl && (
              <div
                className="absolute inset-0 z-0 pointer-events-none transition-all duration-700 mix-blend-screen"
                style={{
                  backgroundImage: `url(${activePatternUrl})`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '600px',
                  backgroundAttachment: 'fixed',
                  opacity: 0.012
                }}
              />
            )}

            {/* Radiant Glowing Background Ambiance (Fading from Gold to Deep Indigo) */}
            <div className="absolute top-0 left-1/4 right-0 w-full h-[850px] rounded-full filter blur-[180px] opacity-[0.16] pointer-events-none z-0"
              style={{
                background: 'radial-gradient(circle, rgba(109,40,217,0.3) 0%, rgba(139,92,246,0.15) 40%, rgba(234,179,8,0.08) 70%, transparent 100%)'
              }}
            />

            {/* HEADER / NAVIGATION — Sleek Compact Floating Glassmorphic Pill Header */}
            <motion.header
              id="main-nav-bar"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-3 inset-x-0 mx-auto max-w-6xl z-50 px-3 sm:px-4"
            >
              <div className={`w-full rounded-full border transition-all duration-500 ease-in-out px-4 sm:px-5 py-2 flex items-center justify-between gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${isScrolled
                ? 'bg-[#090717]/95 backdrop-blur-xl border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.9)]'
                : 'bg-[#090717]/85 backdrop-blur-md border-white/10'
                }`}>
                {/* Brand Logo */}
                <motion.div
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setActiveSection('home');
                    setMobileMenuOpen(false);
                  }}
                  className="relative cursor-pointer transition-all duration-300 hover:brightness-110 active:scale-98 shrink-0 flex items-center"
                >
                  <Logo layout="horizontal" iconSize="sm" theme="dark" useOfficial={false} showText={true} />
                </motion.div>

                {/* Centered Navigation */}
                <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 shrink-0">
                  {['HOME', 'ABOUT', 'SERVICES', 'PORTFOLIO', 'TESTIMONIALS', 'CONTACT'].map((item) => {
                    const itemLower = item.toLowerCase();
                    const isActive = activeSection === itemLower;
                    const targetId = itemLower === 'testimonials' ? 'client-stories' : itemLower;

                    return (
                      <a
                        key={item}
                        id={`nav-${itemLower}`}
                        href={`#${targetId}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileMenuOpen(false);
                          if (targetId === 'home') {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setActiveSection('home');
                            return;
                          }
                          const element = document.getElementById(targetId);
                          if (element) {
                            const offset = 80;
                            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                            window.scrollTo({
                              top: elementPosition - offset,
                              behavior: 'smooth'
                            });
                            setActiveSection(itemLower);
                          }
                        }}
                        className={`relative text-[8.5px] xl:text-[9.5px] font-mono tracking-[0.12em] xl:tracking-[0.16em] transition-all duration-300 py-1 px-2.5 xl:px-3 rounded-full uppercase select-none whitespace-nowrap shrink-0 ${isActive
                          ? 'text-white font-semibold'
                          : 'text-white/60 hover:text-white'
                          }`}
                      >
                        <span className="relative z-10">{item}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeNavPill"
                            className="absolute inset-0 border border-[#EAB308]/40 bg-[#EAB308]/[0.08] rounded-full -z-0"
                            transition={{ type: "spring", stiffness: 350, damping: 32 }}
                          />
                        )}
                      </a>
                    );
                  })}
                </nav>

                {/* Right Action: AUDITION TEST & START A PROJECT */}
                <div className="hidden lg:flex items-center space-x-2 shrink-0">
                  <button
                    id="top-cta-talent-assessment"
                    onClick={() => setAssessmentOpen(true)}
                    className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[8.5px] font-mono tracking-[0.15em] border border-[#EAB308]/60 bg-[#EAB308]/10 hover:bg-[#EAB308]/20 text-[#EAB308] font-bold transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:scale-105 active:scale-98 cursor-pointer uppercase shrink-0 whitespace-nowrap"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-pulse"></span>
                    <span>AUDITION TEST</span>
                  </button>
                  <button
                    id="top-cta-start-project"
                    onClick={() => setContactOpen(true)}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[8.5px] xl:text-[9px] font-mono tracking-[0.15em] bg-[#EAB308] hover:bg-amber-400 text-black font-bold transition-all duration-300 shadow-[0_3px_15px_rgba(234,179,8,0.25)] hover:scale-105 active:scale-98 cursor-pointer uppercase shrink-0 whitespace-nowrap"
                  >
                    <span>START A PROJECT</span>
                    <ArrowUpRight size={11} className="text-black" />
                  </button>
                </div>

                {/* Mobile Hamburger */}
                <div className="flex lg:hidden items-center shrink-0">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Navigation Menu"
                    className="w-8 h-8 border border-white/10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:text-white"
                  >
                    {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
                  </button>
                </div>
              </div>

              {/* Mobile Dropdown Menu */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:hidden w-full bg-[#090717]/95 backdrop-blur-2xl border border-white/10 rounded-2xl mt-2 overflow-hidden shadow-2xl p-6 space-y-4"
                  >
                    <div className="space-y-3">
                      {['HOME', 'ABOUT', 'SERVICES', 'PORTFOLIO', 'TESTIMONIALS', 'CONTACT'].map((item) => {
                        const itemLower = item.toLowerCase();
                        const isActive = activeSection === itemLower;
                        const targetId = itemLower === 'testimonials' ? 'client-stories' : itemLower;

                        return (
                          <a
                            key={item}
                            href={`#${targetId}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setMobileMenuOpen(false);
                              setTimeout(() => {
                                if (targetId === 'home') {
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                  setActiveSection('home');
                                  return;
                                }
                                const element = document.getElementById(targetId);
                                if (element) {
                                  const offset = 80;
                                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                                  window.scrollTo({
                                    top: elementPosition - offset,
                                    behavior: 'smooth'
                                  });
                                  setActiveSection(itemLower);
                                }
                              }, 120);
                            }}
                            className={`block py-2.5 text-xs font-mono tracking-[0.2em] transition-all border-l-2 pl-4 cursor-pointer ${isActive
                              ? 'text-white border-[#EAB308] bg-[#EAB308]/10 font-bold'
                              : 'text-white/70 border-transparent hover:text-white'
                              }`}
                          >
                            {item}
                          </a>
                        );
                      })}
                    </div>

                    <div className="pt-3 border-t border-white/10">
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setAssessmentOpen(true);
                          }}
                          className="w-full py-2.5 rounded-full text-center text-[10px] font-mono tracking-widest border border-[#EAB308]/60 bg-[#EAB308]/10 text-[#EAB308] font-bold transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-pulse"></span>
                          <span>AUDITION TEST (SCREEN TEST)</span>
                        </button>
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setContactOpen(true);
                          }}
                          className="w-full py-3 rounded-full text-center text-[10px] font-mono tracking-widest bg-[#EAB308] text-black font-extrabold transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <span>START A PROJECT</span>
                          <ArrowUpRight size={11} className="text-black" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.header>

            {/* CORE HERO BANNER - LENS SCROLL OR 30-SEC 1080P VIDEO LOOP (Deliverable #1) */}
            <div id="home" className="relative">
              {cms.hero.useVideoBackground ? (
                <div className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-black py-20 px-6">
                  {/* 30-Second 1080p Video Loop (Deliverable #1) */}
                  <div className="absolute inset-0 z-0">
                    {detectVideoPlatform(cms.hero.backgroundVideoUrl) === 'direct' ? (
                      <video
                        src={cms.hero.backgroundVideoUrl}
                        poster={cms.hero.posterUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover brightness-[0.55] contrast-[1.2]"
                      />
                    ) : (
                      <iframe
                        src={getVideoEmbedUrl(cms.hero.backgroundVideoUrl)}
                        className="w-full h-full border-0 pointer-events-none scale-125"
                        allow="autoplay; encrypted-media"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07050C] via-black/40 to-black/60 pointer-events-none" />
                  </div>

                  {/* Top Viewfinder HUD */}
                  <div className="absolute top-24 left-8 right-8 flex items-center justify-between font-mono text-[9px] text-white/50 tracking-widest pointer-events-none z-10">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <span className="text-white font-bold tracking-widest">1080P REC // 24 FPS</span>
                    </div>
                    <div className="text-amber-400 font-bold">{cms.hero.cameraTag}</div>
                    <div className="hidden sm:block">{cms.hero.locationTag}</div>
                  </div>

                  {/* Hero Copy */}
                  <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 pt-12">
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-400/10 border border-[#EAB308]/40 text-[#EAB308] font-mono text-[9px] tracking-[0.3em] uppercase font-bold">
                      CINEMATIC BACKGROUND LOOP
                    </span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light italic text-white leading-tight">
                      {cms.hero.headline}
                    </h1>
                    <p className="text-white/80 font-sans text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                      {cms.hero.subheadline}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                      <button
                        onClick={() => {
                          const el = document.getElementById('portfolio');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-7 py-3.5 rounded-full bg-[#EAB308] hover:bg-amber-400 text-black font-mono font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(234,179,8,0.3)] hover:scale-105 cursor-pointer"
                      >
                        {cms.hero.ctaPrimaryText}
                      </button>
                      <button
                        onClick={() => setShowreelOpen(true)}
                        className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs tracking-widest uppercase transition-all flex items-center space-x-2 cursor-pointer"
                      >
                        <Play size={12} className="text-[#EAB308]" />
                        <span>{cms.hero.ctaSecondaryText}</span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Viewfinder Info */}
                  <div className="absolute bottom-6 inset-x-8 flex justify-between items-center font-mono text-[8px] text-white/30 tracking-[0.2em] pointer-events-none z-10">
                    <span>SHUTTER: 180° // ISO 800</span>
                    <span>MAYAVI DIRECTOR ENGINE</span>
                  </div>
                </div>
              ) : (
                <LensScroll
                  onExploreWork={() => {
                    const el = document.getElementById('portfolio');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onWatchShowreel={() => setShowreelOpen(true)}
                  onStartProject={() => setContactOpen(true)}
                />
              )}
            </div>

            {/* ABOUT US SECTION */}
            <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-8 lg:pt-16 lg:pb-12 border-t border-white/5 overflow-visible">

              {/* Soft, deep violet-indigo ambient glow behind the layout */}
              <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-950/15 rounded-full filter blur-[150px] pointer-events-none" />

              {/* Ambient Wave Background Watermark (pattern-5) - Left Aligned */}
              <div
                className="absolute -top-10 -left-20 w-[450px] h-[550px] opacity-[0.16] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none animate-pattern-wave"
                style={{ backgroundImage: "url('/patterns/pattern-5.svg')" }}
              />

              {/* Ambient Mandala Background Watermark (pattern-3) - Right Aligned */}
              <div
                className="absolute top-10 -right-20 w-[500px] h-[600px] opacity-[0.14] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none animate-pattern-rotate"
                style={{ backgroundImage: "url('/patterns/pattern-3.svg')" }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative z-10">

                {/* Left Column - Editorial Story & Directorial Craft Cards (5 columns) */}
                <div className="lg:col-span-5 space-y-6 text-left">
                  <div className="space-y-4">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-[#EAB308] uppercase font-semibold block">
                      {cms.about.tagline || 'OUR PHILOSOPHY'}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-light font-serif italic text-white/95 leading-[1.12] tracking-tight">
                      {cms.about.heading || 'Cinema Starts Long Before The Camera Rolls'}
                    </h2>
                  </div>

                  <div className="space-y-4 text-white/80 font-sans text-sm md:text-base font-light leading-relaxed tracking-wide">
                    <p className="text-base md:text-lg text-amber-200/90 font-serif italic font-light leading-relaxed border-l-2 border-[#EAB308]/50 pl-4 py-2 bg-amber-500/5 rounded-r-lg">
                      {cms.about.quote}
                    </p>
                    <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                      {cms.about.body}
                    </p>
                  </div>

                  {/* Understated luxury statistics row */}
                  <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5">
                    <div>
                      <p className="font-serif italic text-2xl text-white font-light">{cms.about.stat1Value}</p>
                      <p className="font-mono text-[8px] tracking-[0.15em] text-white/40 uppercase mt-1">{cms.about.stat1Label}</p>
                    </div>
                    <div>
                      <p className="font-serif italic text-2xl text-white font-light">{cms.about.stat2Value}</p>
                      <p className="font-mono text-[8px] tracking-[0.15em] text-white/40 uppercase mt-1">{cms.about.stat2Label}</p>
                    </div>
                    <div>
                      <p className="font-serif italic text-2xl text-white font-light">{cms.about.stat3Value}</p>
                      <p className="font-mono text-[8px] tracking-[0.15em] text-white/40 uppercase mt-1">{cms.about.stat3Label}</p>
                    </div>
                  </div>

                  {/* Directorial Craft & Telemetry Card (Fills layout gap) */}
                  <div className="bg-gradient-to-br from-amber-500/5 via-neutral-900/60 to-transparent border border-white/10 p-5 rounded-2xl space-y-3.5 relative overflow-hidden">
                    <div className="flex items-center space-x-2">
                      <Sliders size={13} className="text-[#EAB308]" />
                      <span className="font-mono text-[8.5px] text-[#EAB308] font-bold tracking-[0.2em] uppercase">
                        DIRECTORIAL ARCHITECTURE
                      </span>
                    </div>
                    <h4 className="font-serif italic text-base text-white">Precision Optics & Geometry</h4>

                    <div className="grid grid-cols-2 gap-3 pt-1 text-left">
                      <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 space-y-0.5">
                        <span className="font-mono text-[7.5px] text-white/30 tracking-widest uppercase block">OPTICAL RIGS</span>
                        <span className="font-mono text-[9.5px] text-white/80 font-medium block">ARRI LF & Anamorphic</span>
                      </div>
                      <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 space-y-0.5">
                        <span className="font-mono text-[7.5px] text-white/30 tracking-widest uppercase block">ASPECT SPECS</span>
                        <span className="font-mono text-[9.5px] text-white/80 font-medium block">9:16 Vertical & 2.39:1</span>
                      </div>
                      <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 space-y-0.5">
                        <span className="font-mono text-[7.5px] text-white/30 tracking-widest uppercase block">COLOR LAB</span>
                        <span className="font-mono text-[9.5px] text-white/80 font-medium block">Kodak 250D Emulation</span>
                      </div>
                      <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 space-y-0.5">
                        <span className="font-mono text-[7.5px] text-white/30 tracking-widest uppercase block">SOUND ENGINE</span>
                        <span className="font-mono text-[9.5px] text-white/80 font-medium block">Spatial Sub-Harmonics</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Creative Pillars Card (Fills layout gap) */}
                  <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl space-y-3">
                    <span className="font-mono text-[8.5px] text-white/40 tracking-[0.2em] uppercase block font-semibold">
                      CORE CREATIVE PILLARS
                    </span>
                    <div className="space-y-2.5 text-left font-sans text-xs">
                      <div className="flex items-start space-x-3 pb-2 border-b border-white/5">
                        <span className="font-mono text-[9px] text-[#EAB308] font-bold">01</span>
                        <div>
                          <h5 className="font-medium text-white text-xs">Spatial Light & Shadows</h5>
                          <p className="text-[10.5px] text-white/50 font-light mt-0.5">Sculpting natural and volumetric shadow lines across architectural film sets.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 pb-2 border-b border-white/5">
                        <span className="font-mono text-[9px] text-[#EAB308] font-bold">02</span>
                        <div>
                          <h5 className="font-medium text-white text-xs">Human Narrative Core</h5>
                          <p className="text-[10.5px] text-white/50 font-light mt-0.5">Directing talent to capture raw, authentic emotional beats that transcend trend cycles.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <span className="font-mono text-[9px] text-[#EAB308] font-bold">03</span>
                        <div>
                          <h5 className="font-medium text-white text-xs">Long-Term Brand Preservation</h5>
                          <p className="text-[10.5px] text-white/50 font-light mt-0.5">Ensuring every commercial frame builds enduring enterprise equity.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quiet signature block & CTA */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-serif italic text-sm text-white/90">Mayavi Media Creations</p>
                      <p className="font-mono text-[8px] tracking-[0.2em] text-[#EAB308]/60 uppercase">Creative House // Hyderabad</p>
                    </div>

                    <button
                      onClick={() => setContactOpen(true)}
                      className="px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-[#EAB308] hover:text-black text-white text-[9px] font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer"
                    >
                      Start A Project →
                    </button>
                  </div>
                </div>

                {/* Right Column - visual and opportunities dashboard (col-span-7) */}
                <div className="lg:col-span-7 space-y-8">
                  {/* Cinematic Visual - Brought Back */}
                  <motion.div
                    initial={{ scale: 0.99, y: 15, opacity: 0 }}
                    whileInView={{ scale: 1, y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/5 group"
                  >
                    {/* Ultra-luxury background lighting vignette overlay */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-90 pointer-events-none" />

                    {/* High resolution cinematic background photograph of active film camera rigs representing high-end craft */}
                    <img
                      src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200"
                      alt="Cinema Camera rigging setup on active dark film set"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover brightness-[0.7] contrast-[1.05] grayscale-[8%] group-hover:scale-102 transition-transform duration-[1200ms]"
                    />

                    {/* Extremely subtle director camera overlay */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/5">
                      <div className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-[#EAB308] rounded-full animate-pulse" />
                        <span className="font-mono text-[7px] tracking-[0.2em] text-white/60">ACTIVE SET // STANDBY</span>
                      </div>
                      <span className="font-mono text-[7px] tracking-[0.2em] text-white/40">SCENE 02 — PHILOSOPHY</span>
                    </div>
                  </motion.div>

                  {/* Casting Call & Opportunities Dashboard */}
                  <div className="space-y-6">
                    <div className="space-y-2 text-left">
                      <span className="font-mono text-[9px] text-[#EAB308] tracking-[0.25em] font-bold block uppercase">
                  // ACTIVE INVITATIONS & CASTINGS
                      </span>
                      <h3 className="text-2xl font-serif font-light text-white italic">
                        Casting Calls & Auditions
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Premium Membership & Casting Alert Card */}
                      <div className="bg-gradient-to-br from-amber-500/10 via-violet-600/5 to-transparent border border-amber-500/20 p-5 rounded-2xl space-y-3 relative overflow-hidden text-left">
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                        <div className="flex items-center space-x-2">
                          <Sparkles size={13} className="text-amber-400" />
                          <span className="font-mono text-[8px] text-amber-400 font-bold tracking-widest uppercase">SPECIAL OPPORTUNITY</span>
                        </div>
                        <h4 className="font-serif italic text-sm text-white leading-snug">
                          Prince & Princess of South India (Season 2)
                        </h4>
                        <p className="text-[10px] text-white/70 leading-relaxed font-light font-sans">
                          AP & Telangana editions happening in <strong>July 2026</strong>. Become a member today to get instant casting alerts and priority selections.
                        </p>
                        <div className="border-t border-white/5 pt-3 mt-2">
                          <span className="font-mono text-[7px] text-white/30 tracking-widest uppercase block mb-2">YOUR BENEFITS:</span>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[9px] text-white/60 font-sans font-light">
                            <div className="flex items-center space-x-1.5">
                              <span className="text-amber-400 text-[8px]">✦</span>
                              <span>Unlimited Castings</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-amber-400 text-[8px]">✦</span>
                              <span>Priority Selection</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-amber-400 text-[8px]">✦</span>
                              <span>Film & Media Roles</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <span className="text-amber-400 text-[8px]">✦</span>
                              <span>Portfolio Projects</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hiring Content Creators Card */}
                      <div className="bg-gradient-to-br from-[#EAB308]/5 via-[#0b081c] to-transparent border border-white/10 p-5 rounded-2xl space-y-3 text-left relative overflow-hidden flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <Film size={13} className="text-emerald-400" />
                            <span className="font-mono text-[8px] text-emerald-400 font-bold tracking-widest uppercase">WE ARE HIRING</span>
                          </div>
                          <h4 className="font-serif italic text-sm text-white leading-snug mt-2">
                            Looking for Content Creators
                          </h4>
                          <p className="text-[10px] text-white/70 leading-relaxed font-light font-sans mt-2">
                            If you are young, energetic, charismatic, and camera-friendly with 0-2 years of experience, we want to groom you for our commercial projects.
                          </p>
                        </div>

                        <div className="border-t border-white/5 pt-3 mt-2 space-y-2">
                          <div className="grid grid-cols-2 gap-2 text-[9px] text-white/50 font-mono">
                            <div>
                              <span className="text-white/30 uppercase block">EXPERIENCE:</span>
                              <span className="text-white/80 font-sans">0-2 Years</span>
                            </div>
                            <div>
                              <span className="text-white/30 uppercase block">ROLE TYPE:</span>
                              <span className="text-white/80 font-sans">Presenting & Hosting</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-2">
                            <button
                              onClick={() => {
                                window.open("https://wa.me/916301761783?text=Hello%20Mayavi!%20I'm%20interested%20in%20the%20Content%20Creator%20hiring%20opportunity.%20I%20would%20love%20to%20apply%20and%20share%20my%20resume/profile.", '_blank');
                              }}
                              className="inline-flex items-center space-x-1.5 text-[9px] font-mono text-amber-400 hover:text-white transition-colors cursor-pointer"
                            >
                              <span>SUBMIT PROFILE</span>
                              <ArrowRight size={10} />
                            </button>
                            <span className="text-[8.5px] text-white/35 font-mono">OR DM @mayavi_mediacreations</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Grand Diva Application Banner */}
                    <div className="bg-neutral-900/60 border border-white/5 p-6 rounded-2xl text-left space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full blur-2xl pointer-events-none" />
                      <div className="space-y-1">
                        <span className="font-mono text-[8px] text-[#EAB308] tracking-widest uppercase font-bold block">// OFFICIAL PARTNERSHIP APPLICATION</span>
                        <h4 className="font-serif italic text-lg text-white">Grand Diva International Pageant (Season 2)</h4>
                        <p className="text-xs text-white/60 font-sans font-light leading-relaxed">
                          We have partnered with the official Grand Diva organization. Open the Season 2 participation form to secure your workshop registration details.
                        </p>
                      </div>
                      <a
                        href="https://docs.google.com/forms/d/1amHV4nUd7M8cDqZzFVOIVoVR1PgM86Ucg3ByxHuZ6AU/viewform?edit_requested=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-[10px] font-mono tracking-widest bg-[#EAB308] hover:bg-amber-600 text-black font-extrabold transition-all duration-300 shadow-xl cursor-pointer"
                      >
                        <span>OPEN OFFICIAL APPLICATION</span>
                        <ArrowRight size={11} className="text-black" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 03 — THE SIX CREATIVE WORLDS (Horizontal Scrollytelling Transition) */}
            <CreativeWorldsSection
              worlds={CREATIVE_WORLDS}
              onOpenWorldDetails={openWorldDetails}
              onOpenAudition={() => setAssessmentOpen(true)}
            />

            {/* SELECTED WORK / FEATURED EXHIBITION */}
            <section id="portfolio" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-white/5 overflow-visible">

              {/* Ambient Pattern Watermarks (pattern-6 & pattern-11) */}
              <div
                className="absolute -top-10 -right-20 w-[500px] h-[600px] opacity-[0.08] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none animate-pattern-float"
                style={{ backgroundImage: "url('/patterns/pattern-6.svg')" }}
              />
              <div
                className="absolute bottom-10 -left-20 w-[450px] h-[550px] opacity-[0.07] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none animate-pattern-wave"
                style={{ backgroundImage: "url('/patterns/pattern-11.svg')" }}
              />

              {/* Section Heading & Tagline */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
                <div className="space-y-4 max-w-2xl text-left">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-[#EAB308] uppercase font-bold">
                      — ANTHOLOGY —
                    </span>
                    <span className="w-8 h-[1px] bg-[#EAB308]/30" />
                    <span className="font-mono text-[8px] text-white/40 tracking-[0.2em] uppercase">SELECTED WORKS</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-light font-serif text-white tracking-wide leading-tight">
                    Curated <span className="italic font-normal text-amber-100/90">Exhibitions</span>
                  </h2>
                  <p className="text-white/60 font-sans text-xs md:text-sm leading-relaxed tracking-wide font-light">
                    A handpicked selection of our deepest creative directions. Each narrative is built on architectural rigor, cinema-grade optics, and a relentless commitment to visual storytelling that endures.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setContactOpen(true);
                  }}
                  className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] text-[#EAB308] hover:text-amber-400 transition-colors group py-2"
                >
                  <span>DISCUSS A PRODUCTION</span>
                  <ArrowRight size={12} className="transform transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              {/* Categories filter bar - Elegant Editorial Pill Style */}
              <div className="flex items-center justify-start gap-3 mb-16 border-b border-white/5 pb-8 overflow-x-auto no-scrollbar max-w-full">
                {[
                  { id: null, label: 'ALL ARCHIVES' },
                  { id: 'Vertical Fiction', label: 'VERTICAL FICTION' },
                  { id: 'Brand Films', label: 'BRAND FILMS' },
                  { id: 'Personal Branding', label: 'PERSONAL BRANDING' },
                  { id: 'Luxury Events', label: 'LUXURY EVENTS' },
                  { id: 'Commercial Productions', label: 'COMMERCIALS' },
                  { id: 'Creative Campaigns', label: 'CAMPAIGNS' }
                ].map((cat) => {
                  const isSelected = selectedBrandFilter === cat.id;
                  return (
                    <button
                      key={cat.label}
                      onClick={() => setSelectedBrandFilter(cat.id)}
                      className={`px-5 py-2.5 rounded-full font-mono text-[9px] tracking-widest transition-all duration-500 border ${isSelected
                        ? 'bg-amber-400/10 text-amber-400 border-amber-400/40 shadow-sm shadow-amber-400/5'
                        : 'bg-white/[0.02] text-white/50 hover:text-white hover:bg-white/5 border-white/5'
                        }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Featured Editorial Asymmetrical Grid (12-column bento style) */}
              <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12 lg:gap-y-20">
                {(() => {
                  const currentExhibitions = cms.curatedExhibitions && cms.curatedExhibitions.length > 0 
                    ? cms.curatedExhibitions 
                    : FEATURED_PROJECTS;
                  return (selectedBrandFilter
                    ? currentExhibitions.filter(p => p.category.toLowerCase() === selectedBrandFilter.toLowerCase())
                    : currentExhibitions).map((project, index) => {
                    // Balanced grid configuration - uniform 16:9 columns to ensure straight row alignments
                    const layoutClass = "col-span-12 lg:col-span-6";
                    const aspectClass = "aspect-[16/9]";

                    return (
                      <motion.div
                        key={project.id}
                        onClick={() => {
                          setActiveProject(project);
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className={`${layoutClass} flex flex-col group cursor-pointer text-left`}
                      >
                        {/* Cinematic Cover Frame */}
                        <div className={`relative ${aspectClass} rounded-2xl overflow-hidden bg-neutral-950/60 border border-white/5 shadow-2xl mb-6`}>

                          {/* Grayscale slow reveal color transition with 1.03 zoom */}
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-[0.95] group-hover:scale-103 transition-all duration-[1500ms] ease-[0.16, 1, 0.3, 1]"
                          />

                          {/* Gradient Shutter Vignette */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none opacity-90 transition-opacity duration-500 group-hover:opacity-70" />

                          {/* Centered Cinematic Play Icon Reveal */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-[#EAB308]/40 flex items-center justify-center backdrop-blur-md text-[#EAB308] shadow-[0_0_20px_rgba(234,179,8,0.15)]">
                              <Play size={16} fill="currentColor" className="translate-x-[1px]" />
                            </div>
                          </div>

                          {/* Minimalist HUD detail inside the image frame */}
                          <div className="absolute top-4 left-4 z-20 flex items-center space-x-1.5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/5 font-mono text-[8px] text-white/50 tracking-wider">
                            <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                            <span>{project.duration}</span>
                          </div>

                          <div className="absolute bottom-4 right-4 z-20 font-mono text-[8px] text-white/30 tracking-widest uppercase">
                            ID // 0{project.id}
                          </div>
                        </div>

                        {/* Project Meta Details (Editorial layout) with subtle lift translate */}
                        <div className="space-y-3 px-1 transition-transform duration-300 group-hover:-translate-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-[9px] tracking-widest text-[#EAB308] uppercase font-bold">
                              {project.category}
                            </span>
                            <span className="w-1.5 h-[1px] bg-white/20" />
                            <span className="font-mono text-[8px] text-white/40 tracking-widest uppercase">
                              {project.location || 'PRODUCTION'}
                            </span>
                          </div>

                          <h3 className="text-xl md:text-2xl font-light font-serif text-white tracking-wide relative inline-block">
                            {project.title}
                            {/* Soft Golden Underline Hover Reveal */}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#EAB308]/50 transition-all duration-700 group-hover:w-full" />
                          </h3>

                          {/* One Editorial Sentence - Clean, non-marketing */}
                          <p className="text-white/60 font-sans text-xs md:text-sm leading-relaxed tracking-wide font-light max-w-xl">
                            {project.editorialSentence}
                          </p>

                          {/* Elegant Editorial CTA */}
                          <div className="pt-2">
                            <span className="inline-flex items-center space-x-2 text-[9px] font-mono tracking-[0.25em] text-[#EAB308] group-hover:text-amber-300 transition-colors">
                              <span>WATCH FILM</span>
                              <span className="transform transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  });
                })()}
              </div>

              {/* Elegant Breathing Space and Closing Premium CTA */}
              <div className="mt-32 md:mt-48 relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#0e0a25] to-[#04020a] p-12 md:p-24 text-center space-y-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
                {/* Subtle gold dusty radial backdrop blur */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.03)_0%,transparent_70%)] pointer-events-none" />

                <div className="max-w-2xl mx-auto space-y-6 relative z-10">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[#EAB308] uppercase font-bold block">
                    — CREATIVE HORIZONS —
                  </span>

                  <h3 className="text-3xl md:text-5xl font-light font-serif text-white leading-tight">
                    Every story begins <br />with a <span className="italic font-normal text-amber-100/90">conversation.</span>
                  </h3>

                  <p className="text-white/60 font-sans text-xs md:text-sm leading-relaxed tracking-wide font-light">
                    We do not believe in standard forms or typical commissions. We architect customized legacies. Allow us to hear your vision and translate it into a masterfully directed visual experience.
                  </p>

                  <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4 relative z-30">
                    <button
                      onClick={() => {
                        window.open("https://wa.me/916301761783?text=Hello%20Mayavi!%20I'm%20interested%20in%20starting%20a%20project%20and%20would%20love%20to%20initiate%20a%20creative%20inquiry%20regarding%20your%20production%20services.", '_blank');
                      }}
                      className="w-full sm:w-auto px-8 py-4 rounded-full text-[10px] font-mono tracking-[0.2em] bg-white text-black font-bold hover:bg-[#EAB308] hover:text-black transition-all duration-500 shadow-xl cursor-pointer uppercase"
                    >
                      Initiate Creative Inquiry
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full sm:w-auto px-8 py-4 rounded-full text-[10px] font-mono tracking-[0.2em] bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all duration-500 border border-white/10 cursor-pointer uppercase"
                    >
                      Explore Creative Worlds
                    </button>
                  </div>
                </div>
              </div>

            </section>

            {/* SECTION 06 — IMPACT & COLLABORATIONS */}
            <section id="collaborations" className="relative z-10 py-24 lg:py-36 border-t border-white/5 overflow-visible">
              <div className="absolute top-1/4 left-1/10 w-[350px] h-[350px] bg-purple-950/10 rounded-full blur-[130px] pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/10 w-[350px] h-[350px] bg-amber-950/10 rounded-full blur-[130px] pointer-events-none" />

              {/* Section Title — Large, Elegant, Editorial */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 lg:mb-28 text-left animate-fade-in">
                <div className="max-w-3xl space-y-4">
                  <span className="font-mono text-[9px] tracking-[0.35em] text-[#EAB308] uppercase font-bold block">
                    SECTION 06 // SHARED STORIES
                  </span>
                  <h2 className="text-4xl md:text-6xl font-light font-serif text-white tracking-wide leading-tight">
                    Collaborations That Matter
                  </h2>
                  <p className="text-white/50 font-sans text-sm md:text-base leading-relaxed tracking-wide font-light max-w-2xl">
                    We operate at the quiet intersection of artistic preservation and corporate vision. Here are the partners and collaborators that have shaped our shared legacy.
                  </p>
                </div>
              </div>

              {/* Chapter 1: Selected Collaborations */}
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 text-left">
                    <span className="font-mono text-[9px] text-[#EAB308] font-bold tracking-widest">CHAPTER 01</span>
                    <span className="w-8 h-[1px] bg-[#EAB308]/30" />
                    <span className="font-mono text-[8px] text-white/40 tracking-[0.25em] uppercase">SELECTED COLLABORATORS</span>
                  </div>

                  {/* Elegant, premium spacing. Wordmarks/monochrome brand layout */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-10">
                    {[
                      { name: 'Tamada Media', sub: 'Digital Networks', category: 'PARTNER' },
                      { name: 'TeluguOne', sub: 'Media Broadcasts', category: 'NETWORK' },
                      { name: 'AGVR Creations', sub: 'Theatrical Art', category: 'PRODUCTION' },
                      { name: 'Wadbros', sub: 'Luxury Production', category: 'CREATIVE' },
                      { name: 'Nailed It', sub: 'Identity Suites', category: 'BRANDING' },
                      { name: 'Neetho', sub: 'Cinematic Series', category: 'ORIGINALS' },
                      { name: 'Pista House', sub: 'Legacy Heritage', category: 'CULTURE' },
                      { name: 'Kalamandir', sub: 'Traditional Textiles', category: 'COMMERCIAL' },
                      { name: 'Pronto Diagnostics', sub: 'Clinical Systems', category: 'ENTERPRISE' },
                      { name: 'Veda Shakti Homes', sub: 'Residential Design', category: 'ARCHITECTURE' }
                    ].map((brand, i) => (
                      <div
                        key={i}
                        className="relative overflow-hidden bg-[#0a071b]/40 backdrop-blur-md border border-white/[0.06] rounded-xl p-6 flex flex-col justify-between text-left group hover:border-[#EAB308]/30 hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] transition-all duration-500 min-h-[150px] cursor-pointer"
                      >
                        {/* Subtle color glow backlights on hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/5 to-[#EAB308]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        {/* Top: Category Tag & Decorative Accent */}
                        <div className="flex items-center justify-between w-full relative z-10">
                          <span className="font-mono text-[7px] tracking-[0.25em] text-[#EAB308] font-bold uppercase">
                            {brand.category}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#EAB308]/80 group-hover:scale-110 transition-all duration-300" />
                        </div>

                        {/* Middle: Brand name */}
                        <div className="space-y-1 relative z-10 my-4">
                          <h4 className="font-serif text-sm md:text-base lg:text-lg text-white/50 group-hover:text-white transition-colors duration-300 font-light leading-snug">
                            {brand.name}
                          </h4>
                          <p className="font-mono text-[7px] tracking-[0.2em] text-white/20 group-hover:text-[#EAB308]/80 transition-colors duration-300 uppercase">
                            {brand.sub}
                          </p>
                        </div>

                        {/* Bottom details line */}
                        <div className="w-full h-[1px] bg-white/[0.03] group-hover:bg-[#EAB308]/20 transition-colors duration-300 relative z-10" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </section>

            {/* SECTION 07 — CLIENT STORIES (FILM CRITIQUE & PRESS EXHIBITION GALLERY) */}
            <section id="client-stories" className="relative z-10 py-24 lg:py-40 bg-[#050505] overflow-visible border-t border-white/5">
              {/* Ambient background glows */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] stroke-white stroke-[0.5]" fill="none">
                  <circle cx="400" cy="400" r="100" strokeDasharray="4 8" />
                  <circle cx="400" cy="400" r="220" />
                  <circle cx="400" cy="400" r="350" strokeDasharray="20 10" />
                  <line x1="400" y1="0" x2="400" y2="800" />
                  <line x1="0" y1="400" x2="800" y2="400" />
                </svg>
                <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[160px]" />
                <div className="absolute bottom-1/3 right-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[160px]" />

                {/* Ambient Pattern Watermarks (pattern-4 & pattern-10) */}
                <div
                  className="absolute top-10 -left-20 w-[450px] h-[550px] opacity-[0.07] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none animate-pattern-wave"
                  style={{ backgroundImage: "url('/patterns/pattern-4.svg')" }}
                />
                <div
                  className="absolute bottom-10 -right-20 w-[500px] h-[600px] opacity-[0.06] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none animate-pattern-float"
                  style={{ backgroundImage: "url('/patterns/pattern-10.svg')" }}
                />
              </div>

              {/* Section Header */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-left">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="max-w-3xl space-y-4">
                    <div className="flex items-center space-x-2">
                      <Award size={14} className="text-[#EAB308]" />
                      <span className="font-mono text-[9px] tracking-[0.35em] text-[#EAB308] uppercase font-bold">
                        SECTION 07 // FILM CRITIQUE & PRESS EXHIBITION
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-light font-serif text-white tracking-wide leading-tight">
                      Curated Press & Client Reviews
                    </h2>
                    <p className="text-white/60 font-sans text-xs md:text-sm font-light leading-relaxed max-w-xl">
                      An archival gallery of film festival laurels, executive testimonials, and technical behind-the-scenes director notes.
                    </p>
                  </div>

                  {/* Industry Festival Laurels Ticker Pill */}
                  <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/5 backdrop-blur-md">
                    <Sparkles size={13} className="text-amber-400" />
                    <span className="font-mono text-[8.5px] text-amber-300 tracking-widest uppercase font-bold">
                      5★ INDUSTRY CRITICS CHOICE 2026
                    </span>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-2.5 mt-10 border-b border-white/5 pb-6 overflow-x-auto no-scrollbar max-w-full">
                  {['ALL', 'BRAND FILMS', 'FOUNDER PORTFOLIOS', 'LUXURY EVENTS', 'TALENT & CASTING'].map((cat) => {
                    const isActive = testimonialCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setTestimonialCategory(cat)}
                        className={`px-4 py-2 rounded-full font-mono text-[8.5px] tracking-widest uppercase transition-all duration-300 border cursor-pointer ${isActive
                          ? 'bg-amber-400/10 border-amber-400/50 text-amber-400 font-bold shadow-[0_0_15px_rgba(234,179,8,0.15)]'
                          : 'bg-white/[0.02] border-white/5 text-white/50 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* INFINITE MOVING CARDS CONTINUOUS REEL WITH PAUSE ON HOVER */}
              <div className="w-full relative z-10 my-6">
                <InfiniteMovingCards
                  items={
                    testimonialCategory === 'ALL'
                      ? CLIENT_TESTIMONIALS
                      : CLIENT_TESTIMONIALS.filter(t => t.category.toLowerCase() === testimonialCategory.toLowerCase())
                  }
                  direction="left"
                  speed="fast"
                  pauseOnHover={true}
                />
              </div>

              {/* Editorial Coda Statement */}
              <div className="max-w-4xl mx-auto px-6 text-center pt-20 mt-24 border-t border-white/5 relative z-10 overflow-visible">
                {/* Ambient Pattern Watermark (pattern-3 Mandala) */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.08] pointer-events-none mix-blend-screen bg-no-repeat bg-center bg-contain z-0 select-none animate-pattern-rotate"
                  style={{ backgroundImage: "url('/patterns/pattern-3.svg')" }}
                />
                <div className="space-y-4">
                  <span className="font-mono text-[9px] text-[#EAB308] tracking-[0.3em] uppercase font-bold block">
                    CODA // CREATIVE SYNERGY
                  </span>
                  <p className="font-serif text-2xl md:text-4xl text-white/95 italic font-light tracking-wide leading-snug">
                    "The finest stories are written together."
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setContactOpen(true)}
                      className="px-6 py-2.5 rounded-full text-[9px] font-mono tracking-[0.2em] uppercase bg-[#EAB308] hover:bg-amber-400 text-black font-extrabold shadow-[0_4px_20px_rgba(234,179,8,0.3)] transition-all cursor-pointer inline-flex items-center space-x-2"
                    >
                      <span>INITIATE YOUR STORY</span>
                      <ArrowRight size={11} className="text-black" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 08 — START YOUR STORY */}
            <section id="contact" className="relative z-10 py-24 lg:py-40 bg-[#050505] overflow-visible border-t border-white/5">
              {/* Subtle geometric watermark backdrop (3-5% opacity) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.03] stroke-white stroke-[0.5]" fill="none">
                  <rect x="150" y="150" width="600" height="600" rx="20" strokeDasharray="5 5" />
                  <circle cx="450" cy="450" r="300" />
                  <circle cx="450" cy="450" r="150" strokeDasharray="10 15" />
                  <line x1="450" y1="0" x2="450" y2="900" />
                  <line x1="0" y1="450" x2="900" y2="450" />
                </svg>
                <div className="absolute top-1/4 right-5 w-[400px] h-[400px] bg-purple-950/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 left-5 w-[400px] h-[400px] bg-amber-950/5 rounded-full blur-[120px]" />

                {/* Ambient Pattern Watermarks (pattern-10 & pattern-5) */}
                <div
                  className="absolute top-10 -right-20 w-[500px] h-[600px] opacity-[0.07] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none animate-pattern-float"
                  style={{ backgroundImage: "url('/patterns/pattern-10.svg')" }}
                />
                <div
                  className="absolute bottom-10 -left-20 w-[450px] h-[550px] opacity-[0.06] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0 select-none animate-pattern-wave"
                  style={{ backgroundImage: "url('/patterns/pattern-5.svg')" }}
                />
              </div>

              <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* Section Title — Elegant Editorial Playfair Display */}
                <div className="mb-20 lg:mb-28 text-left max-w-4xl space-y-4">
                  <span className="font-mono text-[9px] tracking-[0.35em] text-[#EAB308] uppercase font-bold block">
                    SECTION 08 // START YOUR STORY
                  </span>
                  <h2 className="text-4xl md:text-6xl font-light font-serif text-white tracking-wide leading-tight">
                    Every Great Story Begins <br className="hidden md:block" /> With A Conversation
                  </h2>
                  <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed tracking-wide font-light max-w-2xl mt-4">
                    Every memorable production begins with a conversation. Whether you're building a personal brand, launching a campaign, producing an event, or telling a cinematic story, we'd love to hear your vision.
                  </p>
                  <div className="h-[1px] w-20 bg-[#EAB308]/30 mt-6" />
                </div>

                {/* Luxury Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                  {/* Left Side: Editorial Storytelling (45%) */}
                  <div className="lg:col-span-5 space-y-10 text-left relative">
                    {/* Background Narrative Watermark (pattern-6) */}
                    <div
                      className="absolute -top-16 -left-16 w-[450px] h-[550px] opacity-[0.20] pointer-events-none mix-blend-screen bg-no-repeat bg-contain z-0"
                      style={{ backgroundImage: "url('/patterns/pattern-6.svg')" }}
                    />
                    <div className="relative z-10 space-y-10">
                      <div className="space-y-4">
                        <span className="font-mono text-[8px] text-[#EAB308] tracking-widest uppercase block">
                          CO-CREATION PHILOSOPHY
                        </span>
                        <h3 className="font-serif text-2xl text-white font-light leading-snug">
                          We do not believe in standard commissions. We architect customized visual legacies.
                        </h3>
                        <p className="text-white/50 text-xs leading-relaxed font-light font-sans">
                          Every project at Mayavi is treated as a unique masterclass in cinematography, spatial lighting, and brand preservation. We collaborate intimately with creators, founders, and enterprises to distill authentic narratives into timeless visual assets.
                        </p>
                      </div>

                      {/* Elegant Pull Quote */}
                      <div className="border-l border-[#EAB308]/30 pl-6 py-2 space-y-2">
                        <p className="font-serif text-base md:text-lg italic text-amber-50/90 font-light leading-relaxed">
                          "The next frame is entirely yours. Let us render it with quiet confidence."
                        </p>
                        <span className="block font-mono text-[8px] text-white/30 tracking-widest uppercase">
                          — MAYAVI DIRECTORS
                        </span>
                      </div>

                      {/* High-End Location & Info Blocks */}
                      <div className="pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase block">
                            STUDIO SECTOR
                          </span>
                          <div className="space-y-0.5">
                            <p className="font-sans text-xs text-white/80 font-normal">Hyderabad, India</p>
                            <p className="font-mono text-[8px] text-white/40 tracking-wider">AVAILABLE WORLDWIDE</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase block">
                            DIRECT CONNECT
                          </span>
                          <div className="space-y-0.5 font-sans text-xs text-white/80 font-normal font-light">
                            <p>mayavistudios25@gmail.com</p>
                            <p>+91 63017 61783</p>
                            <p className="text-[#EAB308]/60 font-mono text-[8px] tracking-widest uppercase mt-1">@mayavi_mediacreations</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Direct Production Brief Gateway Card */}
                  <div className="lg:col-span-7 bg-[#090717]/80 p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden backdrop-blur-xl min-h-[420px] flex flex-col justify-center text-left space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    {/* Background Glow Effect */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="relative z-10 space-y-4">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#EAB308]">
                        <Sparkles size={12} />
                        <span className="font-mono text-[8.5px] font-bold tracking-[0.25em] uppercase">
                          INTERACTIVE PRODUCTION BRIEF
                        </span>
                      </div>

                      <h3 className="font-serif text-3xl md:text-4xl text-white font-light leading-tight">
                        Ready to Architect Your Visual Legacy?
                      </h3>

                      <p className="text-white/60 text-xs md:text-sm font-sans font-light leading-relaxed max-w-lg">
                        Launch our 4-step Production Configurator to select your creative world, camera optics, budget telemetry, and story parameters in under 60 seconds.
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <button
                        id="contact-section-launch-cta"
                        onClick={() => setContactOpen(true)}
                        className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-mono tracking-[0.2em] bg-[#EAB308] hover:bg-amber-400 text-black font-extrabold transition-all duration-300 shadow-[0_5px_25px_rgba(234,179,8,0.3)] hover:scale-105 active:scale-98 cursor-pointer uppercase flex items-center justify-center space-x-3"
                      >
                        <span>START YOUR PROJECT</span>
                        <ArrowUpRight size={14} className="text-black" />
                      </button>

                      <a
                        href="https://wa.me/916301761783"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-4 rounded-full text-xs font-mono tracking-[0.18em] border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all text-center uppercase"
                      >
                        WhatsApp Direct
                      </a>
                    </div>

                    {/* Telemetry Indicator */}
                    <div className="relative z-10 pt-4 border-t border-white/5 grid grid-cols-3 gap-4 font-mono text-[9px] text-white/40 tracking-wider">
                      <div>
                        <span className="block text-white/20 text-[7px] uppercase mb-0.5">RESPONSE TIME</span>
                        <span className="text-white/80 font-bold">&lt; 2 HOURS</span>
                      </div>
                      <div>
                        <span className="block text-white/20 text-[7px] uppercase mb-0.5">LOCATION</span>
                        <span className="text-white/80 font-bold">HYD / GLOBAL</span>
                      </div>
                      <div>
                        <span className="block text-white/20 text-[7px] uppercase mb-0.5">DISPATCH</span>
                        <span className="text-amber-400 font-bold">DIRECT DISPATCH</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* FOOTER — THE FINAL FRAME */}
            <footer className="relative z-10 w-full bg-[#050505] border-t border-white/5 overflow-hidden py-20 lg:py-32">
              {/* Subtle radial glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-950/10 rounded-full blur-[120px] pointer-events-none" />

              {/* Subtle geometric watermark backdrop (3% opacity) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-[0.03]">
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] stroke-white stroke-[0.5]" fill="none">
                  <circle cx="400" cy="400" r="300" />
                  <circle cx="400" cy="400" r="200" strokeDasharray="6 6" />
                  <rect x="200" y="200" width="400" height="400" rx="10" />
                  <line x1="400" y1="0" x2="400" y2="800" />
                  <line x1="0" y1="400" x2="800" y2="400" />
                </svg>
              </div>

              <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16 lg:space-y-24">

                {/* FINAL EDITORIAL MESSAGE */}
                <div className="text-left space-y-4 max-w-3xl">
                  <span className="font-mono text-[8px] tracking-[0.3em] text-[#EAB308]/60 uppercase block font-semibold">
                    THE FINAL FRAME
                  </span>
                  <h2 className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-white/95 font-light tracking-wide leading-tight">
                    Stories stay.<br />Legacies remain.
                  </h2>
                  <p className="text-white/40 font-sans text-xs md:text-sm font-light leading-relaxed max-w-lg">
                    Every unforgettable story begins with one decision. Let’s create something worth remembering.
                  </p>
                </div>

                <hr className="border-white/5" />

                {/* THREE COLUMN GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 text-left items-start">

                  {/* COLUMN ONE: BRAND IDENTITY */}
                  <div className="md:col-span-5 space-y-6">
                    <div className="space-y-3">
                      <Logo iconSize="sm" useOfficial={true} className="justify-start inline-block opacity-90 hover:opacity-100 transition-opacity" />
                      <p className="font-mono text-[9px] tracking-[0.25em] text-[#EAB308] uppercase block mt-2">
                        Where Vertical Meets Cinematic.
                      </p>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed font-sans font-light max-w-sm">
                      Crafting premium cinematic stories, personal brands, creative talent, and unforgettable experiences.
                    </p>
                    <div className="space-y-1 pt-2">
                      <span className="font-mono text-[8px] text-white/30 tracking-widest block uppercase">STUDIO HQ</span>
                      <p className="text-white/70 text-xs font-sans font-light">Hyderabad, India</p>
                      <p className="text-white/40 text-[9px] font-mono tracking-wider uppercase">AVAILABLE WORLDWIDE</p>
                    </div>
                  </div>

                  {/* COLUMN TWO: REFINED NAVIGATION */}
                  <div className="md:col-span-3 space-y-5">
                    <span className="font-mono text-[8px] text-[#EAB308]/80 tracking-[0.3em] uppercase block font-semibold">
                      NAVIGATION
                    </span>
                    <ul className="space-y-3">
                      {[
                        { name: 'Home', href: '#' },
                        { name: 'About', href: '#about' },
                        { name: 'Creative Worlds', href: '#creative-worlds' },
                        { name: 'Portfolio', href: '#portfolio' },
                        { name: 'Process', href: '#process' },
                        { name: 'Collaborations', href: '#collaborations' },
                        { name: 'Client Stories', href: '#client-stories' },
                        { name: 'Start Your Story', href: '#contact' },
                        { name: 'Contact', href: '#contact' }
                      ].map((link, idx) => (
                        <li key={idx}>
                          <a
                            href={link.href}
                            className="group inline-block font-sans text-xs text-white/60 hover:text-white transition-colors duration-300 relative py-0.5"
                          >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#EAB308] group-hover:w-full transition-all duration-300" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* COLUMN THREE: CREATIVE WORLDS & SOCIAL CONNECT */}
                  <div className="md:col-span-4 space-y-6">
                    <div className="space-y-4">
                      <span className="font-mono text-[8px] text-[#EAB308]/80 tracking-[0.3em] uppercase block font-semibold">
                        CREATIVE WORLDS
                      </span>
                      <ul className="space-y-3">
                        {[
                          'Media Production',
                          'Personal Branding',
                          'Talent Development',
                          'Events & Experiences'
                        ].map((world, idx) => (
                          <li key={idx}>
                            <a
                              href="#creative-worlds"
                              className="group inline-block font-sans text-xs text-white/60 hover:text-white transition-colors duration-300 relative py-0.5"
                            >
                              {world}
                              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-500 group-hover:w-full transition-all duration-300" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <span className="font-mono text-[8px] text-white/30 tracking-widest block uppercase">
                        DIRECT CHANNELS
                      </span>
                      <div className="flex flex-wrap gap-4 items-center">
                        {[
                          { icon: <Instagram size={14} />, href: 'https://instagram.com/mayavi_mediacreations', label: 'Instagram' },
                          { icon: <Youtube size={14} />, href: 'https://youtube.com/mayavimedia', label: 'YouTube' },
                          { icon: <Linkedin size={14} />, href: 'https://linkedin.com/company/mayavimedia', label: 'LinkedIn' },
                          { icon: <MessageSquare size={14} />, href: 'https://wa.me/916301761783?text=Greetings%20Mayavi!%20I%20watched%20your%20showcase%20and%20would%20love%20to%20collaborate%20on%20a%20premium%20visual%20project%20together.', label: 'WhatsApp' },
                          { icon: <Mail size={14} />, href: 'mailto:mayavistudios25@gmail.com', label: 'Email' }
                        ].map((social, idx) => (
                          <a
                            key={idx}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={social.label}
                            className="w-8 h-8 rounded-full border border-white/10 hover:border-[#EAB308] flex items-center justify-center text-white/60 hover:text-[#EAB308] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
                          >
                            {social.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* BOTTOM STRIP */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                  <span className="font-mono text-[9px] tracking-wider text-white/30">
                    © 2026 MAYAVI MEDIA CREATIONS. ALL ARCHITECTURAL RIGHTS RESERVED.
                  </span>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={navigateToAdmin}
                      className="inline-flex items-center space-x-1.5 font-mono text-[9px] tracking-widest text-white/40 hover:text-[#EAB308] transition-colors cursor-pointer group"
                      title="Open Executive Admin Dashboard (or press Ctrl + Shift + A)"
                    >
                      <Lock size={10} className="text-[#EAB308]/70 group-hover:text-[#EAB308]" />
                      <span>ADMIN ACCESS</span>
                    </button>
                    <span className="font-mono text-[9px] tracking-widest text-[#EAB308]/60 uppercase">
                      Directed by Mayavi.
                    </span>
                  </div>
                </div>

              </div>
            </footer>

            {/* DEDICATED SERVICE WORLD / PILLAR OVERLAY & ENROLLMENT SYSTEM */}
            <AnimatePresence>
              {false && activeWorld && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-neutral-950/98 backdrop-blur-xl flex justify-center items-center overflow-y-auto p-4 md:p-10 text-white"
                >
                  {/* Grid watermark background */}
                  <div className="absolute inset-0 bg-grid-light opacity-[0.04] pointer-events-none" />
                  <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
                  <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

                  {/* Persistent Fixed Top Close Button so it never scrolls out of view */}
                  <button
                    onClick={() => setActiveWorld(null)}
                    className="fixed top-6 right-6 md:top-8 md:right-8 z-[60] flex items-center space-x-2 px-4 py-2.5 rounded-full bg-neutral-900/90 backdrop-blur-md border border-white/10 text-white/70 hover:text-[#EAB308] hover:border-[#EAB308]/30 transition-all cursor-pointer group shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  >
                    <X size={14} className="transform transition-transform group-hover:rotate-90 duration-300" />
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold">CLOSE PREVIEW</span>
                  </button>

                  {/* Main Stage Modal Container */}
                  <motion.div
                    initial={{ scale: 0.96, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.96, y: 20 }}
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                    className="relative w-full max-w-6xl bg-gradient-to-b from-[#0b081a]/95 to-[#04020a]/95 rounded-3xl border border-white/10 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.95)] flex flex-col lg:flex-row min-h-[80vh] z-10 my-8"
                  >
                    {/* Left Column: Rich Editorial Story & Specs (50% width on large screens) */}
                    <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden bg-black/45">
                      <div className="space-y-6 relative z-10 text-left">
                        {/* Premium Back Navigation Option */}
                        <button
                          onClick={() => setActiveWorld(null)}
                          className="inline-flex items-center space-x-2.5 text-[9px] font-mono tracking-[0.25em] text-white/45 hover:text-[#EAB308] transition-colors uppercase cursor-pointer mb-2 group"
                        >
                          <span className="transform transition-transform group-hover:-translate-x-1 duration-300">←</span>
                          <span>BACK TO CINEMATIC PHILOSOPHY</span>
                        </button>

                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-[11px] text-[#EAB308] font-bold tracking-widest bg-amber-500/10 px-2.5 py-1 rounded">
                            WORLD {activeWorld.number}
                          </span>
                          <span className="w-8 h-[1px] bg-white/20" />
                          <span className="font-mono text-[8.5px] text-white/40 tracking-[0.25em] uppercase">
                            {activeWorld.category}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h2 className="text-3xl md:text-5xl font-light font-serif italic text-white leading-tight">
                            {activeWorld.title}
                          </h2>
                          <p className="font-mono text-[10px] text-[#EAB308] tracking-widest uppercase font-medium">
                      // {activeWorld.subtitle}
                          </p>
                        </div>

                        <p className="text-white/80 font-sans text-sm font-light leading-relaxed italic border-l-2 border-amber-500/40 pl-4">
                          "{activeWorld.tagline}"
                        </p>

                        <p className="text-white/60 font-sans text-xs md:text-sm leading-relaxed font-light">
                          {activeWorld.detailedStory}
                        </p>

                        {/* Specific Disciplines Breakdown */}
                        <div className="space-y-4 pt-4">
                          <h4 className="font-mono text-[9px] text-white/30 tracking-widest uppercase">
                            CORE DISCIPLINARY STREAMS
                          </h4>
                          <div className="space-y-3">
                            {activeWorld.disciplines.map((d, index) => (
                              <div key={index} className="flex items-start space-x-3 group">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0 group-hover:scale-125 transition-transform" />
                                <div>
                                  <h5 className="font-display font-bold text-xs text-white/90">{d.title}</h5>
                                  <p className="text-[11px] text-white/50 leading-relaxed font-light mt-0.5">{d.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Technical System Parameters Grid */}
                      <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5 mt-8 text-left relative z-10">
                        {activeWorld.specs.map((spec, index) => (
                          <div key={index} className="space-y-1">
                            <span className="font-mono text-[7.5px] text-white/40 tracking-widest block uppercase">
                              {spec.label}
                            </span>
                            <p className="font-display font-medium text-xs text-white/90">
                              {spec.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Understated bottom marker */}
                      <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-[0.015] font-serif italic text-[180px] select-none pointer-events-none font-bold">
                        {activeWorld.number}
                      </div>
                    </div>

                    {/* Right Column: Premium Booking & Enrollment Form (50% width) */}
                    <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#070512]/50 relative">
                      <AnimatePresence mode="wait">
                        {enrollSubmitted ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6 text-center"
                          >
                            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400 shadow-[0_0_20px_rgba(234,179,8,0.15)]">
                              <CheckCircle2 size={28} />
                            </div>

                            <div className="space-y-2">
                              <span className="font-mono text-[9px] text-[#EAB308] tracking-[0.3em] font-bold block uppercase">
                                TRANSMISSION SECURED // RESERVATION RESERVED
                              </span>
                              <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">
                                Alignment Scheduled
                              </h3>
                              <p className="text-white/60 text-xs font-light max-w-sm mx-auto leading-relaxed">
                                Thank you. Your request has been logged inside our master production ledger. A principal director will connect within 24 hours.
                              </p>
                            </div>

                            {/* Luxurious Monospace Metadata Receipt Slate Card */}
                            <div className="bg-black/40 border border-white/10 rounded-2xl p-5 max-w-sm mx-auto text-left font-mono relative overflow-hidden shadow-2xl">
                              <div className="absolute top-0 right-0 bg-[#EAB308]/10 text-[#EAB308] text-[7px] px-2 py-0.5 rounded-bl border-l border-b border-white/10 font-bold">
                                ACTIVE STATUS
                              </div>
                              <span className="text-[8px] text-white/30 tracking-widest uppercase block mb-3 border-b border-white/5 pb-2">
                                MAYAVI LEDGER BLUEPRINT SYSTEM
                              </span>

                              <div className="space-y-2 text-[10px]">
                                <div className="flex justify-between">
                                  <span className="text-white/40">REGISTRATION CODE:</span>
                                  <span className="text-amber-400 font-bold">{enrollCode}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/40">CLIENT CONTEXT:</span>
                                  <span className="text-white/80">{enrollName}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/40">CREATIVE SEGMENT:</span>
                                  <span className="text-white/80">{activeWorld.title}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/40">SELECTED FOCUS:</span>
                                  <span className="text-white/80 max-w-[180px] text-right truncate">{enrollOption || 'Default Legacy Scope'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-white/40">SERVICE SUITE:</span>
                                  <span className="text-violet-400 font-bold">{enrollTier}</span>
                                </div>
                                <div className="flex justify-between border-t border-white/5 pt-2 mt-2">
                                  <span className="text-white/40">FORMAT LOG:</span>
                                  <span className="text-white/60 text-[9px]">RAW 8K // LOG-C REC2020</span>
                                </div>
                              </div>
                            </div>

                            <div className="pt-4">
                              <button
                                onClick={() => setActiveWorld(null)}
                                className="px-6 py-3 rounded-full text-[10px] font-mono tracking-widest bg-white text-black font-bold hover:bg-amber-400 hover:text-black transition-all duration-300 uppercase cursor-pointer"
                              >
                                DISMISS PREVIEW
                              </button>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6 text-left"
                          >
                            <div className="space-y-2">
                              <span className="font-mono text-[9px] text-[#EAB308] tracking-[0.25em] font-bold block uppercase">
                                SECURE TRANSMISSION FORM
                              </span>
                              <h3 className="text-xl md:text-2xl font-display font-black text-white">
                                {activeWorld.enrollmentLabel}
                              </h3>
                              <p className="text-white/50 text-xs font-sans font-light">
                                Establish your scope parameters, select your package tiers, and register your intent with our creative directorship.
                              </p>
                            </div>

                            <form onSubmit={handleEnrollmentSubmit} className="space-y-4">
                              {/* Dynamic Focus Selection Dropdown based on active world category */}
                              <div className="space-y-1.5">
                                <label className="font-mono text-[8px] text-white/40 tracking-widest block uppercase">
                                  1. SELECT FOCUS SPECIFICATION
                                </label>
                                <select
                                  required
                                  value={enrollOption}
                                  onChange={(e) => setEnrollOption(e.target.value)}
                                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-light focus:outline-none focus:border-amber-500 transition-colors"
                                >
                                  <option value="" className="bg-neutral-900 text-white/40">-- Choose Focus Area --</option>
                                  {activeWorld.formType === 'commission' && (
                                    <>
                                      <option value="Bespoke Brand Legacy Film" className="bg-[#120F22] text-white">Bespoke Brand Legacy Film (ARRI LF)</option>
                                      <option value="Cinema Commercial Spot" className="bg-[#120F22] text-white">Cinema Commercial Spot (RED V-Raptor)</option>
                                      <option value="Artistic Product Editorial" className="bg-[#120F22] text-white">Artistic Product Editorial (Ultra-Macro)</option>
                                    </>
                                  )}
                                  {activeWorld.formType === 'branding' && (
                                    <>
                                      <option value="Founder's Cinematic Package" className="bg-[#120F22] text-white">Founder's Cinematic Package</option>
                                      <option value="Executive Editorial Portraiture" className="bg-[#120F22] text-white">Executive Editorial Portraiture</option>
                                      <option value="Full Public Presence Identity" className="bg-[#120F22] text-white">Full Public Presence Identity</option>
                                    </>
                                  )}
                                  {activeWorld.formType === 'enroll' && (
                                    <>
                                      <option value="Cinematography & Optical Physics (Aug 2026)" className="bg-[#120F22] text-white">Cinematography & Optical Physics (Aug 2026)</option>
                                      <option value="Post-Production Grading & Color (Sep 2026)" className="bg-[#120F22] text-white">Post-Production Grading & Color (Sep 2026)</option>
                                      <option value="Creative Directing Intensive (Oct 2026)" className="bg-[#120F22] text-white">Creative Directing Intensive (Oct 2026)</option>
                                    </>
                                  )}
                                  {activeWorld.formType === 'event' && (
                                    <>
                                      <option value="Stadium Event & Projection Mapping" className="bg-[#120F22] text-white">Stadium Event & Projection Mapping</option>
                                      <option value="Prestige Product Reveal Setup" className="bg-[#120F22] text-white">Prestige Product Reveal Setup</option>
                                      <option value="Interactive Experiential Installation" className="bg-[#120F22] text-white">Interactive Experiential Installation</option>
                                    </>
                                  )}
                                </select>
                              </div>

                              {/* Custom Dynamic Tier Radio select buttons */}
                              <div className="space-y-2">
                                <label className="font-mono text-[8px] text-white/40 tracking-widest block uppercase">
                                  2. SECURE SERVICE SUITE
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                  {[
                                    { label: 'Elite Premium Suite', desc: 'Full custom cinema workflow & director oversight' },
                                    { label: 'Standard Studio Suite', desc: 'Polished editorial grading & core crew deployment' }
                                  ].map((tier) => (
                                    <button
                                      key={tier.label}
                                      type="button"
                                      onClick={() => setEnrollTier(tier.label)}
                                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${enrollTier === tier.label ? 'border-amber-500 bg-amber-500/5' : 'border-white/5 hover:border-white/10'}`}
                                    >
                                      <span className="font-display font-bold text-xs text-white block">{tier.label}</span>
                                      <span className="text-[9px] text-white/40 leading-tight block mt-0.5">{tier.desc}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Client Identifiers Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <div className="space-y-1">
                                  <label className="font-mono text-[8px] text-white/40 tracking-widest block uppercase">FULL NAME</label>
                                  <input
                                    type="text"
                                    required
                                    placeholder="e.g. Rahul Sharma"
                                    value={enrollName}
                                    onChange={(e) => setEnrollName(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 text-xs font-light transition-all"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="font-mono text-[8px] text-white/40 tracking-widest block uppercase">EMAIL ADDRESS</label>
                                  <input
                                    type="email"
                                    required
                                    placeholder="e.g. rahul@domain.com"
                                    value={enrollEmail}
                                    onChange={(e) => setEnrollEmail(e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-500 text-xs font-light transition-all"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="font-mono text-[8px] text-white/40 tracking-widest block uppercase">PROJECT TIMELINE & CONCEPT SCOPE</label>
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
                                    <span>{activeWorld.enrollmentLabel}</span>
                                    <Send size={11} />
                                  </>
                                )}
                              </button>
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>


      {/* IMMERSIVE VERTICAL SHOWREEL LIGHTBOX DIALOG */}
      <AnimatePresence>
        {showreelOpen && (
          <motion.div
            id="showreel-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 md:p-12 overflow-y-auto no-scrollbar"
          >
            {/* Ambient Pattern Watermark (pattern-7) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] opacity-[0.07] pointer-events-none mix-blend-screen bg-no-repeat bg-center bg-contain z-0 select-none animate-pattern-float"
              style={{ backgroundImage: "url('/patterns/pattern-7.svg')" }}
            />

            {/* Modal Header */}
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto shrink-0 relative z-20 pb-2">
              <div>
                <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] text-[#EAB308] uppercase block mb-0.5 sm:mb-1">
                  MAYAVI MEDIA CREATIONS // SHOWCASE
                </span>
                <h2 className="font-sans font-bold text-base sm:text-lg md:text-xl text-white tracking-wide">
                  Vertical Cinematic Showreel (2026 Director's Cut)
                </h2>
              </div>

              <button
                id="close-showreel-btn"
                onClick={() => {
                  setShowreelOpen(false);
                  if (typeof window !== 'undefined' && window.location.hash === '#showreel') {
                    window.history.replaceState(null, '', window.location.pathname);
                  }
                }}
                className="p-2 sm:p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/30 transition-all text-white flex items-center justify-center cursor-pointer"
              >
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>

            {/* Main Stage split section */}
            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 max-w-6xl mx-auto w-full py-4 md:py-6 my-auto relative z-20 shrink-0 min-h-0">

              {/* Left Brief description */}
              <div className="lg:w-1/3 space-y-6 text-left hidden lg:block shrink-0">
                <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  <Sparkles size={11} className="text-amber-400" />
                  <span className="font-mono text-[8px] tracking-widest text-amber-400">9:16 ARRI RAW COMPOSE</span>
                </div>
                <h3 className="font-sans font-extrabold text-3xl tracking-tight leading-tight">
                  Composed for Mobile Cinema
                </h3>
                <p className="font-sans text-xs text-white/60 leading-relaxed">
                  Over 82% of premium mobile content is consumed vertically, yet standard approaches treat it as an afterthought. We compose for the vertical grid from the ground up using luxury camera configurations to present outstanding motion films.
                </p>

                <div className="space-y-2 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-white/40">COLOR PIPELINE</span>
                    <span className="text-white/80">LUT PACK REC709</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-white/40">MASTER LENS</span>
                    <span className="text-amber-400">ZEISS S35 ULTRA</span>
                  </div>
                </div>
              </div>

              {/* Smartphone Frame Simulator Device */}
              <div className="relative w-full max-w-[220px] xs:max-w-[250px] sm:max-w-[280px] md:max-w-[310px] aspect-[9/16] bg-black rounded-[32px] sm:rounded-[42px] border-4 border-white/15 shadow-[0_0_50px_rgba(234,179,8,0.15)] overflow-hidden flex flex-col justify-between p-3 sm:p-4 my-auto shrink-0">

                {/* Smartphone camera notch */}
                <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-3.5 sm:h-4 bg-black rounded-full z-30" />

                {/* Video Playback representation */}
                <div className="absolute inset-0 z-10 bg-neutral-950">
                  <AnimatePresence mode="wait">
                    {(() => {
                      const chapters = cms.showreel?.chapters && cms.showreel.chapters.length > 0
                        ? cms.showreel.chapters
                        : [
                            { id: 'scen0', title: 'ACT I: THE FRAME', subtitle: 'The Light Of Modern Art', posterUrl: '/showreel_act1.png', videoUrl: '' }
                          ];
                      const activeChapter = chapters[showreelScene % chapters.length];
                      const isDirect = activeChapter.videoUrl && detectVideoPlatform(activeChapter.videoUrl) === 'direct';

                      return (
                        <motion.div
                          key={activeChapter.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          className="relative w-full h-full"
                        >
                          {activeChapter.videoUrl ? (
                            isDirect ? (
                              <video
                                src={activeChapter.videoUrl}
                                poster={activeChapter.posterUrl}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="relative w-full h-full bg-black">
                                {activeChapter.posterUrl && (
                                  <img
                                    src={activeChapter.posterUrl}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover brightness-60 pointer-events-none"
                                  />
                                )}
                                <iframe
                                  src={getVideoEmbedUrl(activeChapter.videoUrl)}
                                  className="relative z-10 w-full h-full border-0 pointer-events-auto"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                  allowFullScreen
                                />
                              </div>
                            )
                          ) : (
                            <img
                              src={activeChapter.posterUrl || '/showreel_act1.png'}
                              alt={activeChapter.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover brightness-75 scale-105"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
                          <div className="absolute inset-x-3 sm:inset-x-4 bottom-8 sm:bottom-12 text-center text-white space-y-1 sm:space-y-2 pointer-events-none">
                            <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-[#EAB308] uppercase block">
                              {activeChapter.title}
                            </span>
                            <p className="font-display font-bold text-xs sm:text-sm tracking-tight">{activeChapter.subtitle}</p>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>

                  {/* Shutter lines overlay */}
                  <div className="absolute inset-0 pointer-events-none z-20 border border-white/5 rounded-[32px] sm:rounded-[36px]" />
                  <div className="absolute top-8 sm:top-12 left-3 sm:left-4 z-20 font-mono text-[6.5px] sm:text-[7px] text-white/50 tracking-widest">
                    REC 04:12 // LOG-C
                  </div>
                  <div className="absolute top-8 sm:top-12 right-3 sm:right-4 z-20 font-mono text-[6.5px] sm:text-[7px] text-red-500 tracking-widest animate-pulse">
                    ● ACTIVE STREAM
                  </div>

                  {/* Fullscreen Button */}
                  {(() => {
                    const chapters = cms.showreel?.chapters && cms.showreel.chapters.length > 0 ? cms.showreel.chapters : [];
                    const cur = chapters[showreelScene % (chapters.length || 1)];
                    if (!cur?.videoUrl) return null;
                    return (
                      <button
                        type="button"
                        onClick={() => setActiveProject({
                          id: cur.id,
                          title: cur.title,
                          category: cur.category || 'Vertical Cinema',
                          duration: cur.duration || '0:45',
                          imageUrl: cur.posterUrl || '/showreel_act1.png',
                          camera: cur.camera || 'ARRI Alexa Mini LF',
                          lens: cur.lens || 'Zeiss Supreme Prime',
                          location: 'Mayavi Studio Stage A',
                          storyBrief: cur.subtitle,
                          editorialSentence: cur.directorNotes || cur.subtitle,
                          videoUrl: cur.videoUrl,
                          scenes: ['/hero_stage_a.png']
                        })}
                        className="absolute bottom-14 right-3 z-30 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white text-[8px] font-mono flex items-center space-x-1 hover:border-[#EAB308] hover:text-[#EAB308] transition-all cursor-pointer shadow-lg"
                        title="Watch in Expanded Lightbox"
                      >
                        <Play size={9} className="text-[#EAB308]" />
                        <span>EXPAND</span>
                      </button>
                    );
                  })()}

                  {/* Scrubber progress bar (only active if auto-playing) */}
                  {showreelAutoPlay && (
                    <div className="absolute bottom-4 sm:bottom-6 inset-x-3 sm:inset-x-4 z-20 h-[2px] sm:h-[2.5px] bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        key={showreelScene}
                        className="h-full bg-amber-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 9.0, ease: "linear" }}
                      />
                    </div>
                  )}
                </div>

              </div>

              {/* Right Side interactive list select */}
              <div className="w-full lg:w-1/3 flex flex-col justify-center space-y-3 sm:space-y-4 shrink-0">
                <span className="font-mono text-[8px] tracking-[0.2em] text-white/40 uppercase">
                  Select Cinematic Scene
                </span>

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 max-h-[380px] overflow-y-auto pr-1">
                  {cms.showreel.chapters.map((scene, idx) => (
                    <button
                      key={scene.id}
                      onClick={() => {
                        setShowreelScene(idx);
                        setShowreelAutoPlay(false);
                      }}
                      className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer ${showreelScene === idx ? 'border-amber-500 bg-white/5 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'border-white/5 hover:border-white/10 bg-transparent'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-[9px] sm:text-[10px] tracking-widest ${showreelScene === idx ? 'text-amber-400 font-bold' : 'text-white/40'}`}>
                          {scene.title}
                        </span>
                        {showreelScene === idx && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                      </div>
                      <p className="text-[10px] sm:text-xs text-white/70 mt-1 line-clamp-1 sm:line-clamp-none">{scene.directorNotes || scene.subtitle}</p>
                    </button>
                  ))}
                </div>

                <div className="pt-2 sm:pt-4 flex justify-between items-center text-[9px] sm:text-[10px] text-white/40 font-mono">
                  <button
                    type="button"
                    onClick={() => setShowreelAutoPlay(!showreelAutoPlay)}
                    className={`px-2.5 py-1 rounded-lg border text-[9px] font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
                      showreelAutoPlay ? 'bg-amber-400/20 border-amber-400 text-amber-300' : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${showreelAutoPlay ? 'bg-amber-400 animate-pulse' : 'bg-white/30'}`} />
                    <span>{showreelAutoPlay ? 'Auto-Cycle: Active (9s)' : 'Auto-Cycle: Paused'}</span>
                  </button>
                  <span>ESC TO DISMISS</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center border-t border-white/5 pt-4 sm:pt-6 gap-3 sm:gap-4 shrink-0 text-center sm:text-left">
              <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-white/30">
                © 2026 MAYAVI CREATIVE STUDIO. ALL INTELLECTUAL RECORDINGS RESERVED.
              </span>

              <div className="flex items-center space-x-4 sm:space-x-6 text-[9px] sm:text-[10px] font-mono text-white/50">
                <span>DIRECTOR ENGINE 1.2</span>
                <span>ARRI LOG-C SPACE</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>



      {/* Cinematic Video Lightbox Modal overlay - No separate page transitions */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 md:p-10"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl bg-[#090616] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Aspect Ratio Video Container */}
              <div className="relative aspect-[16/9] w-full bg-black">
                {activeProject.videoUrl ? (
                  <iframe
                    src={activeProject.videoUrl}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <img src={activeProject.imageUrl} alt={activeProject.title} className="w-full h-full object-cover" />
                )}
              </div>

              {/* Detail Info Bar below Video */}
              <div className="p-6 md:p-8 space-y-4 text-left">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[9px] text-[#EAB308] tracking-widest uppercase font-bold block mb-1">
                      {activeProject.category} // {activeProject.duration}
                    </span>
                    <h3 className="text-xl md:text-3xl font-serif font-light text-white leading-tight">
                      {activeProject.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setActiveProject(null)}
                    className="px-6 py-2.5 rounded-full border border-white/10 hover:border-red-500/35 bg-white/5 hover:bg-red-500/5 text-white/80 hover:text-red-400 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 active:scale-98 cursor-pointer"
                  >
                    CLOSE VIDEO
                  </button>
                </div>

                <p className="text-white/60 font-sans text-xs md:text-sm font-light leading-relaxed max-w-3xl">
                  {activeProject.storyBrief || activeProject.editorialSentence}
                </p>

                {/* Technical stats footer inside Lightbox */}
                <div className="pt-4 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 text-left font-mono text-[9px] text-white/40 tracking-wider">
                  <div>
                    <span className="block text-white/20 text-[7px] uppercase mb-0.5">CAMERA Rig</span>
                    <span className="text-white/80">{activeProject.camera}</span>
                  </div>
                  <div>
                    <span className="block text-white/20 text-[7px] uppercase mb-0.5">LENS Pairing</span>
                    <span className="text-white/80">{activeProject.lens}</span>
                  </div>
                  <div>
                    <span className="block text-white/20 text-[7px] uppercase mb-0.5">LOCATION Site</span>
                    <span className="text-white/80">{activeProject.location}</span>
                  </div>
                  <div>
                    <span className="block text-white/20 text-[7px] uppercase mb-0.5">STATUS</span>
                    <span className="text-emerald-400 font-bold">RELEASED</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dedicated Studio Production Inquiry Modal Overlay */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto"
            onClick={() => setContactOpen(false)}
          >
            {/* Ambient Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

            <motion.div
              initial={{ scale: 0.94, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 25, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="relative w-full max-w-2xl max-h-[90dvh] overflow-y-auto no-scrollbar bg-[#090717]/95 border border-amber-400/25 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 text-left">
                <div className="flex items-center space-x-2.5">
                  <Sparkles size={14} className="text-[#EAB308]" />
                  <span className="font-mono text-[9px] text-[#EAB308] font-bold tracking-[0.25em] uppercase">
                    STUDIO INQUIRY // MAYAVI MEDIA CREATIONS
                  </span>
                </div>
                <button
                  onClick={() => setContactOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Form Content inside Modal */}
              <AnimatePresence mode="wait">
                {/* Loading State */}
                {formLoading && (
                  <motion.div
                    key="modal-loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center space-y-6 py-12"
                  >
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border border-amber-500/20 border-t-amber-500"
                      />
                      <div className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg text-white font-light italic">
                        Dispatching Brief to WhatsApp...
                      </h4>
                      <p className="font-mono text-[8px] text-white/40 tracking-widest uppercase">
                        CONNECTING DIRECTLY WITH MAYAVI DIRECTORS
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Submitted Thank You State */}
                {formSubmitted && !formLoading && (
                  <motion.div
                    key="modal-thankyou"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-6 py-6"
                  >
                    <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto text-[#EAB308]">
                      <CheckCircle2 size={24} />
                    </div>
                    <div className="space-y-2">
                      <span className="font-mono text-[8px] text-[#EAB308] tracking-[0.25em] uppercase font-bold block">
                        BRIEF TRANSMISSION DISPATCHED
                      </span>
                      <h3 className="font-serif text-2xl text-white font-light">Thank You</h3>
                      <p className="text-white/70 text-xs font-sans font-light max-w-sm mx-auto leading-relaxed">
                        Your production parameters have been generated. We've opened WhatsApp to connect directly with our directorial team.
                      </p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl max-w-xs mx-auto space-y-1">
                      <span className="font-mono text-[7px] text-white/30 tracking-widest block uppercase">
                        BRIEF IDENTIFIER
                      </span>
                      <p className="font-mono text-xs text-[#EAB308] font-bold tracking-widest">{leadId}</p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setContactOpen(false);
                        }}
                        className="px-6 py-2.5 rounded-full font-mono text-[9px] tracking-widest bg-[#EAB308] text-black font-bold hover:bg-amber-400 transition-all uppercase cursor-pointer"
                      >
                        Close Window
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* The 4-Step Interactive Configurator Form */}
                {!formLoading && !formSubmitted && (
                  <motion.div
                    key="modal-form-fields"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Stepper Progress Bar */}
                    <div className="space-y-2.5 border-b border-white/10 pb-4">
                      <div className="flex items-center justify-between text-left">
                        <span className="font-mono text-[8px] tracking-[0.25em] text-[#EAB308] uppercase block font-bold">
                          CONFIGURATOR // STEP 0{formStep} OF 04
                        </span>
                        <span className="font-mono text-[8px] text-white/40 tracking-widest uppercase">
                          {formStep === 1 ? '01 WORLDS' : formStep === 2 ? '02 SPECS' : formStep === 3 ? '03 TELEMETRY' : '04 DISPATCH'}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5 h-1">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            onClick={() => setFormStep(step)}
                            className={`h-full rounded-full transition-all duration-500 cursor-pointer ${step <= formStep ? 'bg-[#EAB308]' : 'bg-white/10'
                              }`}
                          />
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
                      {/* STEP 1: CREATIVE WORLD SELECTION */}
                      {formStep === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-4"
                        >
                          <div className="space-y-1">
                            <h4 className="font-serif text-lg text-white font-light">Select Creative Service World</h4>
                            <p className="text-xs text-white/50 font-light">Choose the visual domain for your production inquiry.</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-1">
                            {[
                              { title: 'Media Production', icon: Camera, desc: 'Brand Films & Commercials' },
                              { title: 'Personal Branding', icon: User, desc: 'Executive Identity & Profiles' },
                              { title: 'Talent Development', icon: GraduationCap, desc: 'Mentorship & Workshops' },
                              { title: 'Events & Experiences', icon: Sparkles, desc: 'Live Feeds & Stage Mapping' },
                              { title: 'Social Media Strategy', icon: Globe, desc: 'Platform Growth & Hooks' },
                              { title: 'UGC & Creator Content', icon: Film, desc: 'Authentic Regional Creators' }
                            ].map((item) => {
                              const isSelected = clientCreativeWorld === item.title;
                              const IconComponent = item.icon;
                              return (
                                <div
                                  key={item.title}
                                  onClick={() => setClientCreativeWorld(item.title)}
                                  className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-2 text-left ${isSelected
                                    ? 'bg-amber-500/10 border-amber-400/60 shadow-[0_0_15px_rgba(234,179,8,0.15)] text-white'
                                    : 'bg-white/[0.02] border-white/8 hover:bg-white/5 text-white/70 hover:text-white'
                                    }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <IconComponent size={13} className={isSelected ? 'text-amber-400' : 'text-white/40'} />
                                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-400' : 'bg-white/10'}`} />
                                  </div>
                                  <div>
                                    <h5 className="font-sans font-medium text-xs text-white">{item.title}</h5>
                                    <p className="font-mono text-[8px] text-white/40 tracking-wider mt-0.5">{item.desc}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="pt-2 flex justify-end">
                            <button
                              type="button"
                              onClick={() => setFormStep(2)}
                              className="px-6 py-2.5 rounded-full font-mono text-[9px] tracking-widest bg-[#EAB308] text-black font-bold hover:bg-amber-400 transition-all cursor-pointer uppercase flex items-center space-x-2"
                            >
                              <span>Next: Production Specs</span>
                              <span>→</span>
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: PRODUCTION FORMAT & CAMERA OPTICS */}
                      {formStep === 2 && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-4"
                        >
                          <div className="space-y-1">
                            <h4 className="font-serif text-lg text-white font-light">Production Format & Optics</h4>
                            <p className="text-xs text-white/50 font-light">Customize your production medium and camera rig.</p>
                          </div>

                          <div className="space-y-2">
                            <label className="font-mono text-[8.5px] text-white/50 tracking-widest uppercase block">PRODUCTION FORMAT</label>
                            <div className="grid grid-cols-2 gap-2">
                              {['Brand Film', 'Vertical Series (9:16)', 'Commercial Campaign', 'Executive Documentary'].map((fmt) => (
                                <button
                                  key={fmt}
                                  type="button"
                                  onClick={() => setClientFormat(fmt)}
                                  className={`px-3 py-2 rounded-xl border font-mono text-[8.5px] tracking-wider text-center transition-all cursor-pointer ${clientFormat === fmt
                                    ? 'bg-amber-400/10 border-amber-400/50 text-amber-400 font-bold'
                                    : 'bg-white/[0.02] border-white/8 text-white/50 hover:text-white'
                                    }`}
                                >
                                  {fmt}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="font-mono text-[8.5px] text-white/50 tracking-widest uppercase block">CAMERA OPTICS PACKAGE</label>
                            <div className="space-y-2">
                              {[
                                { name: 'ARRI Alexa Mini LF', sub: 'Anamorphic Large Format • Cinema Gold Standard' },
                                { name: 'RED V-Raptor 8K VV', sub: '8K VistaVision Sensor • High Speed Dynamic Capture' },
                                { name: 'Sony FX6 Cinema Rig', sub: 'Compact Full-Frame • Fast-Paced Run & Gun' }
                              ].map((cam) => (
                                <div
                                  key={cam.name}
                                  onClick={() => setClientCamera(cam.name)}
                                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-left ${clientCamera === cam.name
                                    ? 'bg-amber-400/10 border-amber-400/50 text-white'
                                    : 'bg-white/[0.02] border-white/8 text-white/60 hover:text-white'
                                    }`}
                                >
                                  <div>
                                    <span className="font-mono text-xs font-bold text-white block">{cam.name}</span>
                                    <span className="font-mono text-[7.5px] text-white/40 tracking-wider block">{cam.sub}</span>
                                  </div>
                                  <span className={`w-2 h-2 rounded-full ${clientCamera === cam.name ? 'bg-amber-400 shadow-[0_0_8px_#EAB308]' : 'bg-white/10'}`} />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 flex justify-between items-center">
                            <button
                              type="button"
                              onClick={() => setFormStep(1)}
                              className="px-4 py-2 rounded-full font-mono text-[9px] tracking-widest text-white/50 hover:text-white border border-white/10 cursor-pointer uppercase"
                            >
                              ← Back
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormStep(3)}
                              className="px-6 py-2.5 rounded-full font-mono text-[9px] tracking-widest bg-[#EAB308] text-black font-bold hover:bg-amber-400 transition-all cursor-pointer uppercase flex items-center space-x-2"
                            >
                              <span>Next: Telemetry & Budget</span>
                              <span>→</span>
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3: BUDGET SCALE & REAL-TIME TELEMETRY HUD */}
                      {formStep === 3 && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-4"
                        >
                          <div className="space-y-1">
                            <h4 className="font-serif text-lg text-white font-light">Budget Scale & Live Telemetry</h4>
                            <p className="text-xs text-white/50 font-light">Configure production budget scale and timeline parameters.</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <label className="font-mono text-[8.5px] text-white/60 tracking-wider block uppercase">ESTIMATED BUDGET SCALE</label>
                              <span className="font-mono text-xs text-[#EAB308] font-bold">
                                ${clientBudget.toLocaleString()} USD
                              </span>
                            </div>
                            <input
                              type="range"
                              min="5000"
                              max="100000"
                              step="5000"
                              value={clientBudget}
                              onChange={(e) => setClientBudget(Number(e.target.value))}
                              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#EAB308]"
                            />
                          </div>

                          {/* Live Telemetry Box */}
                          <div className="bg-black/60 border border-amber-400/20 p-3.5 rounded-xl space-y-2 text-left shadow-xl">
                            <div className="flex items-center space-x-2 border-b border-white/10 pb-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                              <span className="font-mono text-[8px] text-amber-400 font-bold tracking-widest uppercase">REAL-TIME PRODUCTION TELEMETRY</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-left font-mono text-[8.5px]">
                              <div>
                                <span className="text-white/30 uppercase block">CAMERA SYSTEM:</span>
                                <span className="text-white/90 font-bold">{clientCamera}</span>
                              </div>
                              <div>
                                <span className="text-white/30 uppercase block">FORMAT:</span>
                                <span className="text-white/90 font-bold">{clientFormat}</span>
                              </div>
                              <div>
                                <span className="text-white/30 uppercase block">CREW ALLOCATION:</span>
                                <span className="text-[#EAB308]">
                                  {clientBudget < 20000 ? 'Boutique Crew (3-5)' : clientBudget < 50000 ? 'Mid-Scale Studio (8-12)' : 'Full Studio Crew (20+)'}
                                </span>
                              </div>
                              <div>
                                <span className="text-white/30 uppercase block">MASTER DELIVERABLE:</span>
                                <span className="text-white/90 font-bold">4K RAW 9:16 + 16:9</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="font-mono text-[8.5px] text-white/50 tracking-widest uppercase block">PROJECT TIMELINE</label>
                            <div className="grid grid-cols-3 gap-2">
                              {['Immediate (1-2 Wks)', 'Standard (4-6 Wks)', 'Flexible / Q3'].map((tl) => (
                                <button
                                  key={tl}
                                  type="button"
                                  onClick={() => setClientTimeline(tl)}
                                  className={`px-2 py-1.5 rounded-xl border font-mono text-[8px] tracking-wider text-center transition-all cursor-pointer ${clientTimeline === tl
                                    ? 'bg-amber-400/10 border-amber-400/50 text-amber-400 font-bold'
                                    : 'bg-white/[0.02] border-white/8 text-white/50 hover:text-white'
                                    }`}
                                >
                                  {tl}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="pt-2 flex justify-between items-center">
                            <button
                              type="button"
                              onClick={() => setFormStep(2)}
                              className="px-4 py-2 rounded-full font-mono text-[9px] tracking-widest text-white/50 hover:text-white border border-white/10 cursor-pointer uppercase"
                            >
                              ← Back
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormStep(4)}
                              className="px-6 py-2.5 rounded-full font-mono text-[9px] tracking-widest bg-[#EAB308] text-black font-bold hover:bg-amber-400 transition-all cursor-pointer uppercase flex items-center space-x-2"
                            >
                              <span>Next: Client Details</span>
                              <span>→</span>
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 4: CLIENT DETAILS & STORY BRIEF */}
                      {formStep === 4 && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-4"
                        >
                          <div className="space-y-1">
                            <h4 className="font-serif text-lg text-white font-light">Client Details & Vision Brief</h4>
                            <p className="text-xs text-white/50 font-light">Finalize your coordinates to dispatch your brief.</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="font-mono text-[8.5px] text-white/60 tracking-wider block uppercase">Full Name *</label>
                              <input
                                type="text"
                                required
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                placeholder="Your Name"
                                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 text-xs font-light"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-mono text-[8.5px] text-white/60 tracking-wider block uppercase">Email Address *</label>
                              <input
                                type="email"
                                required
                                value={clientEmail}
                                onChange={(e) => setClientEmail(e.target.value)}
                                placeholder="Your Email"
                                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 text-xs font-light"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="font-mono text-[8.5px] text-white/60 tracking-wider block uppercase">WhatsApp Number *</label>
                              <input
                                type="tel"
                                required
                                value={clientWhatsApp}
                                onChange={(e) => setClientWhatsApp(e.target.value)}
                                placeholder="+91 98765 43210"
                                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 text-xs font-light"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-mono text-[8.5px] text-white/60 tracking-wider block uppercase">Company / Brand</label>
                              <input
                                type="text"
                                value={clientCompany}
                                onChange={(e) => setClientCompany(e.target.value)}
                                placeholder="Brand / Company Name"
                                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 text-xs font-light"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="font-mono text-[8.5px] text-white/60 tracking-wider block uppercase">Tell Us Your Vision *</label>
                            <textarea
                              rows={3}
                              required
                              value={clientBrief}
                              onChange={(e) => setClientBrief(e.target.value)}
                              placeholder="What story or brand legacy are we building together?"
                              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-amber-500/50 text-xs font-light resize-none"
                            />
                          </div>

                          <div className="pt-2 flex justify-between items-center">
                            <button
                              type="button"
                              onClick={() => setFormStep(3)}
                              className="px-4 py-2 rounded-full font-mono text-[9px] tracking-widest text-white/50 hover:text-white border border-white/10 cursor-pointer uppercase"
                            >
                              ← Back
                            </button>
                            <button
                              type="submit"
                              className="px-6 py-2.5 rounded-full text-[9px] font-mono tracking-[0.2em] uppercase bg-[#EAB308] hover:bg-amber-400 text-black font-extrabold shadow-[0_4px_20px_rgba(234,179,8,0.3)] transition-all cursor-pointer flex items-center space-x-2"
                            >
                              <span>LAUNCH PRODUCTION BRIEF</span>
                              <span>→</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Talent Assessment Audition Modal */}
      <AnimatePresence>
        {assessmentOpen && (
          <TalentAssessmentModal
            isOpen={assessmentOpen}
            onClose={() => setAssessmentOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
