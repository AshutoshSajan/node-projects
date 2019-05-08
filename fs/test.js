var path = require('path')
var fs = require('fs');
var userPath = path.join(__dirname, 'user');
var data = {
	name: "sajan",
	email: "sajan123@gmail.com",
	place: "dharamshala"
};

// ==============================================
// create operation

// fs.open(userPath + "/sample.js", "wx", (err, fd) => {
// 	if(err)	console.error(err);
// 	fs.writeFile(fd,JSON.stringify(data), (err) => {
// 		if(err) console.error(err);
// 		fs.close(fd, (err) => {
// 			if(err) console.error(err);
// 			console.log("success");
// 		})
// 	})
// })


// ==============================================
// update operation

// fs.open( userPath + "/sample.js", "r+", (err, fd) => {
// 	if(err)	console.error(err);
// 	fs.ftruncate( fd , (err) => {
// 		if(err) console.error(err);
// 		fs.writeFile( fd, JSON.stringify(data), (err) => {
// 			if(err) console.error(err);
// 			fs.close(fd, (err) => {
// 				console.error(err);
// 			})
// 			console.log("success");
// 		})
// 	})
// })

// ==============================================
// read operation

// fs.readFile( userPath + "/sample.js" , (err, result) => {
// 	if(err)	console.error(err);
// 	console.log(result.toString())
// })
	
// ==============================================
// delete operation

// fs.unlink( userPath + "/sample.js", (err) => {
// 	if(err) console.error(err);
// 	console.log(userPath + "/sample.js", "deleted");
// })
