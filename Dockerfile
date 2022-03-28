# Dockerfile
FROM node:16.14.0-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
RUN chown -R node:node /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade

RUN yarn global add clean-modules


#RUN cat /run/secrets/AUTH0_CLIENTID

# copy the app, note .dockerignore
COPY --chown=node:node . /usr/src/nuxt-app/

RUN yarn install
RUN --mount=type=secret,id=AUTH0_CLIENTID \
    --mount=type=secret,id=AUTH0_DOMAIN \
    export AUTH0_CLIENTID=$(cat /run/secrets/AUTH0_CLIENTID) && \
    export AUTH0_DOMAIN=$(cat /run/secrets/AUTH0_DOMAIN) && \
    yarn build

RUN clean-modules --yes --exclude "**/*.mustache" --exclude "**/.cache/pwa/**"

# Don't run container as root
USER node

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NODE_ENV="production"

CMD [ "yarn", "start" ]
