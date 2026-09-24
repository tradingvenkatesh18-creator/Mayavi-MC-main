/**
 * Video URL Resolver & Embed Generator
 * Supports YouTube, Instagram, LinkedIn, Google Drive, Vimeo, and direct MP4/WebM video loops.
 */

export type VideoPlatform = 'youtube' | 'vimeo' | 'instagram' | 'linkedin' | 'drive' | 'direct' | 'unknown';

export interface ParsedVideo {
  platform: VideoPlatform;
  embedUrl: string;
  originalUrl: string;
  isDirectVideo: boolean;
}

export function detectVideoPlatform(url: string): VideoPlatform {
  if (!url) return 'unknown';
  const clean = url.trim().toLowerCase();

  if (clean.includes('youtube.com') || clean.includes('youtu.be')) return 'youtube';
  if (clean.includes('vimeo.com')) return 'vimeo';
  if (clean.includes('instagram.com')) return 'instagram';
  if (clean.includes('linkedin.com')) return 'linkedin';
  if (clean.includes('drive.google.com')) return 'drive';
  if (
    clean.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i) ||
    clean.startsWith('/videos/') ||
    clean.startsWith('blob:') ||
    clean.startsWith('data:') ||
    clean.includes('video/upload')
  ) {
    return 'direct';
  }

  return 'unknown';
}

export function getVideoEmbedUrl(url: string): string {
  if (!url) return '';
  let trimmed = url.trim();

  // If user pasted raw iframe code like <iframe src="...">
  const iframeMatch = trimmed.match(/<iframe.*?src=["']([^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    trimmed = iframeMatch[1];
  }

  // YouTube
  // Matches: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID, youtube.com/live/ID
  const ytMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&playsinline=1&enablejsapi=1&rel=0&modestbranding=1&controls=1`;
  }

  // Vimeo
  // Matches: vimeo.com/ID or player.vimeo.com/video/ID
  const vimeoMatch = trimmed.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&playsinline=1&title=0&byline=0&portrait=0`;
  }

  // Google Drive
  // Matches: drive.google.com/file/d/FILE_ID/...
  const driveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([\w-]+)/i);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }

  // Instagram Reels or Posts
  // Matches: instagram.com/reel/CODE/ or /p/CODE/
  const instaMatch = trimmed.match(/instagram\.com\/(?:reel|p)\/([\w-]+)/i);
  if (instaMatch && instaMatch[1]) {
    return `https://www.instagram.com/reel/${instaMatch[1]}/embed/captioned`;
  }

  // LinkedIn Embed
  if (trimmed.includes('linkedin.com/embed/feed/update/')) {
    return trimmed;
  }

  // Direct video or fallback
  return trimmed;
}

export function parseVideo(url: string): ParsedVideo {
  const platform = detectVideoPlatform(url);
  const embedUrl = getVideoEmbedUrl(url);
  const isDirectVideo = platform === 'direct';

  return {
    platform,
    embedUrl,
    originalUrl: url,
    isDirectVideo,
  };
}
