# ---- Build Stage ----
FROM node:22.13.1-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
# Lockfile enthält teils Mirror-URLs aus der Entwicklungsumgebung → offizielle Registry
RUN sed -i 's#https://npm.mirrors.msh.team#https://registry.npmjs.org#g' package-lock.json \
    && npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ---- Serve Stage ----
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
