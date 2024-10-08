FROM node:20

WORKDIR /usr/src/app

COPY package*.json .

COPY pm2.json .

RUN npm install -g pm2

COPY . .

EXPOSE 41236

CMD ["pm2-runtime", "start", "pm2.json"]