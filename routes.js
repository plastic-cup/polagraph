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
    method :'GET',
    path : '/login',
    config: {
        auth:'google',
            handler: function(request, reply){
                var creds = request.auth.credentials;
                console.log('creds', creds);
                request.auth.session.clear();
                request.auth.session.set({googleName:creds.profile.displayName});
                //request.auth.session.set(request.auth.credentials.profile); 
            reply.file('feed.html');
            }
        }    
    },
    {
    method :'GET',
    path : '/feed',
    config: {
        auth:{
            strategy: 'session',
            mode: 'try'
        },
        handler: function(request, reply){
                if (!request.auth.isAuthenticated) {
                    return reply.file('notLoggedIn.html');
                }
                return reply.file('paskaa.html');
            }
        }
    }, 
    {
    method :'GET',
    path : '/logout',
    config: {
        auth:'session',
            handler: function(request, reply){
                var creds = request.auth.credentials; 
                request.auth.session.clear();
                console.log('creds', creds);
                //request.auth.session.set(request.auth.credentials.profile); 
            reply.file('paskaa.html');
            }
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
    }

];
    
