export interface DriveAsset {
  id: string;
  name: string;
  category: 'logo' | 'shape' | 'pattern';
  fileType: string;
  url: string;
  thumbnailUrl: string;
}

// Drive image/file serving URL builders
export function getDriveDirectUrl(fileId: string): string {
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}

export function getDriveDownloadUrl(fileId: string): string {
  return `https://docs.google.com/uc?export=download&id=${fileId}`;
}

export const MAYAVI_LOGOS: DriveAsset[] = [
  {
    id: "1A0yX5iK9iEi6CuGXWV1pfbZL0uFtmSRx",
    name: "Mayavi Official Logo (Vector)",
    category: "logo",
    fileType: "svg",
    url: getDriveDirectUrl("1A0yX5iK9iEi6CuGXWV1pfbZL0uFtmSRx"),
    thumbnailUrl: getDriveDirectUrl("1A0yX5iK9iEi6CuGXWV1pfbZL0uFtmSRx")
  },
  {
    id: "10qwPzcwnZdKzbHW2qnBZPWzcfljcspcA",
    name: "Mayavi Brand Signature (Transparent)",
    category: "logo",
    fileType: "png",
    url: getDriveDirectUrl("10qwPzcwnZdKzbHW2qnBZPWzcfljcspcA"),
    thumbnailUrl: getDriveDirectUrl("10qwPzcwnZdKzbHW2qnBZPWzcfljcspcA")
  },
  {
    id: "1Qg01c1RuVCr7TvHVHybkgsbsCUwYFLij",
    name: "Mayavi Brand Signet (Dark Accent)",
    category: "logo",
    fileType: "png",
    url: getDriveDirectUrl("1Qg01c1RuVCr7TvHVHybkgsbsCUwYFLij"),
    thumbnailUrl: getDriveDirectUrl("1Qg01c1RuVCr7TvHVHybkgsbsCUwYFLij")
  },
  {
    id: "14Xg6x6Ql-4BP4-UgA2oihy2r5Mp5yPm4",
    name: "Mayavi Brand Emblem (White BG)",
    category: "logo",
    fileType: "png",
    url: getDriveDirectUrl("14Xg6x6Ql-4BP4-UgA2oihy2r5Mp5yPm4"),
    thumbnailUrl: getDriveDirectUrl("14Xg6x6Ql-4BP4-UgA2oihy2r5Mp5yPm4")
  },
  {
    id: "13JRLHPgFfJaaxmDGHdU6ujpMZ8dlX5K5",
    name: "Mayavi Corporate Branding (Print)",
    category: "logo",
    fileType: "png",
    url: getDriveDirectUrl("13JRLHPgFfJaaxmDGHdU6ujpMZ8dlX5K5"),
    thumbnailUrl: getDriveDirectUrl("13JRLHPgFfJaaxmDGHdU6ujpMZ8dlX5K5")
  }
];

export const MAYAVI_SHAPES: DriveAsset[] = [
  { id: "1VHX4rr4Uc1HQd8viXl23kzB9O7apw3C2", name: "A-1 Geometric Motif", category: "shape", fileType: "svg", url: getDriveDirectUrl("1VHX4rr4Uc1HQd8viXl23kzB9O7apw3C2"), thumbnailUrl: getDriveDirectUrl("1VHX4rr4Uc1HQd8viXl23kzB9O7apw3C2") },
  { id: "1D8kR4Zc4MTJa2hRqdaszktPbqsg1pg10", name: "A-2 Dynamic Prism", category: "shape", fileType: "svg", url: getDriveDirectUrl("1D8kR4Zc4MTJa2hRqdaszktPbqsg1pg10"), thumbnailUrl: getDriveDirectUrl("1D8kR4Zc4MTJa2hRqdaszktPbqsg1pg10") },
  { id: "11wLAbupHjujhbeKhIQm-1m6mW192rQi0", name: "A-3 Kinetic Form", category: "shape", fileType: "svg", url: getDriveDirectUrl("11wLAbupHjujhbeKhIQm-1m6mW192rQi0"), thumbnailUrl: getDriveDirectUrl("11wLAbupHjujhbeKhIQm-1m6mW192rQi0") },
  { id: "1COn71BrJvepXZk7mYfMlT_xQRvpRCR4F", name: "A-4 Flow Vertex", category: "shape", fileType: "svg", url: getDriveDirectUrl("1COn71BrJvepXZk7mYfMlT_xQRvpRCR4F"), thumbnailUrl: getDriveDirectUrl("1COn71BrJvepXZk7mYfMlT_xQRvpRCR4F") },
  { id: "18EJDcjz8qQSxccvAa5Z28jNL4JLyEO_v", name: "A-5 Symmetrical Shell", category: "shape", fileType: "svg", url: getDriveDirectUrl("18EJDcjz8qQSxccvAa5Z28jNL4JLyEO_v"), thumbnailUrl: getDriveDirectUrl("18EJDcjz8qQSxccvAa5Z28jNL4JLyEO_v") },
  
  { id: "1q_iLCxfk9c3rYwlHi4-Dw6fHuvfi94jQ", name: "B-1 Celestial Ring", category: "shape", fileType: "svg", url: getDriveDirectUrl("1q_iLCxfk9c3rYwlHi4-Dw6fHuvfi94jQ"), thumbnailUrl: getDriveDirectUrl("1q_iLCxfk9c3rYwlHi4-Dw6fHuvfi94jQ") },
  { id: "1RsSI8sRx_vJCPNY1AGFaj-Wxy8zKE05q", name: "B-2 Astral Core", category: "shape", fileType: "svg", url: getDriveDirectUrl("1RsSI8sRx_vJCPNY1AGFaj-Wxy8zKE05q"), thumbnailUrl: getDriveDirectUrl("1RsSI8sRx_vJCPNY1AGFaj-Wxy8zKE05q") },
  { id: "14uj0A9R7juu9IMCLv6ZrxugHwuyD-nre", name: "B-3 Stellar Radiance", category: "shape", fileType: "svg", url: getDriveDirectUrl("14uj0A9R7juu9IMCLv6ZrxugHwuyD-nre"), thumbnailUrl: getDriveDirectUrl("14uj0A9R7juu9IMCLv6ZrxugHwuyD-nre") },
  { id: "1ghDR16Zlm8lCS56hIls-Zcqu02w9EkZ2", name: "B-4 Lunar Crest", category: "shape", fileType: "svg", url: getDriveDirectUrl("1ghDR16Zlm8lCS56hIls-Zcqu02w9EkZ2"), thumbnailUrl: getDriveDirectUrl("1ghDR16Zlm8lCS56hIls-Zcqu02w9EkZ2") },
  { id: "1QBtdW3RedpxmdKlWJogmpQNRjlNzdnEH", name: "B-5 Zenith Meridian", category: "shape", fileType: "svg", url: getDriveDirectUrl("1QBtdW3RedpxmdKlWJogmpQNRjlNzdnEH"), thumbnailUrl: getDriveDirectUrl("1QBtdW3RedpxmdKlWJogmpQNRjlNzdnEH") },

  { id: "1XQjdLA4pQb44tBqzXjsc_PVSOKi3Oi1R", name: "C-1 Horizon Curve", category: "shape", fileType: "svg", url: getDriveDirectUrl("1XQjdLA4pQb44tBqzXjsc_PVSOKi3Oi1R"), thumbnailUrl: getDriveDirectUrl("1XQjdLA4pQb44tBqzXjsc_PVSOKi3Oi1R") },
  { id: "1oksYdI39LfyBbW5QIjSVp0-Exw29l16t", name: "C-2 Vector Lattice", category: "shape", fileType: "svg", url: getDriveDirectUrl("1oksYdI39LfyBbW5QIjSVp0-Exw29l16t"), thumbnailUrl: getDriveDirectUrl("1oksYdI39LfyBbW5QIjSVp0-Exw29l16t") },
  { id: "1IS1Crv0lfV7un2PQhjHRZ8pctnaMJeEN", name: "C-3 Isometric Grid", category: "shape", fileType: "svg", url: getDriveDirectUrl("1IS1Crv0lfV7un2PQhjHRZ8pctnaMJeEN"), thumbnailUrl: getDriveDirectUrl("1IS1Crv0lfV7un2PQhjHRZ8pctnaMJeEN") },
  { id: "1Ytov6HoIPvw9EGS8jHI87aVQFhNpF4VI", name: "C-4 Organic Ribbon", category: "shape", fileType: "svg", url: getDriveDirectUrl("1Ytov6HoIPvw9EGS8jHI87aVQFhNpF4VI"), thumbnailUrl: getDriveDirectUrl("1Ytov6HoIPvw9EGS8jHI87aVQFhNpF4VI") },
  { id: "1Hff9imPRmREWVSHgSJ7eOkHPcBQp99-N", name: "C-5 Paradox Loop", category: "shape", fileType: "svg", url: getDriveDirectUrl("1Hff9imPRmREWVSHgSJ7eOkHPcBQp99-N"), thumbnailUrl: getDriveDirectUrl("1Hff9imPRmREWVSHgSJ7eOkHPcBQp99-N") },

  { id: "1ra90F-BBJFaah2KME9-E7Tq32wA0QR9J", name: "D-1 Cinematic Frame", category: "shape", fileType: "svg", url: getDriveDirectUrl("1ra90F-BBJFaah2KME9-E7Tq32wA0QR9J"), thumbnailUrl: getDriveDirectUrl("1ra90F-BBJFaah2KME9-E7Tq32wA0QR9J") },
  { id: "1_IrNufjDd6F1vyA6yrNKUp-ylVKpZ2sg", name: "D-2 Vignette Guide", category: "shape", fileType: "svg", url: getDriveDirectUrl("1_IrNufjDd6F1vyA6yrNKUp-ylVKpZ2sg"), thumbnailUrl: getDriveDirectUrl("1_IrNufjDd6F1vyA6yrNKUp-ylVKpZ2sg") },
  { id: "1z60R5d9yGrIV4Q0uKjwLGjstPB3JdILV", name: "D-3 Golden Ratio Spiral", category: "shape", fileType: "svg", url: getDriveDirectUrl("1z60R5d9yGrIV4Q0uKjwLGjstPB3JdILV"), thumbnailUrl: getDriveDirectUrl("1z60R5d9yGrIV4Q0uKjwLGjstPB3JdILV") },
  { id: "1Z1QoYvvefT3gaaWCpJK_7j-T6TFoh5ZY", name: "D-4 Absolute Horizon", category: "shape", fileType: "svg", url: getDriveDirectUrl("1Z1QoYvvefT3gaaWCpJK_7j-T6TFoh5ZY"), thumbnailUrl: getDriveDirectUrl("1Z1QoYvvefT3gaaWCpJK_7j-T6TFoh5ZY") }
];

export const MAYAVI_PATTERNS: DriveAsset[] = [
  { id: "1hpnARMIKCQrupQa1mFObM2scl8cDo28t", name: "Pattern 1 // Sacred Weaver", category: "pattern", fileType: "svg", url: getDriveDirectUrl("1hpnARMIKCQrupQa1mFObM2scl8cDo28t"), thumbnailUrl: getDriveDirectUrl("1hpnARMIKCQrupQa1mFObM2scl8cDo28t") },
  { id: "1R-d3MGIP7sc27pa1S8IxFgmyTfdOCLvM", name: "Pattern 2 // Astral Waves", category: "pattern", fileType: "svg", url: getDriveDirectUrl("1R-d3MGIP7sc27pa1S8IxFgmyTfdOCLvM"), thumbnailUrl: getDriveDirectUrl("1R-d3MGIP7sc27pa1S8IxFgmyTfdOCLvM") },
  { id: "18ye39sYR6h-LYsOgly8ePrj2YAHTZACt", name: "Pattern 3 // Symmetrical Matrix", category: "pattern", fileType: "svg", url: getDriveDirectUrl("18ye39sYR6h-LYsOgly8ePrj2YAHTZACt"), thumbnailUrl: getDriveDirectUrl("18ye39sYR6h-LYsOgly8ePrj2YAHTZACt") },
  { id: "119GJtp_wbHcwmMnjQtvM9MkQugr2xYLR", name: "Pattern 4 // Vector Lattice", category: "pattern", fileType: "svg", url: getDriveDirectUrl("119GJtp_wbHcwmMnjQtvM9MkQugr2xYLR"), thumbnailUrl: getDriveDirectUrl("119GJtp_wbHcwmMnjQtvM9MkQugr2xYLR") },
  { id: "1Spv2X3o_njt8s7kBx_PXgY3T0cSIYjoV", name: "Pattern 5 // Halftone Frequency", category: "pattern", fileType: "svg", url: getDriveDirectUrl("1Spv2X3o_njt8s7kBx_PXgY3T0cSIYjoV"), thumbnailUrl: getDriveDirectUrl("1Spv2X3o_njt8s7kBx_PXgY3T0cSIYjoV") },
  { id: "1TGGZmBTNr1749F0YqV2tzGat_8fU87L6", name: "Pattern 6 // Radial Zenith", category: "pattern", fileType: "svg", url: getDriveDirectUrl("1TGGZmBTNr1749F0YqV2tzGat_8fU87L6"), thumbnailUrl: getDriveDirectUrl("1TGGZmBTNr1749F0YqV2tzGat_8fU87L6") },
  { id: "16cLvYstJTftUbfiArEhpNLRQULTdnNhx", name: "Pattern 7 // Isometric Flux", category: "pattern", fileType: "svg", url: getDriveDirectUrl("16cLvYstJTftUbfiArEhpNLRQULTdnNhx"), thumbnailUrl: getDriveDirectUrl("16cLvYstJTftUbfiArEhpNLRQULTdnNhx") },
  { id: "1C8hyu6v1iHePRNxdASc_ISznHQDpR5cW", name: "Pattern 8 // Organic Drift", category: "pattern", fileType: "svg", url: getDriveDirectUrl("1C8hyu6v1iHePRNxdASc_ISznHQDpR5cW"), thumbnailUrl: getDriveDirectUrl("1C8hyu6v1iHePRNxdASc_ISznHQDpR5cW") },
  { id: "1UPpEKRUUGtwWvUSjIIVidm2vje6VT3iB", name: "Pattern 9 // Fractal Horizon", category: "pattern", fileType: "svg", url: getDriveDirectUrl("1UPpEKRUUGtwWvUSjIIVidm2vje6VT3iB"), thumbnailUrl: getDriveDirectUrl("1UPpEKRUUGtwWvUSjIIVidm2vje6VT3iB") },
  { id: "13TdpUA7M91ec9OsdBlMlonia6xLVcxD2", name: "Pattern 10 // Optical Moire", category: "pattern", fileType: "svg", url: getDriveDirectUrl("13TdpUA7M91ec9OsdBlMlonia6xLVcxD2"), thumbnailUrl: getDriveDirectUrl("13TdpUA7M91ec9OsdBlMlonia6xLVcxD2") },
  { id: "1vm51BflgcA-fWtEKA9SlP67C_osJEkw8", name: "Pattern 11 // Cine-Graticule", category: "pattern", fileType: "svg", url: getDriveDirectUrl("1vm51BflgcA-fWtEKA9SlP67C_osJEkw8"), thumbnailUrl: getDriveDirectUrl("1vm51BflgcA-fWtEKA9SlP67C_osJEkw8") }
];

export const ALL_DRIVE_ASSETS: DriveAsset[] = [
  ...MAYAVI_LOGOS,
  ...MAYAVI_SHAPES,
  ...MAYAVI_PATTERNS
];
