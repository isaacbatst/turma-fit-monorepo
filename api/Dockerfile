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
ENV NODE_ENV production
RUN yarn build
RUN rm -rf node_modules
RUN yarn --frozen-lockfile --production
RUN yarn prisma generate

FROM node:18-alpine as production
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
CMD ["yarn", "start:prod"]