# ---------- build stage ----------
FROM node:16-bullseye-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY . .
RUN npx parcel build --public-url . --no-minify index.html

# ---------- runtime stage ----------
FROM nginx:1.25-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
