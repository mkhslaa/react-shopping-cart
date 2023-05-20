FROM cypress/base:18.15.0

WORKDIR /e2e

COPY ./package.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress

RUN npm i
ENTRYPOINT ["npm", "build", "run"]
ENTRYPOINT ["npm", "start", "run"]
ENTRYPOINT ["npx", "cypress", "run"]