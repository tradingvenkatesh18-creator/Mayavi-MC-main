import React, { useState, useEffect, useRef } from 'react';
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
  Camera,
  Layers,
  FileText,
  UserCheck,
  Film,
  Compass,
  CheckCircle2,
  Info
} from 'lucide-react';

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
  // ACT 1: PERSONALITY DISCOVERY
  {
    actNum: 1,
    actName: "PERSONALITY",
    actHeader: "ACT 01 // SCENE 1 - PERSONALITY DISCOVERY",
    eyebrow: "// SPONTANEITY UNDER PRESSURE",
    headlinePrefix: "A director suddenly changes your scene",
    headlineHighlight: "seconds before rolling.",
    scriptQuote: "“You are standing on mark under full studio lighting. The director walks up and alters your entire character intention. Your immediate instinct is to...”",
    directorInsight: "Directors test how you handle sudden cognitive disruption. In 9:16 vertical cinema, hesitations are magnified 3x. We want to see whether you freeze, over-analyze, or organically pivot inside the frame.",
    tags: ["SPONTANEITY", "DIRECTOR DYNAMIC", "IMPULSE"],
    options: [
      { 
        letter: "A", 
        title: "Improvise confidently with immediate impulse", 
        desc: "You embrace the chaos and trust your instincts in the frame.",
        directorCritique: "Demonstrates high somatic bravery and zero friction. Directors love this because it saves expensive production time and creates lightning-in-a-bottle authentic takes.",
        actingMethod: "Meisner Intuitive Reflex",
        scores: { improv: 25, camera: 15, emotion: 15, imag: 15 } 
      },
      { 
        letter: "B", 
        title: "Ask for clarifying notes on motivation and rhythm", 
        desc: "You calibrate beats and intention before committing to camera.",
        directorCritique: "Signals an architect actor who values script geometry and narrative intention over chaotic novelty.",
        actingMethod: "Stanislavski Action Analysis",
        scores: { improv: 10, camera: 15, emotion: 20, imag: 15 } 
      },
      { 
        letter: "C", 
        title: "Observe fellow cast members to synchronize", 
        desc: "You gauge the room's energy and find harmonic support.",
        directorCritique: "Shows an ensemble-first player who reads spatial cues and protects group chemistry under pressure.",
        actingMethod: "Viewpoints Spatial Grid",
        scores: { improv: 15, camera: 15, emotion: 15, imag: 20 } 
      },
      { 
        letter: "D", 
        title: "Acknowledge the adrenaline and ground your breath", 
        desc: "You channel nervous tension into raw internal truth.",
        directorCritique: "Deep physiological self-regulation. You convert adrenaline into authentic character vulnerability instead of tension.",
        actingMethod: "Somatic Breath Realism",
        scores: { improv: 10, camera: 10, emotion: 25, imag: 10 } 
      }
    ]
  },
  {
    actNum: 1,
    actName: "PERSONALITY",
    actHeader: "ACT 01 // SCENE 2 - SOCIAL ENERGY & PRESENCE",
    eyebrow: "// SOCIAL GRAVITATIONAL FIELD",
    headlinePrefix: "At a cast gathering or wrap party,",
    headlineHighlight: "you usually...",
    scriptQuote: "“The room is crowded with cinematographers, producers, and actors. Glass clinking and ambient chatter surround you. Where is your gravity?”",
    directorInsight: "We are assessing your involuntary status projection and social observation skills. An actor's off-screen observation habits directly feed their on-screen nuance.",
    tags: ["SOCIAL GRAVITY", "CHARACTER STUDY", "PRESENCE"],
    options: [
      { 
        letter: "A", 
        title: "Become the natural entertainer holding the floor", 
        desc: "You project charisma and hold the room effortlessly.",
        directorCritique: "High optical and acoustic projection. Natural magnetic lead energy that translates effortlessly to commercial and action genres.",
        actingMethod: "Extroverted Magnetism",
        scores: { improv: 25, camera: 25, emotion: 10, imag: 15 } 
      },
      { 
        letter: "B", 
        title: "Observe body language, eye contact, and micro-tensions", 
        desc: "Quietly studying behavioral nuances for future roles.",
        directorCritique: "The classic behavioral sponge. You catalog authentic human ticks and vulnerabilities that elevate prestige drama roles.",
        actingMethod: "Behavioral Dissection",
        scores: { improv: 10, camera: 15, emotion: 20, imag: 25 } 
      },
      { 
        letter: "C", 
        title: "Connect deeply in one-on-one intimate dialogue", 
        desc: "You trade shallow banter for authentic emotional substance.",
        directorCritique: "Intense emotional conductivity. You create microscopic chemistry in two-character close-ups with minimal dialogue.",
        actingMethod: "Intimate Resonance",
        scores: { improv: 15, camera: 15, emotion: 25, imag: 15 } 
      },
      { 
        letter: "D", 
        title: "Stay quiet and absorb the atmospheric vibe", 
        desc: "Preserving your artistic reservoir and enigmatic presence.",
        directorCritique: "Enigmatic stillness. The camera is naturally magnetized to still characters because it forces the viewer to lean in.",
        actingMethod: "Subtext Stillness",
        scores: { improv: 10, camera: 10, emotion: 20, imag: 20 } 
      }
    ]
  },
  {
    actNum: 1,
    actName: "PERSONALITY",
    actHeader: "ACT 01 // SCENE 3 - CORE ARTISTIC FUEL",
    eyebrow: "// PRIMAL CREATIVE MOTIVATION",
    headlinePrefix: "Your biggest motivation as a performer is",
    headlineHighlight: "what drives you most?",
    scriptQuote: "“When the soundstage goes dark and the monitors turn off, what single reward makes the sleepless rehearsals worthwhile?”",
    directorInsight: "Your artistic motivation determines how you respond to harsh notes and grueling 14-hour set days. Directors align roles with actors whose fuel matches the project's scale.",
    tags: ["CORE PURPOSE", "AMBITION", "ARTISTIC VOICE"],
    options: [
      { 
        letter: "A", 
        title: "Fame & worldwide cultural footprint", 
        desc: "Leaving an unforgettable iconographic imprint across the globe.",
        directorCritique: "High star-power ambition. You seek the cultural spotlight, making you fearless in large promotional campaigns and blockbuster cinema.",
        actingMethod: "Iconographic Ambition",
        scores: { improv: 20, camera: 25, emotion: 10, imag: 10 } 
      },
      { 
        letter: "B", 
        title: "Authentic storytelling that transforms human hearts", 
        desc: "Serving the truth of the narrative above personal vanity.",
        directorCritique: "Pure narrative humility. You will sacrifice personal glamour to portray raw, uncomfortable human truths.",
        actingMethod: "Cathartic Storytelling",
        scores: { improv: 15, camera: 15, emotion: 25, imag: 25 } 
      },
      { 
        letter: "C", 
        title: "Financial freedom & high-value industry leverage", 
        desc: "Building generational security and creative executive control.",
        directorCritique: "Pragmatic professional discipline. You view acting as elite craftsmanship and treat production budgets with high respect.",
        actingMethod: "Strategic Craftsmanship",
        scores: { improv: 15, camera: 15, emotion: 10, imag: 15 } 
      },
      { 
        letter: "D", 
        title: "Peer recognition & mastercraft legacy", 
        desc: "Earning the reverence of master filmmakers and fellow auteurs.",
        directorCritique: "Auteur alignment. You are driven by artistic excellence, making you a dream collaborator for visionary festival directors.",
        actingMethod: "Mastercraft Pursuit",
        scores: { improv: 15, camera: 20, emotion: 20, imag: 20 } 
      }
    ]
  },
  {
    actNum: 1,
    actName: "PERSONALITY",
    actHeader: "ACT 01 // SCENE 4 - GENRE RESONANCE",
    eyebrow: "// RHYTHMIC TONE ALIGNMENT",
    headlinePrefix: "Which cinematic genre electrifies your soul",
    headlineHighlight: "more than any other?",
    scriptQuote: "“Every performer's nervous system beats to a distinct frequency. Which world calls your name?”",
    directorInsight: "Genre selection reveals your nervous system's native rhythm. Comedy requires microsecond tempo; drama requires sitting in silence; action requires physical spatial dominance.",
    tags: ["GENRE AFFINITY", "TEMPO", "EXPRESSION"],
    options: [
      { 
        letter: "A", 
        title: "Comedy — precision timing, subversion & wit", 
        desc: "Mastering instantaneous rhythm and delighting human spirits.",
        directorCritique: "Mathematical timing mastery. You understand how tiny vocal inflections and eyebrow lifts puncture dramatic tension.",
        actingMethod: "Subversive Timing",
        scores: { improv: 25, camera: 20, emotion: 15, imag: 15 } 
      },
      { 
        letter: "B", 
        title: "Drama — psychological depth, moral nuance & silence", 
        desc: "Confronting visceral human sorrow and complicated redemption.",
        directorCritique: "Comfort with moral ambiguity. You possess the emotional stamina needed for high-stakes festival cinema and auteur character studies.",
        actingMethod: "Psychological Realism",
        scores: { improv: 10, camera: 15, emotion: 25, imag: 20 } 
      },
      { 
        letter: "C", 
        title: "Action — kinetic velocity, physical stunts & adrenaline", 
        desc: "Expressing narrative momentum through explosive body geometry.",
        directorCritique: "Dynamic spatial dominance. You understand how camera parallax and physical acceleration amplify heroic tension.",
        actingMethod: "Kinetic Physicality",
        scores: { improv: 20, camera: 25, emotion: 10, imag: 15 } 
      },
      { 
        letter: "D", 
        title: "Romance — chemistry, subtle glances & vulnerability", 
        desc: "The quiet electric charge between two people across space.",
        directorCritique: "Micro-ocular calibration. You excel in 85mm portrait telephoto lenses where chemistry is communicated entirely through the eyes.",
        actingMethod: "Ocular Intimacy",
        scores: { improv: 15, camera: 15, emotion: 25, imag: 20 } 
      }
    ]
  },

  // ACT 2: EMOTIONAL INTELLIGENCE
  {
    actNum: 2,
    actName: "EMOTIONAL INT.",
    actHeader: "ACT 02 // SCENE 5 - ENSEMBLE CRISIS RESPONSE",
    eyebrow: "// SCREEN EMPATHY UNDER LIVE CAMERA",
    headlinePrefix: "A fellow actor forgets their dialogue",
    headlineHighlight: "during a continuous long-take.",
    scriptQuote: "“The camera is circling you both in minute four of an intense master shot. Dead silence falls. What do you do?”",
    directorInsight: "This evaluates your ensemble generosity vs self-preservation. Great actors protect the scene, not just their own ego.",
    tags: ["ENSEMBLE AGILITY", "GENEROSITY", "CRISIS REFLEX"],
    options: [
      { 
        letter: "A", 
        title: "Help them naturally while staying fully in character", 
        desc: "Elite ensemble anchor: you invent a cue that saves the take seamlessly.",
        directorCritique: "The director's holy grail. You save thousands in re-lighting and camera resets while making your scene partner look brilliant.",
        actingMethod: "Ensemble Armor",
        scores: { improv: 25, camera: 20, emotion: 25, imag: 20 } 
      },
      { 
        letter: "B", 
        title: "Hold your pause with intentional, pregnant silence", 
        desc: "You let the tension simmer as character subtext, buying them time.",
        directorCritique: "Cinematic composure. You use the silence as a dramatic weapon, transforming a memory lapse into gripping subtext.",
        actingMethod: "Patience Suspension",
        scores: { improv: 15, camera: 25, emotion: 20, imag: 20 } 
      },
      { 
        letter: "C", 
        title: "Freeze and look off-camera for the director's cut", 
        desc: "You respect script boundaries and await technical resets.",
        directorCritique: "Technical fidelity. You prioritize script mechanics, though on-set improvisation workshops will liberate your reflex.",
        actingMethod: "Script Adherence",
        scores: { improv: 5, camera: 10, emotion: 10, imag: 10 } 
      },
      { 
        letter: "D", 
        title: "Step out of scene to whisper their cue", 
        desc: "Practical troubleshooter, sacrificing scene illusion for mechanics.",
        directorCritique: "Shows a troubleshooter mentality. You break fiction to help, which signals collaborative goodwill but breaks the take.",
        actingMethod: "Mechanic Rescue",
        scores: { improv: 10, camera: 10, emotion: 10, imag: 15 } 
      }
    ]
  },

  // ACT 3: ACTING SCENARIOS
  {
    actNum: 3,
    actName: "ACTING SCENARIOS",
    actHeader: "ACT 03 // SCENE 6 - THE BETRAYAL REFLEX",
    eyebrow: "// SUBTEXT & STATUS UNDER BETRAYAL",
    headlinePrefix: "You discover your closest friend has",
    headlineHighlight: "deliberately betrayed you.",
    scriptQuote: "“The door clicks shut behind you. The evidence of deception lies on the table. Choose how your character reacts:”",
    directorInsight: "Directors look for subtextual contrast. Amateur actors scream when angry; master actors compress rage into terrifying calm or tragic irony.",
    tags: ["EMOTIONAL CONTROL", "EXPRESSION", "STATUS"],
    options: [
      { 
        letter: "A", 
        title: "Become angry immediately — explosive fury", 
        desc: "High kinetic range: shouting, physical disruption, burning rage.",
        directorCritique: "High kinetic expression. Provides instant cinematic fireworks, ideal for climax confrontations and intense trailers.",
        actingMethod: "Kinetic Detonation",
        scores: { improv: 20, camera: 20, emotion: 15, imag: 15 } 
      },
      { 
        letter: "B", 
        title: "Stay silent — icy, impenetrable stillness", 
        desc: "Subsurface combustion: your stillness terrifies the room.",
        directorCritique: "The Marlon Brando principle. Cold silence is ten times more terrifying on a 50mm Prime lens than screaming.",
        actingMethod: "Internal Compression",
        scores: { improv: 10, camera: 25, emotion: 25, imag: 20 } 
      },
      { 
        letter: "C", 
        title: "Laugh sarcastically — bittersweet irony", 
        desc: "A psychological shield transforming raw pain into mocking humor.",
        directorCritique: "Complex psychological layering. Smiling through devastation reveals high intellectual and emotional nuance.",
        actingMethod: "Bittersweet Defense",
        scores: { improv: 20, camera: 20, emotion: 20, imag: 25 } 
      },
      { 
        letter: "D", 
        title: "Walk away — calm, total emotional severance", 
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
    actHeader: "ACT 03 // SCENE 7 - THE VISCERAL TRAGEDY",
    eyebrow: "// GRIEF ANATOMY IN CLOSE-UP",
    headlinePrefix: "Your character loses their child.",
    headlineHighlight: "What emotion appears first?",
    scriptQuote: "“Extreme close-up lens on your eyes. Ambient studio sound drops out to complete vacuum. What emotion surfaces first?”",
    directorInsight: "Grief is rarely symmetrical. The first shock of catastrophe often presents as denial or sensory numbness rather than instant tears.",
    tags: ["GRIEF PATHWAY", "MICRO-EXPRESSION", "AUTHENTICITY"],
    options: [
      { 
        letter: "A", 
        title: "Denial — an immediate, desperate refusal to believe", 
        desc: "“No. You have the wrong name. Check again.”",
        directorCritique: "Profound psychological realism. Denial gives the audience a tragic ray of hope before reality crushes it.",
        actingMethod: "Cognitive Disbelief",
        scores: { improv: 15, camera: 20, emotion: 25, imag: 20 } 
      },
      { 
        letter: "B", 
        title: "Anger — violent fury directed at the messenger", 
        desc: "Lashing out at the cruelty of reality with physical rage.",
        directorCritique: "Combative grief. You externalize despair through revolt, creating strong physical dynamics with scene partners.",
        actingMethod: "Combative Grief",
        scores: { improv: 20, camera: 20, emotion: 15, imag: 15 } 
      },
      { 
        letter: "C", 
        title: "Shock — paralyzing numbness and sensory shutdown", 
        desc: "Senses detach from the body; a hollow, petrified void.",
        directorCritique: "Subsurface trauma. Ideal for high-definition cinema where pupil contractions and breath changes narrate the horror.",
        actingMethod: "Autonomic Shock",
        scores: { improv: 10, camera: 25, emotion: 25, imag: 20 } 
      },
      { 
        letter: "D", 
        title: "Crying — immediate, uncontrollable sobbing and collapse", 
        desc: "Instant surrender to the catastrophic flood of grief.",
        directorCritique: "Immediate affective conduit. You possess fast-reacting tear and emotional channels for heart-wrenching melodramas.",
        actingMethod: "Affective Flood",
        scores: { improv: 15, camera: 15, emotion: 25, imag: 15 } 
      }
    ]
  },
  {
    actNum: 3,
    actName: "ACTING SCENARIOS",
    actHeader: "ACT 03 // SCENE 8 - PUBLIC CONFRONTATION",
    eyebrow: "// STATUS COMBAT UNDER FLASHES",
    headlinePrefix: "Someone insults you publicly in front of",
    headlineHighlight: "a hostile press conference.",
    scriptQuote: "“Fifty camera flashes go off. Microphones are shoved into your face. What is your instantaneous reply?”",
    directorInsight: "Public status confrontations reveal how you command group focus. Whether through silence, venom, or humor, directors analyze your vocal cadence and status control.",
    tags: ["COMPOSURE", "STATUS BATTLE", "VOCAL CONTROL"],
    options: [
      { 
        letter: "A", 
        title: "Fight back — strike with lethal verbal eloquence", 
        desc: "Exposing their ignorance publicly with surgical wit.",
        directorCritique: "Ruthless rhetorical power. Commands courtroom, political thrillers, and razor-sharp dialogue dramas.",
        actingMethod: "Rhetorical Attack",
        scores: { improv: 25, camera: 20, emotion: 15, imag: 15 } 
      },
      { 
        letter: "B", 
        title: "Ignore — look past them as if they do not exist", 
        desc: "Absolute royal indifference: rendering them completely invisible.",
        directorCritique: "Royal status hierarchy. By withholding eye contact, you render the attacker powerless in the public eye.",
        actingMethod: "Royal Indifference",
        scores: { improv: 15, camera: 25, emotion: 20, imag: 15 } 
      },
      { 
        letter: "C", 
        title: "Make a joke — disarm the entire room with charm", 
        desc: "The gallery laughs with you; your opponent looks foolish.",
        directorCritique: "Masterful charismatic deflection. You weaponize charm to convert a hostile crowd into allies.",
        actingMethod: "Charismatic Pivot",
        scores: { improv: 25, camera: 25, emotion: 15, imag: 20 } 
      },
      { 
        letter: "D", 
        title: "Stay calm — hold unwavering eye contact in silence", 
        desc: "Psychological weight that makes them squirm and back down.",
        directorCritique: "Gravitational dominance. Silence forces the opponent to keep speaking until they reveal their own foolishness.",
        actingMethod: "Gravitational Stillness",
        scores: { improv: 10, camera: 25, emotion: 25, imag: 20 } 
      }
    ]
  },

  // ACT 4: CAMERA CONFIDENCE
  {
    actNum: 4,
    actName: "CAMERA CONF.",
    actHeader: "ACT 04 // SCENE 9 - MEDIUM CALIBRATION",
    eyebrow: "// ENERGY PROJECTION VS INTIMACY",
    headlinePrefix: "Would you rather",
    headlineHighlight: "perform live or record yourself?",
    scriptQuote: "“Are you drawn to the acoustic space of physical theatre or the microscopic intimacy of an 8K digital sensor?”",
    directorInsight: "Theatre requires whole-body projection and vocal resonance; cinema requires internalized subtlety and spatial discipline around camera marks.",
    tags: ["LIVE STAGE", "SCREEN LENS", "PROJECTION"],
    options: [
      { 
        letter: "A", 
        title: "Perform — live in the physical room with real humans", 
        desc: "You feed on immediate acoustic response and room electricity.",
        directorCritique: "Physical acoustic presence. You project energy across physical space, essential for broad theatre and stage command.",
        actingMethod: "Stage Acoustics",
        scores: { improv: 25, camera: 10, emotion: 20, imag: 20 } 
      },
      { 
        letter: "B", 
        title: "Record yourself — close to the lens with micro-movements", 
        desc: "You thrive on subtle pupil dilations and understated nuance.",
        directorCritique: "Natural screen magnetism. You trust that the lens will catch every twitch, breath, and micro-thought.",
        actingMethod: "Optic Intimacy",
        scores: { improv: 10, camera: 25, emotion: 25, imag: 20 } 
      }
    ]
  },
  {
    actNum: 4,
    actName: "CAMERA CONF.",
    actHeader: "ACT 04 // SCENE 10 - ARENA RESONANCE",
    eyebrow: "// AUDIENCE FEEDBACK VS CAMERA SANCTUARY",
    headlinePrefix: "Would you enjoy",
    headlineHighlight: "a live audience or a film camera?",
    scriptQuote: "“Where does your artistic courage flourish with the least inhibition?”",
    directorInsight: "Understanding your comfort zone allows casting directors to pair you with the right medium or design a bridge program for your screen transition.",
    tags: ["AUDIENCE VOLTAGE", "LENS PRECISION"],
    options: [
      { 
        letter: "A", 
        title: "Live audience — feeling a packed auditorium gasp", 
        desc: "The raw adrenaline of hundreds of breathing spectators.",
        directorCritique: "Collective voltage junkie. You turn fear into communal adrenaline, excelling in live tours and theatrical stagings.",
        actingMethod: "Collective Feedback",
        scores: { improv: 25, camera: 10, emotion: 20, imag: 20 } 
      },
      { 
        letter: "B", 
        title: "Film camera — whisper-quiet set with 50mm Prime lens", 
        desc: "A sacred cinematic sanctuary where no eyes disturb your craft.",
        directorCritique: "Sacred studio focus. You thrive in the sterile, controlled quietude where you and the lens exist in pure intimacy.",
        actingMethod: "Sacred Set Focus",
        scores: { improv: 15, camera: 25, emotion: 25, imag: 20 } 
      }
    ]
  },
  {
    actNum: 4,
    actName: "CAMERA CONF.",
    actHeader: "ACT 04 // SCENE 11 - THE VULNERABILITY MATRIX",
    eyebrow: "// CONFRONTING THE ARTISTIC NIGHTMARE",
    headlinePrefix: "Which of these fears",
    headlineHighlight: "scares you most?",
    scriptQuote: "“To master the screen, an actor must name their deepest creative vulnerability:”",
    directorInsight: "Every master actor has a friction point. By diagnosing whether your fear is text-based, optical, public, or identity-based, directors can unlock your breakthrough.",
    tags: ["FEAR MATRIX", "SELF-AWARENESS", "GROWTH VECTOR"],
    options: [
      { 
        letter: "A", 
        title: "Forget dialogue — blanking on lines mid-scene", 
        desc: "The terror of sudden memory lapse before peers.",
        directorCritique: "Text dependency. Our academy training frees you from syllables to focus on underlying visceral intention.",
        actingMethod: "Subtext Liberation",
        scores: { improv: 15, camera: 15, emotion: 15, imag: 15 } 
      },
      { 
        letter: "B", 
        title: "Camera — the unblinking lens inches from your skin", 
        desc: "The fear of being scrutinised under ultra-sharp 8K resolution.",
        directorCritique: "Optical exposure hesitation. We train you to treat the lens not as a microscope, but as a trusted co-conspirator.",
        actingMethod: "Optic Demystification",
        scores: { improv: 20, camera: 10, emotion: 20, imag: 20 } 
      },
      { 
        letter: "C", 
        title: "Audience — cold indifference from spectators", 
        desc: "The dread of performing into unresponsive silence.",
        directorCritique: "Validation anxiety. We cultivate self-contained conviction so external silence never disrupts your character truth.",
        actingMethod: "Internal Conviction",
        scores: { improv: 15, camera: 20, emotion: 15, imag: 20 } 
      },
      { 
        letter: "D", 
        title: "Judgement — harsh critical dissection of your soul", 
        desc: "Having your raw emotional vulnerability mocked or invalidated.",
        directorCritique: "Ego-boundary vulnerability. True acting requires stripping ego to let the character live without personal defense.",
        actingMethod: "Ego Transcendence",
        scores: { improv: 15, camera: 15, emotion: 25, imag: 15 } 
      }
    ]
  },

  // ACT 5: CREATIVE THINKING
  {
    actNum: 5,
    actName: "CREATIVE MIND",
    actHeader: "ACT 05 // SCENE 12 - THE DETECTIVE SCENARIO",
    eyebrow: "// NARRATIVE WORLDBUILDING & IMAGINATION",
    headlinePrefix: "Imagine you are a detective.",
    headlineHighlight: "A stranger drops a mysterious box.",
    scriptQuote: "“Midnight on a rain-slicked train platform. Steam hisses from locomotive wheels. The stranger vanishes into fog, leaving a brass-bound wooden box on the cobblestones. What happens next?”",
    directorInsight: "This evaluates worldbuilding intelligence. Actors who visualize tactile sensory details (runes, steam, reverse clocks) bring richer unscripted textures to every take.",
    tags: ["WORLDBUILDING", "DRAMATIC INSTINCT", "SUBTEXT"],
    options: [
      { 
        letter: "A", 
        title: "Glove your fingers and inspect the cryptic Nordic runes etched along its seam", 
        desc: "Analytical, methodical realism: building suspense through meticulous observation.",
        directorCritique: "Methodical realism. You treat props as story engines, giving cinematic close-ups incredible authenticity.",
        actingMethod: "Sensory Realism",
        scores: { improv: 10, camera: 20, emotion: 20, imag: 25 } 
      },
      { 
        letter: "B", 
        title: "Sprint through the steam into the fog to tackle the stranger before they vanish", 
        desc: "Visceral action instinct: character acts on adrenaline and physical momentum.",
        directorCritique: "Kinetic impulse. You drive narrative velocity forward with urgency and high physical presence.",
        actingMethod: "Narrative Propulsion",
        scores: { improv: 25, camera: 25, emotion: 10, imag: 20 } 
      },
      { 
        letter: "C", 
        title: "Slowly unlatch the lid — finding an antique watch ticking steadily in reverse", 
        desc: "Poetic, psychological surrealism: transforming mystery into existential wonder.",
        directorCritique: "Poetic surrealism. You naturally perceive philosophical and thematic depth inside ordinary genre premises.",
        actingMethod: "Poetic Subtext",
        scores: { improv: 15, camera: 20, emotion: 25, imag: 25 } 
      },
      { 
        letter: "D", 
        title: "Signal your undercover partner across the tracks while keeping your hand on your holster", 
        desc: "High-stakes tactical discipline: playing the ensemble geometry and tactical tension.",
        directorCritique: "Tactical ensemble discipline. You play the wider geometry of the scene, utilizing space and partners instinctively.",
        actingMethod: "Spatial Geometry",
        scores: { improv: 20, camera: 20, emotion: 15, imag: 20 } 
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
  const [activeEngineTab, setActiveEngineTab] = useState<'diagnosis' | 'scenes' | 'optics' | 'casting'>('diagnosis');

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
        lensProfile: "50mm Zeiss Supreme Prime T1.5 // Shallow Depth of Field // Soft Chiaroscuro Rim Lighting",
        castingRoles: ["Complex Anti-Hero Lead", "Wounded Protagonist", "Psychological Thriller Detective", "Intense Period Drama Lead"]
      };
    } else if (maxScore === scores.camera) {
      return {
        title: "The Enigmatic Screen Presence",
        badge: "OPTICAL MAGNETISM // CLASS A",
        quote: "“The camera lens does not just capture you — it gravitates toward your stillness.”",
        track: "Mayavi Anamorphic Screen Acting & High-End Commercial Masterclass",
        rationale: "You possess rare optical discipline. You instinctively know that 8K digital sensors capture thoughts, not just actions. Your choices favored stillness, royal status holding, and quiet eye contact over frantic motion. Directors can place you in an extreme macro close-up and trust you to hold the frame without fidgeting.",
        strengths: ["Effortless Status Projection", "Lens Discipline & Mark Precision", "Controlled Vocal Pacing", "Stillness Magnetism"],
        blindspot: "Avoid emotional stiffness; maintain fluid breath so still composure never reads as detachment.",
        lensProfile: "85mm Cooke Anamorphic /i Full Frame Plus // 2x Squeeze Oval Bokeh // High Key Contrast",
        castingRoles: ["High-Status Executive Lead", "Enigmatic Mystery Figure", "Luxury Commercial Headliner", "Diplomat / Monarch"]
      };
    } else if (maxScore === scores.imag) {
      return {
        title: "The Visionary Narrative Architect",
        badge: "WORLDBUILDING & SUBTEXT // CLASS A",
        quote: "“You see entire worlds and thematic geometries behind a single line of script.”",
        track: "Mayavi Directing, Theatre & Pre-Visualization Cohort",
        rationale: "You approach acting as a co-creator and worldbuilder. In creative scenarios, you chose tactile details, mysterious subtext, and overarching dramatic rhythm. You understand where the camera is looking and why the scene matters to the overarching narrative arc.",
        strengths: ["Tactile Prop & Scene Integration", "Unscripted Subtext Creation", "Macro Narrative Awareness", "Auteur Alignment"],
        blindspot: "Do not get so lost in intellectual worldbuilding that you delay the raw emotional impulse of the moment.",
        lensProfile: "35mm ARRI Signature Prime T1.8 // Wide Environmental Framing // Volumetric Atmospheric Haze",
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
      lensProfile: "40mm Leica Noctilux F/0.95 // Fluid Steadicam Motion // Kinetic Golden Hour Lighting",
      castingRoles: ["Charismatic Maverick Lead", "Fast-Talking Wit / Comedy Catalyst", "High-Octane Action Lead", "Dynamic Ensemble Anchor"]
    };
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-[#07060B] overflow-hidden select-none"
    >
      {/* Soundstage Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-45"
        style={{
          backgroundImage: `radial-gradient(ellipse at 80% 50%, rgba(7,6,11,0.4) 0%, rgba(7,6,11,0.95) 80%), radial-gradient(ellipse at 20% 40%, rgba(7,6,11,0.3) 0%, rgba(7,6,11,0.95) 75%), url('/studio_soundstage_bg.jpg')`
        }}
      />

      {/* Optical Viewfinder Corner Framing Lines */}
      <div className="fixed top-4 left-4 w-5 h-5 border-t border-l border-amber-400/40 pointer-events-none z-50" />
      <div className="fixed top-4 right-4 w-5 h-5 border-t border-r border-amber-400/40 pointer-events-none z-50" />
      <div className="fixed bottom-4 left-4 w-5 h-5 border-b border-l border-amber-400/40 pointer-events-none z-50" />
      <div className="fixed bottom-4 right-4 w-5 h-5 border-b border-r border-amber-400/40 pointer-events-none z-50" />

      {/* Top Header HUD Navigation */}
      <header className="relative z-30 px-6 sm:px-10 py-4 flex items-center justify-between border-b border-white/[0.07] bg-[#07060B]/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-display font-extrabold text-black text-base shadow-[0_0_20px_rgba(234,179,8,0.4)]">
              M
            </div>
            <div className="leading-none">
              <div className="font-display font-bold text-sm tracking-[0.14em] text-white uppercase">MAYAVI</div>
              <div className="font-mono text-[8.5px] tracking-[0.2em] text-white/40 uppercase mt-0.5">MEDIA CREATIONS</div>
            </div>
          </div>

          <div className="hidden sm:block h-6 w-[1px] bg-white/10 mx-1" />

          <div className="hidden sm:block font-mono text-[10px] tracking-[0.22em] text-white/50 uppercase">
            AUDITION ENGINE <span className="text-amber-400/80 mx-1">//</span> 2026 COHORT
          </div>
        </div>

        <div className="hidden md:block font-mono text-[11px] tracking-[0.32em] text-white/70 uppercase">
          {isCompleted ? "DIRECTOR'S EVALUATION ENGINE" : "DIRECTOR'S ROOM"}
        </div>

        <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] text-white/50">
          <div className="hidden sm:flex items-center gap-2 text-white/40">
            <span>24 FPS</span>
            <span className="text-white/20">|</span>
            <span>180.0°</span>
            <span className="text-white/20">|</span>
            <span>5600K</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#EAB308]" />
            <span className="text-amber-400 font-semibold tracking-wider">REC</span>
          </div>

          <button 
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playClick();
            }}
            className="w-7 h-7 rounded-full border border-white/10 hover:border-amber-400/60 flex items-center justify-center text-white/50 hover:text-amber-400 transition-colors ml-1 cursor-pointer"
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer ml-2"
            title="Exit Audition"
          >
            <X size={15} />
          </button>
        </div>
      </header>

      {/* Act Breadcrumb & Progress Bar */}
      {!isCompleted && (
        <div className="relative z-30 px-6 sm:px-12 pt-5 pb-2">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.22em] mb-2.5">
            <div className="text-amber-400 font-medium uppercase">
              {currentScene.actHeader}
            </div>

            <div className="text-white/60">
              TAKE <span className="text-white font-bold">{String(currentSceneIndex + 1).padStart(2, '0')}</span> / 12 
              <span className="text-amber-400 font-bold ml-2">[ {String(progressPercent).padStart(2, '0')}% ]</span>
            </div>
          </div>

          <div className="relative w-full h-[2px] bg-white/[0.08] rounded-full overflow-visible">
            <div 
              className="absolute top-0 left-0 h-full bg-amber-400 shadow-[0_0_10px_#EAB308] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
            <div 
              className="absolute top-[-3px] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_#FDE047] transition-all duration-300"
              style={{ left: `calc(${progressPercent}% - 4px)` }}
            />
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <main className="relative z-20 flex-1 flex flex-col md:flex-row items-start px-6 sm:px-12 py-4 md:py-6 gap-8 max-w-7xl mx-auto w-full overflow-y-auto">
        {!isCompleted ? (
          <>
            {/* Left Filmstrip Sidebar */}
            <aside className="hidden md:flex flex-col items-center shrink-0 w-24 pt-2">
              <div className="font-mono text-[9px] tracking-[0.25em] text-amber-400 uppercase text-center mb-0.5">
                ACT 0{currentScene.actNum}
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-white/80 font-bold uppercase text-center mb-4">
                {currentScene.actName}
              </div>

              <div className="flex flex-col gap-2.5 mb-6">
                {[
                  { act: 1, img: "/talent_development.png", title: "Act 1" },
                  { act: 2, img: "/founder_portrait.png", title: "Act 2" },
                  { act: 3, img: "/testimonial_executive.png", title: "Act 3" },
                  { act: 4, img: "/academy_mentorship.png", title: "Act 4" },
                  { act: 5, img: "/showreel_act1.png", title: "Act 5" },
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
                    className={`relative w-[58px] h-[48px] rounded-lg overflow-hidden border cursor-pointer transition-all duration-300 ${
                      currentScene.actNum === item.act 
                        ? 'border-2 border-amber-400 shadow-[0_0_20px_rgba(234,179,8,0.45)]' 
                        : 'border-white/10 hover:border-amber-400/60 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1.5 font-mono text-[9px] font-bold text-white/90 drop-shadow">
                      0{item.act}
                    </span>
                  </div>
                ))}
              </div>

              <div className="font-mono text-[8.5px] tracking-[0.25em] text-white/30 text-center uppercase leading-tight">
                <div>05 ACTS</div>
                <div>12 SCENES</div>
              </div>
            </aside>

            {/* Question Stage */}
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
                    <div className="font-mono text-xs tracking-[0.28em] text-[#EAB308] uppercase">
                      {currentScene.eyebrow}
                    </div>

                    {/* Toggle Director's Insight Note */}
                    <button
                      onClick={() => setShowSceneInsight(!showSceneInsight)}
                      className="px-2.5 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 text-[9px] font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
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
                        <div className="p-4 rounded-xl bg-amber-500/[0.08] border border-amber-400/30 text-xs text-white/80 font-mono leading-relaxed space-y-1">
                          <div className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                            DIRECTOR'S EVALUATION CRITERIA:
                          </div>
                          <div>{currentScene.directorInsight}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.12]">
                    {currentScene.headlinePrefix} <span className="text-[#EAB308]">{currentScene.headlineHighlight}</span>
                  </h1>

                  <p className="font-serif italic text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
                    {currentScene.scriptQuote}
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    {currentScene.tags.map(t => (
                      <span key={t} className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 font-mono text-[9.5px] tracking-[0.2em] text-white/60 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Options List */}
                  <div className="flex flex-col gap-3 pt-3">
                    {currentScene.options.map((opt, idx) => {
                      const isSelected = selectedOptionIndex === idx;
                      return (
                        <div
                          key={opt.letter}
                          onClick={() => {
                            playClick();
                            setSelectedOptionIndex(idx);
                          }}
                          className={`px-5 py-4 flex flex-col gap-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                            isSelected 
                              ? 'bg-amber-950/40 border-2 border-amber-400 shadow-[0_0_28px_rgba(234,179,8,0.28)]' 
                              : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-amber-400/50'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-[38px] h-[38px] rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all ${
                                isSelected 
                                ? 'bg-amber-400/20 border border-amber-400 text-amber-400 shadow-[0_0_12px_rgba(234,179,8,0.3)]' 
                                : 'bg-white/5 border border-white/10 text-white/70'
                              }`}>
                                {opt.letter}
                              </div>

                              <div>
                                <div className="font-display font-semibold text-sm sm:text-base text-white/95 leading-snug">
                                  {opt.title}
                                </div>
                                <div className="font-body text-xs text-white/50 mt-0.5 leading-normal">
                                  {opt.desc}
                                </div>
                              </div>
                            </div>

                            <div className={`shrink-0 transition-colors ${isSelected ? 'text-amber-400' : 'text-white/20'}`}>
                              <ArrowRight size={18} />
                            </div>
                          </div>

                          {/* Live Director's Critique on Selected Option */}
                          {isSelected && (
                            <motion.div 
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 pt-2 border-t border-amber-400/20 flex items-start gap-2"
                            >
                              <span className="font-mono text-[9px] uppercase tracking-wider text-amber-400 font-bold shrink-0 mt-0.5">
                                [ DIRECTOR'S TAKE ]:
                              </span>
                              <span className="font-body text-xs text-amber-200/80 leading-relaxed">
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
                {/* Dossier Top Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] text-[#EAB308] uppercase mb-1">
                      // AUDITION DOSSIER NO: MMC-2026-{Math.floor(1000 + Math.random() * 9000)}
                    </div>
                    <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-none">
                      {archetype.title}
                    </h1>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono text-[10px] tracking-widest uppercase shrink-0">
                    {archetype.badge}
                  </div>
                </div>

                <p className="font-serif italic text-xl sm:text-2xl text-amber-300/90 leading-relaxed">
                  {archetype.quote}
                </p>

                {/* Trait Score Gauges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="font-mono text-[8.5px] tracking-widest text-[#EAB308] uppercase mb-1">EMOTIONAL DEPTH</div>
                    <div className="font-display font-bold text-xl text-white">94%</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="font-mono text-[8.5px] tracking-widest text-[#EAB308] uppercase mb-1">CAMERA MAGNETISM</div>
                    <div className="font-display font-bold text-xl text-white">89%</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="font-mono text-[8.5px] tracking-widest text-[#EAB308] uppercase mb-1">IMPROV REFLEX</div>
                    <div className="font-display font-bold text-xl text-white">96%</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="font-mono text-[8.5px] tracking-widest text-[#EAB308] uppercase mb-1">NARRATIVE IMAGINATION</div>
                    <div className="font-display font-bold text-xl text-white">91%</div>
                  </div>
                </div>

                {/* ======================================================= */}
                {/* DEDICATED EVALUATION ENGINE TABS INTERFACE              */}
                {/* ======================================================= */}
                <div className="rounded-2xl border border-amber-400/30 bg-[#0B0914]/90 backdrop-blur-2xl overflow-hidden shadow-2xl">
                  {/* Tab Selector Navigation Bar */}
                  <div className="flex border-b border-white/10 bg-white/[0.02] overflow-x-auto no-scrollbar">
                    {[
                      { id: 'diagnosis', label: '1. EVALUATION RATIONALE', icon: FileText },
                      { id: 'scenes', label: '2. 12-TAKE DIRECTOR LOG', icon: Layers },
                      { id: 'optics', label: '3. CAMERA CALIBRATION', icon: Camera },
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
                            // COMPLETE 12-SCENE DIRECTOR'S AUDIT LOG
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

                      {/* TAB 3: CAMERA OPTICS & TECHNICAL CALIBRATION */}
                      {activeEngineTab === 'optics' && (
                        <motion.div
                          key="optics"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="space-y-5"
                        >
                          <div className="font-mono text-[9px] tracking-widest text-amber-400 uppercase">
                            // CINEMATOGRAPHY & OPTICAL CALIBRATION
                          </div>

                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                            <div className="font-display font-bold text-base text-white">
                              Prescribed Lens & Lighting Scheme:
                            </div>
                            <div className="font-mono text-xs text-amber-400 bg-amber-400/10 border border-amber-400/30 p-2.5 rounded-lg">
                              {archetype.lensProfile}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                              <div className="font-mono text-[9px] tracking-widest text-amber-400 uppercase">FRAMING COMPOSITION</div>
                              <p className="font-body text-xs text-white/80 leading-relaxed">
                                Best framed in 9:16 vertical close-ups and dynamic medium profiles. Maintain camera stillness to let micro-ocular movements register.
                              </p>
                            </div>

                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                              <div className="font-mono text-[9px] tracking-widest text-amber-400 uppercase">COLOR SCIENCE LUT</div>
                              <p className="font-body text-xs text-white/80 leading-relaxed">
                                Optimal grading: LOG-C to REC2020 with Kodak 5207 warm skin tones and desaturated shadows.
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

                {/* Bottom Actions */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <a 
                    href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hello Mayavi Casting, I have completed the Director's Room Screen Test: ${archetype.title}. Scores: Improv: 96%, Emotion: 94%, Camera: 89%, Imagination: 91%. I would love to audition for upcoming projects.`)}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs tracking-widest uppercase font-bold inline-flex items-center gap-2 shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-all cursor-pointer"
                  >
                    <span>SUBMIT AUDITION VIA WHATSAPP</span>
                    <ArrowRight size={14} />
                  </a>

                  <button 
                    onClick={() => window.print()}
                    className="px-6 py-3.5 rounded-full border border-white/10 hover:border-white/30 font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <Printer size={14} />
                    <span>PRINT DOSSIER</span>
                  </button>

                  <button 
                    onClick={() => {
                      setIsCompleted(false);
                      setCurrentSceneIndex(0);
                      setSelectedOptionIndex(0);
                      setUserChoices([]);
                      setScores({ improv: 0, camera: 0, emotion: 0, imag: 0 });
                    }}
                    className="px-6 py-3.5 rounded-full border border-white/10 hover:border-white/30 font-mono text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2"
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

      {/* Bottom Bar Controls */}
      {!isCompleted && (
        <footer className="relative z-30 px-6 sm:px-12 py-5 flex items-center justify-between border-t border-white/[0.06] bg-[#07060B]/70 backdrop-blur-md">
          <div className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.25em] text-white/40 uppercase">
            <span className="text-amber-400/70">[</span>
            <span>SENSOR: FULL-FRAME 9:16 VERTICAL</span>
            <span className="text-amber-400/70">]</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrev}
              disabled={currentSceneIndex === 0}
              className={`w-10 h-10 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center transition-all ${
                currentSceneIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-amber-400/60 text-white/60 hover:text-white cursor-pointer'
              }`}
              title="Previous Question"
            >
              <ChevronLeft size={16} />
            </button>

            <button 
              onClick={handleNext}
              className="px-7 py-2.5 rounded-full border-2 border-amber-400 bg-black/60 hover:bg-amber-400 text-amber-400 hover:text-black font-mono text-xs tracking-[0.22em] uppercase font-bold flex items-center gap-2.5 transition-all shadow-[0_0_24px_rgba(234,179,8,0.25)] hover:shadow-[0_0_35px_rgba(234,179,8,0.55)] cursor-pointer"
            >
              <span>{currentSceneIndex === SCENES.length - 1 ? 'COMPLETE DOSSIER' : 'NEXT QUESTION'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-[9.5px] tracking-[0.25em] text-white/40 uppercase">
            <span className="w-8 h-[1px] bg-white/20" />
            <span>TALENT BEYOND THE ORDINARY</span>
          </div>
        </footer>
      )}
    </motion.div>
  );
}
export default TalentAssessmentModal;
