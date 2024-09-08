FROM node:latest

WORKDIR /workspace/client

COPY package*.json .

COPY . .

EXPOSE 3000

VOLUME "/workspace/client"

RUN npm install
CMD ["npm", "run", "dev"]