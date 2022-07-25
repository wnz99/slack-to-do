FROM node:14.18.1-alpine AS base
ARG NODE_AUTH_TOKEN
WORKDIR /app
COPY package.json yarn.lock .npmrc ./
RUN yarn install --ignore-scripts && \
    yarn install --ignore-scripts --production --modules-folder node_modules_prod

## Build Container ##
FROM base as builder
ARG NODE_AUTH_TOKEN
COPY . .
RUN yarn build

FROM base as cert
WORKDIR /app
ADD https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem /app/rds-combined-ca-bundle.pem

FROM node:14.18.1-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=cert --chown=node:node /app/rds-combined-ca-bundle.pem ./dist/src/certs/rds-combined-ca-bundle.pem
COPY --from=base /app/node_modules_prod ./node_modules
# Run as non root user
USER node
EXPOSE 4000
ENTRYPOINT node -r dd-trace/init dist/src/main.js
