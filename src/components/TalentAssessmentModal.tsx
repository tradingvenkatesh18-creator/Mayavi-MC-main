import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ArrowRight, 
  Printer, 
  RotateCcw,
  Sparkles,
  Layers,
  FileText,
  UserCheck,
  Film,
  Compass,
  CheckCircle2,
  Info
} from 'lucide-react';
import PrintableDossier from './PrintableDossier';

interface TalentAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuestionOption {
  letter: string;
  title: string;
  desc: string;
  directorCritique: string;
  actingMethod: string;
  scores: {
    improv: number;
    camera: number;
    emotion: number;
    imag: number;
  };
}

interface SceneData {
  actNum: number;
  actName: string;
  actHeader: string;
  eyebrow: string;
  headlinePrefix: string;
  headlineHighlight: string;
  scriptQuote: string;
  directorInsight: string;
  tags: string[];
  options: QuestionOption[];
}

const SCENES: SceneData[] = [
  // SECTION 1: PERSONALITY DISCOVERY
  {
    actNum: 1,
    actName: "PERSONALITY",
    actHeader: "SECTION 01 // SCENE 1 - PERSONALITY DISCOVERY",
    eyebrow: "// SPONTANEITY UNDER PRESSURE",
    headlinePrefix: "A director suddenly changes your scene.",
    headlineHighlight: "You...",
    scriptQuote: "“You are standing on mark under full studio lighting. The director walks up and alters your entire character intention. Your immediate instinct is to...”",
    directorInsight: "Directors test how you handle sudden cognitive disruption. In 9:16 vertical cinema, hesitations are magnified 3x. We evaluate whether you freeze, over-analyze, or organically pivot inside the frame.",
    tags: ["SPONTANEITY", "DIRECTOR DYNAMIC", "IMPULSE"],
    options: [
      { 
        letter: "A", 
        title: "Improvise confidently", 
        desc: "You embrace the sudden shift and trust your immediate impulse in the frame.",
        directorCritique: "Demonstrates high somatic bravery and zero hesitation. Directors love this because it saves expensive production time and creates electric authentic takes.",
        actingMethod: "Meisner Intuitive Reflex",
        scores: { improv: 25, camera: 15, emotion: 15, imag: 15 } 
      },
      { 
        letter: "B", 
        title: "Ask for clarification", 
        desc: "You calibrate beats, motivation, and intention before committing to camera.",
        directorCritique: "Signals an architect actor who values script geometry, character motivation, and narrative clarity over reckless chaos.",
        actingMethod: "Stanislavski Action Analysis",
        scores: { improv: 10, camera: 15, emotion: 20, imag: 15 } 
      },
      { 
        letter: "C", 
        title: "Observe others first", 
        desc: "You gauge the room's energy and synchronize with fellow cast members.",
        directorCritique: "Shows an ensemble-first player who reads spatial cues, listens deeply, and protects group chemistry under pressure.",
        actingMethod: "Viewpoints Spatial Grid",
        scores: { improv: 15, camera: 15, emotion: 15, imag: 20 } 
      },
      { 
        letter: "D", 
        title: "Feel nervous", 
        desc: "You acknowledge the internal adrenaline rush and ground your physiological breath.",
        directorCritique: "Deep physiological self-awareness. Recognizing nervous tension allows you to channel it into raw, vulnerable character truth rather than artificial bravado.",
        actingMethod: "Somatic Breath Realism",
        scores: { improv: 10, camera: 10, emotion: 25, imag: 10 } 
      }
    ]
  },
  {
    actNum: 1,
    actName: "PERSONALITY",
    actHeader: "SECTION 01 // SCENE 2 - SOCIAL ENERGY & OBSERVATION",
    eyebrow: "// SOCIAL GRAVITATIONAL FIELD",
    headlinePrefix: "At a party...",
    headlineHighlight: "You usually",
    scriptQuote: "“The room is crowded with filmmakers, producers, and actors. Glass clinking and ambient chatter surround you. Where is your gravity?”",
    directorInsight: "We assess your involuntary status projection and social observation habits. An actor's off-screen observation instincts directly feed their on-screen nuance.",
    tags: ["SOCIAL GRAVITY", "CHARACTER STUDY", "PRESENCE"],
    options: [
      { 
        letter: "A", 
        title: "Become the entertainer", 
        desc: "You project charisma, hold court, and lift the room's energy effortlessly.",
        directorCritique: "High screen presence and acoustic projection. Natural magnetic lead energy that translates effortlessly to commercial and high-octane cinema.",
        actingMethod: "Extroverted Magnetism",
        scores: { improv: 25, camera: 25, emotion: 10, imag: 15 } 
      },
      { 
        letter: "B", 
        title: "Observe everyone", 
        desc: "Quietly studying body language, eye contact, and behavioral micro-tensions.",
        directorCritique: "The classic behavioral sponge. You catalog authentic human ticks and vulnerabilities that elevate prestige drama roles.",
        actingMethod: "Behavioral Dissection",
        scores: { improv: 10, camera: 15, emotion: 20, imag: 25 } 
      },
      { 
        letter: "C", 
        title: "Connect deeply with one person", 
        desc: "You trade shallow cocktail banter for authentic emotional substance.",
        directorCritique: "Intense emotional conductivity. You create microscopic chemistry in two-character close-ups with minimal dialogue.",
        actingMethod: "Intimate Resonance",
        scores: { improv: 15, camera: 15, emotion: 25, imag: 15 } 
      },
      { 
        letter: "D", 
        title: "Stay quiet", 
        desc: "Preserving your artistic reservoir and enigmatic internal presence.",
        directorCritique: "Enigmatic stillness. The camera is naturally magnetized to still characters because it forces the viewer to lean in.",
        actingMethod: "Subtext Stillness",
        scores: { improv: 10, camera: 10, emotion: 20, imag: 20 } 
      }
    ]
  },
  {
    actNum: 1,
    actName: "PERSONALITY",
    actHeader: "SECTION 01 // SCENE 3 - CORE MOTIVATION",
    eyebrow: "// PRIMAL CREATIVE FUEL",
    headlinePrefix: "Your biggest motivation is",
    headlineHighlight: "what drives your craft?",
    scriptQuote: "“When the soundstage goes dark and the monitors turn off, what single reward makes the grueling rehearsals worthwhile?”",
    directorInsight: "Your artistic motivation determines how you respond to harsh directorial notes and 14-hour set days. Directors align roles with actors whose fuel matches the project's scale.",
    tags: ["CORE PURPOSE", "AMBITION", "ARTISTIC VOICE"],
    options: [
      { 
        letter: "A", 
        title: "Fame", 
        desc: "Leaving an unforgettable iconographic imprint across the global cultural landscape.",
        directorCritique: "High star-power ambition. You seek the cultural spotlight, making you fearless in large promotional campaigns and blockbuster cinema.",
        actingMethod: "Iconographic Ambition",
        scores: { improv: 20, camera: 25, emotion: 10, imag: 10 } 
      },
      { 
        letter: "B", 
        title: "Storytelling", 
        desc: "Serving the truth of the narrative and transforming human hearts through catharsis.",
        directorCritique: "Pure narrative humility. You will sacrifice personal glamour to portray raw, uncomfortable human truths.",
        actingMethod: "Cathartic Storytelling",
        scores: { improv: 15, camera: 15, emotion: 25, imag: 25 } 
      },
      { 
        letter: "C", 
        title: "Money", 
        desc: "Building generational security, high-value industry leverage, and executive independence.",
        directorCritique: "Pragmatic professional discipline. You view acting as elite craftsmanship and treat production schedules and budgets with high respect.",
        actingMethod: "Strategic Craftsmanship",
        scores: { improv: 15, camera: 15, emotion: 10, imag: 15 } 
      },
      { 
        letter: "D", 
        title: "Recognition", 
        desc: "Earning the reverence and critical acclaim of master filmmakers and fellow auteurs.",
        directorCritique: "Auteur alignment. You are driven by artistic excellence, making you a dream collaborator for visionary festival directors.",
        actingMethod: "Mastercraft Pursuit",
        scores: { improv: 15, camera: 20, emotion: 20, imag: 20 } 
      }
    ]
  },
  {
    actNum: 1,
    actName: "PERSONALITY",
    actHeader: "SECTION 01 // SCENE 4 - GENRE PREFERENCE",
    eyebrow: "// RHYTHMIC TONE ALIGNMENT",
    headlinePrefix: "You enjoy",
    headlineHighlight: "which genre most?",
    scriptQuote: "“Every performer's nervous system beats to a distinct frequency. Which world calls your name?”",
    directorInsight: "Genre selection reveals your nervous system's native rhythm. Comedy requires microsecond tempo; drama requires sitting in silence; action requires physical spatial dominance.",
    tags: ["GENRE AFFINITY", "TEMPO", "EXPRESSION"],
    options: [
      { 
        letter: "A", 
        title: "Comedy", 
        desc: "Precision timing, witty subversion, and instantaneous rhythmic play.",
        directorCritique: "Mathematical timing mastery. You understand how tiny vocal inflections and eyebrow lifts puncture dramatic tension.",
        actingMethod: "Subversive Timing",
        scores: { improv: 25, camera: 20, emotion: 15, imag: 15 } 
      },
      { 
        letter: "B", 
        title: "Drama", 
        desc: "Psychological depth, moral nuance, and poignant dramatic silence.",
        directorCritique: "Comfort with moral ambiguity. You possess the emotional stamina needed for high-stakes festival cinema and auteur character studies.",
        actingMethod: "Psychological Realism",
        scores: { improv: 10, camera: 15, emotion: 25, imag: 20 } 
      },
      { 
        letter: "C", 
        title: "Action", 
        desc: "Kinetic velocity, physical stunts, and explosive narrative momentum.",
        directorCritique: "Dynamic spatial dominance. You understand how camera parallax and physical acceleration amplify heroic tension.",
        actingMethod: "Kinetic Physicality",
        scores: { improv: 20, camera: 25, emotion: 10, imag: 15 } 
      },
      { 
        letter: "D", 
        title: "Romance", 
        desc: "Chemistry, subtle glances, and electric vulnerability across the frame.",
        directorCritique: "Intimate emotional calibration. You excel in intense close-ups where romantic chemistry is communicated entirely through subtle glances and unspoken thoughts.",
        actingMethod: "Screen Intimacy",
        scores: { improv: 15, camera: 15, emotion: 25, imag: 20 } 
      }
    ]
  },

  // SECTION 2: EMOTIONAL INTELLIGENCE
  {
    actNum: 2,
    actName: "EMOTIONAL INT.",
    actHeader: "SECTION 02 // SCENE 5 - ENSEMBLE CRISIS RESPONSE",
    eyebrow: "// SCREEN EMPATHY & CRISIS REFLEX",
    headlinePrefix: "A fellow actor forgets their dialogue during a performance.",
    headlineHighlight: "What do you do?",
    scriptQuote: "“The camera is circling you both in minute four of an intense master shot. Dead silence falls as your partner blanks. What do you do?”",
    directorInsight: "This evaluates your ensemble generosity vs self-preservation. Great actors protect the scene, not just their own ego.",
    tags: ["ENSEMBLE AGILITY", "GENEROSITY", "CRISIS REFLEX"],
    options: [
      { 
        letter: "A", 
        title: "Help them naturally", 
        desc: "Feed them an intuitive line or subtextual bridge while staying fully in character.",
        directorCritique: "The director's holy grail. You save thousands in re-lighting and camera resets while making your scene partner look brilliant.",
        actingMethod: "Ensemble Armor",
        scores: { improv: 25, camera: 20, emotion: 25, imag: 20 } 
      },
      { 
        letter: "B", 
        title: "Continue your role", 
        desc: "Hold your pause with intentional, pregnant silence, buying them time inside the fiction.",
        directorCritique: "Cinematic composure. You use the silence as a dramatic weapon, transforming a memory lapse into gripping subtext.",
        actingMethod: "Patience Suspension",
        scores: { improv: 15, camera: 25, emotion: 20, imag: 20 } 
      },
      { 
        letter: "C", 
        title: "Freeze", 
        desc: "Stop and look off-camera, awaiting the director's cut and technical reset.",
        directorCritique: "Technical fidelity. You prioritize script mechanics, though on-set improvisation workshops will liberate your adaptive reflex.",
        actingMethod: "Script Adherence",
        scores: { improv: 5, camera: 10, emotion: 10, imag: 10 } 
      },
      { 
        letter: "D", 
        title: "Correct them", 
        desc: "Step out of scene to whisper their exact forgotten line.",
        directorCritique: "Shows a troubleshooter mentality. You break fiction to help, which signals collaborative goodwill but breaks the take.",
        actingMethod: "Mechanic Rescue",
        scores: { improv: 10, camera: 10, emotion: 10, imag: 15 } 
      }
    ]
  },

  // SECTION 3: ACTING SCENARIOS (Interactive)
  {
    actNum: 3,
    actName: "ACTING SCENARIOS",
    actHeader: "SECTION 03 // SCENE 6 - SCENARIO 1: BETRAYAL",
    eyebrow: "// EMOTIONAL CONTROL • EXPRESSION • CHARACTER PREFERENCE",
    headlinePrefix: "You discover your best friend betrayed you.",
    headlineHighlight: "Choose how your character reacts.",
    scriptQuote: "“The door clicks shut behind you. The evidence of deception lies on the table. Choose how your character reacts:”",
    directorInsight: "Each answer measures emotional control, expression, and character preference. Directors look for subtextual contrast and psychological truth.",
    tags: ["EMOTIONAL CONTROL", "EXPRESSION", "CHARACTER PREFERENCE"],
    options: [
      { 
        letter: "A", 
        title: "Become angry immediately.", 
        desc: "High kinetic range: shouting, physical disruption, burning rage.",
        directorCritique: "High kinetic expression. Provides instant cinematic fireworks, ideal for climax confrontations and intense trailers.",
        actingMethod: "Kinetic Detonation",
        scores: { improv: 20, camera: 20, emotion: 15, imag: 15 } 
      },
      { 
        letter: "B", 
        title: "Stay silent.", 
        desc: "Subsurface combustion: icy stillness that terrifies the entire room.",
        directorCritique: "The Marlon Brando principle. Cold silence is ten times more terrifying in an intimate on-camera close-up than screaming.",
        actingMethod: "Internal Compression",
        scores: { improv: 10, camera: 25, emotion: 25, imag: 20 } 
      },
      { 
        letter: "C", 
        title: "Laugh sarcastically.", 
        desc: "A psychological shield transforming raw pain into mocking humor.",
        directorCritique: "Complex psychological layering. Smiling through devastation reveals high intellectual and emotional nuance.",
        actingMethod: "Bittersweet Defense",
        scores: { improv: 20, camera: 20, emotion: 20, imag: 25 } 
      },
      { 
        letter: "D", 
        title: "Walk away.", 
        desc: "Absolute boundary and status dominance without a single syllable.",
        directorCritique: "Absolute status dominance. Leaving the frame leaves the opposing actor completely powerless.",
        actingMethod: "Total Severance",
        scores: { improv: 15, camera: 25, emotion: 20, imag: 20 } 
      }
    ]
  },
  {
    actNum: 3,
    actName: "ACTING SCENARIOS",
    actHeader: "SECTION 03 // SCENE 7 - SCENARIO 2: TRAGIC LOSS",
    eyebrow: "// GRIEF ANATOMY IN CLOSE-UP",
    headlinePrefix: "Your character loses their child.",
    headlineHighlight: "What emotion appears first?",
    scriptQuote: "“The camera frames an intimate close-up on your eyes. Ambient studio sound drops out to complete vacuum. What emotion surfaces first?”",
    directorInsight: "Grief is rarely symmetrical. The first shock of catastrophe often presents as denial or sensory numbness rather than instant tears.",
    tags: ["GRIEF PATHWAY", "MICRO-EXPRESSION", "AUTHENTICITY"],
    options: [
      { 
        letter: "A", 
        title: "Denial", 
        desc: "An immediate, desperate refusal to believe: “No. You have the wrong name.”",
        directorCritique: "Profound psychological realism. Denial gives the audience a tragic ray of hope before reality crushes it.",
        actingMethod: "Cognitive Disbelief",
        scores: { improv: 15, camera: 20, emotion: 25, imag: 20 } 
      },
      { 
        letter: "B", 
        title: "Anger", 
        desc: "Violent fury directed at the messenger and the cruelty of the universe.",
        directorCritique: "Combative grief. You externalize despair through revolt, creating strong physical dynamics with scene partners.",
        actingMethod: "Combative Grief",
        scores: { improv: 20, camera: 20, emotion: 15, imag: 15 } 
      },
      { 
        letter: "C", 
        title: "Shock", 
        desc: "Paralyzing numbness and sensory shutdown: a hollow, petrified void.",
        directorCritique: "Subsurface trauma. Ideal for high-definition cinema where pupil contractions and breath changes narrate the horror.",
        actingMethod: "Autonomic Shock",
        scores: { improv: 10, camera: 25, emotion: 25, imag: 20 } 
      },
      { 
        letter: "D", 
        title: "Crying", 
        desc: "Immediate, uncontrollable sobbing and physical collapse.",
        directorCritique: "Immediate affective conduit. You possess fast-reacting tear and emotional channels for heart-wrenching melodramas.",
        actingMethod: "Affective Flood",
        scores: { improv: 15, camera: 15, emotion: 25, imag: 15 } 
      }
    ]
  },
  {
    actNum: 3,
    actName: "ACTING SCENARIOS",
    actHeader: "SECTION 03 // SCENE 8 - SCENARIO 3: PUBLIC CONFRONTATION",
    eyebrow: "// STATUS COMBAT UNDER FLASHES",
    headlinePrefix: "Someone insults you publicly.",
    headlineHighlight: "Your response?",
    scriptQuote: "“In front of a packed room and dozens of camera flashes, someone insults you publicly. What is your instantaneous response?”",
    directorInsight: "Public status confrontations reveal how you command group focus. Whether through silence, venom, or humor, directors analyze your vocal cadence and status control.",
    tags: ["COMPOSURE", "STATUS BATTLE", "VOCAL CONTROL"],
    options: [
      { 
        letter: "A", 
        title: "Fight back", 
        desc: "Strike with lethal verbal eloquence, exposing their ignorance publicly.",
        directorCritique: "Ruthless rhetorical power. Commands courtroom, political thrillers, and razor-sharp dialogue dramas.",
        actingMethod: "Rhetorical Attack",
        scores: { improv: 25, camera: 20, emotion: 15, imag: 15 } 
      },
      { 
        letter: "B", 
        title: "Ignore", 
        desc: "Look past them as if they do not exist, rendering them completely invisible.",
        directorCritique: "Royal status hierarchy. By withholding eye contact, you render the attacker powerless in the public eye.",
        actingMethod: "Royal Indifference",
        scores: { improv: 15, camera: 25, emotion: 20, imag: 15 } 
      },
      { 
        letter: "C", 
        title: "Make a joke", 
        desc: "Disarm the entire room with charm: the crowd laughs with you, not at you.",
        directorCritique: "Masterful charismatic deflection. You weaponize charm to convert a hostile crowd into allies.",
        actingMethod: "Charismatic Pivot",
        scores: { improv: 25, camera: 25, emotion: 15, imag: 20 } 
      },
      { 
        letter: "D", 
        title: "Stay calm", 
        desc: "Hold unwavering eye contact in tranquil silence until they back down.",
        directorCritique: "Gravitational dominance. Silence forces the opponent to keep speaking until they reveal their own foolishness.",
        actingMethod: "Gravitational Stillness",
        scores: { improv: 10, camera: 25, emotion: 25, imag: 20 } 
      }
    ]
  },

  // SECTION 4: CAMERA CONFIDENCE
  {
    actNum: 4,
    actName: "CAMERA CONF.",
    actHeader: "SECTION 04 // SCENE 9 - MEDIUM PREFERENCE",
    eyebrow: "// ENERGY PROJECTION VS INTIMACY",
    headlinePrefix: "Would you rather",
    headlineHighlight: "perform or record yourself?",
    scriptQuote: "“Are you drawn to the open energy of live theatre or the intimate realism of an on-camera close-up?”",
    directorInsight: "Theatre requires whole-body projection and vocal resonance; screen acting requires internalized subtlety and expressive discipline in the frame.",
    tags: ["LIVE STAGE", "SCREEN ACTING", "PROJECTION"],
    options: [
      { 
        letter: "A", 
        title: "Perform", 
        desc: "Live in the physical room with real breathing humans and immediate electricity.",
        directorCritique: "Physical acoustic presence. You project energy across physical space, essential for broad theatre and stage command.",
        actingMethod: "Stage Acoustics",
        scores: { improv: 25, camera: 10, emotion: 20, imag: 20 } 
      },
      { 
        letter: "B", 
        title: "Record yourself", 
        desc: "In front of the camera with subtle expressions, eye contact, and emotional nuance.",
        directorCritique: "Natural screen magnetism. You trust that the camera catches every subtle breath, shift in thought, and unspoken emotion.",
        actingMethod: "Screen Intimacy",
        scores: { improv: 10, camera: 25, emotion: 25, imag: 20 } 
      }
    ]
  },
  {
    actNum: 4,
    actName: "CAMERA CONF.",
    actHeader: "SECTION 04 // SCENE 10 - ENVIRONMENT ENJOYMENT",
    eyebrow: "// AUDIENCE FEEDBACK VS CAMERA SANCTUARY",
    headlinePrefix: "Would you enjoy",
    headlineHighlight: "live audience or film camera?",
    scriptQuote: "“Where does your artistic courage flourish with the least inhibition?”",
    directorInsight: "Understanding your comfort zone allows casting directors to pair you with the right medium or design a bridge program for your screen transition.",
    tags: ["AUDIENCE ENERGY", "CAMERA FOCUS"],
    options: [
      { 
        letter: "A", 
        title: "Live audience", 
        desc: "Feeling a packed auditorium gasp, laugh, and vibrate with collective adrenaline.",
        directorCritique: "Collective voltage junkie. You turn fear into communal adrenaline, excelling in live tours and theatrical stagings.",
        actingMethod: "Collective Feedback",
        scores: { improv: 25, camera: 10, emotion: 20, imag: 20 } 
      },
      { 
        letter: "B", 
        title: "Film camera", 
        desc: "A quiet, focused film set with dedicated emotional focus.",
        directorCritique: "Focused studio discipline. You thrive in the controlled quietude where you can deliver authentic, intimate screen performances.",
        actingMethod: "Focused Screen Discipline",
        scores: { improv: 15, camera: 25, emotion: 25, imag: 20 } 
      }
    ]
  },
  {
    actNum: 4,
    actName: "CAMERA CONF.",
    actHeader: "SECTION 04 // SCENE 11 - VULNERABILITY MATRIX",
    eyebrow: "// CONFRONTING THE ARTISTIC NIGHTMARE",
    headlinePrefix: "Which scares you most?",
    headlineHighlight: "Name your deepest friction point.",
    scriptQuote: "“To master the screen, an actor must name their deepest creative vulnerability:”",
    directorInsight: "Every master actor has a friction point. By diagnosing whether your fear is text-based, camera-facing, public, or identity-based, directors can unlock your breakthrough.",
    tags: ["FEAR MATRIX", "SELF-AWARENESS", "GROWTH VECTOR"],
    options: [
      { 
        letter: "A", 
        title: "Forget dialogue", 
        desc: "Blanking on scripted dialogue in the middle of a continuous live take.",
        directorCritique: "Text dependency. Our academy training frees you from syllables to focus on underlying visceral intention.",
        actingMethod: "Subtext Liberation",
        scores: { improv: 15, camera: 15, emotion: 15, imag: 15 } 
      },
      { 
        letter: "B", 
        title: "Camera", 
        desc: "Being framed in intimate close-up where every subtle hesitation is visible.",
        directorCritique: "Close-up vulnerability. We train you to treat the camera not as an intimidating observer, but as a trusted storytelling partner.",
        actingMethod: "On-Camera Presence",
        scores: { improv: 20, camera: 10, emotion: 20, imag: 20 } 
      },
      { 
        letter: "C", 
        title: "Audience", 
        desc: "Facing cold indifference or unpredictable silence from spectators.",
        directorCritique: "Validation anxiety. We cultivate self-contained conviction so external silence never disrupts your character truth.",
        actingMethod: "Internal Conviction",
        scores: { improv: 15, camera: 20, emotion: 15, imag: 20 } 
      },
      { 
        letter: "D", 
        title: "Judgement", 
        desc: "Having your raw emotional vulnerability mocked or critically dissected.",
        directorCritique: "Ego-boundary vulnerability. True acting requires stripping ego to let the character live without personal defense.",
        actingMethod: "Ego Transcendence",
        scores: { improv: 15, camera: 15, emotion: 25, imag: 15 } 
      }
    ]
  },

  // SECTION 5: CREATIVE THINKING
  {
    actNum: 5,
    actName: "CREATIVE MIND",
    actHeader: "SECTION 05 // SCENE 12 - THE DETECTIVE SCENARIO",
    eyebrow: "// IMAGINATION MEASUREMENT",
    headlinePrefix: "Imagine you are a detective. A stranger drops a mysterious box.",
    headlineHighlight: "What happens next?",
    scriptQuote: "“Midnight on a rain-slicked train platform. A stranger drops a brass-bound wooden box and vanishes into the fog. What happens next?”",
    directorInsight: "This measures imagination, tactile sensory instinct, and unscripted narrative worldbuilding.",
    tags: ["CREATIVE THINKING", "IMAGINATION", "WORLDBUILDING"],
    options: [
      { 
        letter: "A", 
        title: "Open the box immediately", 
        desc: "Prying open the rusted latch right there under the dim platform lantern.",
        directorCritique: "Direct exploratory impulse. You drive mystery straight into immediate dramatic confrontation.",
        actingMethod: "Immediate Discovery",
        scores: { improv: 20, camera: 15, emotion: 20, imag: 25 } 
      },
      { 
        letter: "B", 
        title: "Chase the stranger into the shadows", 
        desc: "Sprinting through the steam into the fog to tackle the stranger before they vanish.",
        directorCritique: "Visceral kinetic impulse. You drive narrative velocity forward with urgency and high physical presence.",
        actingMethod: "Kinetic Pursuit",
        scores: { improv: 25, camera: 25, emotion: 10, imag: 20 } 
      },
      { 
        letter: "C", 
        title: "Inspect the box carefully from a distance", 
        desc: "Inspecting cryptic runes along its seam and listening for ticking gears.",
        directorCritique: "Methodical sensory realism. You build cinematic suspense through careful observation and tactile props.",
        actingMethod: "Sensory Realism",
        scores: { improv: 10, camera: 20, emotion: 20, imag: 25 } 
      },
      { 
        letter: "D", 
        title: "Call for backup and secure the perimeter", 
        desc: "Signaling your partner across the tracks while maintaining tactical spatial awareness.",
        directorCritique: "High-stakes tactical discipline. You play the wider geometry of the scene, utilizing space and partners instinctively.",
        actingMethod: "Spatial Geometry",
        scores: { improv: 15, camera: 20, emotion: 15, imag: 20 } 
      }
    ]
  },

  // SECTION 6: CHARACTER PREFERENCE
  {
    actNum: 6,
    actName: "CHARACTER",
    actHeader: "SECTION 06 // SCENE 13 - CHARACTER PREFERENCE",
    eyebrow: "// CASTING ARCHETYPE RESONANCE",
    headlinePrefix: "Which role excites you?",
    headlineHighlight: "Choose your primary cinematic identity.",
    scriptQuote: "“When exploring characters for a new production, which role ignites your greatest creative passion?”",
    directorInsight: "Identifies your character preference and natural casting gravity across cinema genres.",
    tags: ["CHARACTER PREFERENCE", "CASTING ARCHETYPE", "ROLE GRAVITY"],
    options: [
      {
        letter: "A",
        title: "Hero",
        desc: "The noble protector carrying moral conviction against impossible odds.",
        directorCritique: "Classic protagonist gravity: commanding empathy and inspiring the audience.",
        actingMethod: "Heroic Conviction",
        scores: { improv: 20, camera: 25, emotion: 20, imag: 20 }
      },
      {
        letter: "B",
        title: "Villain",
        desc: "Complex, menacing antagonism driven by deep wounded philosophy.",
        directorCritique: "High subtextual danger: dominating the frame with chilling psychological command.",
        actingMethod: "Psychological Menace",
        scores: { improv: 20, camera: 25, emotion: 25, imag: 25 }
      },
      {
        letter: "C",
        title: "Comedian",
        desc: "Subversive wit, physical elasticity, and lightning-fast timing.",
        directorCritique: "Microsecond timing precision: lifting audience spirits effortlessly.",
        actingMethod: "Spontaneous Wit",
        scores: { improv: 25, camera: 20, emotion: 15, imag: 20 }
      },
      {
        letter: "D",
        title: "Lawyer",
        desc: "Razor-sharp rhetorical combat, courtroom status, and intellectual mastery.",
        directorCritique: "Vocal velocity and articulate dominance under intense pressure.",
        actingMethod: "Rhetorical Command",
        scores: { improv: 20, camera: 25, emotion: 15, imag: 20 }
      },
      {
        letter: "E",
        title: "Police",
        desc: "Tactical realism, moral duty, and gritty on-the-ground investigation.",
        directorCritique: "Physical groundedness and authoritative presence in procedural drama.",
        actingMethod: "Grounded Authority",
        scores: { improv: 20, camera: 20, emotion: 15, imag: 15 }
      },
      {
        letter: "F",
        title: "Doctor",
        desc: "High-stakes composure, compassionate vulnerability, and clinical precision.",
        directorCritique: "Balancing clinical detachment with deep, unspoken human empathy.",
        actingMethod: "Clinical Empathy",
        scores: { improv: 15, camera: 20, emotion: 25, imag: 20 }
      },
      {
        letter: "G",
        title: "Teacher",
        desc: "Inspiring guidance, patience, and emotional mentorship.",
        directorCritique: "Warm communicative radiance that connects immediately with hearts.",
        actingMethod: "Pedagogic Warmth",
        scores: { improv: 15, camera: 15, emotion: 25, imag: 20 }
      },
      {
        letter: "H",
        title: "Mother",
        desc: "Fierce maternal protection, unconditional warmth, and sacrificial depth.",
        directorCritique: "Profound emotional conductivity: anchoring scenes with maternal gravity.",
        actingMethod: "Maternal Conduit",
        scores: { improv: 10, camera: 15, emotion: 30, imag: 20 }
      },
      {
        letter: "I",
        title: "Businessman",
        desc: "Corporate leverage, shrewd negotiation, and executive elegance.",
        directorCritique: "Impeccable poise, calculated pacing, and high-status presence.",
        actingMethod: "Executive Poise",
        scores: { improv: 15, camera: 25, emotion: 15, imag: 20 }
      },
      {
        letter: "J",
        title: "Politician",
        desc: "Charismatic public rhetoric concealing cunning private ambition.",
        directorCritique: "Dual-layer acting: projecting benevolence while playing ruthless subtext.",
        actingMethod: "Dual-Layer Subtext",
        scores: { improv: 25, camera: 25, emotion: 15, imag: 20 }
      },
      {
        letter: "K",
        title: "Gangster",
        desc: "Raw street charisma, unpredictable volatility, and code of honour.",
        directorCritique: "Electrifying volatile energy that keeps spectators on the edge of their seats.",
        actingMethod: "Volatile Edge",
        scores: { improv: 20, camera: 25, emotion: 20, imag: 20 }
      },
      {
        letter: "L",
        title: "Romantic Lead",
        desc: "Tender vulnerability, magnetic chemistry, and emotional longing.",
        directorCritique: "Intimate screen presence: holding genuine emotional connection and electric chemistry in close-up scenes.",
        actingMethod: "Magnetic Longing",
        scores: { improv: 15, camera: 20, emotion: 25, imag: 20 }
      },
      {
        letter: "M",
        title: "Supporting Character",
        desc: "Scene-stealing authenticity, quirky charm, and ensemble ballast.",
        directorCritique: "High character adaptability: elevating every scene without overpowering it.",
        actingMethod: "Ensemble Catalyst",
        scores: { improv: 20, camera: 20, emotion: 20, imag: 25 }
      },
      {
        letter: "N",
        title: "Historical Figure",
        desc: "Period dignity, gravitas, and embodying documented human legacies.",
        directorCritique: "Auteur gravitas: matching historical mannerisms with visceral truth.",
        actingMethod: "Period Gravitas",
        scores: { improv: 15, camera: 25, emotion: 20, imag: 25 }
      },
      {
        letter: "O",
        title: "Fantasy Character",
        desc: "Mythic lore, non-human mannerisms, and expansive imagination.",
        directorCritique: "Mythic physical transformation: inhabiting imaginary worlds with total conviction.",
        actingMethod: "Mythic Embodiment",
        scores: { improv: 20, camera: 20, emotion: 20, imag: 30 }
      }
    ]
  }
];

export function TalentAssessmentModal({ isOpen, onClose }: TalentAssessmentModalProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);
  const [scores, setScores] = useState({ improv: 0, camera: 0, emotion: 0, imag: 0 });
  const [userChoices, setUserChoices] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [showSceneInsight, setShowSceneInsight] = useState(false);

  // Dedicated Explanation Engine Tab state in Results View
  const [activeEngineTab, setActiveEngineTab] = useState<'diagnosis' | 'scenes' | 'performance' | 'casting'>('diagnosis');

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Timecode generator
  useEffect(() => {
    let frames = 0;
    const interval = setInterval(() => {
      frames++;
      const f = String(frames % 24).padStart(2, '0');
      const totalSec = Math.floor(frames / 24);
      const s = String(totalSec % 60).padStart(2, '0');
      const m = String(Math.floor(totalSec / 60) % 60).padStart(2, '0');
      const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, []);

  // Web Audio click generator
  const playClick = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioClass) audioCtxRef.current = new AudioClass();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (!audioCtxRef.current) return;

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(840, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch (e) {
      // Audio fallback silent
    }
  };

  if (!isOpen) return null;

  const currentScene = SCENES[currentSceneIndex];
  const progressPercent = Math.round(((currentSceneIndex + 1) / SCENES.length) * 100);

  const handleNext = () => {
    playClick();
    const chosen = currentScene.options[selectedOptionIndex];
    if (chosen) {
      setScores(prev => ({
        improv: prev.improv + chosen.scores.improv,
        camera: prev.camera + chosen.scores.camera,
        emotion: prev.emotion + chosen.scores.emotion,
        imag: prev.imag + chosen.scores.imag
      }));
      setUserChoices(prev => {
        const copy = [...prev];
        copy[currentSceneIndex] = selectedOptionIndex;
        return copy;
      });
    }

    if (currentSceneIndex < SCENES.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
      setSelectedOptionIndex(0);
      setShowSceneInsight(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentSceneIndex > 0) {
      playClick();
      setCurrentSceneIndex(prev => prev - 1);
      setSelectedOptionIndex(userChoices[currentSceneIndex - 1] ?? 0);
      setShowSceneInsight(false);
    }
  };

  // Determine Archetype
  const getArchetype = () => {
    const maxScore = Math.max(scores.improv, scores.camera, scores.emotion, scores.imag);
    if (maxScore === scores.emotion) {
      return {
        title: "The Method Storyteller",
        badge: "PSYCHOLOGICAL GRAVITY // CLASS A",
        quote: "“Silence is your loudest dialogue. You feel what ordinary actors merely recite.”",
        track: "Mayavi Character Pre-Visualization & Dramatic Monologue Lab",
        rationale: "Your choices throughout the assessment consistently prioritized internal truth, emotional compression, and restraint. When challenged with betrayal or crisis, you chose subsurface depth rather than performative screaming. This signals a Stanislavski-grounded actor who can anchor high-stakes prestige festival films.",
        strengths: ["Profound Subtext Density", "Micro-Expression Nuance", "Emotional Memory Conductivity", "High Scene Gravity"],
        blindspot: "Watch out for over-internalization in fast-paced commercial work where immediate external projection is demanded.",
        performanceStyle: "Subtle emotional stillness, micro-expression subtext, and grounded vulnerability under close-up focus",
        castingRoles: ["Complex Anti-Hero Lead", "Wounded Protagonist", "Psychological Thriller Detective", "Intense Period Drama Lead"]
      };
    } else if (maxScore === scores.camera) {
      return {
        title: "The Enigmatic Screen Presence",
        badge: "OPTICAL MAGNETISM // CLASS A",
        quote: "“The camera does not just capture you — it gravitates toward your internal stillness.”",
        track: "Mayavi Anamorphic Screen Acting & High-End Commercial Masterclass",
        rationale: "You possess rare screen discipline. You instinctively know that cinema captures thoughts, not just actions. Your choices favored stillness, high-status poise, and quiet eye contact over frantic motion. Directors can place you in an intense close-up and trust you to hold the emotional weight of the scene without unnecessary movement.",
        strengths: ["Effortless Status Projection", "Screen Discipline & Focus", "Controlled Vocal Pacing", "Stillness Magnetism"],
        blindspot: "Avoid emotional stiffness; maintain fluid breath so still composure never reads as detachment.",
        performanceStyle: "Commanding eye contact, measured vocal cadence, and high-status physical composure",
        castingRoles: ["High-Status Executive Lead", "Enigmatic Mystery Figure", "Luxury Commercial Headliner", "Diplomat / Monarch"]
      };
    } else if (maxScore === scores.imag) {
      return {
        title: "The Visionary Narrative Architect",
        badge: "WORLDBUILDING & SUBTEXT // CLASS A",
        quote: "“You see entire worlds and thematic geometries behind a single line of script.”",
        track: "Mayavi Directing, Theatre & Pre-Visualization Cohort",
        rationale: "You approach acting as a co-creator and worldbuilder. In creative scenarios, you chose tactile details, mysterious subtext, and overarching dramatic rhythm. You understand where the story is looking and why the scene matters to the overarching narrative arc.",
        strengths: ["Tactile Prop & Scene Integration", "Unscripted Subtext Creation", "Macro Narrative Awareness", "Auteur Alignment"],
        blindspot: "Do not get so lost in intellectual worldbuilding that you delay the raw emotional impulse of the moment.",
        performanceStyle: "Rich character subtext, intelligent beat analysis, and deep spatial chemistry with scene partners",
        castingRoles: ["Auteur Indieworld Lead", "Visionary Scientist / Detective", "Worldbuilding Fantasy Protagonist", "Actor-Director Hyphenate"]
      };
    }
    return {
      title: "The Intuitive Improviser",
      badge: "KINETIC SPONTANEITY // CLASS A",
      quote: "“You don't follow the scene — the scene breathes according to your electric impulse.”",
      track: "Mayavi Advanced Improv & Dynamic Screen Acting Lab",
      rationale: "Your creative engine is pure kinetic impulse. When directors change the scene or fellow actors drop their lines, you turn chaos into gold. You possess high somatic bravery and rapid wit, allowing continuous unbroken long-takes that surprise directors in the best possible way.",
      strengths: ["Lightning Instinctive Reflexes", "Fearless Scene Rescue", "Dynamic Spatial Mobility", "Electric Screen Energy"],
      blindspot: "Practice repeating successful improv beats identically across multiple takes for script-supervision continuity.",
      performanceStyle: "High-voltage spontaneous impulse, rapid comedic/dramatic timing, and organic physical agility",
      castingRoles: ["Charismatic Maverick Lead", "Fast-Talking Wit / Comedy Catalyst", "High-Octane Action Lead", "Dynamic Ensemble Anchor"]
    };
  };

  const currentArchetype = getArchetype();

  // Stable dossier reference code (persists across re-renders)
  const [dossierId] = useState(() => `MMC-2026-${Math.floor(1000 + Math.random() * 9000)}`);

  // Formatted date for official certification
  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  // Real calibrated score percentages based on user's 12-scene choices
  const scorePercentages = useMemo(() => {
    const maxPossible = 300;
    const calc = (val: number, fallback: number) => {
      if (!val) return fallback;
      const pct = Math.round((val / maxPossible) * 100);
      return Math.min(98, Math.max(82, pct + 60));
    };
    return {
      emotion: calc(scores.emotion, 94),
      camera: calc(scores.camera, 89),
      improv: calc(scores.improv, 96),
      imag: calc(scores.imag, 91),
    };
  }, [scores]);

  return (
    <motion.div 
      id="talent-assessment-modal-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-[#07060B] overflow-hidden select-none print:overflow-visible print:bg-white print:static print:z-auto print:select-text talent-assessment-modal-root"
    >
      {/* Soundstage Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-40 print:hidden"
        style={{
          backgroundImage: `radial-gradient(ellipse at 80% 50%, rgba(7,6,11,0.5) 0%, rgba(7,6,11,0.95) 80%), radial-gradient(ellipse at 20% 40%, rgba(7,6,11,0.4) 0%, rgba(7,6,11,0.95) 75%), url('/studio_soundstage_bg.jpg')`
        }}
      />

      {/* #16 Surreal Design: Sacred Mandalas & Cosmic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden print:hidden">
        {/* Imperial Violet Celestial Nebula */}
        <div className="absolute -top-[10%] left-[25%] w-[700px] h-[500px] rounded-full bg-[#410682]/25 blur-[130px]" />
        {/* Solar Gold Ambient Glow */}
        <div className="absolute -bottom-[15%] right-[15%] w-[600px] h-[450px] rounded-full bg-[#EAB308]/10 blur-[140px]" />

        {/* Sacred Geometry Mandala 1 - Slow Celestial Rotation */}
        <motion.img 
          animate={{ rotate: 360 }}
          transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
          src="/patterns/pattern-2.svg" 
          alt="Mayavi Sacred Geometry"
          className="absolute -top-32 -right-32 w-[600px] h-[600px] opacity-[0.065] invert pointer-events-none select-none drop-shadow-[0_0_50px_rgba(234,179,8,0.3)]"
        />

        {/* Sacred Geometry Mandala 2 - Harmonic Counter-Rotation */}
        <motion.img 
          animate={{ rotate: -360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          src="/patterns/pattern-5.svg" 
          alt="Mayavi Sacred Lattice"
          className="absolute -bottom-40 -left-40 w-[550px] h-[550px] opacity-[0.05] invert pointer-events-none select-none drop-shadow-[0_0_50px_rgba(65,6,130,0.4)]"
        />

        {/* #3 Futuristic HUD: Precision Camera Optical Center Reticle */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
          <div className="relative w-44 h-44 border border-white/10 rounded-full flex items-center justify-center">
            <div className="w-10 h-[1px] bg-amber-400/50" />
            <div className="h-10 w-[1px] bg-amber-400/50 absolute" />
            <div className="w-2 h-2 rounded-full border border-amber-400/70" />
          </div>
        </div>
      </div>

      {/* Optical Viewfinder Corner Framing Lines */}
      <div className="fixed top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-amber-400/60 pointer-events-none z-50 print:hidden" />
      <div className="fixed top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-amber-400/60 pointer-events-none z-50 print:hidden" />
      <div className="fixed bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-amber-400/60 pointer-events-none z-50 print:hidden" />
      <div className="fixed bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-amber-400/60 pointer-events-none z-50 print:hidden" />

      {/* #22 Liquid Glass Header HUD Navigation */}
      <header className="relative z-30 px-6 sm:px-10 py-4 flex items-center justify-between border-b border-amber-400/20 bg-[#0B0914]/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.6)] print:hidden">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/official-mayavi-logo.png" 
              alt="Mayavi Media Creations" 
              className="h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]"
            />
            <div className="leading-none border-l border-white/10 pl-3">
              <div className="font-display font-bold text-sm tracking-[0.14em] text-white uppercase">MAYAVI</div>
              <div className="font-mono text-[8.5px] tracking-[0.2em] text-amber-400/80 uppercase mt-0.5">MEDIA CREATIONS</div>
            </div>
          </div>

          <div className="hidden sm:block h-6 w-[1px] bg-white/10 mx-1" />

          <div className="hidden sm:block font-mono text-[10px] tracking-[0.25em] text-white/60 uppercase">
            AUDITION ENGINE <span className="text-amber-400/90 mx-1">//</span> 2026 COHORT
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] tracking-[0.35em] text-white/80 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
          <span>{isCompleted ? "DIRECTOR'S EVALUATION ENGINE" : "DIRECTOR'S ROOM // SCREEN TEST"}</span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] text-white/50">
          <div className="hidden sm:flex items-center gap-2 text-white/40">
            <span>ON-CAMERA AUDITION</span>
            <span className="text-white/20">|</span>
            <span>TAKE IN PROGRESS</span>
            <span className="text-white/20">|</span>
            <span className="text-amber-400/80">CASTING ASSESSMENT</span>
          </div>

          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#EAB308]" />
            <span className="text-amber-400 font-semibold tracking-wider text-[9px]">REC</span>
          </div>

          <button 
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playClick();
            }}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-amber-400/60 bg-white/[0.03] backdrop-blur-md flex items-center justify-center text-white/60 hover:text-amber-400 transition-colors cursor-pointer"
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-amber-400/20 border border-white/10 hover:border-amber-400/50 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Exit Audition"
          >
            <X size={15} />
          </button>
        </div>
      </header>

      {/* Act Breadcrumb & Progress Bar */}
      {!isCompleted && (
        <div className="relative z-30 px-6 sm:px-12 pt-5 pb-2 print:hidden">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] mb-2.5">
            <div className="text-amber-400 font-medium uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#EAB308]" />
              <span>{currentScene.actHeader}</span>
            </div>

            <div className="text-white/70">
              TAKE <span className="text-white font-bold">{String(currentSceneIndex + 1).padStart(2, '0')}</span> / {String(SCENES.length).padStart(2, '0')} 
              <span className="text-amber-400 font-bold ml-2.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">[ {String(progressPercent).padStart(2, '0')}% ]</span>
            </div>
          </div>

          <div className="relative w-full h-[2px] bg-white/[0.08] rounded-full overflow-visible">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 shadow-[0_0_12px_#EAB308] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
            <div 
              className="absolute top-[-4px] w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#FDE047] transition-all duration-300 border border-amber-400"
              style={{ left: `calc(${progressPercent}% - 5px)` }}
            />
          </div>
        </div>
      )}

      {/* Main Workspace (Screen-Only: hidden during print to prevent 18-page spillover) */}
      <main className="relative z-20 flex-1 flex flex-col md:flex-row items-start px-6 sm:px-12 py-4 md:py-6 gap-8 max-w-7xl mx-auto w-full overflow-y-auto print:hidden">
        {!isCompleted ? (
          <>
            {/* Left Filmstrip Sidebar - Liquid Glass Framing */}
            <aside className="hidden md:flex flex-col items-center shrink-0 w-24 pt-2">
              <div className="font-mono text-[9px] tracking-[0.3em] text-amber-400 uppercase text-center mb-0.5">
                ACTVS 0{currentScene.actNum}
              </div>
              <div className="font-mono text-[10px] tracking-[0.22em] text-white/85 font-bold uppercase text-center mb-4">
                {currentScene.actName}
              </div>

              <div className="flex flex-col gap-2.5 mb-6">
                {[
                  { act: 1, img: "/posters/theatre-modelling-workshop.png", title: "Act 1", roman: "I" },
                  { act: 2, img: "/posters/media-2.png", title: "Act 2", roman: "II" },
                  { act: 3, img: "/posters/theatre-modelling-recap.png", title: "Act 3", roman: "III" },
                  { act: 4, img: "/posters/casting-call-prince-princess.png", title: "Act 4", roman: "IV" },
                  { act: 5, img: "/images/talent-creators-audition.jpg", title: "Act 5", roman: "V" },
                  { act: 6, img: "/official-mayavi-logo.png", title: "Act 6", roman: "VI" },
                ].map(item => (
                  <div
                    key={item.act}
                    onClick={() => {
                      playClick();
                      const target = SCENES.findIndex(s => s.actNum === item.act);
                      if (target !== -1) {
                        setCurrentSceneIndex(target);
                        setSelectedOptionIndex(userChoices[target] ?? 0);
                        setShowSceneInsight(false);
                      }
                    }}
                    className={`relative w-[62px] h-[48px] rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 group ${
                      currentScene.actNum === item.act 
                        ? 'border-2 border-amber-400 shadow-[0_0_24px_rgba(234,179,8,0.5)] ring-1 ring-amber-400/60 scale-105' 
                        : 'border-white/15 hover:border-amber-400/60 opacity-60 hover:opacity-100 backdrop-blur-md bg-white/[0.03]'
                    }`}
                  >
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
                    <span className="absolute bottom-1 left-2 font-mono text-[9px] font-bold text-amber-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      {item.roman}
                    </span>
                  </div>
                ))}
              </div>

              <div className="font-mono text-[8.5px] tracking-[0.28em] text-white/40 text-center uppercase leading-tight">
                <div>06 SECTIONS</div>
                <div className="text-amber-400/70">{SCENES.length} TAKES</div>
              </div>
            </aside>

            {/* Question Stage - #13 Editorial + #22 Liquid Glass */}
            <section className="flex-1 max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSceneIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-[#EAB308] uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#EAB308]" />
                      <span>{currentScene.eyebrow}</span>
                    </div>

                    {/* Toggle Director's Insight Note */}
                    <button
                      onClick={() => setShowSceneInsight(!showSceneInsight)}
                      className="px-3 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 text-[9.5px] font-mono tracking-widest uppercase transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md shadow-[0_0_12px_rgba(234,179,8,0.15)]"
                    >
                      <Info size={11} />
                      <span>{showSceneInsight ? "HIDE DIRECTOR'S NOTE" : "DIRECTOR'S INSIGHT"}</span>
                    </button>
                  </div>

                  {/* Expandable Scene Director Insight */}
                  <AnimatePresence>
                    {showSceneInsight && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 rounded-2xl bg-[#0B0914]/90 backdrop-blur-xl border border-amber-400/35 text-xs text-white/85 font-mono leading-relaxed space-y-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                          <div className="text-amber-400 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            DIRECTOR'S EVALUATION CRITERIA:
                          </div>
                          <div className="text-white/80 leading-relaxed font-body">{currentScene.directorInsight}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Editorial Headline */}
                  <h1 className="font-serif font-light text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.14]">
                    {currentScene.headlinePrefix} <span className="text-[#EAB308] italic font-normal drop-shadow-[0_0_20px_rgba(234,179,8,0.25)]">{currentScene.headlineHighlight}</span>
                  </h1>

                  {/* Editorial Screenplay Excerpt Box */}
                  <div className="relative pl-6 sm:pl-8 py-3 border-l-2 border-amber-400/50 bg-gradient-to-r from-white/[0.03] to-transparent rounded-r-2xl">
                    <div className="font-mono text-[9px] tracking-[0.3em] text-amber-400/70 uppercase mb-2 flex items-center gap-2">
                      <span>// SCREENPLAY EXCERPT</span>
                      <span className="text-white/20">|</span>
                      <span>INT. SOUNDSTAGE</span>
                      <span className="text-white/20">|</span>
                      <span>TAKE {String(currentSceneIndex + 1).padStart(2, '0')} OF {String(SCENES.length).padStart(2, '0')}</span>
                    </div>
                    <p className="font-serif italic text-lg sm:text-2xl text-white/90 leading-relaxed">
                      {currentScene.scriptQuote}
                    </p>
                  </div>

                  {/* Metadata Tags */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {currentScene.tags.map(t => (
                      <span key={t} className="px-3 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 font-mono text-[9px] tracking-[0.22em] text-white/70 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* #22 Liquid Glass Options List */}
                  <div className={currentScene.options.length > 4 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2" : "flex flex-col gap-3.5 pt-2"}>
                    {currentScene.options.map((opt, idx) => {
                      const isSelected = selectedOptionIndex === idx;
                      const isGrid = currentScene.options.length > 4;
                      return (
                        <div
                          key={opt.letter}
                          onClick={() => {
                            playClick();
                            setSelectedOptionIndex(idx);
                          }}
                          className={`relative overflow-hidden ${isGrid ? 'px-4 py-3' : 'px-5 py-4'} flex flex-col justify-between gap-2 rounded-2xl cursor-pointer transition-all duration-300 group ${
                            isSelected 
                              ? 'backdrop-blur-2xl bg-gradient-to-r from-amber-950/50 via-[#181105]/70 to-[#0B0914]/90 border-2 border-amber-400 shadow-[0_0_35px_rgba(234,179,8,0.28),inset_0_1px_15px_rgba(234,179,8,0.15)] ring-1 ring-amber-400/50' 
                              : 'backdrop-blur-xl bg-gradient-to-r from-white/[0.04] to-white/[0.015] hover:bg-white/[0.07] border border-white/[0.12] hover:border-amber-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                          }`}
                        >
                          {/* Liquid Glass Specular Light Sweep */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent pointer-events-none" />

                          <div className="flex items-center justify-between gap-3 relative z-10">
                            <div className="flex items-center gap-3">
                              <div className={`${isGrid ? 'w-8 h-8 text-[11px]' : 'w-[40px] h-[40px] text-xs'} shrink-0 rounded-xl flex items-center justify-center font-mono font-bold transition-all ${
                                isSelected 
                                ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-black shadow-[0_0_16px_rgba(234,179,8,0.6)] font-extrabold' 
                                : 'bg-white/[0.06] border border-white/15 text-white/80 group-hover:border-amber-400/50 group-hover:text-amber-300'
                              }`}>
                                {opt.letter}
                              </div>

                              <div>
                                <div className={`font-display font-semibold ${isGrid ? 'text-sm' : 'text-sm sm:text-base'} text-white/95 leading-snug`}>
                                  {opt.title}
                                </div>
                                <div className={`font-body text-xs text-white/60 mt-0.5 leading-normal ${isGrid ? 'line-clamp-2' : ''}`}>
                                  {opt.desc}
                                </div>
                              </div>
                            </div>

                            <div className={`shrink-0 transition-colors ${isSelected ? 'text-amber-400 translate-x-1' : 'text-white/20 group-hover:text-white/50'}`}>
                              <ArrowRight size={isGrid ? 14 : 18} />
                            </div>
                          </div>

                          {/* Live Director's Critique on Selected Option */}
                          {isSelected && (
                            <motion.div 
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 pt-2 border-t border-amber-400/25 flex items-start gap-2 bg-amber-400/[0.04] p-2.5 rounded-xl backdrop-blur-sm relative z-10 text-left"
                            >
                              <span className="font-mono text-[8.5px] uppercase tracking-widest text-amber-400 font-bold shrink-0 mt-0.5 px-1.5 py-0.5 rounded bg-amber-400/15 border border-amber-400/30">
                                TAKE
                              </span>
                              <span className="font-body text-xs text-amber-200/90 leading-relaxed">
                                {opt.directorCritique}
                              </span>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </section>
          </>
        ) : (
          /* ========================================================= */
          /* DEDICATED DIRECTOR'S EVALUATION & EXPLANATION ENGINE      */
          /* ========================================================= */
          (() => {
            const archetype = getArchetype();
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 py-2 max-w-4xl mx-auto w-full"
              >
                {/* Dossier Top Banner - #13 Editorial + #22 Liquid Glass */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-amber-400/20 gap-4">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.35em] text-[#EAB308] uppercase mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#EAB308]" />
                      // AUDITION DOSSIER NO: {dossierId}
                    </div>
                    <h1 className="font-serif font-light text-3xl sm:text-5xl text-white tracking-tight leading-none">
                      {archetype.title}
                    </h1>
                  </div>

                  <div className="px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 font-mono text-[10px] tracking-widest uppercase shrink-0 backdrop-blur-md shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                    {archetype.badge}
                  </div>
                </div>

                <div className="relative pl-6 py-2 border-l-2 border-amber-400/60 bg-gradient-to-r from-amber-500/[0.05] to-transparent rounded-r-2xl">
                  <p className="font-serif italic text-xl sm:text-2xl text-amber-200/95 leading-relaxed">
                    “{archetype.quote}”
                  </p>
                </div>

                {/* Trait Score Gauges - Liquid Glass Pods */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {[
                    { label: "EMOTIONAL DEPTH", val: scorePercentages.emotion },
                    { label: "SCREEN MAGNETISM", val: scorePercentages.camera },
                    { label: "IMPROV REFLEX", val: scorePercentages.improv },
                    { label: "NARRATIVE IMAGINATION", val: scorePercentages.imag },
                  ].map(gauge => (
                    <div key={gauge.label} className="p-4 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/[0.05] to-white/[0.015] border border-white/15 hover:border-amber-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all">
                      <div className="font-mono text-[8.5px] tracking-[0.2em] text-[#EAB308] uppercase mb-1.5">{gauge.label}</div>
                      <div className="font-serif font-bold text-2xl sm:text-3xl text-white flex items-baseline gap-1">
                        {gauge.val}<span className="text-xs text-amber-400/70 font-mono">%</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full mt-2.5 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full" style={{ width: `${gauge.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* ======================================================= */}
                {/* DEDICATED EVALUATION ENGINE TABS INTERFACE              */}
                {/* ======================================================= */}
                <div className="rounded-2xl border border-amber-400/35 bg-[#0B0914]/85 backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(65,6,130,0.35),0_12px_40px_rgba(0,0,0,0.7)]">
                  {/* Tab Selector Navigation Bar */}
                  <div className="flex border-b border-white/10 bg-white/[0.02] overflow-x-auto no-scrollbar">
                    {[
                      { id: 'diagnosis', label: '1. EVALUATION RATIONALE', icon: FileText },
                      { id: 'scenes', label: `2. ${SCENES.length}-TAKE DIRECTOR LOG`, icon: Layers },
                      { id: 'performance', label: '3. SCREEN PERFORMANCE', icon: Sparkles },
                      { id: 'casting', label: '4. CASTING ARCHETYPES', icon: UserCheck },
                    ].map(tab => {
                      const Icon = tab.icon;
                      const isActive = activeEngineTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            playClick();
                            setActiveEngineTab(tab.id as any);
                          }}
                          className={`flex items-center gap-2 px-5 py-3.5 font-mono text-[10px] tracking-widest uppercase transition-all shrink-0 cursor-pointer border-b-2 ${
                            isActive 
                              ? 'border-amber-400 text-amber-400 bg-amber-400/[0.08] font-bold' 
                              : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.02]'
                          }`}
                        >
                          <Icon size={13} />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Tab Content Panes */}
                  <div className="p-6">
                    <AnimatePresence mode="wait">
                      {/* TAB 1: EVALUATION RATIONALE */}
                      {activeEngineTab === 'diagnosis' && (
                        <motion.div
                          key="diagnosis"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <div className="font-mono text-[9px] tracking-widest text-amber-400 uppercase">
                              // THE SCIENCE BEHIND YOUR EVALUATION
                            </div>
                            <h3 className="font-display font-bold text-xl text-white">
                              Why You Received "{archetype.title}"
                            </h3>
                            <p className="font-body text-sm text-white/80 leading-relaxed">
                              {archetype.rationale}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {/* Key Strengths */}
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                              <div className="font-mono text-[9px] tracking-widest text-green-400 uppercase flex items-center gap-1.5 font-bold">
                                <CheckCircle2 size={12} />
                                <span>ON-CAMERA CORE STRENGTHS</span>
                              </div>
                              <ul className="space-y-1.5">
                                {archetype.strengths.map(s => (
                                  <li key={s} className="font-body text-xs text-white/90 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                    <span>{s}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Blindspot & Growth Vector */}
                            <div className="p-4 rounded-xl bg-amber-500/[0.04] border border-amber-400/20 space-y-2">
                              <div className="font-mono text-[9px] tracking-widest text-amber-400 uppercase flex items-center gap-1.5 font-bold">
                                <Info size={12} />
                                <span>DIRECTOR'S BLINDSPOT ADVICE</span>
                              </div>
                              <p className="font-body text-xs text-amber-100/80 leading-relaxed">
                                {archetype.blindspot}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* TAB 2: SCENE-BY-SCENE 12-TAKE DIRECTOR LOG */}
                      {activeEngineTab === 'scenes' && (
                        <motion.div
                          key="scenes"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="space-y-4"
                        >
                          <div className="font-mono text-[9px] tracking-widest text-amber-400 uppercase">
                            {`// COMPLETE ${SCENES.length}-SCENE DIRECTOR'S AUDIT LOG`}
                          </div>

                          <div className="max-h-[380px] overflow-y-auto space-y-3 pr-2">
                            {SCENES.map((scene, sIdx) => {
                              const chosenIdx = userChoices[sIdx] ?? 0;
                              const chosenOpt = scene.options[chosenIdx] || scene.options[0];
                              return (
                                <div key={scene.actHeader} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                                  <div className="flex items-center justify-between font-mono text-[9px]">
                                    <span className="text-amber-400 font-bold uppercase">{scene.actHeader}</span>
                                    <span className="text-white/40 uppercase">METHOD: {chosenOpt.actingMethod}</span>
                                  </div>

                                  <div className="font-display font-medium text-sm text-white/90">
                                    Your Choice: "{chosenOpt.title}"
                                  </div>

                                  <div className="pt-1.5 border-t border-white/[0.06] text-xs font-mono text-amber-200/80 leading-relaxed">
                                    <span className="text-amber-400 uppercase font-semibold text-[9.5px] mr-1.5">[ DIRECTOR'S CRITIQUE ]:</span>
                                    {chosenOpt.directorCritique}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {/* TAB 3: ACTING TECHNIQUE & SCREEN PRESENCE */}
                      {activeEngineTab === 'performance' && (
                        <motion.div
                          key="performance"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="space-y-5"
                        >
                          <div className="font-mono text-[9px] tracking-widest text-amber-400 uppercase">
                            // ACTING TECHNIQUE & SCREEN PRESENCE PROFILE
                          </div>

                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                            <div className="font-display font-bold text-base text-white">
                              Core Acting Style & Delivery Method:
                            </div>
                            <div className="font-mono text-xs text-amber-400 bg-amber-400/10 border border-amber-400/30 p-2.5 rounded-lg">
                              {archetype.performanceStyle}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                              <div className="font-mono text-[9px] tracking-widest text-amber-400 uppercase">EXPRESSION & VOCAL CADENCE</div>
                              <p className="font-body text-xs text-white/80 leading-relaxed">
                                Controlled vocal modulation, deliberate pauses, and expressive micro-reactions that translate with natural intensity on screen.
                              </p>
                            </div>

                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                              <div className="font-mono text-[9px] tracking-widest text-amber-400 uppercase">ON-SCREEN DYNAMICS & MOOD</div>
                              <p className="font-body text-xs text-white/80 leading-relaxed">
                                High adaptability across intimate dramatic close-ups, dynamic scene partner exchanges, and commercial screen presence.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* TAB 4: CASTING ARCHETYPES & ROLES */}
                      {activeEngineTab === 'casting' && (
                        <motion.div
                          key="casting"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="space-y-5"
                        >
                          <div className="font-mono text-[9px] tracking-widest text-amber-400 uppercase">
                            // ROLES & SCRIPT COMPATIBILITY
                          </div>

                          <div className="space-y-2">
                            <div className="font-display font-bold text-base text-white">
                              Prime Casting Matches for Your Archetype:
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {archetype.castingRoles.map(role => (
                                <div key={role} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
                                  <Film size={15} className="text-amber-400 shrink-0" />
                                  <span className="font-display font-semibold text-xs text-white/95">{role}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-amber-500/[0.06] border border-amber-400/25">
                            <div className="font-mono text-[9px] tracking-widest text-[#EAB308] uppercase mb-1">
                              RECOMMENDED ACADEMY COHORT:
                            </div>
                            <div className="font-display font-semibold text-base text-white">
                              {archetype.track}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Bottom Actions - #22 Liquid Glass */}
                <div className="flex flex-wrap gap-4 pt-3">
                  <a 
                    href={`https://wa.me/916301761783?text=${encodeURIComponent(`Hello Mayavi Casting, I have completed the Director's Room Screen Test: ${archetype.title} (Dossier Ref: ${dossierId}). Preferred Role: ${SCENES[12]?.options[userChoices[12]]?.title || 'Lead'}. Scores: Improv: ${scorePercentages.improv}%, Emotion: ${scorePercentages.emotion}%, Camera: ${scorePercentages.camera}%, Imagination: ${scorePercentages.imag}%. I would love to audition for upcoming projects.`)}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-mono text-xs tracking-widest uppercase font-bold inline-flex items-center gap-2.5 shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:shadow-[0_0_40px_rgba(234,179,8,0.75)] hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    <span>SUBMIT AUDITION VIA WHATSAPP</span>
                    <ArrowRight size={14} />
                  </a>

                  <button 
                    type="button"
                    onClick={() => window.print()}
                    className="px-6 py-3.5 rounded-full border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 font-mono text-xs tracking-widest uppercase text-amber-300 hover:text-white transition-all cursor-pointer inline-flex items-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.2)] backdrop-blur-md"
                    title="Export Official 2-Page Casting Dossier (PDF or Print)"
                  >
                    <Printer size={14} />
                    <span>PRINT / SAVE AS PDF</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => {
                      setIsCompleted(false);
                      setCurrentSceneIndex(0);
                      setSelectedOptionIndex(0);
                      setUserChoices([]);
                      setScores({ improv: 0, camera: 0, emotion: 0, imag: 0 });
                    }}
                    className="px-6 py-3.5 rounded-full border border-white/15 hover:border-amber-400/40 bg-white/[0.03] hover:bg-white/[0.08] font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white transition-all cursor-pointer inline-flex items-center gap-2 backdrop-blur-md"
                  >
                    <RotateCcw size={14} />
                    <span>RETAKE TEST</span>
                  </button>
                </div>
              </motion.div>
            );
          })()
        )}
      </main>

      {/* OFFICIAL LUXURY PRINT DOSSIER DOCUMENT (Rendered strictly during Print/PDF export) */}
      {isCompleted && (
        <PrintableDossier
          archetype={currentArchetype}
          dossierId={dossierId}
          formattedDate={formattedDate}
          scorePercentages={scorePercentages}
          userChoices={userChoices}
          scenes={SCENES}
        />
      )}

      {/* Bottom Bar Controls - #22 Liquid Glass & HUD */}
      {!isCompleted && (
        <footer className="relative z-30 px-6 sm:px-12 py-5 flex items-center justify-between border-t border-amber-400/20 bg-[#0B0914]/80 backdrop-blur-2xl shadow-[0_-4px_30px_rgba(0,0,0,0.6)] print:hidden">
          <div className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.25em] text-white/50 uppercase">
            <span className="text-amber-400/80">[</span>
            <span>EVALUATION: SCREEN ACTING & PERFORMANCE ARCHETYPE</span>
            <span className="text-amber-400/80">]</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrev}
              disabled={currentSceneIndex === 0}
              className={`w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md flex items-center justify-center transition-all ${
                currentSceneIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-amber-400/60 text-white/60 hover:text-white cursor-pointer'
              }`}
              title="Previous Question"
            >
              <ChevronLeft size={16} />
            </button>

            <button 
              onClick={handleNext}
              className="px-8 py-2.5 rounded-full border-2 border-amber-400 bg-gradient-to-r from-amber-400/20 via-black/80 to-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-black font-mono text-xs tracking-[0.25em] uppercase font-bold flex items-center gap-2.5 transition-all shadow-[0_0_25px_rgba(234,179,8,0.35)] hover:shadow-[0_0_40px_rgba(234,179,8,0.6)] cursor-pointer backdrop-blur-md"
            >
              <span>{currentSceneIndex === SCENES.length - 1 ? 'COMPLETE DOSSIER' : 'NEXT QUESTION'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-[9.5px] tracking-[0.28em] text-white/50 uppercase">
            <span className="w-8 h-[1px] bg-amber-400/30" />
            <span className="text-amber-400/80">BUILDING PEOPLE BEFORE BRANDS</span>
          </div>
        </footer>
      )}
    </motion.div>
  );
}
export default TalentAssessmentModal;
