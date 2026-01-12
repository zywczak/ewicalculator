import { LAYER_CHOICES } from "./constants";
import STEP_OPTION_IMAGES from "./imageMapping";
import { LayerType } from "./types";

export const findBestMatchingImage = (
  layer: LayerType,
  selectedOptions: number[]
): string | null => {
  const matched = STEP_OPTION_IMAGES
    .filter(img => img.layer === layer)
    .filter(img => img.options.every(optId => selectedOptions.includes(optId)));

  if (matched.length === 0) return null;

  const bestMatch = matched.reduce((prev, curr) => {
    const prevMax = Math.max(...prev.options);
    const currMax = Math.max(...curr.options);
    return currMax > prevMax ? curr : prev;
  }, matched[0]);

  return bestMatch.image_url;
};

export const buildOverlayImages = (selectedOptions: number[]) => {
  const overlays: Record<LayerType, string | null> = {
    main: null,
    second: null,
    third: null,
    fourth: null,
    fifth: null,
    sixth: null,
    seventh: null,
    eighth: null,
  };

  LAYER_CHOICES.forEach(layer => {
    overlays[layer] = findBestMatchingImage(layer, selectedOptions);
  });

  return overlays;
};
