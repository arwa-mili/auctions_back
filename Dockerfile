FROM node:18-slim

WORKDIR /usr/src/app

# install deps
COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/services/gateway/main.js"]
