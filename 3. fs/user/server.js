// var http = require("http");
// var fs = require("fs");
// var path = require("path");
// var url = require("url");
// var userpath = path.join(__dirname, "user");
// var server = http.createServer();

// server.on("request", (req, res) => {
// 	var parsed = url.parse(req.url, true);
// 	var data = "";
// 	req.on("data", chunk => {
// 		data += chunk;
// 	});

// 	req.on('end', () => {
// 		if(req.method === 'POST'){
// 			var userData = JSON.parse(data);
// 			fs.open(userpath + "/" + userData.username + '.json', 'wx', (err, fd) => {
// 				if(err) return res.end(err)
// 				fs.writeFile(fd, data, (err) => {
// 					if(err) res.end(err)
// 					fs.close(fd, (err) => {
// 						res.end(data);
// 					})
// 				})
// 			})
// 		}
// 	})
// })

// // server.on("request", (req, res) => {
// // 	var parsed = url.parse(req.url, true);
// // 	var data = "";
// // 	req.on("data", (chunk) => {
// // 		data += chunk;
// // 	});
// // 	req.on('end', () => {
// // 		if(req.method === 'GET'){
// // 			var userData = JSON.parse(data);
// // 			fs.open(userpath + "/" + userData.username + '.json', 'wx', (err, fd) => {
// // 				if(err) return res.end(err)
// // 				fs.writeFile(fd, data, (err) => {
// // 					if(err) res.end(err)
// // 					fs.close(fd, (err) => {
// // 						res.end(data);
// // 					})
// // 				})
// // 			})
// // 		}
// // 	})
// // })

// server.listen(4000, () => {
// 	console.log('server started at post 4000');
// })