FROM node:18-alpine as deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY ./prisma ./prisma
RUN yarn prisma generate

FROM node:18-alpine as dev
WORKDIR /app
COPY from=deps /app/node_modules ./node_modules
COPY . .
ENTRYPOINT ["yarn"]
CMD ["start:dev"]
EXPOSE 3000

FROM node:18-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . . 
RUN yarn build

FROM node:18-alpine as runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/main.js"]