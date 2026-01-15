export interface GeneratedImage {
  stepId: number;
  optionId: number;
  imageUrl: string; // Base64 lub URL
  timestamp: number;
}

export interface ImageGenerationSession {
  sessionId: string;
  generatedImages: Map<string, GeneratedImage>;
}

export interface GenerationRequest {
  baseImageUrl: string;
  outlineImageUrl: string;
  selectedOptions: number[];
  stepId: number;
  optionId: number;
  prompt: string;
}
