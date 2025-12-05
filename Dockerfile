# syntax=docker/dockerfile:1.7

FROM --platform=linux/amd64 node:20-bookworm-slim AS base

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
ENV NODE_ENV=development

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

FROM base AS builder
ARG DATABASE_URL="postgresql://postgres:postgres@db:5432/musicplay?schema=public"
ENV DATABASE_URL=${DATABASE_URL}

COPY . .
RUN npx prisma generate
RUN npm run build

FROM --platform=linux/amd64 node:20-bookworm-slim AS runner

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/docker/entrypoint.sh ./docker/entrypoint.sh

RUN chmod +x ./docker/entrypoint.sh
EXPOSE 3000

CMD ["./docker/entrypoint.sh"]
