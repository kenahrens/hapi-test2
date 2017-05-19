const pm2 = require('pm2');
const newrelic = require('newrelic');

const DEFAULT_TIMEOUT = 15 * 1000;

// This is a list of how many restarts per process
var restartList = {};

// Get the metrics from PM2
var getMetrics = function getMetrics() {
  // console.log('- PM2 getMetrics()');
  pm2.connect(function(err) {
    if (err) {
      console.error('- PM2 connect error: ' + err);
    } else {
      pm2.list(function(err, list) {
        if (err) {
          console.error('- PM2 list error: ' + err);
        } else {
          for (var i=0; i < list.length; i++) {
            // Get the metrics
            var proc = list[i];
            var processName = proc.pm2_env.name;
            var totalRestarts = proc.pm2_env.restart_time;

            // Calculate per interval restarts
            var previousRestarts = restartList[processName] || 0;
            var intervalRestarts = totalRestarts - previousRestarts;
            restartList[processName] = totalRestarts;
            // console.log('totalRestarts=' + totalRestarts);
            // console.log('intervalRestarts=' + intervalRestarts);
            
            // Record the metrics
            var prefix = 'Custom/PM2/' + proc.pm2_env.name + '/';
            newrelic.recordMetric(prefix + 'cpu', proc.monit.cpu);
            newrelic.recordMetric(prefix + 'memory', proc.monit.memory);
            newrelic.recordMetric(prefix + 'totalRestarts', totalRestarts);
            newrelic.recordMetric(prefix + 'intervalRestarts', intervalRestarts);
          }
        }
      });
    }
  });
}

// console.log('PM2 Poller initializing');
// setTimeout(getMetrics(), DEFAULT_TIMEOUT);
setInterval(getMetrics, DEFAULT_TIMEOUT);

module.exports = {};