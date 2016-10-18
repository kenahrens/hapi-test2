# Hapi Sample App

## Quick Start Instructions

This will download the repository, install dependencies and start the app.
```
kahrens:github kahrens$ git clone https://github.com/kenahrens/hapi-test2.git
Cloning into 'hapi-test2'...
...

kahrens:github kahrens$ cd hapi-test2/
kahrens:hapi-test2 kahrens$ npm install
...

kahrens:hapi-test2 kahrens$ npm start

> hapi-test2@1.0.0 start /Users/kahrens/Documents/github/hapi-test2
> node server.js

161018/180510.446, [log,info] data: Server running at: http://kahrens:3000
```

## Running the Load Test

This is how you run the load test (in another window):
```
kahrens:hapi-test2 kahrens$ node load/load.js 
Poll: 1 | total: 2 | fail: 0 | boom: 0
...
```
