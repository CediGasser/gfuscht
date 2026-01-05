FROM node:24-alpine AS builder

USER node
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM node:24-alpine

USER node
WORKDIR /app

COPY --from=builder /app/build ./build

ENV NODE_ENV=production

EXPOSE 3000
CMD ["node","build"]
