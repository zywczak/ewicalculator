import axios from "axios";

export interface ColorOption {
  id: number;
  colour_code: string;
  photo_uri: string;
}

let cachedColors: ColorOption[] | null = null;
let colorPromise: Promise<ColorOption[]> | null = null;

export const fetchColorsOnce = async (): Promise<ColorOption[]> => {
  if (cachedColors) {
    return cachedColors;
  }
  if (colorPromise) {
    return colorPromise;
  }
  colorPromise = (async () => {
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
    return cachedColors;
  })();
  return colorPromise;
};
