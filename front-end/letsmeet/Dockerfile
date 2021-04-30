# Dockerfile for React client: will build the client app and expose it on port 3000

FROM node:14.7-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for caching purposes
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy local files
COPY . .

<<<<<<< HEAD
ENV REACT_CLIENT_BASE_URL="http://localhost:4000"
=======
ENV REACT_APP_BASE_URL="http://localhost:4000"
>>>>>>> 24d910632228629b23f1e4e005588b98b3ffca89

EXPOSE 3000

CMD ["npm", "start"]