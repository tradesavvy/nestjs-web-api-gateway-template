#############################
# BUILD FOR LOCAL DEVELOPMENT
#############################

FROM node:18.12.1-slim AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . . 

RUN yarn build

###################
# PRODUCTION
###################

FROM node:18.12.1-slim as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --only=prod

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
