var Path = require('path');
var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
  host: process.env.HOST,
  port: process.env.PORT
});

server.register(require('inert'), function (err) {

  if (err) {
    throw err;
  }

  server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
          directory: {
              path: 'public'
          }
      }
  });

  server.start(function (err) {

    if (err) {
      throw err;
    }

    console.log('Server running at:', server.info.uri);
  });
});