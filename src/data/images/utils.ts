import OPTION_IDS from "../constants/optionIds";
import { STEP_OPTION_IMAGES } from "./imageMapping";

export const getHouseTypeFromOptions = (selectedOptions: number[]): number | null => {
  if (selectedOptions.includes(OPTION_IDS.HOUSE.DETACHED)) {
    return OPTION_IDS.HOUSE.DETACHED;
  }
  if (selectedOptions.includes(OPTION_IDS.HOUSE.SEMI_DETACHED)) {
    return OPTION_IDS.HOUSE.SEMI_DETACHED;
  }
  if (selectedOptions.includes(OPTION_IDS.HOUSE.TERRACED)) {
    return OPTION_IDS.HOUSE.TERRACED;
  }
  return null;
};

/**
 * Znajduje najlepiej pasujący obraz na podstawie wybranych opcji
 * Zwraca obraz z największą liczbą dopasowanych opcji
 * Jeśli jest wiele obrazów z tą samą liczbą opcji, wybiera ten z najwyższym numerem opcji (najdalszy krok)
 */
export const findBestMatchingImage = (selectedOptions: number[]): string | null => {
  // Filtruj obrazy, które mają wszystkie swoje opcje zawarte w selectedOptions
  const matched = STEP_OPTION_IMAGES.filter(img => 
    img.options.every(optId => selectedOptions.includes(optId))
  );

  if (matched.length === 0) return null;

  // Wybierz obraz z największą liczbą dopasowanych opcji (najbardziej specyficzny)
  // Jeśli jest wiele obrazów z tą samą liczbą opcji, wybierz ten z najwyższym ID opcji (najdalszy krok)
  const bestMatch = matched.reduce((prev, curr) => {
    // Najpierw porównaj liczbę opcji
    if (curr.options.length > prev.options.length) {
      return curr;
    }
    if (curr.options.length < prev.options.length) {
      return prev;
    }
    
    // Jeśli liczba opcji jest taka sama, wybierz obraz z najwyższym numerem opcji (najdalszy krok)
    const maxCurrOption = Math.max(...curr.options);
    const maxPrevOption = Math.max(...prev.options);
    
    return maxCurrOption > maxPrevOption ? curr : prev;
  }, matched[0]);

  return bestMatch.image_url;
};

/**
 * Znajduje plik do wysłania do AI na podstawie typu domu
 * - Dla detached: zwraca default image z kroku 1
 * - Dla semi-detached i terraced: zwraca mask_url jeśli istnieje
 */
export const findFileToSend = (selectedOptions: number[]): string | null => {
  const houseType = getHouseTypeFromOptions(selectedOptions);
  
  // Dla detached - zawsze używaj default image
  if (houseType === OPTION_IDS.HOUSE.DETACHED) {
    return "/media/detacheddefault.jpg";
  }
  
  // Dla semi-detached i terraced - szukaj mask_url
  if (houseType === OPTION_IDS.HOUSE.SEMI_DETACHED || houseType === OPTION_IDS.HOUSE.TERRACED) {
    const matched = STEP_OPTION_IMAGES.filter(img => 
      img.options.every(optId => selectedOptions.includes(optId)) && img.mask_url
    );

    if (matched.length === 0) {
      // Fallback do default image jeśli nie ma maski
      if (houseType === OPTION_IDS.HOUSE.SEMI_DETACHED) {
        return "/media/semidetacheddefault.jpg";
      }
      return "/media/terraceddefault.jpg";
    }

    // Wybierz najbardziej specyficzną maskę (z największą liczbą opcji)
    const bestMatch = matched.reduce((prev, curr) => {
      if (curr.options.length > prev.options.length) {
        return curr;
      }
      if (curr.options.length < prev.options.length) {
        return prev;
      }
      
      const maxCurrOption = Math.max(...curr.options);
      const maxPrevOption = Math.max(...prev.options);
      
      return maxCurrOption > maxPrevOption ? curr : prev;
    }, matched[0]);

    return bestMatch.mask_url || null;
  }
  
  return null;
};

/**
 * Znajduje maskę dla wybranych opcji (jeśli istnieje)
 * Maska wskazuje obszar do zmiany przez AI
 */
export const findMaskForOptions = (selectedOptions: number[]): string | null => {
  const matched = STEP_OPTION_IMAGES.filter(img => 
    img.options.every(optId => selectedOptions.includes(optId)) && img.mask_url
  );

  if (matched.length === 0) return null;

  // Wybierz najbardziej specyficzną maskę (z największą liczbą opcji)
  const bestMatch = matched.reduce((prev, curr) => {
    if (curr.options.length > prev.options.length) {
      return curr;
    }
    if (curr.options.length < prev.options.length) {
      return prev;
    }
    
    const maxCurrOption = Math.max(...curr.options);
    const maxPrevOption = Math.max(...prev.options);
    
    return maxCurrOption > maxPrevOption ? curr : prev;
  }, matched[0]);

  return bestMatch.mask_url || null;
};

