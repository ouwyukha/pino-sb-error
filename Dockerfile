# syntax=docker/dockerfile:1
FROM node:16

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile --production=false

EXPOSE 3001
CMD [ "yarn", "dev" ]
