FROM node:22-alpine3.18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typeorm

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
