'use strict';

const Request = require('request');

// Start calling the APIs
const urlList = [
    'http://localhost:3000/',
    'http://localhost:3000/pass',
    'http://localhost:3000/fail',
    'http://localhost:3000/failboom',
    'http://localhost:3000/redirect'
];

let countPoll = 0;
let countTotal = 0;
let countFail = 0;
let countBoom = 0;

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
          Request(urlList[i], null);
        }
    };
    console.log('Poll: ' + countPoll + ' | total: ' + countTotal + ' | fail: ' + countFail + ' | boom: ' + countBoom);

    // Re-run every 5s
    let delay = Math.random() * 5000;
    setTimeout(poll, delay);
}

poll();