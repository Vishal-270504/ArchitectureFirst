export function isValidYouTubeUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return (
      (u.hostname === 'www.youtube.com' || u.hostname === 'youtube.com' || u.hostname === 'youtu.be') &&
      (u.pathname.startsWith('/watch') || u.hostname === 'youtu.be')
    );
  } catch {
    return false;
  }
}

export function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') {
      return u.pathname.slice(1);
    }
    if (u.hostname.includes('youtube.com')) {
      return u.searchParams.get('v');
    }
    return null;
  } catch {
    return null;
  }
}
