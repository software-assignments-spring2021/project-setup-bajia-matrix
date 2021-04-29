# Dockerfile for Express server: will build the server and expose it on port 4000

FROM node:14.7-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for caching purposes
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy local files
COPY . .

EXPOSE 4000

CMD ["npm", "start"]