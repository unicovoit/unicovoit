FROM registry.finxol.io/build-tools:main as builder

WORKDIR /home/node/build
RUN chown -R node:node /home/node/build

# Only copy the lockfile to install dependencies
COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node .yarnrc.prod.yml .yarnrc.yml
RUN corepack prepare yarn@stable --activate
RUN yarn set version stable
RUN yarn plugin import workspace-tools
RUN yarn install

# Copy all files, and build the app
COPY --chown=node:node . ./
RUN --mount=type=secret,id=AUTH0_CLIENTID \
    --mount=type=secret,id=AUTH0_DOMAIN \
    export AUTH0_CLIENTID=$(cat /run/secrets/AUTH0_CLIENTID) && \
    export AUTH0_DOMAIN=$(cat /run/secrets/AUTH0_DOMAIN) && \
    export NODE_OPTIONS="--openssl-legacy-provider" && \
    yarn build

# Now we remove the node_modules, as we only need production dependencies in the docker image
RUN rm -rf ./node_modules/

# change ownership of the build directory to node:node
RUN chown -R node:node /home/node/build

USER node

RUN yarn workspaces focus --production --all

# Remove useless files and directories
RUN clean-modules --yes --exclude "**/*.mustache" --exclude "**/.cache/pwa/**"


FROM node:18-alpine as runtime
LABEL maintainer="finxol <contact@finxol.io>"

ENV NUXT_HOST=0.0.0.0
ENV NODE_ENV="production"

# Remove some useless stuff
RUN rm -rf /usr/local/lib/node_modules/npm/ /usr/local/bin/npm

# create destination directory
WORKDIR /usr/src/unicovoit
RUN chown -R node:node /usr/src/unicovoit

RUN apk --no-cache add dumb-init tzdata

# change timezone
ENV TZ=Europe/Paris
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apk del tzdata

# Don't run container as root
USER node

# Copy the app to the destination directory
COPY --chown=node:node . ./
COPY --chown=node:node --from=builder /home/node/build/node_modules ./node_modules
COPY --chown=node:node --from=builder /home/node/build/.nuxt ./.nuxt
COPY --chown=node:node --from=builder /home/node/build/static/ ./static/

#HEALTHCHECK --interval=15s --timeout=5s --retries=5 \
#  CMD ["curl", "-H", "ignore-statistics: true", "http://localhost:3000"]


EXPOSE 3000

CMD ["dumb-init", "node", "--max-old-space-size=2048", "node_modules/nuxt-start/bin/nuxt-start.js", "--port", "3000"]
