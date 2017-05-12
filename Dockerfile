# FROM node:6.10
FROM node:7.8.0
#FROM node:7.10.0

EXPOSE 3000
ADD . /app
WORKDIR /app

# This line should be removed when the included version of yarn in the container
# is no longer broken https://github.com/yarnpkg/yarn/issues/2266
RUN yarn global add node-gyp

RUN yarn install
CMD (sleep 5; npm start)