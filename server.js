'use strict';

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/user/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

// Additional routes
server.route({
    method: 'GET',
    path: '/pass',
    handler: function (request, reply) {

        reply({ message: 'This is going to pass' });
    }
});

server.route({
    method: 'GET',
    path: '/fail',
    handler: function (request, reply) {

        // This should trigger the error response
        const error = new Error('whoops this is an uncaught exception');
        throw (error);
    }
});

server.route({
    method: 'GET',
    path: '/failboom',
    handler: function (request, reply) {

        const boomerr = new Error('this is a boom exception');
        reply(Boom.wrap(boomerr, 400));
    }
});

server.route({
    method: 'GET',
    path: '/redirect',
    handler: function (request, reply) {

        reply.redirect('/');
    }
});

server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start((err) => {

        if (err) {
           throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

module.exports = server;