# Use official Node.js Alpine image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining backend files
COPY . .

# Expose the API port
EXPOSE 5000

# Start the node server
CMD ["npm", "start"]
