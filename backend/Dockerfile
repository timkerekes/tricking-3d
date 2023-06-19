# Build and start backend Node Server
FROM node:16.18.1-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install --prod

COPY . .

EXPOSE 5000

CMD ["npm", "start"]