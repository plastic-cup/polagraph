var http = require('http');
var AWS = require('aws-sdk');
var filetype = require('file-type');
var s3 = new AWS.S3();
var handlers = require('./handlers');

module.exports = [

    {
        method : 'GET',
        path : '/',
        handler: handlers['GET /']
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
    }

];
