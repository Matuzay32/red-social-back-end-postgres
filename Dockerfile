FROM node:latest
RUN mkdir /myApp
WORKDIR /myApp
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]




