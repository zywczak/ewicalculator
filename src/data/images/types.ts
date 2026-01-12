export type LayerType = 
  | "main" 
  | "second" 
  | "third" 
  | "fourth" 
  | "fifth" 
  | "sixth" 
  | "seventh" 
  | "eighth";

export interface StepOptionImage {
  layer: LayerType;
  image_url: string;
  options: number[];
}