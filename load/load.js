'use strict';

const Request = require('request');

// Start calling the APIs
var host = (process.argv.slice(2)[0] || 'localhost');
console.log('Running load against: ' + host);

const urlList = [
    'http://' + host + ':3000/',
    'http://' + host + ':3000/pass',
    'http://' + host + ':3000/fail',
    'http://' + host + ':3000/failboom',
    'http://' + host + ':3000/redirect',
    'http://' + host + ':3000/slow'
];

let countPoll = 0;
let countTotal = 0;
let countFail = 0;
let countBoom = 0;
let countSlow = 0;

function poll() {

    ++countPoll;
    for (let i = 0; i < urlList.length; ++i) {
        if (Math.random() > 0.5) {
          ++countTotal;
          if (i == 2) {
              ++countFail;
          }
          if (i == 3) {
              ++countBoom;
          }
          if (i ==4) {
              ++countSlow;
          }
          Request(urlList[i], null);
        }
    };
    console.log('Poll: ' + countPoll + ' | total: ' + countTotal + ' | fail: ' + countFail + ' | boom: ' + countBoom + ' | slow: ' + countSlow);

    // Re-run every 5s
    let delay = Math.random() * 5000;
    setTimeout(poll, delay);
}

poll();