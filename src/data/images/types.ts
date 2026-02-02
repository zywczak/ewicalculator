export interface DefaultHouseImage {
  houseType: 'detached' | 'semi-detached' | 'terraced';
  defaultImage: string;
  outlineImage: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface HouseOutline {
  points: Point[];
  isComplete: boolean;
}

export interface CustomHouseImage {
  imageUrl: string;
  outline: HouseOutline | null;
}

export interface StepOptionImage {
  image_url: string;
  options: number[];
  mask_url?: string; // Optional mask showing which area to change
}