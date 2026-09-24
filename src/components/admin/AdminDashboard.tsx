import React, { useState } from 'react';
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
  Check
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

interface AdminDashboardProps {
  onExit: () => void;
}

export default function AdminDashboard({ onExit }: AdminDashboardProps) {
  const { cms, updateCMS, resetCMS } = useCMS();
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

  // Save Feedback & Dynamic UI States
  const [savedActId, setSavedActId] = useState<string | null>(null);
  const [globalSaved, setGlobalSaved] = useState<boolean>(false);
  const [savedSection, setSavedSection] = useState<string | null>(null);

  // Password Change State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
    showToast(`Saved Video Glimpse 0${idx + 1}: "${title}" live!`);
    setTimeout(() => setSavedSection(null), 2500);
  };

  const handleSaveAllGlimpses = () => {
    saveCMSData(cms);
    setSavedSection('all-glimpses');
    showToast('Saved all 5 Video Glimpses live!');
    setTimeout(() => setSavedSection(null), 2500);
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
    <div className="min-h-screen bg-[#07050C] text-white flex flex-col font-sans selection:bg-[#EAB308] selection:text-black">
      
      {/* TOAST BANNER */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-2 px-5 py-3 rounded-2xl bg-amber-400 text-black font-mono text-xs font-bold shadow-[0_10px_35px_rgba(234,179,8,0.4)] animate-bounce">
          <CheckCircle size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP DIRECTORIAL HEADER */}
      <header className="sticky top-0 z-40 bg-[#0B0814]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-[#EAB308]/15 border border-[#EAB308]/30 flex items-center justify-center text-[#EAB308] shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif italic text-lg text-white font-normal">Mayavi Executive CMS</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[8px] tracking-widest uppercase">
                SINGLE-USER SECURE
              </span>
            </div>
            <p className="font-mono text-[9px] text-white/40 tracking-wider">
              PORT 3000 // ARRI CALIBRATED LIVE REPOSITORY
            </p>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            type="button"
            onClick={handleSaveAllCMS}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-md ${
              globalSaved
                ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                : 'bg-[#EAB308] hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.25)]'
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
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-mono tracking-wider transition-all cursor-pointer"
          >
            <ExternalLink size={13} />
            <span>View Live Site</span>
          </button>

          <button
            onClick={handleExportJSON}
            title="Download JSON Backup"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-[#EAB308] text-xs font-mono tracking-wider transition-all cursor-pointer"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Export Backup</span>
          </button>

          <label
            title="Restore from JSON"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-mono tracking-wider transition-all cursor-pointer"
          >
            <Upload size={13} />
            <span className="hidden sm:inline">Import JSON</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/50 border border-red-500/30 text-red-300 text-xs font-mono tracking-wider transition-all cursor-pointer"
          >
            <LogOut size={13} />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {/* DASHBOARD BODY CONTAINER */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* LEFT TABBED NAVIGATION */}
        <aside className="w-full md:w-64 bg-[#090712] border-r border-white/5 p-4 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible shrink-0">
          <div className="hidden md:block px-3 py-2 font-mono text-[8px] text-white/30 tracking-[0.25em] uppercase">
            DIRECTORIAL SECTIONS
          </div>

          {[
            { id: 'overview', label: 'Overview & Telemetry', icon: LayoutDashboard },
            { id: 'hero-glimpses', label: 'Hero Video & Glimpses', icon: Video, badge: '5 Loops' },
            { id: 'showreel', label: 'Showreel Player', icon: Film, badge: `${cms.showreel.chapters.length}` },
            { id: 'portfolio', label: 'Curated Exhibitions', icon: FolderKanban, badge: `${cms.curatedExhibitions.length}` },
            { id: 'services-about', label: 'Core Services & Story', icon: FileText },
            { id: 'integrations', label: 'Sheets & WhatsApp', icon: Sheet, badge: `${cms.inquiries.length}` },
            { id: 'security', label: 'Security & Backup', icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-xs font-mono tracking-wider transition-all cursor-pointer whitespace-nowrap md:whitespace-normal ${
                  isActive
                    ? 'bg-[#EAB308]/15 text-[#EAB308] border border-[#EAB308]/40 font-bold shadow-[0_0_15px_rgba(234,179,8,0.1)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span
                    className={`ml-2 px-1.5 py-0.5 rounded text-[8px] font-bold ${
                      isActive ? 'bg-[#EAB308] text-black' : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="mt-auto hidden md:block pt-6 border-t border-white/5 px-2">
            <div className="p-3 rounded-xl bg-amber-400/5 border border-amber-400/10 space-y-1">
              <span className="font-mono text-[8px] text-[#EAB308] font-bold tracking-widest uppercase block">
                NO CODING REQUIRED
              </span>
              <p className="text-[10px] text-white/40 leading-relaxed font-sans">
                All changes save directly to the browser and update the live site instantly without rebuild.
              </p>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#EAB308] uppercase font-bold">
                  DASHBOARD OVERVIEW
                </span>
                <h1 className="text-3xl font-light font-serif italic text-white mt-1">
                  Control Room & Media Telemetry
                </h1>
                <p className="text-white/50 text-xs font-sans mt-1">
                  Manage all video links, hero video playback, curated exhibitions, and page content without touching code.
                </p>
              </div>

              {/* Status Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#0F0B1E] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-white/40">
                    <span className="font-mono text-[9px] tracking-widest uppercase">Hero Background</span>
                    <Video size={16} className="text-[#EAB308]" />
                  </div>
                  <p className="text-2xl font-serif italic text-white font-light">
                    {cms.hero.useVideoBackground ? 'Video Loop Active' : 'Lens Sequence'}
                  </p>
                  <p className="text-[10px] font-mono text-white/40 truncate">
                    {cms.hero.backgroundVideoUrl}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0F0B1E] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-white/40">
                    <span className="font-mono text-[9px] tracking-widest uppercase">Video Glimpses</span>
                    <Film size={16} className="text-amber-400" />
                  </div>
                  <p className="text-2xl font-serif italic text-white font-light">
                    {cms.videoGlimpses.length} Loops Configured
                  </p>
                  <p className="text-[10px] font-mono text-emerald-400">
                    ● Deliverable #2 Active (1080p)
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0F0B1E] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-white/40">
                    <span className="font-mono text-[9px] tracking-widest uppercase">Curated Exhibitions</span>
                    <FolderKanban size={16} className="text-purple-400" />
                  </div>
                  <p className="text-2xl font-serif italic text-white font-light">
                    {cms.curatedExhibitions.length} Hybrid Links
                  </p>
                  <p className="text-[10px] font-mono text-purple-400">
                    Supports 50-100 Video Embeds
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0F0B1E] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-white/40">
                    <span className="font-mono text-[9px] tracking-widest uppercase">Client Inquiries</span>
                    <Sheet size={16} className="text-emerald-400" />
                  </div>
                  <p className="text-2xl font-serif italic text-white font-light">
                    {cms.inquiries.length} Recorded
                  </p>
                  <p className="text-[10px] font-mono text-emerald-400">
                    Google Sheets & WhatsApp Ready
                  </p>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="p-6 rounded-2xl bg-[#0D091B] border border-white/10 space-y-4">
                <span className="font-mono text-[9px] tracking-[0.25em] text-[#EAB308] uppercase font-bold">
                  DIRECTOR QUICK ACTIONS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
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
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left space-y-1 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2 text-[#EAB308]">
                      <Plus size={16} />
                      <span className="font-mono text-xs font-bold uppercase">Add New Exhibition</span>
                    </div>
                    <p className="text-[11px] text-white/50">Add a new YouTube, Vimeo, Instagram, or Drive video link.</p>
                  </button>

                  <button
                    onClick={handleSeedExhibitions}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left space-y-1 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2 text-purple-400">
                      <Sparkles size={16} />
                      <span className="font-mono text-xs font-bold uppercase">Seed 50-100 Demo Links</span>
                    </div>
                    <p className="text-[11px] text-white/50">Instantly populate multi-platform video links for client testing.</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('hero-glimpses')}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left space-y-1 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2 text-amber-400">
                      <Video size={16} />
                      <span className="font-mono text-xs font-bold uppercase">Configure Hero Video</span>
                    </div>
                    <p className="text-[11px] text-white/50">Update 30s 1080p background loop and headline copy.</p>
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
                        <tr key={inq.id} className="hover:bg-white/[0.02]">
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
              <div>
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#EAB308] uppercase font-bold">
                  DELIVERABLES #1 & #2
                </span>
                <h1 className="text-3xl font-light font-serif italic text-white mt-1">
                  Hero Background Video & Video Glimpses
                </h1>
                <p className="text-white/50 text-xs font-sans mt-1">
                  Configure the 30-second 1080p hero loop, headlines, and the 5 embedded video glimpses.
                </p>
              </div>

              {/* HERO SECTION CONFIG */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D091B] border border-white/10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-3">
                    <Video className="text-[#EAB308]" size={20} />
                    <h2 className="text-xl font-serif italic text-white">Hero Background Video</h2>
                  </div>
                  
                  {/* Video Background Toggle */}
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <span className="font-mono text-xs text-white/70">
                      {cms.hero.useVideoBackground ? 'Video Loop Mode' : 'Lens Sequence Mode'}
                    </span>
                    <input
                      type="checkbox"
                      checked={cms.hero.useVideoBackground}
                      onChange={(e) => {
                        updateCMS((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, useVideoBackground: e.target.checked }
                        }));
                        showToast(`Hero display switched to ${e.target.checked ? 'Video Loop' : 'Lens Sequence'}`);
                      }}
                      className="w-5 h-5 accent-[#EAB308] cursor-pointer"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-left">
                    <label className="block text-[10px] font-mono tracking-wider text-white/60 uppercase">
                      Hero Video URL (30s 1080p Loop, Compressed/Uncompressed, MP4, WebM, Drive, or YouTube)
                    </label>
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
                        placeholder="https://.../video.mp4 or YouTube / Vimeo"
                        className="flex-1 px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                      />
                      {cms.hero.backgroundVideoUrl && (
                        <button
                          type="button"
                          onClick={() => setPreviewVideoUrl(cms.hero.backgroundVideoUrl)}
                          className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-mono flex items-center space-x-1 cursor-pointer"
                        >
                          <Play size={12} />
                          <span>Preview</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-white/40">
                      Supports direct .mp4 video files, Google Drive links, Vimeo, and YouTube embeds.
                    </p>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="block text-[10px] font-mono tracking-wider text-white/60 uppercase">
                      Poster Image Fallback URL
                    </label>
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
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2 text-left">
                    <label className="block text-[10px] font-mono tracking-wider text-white/60 uppercase">
                      Hero Primary Headline
                    </label>
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

                  <div className="md:col-span-2 space-y-2 text-left">
                    <label className="block text-[10px] font-mono tracking-wider text-white/60 uppercase">
                      Hero Subheadline / Architectural Philosophy
                    </label>
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

                  <div className="space-y-2 text-left">
                    <label className="block text-[10px] font-mono tracking-wider text-white/60 uppercase">
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
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="block text-[10px] font-mono tracking-wider text-white/60 uppercase">
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
                  </div>
                </div>

                {/* HERO SAVE BUTTON */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-white/50">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Mode: <strong className="text-white">{cms.hero.useVideoBackground ? 'Video Loop' : 'Lens Scroll'}</strong></span>
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

              {/* 5 VIDEO GLIMPSES CONFIG */}
              <div className="p-6 md:p-8 rounded-3xl bg-[#0D091B] border border-white/10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-3">
                    <Film className="text-[#EAB308]" size={20} />
                    <div>
                      <h2 className="text-xl font-serif italic text-white">5 High-Fidelity Video Glimpses</h2>
                      <p className="text-xs text-white/40 font-mono">Deliverable #2 // Max 30s 1080p loops with lazy loading</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveAllGlimpses}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-[#EAB308] hover:text-black text-white font-mono text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-all"
                  >
                    <Save size={13} />
                    <span>SAVE ALL GLIMPSES</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {cms.videoGlimpses.map((glimpse, index) => (
                    <div
                      key={glimpse.id}
                      className="p-5 rounded-2xl bg-neutral-900/60 border border-white/5 space-y-4 hover:border-white/15 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-[#EAB308] font-bold">
                          GLIMPSE 0{index + 1}
                        </span>
                        <div className="flex items-center space-x-2">
                          {glimpse.videoUrl && (
                            <button
                              type="button"
                              onClick={() => setPreviewVideoUrl(glimpse.videoUrl)}
                              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-mono text-[9px] flex items-center space-x-1 cursor-pointer"
                            >
                              <Play size={10} />
                              <span>Test Loop</span>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase">Title</label>
                          <input
                            type="text"
                            value={glimpse.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.videoGlimpses];
                                next[index] = { ...next[index], title: val };
                                return { ...prev, videoGlimpses: next };
                              });
                            }}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                          />
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase">Category</label>
                          <input
                            type="text"
                            value={glimpse.category}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.videoGlimpses];
                                next[index] = { ...next[index], category: val };
                                return { ...prev, videoGlimpses: next };
                              });
                            }}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                          />
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase">Duration Tag</label>
                          <input
                            type="text"
                            value={glimpse.duration}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.videoGlimpses];
                                next[index] = { ...next[index], duration: val };
                                return { ...prev, videoGlimpses: next };
                              });
                            }}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                          />
                        </div>

                        <div className="md:col-span-2 space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase">Video URL (1080p Loop Link)</label>
                          <input
                            type="text"
                            value={glimpse.videoUrl}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.videoGlimpses];
                                next[index] = { ...next[index], videoUrl: val };
                                return { ...prev, videoGlimpses: next };
                              });
                            }}
                            placeholder="Direct MP4, Drive preview, YouTube, or Vimeo..."
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                          />
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase">Thumbnail Poster URL</label>
                          <input
                            type="text"
                            value={glimpse.thumbnailUrl}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.videoGlimpses];
                                next[index] = { ...next[index], thumbnailUrl: val };
                                return { ...prev, videoGlimpses: next };
                              });
                            }}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-mono outline-none focus:border-[#EAB308]"
                          />
                        </div>

                        <div className="md:col-span-3 space-y-1 text-left">
                          <label className="text-[9px] font-mono text-white/50 uppercase">Director Caption</label>
                          <input
                            type="text"
                            value={glimpse.caption}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCMS((prev) => {
                                const next = [...prev.videoGlimpses];
                                next[index] = { ...next[index], caption: val };
                                return { ...prev, videoGlimpses: next };
                              });
                            }}
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-lg text-white text-xs font-sans outline-none focus:border-[#EAB308]"
                          />
                        </div>
                      </div>

                      {/* INDIVIDUAL GLIMPSE SAVE BUTTON */}
                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="font-mono text-[9px] text-white/40">1080p Cine Loop // 30s Max</span>
                        <button
                          type="button"
                          onClick={() => handleSaveGlimpse(index, glimpse.title)}
                          className={`px-4 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase flex items-center space-x-1 cursor-pointer transition-all ${
                            savedSection === `glimpse-${index}`
                              ? 'bg-emerald-500 text-black'
                              : 'bg-white/10 hover:bg-[#EAB308] hover:text-black text-white'
                          }`}
                        >
                          {savedSection === `glimpse-${index}` ? <Check size={11} /> : <Save size={11} />}
                          <span>{savedSection === `glimpse-${index}` ? 'SAVED ✓' : `SAVE GLIMPSE 0${index + 1}`}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* BOTTOM ALL GLIMPSES SAVE BAR */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-end">
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
                    <span>SAVE ALL 5 GLIMPSES</span>
                  </button>
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

                        <div className="flex items-center space-x-2">
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
                    onClick={handleSeedExhibitions}
                    className="px-3.5 py-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 font-mono text-xs flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Sparkles size={13} />
                    <span>Seed Demo Links</span>
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
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[#EAB308] uppercase font-bold">
                    INQUIRIES STORED IN BROWSER DATABASE ({cms.inquiries.length})
                  </span>
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
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {cms.inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-white/[0.02]">
                          <td className="py-3 text-white/40 whitespace-nowrap">{inq.date}</td>
                          <td className="py-3 text-white font-sans font-medium whitespace-nowrap">{inq.name}</td>
                          <td className="py-3 text-white/70 text-[11px]">
                            <div>{inq.email}</div>
                            <div className="text-white/40">{inq.phone}</div>
                          </td>
                          <td className="py-3 text-[#EAB308] whitespace-nowrap">{inq.category}</td>
                          <td className="py-3 text-white/70 whitespace-nowrap">{inq.budget}</td>
                          <td className="py-3 text-white/60 font-sans text-xs max-w-xs truncate">{inq.message}</td>
                          <td className="py-3 whitespace-nowrap">
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
                  Update the master single-user passcode, export complete JSON database backups, or reset defaults.
                </p>
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
