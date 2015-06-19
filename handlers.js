var AWS = require('aws-sdk');
var filetype = require('file-type');
var s3 = new AWS.S3();
var mandrill = require("mandrill-api/mandrill");
var mandrill_client = new mandrill.Mandrill(process.env.SECRET);
var mongo = require('./mongo');


module.exports = {
    'GET /' : function(request, reply){
      reply.view('index.html', {header1: 'Login Unsuccessful', header2: "Deal with it"});
    },

    'GET /{picture}' : function(request, reply){
      reply('<img src="https://s3.amazonaws.com/polagraph/' + request.params.picture + '">');
    },

    'POST /upload' : function (request, reply){
        var type = filetype(request.payload.upload);
        var id = new Date().getTime().toString();
        mongo.insert('pictures', {id: id, caption : request.payload.caption, ext: type.ext});
        s3.putObject({
            Bucket : 'polagraph',
            Key : id + '.' + type.ext,
            Body : request.payload.upload,
            ContentType : type.mime,
            Metadata : {
                'uploadtime' : new Date().getTime().toString()
            }
        }, function(err, data){
            if (err){
                console.log('err', err);
            }
            console.log('data', data);
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
                    console.log('data',data);
                    sendEmail(data[0].email, data[0].firstName);
                });
            }
        });

        request.auth.session.clear();
        request.auth.session.set(profile);
        reply.redirect('/');
    },

    'GET /all' : function(request, reply){
        mongo.read('pictures', {}, function(err, data){
            if (err){
                console.log('err',err);
            }
            reply(data);
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
		console.log('result',result);
	}, function(e) {
		console.log("Error " + e.message);
	});
}
