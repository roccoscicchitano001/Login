FROM node:latest as api

# Crea directory dell'app
WORKDIR /usr/src/app

# Install app dependencies from package*
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000

CMD [ "node", "server.js" ]