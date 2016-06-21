'use strict';

const newrelic = require('newrelic');
const server = require('./server.js');

const urlList = [
  'http://localhost:3000/',
  'http://localhost:3000/pass',
  'http://localhost:3000/failboom',
  'http://localhost:3000/redirect'
];

function pollInject() {
  console.log('pollInject() start');
  for (let i = 0; i < urlList.length; ++i) {
    let options = {
      method: 'GET',
      url: urlList[i]
    }
    console.log('About to call ' + options.url);
    server.inject(options, function(res) {
      console.log('Inject ' + options.url + ' code (' + res.statusCode + ')');
    });
  };

  // Re-run every 5s
  console.log('pollInject() complete');
  let delay = 5000;
  setTimeout(pollInject, delay);
}

setTimeout(pollInject, 2000);
