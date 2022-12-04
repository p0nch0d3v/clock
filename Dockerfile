FROM node:lts-alpine as build-step

RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

# Stage 2
FROM nginx:alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
COPY public/*.ttf /usr/share/nginx/html/assets
COPY public/*.woff2 /usr/share/nginx/html/assets
