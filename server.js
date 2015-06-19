var Hapi = require('hapi'),
		fs = require('fs'),
		Bell = require('bell'),
		Cookie = require('hapi-auth-cookie'),
		Config = require('./tokens'),
		good = require('good'),
		options = require('./log-options'),
		Handlebars = require('handlebars'),
    	Path = require('path'),
		server = new Hapi.Server();


server.connection({
	host: 'localhost',
	port: 8000,
});

server.views({
    engines : {
        html : Handlebars,
    },
    path : Path.join(__dirname, 'public'),

});

server.register([Bell, Cookie], function (err) {
	if (err) throw err;

    server.auth.strategy('session', 'cookie', {
        cookie: 'sid',
        password: Config.session.cookieOptions.password,
        redirectTo: false,
        isSecure:false,
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

server.register({ register: good, options: options }, function (err) {
        if (err) {
            throw err;
        }
        server.start(function () {
            server.log('info', 'Server running at: ' + server.info.uri);
        });
});
