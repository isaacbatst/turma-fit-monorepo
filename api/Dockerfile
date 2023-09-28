FROM node:18-alpine as dev
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY ./prisma ./prisma
RUN yarn prisma generate
COPY . .
ENTRYPOINT ["yarn"]
CMD ["start:dev"]
EXPOSE 3000

FROM node:18-alpine as builder
WORKDIR /app
COPY --from=dev /app/node_modules ./node_modules
COPY . . 
RUN yarn build


FROM node:18-alpine as production
WORKDIR /app
ENV NODE_ENV production
RUN yarn --frozen-lockfile --production
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/main.js"]