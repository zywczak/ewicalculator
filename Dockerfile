FROM node:20-alpine

WORKDIR /app

# instalacja zależności
COPY package*.json ./
RUN npm install

# kopiujemy resztę
COPY . .

# build widget
RUN npm run build

# port vite preview
EXPOSE 4173

# uruchamiamy preview na 0.0.0.0
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]