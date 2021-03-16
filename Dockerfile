FROM node:9.0.0

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

COPY . /app

RUN yarn install

CMD ["yarn", "server"]