import axios from "axios";

export interface ColorOption {
  id: number;
  colour_code: string;
  photo_uri: string;
}

let cachedColors: ColorOption[] | null = null;
let colorPromise: Promise<ColorOption[]> | null = null;
let imagesLoaded: Record<string, boolean> = {};
let preloadStarted = false;
let allImagesLoadedPromise: Promise<void> | null = null;

export const areColorImagesLoaded = (): boolean => {
  if (!cachedColors) return false;
  return cachedColors.every(color => imagesLoaded[color.photo_uri]);
};

export const waitForAllImages = (): Promise<void> => {
  if (allImagesLoadedPromise) return allImagesLoadedPromise;
  
  allImagesLoadedPromise = new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      if (areColorImagesLoaded()) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 100);
    
    setTimeout(() => {
      clearInterval(checkInterval);
      resolve();
    }, 30000);
  });
  
  return allImagesLoadedPromise;
};

const preloadColorImages = (colors: ColorOption[]): Promise<void> => {
  if (preloadStarted) return waitForAllImages();
  preloadStarted = true;
  
  const loadedImages: Record<string, string> = {};
  const imagePromises: Promise<void>[] = [];
  
  colors.forEach((color) => {
    if (color.photo_uri) {
      const promise = new Promise<void>((resolve) => {
        fetch(color.photo_uri)
          .then(response => response.blob())
          .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            loadedImages[color.photo_uri] = blobUrl;
            imagesLoaded[color.photo_uri] = true;
            resolve();
          })
          .catch(() => {
            loadedImages[color.photo_uri] = color.photo_uri;
            imagesLoaded[color.photo_uri] = true;
            console.warn(`Failed to preload image: ${color.photo_uri}`);
            resolve();
          });
      });
      imagePromises.push(promise);
      imagesLoaded[color.photo_uri] = false;
    }
  });
  
  if (typeof globalThis !== 'undefined') {
    (globalThis as any).__preloadedColorImages = loadedImages;
  }
  
  allImagesLoadedPromise = Promise.all(imagePromises).then(() => {
    console.log('All color images preloaded successfully');
  });
  
  return allImagesLoadedPromise;
};

export const getPreloadedImageUrl = (photoUri: string): string => {
  if (typeof globalThis !== 'undefined') {
    const preloaded = (globalThis as any).__preloadedColorImages;
    if (preloaded?.[photoUri]) {
      return preloaded[photoUri];
    }
  }
  return photoUri;
};

export const fetchColorsOnce = async (): Promise<ColorOption[]> => {
  if (cachedColors) {
    if (!preloadStarted) {
      preloadColorImages(cachedColors);
    }
    return cachedColors;
  }
  
  if (colorPromise) {
    return colorPromise;
  }
  
  colorPromise = (async () => {
    try {
      const response = await axios.post(
        "https://api-veen-e.ewipro.com/v1/webAPI/",
        {
          action: "getColourCodes",
          filters: [{ popularColoursOnly: true }],
          start: 0,
          limit: 5000,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic C6zfkhf2GgnDzaQkVLy8kJE4qmn8A4jhN5QLjCYB",
          },
        }
      );

      let colorData: ColorOption[] = [];
      if (response.data?.results && Array.isArray(response.data.results)) {
        colorData = response.data.results;
      } else if (Array.isArray(response.data)) {
        colorData = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        colorData = response.data.data;
      }

      cachedColors = colorData.filter(color => !!color.photo_uri);
      
      if (typeof globalThis !== 'undefined') {
        (globalThis as any).__colorCache = cachedColors;
      }
      
      preloadColorImages(cachedColors);
      
      console.log(`Fetched ${cachedColors.length} colors, starting image preload`);
      
      return cachedColors;
    } catch (error) {
      console.error('Error fetching colors:', error);
      throw error;
    }
  })();
  
  return colorPromise;
};

export const initializeColorPreloading = () => {
  fetchColorsOnce().catch(err => {
    console.error('Failed to initialize color preloading:', err);
  });
};