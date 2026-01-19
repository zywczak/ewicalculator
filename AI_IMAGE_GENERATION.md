# Konfiguracja generowania zdjęć AI

## Wymagania

1. **Klucz API Gemini**
   - Utwórz konto na [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Wygeneruj klucz API
   - Skopiuj `.env.example` do `.env` i wklej swój klucz

## Zdjęcia zakreśleń (outline images)

Dla każdego typu domu potrzebne są dwa pliki w folderze `public/media/`:

## Zakreślenia - wytyczne

Outline images powinny:
- Mieć przezroczyste tło (PNG)
- Zawierać czerwoną linię (#ff0000) o grubości 3px
- Dokładnie obrysowywać kontur domu
- Być w tym samym rozmiarze co oryginalne zdjęcie

## Kroki z generowaniem AI

W plikach `src/data/steps/steps/*.ts` możesz dodać:

```typescript
export const STEP_X: FormStep = {
  // ... inne właściwości
  generateImageWithAI: true,
  aiImagePrompt: "Opis modyfikacji dla AI. Użyj {option_value} dla wartości opcji.",
  // ...
}
```

### Przykład dla Step 2 (Surface):
```typescript
generateImageWithAI: true,
aiImagePrompt: "Apply the selected surface material texture to the house. Material: {option_value}. Maintain the house structure and apply realistic material texture."
```

## Jak to działa

1. **Wybór opcji** - użytkownik wybiera opcję w kroku z `generateImageWithAI: true`
2. **Sprawdzenie cache** - system sprawdza czy zdjęcie dla tej opcji już istnieje w sesji
3. **Generowanie** - jeśli nie istnieje, wysyła request do Gemini API z:
   - Oryginalnym zdjęciem domu
   - Zakreśleniem (outline)
   - Promptem z opcją
4. **Zapisanie** - wygenerowane zdjęcie jest zapisywane w `sessionStorage`
5. **Wyświetlenie** - zdjęcie jest pokazywane zamiast domyślnego

## SessionStorage

Wygenerowane zdjęcia są przechowywane w `sessionStorage` pod kluczem:
```
calculator_images_{sessionId}
```

Format: `{stepId}_{optionId}: GeneratedImage`

## Czyszczenie sesji

```typescript
import { imageGenerationService } from './services/imageGenerationService';

// Wyczyść wszystkie wygenerowane zdjęcia
imageGenerationService.clearSession();
```
