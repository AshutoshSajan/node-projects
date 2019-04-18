var http = require('http');

http.createServer((req, res) => {
	// console.log(req.headers)
	res.setHeader('Content-Type', 'text/html');
	res.write("hello world");
	res.end("<h1>hello world<h1>");
}).listen(4000);