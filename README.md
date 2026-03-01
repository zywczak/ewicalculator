# EWI-Pro Kalkulator Materiałów

Interaktywny kalkulator materiałów do systemów ociepleń EWI-Pro, dostępny jako aplikacja webowa oraz widget do osadzenia na innych stronach.

## Funkcje
- Wieloetapowy formularz doboru materiałów do ociepleń
- Dynamiczne podsumowanie i kalkulacja ilości materiałów
- Podgląd wizualny domu i wybranych opcji
- Obsługa zdjęć i rysowania konturów
- Tryb responsywny (desktop/mobile)
- Możliwość osadzenia jako widget (web component)

## Stos technologiczny
- React + TypeScript
- Vite
- Material UI
- react-to-webcomponent (widget)

## Instalacja

1. Zainstaluj zależności:
   ```bash
   npm install
   ```

2. Uruchom aplikację developerską:
   ```bash
   npm run dev
   ```
   Domyślnie aplikacja będzie dostępna pod `http://localhost:5173`.

## Budowanie widgetu

Aby zbudować wersję widgetu (web component):

```bash
npm run build
```

Plik wynikowy znajdziesz w katalogu `dist/` jako `form-widget.js`.

## Osadzanie widgetu

1. Skopiuj plik `dist/form-widget.js` na swoją stronę lub załącz adres .
2. Dodaj do HTML:
   ```html
   <script type="module" src="form-widget.js"></script>
   <form-widget></form-widget>
   ```

## Konfiguracja API

Aplikacja korzysta z klucza API do autoryzacji. Możesz przekazać go przez parametr URL `?apiKEY=...` lub ustawić w pliku `.env` jako `VITE_API_KEY`.
