# Stage 1: Build the Next.js app
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve the Next.js app with a lightweight server
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=builder /app ./

# Install 'serve' to serve the app
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["serve", "-s", "out"]
