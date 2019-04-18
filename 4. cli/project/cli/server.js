const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const server = {};
const httpServer = server.httpServer = http.createServer();

httpServer.on('request', (req, res) => {
  res.writeHead(200, {
      'Content-Type': 'text/plain'
  });
  res.write('Welcome to CLI');
  res.end();
});

server.init = () => {
  httpServer.listen(2089, () => {
      console.log("Server listening on port 2010");
  });
}


module.exports = server;