var http = require('http');
var AWS = require('aws-sdk');
var filetype = require('file-type');
var s3 = new AWS.S3();

module.exports = [

    {
        method : 'GET',
        path : '/',
        handler: function(request, reply){
          reply.file('index.html');
        }
    },
    {
    method :'GET',
    path : '/login',
    config: {
        auth:'google',
            handler: function(request, reply){
              reply.file('feed.html');
            }
        }    
    },
    {
    method :'GET',
    path : '/feed',
    config: {
        auth:'google',
        },
        handler: function(request, reply){
            if(request.auth.isAuthenticated){
                reply.file('feed.html');
            }else{
                reply.file('notLoggedIn.html'); 
            }
        } 
    },  

    {
        method : 'GET',
        path : '/{picture}',
        handler: function(request, reply){
          reply('<img src="https://s3.amazonaws.com/polagraph/' + request.params.picture + '">');
        }
    },

    {
        path: '/upload',
        method: 'POST',
        handler: function (request, reply){
            var type = filetype((request.payload.upload));
            s3.putObject({
                Bucket : 'polagraph',
                Key : request.payload.title + '.' + type.ext,
                Body : request.payload.upload,
                ContentType : type.mime,
            }, function(err, data){
                console.log(data);
            });
        }
    },

    {
        method: 'GET',
        path: '/static/{path*}',
        handler: {
            directory: {
                path: './',
            }
        }
    }

];
