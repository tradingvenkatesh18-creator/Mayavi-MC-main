/**
 * Mayavi CMS Central Store
 * Manages all video links, hero video, curated exhibitions, showreels,
 * page content, and integrations with localStorage persistence and live events.
 */

import { useState, useEffect } from 'react';

export interface HeroConfig {
  headline: string;
  subheadline: string;
  quote: string;
  backgroundVideoUrl: string; // 1 cinematic 30-second 1080p video loop (compressed/uncompressed)
  useVideoBackground: boolean;
  posterUrl: string;
  locationTag: string;
  cameraTag: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
}

export interface VideoGlimpse {
  id: string;
  title: string;
  category: string;
  videoUrl: string; // 1080p video loop (max 30s)
  thumbnailUrl: string;
  duration: string;
  caption: string;
  aspectRatio?: '16:9' | '9:16' | '1:1';
}

export interface ShowreelChapter {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  camera: string;
  lens: string;
  videoUrl: string; // YouTube, Vimeo, Instagram, LinkedIn, Drive, or direct MP4
  posterUrl: string;
  duration: string;
  directorNotes: string;
  platform: 'youtube' | 'vimeo' | 'instagram' | 'linkedin' | 'drive' | 'direct';
}

export interface ExhibitionProject {
  id: string;
  title: string;
  category: 'Vertical Fiction' | 'Brand Films' | 'Personal Branding' | 'Luxury Events' | 'Commercials' | 'Campaigns';
  duration: string;
  videoUrl: string; // YouTube, Instagram, LinkedIn, Google Drive, Vimeo, direct MP4
  imageUrl: string;
  camera: string;
  lens: string;
  location: string;
  storyBrief: string;
  editorialSentence: string;
  detailedStory: string;
  behindTheScenes?: string;
  results?: string;
  scenes: string[];
  featured: boolean;
}

export interface CoreService {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  tagline: string;
  description: string;
  detailedStory: string;
  imageUrl: string;
  videoUrl?: string;
  disciplines: { title: string; desc: string }[];
}

export interface AboutConfig {
  tagline: string;
  heading: string;
  quote: string;
  body: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  directorName: string;
  directorTitle: string;
}

export interface InquiryConfig {
  googleSheetsWebhookUrl: string; // Google Apps Script URL
  whatsappNumber: string; // e.g. "919999999999"
  whatsappMessageTemplate: string;
  contactEmail: string;
  contactPhone: string;
  studioAddress: string;
  socialInstagram: string;
  socialYoutube: string;
  socialLinkedin: string;
}

export interface StoredInquiry {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'archived';
}

export interface CMSData {
  hero: HeroConfig;
  videoGlimpses: VideoGlimpse[];
  showreel: {
    title: string;
    tagline: string;
    chapters: ShowreelChapter[];
  };
  curatedExhibitions: ExhibitionProject[];
  coreServices: CoreService[];
  about: AboutConfig;
  integrations: InquiryConfig;
  inquiries: StoredInquiry[];
  lastUpdated: string;
}

const STORAGE_KEY = 'mayavi_cms_store_v1';
const AUTH_PASSWORD_KEY = 'mayavi_admin_password_hash';
const DEFAULT_PASSWORD = 'mayavi2026';

export const DEFAULT_CMS_DATA: CMSData = {
  hero: {
    headline: "CINEMA STARTS LONG BEFORE THE CAMERA ROLLS",
    subheadline: "Architectural storytelling, bespoke optical precision, and cinematic legacies crafted in Hyderabad for visionary global brands.",
    quote: "We don't simply record light. We calibrate time, tension, and human emotion into permanent moving art.",
    backgroundVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    useVideoBackground: false, // Default to interactive lens scroll, toggleable to video loop
    posterUrl: "/hero_stage_a.png",
    locationTag: "STUDIO STAGE A // HYDERABAD",
    cameraTag: "ARRI ALEXA LF // ZEISS SUPREME 35MM",
    ctaPrimaryText: "START A COMMISSION",
    ctaSecondaryText: "WATCH SHOWREEL"
  },
  videoGlimpses: [
    {
      id: "glimpse-1",
      title: "Chiaroscuro Silhouette",
      category: "Vertical Fiction",
      videoUrl: "https://drive.google.com/file/d/1dPMY7XM5rxcrPB9Z1ZBLPIU94xjZCWhf/preview",
      thumbnailUrl: "/hero_stage_a.png",
      duration: "0:24",
      caption: "High-contrast rim lighting capturing stillness before action."
    },
    {
      id: "glimpse-2",
      title: "Executive Intimacy",
      category: "Personal Branding",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "/personal_branding.png?v=2",
      duration: "0:18",
      caption: "Documentary-grade 85mm portraiture of industry leaders."
    },
    {
      id: "glimpse-3",
      title: "Kinetic Stage Energy",
      category: "Luxury Events",
      videoUrl: "https://vimeo.com/76979871",
      thumbnailUrl: "/volumetric_soundstage.png",
      duration: "0:30",
      caption: "Multi-camera spatial sync across 40,000 attendee summits."
    },
    {
      id: "glimpse-4",
      title: "Method Screen Test",
      category: "Talent Development",
      videoUrl: "/studio_soundstage_bg.jpg",
      thumbnailUrl: "/studio_soundstage_bg.jpg",
      duration: "0:22",
      caption: "Audition screen test calibration on 50mm Anamorphic primes."
    },
    {
      id: "glimpse-5",
      title: "Macro Timepiece Escapement",
      category: "Brand Films",
      videoUrl: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=1200",
      thumbnailUrl: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=1200",
      duration: "0:15",
      caption: "Micro-tooth horology precision lit with warm gold diffusion."
    }
  ],
  showreel: {
    title: "Vertical Cinematic Showreel (2026 Director's Cut)",
    tagline: "4 Acts of Visual Precision across South Asia's Premier Stages",
    chapters: [
      {
        id: "sr-1",
        title: "Act I // Pure Optics & High Contrast",
        subtitle: "The Opening Statement",
        category: "Brand Films",
        camera: "ARRI Alexa Mini LF",
        lens: "Zeiss Supreme Prime 50mm T1.5",
        videoUrl: "https://drive.google.com/file/d/1dPMY7XM5rxcrPB9Z1ZBLPIU94xjZCWhf/preview",
        posterUrl: "/showreel_act1.png",
        duration: "0:45",
        directorNotes: "Capturing absolute darkness and pure light balance without digital post-bloat.",
        platform: "drive"
      },
      {
        id: "sr-2",
        title: "Act II // Spatial Choreography",
        subtitle: "Movement & Tension",
        category: "Vertical Fiction",
        camera: "Sony Venice 2 8K",
        lens: "Cooke Anamorphic 35mm",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        posterUrl: "/showreel_act2.png",
        duration: "0:38",
        directorNotes: "Fluid Steadicam tracking shots framing actors through classical geometry.",
        platform: "youtube"
      },
      {
        id: "sr-3",
        title: "Act III // Volumetric Immersion",
        subtitle: "Stage & Spectacle",
        category: "Luxury Events",
        camera: "RED V-Raptor 8K VV",
        lens: "Leica Noctilux 50mm",
        videoUrl: "https://vimeo.com/76979871",
        posterUrl: "/showreel_act3.png",
        duration: "0:52",
        directorNotes: "360-degree LED stage environments synchronized to 24fps shutter angles.",
        platform: "vimeo"
      },
      {
        id: "sr-4",
        title: "Act IV // Human Vulnerability",
        subtitle: "The Unspoken Climax",
        category: "Personal Branding",
        camera: "Hasselblad H6D-100c",
        lens: "HC 80mm f/2.8",
        videoUrl: "https://drive.google.com/file/d/1dPMY7XM5rxcrPB9Z1ZBLPIU94xjZCWhf/preview",
        posterUrl: "/showreel_act4.png",
        duration: "0:30",
        directorNotes: "Intimate medium-format closeups that reveal authentic leadership conviction.",
        platform: "drive"
      }
    ]
  },
  curatedExhibitions: [
    {
      id: "01",
      title: "The Weight of Silence",
      category: "Vertical Fiction",
      duration: "04:12",
      videoUrl: "https://drive.google.com/file/d/1dPMY7XM5rxcrPB9Z1ZBLPIU94xjZCWhf/preview",
      imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=1200",
      camera: "ARRI ALEXA MINI LF",
      lens: "ZEISS SUPREME PRIME 50MM T1.5",
      location: "HAMPI ARCHAEOLOGICAL SITE",
      storyBrief: "A poetic vertical cinema piece framing the quiet, spatial geometry of ancestral ruins.",
      editorialSentence: "A vertical frame containing the entire gravity of an ancestral lineage.",
      detailedStory: "Shot entirely in 9:16 ARRI RAW, this film is an exercise in restraint. Every composition was treated as a permanent editorial painting, letting shadows crawl across five-hundred-year-old temple stones. No camera motion was permitted; the visual story is narrated purely through the passing of natural light and dust particles illuminated in air.",
      behindTheScenes: "We waited forty-eight hours on-site in Hampi for the exact overcast diffusion to align with the temple corridors, bypassing artificial lights to respect natural geometry.",
      results: "Awarded Best Vertical Cinematography at the Curators Pavilion and featured on the front cover of Cinematic Geometrics Monthly.",
      scenes: ["/desert_monolith.png", "/hero_stage_a.png", "/volumetric_soundstage.png"],
      featured: true
    },
    {
      id: "02",
      title: "Heritage & Horology",
      category: "Brand Films",
      duration: "02:18",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      imageUrl: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=1200",
      camera: "RED V-RAPTOR 8K S35",
      lens: "LEICA NOCTILUX 50MM F/0.95",
      location: "COCHIN HERITAGE SUITE",
      storyBrief: "Capturing the intricate ticking mechanics of family watchmakers against dramatic sunset hues.",
      editorialSentence: "Ticking mechanics captured between silence and golden hour shadowlines.",
      detailedStory: "A high-end commercial piece detailing the dedication of multi-generational timepiece craftsman. Using specialized macro probes and ultra-shallow depth of field, we highlighted the microscopic tooth wheels and escape mechanisms, creating a rhythmic visual symphony set to slow acoustic reverberations.",
      behindTheScenes: "To preserve the micro textures of brass gears, we used custom optical macro-tubes designed specifically for the Leica Noctilux’s extreme f/0.95 aperture.",
      results: "Winner of the Prestige Creative Commercial Award for outstanding macro composition and brand storytelling.",
      scenes: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600"
      ],
      featured: true
    },
    {
      id: "03",
      title: "Architectural Noir",
      category: "Personal Branding",
      duration: "03:45",
      videoUrl: "https://vimeo.com/76979871",
      imageUrl: "/personal_branding.png?v=2",
      camera: "HASSELBLAD H6D-100C",
      lens: "HC 80MM F/2.8 REFERENCE",
      location: "FINANCIAL DISTRICT // HYDERABAD",
      storyBrief: "A monochrome study of an executive architect defining skyline proportions.",
      editorialSentence: "Brutalist concrete softened by the subtle vulnerability of personal conviction.",
      detailedStory: "We captured the architect moving through their finished high-rises at 5:00 AM before city commotion began. High-contrast chiaroscuro lighting sculpted their features, highlighting the link between physical space and philosophical intent.",
      behindTheScenes: "All setups utilized single 2.5K HMI lights bounced off untreated matte limestone to produce velvety dark shadows.",
      results: "Selected by Architectural Digest as Top 10 Executive Portraits of the Year.",
      scenes: ["/personal_branding.png?v=2", "/hero_stage_a.png"],
      featured: true
    },
    {
      id: "04",
      title: "Solitude in Crimson",
      category: "Vertical Fiction",
      duration: "01:50",
      videoUrl: "https://drive.google.com/file/d/1dPMY7XM5rxcrPB9Z1ZBLPIU94xjZCWhf/preview",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200",
      camera: "SONY VENICE 2 8K",
      lens: "ANAMORPHIC COOKE 40MM",
      location: "OLD CITY COURTYARD // HYDERABAD",
      storyBrief: "A high-intensity emotional monologue delivered through continuous 9:16 rotation.",
      editorialSentence: "A solitary monologue where shadow and crimson velvet merge.",
      detailedStory: "A masterclass in single-take directing. The camera performs a 720-degree orbital rotation around the protagonist as neon crimson gels transition into cold 5600K daylight.",
      behindTheScenes: "The rotation rig was mechanically counterweighted to eliminate all motor noise and keep the lavalier microphone clean.",
      results: "Over 2.4M organic views across Instagram Reels & YouTube Shorts.",
      scenes: ["/desert_monolith.png", "/showreel_act1.png"],
      featured: true
    },
    {
      id: "05",
      title: "Symphony of Sparks",
      category: "Commercials",
      duration: "01:30",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200",
      camera: "PHANTOM FLEX 4K",
      lens: "ARRI MACRO 100MM",
      location: "INDUSTRIAL GUILD // CHENNAI",
      storyBrief: "Ultra-high-speed 1000 FPS macro capture of bespoke metal fabrication.",
      editorialSentence: "Industrial metalwork captured at 1000 frames per second like molten starlight.",
      detailedStory: "Transforming heavy industrial craftsmanship into high art. By filming molten welding sparks at one thousand frames per second, each individual spark arcs through the dark frame like a falling meteor.",
      behindTheScenes: "Custom heat-resistant quartz optical filters were mounted in front of the front lens element to shield from molten spatter.",
      results: "Recognized with Silver at the National Industrial Visual Guild.",
      scenes: ["/volumetric_soundstage.png", "/showreel_act3.png"],
      featured: false
    },
    {
      id: "06",
      title: "Luminescence // Zenith 2026",
      category: "Luxury Events",
      duration: "03:15",
      videoUrl: "https://vimeo.com/76979871",
      imageUrl: "/volumetric_soundstage.png",
      camera: "SONY FX9 MULTI-CAM",
      lens: "FUJINON PREMISTA CINE ZOOMS",
      location: "HITEX CONVENTION // HYDERABAD",
      storyBrief: "Experiential stage design featuring synchronized 360-degree laser mapping.",
      editorialSentence: "A thousand beams synchronized to a singular acoustic pulse.",
      detailedStory: "Covering an arena-scale gathering with zero frame lag. We integrated 6 cinema camera feeds into a live uncompressed color pipeline, broadcasting 4K master feeds simultaneously to live LED walls and global satellite downlinks.",
      behindTheScenes: "Fiber optic transceivers delivered latency under 8 milliseconds from stage center to the main director gallery.",
      results: "Official visual design showcase for international tech summits.",
      scenes: ["/volumetric_soundstage.png", "/hero_stage_a.png"],
      featured: false
    }
  ],
  coreServices: [
    {
      id: "media",
      number: "01",
      title: "Media Production",
      subtitle: "Cinematic Storytelling",
      category: "HIGH-END COMMERCIAL & NARRATIVE",
      tagline: "Stories engineered for cinematic impact.",
      description: "From commercials and brand documentaries to digital series, we produce high-impact visual stories that command attention.",
      detailedStory: "We approach commercial filmmaking with the rigorous standards of festival cinema. Armed with industry-standard cinema cameras, master anamorphic lenses, and a deep understanding of lighting geometry, our team handles end-to-end production—from conceptual scripting through color grading.",
      imageUrl: "/hero_stage_a.png",
      videoUrl: "https://drive.google.com/file/d/1dPMY7XM5rxcrPB9Z1ZBLPIU94xjZCWhf/preview",
      disciplines: [
        { title: "Brand Commercials & Manifesto Films", desc: "High-concept promotional films that elevate market perception." },
        { title: "Original Digital Series & Fiction", desc: "Multi-episode short form storytelling engineered for maximum digital retention." },
        { title: "Post-Production Lab & Color Science", desc: "In-house color grading, Dolby Atmos sound design, and offline editorial." }
      ]
    },
    {
      id: "branding",
      number: "02",
      title: "Personal Branding",
      subtitle: "Executive Influence",
      category: "LUXURY PORTRAITURE & PORTFOLIOS",
      tagline: "Building iconic public profiles for founders.",
      description: "We shape executive presence for founders, creators, and public figures through bespoke visual content.",
      detailedStory: "True leadership cannot be artificial. We build premium personal branding frameworks by pairing intimate documentary cinematography with Swiss-minimalist website designs. We help you articulate your philosophy and host an impressive digital portfolio.",
      imageUrl: "/personal_branding.png?v=2",
      disciplines: [
        { title: "Founder Legacy Series", desc: "Intimate cinematic profile films documenting your background and philosophy." },
        { title: "Executive Portrait Sessions", desc: "Editorial photography for Forbes, Harvard Business Review, and global keynote decks." },
        { title: "Digital Platform Curation", desc: "An outstanding web portfolio paired with high-value video assets." }
      ]
    },
    {
      id: "talent",
      number: "03",
      title: "Talent Development",
      subtitle: "Academy Mentorship",
      category: "MASTERCLASS & ARTISTIC EVOLUTION",
      tagline: "Teaching tomorrow's visual storytellers.",
      description: "Nurturing creative minds with practical industry training in filmmaking, acting, and digital media.",
      detailedStory: "The film industry demands both raw instinct and technical fluency. The Mayavi Talent Lab mentors aspiring actors, cinematographers, and storytellers in hands-on soundstage environments with industry equipment.",
      imageUrl: "/studio_soundstage_bg.jpg",
      disciplines: [
        { title: "Screen Acting & Camera Presence", desc: "Mastering micro-expressions and emotional delivery under cinema lighting." },
        { title: "Cinematography & Lighting Masterclasses", desc: "Practical hands-on training with professional cinema cameras and grip." },
        { title: "Portfolio Showreel Development", desc: "Directing custom scene reels to help actors secure high-level agency representation." }
      ]
    },
    {
      id: "events",
      number: "04",
      title: "Events & Experiences",
      subtitle: "Spatial Architecture",
      category: "CONVENTIONS, SUMMITS & LAUNCHES",
      tagline: "Transforming live moments into unforgettable memories.",
      description: "End-to-end coverage, live streaming, and visual production for high-profile summits and cultural gatherings.",
      detailedStory: "We engineer multi-sensory live environments. From multi-camera 4K broadcasts to architectural projection mapping, we turn corporate keynotes into high-energy theatrical events.",
      imageUrl: "/volumetric_soundstage.png",
      disciplines: [
        { title: "Bespoke Product Reveals", desc: "Synchronized spatial sensory reveals combining cinematic streams with physical mapping." },
        { title: "Corporate Summits & Keynotes", desc: "Clean executive stage environments customized with dynamic visual backdrops." },
        { title: "Interactive Spaces & Installations", desc: "Experiential gallery exhibits that react dynamically to visitors." }
      ]
    }
  ],
  about: {
    tagline: "OUR PHILOSOPHY",
    heading: "Cinema Starts Long Before The Camera Rolls",
    quote: "We craft visual legacies through light, geometry, and human emotion. Based in Hyderabad, we build cinematic stories for global brands and visionary talent.",
    body: "Founded with a conviction that commercial media deserves the depth and discipline of classical cinema, Mayavi Media Creations operates at the intersection of architectural light, emotional resonance, and bleeding-edge optical engineering. Every project we undertake is calibrated to endure.",
    stat1Value: "150+",
    stat1Label: "Films crafted",
    stat2Value: "8+",
    stat2Label: "Years of craft",
    stat3Value: "98%",
    stat3Label: "Client belief",
    directorName: "Mayavi Directorial Guild",
    directorTitle: "Lead Creative Directors & Cinematographers"
  },
  integrations: {
    googleSheetsWebhookUrl: "https://script.google.com/macros/s/AKfycbz_SAMPLE_MAYAVI_APP_SCRIPT_URL/exec",
    whatsappNumber: "919999999999",
    whatsappMessageTemplate: "Hello Mayavi Media! I would like to inquire about a cinematic production for {category}. Name: {name}, Phone: {phone}.",
    contactEmail: "production@mayavicreations.com",
    contactPhone: "+91 99999 99999",
    studioAddress: "Soundstage 4, Film Nagar, Jubilee Hills, Hyderabad, Telangana 500096",
    socialInstagram: "https://instagram.com/mayavicreations",
    socialYoutube: "https://youtube.com/@mayavicreations",
    socialLinkedin: "https://linkedin.com/company/mayavicreations"
  },
  inquiries: [
    {
      id: "inq-101",
      date: "2026-09-24 14:15",
      name: "Aditya Varma",
      email: "aditya@varmaholdings.com",
      phone: "+91 98490 12345",
      category: "Personal Branding",
      budget: "₹5L - ₹10L",
      message: "Interested in the Founder Legacy Series and 3 documentary interview chapters.",
      status: "new"
    },
    {
      id: "inq-102",
      date: "2026-09-23 18:40",
      name: "Sunita Kapoor",
      email: "sunita@zenithluxe.com",
      phone: "+91 97110 54321",
      category: "Brand Films",
      budget: "₹15L+",
      message: "Looking for an international luxury jewelry campaign film with macro optics.",
      status: "contacted"
    }
  ],
  lastUpdated: new Date().toISOString()
};

export function getDefaultCMSData(): CMSData {
  return JSON.parse(JSON.stringify(DEFAULT_CMS_DATA));
}

/**
 * Reads CMS data from localStorage or initializes with default values
 */
export function getCMSData(): CMSData {
  const fallback = getDefaultCMSData();
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
      return fallback;
    }
    const parsed = JSON.parse(raw);
    // Ensure all critical top-level properties exist
    return {
      ...fallback,
      ...parsed,
      hero: { ...fallback.hero, ...(parsed.hero || {}) },
      showreel: { ...fallback.showreel, ...(parsed.showreel || {}) },
      about: { ...fallback.about, ...(parsed.about || {}) },
      integrations: { ...fallback.integrations, ...(parsed.integrations || {}) }
    };
  } catch (e) {
    console.error('Failed to parse Mayavi CMS data from localStorage:', e);
    return fallback;
  }
}

/**
 * Saves updated CMS data to localStorage and fires a custom event
 */
export function saveCMSData(data: CMSData): void {
  if (typeof window === 'undefined') return;
  try {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('mayavi_cms_updated', { detail: data }));
  } catch (e) {
    console.error('Failed to save Mayavi CMS data to localStorage:', e);
  }
}

/**
 * Resets CMS data back to factory defaults
 */
export function resetCMSData(): CMSData {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  const freshDefaults = getDefaultCMSData();
  saveCMSData(freshDefaults);
  return freshDefaults;
}

/**
 * Exports complete CMS data as a formatted JSON string
 */
export function exportCMSData(): string {
  const data = getCMSData();
  return JSON.stringify(data, null, 2);
}

/**
 * Imports CMS data from a JSON string with schema validation
 */
export function importCMSData(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed.hero || !parsed.curatedExhibitions) {
      throw new Error('Invalid Mayavi CMS schema');
    }
    saveCMSData(parsed);
    return true;
  } catch (err) {
    console.error('CMS Import Error:', err);
    return false;
  }
}

/**
 * Admin Authentication & Security
 */
export function getAdminPassword(): string {
  if (typeof window === 'undefined') return DEFAULT_PASSWORD;
  return localStorage.getItem(AUTH_PASSWORD_KEY) || DEFAULT_PASSWORD;
}

export function setAdminPassword(newPassword: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_PASSWORD_KEY, newPassword.trim());
}

export function verifyAdminPassword(input: string): boolean {
  const current = getAdminPassword();
  return input.trim() === current;
}

export function recordNewInquiry(inquiry: Omit<StoredInquiry, 'id' | 'date' | 'status'>): StoredInquiry {
  const cms = getCMSData();
  const newEntry: StoredInquiry = {
    id: `inq-${Date.now()}`,
    date: new Date().toLocaleString(),
    status: 'new',
    ...inquiry
  };
  cms.inquiries = [newEntry, ...(cms.inquiries || [])];
  saveCMSData(cms);
  return newEntry;
}

/**
 * React Hook for reactive CMS data consumption
 */
export function useCMS() {
  const [data, setData] = useState<CMSData>(() => getCMSData());

  useEffect(() => {
    const handleUpdate = () => {
      setData(getCMSData());
    };

    window.addEventListener('mayavi_cms_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('mayavi_cms_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const update = (updater: (prev: CMSData) => CMSData) => {
    const next = updater(data);
    saveCMSData(next);
    setData(next);
  };

  return {
    cms: data,
    updateCMS: update,
    resetCMS: () => {
      const reset = resetCMSData();
      setData(reset);
    }
  };
}
