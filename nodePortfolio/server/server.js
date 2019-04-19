const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const dirPath = path.join(__dirname, '../portfolio');
var userInfoPath = path.join(dirPath,"contacts");
console.log(userInfoPath);


http.createServer((req, res) => {

	// console.log(req.url);
	if(req.url === '/' && req.method === "GET") {
		var file = dirPath + '/index.html';
		res.setHeader('Content-Type', 'text/html');
  	res.writeHead(200);
		fs.createReadStream(file).pipe(res);
	}
	if(req.url === "/contact" && req.method === "GET") {
		var file = dirPath + '/contact.html';
		res.setHeader('Content-Type', 'text/html');
  	res.writeHead(200);
		fs.createReadStream(file).pipe(res);
	}
	if(req.url === "/skills" && req.method === "GET") {
		var file = dirPath + '/skills.html';
		res.setHeader('Content-Type', 'text/html');
  	res.writeHead(200);
  	// read the file and stream the contents 
		fs.createReadStream(file).pipe(res);
	}
	if(req.url === "/about" && req.method === "GET") {
		var file = dirPath + '/about.html';
		res.setHeader('Content-Type', 'text/html');
  	res.writeHead(200);
		fs.createReadStream(file).pipe(res);
	}
	if(req.url === "/project" && req.method === "GET") {
		var file = dirPath + '/project.html';
		res.setHeader('Content-Type', 'text/html');
  	res.writeHead(200);
		fs.createReadStream(file).pipe(res);
	}
	if(req.url.includes("css")) {
		var filePath = dirPath + req.url;
		res.setHeader('Content-Type', 'text/css');
		fs.createReadStream(filePath).pipe(res);
	}
	if(["jpg", "png", "gif", "jpeg"].indexOf(req.url.split(".").pop()) > -1) {
		var extension = req.url.split(".").pop()
		var filePath = dirPath + req.url;
		res.setHeader('Content-Type', `image/${extension}`);
		fs.createReadStream(filePath).pipe(res);

	}

	// post method to collect userinfo from a form
	if(req.method === "POST" && req.url === "/contact") {
		var contact = "";
		req.on('data', (chunk) => {
			contact += chunk;
		}).on('end', () => {
			var parsedContact = querystring.parse(contact);
			res.end(JSON.stringify(parsedContact));
			var fileName = `${parsedContact.email}.json`;

			// addFile(userInfoPath, fileName, parsedContact)
			var user = JSON.stringify(parsedContact);
			fs.open(`${userInfoPath}/${fileName}`, "wx", (err, fileDescriptor) => {
				if(err) console.log(err);
				fs.writeFile(fileDescriptor, user, (err) => {
					if(err) console.log(err)
					console.log("success")
					fs.close(fileDescriptor, (err) => {
						if(err) console.log(err)
						console.log("seccess");
					})
				})
			})
		})
	}
	
}).listen(8000);


// function addFile(path, filename, data){
// 	var obj = data;
// 	// console.log(obj, "obj in add file");

// 	console.log(obj);
// 	fs.open(`${path}/${filename}`, "wx", obj, (err, fileDescriptor) => {
// 		if(err) console.log(err);
// 		console.log(fileDescriptor);
// 		fs.writeFile(fileDescriptor, obj, (err) => {
// 			console.log(obj, "obj in writeFile");
// 			if(err) console.log(err)
// 			console.log("success")
// 			fs.close(fileDescriptor, (err) => {
// 				if(err) console.log(err)
// 				console.log(seccess);
// 			})
// 		})
// 	})
// }

