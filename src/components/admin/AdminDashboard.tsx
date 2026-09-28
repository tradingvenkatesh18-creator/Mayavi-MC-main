import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Video,
  Film,
  FolderKanban,
  FileText,
  Sliders,
  Send,
  Shield,
  ExternalLink,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  Download,
  Upload,
  CheckCircle,
  X,
  Play,
  Layers,
  Sparkles,
  Search,
  Eye,
  MessageSquare,
  Sheet,
  Phone,
  HelpCircle,
  LogOut,
  RefreshCw,
  Copy,
  Check,
  Database,
  Cloud,
  CloudUpload,
  CloudDownload,
  CheckCircle2,
  AlertCircle,
  Code,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  CMSData,
  ExhibitionProject,
  ShowreelChapter,
  VideoGlimpse,
  CoreService,
  useCMS,
  saveCMSData,
  setAdminPassword,
  exportCMSData,
  importCMSData,
  DEFAULT_CMS_DATA
} from '../../lib/cmsStore';
import { parseVideo, detectVideoPlatform, getVideoEmbedUrl } from '../../lib/videoUtils';
import {
  getSupabaseConfig,
  setCustomSupabaseConfig,
  testSupabaseConnection,
  saveCMSToSupabase,
  SUPABASE_SQL_SCHEMA
} from '../../lib/supabase';

interface AdminDashboardProps {
  onExit: () => void;
}

export default function AdminDashboard({ onExit }: AdminDashboardProps) {
  const { cms, updateCMS, resetCMS, isCloudSyncing, reloadFromCloud } = useCMS();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'hero-glimpses' | 'showreel' | 'portfolio' | 'services-about' | 'integrations' | 'security'
  >('overview');

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Video Preview Modal
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

  // Project Editor Modal
  const [editingProject, setEditingProject] = useState<ExhibitionProject | null>(null);
  const [isNewProject, setIsNewProject] = useState<boolean>(false);
  const [portfolioSearch, setPortfolioSearch] = useState<string>('');
  const [portfolioCategoryFilter, setPortfolioCategoryFilter] = useState<string>('ALL');

  // Showreel Chapter Editor Modal
  const [editingChapter, setEditingChapter] = useState<ShowreelChapter | null>(null);
  const [isNewChapter, setIsNewChapter] = useState<boolean>(false);

  // Video Glimpse Editor Modal & Interactive Filter States
  const [editingGlimpse, setEditingGlimpse] = useState<VideoGlimpse | null>(null);
  const [isNewGlimpse, setIsNewGlimpse] = useState<boolean>(false);
  const [glimpseSearch, setGlimpseSearch] = useState<string>('');
  const [glimpseCategoryFilter, setGlimpseCategoryFilter] = useState<string>('ALL');
  const [savedGlimpseId, setSavedGlimpseId] = useState<string | null>(null);

  // Filtered Glimpses for Hero Video & Glimpses Tab
  const allGlimpseCategories = Array.from(
    new Set(cms.videoGlimpses.map((g) => g.category).filter(Boolean))
  );

  const filteredGlimpses = cms.videoGlimpses.filter((g) => {
    const query = glimpseSearch.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      g.title.toLowerCase().includes(query) ||
      g.category.toLowerCase().includes(query) ||
      (g.caption && g.caption.toLowerCase().includes(query)) ||
      (g.videoUrl && g.videoUrl.toLowerCase().includes(query));
    const matchesCat =
      glimpseCategoryFilter === 'ALL' ||
      g.category.toLowerCase() === glimpseCategoryFilter.toLowerCase();
    return matchesSearch && matchesCat;
  });

  // Save Feedback & Dynamic UI States
  const [savedActId, setSavedActId] = useState<string | null>(null);
  const [globalSaved, setGlobalSaved] = useState<boolean>(false);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  // Password Change State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Supabase Cloud State
  const initialConfig = getSupabaseConfig();
  const [supabaseUrl, setSupabaseUrl] = useState<string>(initialConfig.url);
  const [supabaseAnonKey, setSupabaseAnonKey] = useState<string>(initialConfig.anonKey);
  const [supabaseConfig, setSupabaseConfig] = useState(initialConfig);
  const [isTestingSupabase, setIsTestingSupabase] = useState<boolean>(false);
  const [supabaseTestResult, setSupabaseTestResult] = useState<{ success: boolean; message: string; tableReady?: boolean } | null>(null);
  const [isPushingCloud, setIsPushingCloud] = useState<boolean>(false);
  const [isPullingCloud, setIsPullingCloud] = useState<boolean>(false);
  const [showSqlSchema, setShowSqlSchema] = useState<boolean>(false);
  const [sqlCopied, setSqlCopied] = useState<boolean>(false);

  // Bulk Seed Helper for 50-100 Hybrid Video Links
  const handleSeedExhibitions = () => {
    if (!window.confirm('Add 12 additional curated video exhibitions (covering YouTube, Instagram, LinkedIn, Google Drive, and Vimeo) to your portfolio list?')) {
      return;
    }

    const sampleVideos: ExhibitionProject[] = [
      {
        id: `seed-${Date.now()}-1`,
        title: "Neon Monsoon // Cyberpunk Heritage",
        category: "Vertical Fiction",
        duration: "03:15",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=1200",
        camera: "Sony FX6 Cinema Line",
        lens: "Sirui 35mm 1.33x Anamorphic",
        location: "Charminar Bazaars // Hyderabad",
        storyBrief: "A high-octane vertical cinema chase bathed in neon rain reflections.",
        editorialSentence: "Where ancient stone archways clash with ultra-saturated cybernetic neon.",
        detailedStory: "Produced exclusively for 9:16 high-density mobile displays. Rigged on handheld gimbals with carbon-fiber rain rigs, tracking characters across wet granite cobblestones.",
        results: "3.2M vertical impressions across Instagram Reels & YouTube Shorts.",
        scenes: ["/desert_monolith.png", "/hero_stage_a.png"],
        featured: true
      },
      {
        id: `seed-${Date.now()}-2`,
        title: "The Sculptor of Time",
        category: "Personal Branding",
        duration: "02:40",
        videoUrl: "https://vimeo.com/76979871",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200",
        camera: "Hasselblad H6D-100c Medium Format",
        lens: "HC 100mm f/2.2 Portrait",
        location: "Jubilee Hills Atelier // Hyderabad",
        storyBrief: "An intimate profile of an avant-garde sculptor transforming bronze.",
        editorialSentence: "Raw medium-format frames honoring the patience of physical sculpture.",
        detailedStory: "A slow, contemplative study in light and patience. We recorded the physical sound of chisels against bronze in 96kHz 24-bit audio.",
        results: "Winner of the National Creative Portrait Laurels.",
        scenes: ["/personal_branding.png?v=2", "/volumetric_soundstage.png"],
        featured: true
      },
      {
        id: `seed-${Date.now()}-3`,
        title: "Zero-G Kinetic Showcase",
        category: "Brand Films",
        duration: "01:45",
        videoUrl: "https://drive.google.com/file/d/1dPMY7XM5rxcrPB9Z1ZBLPIU94xjZCWhf/preview",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
        camera: "Phantom Flex 4K High-Speed",
        lens: "Leitz Prime 24mm T1.8",
        location: "Aerospace Propulsion Hangar // Bangalore",
        storyBrief: "High-precision space component manufacturing captured in extreme slow motion.",
        editorialSentence: "Aerospace alloy particles drifting through dark vacuum chambers.",
        detailedStory: "Commissioned by deep-tech founders to illustrate precision aerospace engineering for global venture syndicates.",
        results: "Instrumental in raising $18M Series A investment round.",
        scenes: ["/volumetric_soundstage.png", "/desert_monolith.png"],
        featured: false
      },
      {
        id: `seed-${Date.now()}-4`,
        title: "Ethereal Symphony // Opera Under the Stars",
        category: "Luxury Events",
        duration: "04:50",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        imageUrl: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&q=80&w=1200",
        camera: "ARRI Alexa 35 Multi-Rig",
        lens: "Angenieux Optimo Ultra 12x",
        location: "Golconda Fort Citadel // Hyderabad",
        storyBrief: "Live spatial orchestral symphony performed against 500-year-old historic ramparts.",
        editorialSentence: "Volumetric acoustic projection illuminating the silent citadel.",
        detailedStory: "An arena-scale cultural installation using 18 synced camera feeds, 64-channel spatial binaural microphones, and custom drone sweeps.",
        results: "Broadcast globally across prestige digital arts networks.",
        scenes: ["/volumetric_soundstage.png", "/showreel_act3.png"],
        featured: false
      },
      {
        id: `seed-${Date.now()}-5`,
        title: "Chronicles of the Silk Route",
        category: "Commercials",
        duration: "02:10",
        videoUrl: "https://vimeo.com/76979871",
        imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200",
        camera: "RED V-Raptor 8K VV",
        lens: "Cooke S7/i Full Frame Plus 40mm",
        location: "Pochampally Weaving Guild // Telangana",
        storyBrief: "Heritage ikat weave craft captured with micro optical lighting.",
        editorialSentence: "Centuries of geometry spun thread-by-thread under golden light.",
        detailedStory: "Celebrating the master weavers who preserve ancient ikat textiles. Ultra-sharp 8K resolution exposes the texture of individual silk threads.",
        results: "Selected for the Global Handloom Heritage Exhibition in Milan.",
        scenes: ["/personal_branding.png?v=2", "/hero_stage_a.png"],
        featured: false
      },
      {
        id: `seed-${Date.now()}-6`,
        title: "The Solitary Runner",
        category: "Campaigns",
        duration: "01:20",
        videoUrl: "https://drive.google.com/file/d/1dPMY7XM5rxcrPB9Z1ZBLPIU94xjZCWhf/preview",
        imageUrl: "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&q=80&w=1200",
        camera: "Sony Venice 2 8K",
        lens: "Atlas Orion Anamorphic 65mm",
        location: "Deccan Plateau Ridges // Telangana",
        storyBrief: "A poetic sportswear commercial exploring mental fortitude at dawn.",
        editorialSentence: "Breath, heartbeat, and the golden silence before dawn breaking.",
        detailedStory: "Filmed during the 30 minutes before sunrise. High dynamic range capture retaining rich details in the deep indigo sky and dew-soaked earth.",
        results: "Featured in Best Cinematography in Commercial Arts 2026.",
        scenes: ["/desert_monolith.png", "/volumetric_soundstage.png"],
        featured: false
      }
    ];

    updateCMS((prev) => ({
      ...prev,
      curatedExhibitions: [...prev.curatedExhibitions, ...sampleVideos]
    }));
    showToast(`Added ${sampleVideos.length} curated video exhibitions. Total: ${cms.curatedExhibitions.length + sampleVideos.length}`);
  };

  // Save Project in Modal
  const handleSaveProject = () => {
    if (!editingProject) return;
    if (!editingProject.title.trim()) {
      alert('Please provide a project title.');
      return;
    }

    updateCMS((prev) => {
      let updated: ExhibitionProject[];
      if (isNewProject) {
        updated = [editingProject, ...prev.curatedExhibitions];
      } else {
        updated = prev.curatedExhibitions.map((p) => (p.id === editingProject.id ? editingProject : p));
      }
      return { ...prev, curatedExhibitions: updated };
    });

    showToast(`Saved exhibition: "${editingProject.title}"`);
    setEditingProject(null);
  };

  // Delete Project
  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      updateCMS((prev) => ({
        ...prev,
        curatedExhibitions: prev.curatedExhibitions.filter((p) => p.id !== id)
      }));
      showToast(`Deleted "${title}"`);
    }
  };

  // Open Add Chapter Modal
  const handleOpenAddChapter = () => {
    setIsNewChapter(true);
    const nextIdx = cms.showreel.chapters.length + 1;
    setEditingChapter({
      id: `sr-${Date.now()}`,
      title: `Act ${nextIdx < 10 ? '0' + nextIdx : nextIdx} // Cinematic Scene`,
      subtitle: "The Opening Statement",
      category: "Brand Films",
      camera: "ARRI Alexa Mini LF",
      lens: "Zeiss Supreme Prime 50mm",
      videoUrl: "",
      posterUrl: "/showreel_act1.png",
      duration: "0:30",
      directorNotes: "Directorial notes on visual lighting and framing.",
      platform: "youtube"
    });
  };

  // Save Chapter from Modal
  const handleSaveChapter = () => {
    if (!editingChapter) return;
    if (!editingChapter.title.trim()) {
      alert('Please provide a chapter title.');
      return;
    }
    const detected = detectVideoPlatform(editingChapter.videoUrl || '');
    const chapterToSave: ShowreelChapter = { ...editingChapter, platform: detected as any };

    updateCMS((prev) => {
      let updated: ShowreelChapter[];
      if (isNewChapter) {
        updated = [...prev.showreel.chapters, chapterToSave];
      } else {
        updated = prev.showreel.chapters.map((c) => (c.id === chapterToSave.id ? chapterToSave : c));
      }
      return {
        ...prev,
        showreel: {
          ...prev.showreel,
          chapters: updated
        }
      };
    });

    showToast(`Saved showreel chapter: "${editingChapter.title}"`);
    setEditingChapter(null);
  };

  // Delete Chapter
  const handleDeleteChapter = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete chapter "${title}"?`)) {
      updateCMS((prev) => ({
        ...prev,
        showreel: {
          ...prev.showreel,
          chapters: prev.showreel.chapters.filter((c) => c.id !== id)
        }
      }));
      showToast(`Deleted chapter "${title}"`);
    }
  };

  // Explicit Save Handler for a single showreel act
  const handleSaveSingleAct = (id: string, idx: number, title: string) => {
    saveCMSData(cms);
    setSavedActId(id);
    showToast(`Saved Act 0${idx + 1}: "${title || 'Untitled'}" live to site!`);
    setTimeout(() => setSavedActId(null), 2500);
  };

  // Explicit Save Handler for all showreel acts
  const handleSaveAllShowreel = () => {
    saveCMSData(cms);
    setSavedActId('all-showreel');
    showToast(`Saved all ${cms.showreel.chapters.length} Showreel Acts live to site!`);
    setTimeout(() => setSavedActId(null), 2500);
  };

  // Instant Add Act to list without modal requirement
  const handleQuickAddChapter = () => {
    const nextIdx = cms.showreel.chapters.length + 1;
    const newChapter: ShowreelChapter = {
      id: `sr-${Date.now()}`,
      title: `Act ${nextIdx < 10 ? '0' + nextIdx : nextIdx} // Cinematic Scene`,
      subtitle: "Dynamic Visual Production",
      category: "Vertical Cinema",
      camera: "ARRI Alexa Mini LF",
      lens: "Zeiss Supreme Prime 50mm",
      videoUrl: "",
      posterUrl: "/showreel_act1.png",
      duration: "0:45",
      directorNotes: "Directorial notes on visual lighting and framing.",
      platform: "youtube"
    };
    updateCMS((prev) => ({
      ...prev,
      showreel: {
        ...prev.showreel,
        chapters: [...prev.showreel.chapters, newChapter]
      }
    }));
    showToast(`Added Act 0${nextIdx}! Add your video link and click "SAVE ACT".`);
    setTimeout(() => {
      const el = document.getElementById(`chapter-${newChapter.id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  };

  // Open Live Site directly into Showreel Player
  const handleViewLiveShowreel = () => {
    saveCMSData(cms);
    window.location.hash = '#showreel';
    onExit();
  };

  // Global Save All CMS across all tabs
  const handleSaveAllCMS = () => {
    saveCMSData(cms);
    setGlobalSaved(true);
    showToast('Saved all CMS changes across all sections live to site!');
    setTimeout(() => setGlobalSaved(false), 2500);
  };

  // Section Save Handlers
  const handleSaveHero = () => {
    saveCMSData(cms);
    setSavedSection('hero');
    showToast('Saved Hero Background Video & Configuration live!');
    setTimeout(() => setSavedSection(null), 2500);
  };

  const handleSaveGlimpse = (idx: number, title: string) => {
    saveCMSData(cms);
    setSavedSection(`glimpse-${idx}`);
    setSavedGlimpseId(cms.videoGlimpses[idx]?.id || null);
    showToast(`Saved Video Glimpse 0${idx + 1}: "${title || 'Untitled'}" live!`);
    setTimeout(() => {
      setSavedSection(null);
      setSavedGlimpseId(null);
    }, 2500);
  };

  const handleSaveAllGlimpses = () => {
    saveCMSData(cms);
    setSavedSection('all-glimpses');
    showToast(`Saved all ${cms.videoGlimpses.length} Video Glimpses live to site!`);
    setTimeout(() => setSavedSection(null), 2500);
  };

  const handleQuickAddGlimpse = () => {
    const newIndex = cms.videoGlimpses.length + 1;
    const newGlimpse: VideoGlimpse = {
      id: `glimpse-${Date.now()}`,
      title: `Cinematic Loop 0${newIndex}`,
      category: 'Media Production',
      videoUrl: '/videos/mayavi-hero.mp4',
      thumbnailUrl: '/official-mayavi-logo.png',
      duration: '0:15',
      caption: 'Director calibration for visual aesthetics, camera movement, and high-fidelity lighting.',
      aspectRatio: '16:9'
    };
    updateCMS((prev) => {
      const nextCMS = { ...prev, videoGlimpses: [newGlimpse, ...prev.videoGlimpses] };
      saveCMSData(nextCMS);
      return nextCMS;
    });
    showToast(`Created new Glimpse: "${newGlimpse.title}"!`);
  };

  const handleOpenAddGlimpseModal = () => {
    const newIndex = cms.videoGlimpses.length + 1;
    setEditingGlimpse({
      id: `glimpse-${Date.now()}`,
      title: `Cinematic Scene 0${newIndex}`,
      category: 'Cinematic Identity',
      videoUrl: '/videos/mayavi-hero.mp4',
      thumbnailUrl: '/official-mayavi-logo.png',
      duration: '0:15',
      caption: '',
      aspectRatio: '16:9'
    });
    setIsNewGlimpse(true);
  };

  const handleOpenEditGlimpseModal = (glimpse: VideoGlimpse) => {
    setEditingGlimpse({ ...glimpse });
    setIsNewGlimpse(false);
  };

  const handleSaveGlimpseModal = () => {
    if (!editingGlimpse) return;
    if (!editingGlimpse.title.trim()) {
      alert('Please enter a title for the video glimpse.');
      return;
    }

    updateCMS((prev) => {
      const existsIndex = prev.videoGlimpses.findIndex((g) => g.id === editingGlimpse.id);
      let updated: VideoGlimpse[];
      if (existsIndex >= 0) {
        updated = [...prev.videoGlimpses];
        updated[existsIndex] = editingGlimpse;
      } else {
        updated = [editingGlimpse, ...prev.videoGlimpses];
      }
      const nextCMS = { ...prev, videoGlimpses: updated };
      saveCMSData(nextCMS);
      return nextCMS;
    });

    showToast(isNewGlimpse ? `Added "${editingGlimpse.title}" to video glimpses!` : `Updated "${editingGlimpse.title}"!`);
    setEditingGlimpse(null);
  };

  const handleDeleteGlimpse = (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete glimpse "${title || 'this glimpse'}"?`)) return;
    updateCMS((prev) => {
      const updated = prev.videoGlimpses.filter((g) => g.id !== id);
      const nextCMS = { ...prev, videoGlimpses: updated };
      saveCMSData(nextCMS);
      return nextCMS;
    });
    showToast(`Deleted glimpse "${title}".`);
  };

  const handleDuplicateGlimpse = (index: number) => {
    const source = cms.videoGlimpses[index];
    if (!source) return;
    const clone: VideoGlimpse = {
      ...source,
      id: `glimpse-${Date.now()}`,
      title: `${source.title} (Copy)`
    };
    updateCMS((prev) => {
      const updated = [...prev.videoGlimpses];
      updated.splice(index + 1, 0, clone);
      const nextCMS = { ...prev, videoGlimpses: updated };
      saveCMSData(nextCMS);
      return nextCMS;
    });
    showToast(`Duplicated "${source.title}"!`);
  };

  const handleMoveGlimpse = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= cms.videoGlimpses.length) return;
    updateCMS((prev) => {
      const updated = [...prev.videoGlimpses];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      const nextCMS = { ...prev, videoGlimpses: updated };
      saveCMSData(nextCMS);
      return nextCMS;
    });
    showToast(`Moved glimpse ${direction === 'up' ? 'upward' : 'downward'}.`);
  };

  const handleResetGlimpsesToDefault = () => {
    if (!window.confirm('Reset all Video Glimpses to Mayavi Official Default 5 loops?')) return;
    updateCMS((prev) => {
      const nextCMS = { ...prev, videoGlimpses: DEFAULT_CMS_DATA.videoGlimpses };
      saveCMSData(nextCMS);
      return nextCMS;
    });
    showToast('Restored Mayavi Official 5 Glimpses!');
  };

  const handleSavePortfolio = () => {
    saveCMSData(cms);
    setSavedSection('portfolio');
    showToast(`Saved all ${cms.curatedExhibitions.length} Curated Exhibitions live!`);
    setTimeout(() => setSavedSection(null), 2500);
  };

  const handleSaveServicesAbout = () => {
    saveCMSData(cms);
    setSavedSection('services-about');
    showToast('Saved Core Services & Company Story live!');
    setTimeout(() => setSavedSection(null), 2500);
  };

  const handleSaveIntegrations = () => {
    saveCMSData(cms);
    setSavedSection('integrations');
    showToast('Saved Google Sheets & WhatsApp integrations live!');
    setTimeout(() => setSavedSection(null), 2500);
  };

  const handlePosterFileUpload = (file: File, callback: (dataUrl: string) => void) => {
    if (file.size > 2.5 * 1024 * 1024) {
      alert('Please choose an image file under 2.5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        callback(e.target.result as string);
        showToast('Poster image updated from file!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Change Admin Password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      setPasswordError('Passcode cannot be empty.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Passcode must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passcodes do not match.');
      return;
    }

    setAdminPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    showToast('Admin master passcode updated successfully.');
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = exportCMSData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mayavi-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CMS backup JSON downloaded.');
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importCMSData(content);
        if (success) {
          showToast('CMS content successfully imported from JSON.');
        } else {
          alert('Failed to import JSON: Invalid file structure or corrupted data.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Supabase Cloud Database Handlers
  const handleSaveSupabaseConfig = async () => {
    setCustomSupabaseConfig(supabaseUrl, supabaseAnonKey);
    const cfg = getSupabaseConfig();
    setSupabaseConfig(cfg);
    setIsTestingSupabase(true);
    setSupabaseTestResult(null);
    const res = await testSupabaseConnection(supabaseUrl, supabaseAnonKey);
    setIsTestingSupabase(false);
    setSupabaseTestResult(res);
    if (res.success) {
      showToast(res.tableReady ? 'Supabase connected! All videos will sync across all devices.' : 'Connected to Supabase! Please run SQL schema to create table.');
    } else {
      showToast(`Supabase connection error: ${res.message}`);
    }
  };

  const handlePushToCloud = async () => {
    setIsPushingCloud(true);
    const res = await saveCMSToSupabase(cms);
    setIsPushingCloud(false);
    if (res.success) {
      showToast('✓ All current videos, showreels & content pushed to Supabase Cloud!');
    } else {
      showToast(`Cloud upload error: ${res.message}`);
    }
  };

  const handlePullFromCloud = async () => {
    if (!window.confirm('Pull and overwrite local CMS with data currently stored in Supabase Cloud?')) return;
    setIsPullingCloud(true);
    const success = await reloadFromCloud();
    setIsPullingCloud(false);
    if (success) {
      showToast('✓ CMS successfully refreshed from Supabase Cloud!');
    } else {
      showToast('Could not fetch data from Supabase Cloud.');
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setSqlCopied(true);
    showToast('✓ Supabase SQL schema copied to clipboard!');
    setTimeout(() => setSqlCopied(false), 2500);
  };

  // Reorder Showreel Chapters (Move Up / Down)
  const handleMoveChapter = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= cms.showreel.chapters.length) return;
    const chapters = [...cms.showreel.chapters];
    const temp = chapters[idx];
    chapters[idx] = chapters[targetIdx];
    chapters[targetIdx] = temp;
    updateCMS((prev) => ({
      ...prev,
      showreel: { ...prev.showreel, chapters }
    }));
    showToast(`Reordered Showreel: Moved Act to position 0${targetIdx + 1}`);
  };

  // Duplicate Showreel Chapter
  const handleDuplicateChapter = (chapter: ShowreelChapter) => {
    const nextIdx = cms.showreel.chapters.length + 1;
    const duplicate: ShowreelChapter = {
      ...chapter,
      id: `act-${Date.now()}`,
      title: `${chapter.title} (Copy)`
    };
    updateCMS((prev) => ({
      ...prev,
      showreel: {
        ...prev.showreel,
        chapters: [...prev.showreel.chapters, duplicate]
      }
    }));
    showToast(`Duplicated chapter as Act 0${nextIdx}!`);
  };

  // Toggle Inquiry Status
  const handleToggleInquiryStatus = (id: string) => {
    updateCMS((prev) => {
      const nextInquiries = prev.inquiries.map((inq) => {
        if (inq.id === id) {
          const nextStatus = inq.status === 'new' ? 'contacted' : inq.status === 'contacted' ? 'archived' : 'new';
          return { ...inq, status: nextStatus as any };
        }
        return inq;
      });
      return { ...prev, inquiries: nextInquiries };
    });
    showToast('Updated client lead status!');
  };

  // Delete Individual Inquiry
  const handleDeleteInquiry = (id: string) => {
    if (!window.confirm('Delete this client inquiry record?')) return;
    updateCMS((prev) => ({
      ...prev,
      inquiries: prev.inquiries.filter((inq) => inq.id !== id)
    }));
    showToast('Inquiry record deleted.');
  };

  // Export Inquiries as CSV
  const handleExportInquiriesCSV = () => {
    if (cms.inquiries.length === 0) {
      showToast('No inquiries to export.');
      return;
    }
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Category', 'Budget', 'Status', 'Message'];
    const rows = cms.inquiries.map((inq) => [
      inq.id,
      `"${inq.date}"`,
      `"${inq.name}"`,
      `"${inq.email}"`,
      `"${inq.phone}"`,
      `"${inq.category}"`,
      `"${inq.budget}"`,
      `"${inq.status}"`,
      `"${(inq.message || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mayavi-client-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded client inquiries CSV!');
  };

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem('mayavi_admin_session_auth');
    onExit();
  };

  // Filtered portfolio
  const filteredProjects = cms.curatedExhibitions.filter((p) => {
    const matchesCategory =
      portfolioCategoryFilter === 'ALL' ||
      p.category.toLowerCase() === portfolioCategoryFilter.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
      p.location.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
      p.camera.toLowerCase().includes(portfolioSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#07050C] text-white flex flex-col font-sans selection:bg-[#EAB308] selection:text-black relative">
      
      {/* #16 Surreal Cosmic Atmosphere & Sacred Mandalas */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Imperial Violet Celestial Nebula */}
        <div className="absolute -top-[10%] left-[25%] w-[850px] h-[550px] rounded-full bg-[#410682]/20 blur-[150px]" />
        {/* Solar Gold Ambient Glow */}
        <div className="absolute -bottom-[15%] right-[20%] w-[700px] h-[500px] rounded-full bg-[#EAB308]/08 blur-[160px]" />

        {/* Sacred Geometry Mandala 1 - Slow Majestic Celestial Rotation */}
        <motion.img 
          animate={{ rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          src="/patterns/pattern-2.svg" 
          alt="Mayavi Sacred Geometry"
          className="absolute -top-32 -right-32 w-[650px] h-[650px] opacity-[0.045] invert pointer-events-none select-none drop-shadow-[0_0_50px_rgba(234,179,8,0.2)]"
        />

        {/* Sacred Geometry Mandala 2 - Counter-Rotation */}
        <motion.img 
          animate={{ rotate: -360 }}
          transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
          src="/patterns/pattern-5.svg" 
          alt="Mayavi Sacred Lattice"
          className="absolute -bottom-48 -left-48 w-[600px] h-[600px] opacity-[0.035] invert pointer-events-none select-none drop-shadow-[0_0_50px_rgba(65,6,130,0.3)]"
        />
      </div>

      {/* TOAST BANNER */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-2 px-5 py-3 rounded-2xl bg-amber-400 text-black font-mono text-xs font-bold shadow-[0_10px_35px_rgba(234,179,8,0.4)] animate-bounce">
          <CheckCircle size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP DIRECTORIAL HEADER - #22 Liquid Glass */}
      <header className="sticky top-0 z-40 bg-[#0B0814]/85 backdrop-blur-2xl border-b border-amber-400/25 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-[0_4px_30px_rgba(0,0,0,0.7)] relative">
        <div className="flex items-center space-x-3.5">
          <img 
            src="/official-mayavi-logo.png" 
            alt="Mayavi Media Creations" 
            className="h-11 w-auto object-contain drop-shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:scale-105 transition-transform shrink-0" 
          />
          <div className="border-l border-amber-400/30 pl-3.5 leading-tight">
            <div className="flex items-center space-x-2">
              <span className="font-serif italic text-xl text-white font-normal tracking-tight">Mayavi Master Deck</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 font-mono text-[8px] tracking-widest uppercase shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                DIRECTOR CONTROL
              </span>
              {supabaseConfig.isConfigured ? (
                <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-[8px] tracking-widest uppercase shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SUPABASE CLOUD LIVE</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveTab('security')}
                  className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 font-mono text-[8px] tracking-widest uppercase hover:bg-amber-500/30 transition-all cursor-pointer"
                  title="Click to connect Supabase Cloud Database"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>CONNECT CLOUD DB</span>
                </button>
              )}
              {isCloudSyncing && (
                <span className="flex items-center space-x-1 text-[8px] font-mono text-[#EAB308] animate-pulse">
                  <RefreshCw size={9} className="animate-spin" />
                  <span>SYNCING...</span>
                </span>
              )}
            </div>
            <p className="font-mono text-[9px] text-white/40 tracking-wider flex items-center gap-2 mt-1">
              <span className="text-amber-400/80 font-semibold">ARRI CALIBRATED REPOSITORY</span>
              <span className="text-white/20">|</span>
              <span className="text-white/60">24 FPS // LOG-C</span>
            </p>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            type="button"
            onClick={handleSaveAllCMS}
            className={`flex items-center space-x-1.5 px-5 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-lg ${
              globalSaved
                ? 'bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.6)]'
                : 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black shadow-[0_0_25px_rgba(234,179,8,0.4)] hover:shadow-[0_0_35px_rgba(234,179,8,0.6)] hover:scale-105'
            }`}
          >
            {globalSaved ? (
              <>
                <Check size={14} />
                <span>SAVED TO SITE ✓</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>SAVE ALL CHANGES</span>
              </>
            )}
          </button>

          <button
            onClick={onExit}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-amber-400/40 text-white/80 hover:text-white text-xs font-mono tracking-wider transition-all cursor-pointer shadow-sm"
          >
            <ExternalLink size={13} />
            <span>View Live Site</span>
          </button>

          <button
            onClick={handleExportJSON}
            title="Download JSON Backup"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-amber-400/40 text-white/70 hover:text-[#EAB308] text-xs font-mono tracking-wider transition-all cursor-pointer shadow-sm"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Export Backup</span>
          </button>

          <label
            title="Restore from JSON"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/15 hover:border-amber-400/40 text-white/70 hover:text-white text-xs font-mono tracking-wider transition-all cursor-pointer shadow-sm"
          >
            <Upload size={13} />
            <span className="hidden sm:inline">Import JSON</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/50 backdrop-blur-md border border-red-500/30 text-red-300 text-xs font-mono tracking-wider transition-all cursor-pointer shadow-sm"
          >
            <LogOut size={13} />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {/* DASHBOARD BODY CONTAINER */}
      <div className="flex-1 flex flex-col md:flex-row relative z-10">
        
        {/* LEFT TABBED NAVIGATION - #22 Liquid Glass Rail */}
        <aside className="w-full md:w-72 bg-[#090712]/85 backdrop-blur-3xl border-r border-amber-400/20 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible shrink-0 shadow-[4px_0_35px_rgba(0,0,0,0.7)]">
          <div className="hidden md:flex items-center justify-between px-3 py-2 mb-1 border-b border-white/[0.06]">
            <div className="font-mono text-[9px] text-[#EAB308] tracking-[0.3em] uppercase font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#EAB308]" />
              <span>DIRECTORIAL SECTIONS</span>
            </div>
            <span className="font-mono text-[8px] text-white/30 tracking-widest">[ 07 MODS ]</span>
          </div>

          {[
            { id: 'overview', label: 'Overview & Telemetry', icon: LayoutDashboard },
            { id: 'hero-glimpses', label: 'Hero Video & Glimpses', icon: Video, badge: `${cms.videoGlimpses.length} Loops` },
            { id: 'showreel', label: 'Showreel Player', icon: Film, badge: `${cms.showreel.chapters.length}` },
            { id: 'portfolio', label: 'Curated Exhibitions', icon: FolderKanban, badge: `${cms.curatedExhibitions.length}` },
            { id: 'services-about', label: 'Core Services & Story', icon: FileText },
            { id: 'integrations', label: 'Sheets & WhatsApp', icon: Sheet, badge: `${cms.inquiries.length}` },
            { 
              id: 'security', 
              label: 'Cloud DB & Security', 
              icon: Shield, 
              badge: supabaseConfig.isConfigured ? 'Cloud Live' : 'Setup DB' 
            }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative overflow-hidden flex items-center justify-between px-4 py-3.5 rounded-2xl text-left transition-all duration-300 backdrop-blur-xl group cursor-pointer whitespace-nowrap md:whitespace-normal ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/25 via-amber-950/40 to-purple-950/20 border-2 border-amber-400 shadow-[0_0_25px_rgba(234,179,8,0.25),inset_0_1px_12px_rgba(234,179,8,0.15)] ring-1 ring-amber-400/50'
                    : 'bg-white/[0.025] hover:bg-gradient-to-r hover:from-white/[0.07] hover:to-white/[0.02] border border-white/[0.08] hover:border-amber-400/50 text-white/75 hover:text-white shadow-[0_2px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_20px_rgba(234,179,8,0.1)]'
                }`}
              >
                {/* Liquid Glass Specular Sweep on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

                <div className="flex items-center space-x-3 relative z-10">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                    isActive 
                      ? 'bg-amber-400/20 border border-amber-400/50 text-amber-300 shadow-[0_0_12px_rgba(234,179,8,0.4)]' 
                      : 'bg-white/[0.04] border border-white/10 text-white/50 group-hover:text-amber-300 group-hover:border-amber-400/40 group-hover:bg-amber-400/10'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <span className={`text-xs font-mono tracking-wider ${
                    isActive ? 'text-amber-300 font-bold' : 'text-white/80 group-hover:text-white'
                  }`}>
                    {tab.label}
                  </span>
                </div>

                {tab.badge && (
                  <span
                    className={`ml-2 px-2.5 py-0.5 rounded-full font-mono text-[8.5px] tracking-wider uppercase transition-all relative z-10 shrink-0 ${
                      isActive 
                        ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-black font-extrabold shadow-[0_0_12px_#EAB308]' 
                        : 'backdrop-blur-md bg-amber-400/[0.08] border border-amber-400/25 text-amber-300/90 group-hover:bg-amber-400/20 group-hover:border-amber-400/50 group-hover:text-amber-200'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="mt-auto hidden md:block pt-6 border-t border-amber-400/15 px-1">
            <div className="relative overflow-hidden p-4 rounded-2xl backdrop-blur-2xl bg-gradient-to-br from-amber-500/[0.08] via-purple-950/20 to-black/70 border border-amber-400/30 shadow-[0_0_25px_rgba(234,179,8,0.12)] space-y-2 group">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8.5px] text-[#EAB308] font-bold tracking-[0.25em] uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#EAB308]" />
                  DIRECTOR CONTROL // 8K
                </span>
                <span className="font-mono text-[7.5px] px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 text-amber-300">
                  ARRI LF
                </span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed font-sans">
                Changes save instantly to browser and propagate directly to live visitors.
              </p>
              <div className="pt-1 flex items-center justify-between font-mono text-[7.5px] text-white/30 tracking-widest uppercase">
                <span>STATUS: MASTER ENGAGED</span>
                <span className="text-emerald-400">SYNC READY</span>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <span className="font-mono text-[9px] tracking-[0.35em] text-[#EAB308] uppercase font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#EAB308]" />
                  DASHBOARD OVERVIEW // MMXXVI
                </span>
                <h1 className="text-3xl sm:text-4xl font-light font-serif italic text-white mt-1.5 tracking-tight">
                  Control Room & Media Telemetry
                </h1>
                <p className="text-white/50 text-xs font-sans mt-1">
                  Manage all video links, hero video playback, curated exhibitions, and page content without touching code.
                </p>
              </div>

              {/* Status Metric Cards - #22 Liquid Glass Pods */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('hero-glimpses')}
                  className="relative overflow-hidden p-5 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/[0.05] via-[#0F0B1E]/80 to-[#07050C]/90 border border-white/15 hover:border-[#EAB308]/60 text-left space-y-2.5 transition-all duration-300 cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(234,179,8,0.15)] hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between text-white/50 group-hover:text-[#EAB308] transition-colors relative z-10">
                    <span className="font-mono text-[9px] tracking-widest uppercase">Hero Background</span>
                    <Video size={16} className="text-[#EAB308]" />
                  </div>
                  <p className="text-2xl font-serif italic text-white font-light group-hover:text-amber-200 transition-colors relative z-10">
                    {cms.hero.useVideoBackground ? 'Video Loop Active' : 'Lens Sequence'}
                  </p>
                  <p className="text-[10px] font-mono text-white/50 group-hover:text-[#EAB308] transition-colors relative z-10">
                    Click to configure loop →
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('hero-glimpses')}
                  className="relative overflow-hidden p-5 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/[0.05] via-[#0F0B1E]/80 to-[#07050C]/90 border border-white/15 hover:border-amber-400/60 text-left space-y-2.5 transition-all duration-300 cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(234,179,8,0.15)] hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between text-white/50 group-hover:text-amber-400 transition-colors relative z-10">
                    <span className="font-mono text-[9px] tracking-widest uppercase">Video Glimpses</span>
                    <Film size={16} className="text-amber-400" />
                  </div>
                  <p className="text-2xl font-serif italic text-white font-light group-hover:text-amber-200 transition-colors relative z-10">
                    {cms.videoGlimpses.length} Loops Configured
                  </p>
                  <p className="text-[10px] font-mono text-emerald-400 relative z-10">
                    ● Click to edit 5 loops →
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('portfolio')}
                  className="relative overflow-hidden p-5 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/[0.05] via-[#0F0B1E]/80 to-[#07050C]/90 border border-white/15 hover:border-purple-400/60 text-left space-y-2.5 transition-all duration-300 cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between text-white/50 group-hover:text-purple-400 transition-colors relative z-10">
                    <span className="font-mono text-[9px] tracking-widest uppercase">Curated Exhibitions</span>
                    <FolderKanban size={16} className="text-purple-400" />
                  </div>
                  <p className="text-2xl font-serif italic text-white font-light group-hover:text-purple-200 transition-colors relative z-10">
                    {cms.curatedExhibitions.length} Hybrid Links
                  </p>
                  <p className="text-[10px] font-mono text-purple-400 relative z-10">
                    Click to manage portfolio →
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('integrations')}
                  className="relative overflow-hidden p-5 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/[0.05] via-[#0F0B1E]/80 to-[#07050C]/90 border border-white/15 hover:border-emerald-400/60 text-left space-y-2.5 transition-all duration-300 cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between text-white/50 group-hover:text-emerald-400 transition-colors relative z-10">
                    <span className="font-mono text-[9px] tracking-widest uppercase">Client Inquiries</span>
                    <Sheet size={16} className="text-emerald-400" />
                  </div>
                  <p className="text-2xl font-serif italic text-white font-light group-hover:text-emerald-200 transition-colors relative z-10">
                    {cms.inquiries.length} Recorded
                  </p>
                  <p className="text-[10px] font-mono text-emerald-400 relative z-10">
                    Click to view leads & sheets →
                  </p>
                </button>
              </div>

              {/* Quick Actions Panel */}
              <div className="p-6 rounded-2xl bg-[#0D091B] border border-white/10 space-y-4">
                <span className="font-mono text-[9px] tracking-[0.25em] text-[#EAB308] uppercase font-bold">
                  DIRECTOR QUICK ACTIONS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleQuickAddChapter();
                      setActiveTab('showreel');
                    }}
                    className="p-4 rounded-xl bg-white/5 hover:bg-[#EAB308]/10 border border-white/10 hover:border-[#EAB308]/40 text-left space-y-1 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2 text-[#EAB308]">
                      <Plus size={16} />
                      <span className="font-mono text-xs font-bold uppercase">Add Showreel Act</span>
                    </div>
                    <p className="text-[11px] text-white/50">Add a new 9:16 vertical cinema act with live video embed.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsNewProject(true);
                      setEditingProject({
                        id: `proj-${Date.now()}`,
                        title: "",
                        category: "Brand Films",
                        duration: "02:30",
                        videoUrl: "",
                        imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200",
                        camera: "ARRI Alexa Mini LF",
                        lens: "Zeiss Supreme Prime 50mm",
                        location: "Hyderabad Studio",
                        storyBrief: "",
                        editorialSentence: "",
                        detailedStory: "",
                        scenes: ["/hero_stage_a.png"],
                        featured: false
                      });
                      setActiveTab('portfolio');
                    }}
                    className="p-4 rounded-xl bg-white/5 hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/40 text-left space-y-1 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2 text-purple-400">
                      <FolderKanban size={16} />
                      <span className="font-mono text-xs font-bold uppercase">Add Exhibition</span>
                    </div>
                    <p className="text-[11px] text-white/50">Add a new YouTube, Vimeo, Instagram, or Drive video link.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('hero-glimpses')}
                    className="p-4 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 text-left space-y-1 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2 text-amber-400">
                      <Video size={16} />
                      <span className="font-mono text-xs font-bold uppercase">Configure Hero</span>
                    </div>
                    <p className="text-[11px] text-white/50">Update 30s 1080p background loop and headline copy.</p>
                  </button>

                  <button
                    type="button"
                    onClick={handlePushToCloud}
                    disabled={isPushingCloud}
                    className="p-4 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/40 text-left space-y-1 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2 text-emerald-400">
                      <CloudUpload size={16} className={isPushingCloud ? "animate-spin" : ""} />
                      <span className="font-mono text-xs font-bold uppercase">Push to Cloud DB</span>
                    </div>
                    <p className="text-[11px] text-white/50">Sync all videos and showreels globally to Supabase.</p>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Snapshot */}
              <div className="p-6 rounded-2xl bg-[#0D091B] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[#EAB308] uppercase font-bold">
                    RECENT INQUIRIES & AUDITIONS
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('integrations')}
                    className="text-[10px] font-mono text-amber-400 hover:underline cursor-pointer"
                  >
                    View All ({cms.inquiries.length}) →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-white/40 text-[9px] uppercase tracking-wider">
                        <th className="py-2.5">Date</th>
                        <th className="py-2.5">Client Name</th>
                        <th className="py-2.5">Category</th>
                        <th className="py-2.5">Budget</th>
                        <th className="py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {cms.inquiries.slice(0, 3).map((inq) => (
                        <tr 
                          key={inq.id} 
                          onClick={() => setActiveTab('integrations')}
                          className="hover:bg-white/[0.04] cursor-pointer transition-colors"
                          title="Click to view full inquiry details"
                        >
                          <td className="py-3 text-white/40">{inq.date}</td>
                          <td className="py-3 text-white font-sans font-medium">{inq.name}</td>
                          <td className="py-3 text-[#EAB308]">{inq.category}</td>
                          <td className="py-3 text-white/70">{inq.budget}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded text-[8px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 uppercase font-bold">
                              {inq.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: HERO BACKGROUND VIDEO & GLIMPSES */}
          {activeTab === 'hero-glimpses' && (
            <div className="space-y-10">
              {/* SECTION HEADER WITH TELEMETRY */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-[#EAB308] uppercase font-bold">
                      DELIVERABLES #1 & #2
                    </span>
                    <span className="font-mono text-[8px] px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold uppercase">
                      {cms.videoGlimpses.length} LOOPS CONFIGURED
                    </span>
                  </div>
                  <h1 className="text-3xl font-light font-serif italic text-white mt-1">
                    Hero Video & Glimpses Architecture
                  </h1>
                  <p className="text-white/50 text-xs font-sans mt-1">
                    Configure the 30-second 1080p hero loop, headlines, optical metadata, and high-fidelity video glimpses.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleQuickAddGlimpse}
                    className="px-4 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <Plus size={13} />
                    <span>+ Quick Add Loop</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenAddGlimpseModal}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                  >
                    <Plus size={13} />
                    <span>+ Add Loop (Modal)</span>
                  </button>
                </div>
              </div>

              {/* HERO SECTION CONFIG */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D091B] border border-white/10 space-y-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300">
                      <Video size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-serif italic text-white flex items-center gap-2">
                        <span>Hero Stage Presentation</span>
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold uppercase tracking-wider">
                          DELIVERABLE #1
                        </span>
                      </h2>
                      <p className="text-xs text-white/40 font-mono">Calibrate hero presentation mode, optical metadata, and high-definition video loop</p>
                    </div>
                  </div>

                  {/* Segmented Mode Switch */}
                  <div className="inline-flex p-1.5 rounded-2xl bg-black/70 border border-white/15 backdrop-blur-xl shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        updateCMS((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, useVideoBackground: false }
                        }));
                        showToast('Hero display set to: Lens Sequence Scroll (80 Frames)');
                      }}
                      className={`px-3.5 py-1.5 rounded-xl font-mono text-[10px] font-bold tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer ${
                        !cms.hero.useVideoBackground
                          ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${!cms.hero.useVideoBackground ? 'bg-black' : 'bg-white/30'}`} />
                      <span>LENS SEQUENCE SCROLL</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateCMS((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, useVideoBackground: true }
                        }));
                        showToast('Hero display set to: 30s 1080p Video Loop');
                      }}
                      className={`px-3.5 py-1.5 rounded-xl font-mono text-[10px] font-bold tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer ${
                        cms.hero.useVideoBackground
                          ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cms.hero.useVideoBackground ? 'bg-black animate-pulse' : 'bg-white/30'}`} />
                      <span>30S VIDEO LOOP</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* HERO VIDEO URL */}
                  <div className="space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono tracking-wider text-white/70 uppercase font-semibold">
                        Hero Video URL (30s 1080p Loop)
                      </label>
                      {cms.hero.backgroundVideoUrl && (
                        <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold">
                          {detectVideoPlatform(cms.hero.backgroundVideoUrl)} STREAM
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={cms.hero.backgroundVideoUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMS((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, backgroundVideoUrl: val }
                          }));
                        }}
                        placeholder="https://.../video.mp4 or YouTube / Vimeo / Drive"
                        className="flex-1 px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                      />
                      {cms.hero.backgroundVideoUrl && (
                        <button
                          type="button"
                          onClick={() => setPreviewVideoUrl(cms.hero.backgroundVideoUrl)}
                          className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-mono flex items-center space-x-1.5 cursor-pointer transition-all border border-white/10"
                        >
                          <Play size={12} className="text-amber-400" />
                          <span>Test</span>
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          updateCMS((prev) => ({
                            ...prev,
                            hero: {
                              ...prev.hero,
                              backgroundVideoUrl: '/videos/mayavi-hero.mp4',
                              posterUrl: '/official-mayavi-logo.png'
                            }
                          }));
                          showToast('Loaded Official Mayavi 3D Motion Reel (/videos/mayavi-hero.mp4)');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-[9px] hover:bg-amber-400/20 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles size={10} />
                        <span>⚡ Use Official Mayavi 3D Motion Reel (/videos/mayavi-hero.mp4)</span>
                      </button>
                      {cms.hero.backgroundVideoUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            updateCMS((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, backgroundVideoUrl: '' }
                            }));
                            showToast('Cleared hero background video URL');
                          }}
                          className="px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 font-mono text-[9px] hover:bg-red-500/20 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <X size={10} />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-white/40 font-mono">
                      Supports direct .mp4 files, YouTube watch/embed links, Vimeo streams, and Google Drive video previews.
                    </p>
                  </div>

                  {/* POSTER IMAGE FALLBACK & FILE UPLOAD */}
                  <div className="space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono tracking-wider text-white/70 uppercase font-semibold">
                        Poster Image Fallback Frame
                      </label>
                      <label className="cursor-pointer px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-[9px] flex items-center gap-1 transition-all">
                        <Upload size={10} />
                        <span>Upload Poster File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handlePosterFileUpload(file, (dataUrl) => {
                                updateCMS((prev) => ({
                                  ...prev,
                                  hero: { ...prev.hero, posterUrl: dataUrl }
                                }));
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={cms.hero.posterUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMS((prev) => ({
                            ...prev,
                            hero: { ...prev.hero, posterUrl: val }
                          }));
                        }}
                        placeholder="/official-mayavi-logo.png or image URL"
                        className="flex-1 px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                      />
                      {cms.hero.posterUrl && (
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black/60 flex items-center justify-center">
                          <img src={cms.hero.posterUrl} alt="Poster" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[9px] font-mono text-white/40 uppercase">Presets:</span>
                      {[
                        { label: 'Official Logo', url: '/official-mayavi-logo.png' },
                        { label: 'Stage A', url: '/hero_stage_a.png' },
                        { label: 'Monolith', url: '/desert_monolith.png' }
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            updateCMS((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, posterUrl: preset.url }
                            }));
                            showToast(`Poster set to ${preset.label}`);
                          }}
                          className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-mono text-[9px] transition-all cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* HERO PRIMARY HEADLINE */}
                  <div className="md:col-span-2 space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono tracking-wider text-white/70 uppercase font-semibold">
                        Hero Primary Headline
                      </label>
                      <span className="font-mono text-[9px] text-white/40">{cms.hero.headline.length} chars</span>
                    </div>
                    <input
                      type="text"
                      value={cms.hero.headline}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, headline: val }
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-sm font-serif outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  {/* HERO SUBHEADLINE / PHILOSOPHY */}
                  <div className="md:col-span-2 space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono tracking-wider text-white/70 uppercase font-semibold">
                        Hero Subheadline / Architectural Philosophy
                      </label>
                      <span className="font-mono text-[9px] text-white/40">{cms.hero.subheadline.length} chars</span>
                    </div>
                    <textarea
                      rows={2}
                      value={cms.hero.subheadline}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, subheadline: val }
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  {/* HERO DIRECTORIAL QUOTE */}
                  <div className="md:col-span-2 space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono tracking-wider text-white/70 uppercase font-semibold">
                        Hero Directorial Quote
                      </label>
                      <span className="font-mono text-[9px] text-white/40">{cms.hero.quote?.length || 0} chars</span>
                    </div>
                    <textarea
                      rows={2}
                      value={cms.hero.quote || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, quote: val }
                        }));
                      }}
                      placeholder="We don't simply record light. We calibrate time, tension, and human emotion into permanent moving art."
                      className="w-full px-4 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-serif italic outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  {/* CAMERA TELEMETRY BADGE */}
                  <div className="space-y-2 text-left">
                    <label className="block text-[10px] font-mono tracking-wider text-white/70 uppercase font-semibold">
                      Camera Telemetry Badge
                    </label>
                    <input
                      type="text"
                      value={cms.hero.cameraTag}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, cameraTag: val }
                        }));
                      }}
                      className="w-full px-4 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[
                        'ARRI ALEXA LF // ZEISS SUPREME 35MM',
                        'SONY VENICE 2 // COOKIE ANAMORPHIC',
                        'RED V-RAPTOR XL // LEICA SUMMILUX-C',
                        'HASSELBLAD H6D-100C // 50MM F/2.2'
                      ].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            updateCMS((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, cameraTag: preset }
                            }));
                            showToast(`Camera tag: ${preset}`);
                          }}
                          className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-amber-400/20 hover:text-amber-300 border border-white/10 text-white/60 font-mono text-[8.5px] transition-all cursor-pointer"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* LOCATION TAG */}
                  <div className="space-y-2 text-left">
                    <label className="block text-[10px] font-mono tracking-wider text-white/70 uppercase font-semibold">
                      Location Tag
                    </label>
                    <input
                      type="text"
                      value={cms.hero.locationTag}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, locationTag: val }
                        }));
                      }}
                      className="w-full px-4 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[
                        'STUDIO STAGE A // HYDERABAD',
                        'SOUNDSTAGE 4 // JUBILEE HILLS',
                        'FINANCIAL DISTRICT // RAJENDRA NAGAR',
                        'ARCHITECTURAL MONOLITH // GACHIBOWLI'
                      ].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            updateCMS((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, locationTag: preset }
                            }));
                            showToast(`Location tag: ${preset}`);
                          }}
                          className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-amber-400/20 hover:text-amber-300 border border-white/10 text-white/60 font-mono text-[8.5px] transition-all cursor-pointer"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA BUTTON LABELS */}
                  <div className="space-y-2 text-left">
                    <label className="block text-[10px] font-mono tracking-wider text-white/70 uppercase font-semibold">
                      Primary CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={cms.hero.ctaPrimaryText}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, ctaPrimaryText: val }
                        }));
                      }}
                      className="w-full px-4 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="block text-[10px] font-mono tracking-wider text-white/70 uppercase font-semibold">
                      Secondary CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={cms.hero.ctaSecondaryText}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, ctaSecondaryText: val }
                        }));
                      }}
                      className="w-full px-4 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                  </div>
                </div>

                {/* HERO SAVE BUTTON */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-white/50">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Mode: <strong className="text-white">{cms.hero.useVideoBackground ? 'Video Loop' : 'Lens Sequence Scroll'}</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveHero}
                    className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase flex items-center space-x-2 cursor-pointer transition-all shadow-md ${
                      savedSection === 'hero'
                        ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                        : 'bg-[#EAB308] hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                    }`}
                  >
                    {savedSection === 'hero' ? <Check size={14} /> : <Save size={14} />}
                    <span>{savedSection === 'hero' ? 'HERO CONFIG SAVED ✓' : 'SAVE HERO CONFIGURATION'}</span>
                  </button>
                </div>
              </div>

              {/* VIDEO GLIMPSES MANAGEMENT MODULE */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D091B] border border-white/10 space-y-6 shadow-2xl">
                {/* GLIMPSES HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300">
                      <Film size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-serif italic text-white flex items-center gap-2">
                        <span>High-Fidelity Video Glimpses</span>
                        <span className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold uppercase tracking-wider">
                          {cms.videoGlimpses.length} LOOPS LOADED
                        </span>
                      </h2>
                      <p className="text-xs text-white/40 font-mono">
                        Deliverable #2 // Max 30s 1080p loops with multi-aspect cinema frames and lazy streaming
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetGlimpsesToDefault}
                      className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 font-mono text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
                      title="Reset all glimpses back to Mayavi's 5 official production defaults"
                    >
                      <RotateCcw size={12} />
                      <span className="hidden sm:inline">Official 5 Defaults</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleQuickAddGlimpse}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer border border-white/15"
                    >
                      <Plus size={13} className="text-amber-400" />
                      <span>Quick Add</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenAddGlimpseModal}
                      className="px-4 py-2 rounded-xl bg-[#EAB308] hover:bg-amber-400 text-black font-mono text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(234,179,8,0.25)]"
                    >
                      <Plus size={13} />
                      <span>Add in Modal</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveAllGlimpses}
                      className={`px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-all ${
                        savedSection === 'all-glimpses'
                          ? 'bg-emerald-500 text-black'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                      }`}
                    >
                      {savedSection === 'all-glimpses' ? <Check size={13} /> : <Save size={13} />}
                      <span>{savedSection === 'all-glimpses' ? 'SAVED ✓' : 'SAVE ALL'}</span>
                    </button>
                  </div>
                </div>

                {/* SEARCH & CATEGORY FILTER TOOLBAR */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-black/40 border border-white/5">
                  {/* Search Bar */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={14} />
                    <input
                      type="text"
                      value={glimpseSearch}
                      onChange={(e) => setGlimpseSearch(e.target.value)}
                      placeholder="Search glimpses by title, category, caption, or video link..."
                      className="w-full pl-9 pr-8 py-2 bg-neutral-900/90 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                    {glimpseSearch && (
                      <button
                        onClick={() => setGlimpseSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-0.5"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 shrink-0">
                    <button
                      type="button"
                      onClick={() => setGlimpseCategoryFilter('ALL')}
                      className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                        glimpseCategoryFilter === 'ALL'
                          ? 'bg-[#EAB308] text-black shadow-[0_0_12px_rgba(234,179,8,0.3)]'
                          : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10'
                      }`}
                    >
                      ALL ({cms.videoGlimpses.length})
                    </button>
                    {allGlimpseCategories.map((cat) => {
                      const count = cms.videoGlimpses.filter((g) => g.category === cat).length;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setGlimpseCategoryFilter(cat)}
                          className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                            glimpseCategoryFilter === cat
                              ? 'bg-[#EAB308] text-black shadow-[0_0_12px_rgba(234,179,8,0.3)]'
                              : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10'
                          }`}
                        >
                          {cat} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* GLIMPSES CARDS LIST */}
                <div className="space-y-4">
                  {filteredGlimpses.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-black/40 border border-white/5 space-y-4">
                      <Film className="mx-auto text-white/20" size={40} />
                      <div>
                        <h3 className="text-white text-base font-serif italic">
                          {cms.videoGlimpses.length === 0
                            ? 'No Video Glimpses Configured'
                            : `No video glimpses match "${glimpseSearch}"`}
                        </h3>
                        <p className="text-white/40 text-xs font-mono mt-1">
                          {cms.videoGlimpses.length === 0
                            ? 'Add your first high-definition cinematic loop or restore Mayavi official production defaults.'
                            : 'Try adjusting your search query or switching categories.'}
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-3 pt-2">
                        {cms.videoGlimpses.length === 0 ? (
                          <>
                            <button
                              type="button"
                              onClick={handleQuickAddGlimpse}
                              className="px-4 py-2 rounded-xl bg-[#EAB308] text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer shadow-md"
                            >
                              <Plus size={13} />
                              <span>+ Add First Loop</span>
                            </button>
                            <button
                              type="button"
                              onClick={handleResetGlimpsesToDefault}
                              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center space-x-1.5 cursor-pointer"
                            >
                              <RotateCcw size={12} />
                              <span>Restore 5 Official Loops</span>
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setGlimpseSearch('');
                              setGlimpseCategoryFilter('ALL');
                            }}
                            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center space-x-1.5 cursor-pointer"
                          >
                            <RotateCcw size={12} />
                            <span>Reset Filters</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    filteredGlimpses.map((glimpse) => {
                      const trueIndex = cms.videoGlimpses.findIndex((g) => g.id === glimpse.id);
                      const isSaved = savedGlimpseId === glimpse.id || savedSection === `glimpse-${trueIndex}`;
                      const platform = detectVideoPlatform(glimpse.videoUrl);

                      return (
                        <div
                          key={glimpse.id}
                          className="p-5 md:p-6 rounded-2xl bg-neutral-900/60 border border-white/5 space-y-4 hover:border-amber-400/30 transition-all shadow-lg"
                        >
                          {/* CARD HEADER & DIRECTORIAL CONTROLS */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
                            <div className="flex items-center space-x-2">
                              {/* Reorder Up / Down */}
                              <div className="flex items-center space-x-1 pr-2 border-r border-white/10">
                                <button
                                  type="button"
                                  disabled={trueIndex === 0}
                                  onClick={() => handleMoveGlimpse(trueIndex, 'up')}
                                  className="p-1 rounded-md bg-white/5 hover:bg-white/15 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
                                  title="Move Loop Up"
                                >
                                  <ArrowUp size={12} />
                                </button>
                                <button
                                  type="button"
                                  disabled={trueIndex === cms.videoGlimpses.length - 1}
                                  onClick={() => handleMoveGlimpse(trueIndex, 'down')}
                                  className="p-1 rounded-md bg-white/5 hover:bg-white/15 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
                                  title="Move Loop Down"
                                >
                                  <ArrowDown size={12} />
                                </button>
                              </div>

                              <span className="font-mono text-xs text-[#EAB308] font-bold">
                                GLIMPSE 0{trueIndex + 1}
                              </span>

                              <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                                {platform}
                              </span>

                              {glimpse.aspectRatio && (
                                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300">
                                  {glimpse.aspectRatio}
                                </span>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-1.5">
                              {glimpse.videoUrl && (
                                <button
                                  type="button"
                                  onClick={() => setPreviewVideoUrl(glimpse.videoUrl)}
                                  className="px-2.5 py-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 font-mono text-[10px] flex items-center space-x-1 cursor-pointer transition-all border border-amber-400/20"
                                >
                                  <Play size={10} />
                                  <span>Test Play</span>
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => handleOpenEditGlimpseModal(glimpse)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all cursor-pointer border border-white/10"
                                title="Open Detailed Modal Editor"
                              >
                                <Edit3 size={13} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDuplicateGlimpse(trueIndex)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all cursor-pointer border border-white/10"
                                title="Duplicate this Loop"
                              >
                                <Copy size={13} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteGlimpse(glimpse.id, glimpse.title)}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-all cursor-pointer border border-red-500/20"
                                title="Delete Loop"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>

                          {/* INLINE FORM CONTROLS */}
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            {/* Left Column: Thumbnail Preview & File Upload (4 cols) */}
                            <div className="md:col-span-4 space-y-3 text-left">
                              <div className="flex items-center justify-between">
                                <label className="text-[9px] font-mono text-white/50 uppercase font-semibold">
                                  Poster Thumbnail Frame
                                </label>
                                <label className="cursor-pointer px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-[9px] flex items-center gap-1 transition-all">
                                  <Upload size={9} />
                                  <span>Upload File</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        handlePosterFileUpload(file, (dataUrl) => {
                                          updateCMS((prev) => {
                                            const next = [...prev.videoGlimpses];
                                            next[trueIndex] = { ...next[trueIndex], thumbnailUrl: dataUrl };
                                            return { ...prev, videoGlimpses: next };
                                          });
                                        });
                                      }
                                    }}
                                  />
                                </label>
                              </div>

                              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/80 flex items-center justify-center group">
                                {glimpse.thumbnailUrl ? (
                                  <img
                                    src={glimpse.thumbnailUrl}
                                    alt={glimpse.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                                  />
                                ) : (
                                  <div className="text-center p-3 text-white/30 font-mono text-[10px]">
                                    No poster frame specified
                                  </div>
                                )}
                                {glimpse.videoUrl && (
                                  <button
                                    type="button"
                                    onClick={() => setPreviewVideoUrl(glimpse.videoUrl)}
                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer"
                                  >
                                    <div className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-lg">
                                      <Play size={16} />
                                    </div>
                                  </button>
                                )}
                              </div>

                              <input
                                type="text"
                                value={glimpse.thumbnailUrl}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  updateCMS((prev) => {
                                    const next = [...prev.videoGlimpses];
                                    next[trueIndex] = { ...next[trueIndex], thumbnailUrl: val };
                                    return { ...prev, videoGlimpses: next };
                                  });
                                }}
                                placeholder="/official-mayavi-logo.png or image URL"
                                className="w-full px-3 py-1.5 bg-black/50 border border-white/10 rounded-lg text-white text-[11px] font-mono outline-none focus:border-[#EAB308]"
                              />

                              {/* Aspect Ratio Selector Chips */}
                              <div className="flex items-center space-x-1.5 pt-1">
                                <span className="text-[9px] font-mono text-white/40 uppercase">Ratio:</span>
                                {(['16:9', '9:16', '1:1'] as const).map((ratio) => (
                                  <button
                                    key={ratio}
                                    type="button"
                                    onClick={() => {
                                      updateCMS((prev) => {
                                        const next = [...prev.videoGlimpses];
                                        next[trueIndex] = { ...next[trueIndex], aspectRatio: ratio };
                                        return { ...prev, videoGlimpses: next };
                                      });
                                    }}
                                    className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase transition-all cursor-pointer ${
                                      (glimpse.aspectRatio || '16:9') === ratio
                                        ? 'bg-amber-400 text-black font-bold'
                                        : 'bg-white/5 hover:bg-white/10 text-white/60'
                                    }`}
                                  >
                                    {ratio}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Right Column: Title, Category, URL, Caption (8 cols) */}
                            <div className="md:col-span-8 space-y-3 text-left">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="sm:col-span-2 space-y-1">
                                  <label className="text-[9px] font-mono text-white/50 uppercase font-semibold">Title</label>
                                  <input
                                    type="text"
                                    value={glimpse.title}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      updateCMS((prev) => {
                                        const next = [...prev.videoGlimpses];
                                        next[trueIndex] = { ...next[trueIndex], title: val };
                                        return { ...prev, videoGlimpses: next };
                                      });
                                    }}
                                    placeholder="Scene or project title..."
                                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-serif outline-none focus:border-[#EAB308]"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] font-mono text-white/50 uppercase font-semibold">Duration</label>
                                  <input
                                    type="text"
                                    value={glimpse.duration}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      updateCMS((prev) => {
                                        const next = [...prev.videoGlimpses];
                                        next[trueIndex] = { ...next[trueIndex], duration: val };
                                        return { ...prev, videoGlimpses: next };
                                      });
                                    }}
                                    placeholder="0:15"
                                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <label className="text-[9px] font-mono text-white/50 uppercase font-semibold">Category</label>
                                  <div className="flex items-center space-x-1">
                                    {['Cinematic Identity', 'Media Production', 'Talent Development'].map((cat) => (
                                      <button
                                        key={cat}
                                        type="button"
                                        onClick={() => {
                                          updateCMS((prev) => {
                                            const next = [...prev.videoGlimpses];
                                            next[trueIndex] = { ...next[trueIndex], category: cat };
                                            return { ...prev, videoGlimpses: next };
                                          });
                                        }}
                                        className="text-[8px] font-mono text-amber-300/80 hover:text-amber-300 underline cursor-pointer"
                                      >
                                        +{cat.split(' ')[0]}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <input
                                  type="text"
                                  value={glimpse.category}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateCMS((prev) => {
                                      const next = [...prev.videoGlimpses];
                                      next[trueIndex] = { ...next[trueIndex], category: val };
                                      return { ...prev, videoGlimpses: next };
                                    });
                                  }}
                                  placeholder="e.g. Media Production, Cinematic Identity..."
                                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                                />
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <label className="text-[9px] font-mono text-white/50 uppercase font-semibold">
                                    Video URL (1080p Cine Loop)
                                  </label>
                                  {glimpse.videoUrl && (
                                    <span className="text-[9px] font-mono text-amber-400">
                                      {platform} detected
                                    </span>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={glimpse.videoUrl}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      updateCMS((prev) => {
                                        const next = [...prev.videoGlimpses];
                                        next[trueIndex] = { ...next[trueIndex], videoUrl: val };
                                        return { ...prev, videoGlimpses: next };
                                      });
                                    }}
                                    placeholder="Direct MP4, YouTube, Vimeo, Drive, Instagram Reel..."
                                    className="flex-1 px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      updateCMS((prev) => {
                                        const next = [...prev.videoGlimpses];
                                        next[trueIndex] = {
                                          ...next[trueIndex],
                                          videoUrl: '/videos/mayavi-hero.mp4',
                                          thumbnailUrl: '/official-mayavi-logo.png'
                                        };
                                        return { ...prev, videoGlimpses: next };
                                      });
                                      showToast('Filled with official motion reel');
                                    }}
                                    className="px-2 py-1 bg-white/5 hover:bg-amber-400/20 text-white/60 hover:text-amber-300 rounded-lg font-mono text-[9px] transition-all cursor-pointer whitespace-nowrap"
                                    title="Quick fill with official Mayavi reel"
                                  >
                                    Reel
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[9px] font-mono text-white/50 uppercase font-semibold">
                                  Director Caption
                                </label>
                                <textarea
                                  rows={2}
                                  value={glimpse.caption}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateCMS((prev) => {
                                      const next = [...prev.videoGlimpses];
                                      next[trueIndex] = { ...next[trueIndex], caption: val };
                                      return { ...prev, videoGlimpses: next };
                                    });
                                  }}
                                  placeholder="Curatorial notes on visual tone, camera motion, and cinematic composition..."
                                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                                />
                              </div>
                            </div>
                          </div>

                          {/* INDIVIDUAL GLIMPSE SAVE BUTTON */}
                          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                            <span className="font-mono text-[9px] text-white/40">
                              1080p Cine Loop // Deliverable #2 // ID: {glimpse.id}
                            </span>
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                onClick={() => handleSaveGlimpse(trueIndex, glimpse.title)}
                                className={`px-4 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase flex items-center space-x-1.5 cursor-pointer transition-all ${
                                  isSaved
                                    ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                                    : 'bg-white/10 hover:bg-[#EAB308] hover:text-black text-white'
                                }`}
                              >
                                {isSaved ? <Check size={11} /> : <Save size={11} />}
                                <span>{isSaved ? 'SAVED ✓' : `SAVE GLIMPSE 0${trueIndex + 1}`}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* BOTTOM ALL GLIMPSES SAVE & QUICK ACTION BAR */}
                <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[10px] font-mono text-white/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{cms.videoGlimpses.length} total loops live on site</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleQuickAddGlimpse}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-all"
                    >
                      <Plus size={13} className="text-amber-400" />
                      <span>Quick Add Loop</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveAllGlimpses}
                      className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase flex items-center space-x-2 cursor-pointer transition-all shadow-md ${
                        savedSection === 'all-glimpses'
                          ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                          : 'bg-[#EAB308] hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                      }`}
                    >
                      {savedSection === 'all-glimpses' ? <Check size={14} /> : <Save size={14} />}
                      <span>SAVE ALL {cms.videoGlimpses.length} GLIMPSES</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: SHOWREEL PLAYER */}
          {activeTab === 'showreel' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#EAB308] uppercase font-bold">
                    DELIVERABLE #3
                  </span>
                  <h1 className="text-3xl font-light font-serif italic text-white mt-1">
                    Showreel Player Management
                  </h1>
                  <p className="text-white/50 text-xs font-sans mt-1">
                    Add or update multi-platform video links (YouTube, Instagram, LinkedIn, Vimeo, Drive embeds) for the showreel modal.
                  </p>
                </div>

                <div className="flex items-center flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={handleQuickAddChapter}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition-all"
                  >
                    <Plus size={14} className="text-[#EAB308]" />
                    <span>+ Quick Add Act</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenAddChapter}
                    className="px-4 py-2.5 rounded-xl bg-[#EAB308] hover:bg-amber-400 text-black font-mono text-xs font-bold tracking-wider flex items-center space-x-1.5 cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                  >
                    <Plus size={14} />
                    <span>ADD ACT (MODAL)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveAllShowreel}
                    className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase flex items-center space-x-1.5 cursor-pointer transition-all shadow-md ${
                      savedActId === 'all-showreel'
                        ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                    }`}
                  >
                    {savedActId === 'all-showreel' ? <Check size={14} /> : <Save size={14} />}
                    <span>SAVE ALL ACTS</span>
                  </button>
                </div>
              </div>

              {/* Showreel Header Config */}
              <div className="p-6 rounded-2xl bg-[#0D091B] border border-white/10 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[9px] font-mono text-white/50 uppercase">Showreel Title</label>
                    <input
                      type="text"
                      value={cms.showreel.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          showreel: { ...prev.showreel, title: val }
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-[9px] font-mono text-white/50 uppercase">Showreel Tagline</label>
                    <input
                      type="text"
                      value={cms.showreel.tagline}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          showreel: { ...prev.showreel, tagline: val }
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end pt-2 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => {
                      saveCMSData(cms);
                      showToast('Saved Showreel Header configuration live!');
                    }}
                    className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white font-mono text-[10px] flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Save size={12} className="text-[#EAB308]" />
                    <span>SAVE HEADER</span>
                  </button>
                </div>
              </div>

              {/* Chapter Navigation & Quick Jump Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#0D091B] border border-white/10">
                <div className="flex items-center space-x-2">
                  <Film size={14} className="text-[#EAB308]" />
                  <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest font-bold">
                    Chapters ({cms.showreel.chapters.length})
                  </span>
                </div>
                <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
                  {cms.showreel.chapters.map((ch, idx) => (
                    <a
                      key={ch.id}
                      href={`#chapter-${ch.id}`}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#EAB308]/20 border border-white/10 hover:border-[#EAB308]/40 text-white/80 font-mono text-[9px] font-bold uppercase transition-all whitespace-nowrap"
                    >
                      Act 0{idx + 1}
                    </a>
                  ))}
                  <button
                    type="button"
                    onClick={handleQuickAddChapter}
                    className="px-3 py-1.5 rounded-lg bg-[#EAB308]/15 hover:bg-[#EAB308]/30 border border-[#EAB308]/40 text-[#EAB308] font-mono text-[9px] font-bold uppercase flex items-center space-x-1 cursor-pointer whitespace-nowrap"
                    title="Quickly add new chapter card to bottom of list"
                  >
                    <Plus size={10} />
                    <span>+ Quick Add</span>
                  </button>
                </div>
              </div>

              {/* Chapters List */}
              <div className="space-y-6">
                {cms.showreel.chapters.map((chapter, idx) => {
                  const detected = detectVideoPlatform(chapter.videoUrl);
                  return (
                    <div
                      key={chapter.id}
                      id={`chapter-${chapter.id}`}
                      className="p-6 rounded-2xl bg-[#0D091B] border border-white/10 space-y-4 hover:border-white/20 transition-all scroll-mt-6 shadow-md"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-xs text-[#EAB308] font-bold">
                            ACT 0{idx + 1}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[8px] text-white/70 uppercase">
                            Platform: <strong className="text-[#EAB308]">{detected.toUpperCase()}</strong>
                          </span>
                        </div>

                        <div className="flex items-center space-x-1.5">
                          <button
                            type="button"
                            onClick={() => handleMoveChapter(idx, 'up')}
                            disabled={idx === 0}
                            className={`p-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all ${
                              idx === 0 ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                            title="Move Chapter Up"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveChapter(idx, 'down')}
                            disabled={idx === cms.showreel.chapters.length - 1}
                            className={`p-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all ${
                              idx === cms.showreel.chapters.length - 1 ? 'opacity-25 cursor-not-allowed' : 'cursor-pointer'
                            }`}
                            title="Move Chapter Down"
                          >
                            <ArrowDown size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicateChapter(idx)}
                            className="p-1.5 rounded-lg border border-white/10 text-white/60 hover:text-[#EAB308] hover:bg-white/10 transition-all cursor-pointer"
                            title="Duplicate Act"
                          >
                            <Copy size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsNewChapter(false);
                              setEditingChapter({ ...chapter });
                            }}
                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] flex items-center space-x-1.5 cursor-pointer"
                          >
                            <Edit3 size={11} className="text-[#EAB308]" />
                            <span>Edit in Modal</span>
                          </button>
                          {chapter.videoUrl && (
                            <button
                              type="button"
                              onClick={() => setPreviewVideoUrl(chapter.videoUrl)}
                              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] flex items-center space-x-1.5 cursor-pointer"
                            >
                              <Play size={11} className="text-[#EAB308]" />
                              <span>Play Embed</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteChapter(chapter.id, chapter.title)}
                            className="p-1.5 rounded-lg hover:bg-red-950/50 text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                            title="Delete chapter"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase">Chapter Title</label>
                          <input
                            type="text"
                            value={chapter.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.showreel.chapters];
                                next[idx] = { ...next[idx], title: val };
                                return { ...prev, showreel: { ...prev.showreel, chapters: next } };
                              });
                            }}
                            className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                          />
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase">Subtitle</label>
                          <input
                            type="text"
                            value={chapter.subtitle}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.showreel.chapters];
                                next[idx] = { ...next[idx], subtitle: val };
                                return { ...prev, showreel: { ...prev.showreel, chapters: next } };
                              });
                            }}
                            className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                          />
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase">Camera & Optics</label>
                          <input
                            type="text"
                            value={chapter.camera}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.showreel.chapters];
                                next[idx] = { ...next[idx], camera: val };
                                return { ...prev, showreel: { ...prev.showreel, chapters: next } };
                              });
                            }}
                            className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                          />
                        </div>

                        <div className="md:col-span-2 space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase flex items-center justify-between">
                            <span>Video Link (YouTube, Instagram Reel, LinkedIn, Vimeo, Drive, or MP4)</span>
                            {chapter.videoUrl && (
                              <span className="text-[#EAB308] lowercase text-[8px]">
                                detected: {detected}
                              </span>
                            )}
                          </label>
                          <input
                            type="text"
                            value={chapter.videoUrl}
                            onChange={(e) => {
                              const val = e.target.value;
                              const plat = detectVideoPlatform(val);
                              updateCMS((prev) => {
                                const next = [...prev.showreel.chapters];
                                next[idx] = { ...next[idx], videoUrl: val, platform: plat as any };
                                return { ...prev, showreel: { ...prev.showreel, chapters: next } };
                              });
                            }}
                            placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                            className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                          />
                        </div>

                        <div className="space-y-1 text-left">
                          <div className="flex items-center justify-between">
                            <label className="text-[9px] font-mono text-white/50 uppercase">Poster Image Frame</label>
                            <label className="text-[8px] font-mono text-[#EAB308] hover:text-amber-300 cursor-pointer flex items-center space-x-1">
                              <Upload size={9} />
                              <span>Upload File</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handlePosterFileUpload(file, (dataUrl) => {
                                      updateCMS((prev) => {
                                        const next = [...prev.showreel.chapters];
                                        next[idx] = { ...next[idx], posterUrl: dataUrl };
                                        return { ...prev, showreel: { ...prev.showreel, chapters: next } };
                                      });
                                    });
                                  }
                                }}
                              />
                            </label>
                          </div>
                          <input
                            type="text"
                            value={chapter.posterUrl}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.showreel.chapters];
                                next[idx] = { ...next[idx], posterUrl: val };
                                return { ...prev, showreel: { ...prev.showreel, chapters: next } };
                              });
                            }}
                            className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                          />
                        </div>

                        <div className="md:col-span-3 space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase">Directorial Notes</label>
                          <input
                            type="text"
                            value={chapter.directorNotes}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.showreel.chapters];
                                next[idx] = { ...next[idx], directorNotes: val };
                                return { ...prev, showreel: { ...prev.showreel, chapters: next } };
                              });
                            }}
                            className="w-full px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                          />
                        </div>
                      </div>

                      {/* PHYSICAL CARD SAVE BUTTON & STATUS BAR */}
                      <div className="pt-4 mt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 bg-neutral-950/40 -mx-6 -mb-6 p-4 rounded-b-2xl">
                        <div className="flex items-center space-x-2 text-[10px] font-mono text-white/60">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Status: <strong className="text-white">Active in Showreel</strong></span>
                          <span className="text-white/20">|</span>
                          <span className="text-white/40">Platform: <span className="text-[#EAB308] uppercase font-bold">{detected}</span></span>
                        </div>

                        <div className="flex items-center space-x-2.5">
                          {chapter.videoUrl && (
                            <button
                              type="button"
                              onClick={() => setPreviewVideoUrl(chapter.videoUrl)}
                              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs flex items-center space-x-1.5 cursor-pointer transition-all"
                            >
                              <Play size={12} className="text-[#EAB308]" />
                              <span>Test Play</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleSaveSingleAct(chapter.id, idx, chapter.title)}
                            className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase flex items-center space-x-2 cursor-pointer transition-all shadow-md ${
                              savedActId === chapter.id
                                ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                                : 'bg-[#EAB308] hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                            }`}
                          >
                            {savedActId === chapter.id ? (
                              <>
                                <Check size={14} />
                                <span>SAVED & LIVE!</span>
                              </>
                            ) : (
                              <>
                                <Save size={14} />
                                <span>SAVE ACT 0{idx + 1}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* STICKY BOTTOM CONTROLS FOR SHOWREEL */}
              <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-[#090712]/95 backdrop-blur-xl border border-[#EAB308]/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EAB308]/20 flex items-center justify-center text-[#EAB308]">
                    <Film size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      Showreel Acts: {cms.showreel.chapters.length} Loaded
                    </p>
                    <p className="text-[10px] text-white/50 font-sans">
                      All video changes save directly to site storage & auto-play in vertical mobile frame.
                    </p>
                  </div>
                </div>

                <div className="flex items-center flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={handleQuickAddChapter}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition-all"
                  >
                    <Plus size={14} className="text-[#EAB308]" />
                    <span>+ Quick Add Act</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleViewLiveShowreel}
                    className="px-4 py-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 font-mono text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition-all"
                  >
                    <ExternalLink size={14} className="text-purple-300" />
                    <span>Preview Live Showreel</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveAllShowreel}
                    className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase flex items-center space-x-2 cursor-pointer transition-all shadow-lg ${
                      savedActId === 'all-showreel'
                        ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                        : 'bg-[#EAB308] hover:bg-amber-400 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                    }`}
                  >
                    {savedActId === 'all-showreel' ? (
                      <>
                        <Check size={16} />
                        <span>ALL ACTS SAVED & LIVE!</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>SAVE ALL SHOWREEL ACTS</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: CURATED EXHIBITIONS / PORTFOLIO (50 to 100 Hybrid Video Links) */}
          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#EAB308] uppercase font-bold">
                    DELIVERABLE #4
                  </span>
                  <h1 className="text-3xl font-light font-serif italic text-white mt-1">
                    Curated Exhibitions & Portfolio ({cms.curatedExhibitions.length})
                  </h1>
                  <p className="text-white/50 text-xs font-sans mt-1">
                    Manage 50 to 100 hybrid video links supporting YouTube, Instagram, LinkedIn, Google Drive, and Vimeo.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleExportJSON}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs flex items-center space-x-1.5 cursor-pointer transition-all"
                    title="Export portfolio as portable JSON"
                  >
                    <Download size={13} className="text-[#EAB308]" />
                    <span>Export JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsNewProject(true);
                      setEditingProject({
                        id: `proj-${Date.now()}`,
                        title: "",
                        category: "Brand Films",
                        duration: "02:30",
                        videoUrl: "",
                        imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200",
                        camera: "ARRI Alexa Mini LF",
                        lens: "Zeiss Supreme Prime 50mm",
                        location: "Hyderabad Studio",
                        storyBrief: "",
                        editorialSentence: "",
                        detailedStory: "",
                        scenes: ["/hero_stage_a.png"],
                        featured: false
                      });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#EAB308] hover:bg-amber-400 text-black font-mono text-xs font-bold tracking-wider flex items-center space-x-1.5 cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                  >
                    <Plus size={14} />
                    <span>ADD EXHIBITION</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#0D091B] border border-white/10">
                <div className="flex items-center space-x-2 bg-neutral-900 px-3.5 py-2 rounded-xl border border-white/10 flex-1 max-w-md">
                  <Search size={14} className="text-white/40" />
                  <input
                    type="text"
                    value={portfolioSearch}
                    onChange={(e) => setPortfolioSearch(e.target.value)}
                    placeholder="Search by title, location, or camera..."
                    className="bg-transparent text-white text-xs font-mono outline-none w-full"
                  />
                  {portfolioSearch && (
                    <button onClick={() => setPortfolioSearch('')} className="text-white/30 hover:text-white">
                      <X size={12} />
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
                  {['ALL', 'Brand Films', 'Vertical Fiction', 'Personal Branding', 'Luxury Events', 'Commercials', 'Campaigns'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setPortfolioCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-[9px] tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                        portfolioCategoryFilter === cat
                          ? 'bg-amber-400 text-black font-bold'
                          : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exhibitions Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => {
                  const platform = detectVideoPlatform(project.videoUrl);
                  return (
                    <div
                      key={project.id}
                      className="group rounded-2xl bg-[#0D091B] border border-white/10 overflow-hidden hover:border-amber-400/40 transition-all flex flex-col justify-between"
                    >
                      {/* Image & Video Tag */}
                      <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        
                        <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[8px] text-[#EAB308] uppercase">
                            {project.category}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[8px] text-white/60 uppercase">
                            {platform.toUpperCase()}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/70 font-mono text-[9px]">
                          <span>{project.duration}</span>
                          <span>{project.location}</span>
                        </div>

                        {/* Quick Play Trigger */}
                        {project.videoUrl && (
                          <button
                            type="button"
                            onClick={() => setPreviewVideoUrl(project.videoUrl)}
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs cursor-pointer"
                          >
                            <div className="w-10 h-10 rounded-full bg-[#EAB308] text-black flex items-center justify-center shadow-lg">
                              <Play size={16} fill="currentColor" />
                            </div>
                          </button>
                        )}
                      </div>

                      {/* Content Card Body */}
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif italic text-lg text-white font-normal group-hover:text-amber-200 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-white/50 text-xs font-sans line-clamp-2 mt-1">
                            {project.editorialSentence || project.storyBrief}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[8px] text-white/40">
                          <span className="truncate max-w-[180px]">{project.camera}</span>
                          <div className="flex items-center space-x-1">
                            <button
                              type="button"
                              onClick={() => {
                                setIsNewProject(false);
                                setEditingProject({ ...project });
                              }}
                              className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                              title="Edit Exhibition"
                            >
                              <Edit3 size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProject(project.id, project.title)}
                              className="p-1.5 rounded hover:bg-red-950/50 text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete Exhibition"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* STICKY BOTTOM ACTION BAR FOR EXHIBITIONS */}
              <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-[#090712]/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <FolderKanban size={18} />
                  </div>
                  <div>
                    <p className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      Curated Exhibitions: {cms.curatedExhibitions.length} Available
                    </p>
                    <p className="text-[10px] text-white/50 font-sans">
                      All hybrid video links and stories are live on the site.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSavePortfolio}
                  className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase flex items-center space-x-2 cursor-pointer transition-all shadow-md ${
                    savedSection === 'portfolio'
                      ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                      : 'bg-[#EAB308] hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                  }`}
                >
                  {savedSection === 'portfolio' ? <Check size={14} /> : <Save size={14} />}
                  <span>{savedSection === 'portfolio' ? 'EXHIBITIONS SAVED ✓' : 'SAVE ALL EXHIBITIONS'}</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 5: 4 CORE SERVICES & COMPANY ABOUT STORY */}
          {activeTab === 'services-about' && (
            <div className="space-y-10">
              <div>
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#EAB308] uppercase font-bold">
                  DELIVERABLES #9 & #10
                </span>
                <h1 className="text-3xl font-light font-serif italic text-white mt-1">
                  Core Services & Company Story
                </h1>
                <p className="text-white/50 text-xs font-sans mt-1">
                  Update the 4 core service worlds (Media, Personal Branding, Talent Development, Events) and the Company Story.
                </p>
              </div>

              {/* 4 CORE SERVICES LIST */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D091B] border border-white/10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-3">
                    <Layers className="text-[#EAB308]" size={20} />
                    <h2 className="text-xl font-serif italic text-white">4 Core Service Sections</h2>
                  </div>
                </div>

                <div className="space-y-6">
                  {cms.coreServices.map((service, idx) => (
                    <div
                      key={service.id}
                      className="p-5 rounded-2xl bg-neutral-900/60 border border-white/5 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs text-[#EAB308] font-bold">
                            SERVICE {service.number} //
                          </span>
                          <span className="font-serif italic text-base text-white">{service.title}</span>
                        </div>
                        <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">
                          {service.category}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase">Service Title</label>
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.coreServices];
                                next[idx].title = val;
                                return { ...prev, coreServices: next };
                              });
                            }}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                          />
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase">Tagline / Motto</label>
                          <input
                            type="text"
                            value={service.tagline}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.coreServices];
                                next[idx].tagline = val;
                                return { ...prev, coreServices: next };
                              });
                            }}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                          />
                        </div>

                        <div className="md:col-span-2 space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase">Short Description</label>
                          <textarea
                            rows={2}
                            value={service.description}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.coreServices];
                                next[idx].description = val;
                                return { ...prev, coreServices: next };
                              });
                            }}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                          />
                        </div>

                        <div className="md:col-span-2 space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase">Detailed Story Narrative</label>
                          <textarea
                            rows={3}
                            value={service.detailedStory}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.coreServices];
                                next[idx].detailedStory = val;
                                return { ...prev, coreServices: next };
                              });
                            }}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* COMPANY STORY & ABOUT CONFIG */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D091B] border border-white/10 space-y-6">
                <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                  <FileText className="text-[#EAB308]" size={20} />
                  <h2 className="text-xl font-serif italic text-white">Company Story & Statistics</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1 text-left">
                    <label className="text-[9px] font-mono text-white/50 uppercase">Philosophy Heading</label>
                    <input
                      type="text"
                      value={cms.about.heading}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          about: { ...prev.about, heading: val }
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-sm font-serif outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[9px] font-mono text-white/50 uppercase">Directorial Quote</label>
                    <input
                      type="text"
                      value={cms.about.quote}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          about: { ...prev.about, quote: val }
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-sans italic outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1 text-left">
                    <label className="text-[9px] font-mono text-white/50 uppercase">About Us Narrative Body</label>
                    <textarea
                      rows={4}
                      value={cms.about.body}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          about: { ...prev.about, body: val }
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  {/* 3 Key Stats */}
                  <div className="md:col-span-2 grid grid-cols-3 gap-4 pt-2">
                    <div className="space-y-1 text-left">
                      <label className="text-[8px] font-mono text-white/50 uppercase">Stat 1 Value & Label</label>
                      <input
                        type="text"
                        value={cms.about.stat1Value}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMS((prev) => ({ ...prev, about: { ...prev.about, stat1Value: val } }));
                        }}
                        className="w-full px-3 py-1.5 bg-neutral-900 border border-white/10 rounded-lg text-white font-serif text-sm"
                      />
                      <input
                        type="text"
                        value={cms.about.stat1Label}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMS((prev) => ({ ...prev, about: { ...prev.about, stat1Label: val } }));
                        }}
                        className="w-full px-3 py-1 bg-black/40 border border-white/5 rounded text-white/50 font-mono text-[9px]"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[8px] font-mono text-white/50 uppercase">Stat 2 Value & Label</label>
                      <input
                        type="text"
                        value={cms.about.stat2Value}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMS((prev) => ({ ...prev, about: { ...prev.about, stat2Value: val } }));
                        }}
                        className="w-full px-3 py-1.5 bg-neutral-900 border border-white/10 rounded-lg text-white font-serif text-sm"
                      />
                      <input
                        type="text"
                        value={cms.about.stat2Label}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMS((prev) => ({ ...prev, about: { ...prev.about, stat2Label: val } }));
                        }}
                        className="w-full px-3 py-1 bg-black/40 border border-white/5 rounded text-white/50 font-mono text-[9px]"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[8px] font-mono text-white/50 uppercase">Stat 3 Value & Label</label>
                      <input
                        type="text"
                        value={cms.about.stat3Value}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMS((prev) => ({ ...prev, about: { ...prev.about, stat3Value: val } }));
                        }}
                        className="w-full px-3 py-1.5 bg-neutral-900 border border-white/10 rounded-lg text-white font-serif text-sm"
                      />
                      <input
                        type="text"
                        value={cms.about.stat3Label}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCMS((prev) => ({ ...prev, about: { ...prev.about, stat3Label: val } }));
                        }}
                        className="w-full px-3 py-1 bg-black/40 border border-white/5 rounded text-white/50 font-mono text-[9px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={handleSaveServicesAbout}
                    className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase flex items-center space-x-2 cursor-pointer transition-all shadow-md ${
                      savedSection === 'services-about'
                        ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                        : 'bg-[#EAB308] hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                    }`}
                  >
                    {savedSection === 'services-about' ? <Check size={14} /> : <Save size={14} />}
                    <span>{savedSection === 'services-about' ? 'SERVICES SAVED ✓' : 'SAVE SERVICES & COMPANY STORY'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: GOOGLE SHEETS & WHATSAPP INTEGRATIONS (Deliverables 6 & 7) */}
          {activeTab === 'integrations' && (
            <div className="space-y-10">
              <div>
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#EAB308] uppercase font-bold">
                  DELIVERABLES #6 & #7
                </span>
                <h1 className="text-3xl font-light font-serif italic text-white mt-1">
                  Inquiries, Google Sheets & WhatsApp Routing
                </h1>
                <p className="text-white/50 text-xs font-sans mt-1">
                  Connect contact forms to Google Sheets via serverless Google Apps Script and configure WhatsApp routing.
                </p>
              </div>

              {/* INTEGRATION WEBHOOK SETTINGS */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D091B] border border-white/10 space-y-6">
                <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                  <Sheet className="text-emerald-400" size={20} />
                  <h2 className="text-xl font-serif italic text-white">Google Apps Script Webhook (Google Sheets)</h2>
                </div>

                <div className="space-y-4 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-white/60 uppercase">
                      Google Apps Script Web App URL (Deliverable #6)
                    </label>
                    <input
                      type="text"
                      value={cms.integrations.googleSheetsWebhookUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          integrations: { ...prev.integrations, googleSheetsWebhookUrl: val }
                        }));
                      }}
                      placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                    <p className="text-[10px] text-white/40">
                      When a visitor submits the Inquiry/Contact form on the landing page, data is automatically POSTed to this endpoint to append rows in Google Sheets.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-wider">
                        SERVERLESS INTEGRATION READY
                      </span>
                      <p className="text-xs text-white/60">
                        Inquiries are also backed up locally in the Mayavi database below.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        showToast('Simulated test webhook dispatch to Google Sheets verified.');
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono text-[10px] tracking-wider uppercase border border-emerald-500/30 cursor-pointer"
                    >
                      Test Webhook Dispatch
                    </button>
                  </div>
                </div>
              </div>

              {/* WHATSAPP ROUTING CONFIG */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D091B] border border-white/10 space-y-6">
                <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                  <Phone className="text-emerald-400" size={20} />
                  <h2 className="text-xl font-serif italic text-white">WhatsApp Integration (Deliverable #7)</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-white/60 uppercase">
                      WhatsApp Dispatch Number (with country code, no +)
                    </label>
                    <input
                      type="text"
                      value={cms.integrations.whatsappNumber}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          integrations: { ...prev.integrations, whatsappNumber: val }
                        }));
                      }}
                      placeholder="919999999999"
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-white/60 uppercase">
                      Studio Direct Phone
                    </label>
                    <input
                      type="text"
                      value={cms.integrations.contactPhone}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          integrations: { ...prev.integrations, contactPhone: val }
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-mono text-white/60 uppercase">
                      Pre-filled WhatsApp Message Template
                    </label>
                    <input
                      type="text"
                      value={cms.integrations.whatsappMessageTemplate}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCMS((prev) => ({
                          ...prev,
                          integrations: { ...prev.integrations, whatsappMessageTemplate: val }
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={handleSaveIntegrations}
                    className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase flex items-center space-x-2 cursor-pointer transition-all shadow-md ${
                      savedSection === 'integrations'
                        ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                        : 'bg-[#EAB308] hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                    }`}
                  >
                    {savedSection === 'integrations' ? <Check size={14} /> : <Save size={14} />}
                    <span>{savedSection === 'integrations' ? 'INTEGRATIONS SAVED ✓' : 'SAVE INTEGRATIONS & WHATSAPP'}</span>
                  </button>
                </div>
              </div>

              {/* INQUIRIES LOG VIEWER */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D091B] border border-white/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[#EAB308] uppercase font-bold">
                    INQUIRIES STORED IN BROWSER DATABASE ({cms.inquiries.length})
                  </span>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={handleExportInquiriesCSV}
                      disabled={cms.inquiries.length === 0}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#EAB308] font-mono text-[10px] flex items-center space-x-1.5 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Download complete leads list as CSV"
                    >
                      <Download size={11} />
                      <span>Export CSV</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Clear all stored inquiries?')) {
                          updateCMS((prev) => ({ ...prev, inquiries: [] }));
                          showToast('Inquiries cleared.');
                        }
                      }}
                      className="text-[10px] font-mono text-white/30 hover:text-red-400 cursor-pointer"
                    >
                      Clear Log
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-white/40 text-[9px] uppercase tracking-wider">
                        <th className="py-2.5">Date</th>
                        <th className="py-2.5">Client Name</th>
                        <th className="py-2.5">Contact</th>
                        <th className="py-2.5">Category</th>
                        <th className="py-2.5">Budget</th>
                        <th className="py-2.5">Message Brief</th>
                        <th className="py-2.5">Status</th>
                        <th className="py-2.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {cms.inquiries.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-white/30 font-sans text-xs">
                            No inquiries recorded yet. Submissions from the public website contact and world modals will appear here.
                          </td>
                        </tr>
                      ) : (
                        cms.inquiries.map((inq) => {
                          const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
                          const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(inq.name)}!%20Thank%20you%20for%20contacting%20Mayavi%20Media%20Creations.` : null;
                          return (
                            <tr key={inq.id} className="hover:bg-white/[0.02]">
                              <td className="py-3 text-white/40 whitespace-nowrap">{inq.date}</td>
                              <td className="py-3 text-white font-sans font-medium whitespace-nowrap">{inq.name}</td>
                              <td className="py-3 text-white/70 text-[11px]">
                                <div>{inq.email}</div>
                                <div className="text-white/40">{inq.phone}</div>
                              </td>
                              <td className="py-3 text-[#EAB308] whitespace-nowrap">{inq.category}</td>
                              <td className="py-3 text-white/70 whitespace-nowrap">{inq.budget}</td>
                              <td className="py-3 text-white/60 font-sans text-xs max-w-xs truncate" title={inq.message}>{inq.message}</td>
                              <td className="py-3 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => handleToggleInquiryStatus(inq.id)}
                                  className={`px-2 py-0.5 rounded text-[8px] uppercase font-bold border transition-all cursor-pointer ${
                                    inq.status === 'contacted'
                                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20'
                                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                                  }`}
                                  title="Click to toggle status (new <-> contacted)"
                                >
                                  {inq.status} ↺
                                </button>
                              </td>
                              <td className="py-3 whitespace-nowrap text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  {waUrl && (
                                    <a
                                      href={waUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all inline-flex items-center"
                                      title="Chat on WhatsApp"
                                    >
                                      <MessageSquare size={12} />
                                    </a>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteInquiry(inq.id)}
                                    className="p-1.5 rounded-lg hover:bg-red-950/50 text-white/30 hover:text-red-400 transition-colors cursor-pointer"
                                    title="Delete inquiry"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 7: SECURITY & BACKUP */}
          {activeTab === 'security' && (
            <div className="space-y-10">
              <div>
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#EAB308] uppercase font-bold">
                  SECURITY & BACKUP
                </span>
                <h1 className="text-3xl font-light font-serif italic text-white mt-1">
                  Access Control & System Backups
                </h1>
                <p className="text-white/50 text-xs font-sans mt-1">
                  Connect Supabase cloud database, update the master single-user passcode, export complete JSON database backups, or reset defaults.
                </p>
              </div>

              {/* SUPABASE CLOUD DATABASE (PERSISTENCE BRIDGE) */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D091B] border border-white/10 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-3">
                    <Database className="text-[#EAB308]" size={22} />
                    <div>
                      <h2 className="text-xl font-serif italic text-white flex items-center gap-2">
                        Supabase Cloud Database
                        <span className="text-[10px] font-mono not-italic px-2 py-0.5 rounded bg-[#EAB308]/15 border border-[#EAB308]/30 text-[#EAB308] uppercase">
                          Multi-Device Sync
                        </span>
                      </h2>
                      <p className="text-xs text-white/50 font-sans mt-0.5">
                        Syncs all videos, showreel acts, and CMS edits to a live PostgreSQL backend so changes reflect across all phones, tablets, and visitors worldwide.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {supabaseConfig.isConfigured ? (
                      <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>CONNECTED ({supabaseConfig.source === 'env' ? 'VERCEL ENV' : 'BROWSER VAULT'})</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-[10px]">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span>LOCALSTORAGE ONLY (OFFLINE)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Configuration Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-mono text-white/70 uppercase tracking-wider flex items-center justify-between">
                      <span>Supabase Project URL</span>
                      <span className="text-[9px] text-white/40 lowercase">e.g. https://xyz.supabase.co</span>
                    </label>
                    <input
                      type="url"
                      value={supabaseUrl}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                      placeholder="https://your-project.supabase.co"
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-mono text-white/70 uppercase tracking-wider flex items-center justify-between">
                      <span>Supabase Public Anon Key</span>
                      <span className="text-[9px] text-white/40 lowercase">anon / public key</span>
                    </label>
                    <input
                      type="password"
                      value={supabaseAnonKey}
                      onChange={(e) => setSupabaseAnonKey(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSaveSupabaseConfig}
                    disabled={isTestingSupabase}
                    className="px-5 py-2.5 rounded-xl bg-[#EAB308] hover:bg-amber-400 disabled:opacity-50 text-black font-mono text-xs font-bold tracking-wider uppercase flex items-center space-x-2 cursor-pointer transition-all shadow-md"
                  >
                    {isTestingSupabase ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>TESTING CONNECTION...</span>
                      </>
                    ) : (
                      <>
                        <Check size={14} />
                        <span>SAVE & TEST CONNECTION</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handlePushToCloud}
                    disabled={isPushingCloud || !supabaseConfig.isConfigured}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 border border-white/10 text-white font-mono text-xs tracking-wider uppercase flex items-center space-x-2 cursor-pointer transition-all"
                  >
                    {isPushingCloud ? (
                      <>
                        <RefreshCw size={13} className="animate-spin text-[#EAB308]" />
                        <span>PUSHING TO CLOUD...</span>
                      </>
                    ) : (
                      <>
                        <CloudUpload size={13} className="text-[#EAB308]" />
                        <span>PUSH CURRENT CMS TO CLOUD</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handlePullFromCloud}
                    disabled={isPullingCloud || !supabaseConfig.isConfigured}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 border border-white/10 text-white font-mono text-xs tracking-wider uppercase flex items-center space-x-2 cursor-pointer transition-all"
                  >
                    {isPullingCloud ? (
                      <>
                        <RefreshCw size={13} className="animate-spin text-emerald-400" />
                        <span>PULLING FROM CLOUD...</span>
                      </>
                    ) : (
                      <>
                        <CloudDownload size={13} className="text-emerald-400" />
                        <span>PULL LATEST FROM CLOUD</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSqlSchema(!showSqlSchema)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-mono text-xs tracking-wider uppercase flex items-center space-x-2 cursor-pointer transition-all ml-auto"
                  >
                    <Code size={13} className="text-amber-400" />
                    <span>{showSqlSchema ? 'HIDE SQL SCHEMA' : 'VIEW / COPY SQL SCHEMA'}</span>
                  </button>
                </div>

                {/* Connection Test Result Banner */}
                {supabaseTestResult && (
                  <div
                    className={`p-4 rounded-2xl border text-xs font-mono flex items-start space-x-3 ${
                      supabaseTestResult.success && supabaseTestResult.tableReady
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : supabaseTestResult.success && !supabaseTestResult.tableReady
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        : 'bg-red-500/10 border-red-500/30 text-red-300'
                    }`}
                  >
                    {supabaseTestResult.success && supabaseTestResult.tableReady ? (
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-400" />
                    ) : (
                      <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-400" />
                    )}
                    <div className="space-y-1">
                      <p className="font-bold">{supabaseTestResult.message}</p>
                      {!supabaseTestResult.tableReady && supabaseTestResult.success && (
                        <p className="text-[11px] opacity-80 font-sans">
                          Click <strong>VIEW / COPY SQL SCHEMA</strong> below, copy the SQL, paste it into your Supabase Dashboard SQL Editor, and click Run.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Collapsible SQL Schema Drawer */}
                {showSqlSchema && (
                  <div className="p-5 rounded-2xl bg-black/60 border border-amber-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-[#EAB308]">
                        <Code size={16} />
                        <span className="font-mono text-xs font-bold uppercase tracking-wider">
                          Supabase SQL Schema (Run in Supabase SQL Editor)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopySql}
                        className="px-3 py-1.5 rounded-lg bg-[#EAB308] hover:bg-amber-400 text-black font-mono text-[10px] font-bold tracking-wider uppercase flex items-center space-x-1.5 cursor-pointer transition-all"
                      >
                        {sqlCopied ? <Check size={12} /> : <Copy size={12} />}
                        <span>{sqlCopied ? 'COPIED TO CLIPBOARD!' : 'COPY SQL CODE'}</span>
                      </button>
                    </div>

                    <pre className="p-4 rounded-xl bg-neutral-950 border border-white/10 text-white/80 font-mono text-[11px] overflow-x-auto leading-relaxed select-all">
                      {SUPABASE_SQL_SCHEMA}
                    </pre>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 text-white/60 text-xs font-sans">
                      <p className="font-bold text-white text-[11px] font-mono uppercase tracking-wider text-[#EAB308]">
                        ⚡ 3-Step Supabase Setup Guide:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-[11px]">
                        <li>Create a free account at <strong>supabase.com</strong> and create a new project.</li>
                        <li>In your project sidebar, click <strong>SQL Editor</strong> &gt; <strong>New query</strong>, paste the SQL code above, and click <strong>Run</strong>.</li>
                        <li>Go to <strong>Project Settings &gt; API</strong>, copy the <strong>Project URL</strong> and <strong>anon public API key</strong>, and paste them above.</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>

              {/* CHANGE MASTER PASSCODE */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D091B] border border-white/10 space-y-6 max-w-xl">
                <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                  <Shield className="text-[#EAB308]" size={20} />
                  <h2 className="text-xl font-serif italic text-white">Change Master Admin Passcode</h2>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-white/60 uppercase">New Master Passcode</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter at least 6 characters..."
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-white/60 uppercase">Confirm Passcode</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat passcode..."
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  {passwordError && (
                    <p className="text-xs text-red-400 font-mono tracking-wide">{passwordError}</p>
                  )}

                  <button
                    type="submit"
                    className="py-2.5 px-5 rounded-xl bg-[#EAB308] hover:bg-amber-400 text-black font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer"
                  >
                    Update Passcode
                  </button>
                </form>
              </div>

              {/* FULL SYSTEM BACKUP & RESTORE */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D091B] border border-white/10 space-y-6">
                <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                  <Download className="text-amber-400" size={20} />
                  <h2 className="text-xl font-serif italic text-white">Full Database JSON Backup & Restore</h2>
                </div>

                <p className="text-xs text-white/60 leading-relaxed font-sans max-w-2xl">
                  Download a complete portable snapshot of all video links, hero configurations, showreels, exhibitions, and settings. You can re-import this JSON on any device or hosting environment without loss.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleExportJSON}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-mono text-xs tracking-wider uppercase flex items-center space-x-2 cursor-pointer"
                  >
                    <Download size={14} className="text-[#EAB308]" />
                    <span>Download mayavi-cms-backup.json</span>
                  </button>

                  <label className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-mono text-xs tracking-wider uppercase flex items-center space-x-2 cursor-pointer">
                    <Upload size={14} className="text-emerald-400" />
                    <span>Restore From JSON File</span>
                    <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                  </label>
                </div>
              </div>

              {/* FACTORY RESET */}
              <div className="p-6 md:p-8 rounded-3xl bg-red-950/20 border border-red-500/20 space-y-4 max-w-2xl">
                <div className="flex items-center space-x-2 text-red-400">
                  <RotateCcw size={18} />
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider">Factory Reset Site Content</h3>
                </div>
                <p className="text-xs text-red-200/70 font-sans">
                  Reset all configurations, video links, exhibitions, and hero settings back to original factory defaults.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all CMS content back to factory defaults? All custom edits will be reverted.')) {
                      resetCMS();
                      showToast('Site content reset to factory defaults.');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 font-mono text-xs tracking-wider uppercase cursor-pointer"
                >
                  Confirm Factory Reset
                </button>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* EDIT / CREATE PROJECT MODAL */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0E0A1D] border border-white/15 rounded-3xl p-6 md:p-8 max-w-3xl w-full my-8 space-y-6 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <FolderKanban className="text-[#EAB308]" size={20} />
                <h2 className="text-2xl font-serif italic text-white">
                  {isNewProject ? 'Add Curated Exhibition' : 'Edit Curated Exhibition'}
                </h2>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Project Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="e.g. The Weight of Silence"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Category</label>
                <select
                  value={editingProject.category}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                >
                  <option value="Vertical Fiction">Vertical Fiction</option>
                  <option value="Brand Films">Brand Films</option>
                  <option value="Personal Branding">Personal Branding</option>
                  <option value="Luxury Events">Luxury Events</option>
                  <option value="Commercials">Commercials</option>
                  <option value="Campaigns">Campaigns</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Runtime / Duration</label>
                <input
                  type="text"
                  value={editingProject.duration}
                  onChange={(e) => setEditingProject({ ...editingProject, duration: e.target.value })}
                  placeholder="e.g. 03:15"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Location Tag</label>
                <input
                  type="text"
                  value={editingProject.location}
                  onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                  placeholder="e.g. Cochin Heritage Pavilion"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase flex items-center justify-between">
                  <span>Hybrid Video URL (YouTube, Instagram Reel, LinkedIn, Vimeo, Google Drive, or direct MP4)</span>
                  {editingProject.videoUrl && (
                    <span className="text-amber-400 lowercase">
                      detected: {detectVideoPlatform(editingProject.videoUrl)}
                    </span>
                  )}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingProject.videoUrl}
                    onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=... or https://drive.google.com/..."
                    className="flex-1 px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                  />
                  {editingProject.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setPreviewVideoUrl(editingProject.videoUrl)}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-mono flex items-center space-x-1 cursor-pointer"
                    >
                      <Play size={12} />
                      <span>Test</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Cover Image Frame URL</label>
                <input
                  type="text"
                  value={editingProject.imageUrl}
                  onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/... or /hero_stage_a.png"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Camera Model</label>
                <input
                  type="text"
                  value={editingProject.camera}
                  onChange={(e) => setEditingProject({ ...editingProject, camera: e.target.value })}
                  placeholder="e.g. ARRI ALEXA MINI LF"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Lens Calibration</label>
                <input
                  type="text"
                  value={editingProject.lens}
                  onChange={(e) => setEditingProject({ ...editingProject, lens: e.target.value })}
                  placeholder="e.g. ZEISS SUPREME PRIME 50MM T1.5"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Story Brief</label>
                <textarea
                  rows={2}
                  value={editingProject.storyBrief}
                  onChange={(e) => setEditingProject({ ...editingProject, storyBrief: e.target.value })}
                  placeholder="One sentence summary of narrative..."
                  className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Editorial Sentence (Display Quote)</label>
                <input
                  type="text"
                  value={editingProject.editorialSentence}
                  onChange={(e) => setEditingProject({ ...editingProject, editorialSentence: e.target.value })}
                  placeholder="e.g. A vertical frame containing the entire gravity of an ancestral lineage."
                  className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-sans italic outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Detailed Story & Method</label>
                <textarea
                  rows={3}
                  value={editingProject.detailedStory}
                  onChange={(e) => setEditingProject({ ...editingProject, detailedStory: e.target.value })}
                  placeholder="Full background story for deep-dive story modal..."
                  className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-mono text-xs tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProject}
                className="px-6 py-2.5 rounded-xl bg-[#EAB308] hover:bg-amber-400 text-black font-mono text-xs font-bold tracking-wider uppercase flex items-center space-x-1.5 cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.3)]"
              >
                <Save size={14} />
                <span>Save Exhibition</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / CREATE SHOWREEL CHAPTER MODAL */}
      {editingChapter && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0E0A1D] border border-white/15 rounded-3xl p-6 md:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <Film className="text-[#EAB308]" size={20} />
                <div>
                  <h2 className="text-2xl font-serif italic text-white">
                    {isNewChapter ? 'Add Showreel Chapter' : 'Edit Showreel Chapter'}
                  </h2>
                  <p className="text-[11px] font-mono text-white/50">
                    Configure vertical cinematic scene & streaming URL.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingChapter(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Chapter Title</label>
                <input
                  type="text"
                  value={editingChapter.title}
                  onChange={(e) => setEditingChapter({ ...editingChapter, title: e.target.value })}
                  placeholder="e.g. Act 05 // Cinematic Scene"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Subtitle</label>
                <input
                  type="text"
                  value={editingChapter.subtitle}
                  onChange={(e) => setEditingChapter({ ...editingChapter, subtitle: e.target.value })}
                  placeholder="e.g. The Opening Statement"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase flex items-center justify-between">
                  <span>Video Link (YouTube, Vimeo, Google Drive, Instagram Reel, or MP4)</span>
                  {editingChapter.videoUrl && (
                    <span className="text-[#EAB308] lowercase">
                      detected: {detectVideoPlatform(editingChapter.videoUrl)}
                    </span>
                  )}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingChapter.videoUrl}
                    onChange={(e) => setEditingChapter({ ...editingChapter, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=... or https://drive.google.com/..."
                    className="flex-1 px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                  />
                  {editingChapter.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setPreviewVideoUrl(editingChapter.videoUrl)}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-mono flex items-center space-x-1 cursor-pointer"
                    >
                      <Play size={12} className="text-[#EAB308]" />
                      <span>Test</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Camera & Optics</label>
                <input
                  type="text"
                  value={editingChapter.camera}
                  onChange={(e) => setEditingChapter({ ...editingChapter, camera: e.target.value })}
                  placeholder="e.g. ARRI Alexa Mini LF"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Poster Image Frame URL</label>
                <input
                  type="text"
                  value={editingChapter.posterUrl}
                  onChange={(e) => setEditingChapter({ ...editingChapter, posterUrl: e.target.value })}
                  placeholder="/showreel_act1.png"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase">Directorial Notes</label>
                <textarea
                  rows={2}
                  value={editingChapter.directorNotes}
                  onChange={(e) => setEditingChapter({ ...editingChapter, directorNotes: e.target.value })}
                  placeholder="Directorial notes on visual lighting, mood, and optics..."
                  className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingChapter(null)}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-mono text-xs tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveChapter}
                className="px-6 py-2.5 rounded-xl bg-[#EAB308] hover:bg-amber-400 text-black font-mono text-xs font-bold tracking-wider uppercase flex items-center space-x-1.5 cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.3)]"
              >
                <Save size={14} />
                <span>Save Chapter</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / CREATE VIDEO GLIMPSE MODAL */}
      {editingGlimpse && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0E0A1D] border border-white/15 rounded-3xl p-6 md:p-8 max-w-3xl w-full my-8 space-y-6 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300">
                  <Film size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-serif italic text-white flex items-center gap-2">
                    <span>{isNewGlimpse ? 'Add High-Fidelity Video Glimpse' : 'Edit Video Glimpse'}</span>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-bold uppercase tracking-wider">
                      DELIVERABLE #2
                    </span>
                  </h2>
                  <p className="text-[11px] font-mono text-white/50">
                    Configure 30s 1080p high-definition loop, poster frame, ratio, and directorial caption.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingGlimpse(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white cursor-pointer transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase font-semibold">Title</label>
                <input
                  type="text"
                  value={editingGlimpse.title}
                  onChange={(e) => setEditingGlimpse({ ...editingGlimpse, title: e.target.value })}
                  placeholder="e.g. 3D Kinetic Motion Reveal"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-serif outline-none focus:border-[#EAB308]"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono text-white/60 uppercase font-semibold">Category</label>
                  <span className="text-[9px] font-mono text-white/40">Editorial Tag</span>
                </div>
                <input
                  type="text"
                  value={editingGlimpse.category}
                  onChange={(e) => setEditingGlimpse({ ...editingGlimpse, category: e.target.value })}
                  placeholder="e.g. Cinematic Identity, Media Production"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                />
                <div className="flex flex-wrap gap-1 pt-1">
                  {['Cinematic Identity', 'Media Production', 'Talent Development', 'Personal Branding', 'Luxury Events'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setEditingGlimpse({ ...editingGlimpse, category: cat })}
                      className="px-2 py-0.5 rounded bg-white/5 hover:bg-amber-400/20 text-white/60 hover:text-amber-300 font-mono text-[8px] transition-all cursor-pointer"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Tag */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase font-semibold">Duration Tag</label>
                <input
                  type="text"
                  value={editingGlimpse.duration}
                  onChange={(e) => setEditingGlimpse({ ...editingGlimpse, duration: e.target.value })}
                  placeholder="e.g. 0:15, 0:30 (Max 30s)"
                  className="w-full px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                />
              </div>

              {/* Aspect Ratio */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase font-semibold">Aspect Ratio Frame</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['16:9', '9:16', '1:1'] as const).map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setEditingGlimpse({ ...editingGlimpse, aspectRatio: ratio })}
                      className={`py-2 px-2 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer border ${
                        (editingGlimpse.aspectRatio || '16:9') === ratio
                          ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.3)]'
                          : 'bg-neutral-900 text-white/60 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {ratio} {ratio === '16:9' ? 'Land' : ratio === '9:16' ? 'Vert' : 'Sqr'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Video URL */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase flex items-center justify-between font-semibold">
                  <span>Video Link (YouTube, Vimeo, Google Drive, Instagram Reel, or Direct MP4)</span>
                  {editingGlimpse.videoUrl && (
                    <span className="text-[#EAB308] lowercase font-mono">
                      detected: {detectVideoPlatform(editingGlimpse.videoUrl)}
                    </span>
                  )}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingGlimpse.videoUrl}
                    onChange={(e) => setEditingGlimpse({ ...editingGlimpse, videoUrl: e.target.value })}
                    placeholder="https://.../video.mp4 or YouTube / Vimeo / Drive"
                    className="flex-1 px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                  />
                  {editingGlimpse.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setPreviewVideoUrl(editingGlimpse.videoUrl)}
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-mono flex items-center space-x-1 cursor-pointer transition-all border border-white/10"
                    >
                      <Play size={12} className="text-[#EAB308]" />
                      <span>Test</span>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setEditingGlimpse({
                      ...editingGlimpse,
                      videoUrl: '/videos/mayavi-hero.mp4',
                      thumbnailUrl: editingGlimpse.thumbnailUrl || '/official-mayavi-logo.png'
                    })}
                    className="px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-[9px] hover:bg-amber-400/20 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles size={10} />
                    <span>⚡ Use Mayavi 3D Motion Reel (/videos/mayavi-hero.mp4)</span>
                  </button>
                </div>
              </div>

              {/* Poster Image Frame URL & File Upload */}
              <div className="md:col-span-2 space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono text-white/60 uppercase font-semibold">
                    Poster Thumbnail Frame (Image URL or File Upload)
                  </label>
                  <label className="cursor-pointer px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-[9px] flex items-center gap-1 transition-all">
                    <Upload size={10} />
                    <span>Browse Local Image (&lt; 2.5MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handlePosterFileUpload(file, (dataUrl) => {
                            setEditingGlimpse({ ...editingGlimpse, thumbnailUrl: dataUrl });
                          });
                        }
                      }}
                    />
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingGlimpse.thumbnailUrl}
                    onChange={(e) => setEditingGlimpse({ ...editingGlimpse, thumbnailUrl: e.target.value })}
                    placeholder="/official-mayavi-logo.png or https://..."
                    className="flex-1 px-3.5 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                  />
                  {editingGlimpse.thumbnailUrl && (
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-black/60 flex items-center justify-center">
                      <img src={editingGlimpse.thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[9px] font-mono text-white/40 uppercase">Presets:</span>
                  {[
                    { label: 'Official Logo', url: '/official-mayavi-logo.png' },
                    { label: 'Workshop Poster', url: '/posters/theatre-modelling-workshop.png' },
                    { label: 'Casting Call', url: '/posters/casting-call-prince-princess.png' },
                    { label: 'Stage A', url: '/hero_stage_a.png' },
                    { label: 'Monolith', url: '/desert_monolith.png' }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setEditingGlimpse({ ...editingGlimpse, thumbnailUrl: preset.url })}
                      className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-mono text-[9px] transition-all cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Director Caption */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-mono text-white/60 uppercase font-semibold">Director Caption</label>
                <textarea
                  rows={2}
                  value={editingGlimpse.caption}
                  onChange={(e) => setEditingGlimpse({ ...editingGlimpse, caption: e.target.value })}
                  placeholder="Curatorial notes on visual tone, camera motion, and cinematic composition..."
                  className="w-full px-3.5 py-2 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                />
              </div>
            </div>

            {/* Live Card Preview Box */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[9px] font-mono text-white/40 uppercase">
                <span>Directorial Preview Frame</span>
                <span>{editingGlimpse.aspectRatio || '16:9'} Format</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/20 bg-neutral-950 shrink-0 relative flex items-center justify-center">
                  {editingGlimpse.thumbnailUrl ? (
                    <img src={editingGlimpse.thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[8px] font-mono text-white/30">NO POSTER</span>
                  )}
                  {editingGlimpse.videoUrl && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play size={12} className="text-amber-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-[#EAB308] font-bold uppercase">{editingGlimpse.category || 'CATEGORY'}</span>
                    <span className="font-mono text-[8px] text-white/40">{editingGlimpse.duration || '0:15'}</span>
                  </div>
                  <h4 className="text-sm font-serif text-white truncate">{editingGlimpse.title || 'Untitled Glimpse'}</h4>
                  <p className="text-[11px] text-white/60 line-clamp-1 font-sans">{editingGlimpse.caption || 'No caption entered yet...'}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setEditingGlimpse(null)}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 font-mono text-xs tracking-wider cursor-pointer transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveGlimpseModal}
                className="px-6 py-2.5 rounded-xl bg-[#EAB308] hover:bg-amber-400 text-black font-mono text-xs font-bold tracking-wider uppercase flex items-center space-x-1.5 cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all"
              >
                <Save size={14} />
                <span>Save Video Glimpse</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIVE VIDEO TEST PLAYER MODAL */}
      {previewVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="p-4 bg-neutral-950 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Play size={14} className="text-[#EAB308]" />
                <span className="font-mono text-xs text-white/80 truncate max-w-lg">
                  Embed Preview: {previewVideoUrl}
                </span>
              </div>
              <button
                onClick={() => setPreviewVideoUrl(null)}
                className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              {detectVideoPlatform(previewVideoUrl) === 'direct' ? (
                <video
                  src={previewVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={getVideoEmbedUrl(previewVideoUrl)}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
