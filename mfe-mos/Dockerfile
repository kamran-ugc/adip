# Stage 1: Build the Angular application
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

# Copy the built application using the extracted project name
COPY --from=build /app/dist/mfe-mos /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]