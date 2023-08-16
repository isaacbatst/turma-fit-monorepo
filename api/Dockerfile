FROM node:18-alpine as deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY ./prisma ./prisma
RUN yarn prisma generate
COPY . .
ENTRYPOINT ["yarn"]
CMD ["start:dev"]
EXPOSE 3000