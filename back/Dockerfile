FROM node:22-alpine AS base

WORKDIR /app

ENV NODE_ENV="production"

COPY . .

FROM base AS build

RUN npm install
RUN npm run build

FROM base AS production

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/prisma /app/prisma

CMD [ "npm", "run", "start" ]