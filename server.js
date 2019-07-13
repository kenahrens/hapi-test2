'use strict';

require('newrelic');
require('./pm2-to-newrelic.js');

const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');

const getMetricEmitter = require('@newrelic/native-metrics');

const init = async () => {

    const server = Hapi.server({
        port: 3000
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return 'Hello, world!';
        }
    });
    
    server.route({
        method: 'GET',
        path: '/metrics',
        handler: function (request, h) {
            var emitter = getMetricEmitter();
            var loopMetrics = emitter.getLoopMetrics();
            return loopMetrics;
        }
    });
    
    server.route({
        method: 'GET',
        path: '/user/{name}',
        handler: function (request, h) {
            return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
        }
    });
    
    // Additional routes
    server.route({
        method: 'GET',
        path: '/pass',
        handler: function (request, h) {
    
            return { message: 'This is going to pass' };
        }
    });
    
    server.route({
        method: 'GET',
        path: '/slow',
        handler: function(request, h) {
            var tempArr = [];
            for (var i=1000000; i > 0; i--) {
                tempArr.push(i);
            }
            tempArr.sort();
            return {message: 'This is a slow transaction'};
        }
    });
    
    server.route({
        method: 'GET',
        path: '/crash',
        handler: function(request, h) {
            process.exit(1);
        }
    });
    
    server.route({
        method: 'GET',
        path: '/fail',
        handler: function (request, h) {
    
            // This should trigger the error response
            const error = new Error('whoops this is an uncaught exception');
            throw (error);
        }
    });
    
    server.route({
        method: 'GET',
        path: '/failboom',
        handler: function (request, h) {
    
            throw Boom.badRequest('Need to avoid this url.');
        }
    });
    
    // server.route({
    //     method: 'GET',
    //     path: '/redirect',
    //     handler: function (request, h) {
    
    //         reply.redirect('/');
    //     }
    // });
    
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

// module.exports = server;