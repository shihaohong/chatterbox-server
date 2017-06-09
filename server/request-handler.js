var ObjectID = require('mongodb').ObjectID;
var fs = require('fs');
var path = require('path');
/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve your chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var obj = { 
  results: []
};

var requestHandler = function(request, response) {

  /* ATTEMPT USING FS AND NODE GGGG
  if (request.url === '/' || request.url.includes('?username')) {
    var filePath = path.join(__dirname, '../client/index.html');
    console.log('filepath', filePath); 
    fs.readFile(filePath, 'utf8', function(err, data) {
      console.log('error ----->', err);
      response.writeHead(200, {'Content-Type': 'text/html'});
      console.log('file data --------->', data);
      response.write(data);
      
      response.end();
    });
  } else if (request.url.includes('.css')) {
    console.log('requesting css file');
    var filePath = path.join(__dirname, '../client', request.url);
    console.log('filepath', filePath); 
    fs.readFile(filePath, 'utf8', function(err, data) {
      console.log('error ----->', err);
      response.writeHead(200, {'Content-Type': 'text/css'});
      console.log('file data --------->', data);
      response.write(data);
      console.log(request.url);
      response.end();
    });
  } 
  */ 

  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode;
    // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';

  // The outgoing status.
  if (request.method === 'GET') {
    if (request.url.includes('/classes/messages')) {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(obj));
    } else {
      statusCode = 404;
    } 
  } else if (request.method === 'POST') {
    statusCode = 201;
    
    request.on('data', function(data1) {
      var parsedData = JSON.parse(data1 + '');
      var objectId = new ObjectID();
      parsedData['objectId'] = objectId;
      obj.results.unshift(parsedData);
    });
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(obj));
  } else if (request.method === 'OPTIONS') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();
  }
};

module.exports.requestHandler = requestHandler;