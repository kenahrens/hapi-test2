'use strict';

const newrelic = require('newrelic');
const server = require('./server.js');

const urlList = [
  'http://localhost:3000/',
  'http://localhost:3000/pass',
  'http://localhost:3000/fail',
  'http://localhost:3000/failboom',
  'http://localhost:3000/redirect'
];

function poll() {
  for (let i = 0; i < urlList.length; ++i) {
    let options = {
      method: 'GET',
      url: urlList[i]
    }
    server.inject(options);

    // Re-run every 5s
    let delay = 5000;
    setTimeout(poll, delay);
  };
}

poll();
