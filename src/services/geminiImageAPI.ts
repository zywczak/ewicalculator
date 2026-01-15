import { GenerationRequest } from './imageGenerationTypes';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export interface GeminiImageGenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

class GeminiImageGenerationAPI {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateImage(request: GenerationRequest): Promise<GeminiImageGenerationResponse> {
    try {
      if (!this.apiKey) {
        console.error('Gemini API key is not configured');
        return {
          success: false,
          error: 'API key not configured'
        };
      }

      // Pobierz base64 obrazów
      const baseImageBase64 = await this.imageUrlToBase64(request.baseImageUrl);
      const outlineImageBase64 = await this.imageUrlToBase64(request.outlineImageUrl);

      const prompt = this.buildPrompt(request);

      const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: baseImageBase64
                }
              },
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: outlineImageBase64
                }
              }
            ]
          }],
          generationConfig: {
            temperature: 0.4,
            topK: 32,
            topP: 1,
            maxOutputTokens: 4096,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      await response.json();
      
      // Gemini zwraca tekst, możemy potrzebować innego modelu do generowania obrazów
      // Tutaj zakładam, że używamy Imagen lub podobnego modelu
      // Na razie zwracam mock response
      
      return {
        success: true,
        imageUrl: request.baseImageUrl // Temporary - replace with actual generated image
      };

    } catch (error) {
      console.error('Error generating image with Gemini:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private buildPrompt(request: GenerationRequest): string {
    return `${request.prompt}
    
Context:
- Base house image provided
- Outline/mask image showing the area to modify
- Step ID: ${request.stepId}
- Option ID: ${request.optionId}

Please analyze these images and generate a modified version of the house image that incorporates the selected option while maintaining the original house structure and perspective.`;
  }

  private async imageUrlToBase64(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      throw error;
    }
  }
}

export const geminiImageAPI = new GeminiImageGenerationAPI(GEMINI_API_KEY);
