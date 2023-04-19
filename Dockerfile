FROM node:16

EXPOSE 2021

WORKDIR /app

RUN npm i npm@lastest -g

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]