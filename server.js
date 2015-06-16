var Hapi = require('hapi'),
	fs = require('fs'),
	server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000,
});

server.route(require('./routes'));

module.exports = server;

server.start();
console.log('Server running at localhost: 8000');