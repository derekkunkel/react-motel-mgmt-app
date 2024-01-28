FROM node:16.13.0
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
EXPOSE 3030
RUN npm i

CMD ["node", "./server.js"]