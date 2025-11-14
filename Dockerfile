# syntax=docker/dockerfile:1

FROM node:24 AS builder
WORKDIR /app
COPY package.json package-lock.json svelte.config.js vite.config.ts tsconfig.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-alpine
USER node:node
WORKDIR /app
COPY --from=builder --chown=node:node /app/build ./build
COPY --chown=node:node package.json ./
ENV PORT=443
EXPOSE ${PORT}
CMD ["node","build"]