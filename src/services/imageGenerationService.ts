import { GeneratedImage, ImageGenerationSession } from './imageGenerationTypes';

class ImageGenerationService {
  private readonly session: ImageGenerationSession;

  constructor() {
    const sessionId = this.getOrCreateSessionId();
    const storedImages = this.loadFromSessionStorage(sessionId);
    
    this.session = {
      sessionId,
      generatedImages: storedImages
    };
  }

  private getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem('calculator_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      sessionStorage.setItem('calculator_session_id', sessionId);
    }
    return sessionId;
  }

  private loadFromSessionStorage(sessionId: string): Map<string, GeneratedImage> {
    const key = `calculator_images_${sessionId}`;
    const stored = sessionStorage.getItem(key);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return new Map(Object.entries(parsed));
      } catch (e) {
        console.error('Failed to parse stored images:', e);
      }
    }
    
    return new Map();
  }

  private saveToSessionStorage(): void {
    const key = `calculator_images_${this.session.sessionId}`;
    const obj = Object.fromEntries(this.session.generatedImages);
    sessionStorage.setItem(key, JSON.stringify(obj));
  }

  private getImageKey(stepId: number, optionId: number): string {
    return `${stepId}_${optionId}`;
  }

  public getGeneratedImage(stepId: number, optionId: number): GeneratedImage | null {
    const key = this.getImageKey(stepId, optionId);
    return this.session.generatedImages.get(key) || null;
  }

  public saveGeneratedImage(image: GeneratedImage): void {
    const key = this.getImageKey(image.stepId, image.optionId);
    this.session.generatedImages.set(key, image);
    this.saveToSessionStorage();
  }

  public hasGeneratedImage(stepId: number, optionId: number): boolean {
    const key = this.getImageKey(stepId, optionId);
    return this.session.generatedImages.has(key);
  }

  public clearSession(): void {
    const key = `calculator_images_${this.session.sessionId}`;
    sessionStorage.removeItem(key);
    sessionStorage.removeItem('calculator_session_id');
    this.session.generatedImages.clear();
  }

  public getAllGeneratedImages(): GeneratedImage[] {
    return Array.from(this.session.generatedImages.values());
  }
}

// Singleton instance
export const imageGenerationService = new ImageGenerationService();
