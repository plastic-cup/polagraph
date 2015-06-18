var AWS = require('aws-sdk');
var filetype = require('file-type');
var s3 = new AWS.S3();

module.exports = {
    'GET /' : function(request, reply){
      reply.file('public/index.html');
    },

    'GET /login' : function(request, reply){
        var creds = request.auth.credentials;
        var profile = {
            googleId: creds.profile.id,
            fullName: creds.profile.displayName,
            firstName: creds.profile.name.first,
            email: creds.profile.email,
        };
        request.log(profile); // to good

        mongo.read('users', profile, function(err, data){
            if (data.length === 0){
                mongo.insert('users', profile, function(err, data){
                    console.log(data);
                });
            }
        });

        request.auth.session.clear();
        request.auth.session.set({googleName:creds.profile.displayName});
        reply.file('feed.html');
    },

    'GET /feed' : function(request, reply){
        if (!request.auth.isAuthenticated) {
            console.log(request.auth);
            return reply.file('notLoggedIn.html');
        }else{
            return reply.file('feed.html');
        }
    },

    'GET /logout' : function (request, reply){
        var creds = request.auth.credentials;
        request.auth.session.clear();
        console.log('creds', creds);
        return reply.redirect('/');
    },

    'GET /{picture}' : function(request, reply){
      reply('<img src="https://s3.amazonaws.com/polagraph/' + request.params.picture + '">');
    },

    'POST /upload' : function (request, reply){
        var type = filetype(request.payload.upload);
        s3.putObject({
            Bucket : 'polagraph',
            Key : request.payload.title + '.' + type.ext,
            Body : request.payload.upload,
            ContentType : type.mime,
        }, function(err, data){
            console.log(err);
            console.log(data);
        });
    },

    'GET /static/{path*}' : {
        directory: {
            path: 'public',
        }
    }
};
