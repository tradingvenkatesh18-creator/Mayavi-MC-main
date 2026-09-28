/**
 * Mayavi CMS Central Store
 * Manages all video links, hero video, curated exhibitions, showreels,
 * page content, and integrations with localStorage persistence and live events.
 */

import { useState, useEffect } from 'react';
import { fetchCMSFromSupabase, saveCMSToSupabase, getSupabaseClient } from './supabase';

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

const STORAGE_KEY = 'mayavi_cms_store_v3';
const AUTH_PASSWORD_KEY = 'mayavi_admin_password_hash';
const DEFAULT_PASSWORD = 'mayavi2026';

export const DEFAULT_CMS_DATA: CMSData = {
  hero: {
    headline: "CINEMA STARTS LONG BEFORE THE CAMERA ROLLS",
    subheadline: "Architectural storytelling, bespoke optical precision, and cinematic legacies crafted in Hyderabad for visionary global brands.",
    quote: "We don't simply record light. We calibrate time, tension, and human emotion into permanent moving art.",
    backgroundVideoUrl: "/videos/mayavi-hero.mp4",
    useVideoBackground: false, // Default to interactive lens scroll, toggleable to video loop
    posterUrl: "/official-mayavi-logo.png",
    locationTag: "STUDIO STAGE A // HYDERABAD",
    cameraTag: "ARRI ALEXA LF // ZEISS SUPREME 35MM",
    ctaPrimaryText: "START A COMMISSION",
    ctaSecondaryText: "WATCH SHOWREEL"
  },
  videoGlimpses: [
    {
      id: "glimpse-1",
      title: "3D Kinetic Motion Reveal",
      category: "Cinematic Identity",
      videoUrl: "/videos/mayavi-hero.mp4",
      thumbnailUrl: "/official-mayavi-logo.png",
      duration: "0:08",
      caption: "3D Infinity solar crown and celestial stardust revealing Mayavi Media Creations."
    },
    {
      id: "glimpse-2",
      title: "Theatre & Modelling Masterclass",
      category: "Talent Development",
      videoUrl: "/videos/mayavi-hero.mp4",
      thumbnailUrl: "/posters/theatre-modelling-workshop.png",
      duration: "0:24",
      caption: "Live acting improv, stage presence, and confidence workshop in Hyderabad."
    },
    {
      id: "glimpse-3",
      title: "Creative Ecosystem Architecture",
      category: "Brand Positioning",
      videoUrl: "/videos/mayavi-hero.mp4",
      thumbnailUrl: "/posters/media-1.png",
      duration: "0:30",
      caption: "Helping people, brands, and talent discover their voice and present it with clarity."
    },
    {
      id: "glimpse-4",
      title: "Casting Discovery: Prince & Princess",
      category: "Talent & Pageants",
      videoUrl: "/videos/mayavi-hero.mp4",
      thumbnailUrl: "/posters/casting-call-prince-princess.png",
      duration: "0:18",
      caption: "Exclusive casting pipeline for South India Season 2 film & media talent."
    },
    {
      id: "glimpse-5",
      title: "Content Creator Auditions",
      category: "Media Production",
      videoUrl: "/videos/mayavi-hero.mp4",
      thumbnailUrl: "/images/talent-creators-audition.jpg",
      duration: "0:15",
      caption: "On-camera charisma coaching and digital media production in Hyderabad."
    }
  ],
  showreel: {
    title: "Vertical Cinematic Showreel (2026 Director's Cut)",
    tagline: "4 Acts of Visual Precision across South Asia's Premier Stages",
    chapters: [
      {
        id: "sr-1",
        title: "Act I // 3D Cinematic Identity & Stardust Reveal",
        subtitle: "Stories That Inspire. Visuals That Stay.",
        category: "Brand Films",
        camera: "ARRI Alexa Mini LF // 3D Render",
        lens: "Zeiss Supreme Prime 50mm T1.5",
        videoUrl: "/videos/mayavi-hero.mp4",
        posterUrl: "/official-mayavi-logo.png",
        duration: "0:08",
        directorNotes: "Bespoke 3D CGI solar crown and infinity loop particle simulation crafted for Mayavi Media Creations.",
        platform: "direct"
      },
      {
        id: "sr-2",
        title: "Act II // Spatial Direction & Creative Ecosystem",
        subtitle: "Beyond Traditional Media",
        category: "Vertical Fiction",
        camera: "Sony Venice 2 8K",
        lens: "Cooke Anamorphic 35mm",
        videoUrl: "/videos/mayavi-hero.mp4",
        posterUrl: "/posters/media-2.png",
        duration: "0:38",
        directorNotes: "Fluid Steadicam tracking shots framing human vulnerability through classical geometry.",
        platform: "direct"
      },
      {
        id: "sr-3",
        title: "Act III // Stage Energy & Live Talent Direction",
        subtitle: "Theatre, Voice & Presence",
        category: "Talent Development",
        camera: "RED V-Raptor 8K VV",
        lens: "Leica Noctilux 50mm",
        videoUrl: "/videos/mayavi-hero.mp4",
        posterUrl: "/posters/theatre-modelling-recap.png",
        duration: "0:45",
        directorNotes: "Capturing authentic human emotion during live stage improv and physical presence coaching.",
        platform: "direct"
      },
      {
        id: "sr-4",
        title: "Act IV // Emerging Talent Showcase",
        subtitle: "Front-of-Camera Charisma",
        category: "Personal Branding",
        camera: "Hasselblad H6D-100c",
        lens: "HC 80mm f/2.8",
        videoUrl: "/videos/mayavi-hero.mp4",
        posterUrl: "/images/talent-creators-audition.jpg",
        duration: "0:30",
        directorNotes: "Intimate medium-format closeups that reveal authentic leadership conviction and camera presence.",
        platform: "direct"
      }
    ]
  },
  curatedExhibitions: [
    {
      id: "01",
      title: "Creative Ecosystem: Voice & Clarity",
      category: "Brand Films",
      duration: "03:45",
      videoUrl: "",
      imageUrl: "/posters/media-1.png",
      camera: "ARRI ALEXA MINI LF",
      lens: "ZEISS SUPREME PRIME 50MM T1.5",
      location: "STUDIO STAGE A // HYDERABAD",
      storyBrief: "A creative ecosystem built to help people, brands, and talent discover their voice and present it with clarity.",
      editorialSentence: "We are not just a media agency — we build presence that people remember long after they scroll past.",
      detailedStory: "Mayavi Media Creations was forged around a singular conviction: genuine storytelling demands architectural restraint and authentic voice. Integrating Media, Personal Branding, and Events, this comprehensive portfolio outlines how our Hyderabad studio elevates creators, artists, founders, and actors to national recognition.",
      behindTheScenes: "Created in Hyderabad combining custom watercolor floral textures with high-contrast luxury serif editorial typography.",
      results: "Core brand philosophy recognized by industry leaders across South India's premier creative circles.",
      scenes: ["/posters/media-1.png", "/posters/media-2.png", "/posters/media-3.png"],
      featured: true
    },
    {
      id: "02",
      title: "Theatre & Modelling: The Hyderabad Masterclass",
      category: "Campaigns",
      duration: "04:20",
      videoUrl: "",
      imageUrl: "/posters/theatre-modelling-workshop.png",
      camera: "SONY VENICE 2 8K",
      lens: "ZEISS SUPREME 35MM T1.5",
      location: "MAYAVI REHEARSAL STUDIOS // HYDERABAD",
      storyBrief: "Live acting exercises, improv games, and modeling posture training for kids, youth, and adults.",
      editorialSentence: "Building people before brands — unlocking inner confidence through theatre and movement.",
      detailedStory: "A transformative session documented live in Hyderabad. Under the mantra 'Building people before brands,' the workshop merged classical theatre exercises, improvisational games, modeling confidence, and posture training. Participants of all age groups engaged in collaborative stage work to conquer camera anxiety and cultivate magnetic stage command.",
      behindTheScenes: "Captured on-location with natural ambient workshop lighting and candid documentary coverage capturing genuine moments of breakthrough.",
      results: "Over 40 aspiring actors, models, and creators successfully completed the immersion workshop with direct representation opportunities.",
      scenes: ["/posters/theatre-modelling-workshop.png", "/posters/theatre-modelling-recap.png", "/images/talent-creators-audition.jpg"],
      featured: true
    },
    {
      id: "03",
      title: "Prince & Princess of South India (Season 2)",
      category: "Luxury Events",
      duration: "02:30",
      videoUrl: "",
      imageUrl: "/posters/casting-call-prince-princess.png",
      camera: "RED V-RAPTOR 8K VV",
      lens: "LEICA NOCTILUX 50MM F/0.95",
      location: "ANDHRA PRADESH & TELANGANA",
      storyBrief: "Premier casting and talent scouting platform for emerging models, actors, and media personalities.",
      editorialSentence: "Stepping into the spotlight — unlimited applications and priority industry selection.",
      detailedStory: "Official casting announcement and scouting campaign for Season 2 of Prince & Princess of South India across Andhra Pradesh and Telangana. Designed to discover raw, high-potential screen talent and connect them directly with mainstream film, TV, and luxury brand commercial directors.",
      behindTheScenes: "Coordinated across Hyderabad with multi-stage audition screen tests and direct WhatsApp audition hotline (+91 63017 61783).",
      results: "Ranked as one of the most anticipated regional pageant and screen discovery platforms in South India for 2026.",
      scenes: ["/posters/casting-call-prince-princess.png", "/images/talent-creators-audition.jpg", "/images/hiring-content-creators-yellow.jpg"],
      featured: true
    },
    {
      id: "04",
      title: "Young Creators Audition // Front of Camera",
      category: "Personal Branding",
      duration: "02:15",
      videoUrl: "",
      imageUrl: "/images/talent-creators-audition.jpg",
      camera: "ARRI ALEXA LF",
      lens: "HASSELBLAD HC 80MM",
      location: "STAGE B SOUNDSTAGE // HYDERABAD",
      storyBrief: "Scouting young, energetic, and charismatic male & female talent for digital media production.",
      editorialSentence: "Have a natural flair for hosting? We provide the production muscle and global audience.",
      detailedStory: "Direct talent recruitment initiative launched by Mayavi Media Creations. Seeking passionate 18-28 creators for long-form narrative series, tech reviews, lifestyle docuseries, and brand ambassadorships. Selected creators undergo full camera grooming, vocal coaching, and content strategy incubation.",
      behindTheScenes: "Auditions evaluated with 4K multi-cam teleprompter tests and cold-reading improv challenges.",
      results: "Dozens of high-engagement video series launched with over 10M combined impressions.",
      scenes: ["/images/talent-creators-audition.jpg", "/images/hiring-content-creators-yellow.jpg", "/posters/media-3.png"],
      featured: true
    },
    {
      id: "05",
      title: "3D Brand Identity & Celestial Motion",
      category: "Vertical Fiction",
      duration: "00:08",
      videoUrl: "",
      imageUrl: "/official-mayavi-logo.png",
      camera: "OCTANE 3D CINEMA ENGINE",
      lens: "BESPOKE VIRTUAL ANAMORPHIC",
      location: "VFX & COLOR SUITE // HYDERABAD",
      storyBrief: "Golden stardust and violet light trails coalescing into the iconic Mayavi infinity emblem.",
      editorialSentence: "Stories that inspire. Visuals that stay.",
      detailedStory: "The definitive motion brand statement for Mayavi Media Creations. Built with volumetric stardust physics, celestial purple atmospheric nebulae, and warm 24K gold ray reflections. Symbolizes the infinite potential of human storytelling paired with the illuminating power of the sun.",
      behindTheScenes: "Rendered at 60 FPS uncompressed with bespoke optical chromatic dispersion and anamorphic streak filters.",
      results: "The signature studio ident opening every major Mayavi production.",
      scenes: ["/official-mayavi-logo.png", "/logos/mayavi-mandala.png", "/logos/mayavi-infinity-sun.png"],
      featured: false
    },
    {
      id: "06",
      title: "Becoming Impossible to Ignore",
      category: "Commercials",
      duration: "03:10",
      videoUrl: "",
      imageUrl: "/posters/media-3.png",
      camera: "SONY FX9 CINEMA",
      lens: "COOKE 40MM ANAMORPHIC",
      location: "CREATIVE STRATEGY LAB // HYDERABAD",
      storyBrief: "Personal branding, content strategy, talent grooming, and luxury event production.",
      editorialSentence: "Whether you're a founder, artist, model, or actor — you deserve an indelible presence.",
      detailedStory: "A comprehensive roadmap outlining how Mayavi engineers executive and artistic influence. From scripting executive monologues to orchestrating private runway presentations, we sculpt public perception with cinematic precision.",
      behindTheScenes: "Created in collaboration with prominent South Indian creative directors and brand strategists.",
      results: "Guided over 50 prominent figures into sustained, high-credibility media prominence.",
      scenes: ["/posters/media-3.png", "/posters/media-2.png", "/posters/media-1.png"],
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
    whatsappNumber: "916301761783",
    whatsappMessageTemplate: "Hello Mayavi Media! I would like to inquire about a cinematic production for {category}. Name: {name}, Phone: {phone}.",
    contactEmail: "mayavistudios25@gmail.com",
    contactPhone: "+91 63017 61783",
    studioAddress: "Soundstage 4, Film Nagar, Jubilee Hills, Hyderabad, Telangana 500096",
    socialInstagram: "https://www.instagram.com/mayavi_mediacreations/",
    socialYoutube: "https://youtube.com/@mayavi_mediacreations",
    socialLinkedin: "https://linkedin.com/company/mayavi-media-creations"
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
    
    // Auto-heal legacy placeholder video and contact numbers if found in cache
    if (parsed.hero?.backgroundVideoUrl?.includes('BigBuckBunny')) {
      parsed.hero.backgroundVideoUrl = fallback.hero.backgroundVideoUrl;
    }
    if (parsed.integrations?.whatsappNumber === '919999999999') {
      parsed.integrations.whatsappNumber = fallback.integrations.whatsappNumber;
      parsed.integrations.contactPhone = fallback.integrations.contactPhone;
      parsed.integrations.contactEmail = fallback.integrations.contactEmail;
      parsed.integrations.socialInstagram = fallback.integrations.socialInstagram;
    }

    // Auto-heal curated exhibitions to remove accidental hero video loops
    if (parsed.curatedExhibitions && Array.isArray(parsed.curatedExhibitions)) {
      parsed.curatedExhibitions = parsed.curatedExhibitions.map((proj: any) => {
        if (proj.videoUrl === '/videos/mayavi-hero.mp4') {
          return { ...proj, videoUrl: '' };
        }
        return proj;
      });
    }

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

    // Automatically sync to Supabase cloud database if configured
    saveCMSToSupabase(data).catch((err) => {
      console.warn('Supabase background sync notice:', err);
    });
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
  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    // Asynchronously hydrate from Supabase cloud database
    const hydrateFromCloud = async () => {
      try {
        setIsCloudSyncing(true);
        const cloudData = await fetchCMSFromSupabase();
        if (!isMounted || !cloudData) {
          setIsCloudSyncing(false);
          return;
        }

        const localData = getCMSData();
        const localTime = new Date(localData.lastUpdated || 0).getTime();
        const cloudTime = new Date(cloudData.lastUpdated || 0).getTime();

        // If cloud data is newer or local is uninitialized default, update local store
        if (cloudTime >= localTime || !localStorage.getItem(STORAGE_KEY)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
          setData(cloudData);
        }
      } catch (err) {
        console.warn('Initial cloud hydration note:', err);
      } finally {
        if (isMounted) setIsCloudSyncing(false);
      }
    };

    hydrateFromCloud();

    const handleUpdate = () => {
      setData(getCMSData());
    };

    window.addEventListener('mayavi_cms_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    // Setup Supabase Realtime channel for instant cross-device updates
    const client = getSupabaseClient();
    let channel: any = null;

    if (client) {
      try {
        channel = client
          .channel('mayavi_cms_realtime_changes')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'mayavi_cms', filter: 'id=eq.production' },
            (payload: any) => {
              if (payload.new && payload.new.data) {
                const remoteData = payload.new.data as CMSData;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
                setData(remoteData);
              }
            }
          )
          .subscribe();
      } catch (subErr) {
        console.warn('Supabase Realtime subscription note:', subErr);
      }
    }

    return () => {
      isMounted = false;
      window.removeEventListener('mayavi_cms_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      if (client && channel) {
        client.removeChannel(channel);
      }
    };
  }, []);

  const update = (updater: (prev: CMSData) => CMSData) => {
    const next = updater(data);
    saveCMSData(next);
    setData(next);
  };

  const reloadFromCloud = async (): Promise<boolean> => {
    try {
      setIsCloudSyncing(true);
      const cloudData = await fetchCMSFromSupabase();
      if (cloudData) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
        setData(cloudData);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsCloudSyncing(false);
    }
  };

  return {
    cms: data,
    updateCMS: update,
    isCloudSyncing,
    reloadFromCloud,
    resetCMS: () => {
      const reset = resetCMSData();
      setData(reset);
    }
  };
}
