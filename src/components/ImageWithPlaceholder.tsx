import { useState } from 'react';

interface ImageWithPlaceholderProps {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  style?: React.CSSProperties;
}

const ImageWithPlaceholder = ({
  src,
  srcSet,
  sizes,
  alt,
  className = '',
  loading = 'lazy',
  style
}: ImageWithPlaceholderProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative">
      {/* Blur placeholder */}
      {!imageLoaded && !imageError && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse ${className}`}
          style={style}
        />
      )}

      {/* Actual image */}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        className={`${className} transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={style}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />

      {/* Error fallback */}
      {imageError && (
        <div className={`${className} bg-gray-200 flex items-center justify-center`} style={style}>
          <span className="text-gray-500 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default ImageWithPlaceholder;
