# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the app
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add custom Nginx configuration to handle React routing and port mapping if needed
# A default nginx.conf is okay, but we will expose port 80 and let docker-compose map it to 3000
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
