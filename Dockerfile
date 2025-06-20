# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=4200

# Expose the port (will be overridden by docker-compose)
EXPOSE ${PORT}

# Start the application
CMD ["npm", "start"] 