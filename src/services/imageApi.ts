export interface GenerateImageRequest {
  imageUrl: string;
  prompt: string;
}

export interface GenerateImageResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export const imageApi = {
  generateImage: async (
    request: GenerateImageRequest
  ): Promise<GenerateImageResponse> => {
    try {
      const response = await fetch(
        "https://twoj-backend.pl/api/generate-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            image: request.imageUrl,
            prompt: request.prompt
          })
        }
      );

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const data = await response.json();

      return {
        success: true,
        imageUrl: data.imageUrl
      };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        error: "Image generation error"
      };
    }
  }
};
