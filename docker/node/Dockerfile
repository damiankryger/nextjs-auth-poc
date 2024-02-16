FROM node:lts-alpine as build

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

USER node

RUN yarn install

FROM build as application

COPY --chown=node:node . .

EXPOSE 3000

CMD ["yarn", "dev"]


FROM application as production

RUN yarn build

CMD ["yarn", "start"]