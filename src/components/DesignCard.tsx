import { Eye, Download, Share2 } from "lucide-react";
import type { CarpetDesign } from "@/types/catalog";
import { Button } from "@/components/ui/button";
import { getOptimizedImage, generateSrcSet } from "@/utils/imageOptimization";
import ImageWithPlaceholder from "./ImageWithPlaceholder";

interface DesignCardProps {
  design: CarpetDesign;
  onView: () => void;
  onDownload: () => void;
  onShare: () => void;
  index: number;
}

const DesignCard = ({ design, onView, onDownload, onShare, index }: DesignCardProps) => {
  return (
    <div 
      className="group relative bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-lg animate-scale-in border border-gray-100"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <ImageWithPlaceholder
          src={getOptimizedImage.thumbnail(design.image)}
          srcSet={generateSrcSet(design.image)}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={design.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 sm:gap-3">
          <Button
            onClick={(e) => { e.stopPropagation(); onView(); }}
            size="icon"
            variant="catalog"
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-8 h-8 sm:w-10 sm:h-10"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <Button
            onClick={(e) => { e.stopPropagation(); onDownload(); }}
            size="icon"
            variant="catalog"
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 w-8 h-8 sm:w-10 sm:h-10"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <Button
            onClick={(e) => { e.stopPropagation(); onShare(); }}
            size="icon"
            variant="catalog"
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150 w-8 h-8 sm:w-10 sm:h-10"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-2 sm:p-4">
        <h4 className="font-display text-xs sm:text-lg font-semibold text-gray-900 mb-0.5 sm:mb-1 truncate">
          {design.name}
        </h4>
        <p className="text-[10px] sm:text-sm text-gray-600 line-clamp-2 mb-1 sm:mb-2 hidden sm:block">
          {design.description}
        </p>
        {design.dimensions && (
          <span className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md bg-gray-100 text-[10px] sm:text-xs text-gray-700">
            {design.dimensions}
          </span>
        )}
      </div>
    </div>
  );
};

export default DesignCard;
