FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma migrate dev --name init

EXPOSE 3011

CMD ["node", "src/app.js"]