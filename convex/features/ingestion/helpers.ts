
export async function normalizeURL(url: string): Promise<string | undefined> {
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36" } });
    console.log(`Normalized URL: ${response.url} (status: ${response.status}) headers: ${JSON.stringify(response.headers)}`);
    if (
      !response.ok ||
      !response.headers.get("Content-Type")?.includes("text/html")
    ) {
      return undefined;
    }
    // Use the final redirected URL
    const finalUrl = response.url.replace(/\/+$/, "");
    return finalUrl;
  } catch {
    return undefined;
  }
}

// ################################################## YOUTUBE UTILS ###################################################

// Regular expression patterns to match various YouTube URL formats and capture the video ID.
// The video ID is typically 11 characters long and can contain letters (upper and lower case),
// numbers, underscores, and hyphens.
const VALID_YOUTUBE_URL_PATTERNS: string[] = [
  "(?:https?:\\/\\/)?(?:www\\.)?youtube\\.com\\/watch\\?.*?v=([a-zA-Z0-9_-]{11})", // Standard format with optional query params
  "(?:https?:\\/\\/)?youtu\\.be\\/([a-zA-Z0-9_-]{11})", // Shortened format
  "(?:https?:\\/\\/)?(?:www\\.)?youtube\\.com\\/embed\\/([a-zA-Z0-9_-]{11})", // Embed format
  "(?:https?:\\/\\/)?(?:www\\.)?youtube\\.com\\/v\\/([a-zA-Z0-9_-]{11})", // Older embed format
  "(?:https?:\\/\\/)?(?:www\\.)?youtube\\.com\\/shorts\\/([a-zA-Z0-9_-]{11})", // Shorts format
  "(?:https?:\\/\\/)?(?:www\\.)?youtube\\.com\\/live\\/([a-zA-Z0-9_-]{11})", // Live format
];

/**
 * Check if the given URL is a valid YouTube video URL.
 */
export function isYoutubeURL(url: string): boolean {
  return VALID_YOUTUBE_URL_PATTERNS.some((pattern) =>
    new RegExp(pattern).test(url),
  );
}

/**
 * Extracts the YouTube video ID from a given YouTube video URL.
 */
function parseYoutubeVideoId(url: string): string {
  for (const pattern of VALID_YOUTUBE_URL_PATTERNS) {
    const match = url.match(new RegExp(pattern));
    if (match) {
      // The video ID is in the first capturing group
      const videoId = match[1];
      // Further validation: ensure the extracted ID is exactly 11 characters
      // and contains only valid characters. This is mostly handled by the regex
      // but an explicit check can be an extra safeguard.
      if (
        videoId &&
        videoId.length === 11 &&
        /^[a-zA-Z0-9_-]+$/.test(videoId)
      ) {
        return videoId;
      }
    }
  }

  // If no pattern matched or the extracted ID was not valid
  throw new Error("Invalid YouTube video URL or unable to extract video ID.");
}

/**
 * Normalize a YouTube URL to a standard format.
 * This function will convert any valid YouTube URL to the standard watch format.
 */
export function normalizeYoutubeURL(url: string): string {
  const videoId = parseYoutubeVideoId(url);
  return `https://www.youtube.com/watch?v=${videoId}`;
}
