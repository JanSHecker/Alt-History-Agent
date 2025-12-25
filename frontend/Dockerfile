FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# For development, we'll use volume mounts so we don't need to copy source code
# The source code will be mounted as a volume in docker-compose.yml

# Expose port
EXPOSE 5173

# Default command
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Run the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]