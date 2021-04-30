# Dockerfile for React client: will build the client app and expose it on port 3000

FROM node:14.7-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for caching purposes
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy local files
COPY . .

ENV REACT_APP_BASE_URL="http://localhost:4000"

EXPOSE 3000

CMD ["npm", "start"]