import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CatalogGrid from "@/components/CatalogGrid";
import FolderView from "@/components/FolderView";
import { catalogFolders, loadCollectionImages } from "@/data/catalogData";
import type { CatalogFolder } from "@/types/catalog";

const Index = () => {
  const [selectedFolder, setSelectedFolder] = useState<CatalogFolder | null>(null);
  const [folders, setFolders] = useState<CatalogFolder[]>(catalogFolders);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load images from Cloudflare R2 on component mount
    const loadImages = async () => {
      try {
        setLoading(true);
        const updatedFolders = await loadCollectionImages();
        setFolders(updatedFolders);
      } catch (error) {
        console.error('Error loading collection images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleFolderClick = (folder: CatalogFolder) => {
    setSelectedFolder(folder);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedFolder(null);
  };

  return (
    <div style={{ backgroundColor: '#f0f0ed' }}>
      <Header />
      
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading collections...</p>
          </div>
        </div>
      ) : selectedFolder ? (
        <FolderView folder={selectedFolder} onBack={handleBack} />
      ) : (
        <CatalogGrid folders={folders} onFolderClick={handleFolderClick} />
      )}
    </div>
  );
};

export default Index;
