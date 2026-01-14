const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export interface CollectionImage {
  url: string;
  key: string;
  size: number;
  lastModified: string;
}

export interface CollectionResponse {
  success: boolean;
  collection: string;
  images: CollectionImage[];
  count: number;
}

export const CollectionService = {
  /**
   * Get all images from a collection
   */
  async getCollectionImages(collectionName: string): Promise<CollectionImage[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/collections/${collectionName}/images`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.statusText}`);
      }

      const data: CollectionResponse = await response.json();
      
      if (data.success) {
        return data.images;
      } else {
        throw new Error('Failed to fetch collection images');
      }
    } catch (error) {
      console.error('Error fetching collection images:', error);
      return [];
    }
  },

  /**
   * Upload image to a collection (requires authentication)
   */
  async uploadImage(collectionName: string, file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/collections/${collectionName}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        return data.url;
      } else {
        throw new Error(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  /**
   * Delete image from collection (requires authentication)
   */
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/collections/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete image: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },
};
