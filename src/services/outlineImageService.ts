const OUTLINE_IMAGE_KEY = 'house_outline_image';
const BASE_IMAGE_KEY = 'house_base_image';

export const outlineImageService = {
  saveOutlineImage: (imageUrl: string) => {
    try {
      sessionStorage.setItem(OUTLINE_IMAGE_KEY, imageUrl);
    } catch (error) {
      console.error('Error saving outline image:', error);
    }
  },

  getOutlineImage: (): string | null => {
    try {
      return sessionStorage.getItem(OUTLINE_IMAGE_KEY);
    } catch (error) {
      console.error('Error getting outline image:', error);
      return null;
    }
  },

  clearOutlineImage: () => {
    try {
      sessionStorage.removeItem(OUTLINE_IMAGE_KEY);
    } catch (error) {
      console.error('Error clearing outline image:', error);
    }
  },

  saveBaseImage: (imageUrl: string) => {
    try {
      sessionStorage.setItem(BASE_IMAGE_KEY, imageUrl);
    } catch (error) {
      console.error('Error saving base image:', error);
    }
  },

  getBaseImage: (): string | null => {
    try {
      return sessionStorage.getItem(BASE_IMAGE_KEY);
    } catch (error) {
      console.error('Error getting base image:', error);
      return null;
    }
  },

  clearBaseImage: () => {
    try {
      sessionStorage.removeItem(BASE_IMAGE_KEY);
    } catch (error) {
      console.error('Error clearing base image:', error);
    }
  },

  clearAll: () => {
    try {
      sessionStorage.removeItem(OUTLINE_IMAGE_KEY);
      sessionStorage.removeItem(BASE_IMAGE_KEY);
    } catch (error) {
      console.error('Error clearing images:', error);
    }
  }
};
