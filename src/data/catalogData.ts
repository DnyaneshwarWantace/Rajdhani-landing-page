import persianClassic from "@/assets/carpets/persian-classic.jpg";
import modernGeo from "@/assets/carpets/modern-geo.jpg";
import turkishMedallion from "@/assets/carpets/turkish-medallion.jpg";
import bohemianTribal from "@/assets/carpets/bohemian-tribal.jpg";
import vintageFloral from "@/assets/carpets/vintage-floral.jpg";
import luxuryShag from "@/assets/carpets/luxury-shag.jpg";
import type { CatalogFolder } from "@/types/catalog";
import { CollectionService } from "@/services/collectionService";

// Helper function to get cover image from collection or use default
const getCoverImage = async (collectionId: string): Promise<string> => {
  try {
    const images = await CollectionService.getCollectionImages(collectionId);
    if (images.length > 0) {
      return images[0].url;
    }
  } catch (error) {
    console.error(`Error fetching cover for ${collectionId}:`, error);
  }
  // Return default placeholder based on collection
  const defaults: Record<string, string> = {
    'rajdhani-digital-carpets': persianClassic,
    'wall-felt': modernGeo,
    'holi': turkishMedallion,
    'christmas': luxuryShag,
  };
  return defaults[collectionId] || persianClassic;
};

export const catalogFolders: CatalogFolder[] = [
  {
    id: "rajdhani-digital-carpets",
    name: "Rajdhani Digital Carpets",
    description: "Premium digital carpet designs collection",
    coverImage: persianClassic, // Will be updated when images are loaded
    designs: [], // Will be populated from API
  },
  {
    id: "wall-felt",
    name: "Wall Felt Design Catalogues",
    description: "Premium wall felt design collections",
    coverImage: modernGeo,
    designs: [],
  },
  {
    id: "holi",
    name: "Holi Collection",
    description: "Colorful designs for the festival of colors",
    coverImage: turkishMedallion,
    designs: [],
  },
  {
    id: "christmas",
    name: "Christmas Collection",
    description: "Festive designs for the holiday season",
    coverImage: luxuryShag,
    designs: [],
  },
];

// Helper function to extract and format name from image key
const formatImageName = (key: string, category: string): string => {
  // Extract filename from key (removes path and extension)
  const filename = key.split('/').pop() || key;
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');

  // Extract the number at the end (after last underscore or dash)
  const parts = nameWithoutExt.split(/[_-]/);
  const lastPart = parts[parts.length - 1];

  // Check if last part is a number
  if (/^\d+$/.test(lastPart)) {
    // For Rajdhani digital carpets, use RD- prefix
    if (category === 'rajdhani-digital-carpets') {
      return `RD-${lastPart}`;
    }
    // For other collections, just use the number
    return lastPart;
  }

  // Fallback: try to find any number in the name
  const numberMatch = nameWithoutExt.match(/\d+/);
  if (numberMatch && category === 'rajdhani-digital-carpets') {
    return `RD-${numberMatch[0]}`;
  }

  // If no number found, format the whole name
  return nameWithoutExt
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Function to load images from API and update folders
export const loadCollectionImages = async (): Promise<CatalogFolder[]> => {
  const updatedFolders = await Promise.all(
    catalogFolders.map(async (folder) => {
      try {
        const images = await CollectionService.getCollectionImages(folder.id);

        // Convert API images to design format
        const designs = images.map((img, index) => ({
          id: `${folder.id}-${index + 1}`,
          name: formatImageName(img.key, folder.id),
          description: `${formatImageName(img.key, folder.id)} from ${folder.name}`,
          image: img.url,
          category: folder.id,
        }));

        // Update cover image if we have images
        const coverImage = images.length > 0 ? images[0].url : folder.coverImage;

        return {
          ...folder,
          coverImage,
          designs,
        };
      } catch (error) {
        console.error(`Error loading images for ${folder.id}:`, error);
        return folder;
      }
    })
  );

  return updatedFolders;
};
