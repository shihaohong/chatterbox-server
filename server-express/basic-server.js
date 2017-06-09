var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var app = express();

var port = 3000;

var obj = { 
  results: [] 
};

var getCors = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

app.options('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.header('Access-Control-Max-Age', 10);
  res.sendStatus(200);
});

app.get('/chatterbox/classes/messages', function (req, res) {
  res.header(getCors).status(200).json(obj);

});

// add post for messages
// set status code 201
// else, statuscode 404
    // request.on and parse received data, storing it in an object
  // add options for messages
// app.post('/', function (req, res) {
//   res.header(defaultCorsHeaders).status(201);
// });

app.listen(port, function() {
  console.log('app listening on 3000!');
});