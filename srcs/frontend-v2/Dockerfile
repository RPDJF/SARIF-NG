FROM node:24.4.0-alpine

RUN apk update
RUN apk upgrade

RUN apk add openssl

EXPOSE 4200

WORKDIR /app

# App source
COPY src ./src
COPY package.json ./
COPY package-lock.json ./
COPY server.ts ./
COPY .npmrc ./
COPY .nvmrc ./

# Angular
COPY angular.json ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.spec.json ./

# Styling
COPY .postcssrc.json ./
COPY tailwind.config.js ./

COPY docker-entrypoint.sh ./

RUN npm i
RUN npm run build

ENTRYPOINT ["/bin/sh", "./docker-entrypoint.sh"]
