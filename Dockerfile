FROM node:10.13.0

EXPOSE 3000
ADD . /app
WORKDIR /app

# This line should be removed when the included version of yarn in the container
# is no longer broken https://github.com/yarnpkg/yarn/issues/2266
# RUN yarn global add node-gyp

RUN yarn install
#RUN yarn install --pure-lockfile --production --ignore-scripts
#RUN (cd ./node_modules/\@newrelic/native-metrics; node-gyp configure; node-gyp build -j 4)

CMD (sleep 5; npm start)
#CMD (sleep 5; ./node_modules/pm2/bin/pm2 start server.js --no-daemon)
