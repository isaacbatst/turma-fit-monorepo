FROM node:18-alpine as deps
WORKDIR /app
COPY package.json yarn.lock ./
COPY prisma ./prisma
RUN yarn install --frozen-lockfile

FROM node:18-alpine as dev
COPY --from=deps /app/node_modules ./node_modules
COPY . .
CMD ["yarn", "start:dev"]