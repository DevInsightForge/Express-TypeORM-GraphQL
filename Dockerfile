# Build process
FROM node:lts-alpine as BUILDER

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile --network-timeout 100000

COPY . ./
RUN yarn build

# Main service
FROM nginx/unit:1.29.0-node18

WORKDIR /code
ENV NODE_ENV=production

COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile --network-timeout 100000
RUN yarn add global unit-http

COPY --from=BUILDER /usr/app/dist ./
RUN chmod a+x ./server.js
COPY unit.json /var/lib/unit/conf.json
