import type { CatalogFolder } from "@/types/catalog";
import FolderCard from "./FolderCard";

interface CatalogGridProps {
  folders: CatalogFolder[];
  onFolderClick: (folder: CatalogFolder) => void;
}

const CatalogGrid = ({ folders, onFolderClick }: CatalogGridProps) => {
  return (
    <section id="collections" className="py-6 sm:py-12" style={{ backgroundColor: '#f0f0ed' }}>
      <div className="container mx-auto px-3 sm:px-6 pt-6 sm:pt-12 pb-6 sm:pb-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {folders.map((folder, index) => (
            <FolderCard 
              key={folder.id}
              folder={folder}
              onClick={() => onFolderClick(folder)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogGrid;
