FROM node:16
WORKDIR /usr/code
COPY package*.json ./src/mysqlServer
RUN npm install
COPY . ./src/mysqlServer
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
