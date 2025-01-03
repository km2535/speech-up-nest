FROM node:18
LABEL authors="leekangmin"

WORKDIR /usr/src/app

COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the NestJS app source code into the image
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Expose the port the app runs on
EXPOSE 8080

COPY .env.prod .env.prod

# Step 8: Define the command to run the app
CMD ["npm", "run", "start:prod"]