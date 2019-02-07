FROM node:alpine

WORKDIR /var/myApp

COPY ./package*.json ./

RUN npm install

COPY . . 

EXPOSE 9000

ENTRYPOINT [ "npm","start" ]