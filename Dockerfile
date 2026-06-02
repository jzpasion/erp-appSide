# ERP frontend — React (Create React App), built and served by nginx

# ---- build stage ----
FROM node:16 AS build

WORKDIR /app

# Don't let CRA treat lint warnings as errors during the production build
ENV CI=false

# Where the browser should reach the backend socket.io server.
# Baked in at build time (CRA only exposes REACT_APP_* env vars).
ARG REACT_APP_SOCKET_ENDPOINT=http://localhost:8080
ENV REACT_APP_SOCKET_ENDPOINT=$REACT_APP_SOCKET_ENDPOINT

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---- serve stage ----
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
