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

