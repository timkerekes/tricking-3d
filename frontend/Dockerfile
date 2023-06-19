# Stage 1: build frontend image
FROM node:16.18.1-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install

RUN npm install -g prisma

COPY ./prisma ./prisma
RUN prisma generate

COPY . .

RUN pnpm run build


# Stage 2: Create final image
FROM node:16.18.1-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN pnpm install
COPY --from=builder /app/.next ./.next

COPY --from=builder ./prisma ./prisma

# move to prisma directory & install & generate prisma
RUN npm install -g prisma

# COPY ./prisma ./prisma
RUN prisma generate

EXPOSE 3000

CMD [ "pnpm", "run", "start" ]