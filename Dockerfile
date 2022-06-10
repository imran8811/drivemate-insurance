FROM node:14-alpine

WORKDIR /opt/app
RUN chown -R node:node /opt/app

USER node

ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc

COPY --chown=node:node package*.json ./

# RUN npm ci

COPY --chown=node:node . /opt/app

RUN npm install --no-package-lock --also=dev && npm run lint && npm run build

CMD [ "npm", "start" ]

EXPOSE 3000
