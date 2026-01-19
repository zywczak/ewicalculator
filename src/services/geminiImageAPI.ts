
const HF_TOKEN = import.meta.env.VITE_HF_TOKEN || '';
// Zmiana na model image-to-image
const HF_API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-refiner-1.0';
const HF_INPAINT_URL = 'https://api-inference.huggingface.co/models/diffusers/stable-diffusion-xl-1.0-inpainting-0.1';

export interface GeminiImageGenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

interface GenerateImageRequest {
  baseImageUrl: string;
  outlineImageUrl: string;
  selectedOptions: number[];
  stepId: number;
  optionId: number;
  prompt: string;
  productImageUrl?: string;
}

interface GenerateImageResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export const geminiImageAPI = {
  generateImage: async (request: GenerateImageRequest): Promise<GenerateImageResponse> => {
    try {
      console.log('Calling Hugging Face Image-to-Image API with request:', {
        ...request,
        baseImageUrl: request.baseImageUrl.substring(0, 50) + '...',
        outlineImageUrl: request.outlineImageUrl ? 'provided' : 'none',
        productImageUrl: request.productImageUrl ? 'provided' : 'none'
      });

      if (!HF_TOKEN) {
        console.error('HF_TOKEN is not configured');
        return {
          success: false,
          error: 'Hugging Face token not configured'
        };
      }

      // Konwertuj base image do blob
      const baseImageBlob = await urlToBlob(request.baseImageUrl);
      
      // Przygotuj prompt
      let enhancedPrompt = request.prompt;
      
      // Dodaj kontekst z produktu
      if (request.productImageUrl) {
        enhancedPrompt += ' Use the exact color and texture shown in the reference material sample.';
      }

      console.log('Enhanced prompt:', enhancedPrompt);

      // Wybierz API w zależności od tego czy mamy outline
      const apiUrl = request.outlineImageUrl ? HF_INPAINT_URL : HF_API_URL;
      
      // Przygotuj FormData dla image-to-image
      const formData = new FormData();
      formData.append('inputs', baseImageBlob, 'image.jpg');
      
      // Dodaj parametry jako JSON w osobnym polu
      const parameters = {
        prompt: enhancedPrompt,
        negative_prompt: 'blurry, low quality, distorted, unrealistic, cartoon, illustration',
        num_inference_steps: 30,
        guidance_scale: 7.5,
        strength: 0.75, // Jak mocno modyfikować obraz (0-1)
      };

      // Jeśli mamy outline (inpainting)
      if (request.outlineImageUrl) {
        const maskBlob = await urlToBlob(request.outlineImageUrl);
        formData.append('mask', maskBlob, 'mask.png');
        parameters.strength = 0.85; // Większa siła dla inpainting
      }

      console.log('Sending image-to-image request with strength:', parameters.strength);

      // Wywołanie do Hugging Face
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
        },
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Hugging Face API error:', errorText);
        
        // Jeśli model się ładuje, poczekaj i spróbuj ponownie
        if (errorText.includes('loading')) {
          console.log('Model is loading, waiting 20 seconds...');
          await new Promise(resolve => setTimeout(resolve, 20000));
          
          // Retry request
          const retryResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${HF_TOKEN}`,
            },
            body: formData
          });
          
          if (!retryResponse.ok) {
            throw new Error(`Retry failed: ${retryResponse.statusText}`);
          }
          
          const imageBlob = await retryResponse.blob();
          const generatedImageUrl = await blobToDataUrl(imageBlob);
          
          return {
            success: true,
            imageUrl: generatedImageUrl
          };
        }
        
        throw new Error(`API request failed: ${response.statusText}`);
      }

      // Otrzymany obraz jako blob
      const imageBlob = await response.blob();
      
      // Konwertuj blob do data URL
      const generatedImageUrl = await blobToDataUrl(imageBlob);

      console.log('Successfully generated image with image-to-image');

      return {
        success: true,
        imageUrl: generatedImageUrl
      };

    } catch (error) {
      console.error('Hugging Face API error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
};

async function urlToBlob(url: string): Promise<Blob> {
  const response = await fetch(url);
  return await response.blob();
}

async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function imageUrlToBase64(url: string): Promise<string> {
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
