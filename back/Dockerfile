FROM node:22-alpine AS base

WORKDIR /app

ENV NODE_ENV="production"
RUN apk add --no-cache openssl

COPY . .

FROM base AS build

RUN npm install
RUN npm run build

FROM base AS production

COPY --from=build /app/node_modules /app/node_modules

CMD [ "npm", "run", "start" ]