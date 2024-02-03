var http = require('http');

// Delivery 2
var upperCase = require('upper-case');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  // Delivery 1
  //res.write("Hello World!");
  
  // Delivery 2
  res.write(upperCase.upperCase("Hello World!"));
  
  res.end();
}).listen(2020);
