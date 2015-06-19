var handlers = require('./handlers');
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
        handler: handlers['login']
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
                }else{
                return reply.file('feed.html');
                }
            }
        }
    },
    {
    method :'GET',
    path : '/logout',
    config: {
        auth:{
        strategy:'session',
        },
            handler: function(request, reply){
                var creds = request.auth.credentials;
                request.auth.session.clear();
                //request.auth.session.set(request.auth.credentials.profile);
            return reply.redirect('/');
            }
        }
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
    },

    {
        method: 'GET',
        path: '/all',
        handler: handlers['GET /all']
    }

];
