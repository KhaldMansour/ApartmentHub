# Step 1: Use Node.js image
FROM node:20 AS build

# Step 2: Set working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for backend
COPY Backend/package*.json ./

# Step 4: Install dependencies for backend
RUN npm install

# Step 5: Copy the rest of the files for backend
COPY Backend/ .


# RUN npm run seed
# Step 7: Expose port (NestJS default port is 3000)
EXPOSE 3000

# Step 8: Start the backend application
CMD ["npm", "run", "start:dev"]
