'use strict';

var fs = require('fs');
var express  = require('express');

// Determine Environment (we obvisouly won't be in a Node environment)
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Our app
var app = express();

var config = {
  "port": 8080
};

// Insert LiveReload snippet when in development mode only
if(env === 'development') {
  console.log('App running in development environment');
  var livereload = require('connect-livereload');
  app.use(livereload({port: 35729}));
}

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Access-Token, X-Requested-With, Cookie, Set-Cookie, Accept, Access-Control-Allow-Credentials, Origin, Content-Type, Request-Id , X-Api-Version, X-Request-Id');
  res.header('Access-Control-Expose-Headers', 'Set-Cookie');
  res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
  res.header('Allow', req.headers['access-control-request-method']);
  return next();
});

// HTML5 Pushstate mode
app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});

if(!module.parent) {
  app = app.listen(config.port);
  console.log('App listening on port 8080');
}
