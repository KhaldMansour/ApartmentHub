# Step 1: Use Node.js image
FROM node:18 AS build

# Step 2: Set working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for frontend
COPY Frontend/package*.json .

# Step 4: Verify the files were copied (useful for debugging)
RUN ls -la /app

# Step 5: Install dependencies for frontend
RUN npm install

# Step 6: Copy the rest of the files for frontend
COPY Frontend/ .

# Step 7: Build the app (Next.js production build)
RUN npm run build

# Step 8: Expose port (Next.js default port is 3000)
EXPOSE 3000

# Step 9: Start the Next.js application
CMD ["npm", "run", "dev"]
