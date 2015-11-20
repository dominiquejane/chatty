var http = require('http');
var messages = require('./messages.js');
var server = http.createServer();

function getRandomArbitrary(n) {
	return Math.floor(Math.random() * n)
};

var handleRequest = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	console.log(req.method);
	if (req.method === 'GET') {
		res.statusCode = 200;
		var messageResponse = {
			messages: messages
		};
		console.log(messages);
		res.end(JSON.stringify(messageResponse))
	}
	else if (req.method === 'POST') {
		res.statusCode = 200;
     var postData = '';
     req.on('data', function(chunk) {
         postData += chunk.toString();
      });    
      req.on('end', function() {
          console.log("Got POST data:");
          var parsed = JSON.parse(postData)
          console.log("parsed" + parsed);
    		 	messages.push(parsed.message);
    		 	console.log("Array" + messages);

     });
     res.end();
  }
  else if (req.method === 'OPTIONS') {
  	res.statusCode = 200;
  	res.setHeader('Content-Type', 'application/json'); //what kind of infor we're sending
		res.setHeader('Access-Control-Allow-Origin', '*'); // * means you can get from any origin
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST'); //what methods/requests allowed
		res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // 	res.writeHead(200 {
  // 	'Content-Type', 'application/json',
		// 'Access-Control-Allow-Origin', '*',
		// 'Access-Control-Allow-Methods', 'OPTIONS, GET, POST'
  // 	})
		res.end();
  }
}

server
	.on('request', handleRequest)
	.listen(8989)

