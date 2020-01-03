FROM node:10-alpine

RUN mkdir -p /usr/app/src
WORKDIR /usr/app

COPY package.json tsconfig.json /usr/app/
RUN npm install
COPY src/ /usr/app/src

EXPOSE 3000

CMD ["npm","run", "start"]