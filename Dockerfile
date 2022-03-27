# Dockerfile
FROM node:16.14.0-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN yarn install
RUN --mount=type=secret,id=AUTH0_CLIENTID \
    export AUTH0_CLIENTID=$(cat /run/secrets/AUTH0_CLIENTID) && \
    yarn build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NODE_ENV="production"

CMD [ "yarn", "start" ]
