# Static build of the (optional) ro-api-hub site, served by nginx.
#   docker build --build-arg SITE_URL=https://apis.example.org -t ro-api-hub .
#   docker run -p 8080:8080 ro-api-hub
# SITE_URL must be served from the domain root here (no path); it sets canonical
# URLs, sitemap, robots.txt, llms.txt and catalog.json page_url.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG SITE_URL=http://localhost:8080
ENV SITE_URL=${SITE_URL} NODE_OPTIONS=--max-old-space-size=4096 ASTRO_TELEMETRY_DISABLED=1
RUN npm run build && node scripts/check-dist-links.mjs && chmod -R a+rX dist

FROM nginx:1.30-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
