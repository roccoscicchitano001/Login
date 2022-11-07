FROM node:16.17.1 as ui

# Crea directory dell'app
WORKDIR /usr/src/app

# Install app dependencies from package*
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4200

CMD ["npm", "start"]