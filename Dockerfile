FROM node:6.10

EXPOSE 3000
ADD . /app
WORKDIR /app
RUN npm install
CMD (sleep 5; npm start)