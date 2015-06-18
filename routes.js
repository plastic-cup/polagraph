var handlers = require('./handlers');
var goodHandlers = require('./good-handlers');
var mongo = require('./mongo');

module.exports = [

    {
        method : 'GET',
        path : '/',
        handler: handlers['GET /']
    },
    {
        method :'GET',
        path : '/login',
        config: {
                    auth:'google',
                    handler: handlers['GET /login']
                }
    },

    {
        method :'GET',
        path : '/feed',
        config: {
                    auth:{strategy: 'session',mode: 'try'},
                    handler: handlers['GET /feed']
                }
    },

    {
    method :'GET',
    path : '/logout',
    config: {
                auth:{strategy:'session'},
                handler: ['GET /logout']
            }
    },

    {
        method : 'GET',
        path : '/{picture}',
        handler: handlers['GET /{picture}']
    },

    {
        method: 'POST',
        path: '/upload',
        handler: handlers['POST /upload']
    },

    {
        method: 'GET',
        path: '/static/{path*}',
        handler: handlers['GET /static/{path*}']
    },

    {// sending to good-http
        method: 'POST',
        path: '/analytics',
        handler: goodHandlers['POST /analytics']
    },

    {// receiving from good-http
        method: 'GET',
        path: '/analytics',
        handler: goodHandlers['GET /analytics']
    }


];
