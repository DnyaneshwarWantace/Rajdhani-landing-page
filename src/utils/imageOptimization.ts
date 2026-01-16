/**
 * Image optimization utilities using Cloudflare Image Resizing
 * Docs: https://developers.cloudflare.com/images/image-resizing/url-format/
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'json';
  fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
}

/**
 * Optimize image URL using Cloudflare Image Resizing
 * This works if your R2 bucket is served through Cloudflare
 *
 * NOTE: Currently disabled because R2 public URLs (pub-*.r2.dev) don't support
 * image transformations. To enable optimization, set up a custom domain.
 */
export const optimizeImageUrl = (
  imageUrl: string,
  options: ImageOptimizationOptions = {}
): string => {
  // DISABLED: R2 public URLs don't support /cdn-cgi/image/ transformations
  // They only work with custom domains proxied through Cloudflare
  // For now, just return the original URL
  return imageUrl;

  /*
  // Uncomment this when using custom domain instead of pub-*.r2.dev

  const {
    width,
    height,
    quality = 85,
    format = 'auto',
    fit = 'scale-down'
  } = options;

  const params: string[] = [];
  if (width) params.push(`width=${width}`);
  if (height) params.push(`height=${height}`);
  params.push(`quality=${quality}`);
  params.push(`format=${format}`);
  params.push(`fit=${fit}`);

  const paramsString = params.join(',');
  const url = new URL(imageUrl);
  const path = url.pathname;
  return `${url.origin}/cdn-cgi/image/${paramsString}${path}`;
  */
};

/**
 * Get responsive image sources for different screen sizes
 */
export const getResponsiveImageSources = (imageUrl: string) => {
  return {
    // Mobile (small screens)
    mobile: optimizeImageUrl(imageUrl, { width: 640, quality: 80 }),

    // Tablet
    tablet: optimizeImageUrl(imageUrl, { width: 1024, quality: 85 }),

    // Desktop
    desktop: optimizeImageUrl(imageUrl, { width: 1920, quality: 85 }),

    // Thumbnail
    thumbnail: optimizeImageUrl(imageUrl, { width: 400, quality: 75 }),

    // Original (optimized)
    original: optimizeImageUrl(imageUrl, { quality: 90 })
  };
};

/**
 * Generate srcSet for responsive images
 */
export const generateSrcSet = (imageUrl: string): string => {
  const sources = getResponsiveImageSources(imageUrl);

  return [
    `${sources.mobile} 640w`,
    `${sources.tablet} 1024w`,
    `${sources.desktop} 1920w`
  ].join(', ');
};

/**
 * Get optimized image for specific use case
 */
export const getOptimizedImage = {
  // For grid/card thumbnails
  thumbnail: (url: string) => optimizeImageUrl(url, { width: 400, quality: 75 }),

  // For folder cover images
  cover: (url: string) => optimizeImageUrl(url, { width: 800, quality: 85 }),

  // For modal/full view
  fullView: (url: string) => optimizeImageUrl(url, { width: 1920, quality: 90 }),

  // For download (keep original quality but compress)
  download: (url: string) => optimizeImageUrl(url, { quality: 95 })
};
