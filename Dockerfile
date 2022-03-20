# Dockerfile
FROM node:16.14.0-alpine

# create destination directory
RUN mkdir -p /usr/src/iucovoit
WORKDIR /usr/src/iucovoit

# update and install dependency
RUN apk update && apk upgrade

# copy the app, note .dockerignore
COPY . /usr/src/iucovoit
RUN yarn install
RUN yarn build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NODE_ENV="production"

CMD [ "nuxt", "start" ]
