var Hapi = require("hapi");
var Bell = require('./bell');
var Cookie = require('hapi-auth-cookie');
var config = require('./tokens.json');


server.register([Bell, Cookie], function (err) {
	if (err) throw err;

        server.auth.strategy('session', 'cookie', {
        cookie: 'sid',
        password: config.session.cookieOptions.password,
        //redirectTo: '/my-account', // Not sure if this is a) needed b)will it screw things up if severeal pages.. or smth
        });

		server.auth.strategy('google', 'bell', {
	        provider: 'google',
	        password: config.google.password,
			clientId: config.google.clientId,
			clientSecret: config.google.clientSecret,
	        isSecure: false
	    });
});
