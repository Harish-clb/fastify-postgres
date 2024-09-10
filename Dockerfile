# Use the official image as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install curl
RUN apk add --no-cache curl

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# RUN apt-get update -y && apt-get install -y openssl

# Run the app
CMD ["npm", "run", "start"]