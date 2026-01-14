export interface CarpetDesign {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  dimensions?: string;
}

export interface CatalogFolder {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  designs: CarpetDesign[];
}
