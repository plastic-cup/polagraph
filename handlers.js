var AWS = require('aws-sdk');
var filetype = require('file-type');
var s3 = new AWS.S3();
var mandrill = require("mandrill-api/mandrill");
var mandrill_client = new mandrill.Mandrill(process.env.SECRET);
var mongo = require('./mongo');


module.exports = {
    'GET /' : function(request, reply){
        console.log(request.auth);
      reply.file('public/index.html');
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
            Metadata : {
                'uploadtime' : new Date().getTime().toString()
            }
        }, function(err, data){
            console.log(err);
            console.log(data);
        });
    },

    'GET /static/{path*}' : {
        directory: {
            path: 'public',
        }
    },

    login : function(request, reply){
        var creds = request.auth.credentials;

        var profile = {
            googleId: creds.profile.id,
            fullName: creds.profile.displayName,
            firstName: creds.profile.name.first,
            email: creds.profile.email,
            pictures : []
        };

        mongo.read('users', profile, function(err, data){
            if (data.length === 0){
                mongo.insert('users', profile, function(err, data){
                    console.log(data);
                    sendEmail(data[0].email, data.firstName);
                });
            }
        });

        request.auth.session.clear();
        request.auth.session.set({googleName:creds.profile.displayName});
        reply.redirect('/');
    },

    'GET /all' : function(request, reply){
        s3.listObjects({Bucket : 'polagraph'}, function(err, data){
            console.log(err);
            reply(data.Contents);
        });
    }
};

function sendEmail(email, name) {
	var data = {
	      	'from_email': 'danwhy@gmail.com',
	      	'to': [
	          {
	            'email': email,
	            'name': name,
	            'type': 'to'
	          }
	        ],
		      'autotext': 'true',
		      'subject': 'Welcome to Polagraph',
		      'html': '<p>Hi ' + name +', welcome to Polagraph</p>'
	};
	mandrill_client.messages.send({"message": data, "async": false},function(result) {
		console.log(result);
	}, function(e) {
		console.log("Error " + e.message);
	});
}
