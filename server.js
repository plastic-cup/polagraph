var Hapi = require('hapi'),
	fs = require('fs'),
	server = new Hapi.Server(),
	Bell = require('bell'),
	Cookie = require('hapi-auth-cookie'),
	Config = require('./tokens.json');

server.connection({
  host: 'localhost',
  port: 8000,
});

server.register([Bell, Cookie], function (err) {
	if (err) throw err;

        server.auth.strategy('session', 'cookie', {
        cookie: 'sid',
        password: Config.session.cookieOptions.password,
        //redirectTo: '/feed', // Not sure if this is a) needed b)will it screw things up if severeal pages.. or smth     
        });

		server.auth.strategy('google', 'bell', {
	        provider: 'google', 
	        password: Config.auth.google.password, 
			clientId: Config.auth.google.clientId,
			clientSecret: Config.auth.google.clientSecret,
	        isSecure: false    
	    });
});


server.route(require('./routes'));

module.exports = server;

server.start();
