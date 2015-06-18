var Hapi = require('hapi'),
	fs = require('fs'),
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
    helpersPath : "helpers"

});

server.route(require('./routes'));

module.exports = server;

server.start();
