var handlers = require('./handlers');

module.exports = [

    {
        method : 'GET',
        path : '/',
        handler: handlers['GET /']
    },

    {
        method : 'GET',
        path : '/view/{picture}',
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
    }

];
