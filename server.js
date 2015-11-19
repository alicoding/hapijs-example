var Path = require('path');
var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
  host: process.env.HOST,
  port: process.env.PORT
});

var securityConfig = {
  hsts: {
    maxAge: 15768000,
    includeSubDomains: true,
    preload: true
  },
  xframe: process.env.ENABLE_XFRAMEOPTIONS === 'true',
  xss: true,
  noOpen: true,
  noSniff: true
};

server.register(require('inert'), function (err) {

  if (err) {
    throw err;
  }

  server.route({
      method: 'GET',
      path: '/{param*}',
      config: {
        security: securityConfig
      },
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