import { Folder, ChevronRight } from "lucide-react";
import type { CatalogFolder } from "@/types/catalog";
import { getOptimizedImage, generateSrcSet } from "@/utils/imageOptimization";
import ImageWithPlaceholder from "./ImageWithPlaceholder";

interface FolderCardProps {
  folder: CatalogFolder;
  onClick: () => void;
  index: number;
}

const FolderCard = ({ folder, onClick, index }: FolderCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-500 hover:shadow-lg hover:-translate-y-2 animate-slide-up border border-gray-100"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithPlaceholder
          src={getOptimizedImage.cover(folder.coverImage)}
          srcSet={generateSrcSet(folder.coverImage)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={folder.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        
        {/* Folder icon */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-primary-600 flex items-center justify-center shadow-lg">
          <Folder className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </div>
        
        {/* Design count badge */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] sm:text-xs font-medium text-gray-700 shadow-sm">
          {folder.designs.length} designs
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3 sm:p-6">
        <h3 className="font-display text-sm sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {folder.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-none">
          {folder.description}
        </p>
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-primary-600 font-medium">
          <span className="hidden sm:inline">View Collection</span>
          <span className="sm:hidden">View</span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
      
      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary-200 transition-colors pointer-events-none" />
    </div>
  );
};

export default FolderCard;
