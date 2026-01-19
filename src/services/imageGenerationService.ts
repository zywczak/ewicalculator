interface GeneratedImage {
  stepId: number;
  optionId: number;
  imageUrl: string;
  timestamp: number;
}

const STORAGE_KEY = 'generated_images';

export const imageGenerationService = {
  saveGeneratedImage: (image: GeneratedImage) => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      const images: GeneratedImage[] = stored ? JSON.parse(stored) : [];
      
      // Remove old image for the same step/option if exists
      const filteredImages = images.filter(
        img => !(img.stepId === image.stepId && img.optionId === image.optionId)
      );
      
      filteredImages.push(image);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filteredImages));
      console.log('Saved image to cache:', image.stepId, image.optionId);
    } catch (error) {
      console.error('Error saving generated image:', error);
    }
  },

  getGeneratedImage: (stepId: number, optionId: number): GeneratedImage | null => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      
      const images: GeneratedImage[] = JSON.parse(stored);
      const found = images.find(
        img => img.stepId === stepId && img.optionId === optionId
      );
      
      if (found) {
        console.log('Found cached image for step:', stepId, 'option:', optionId);
      }
      
      return found || null;
    } catch (error) {
      console.error('Error getting generated image:', error);
      return null;
    }
  },

  clearGeneratedImages: () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      console.log('Cleared all generated images');
    } catch (error) {
      console.error('Error clearing generated images:', error);
    }
  },

  getAllGeneratedImages: (): GeneratedImage[] => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting all generated images:', error);
      return [];
    }
  },

  getLastGeneratedImageBeforeStep: (stepId: number): GeneratedImage | null => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      
      const images: GeneratedImage[] = JSON.parse(stored);
      
      // Filter images before the given step and sort by step descending
      const previousImages = images
        .filter(img => img.stepId < stepId)
        .sort((a, b) => b.stepId - a.stepId);
      
      if (previousImages.length > 0) {
        console.log('Found last generated image before step', stepId, ':', previousImages[0]);
        return previousImages[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error getting last generated image:', error);
      return null;
    }
  },
};
