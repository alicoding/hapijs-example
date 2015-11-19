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

server.register([
  {
    register: require('inert')
  },
  {
    register: require('good'),
    options: {
      reporters: [{
        reporter: require('good-console'),
        events: {
          response: '*',
          log: '*'
        }
      }]
    }
  },
  {
    register: require('scooter')
  },
  {
    register: require('blankie'),
    options: {
      connectSrc: ['self', '206878104.log.optimizely.com', 'https://api.stripe.com', 'https://pontoon.mozilla.org'],
      fontSrc: ['self', 'https://fonts.gstatic.com', 'https://maxcdn.bootstrapcdn.com', 'https://pontoon.mozilla.org'],
      frameSrc: ['https://js.stripe.com', 'https://checkout.stripe.com', 'https://pontoon.mozilla.org'],
      imgSrc: ['self', 'https://www.google-analytics.com', 'https://q.stripe.com', 'https://pontoon.mozilla.org'],
      scriptSrc: ['self', 'unsafe-inline', 'unsafe-eval', 'https://cdn.optimizely.com',
        'https://www.google-analytics.com', 'https://ajax.googleapis.com',
        'https://js.stripe.com', 'https://checkout.stripe.com', 'https://pontoon.mozilla.org'],
      styleSrc: ['self', 'unsafe-inline', 'https://fonts.googleapis.com',
        'https://maxcdn.bootstrapcdn.com', 'https://pontoon.mozilla.org']
    }
  }
], function(err) {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/{params*}',
    handler: {
      directory: {
        path: Path.join(__dirname, 'public')
      }
    },
    config: {
      security: securityConfig,
      cache: {
        expiresIn: 1000 * 60 * 5,
        privacy: 'public'
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
