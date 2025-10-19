FROM node:24.4.0-alpine

RUN apk update
RUN apk upgrade

RUN apk add openssl

EXPOSE 4200

WORKDIR /app

# App source
COPY src ./src
COPY package.json ./
COPY server.ts ./
COPY .nvmrc ./
COPY environments ./
COPY postcss.config.js ./

# Angular
COPY angular.json ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.spec.json ./

# Styling
COPY tailwind.config.js ./

COPY docker-entrypoint.sh ./

RUN npm i -g @angular/cli@17
RUN npm i
RUN ng build

ENTRYPOINT ["/bin/sh", "./docker-entrypoint.sh"]
