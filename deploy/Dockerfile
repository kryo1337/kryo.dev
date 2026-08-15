FROM node:22-alpine AS build
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build && chmod -R a+rX out && find out -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' -o -name '*.json' -o -name '*.svg' -o -name '*.txt' \) -exec gzip -9 -k {} +

FROM nginx:alpine-slim
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/out/ /usr/share/nginx/html/
EXPOSE 8080
