FROM node:20.12.2-alpine
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]