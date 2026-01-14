import { ArrowLeft, Folder } from "lucide-react";
import { useState } from "react";
import type { CatalogFolder, CarpetDesign } from "@/types/catalog";
import DesignCard from "./DesignCard";
import ImageModal from "./ImageModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FolderViewProps {
  folder: CatalogFolder;
  onBack: () => void;
}

const FolderView = ({ folder, onBack }: FolderViewProps) => {
  const [selectedDesign, setSelectedDesign] = useState<CarpetDesign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (design: CarpetDesign) => {
    setSelectedDesign(design);
    setIsModalOpen(true);
  };

  const handleDownload = async (design: CarpetDesign) => {
    try {
      // Try to fetch with CORS mode first
      const response = await fetch(design.image, { mode: 'cors' });

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${design.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      // Fallback: open image in new tab if CORS fails
      try {
        const link = document.createElement('a');
        link.href = design.image;
        link.download = `${design.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Download started - please check your downloads folder");
      } catch (fallbackError) {
        toast.error("Failed to download image. Please try right-click and 'Save Image As'");
      }
    }
  };

  const handleShare = async (design: CarpetDesign) => {
    if (navigator.share) {
      try {
        // Try to share with image file
        try {
          const response = await fetch(design.image, { mode: 'cors' });
          const blob = await response.blob();
          const file = new File([blob], `${design.name.toLowerCase().replace(/\s+/g, '-')}.jpg`, { type: blob.type });

          await navigator.share({
            title: design.name,
            text: design.description,
            files: [file],
          });
          toast.success("Shared successfully!");
        } catch (fileError) {
          // Fallback to sharing URL only if file sharing fails
          await navigator.share({
            title: design.name,
            text: `${design.description} - ${design.name}`,
            url: design.image,
          });
          toast.success("Shared successfully!");
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          // If sharing fails, copy image URL to clipboard
          await navigator.clipboard.writeText(design.image);
          toast.success("Image link copied to clipboard!");
        }
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      await navigator.clipboard.writeText(design.image);
      toast.success("Image link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen pt-12 sm:pt-24 pb-8 sm:pb-16" style={{ backgroundColor: '#f0f0ed' }}>
      <div className="container mx-auto px-3 sm:px-6">
        {/* Back button and header */}
        <div className="mb-6 sm:mb-12 animate-fade-in">
          <Button 
            onClick={onBack} 
            variant="ghost" 
            className="mb-4 sm:mb-6 text-gray-600 hover:text-gray-900 text-sm sm:text-base"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Back to Collections</span>
            <span className="sm:hidden">Back</span>
          </Button>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-primary-600 flex items-center justify-center shadow-lg">
              <Folder className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-3xl md:text-4xl font-bold text-gray-900">
                {folder.name}
              </h2>
              <p className="text-xs sm:text-base text-gray-600 hidden sm:block">{folder.description}</p>
            </div>
          </div>
        </div>
        
        {/* Designs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {folder.designs.map((design, index) => (
            <DesignCard 
              key={design.id}
              design={design}
              onView={() => handleView(design)}
              onDownload={() => handleDownload(design)}
              onShare={() => handleShare(design)}
              index={index}
            />
          ))}
        </div>
        
        {/* Image modal */}
        <ImageModal 
          design={selectedDesign}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDownload={() => selectedDesign && handleDownload(selectedDesign)}
          onShare={() => selectedDesign && handleShare(selectedDesign)}
        />
      </div>
    </div>
  );
};

export default FolderView;
