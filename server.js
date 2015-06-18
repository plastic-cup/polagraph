var Hapi = require('hapi'),
	fs = require('fs'),
	good = require('good'),
	options = require('./log-options'),
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
