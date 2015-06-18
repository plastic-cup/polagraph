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
                //console.log('creds', creds);

                var profile = {
                    googleId: creds.profile.id,
                    fullName: creds.profile.displayName,
                    firstName: creds.profile.name.first,
                    email: creds.profile.email,
                };

                console.log('profile', profile);

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
                    console.log(request.auth);
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
                console.log('creds', creds);
                //request.auth.session.set(request.auth.credentials.profile); 
            return reply.redirect('/');
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
    
