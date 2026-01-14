import { Download, Share2, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import type { CarpetDesign } from "@/types/catalog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageModalProps {
  design: CarpetDesign | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  onShare: () => void;
}

const ImageModal = ({ design, isOpen, onClose, onDownload, onShare }: ImageModalProps) => {
  const [zoom, setZoom] = useState(1);

  if (!design) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] sm:w-full bg-card border-border p-0 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center p-3 sm:p-4 border-b border-border bg-secondary/50">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-base sm:text-xl font-semibold text-foreground truncate">
              {design.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 sm:line-clamp-2">{design.description}</p>
          </div>
        </div>
        
        {/* Image container */}
        <div className="relative overflow-auto max-h-[50vh] sm:max-h-[60vh] bg-navy-deep flex items-center justify-center p-4">
          <img
            src={design.image}
            alt={design.name}
            loading="lazy"
            className="transition-transform duration-300 max-w-full h-auto object-contain"
            style={{ transform: `scale(${zoom})` }}
          />
        </div>
        
        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-border bg-secondary/50">
          <div className="flex items-center gap-2">
            <Button onClick={handleZoomOut} size="icon" variant="outline" disabled={zoom <= 0.5}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground w-16 text-center">{Math.round(zoom * 100)}%</span>
            <Button onClick={handleZoomIn} size="icon" variant="outline" disabled={zoom >= 3}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          {design.dimensions && (
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Size: {design.dimensions}
            </span>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button onClick={onDownload} variant="catalog" className="flex-1 sm:flex-none">
              <Download className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button onClick={onShare} variant="outline" className="flex-1 sm:flex-none">
              <Share2 className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
