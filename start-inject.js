'use strict';

const nr = require('newrelic');
const server = require('./server.js');

const urlList = [
  '/',
  '/pass',
  '/failboom',
  '/redirect'
];

function pollInject() {
  console.log('pollInject() start');
  for (let i = 0; i < urlList.length; ++i) {
    let options = {
      method: 'GET',
      url: urlList[i]
    }
    var transactionName = 'custom' + options.url;
    console.log('About to call ' + transactionName);
    server.inject(options, nr.createWebTransaction(transactionName, function(res) {
      console.log('Inject ' + options.url + ' code (' + res.statusCode + ')');
      nr.endTransaction();
    }));
  };

  // Re-run every 5s
  console.log('pollInject() complete');
  let delay = 5000;
  setTimeout(pollInject, delay);
}

setTimeout(pollInject, 2000);
