FROM node:alpine

EXPOSE 3000

WORKDIR /usr/src/client
COPY . .
RUN npm install
RUN npm run-script build


CMD npm start
