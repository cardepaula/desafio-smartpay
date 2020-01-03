FROM node:10-alpine

RUN mkdir -p /usr/app/src
WORKDIR /usr/app

COPY package.json tsconfig.json tsconfig.build.json /usr/app/
COPY /src/script/textFiles/estabelecimentos.csv /src/script/textFiles/produtos.txt /usr/
RUN npm install
COPY src/ /usr/app/src

EXPOSE 3000

CMD ["npm","run", "start"]