var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var userPath = path.join(__dirname, 'user');
var server = http.createServer();

server.on('request', (req, res) => {
  var parsed = url.parse(req.url, true);
  console.log(parsed);
  var data = '';
  req.on('data', (chunk) => {
  	console.log(chunk);
    data += chunk;
  });
	// var userData;
	var userName;

  req.on('end', () => {
    if(req.method === 'POST') {
      var userData = JSON.parse(data);
      fs.open(userPath + "/" + userData.username + '.json', 'wx', (err, fd) => {
        if(err) return res.end(err);
        fs.writeFile(fd, data, err => {
          if(err) res.end(err);
          fs.close(fd, (err) => {
            res.end(data)
          });
  			})
    	})
    }else if(req.method === 'GET'){
    	const userName = parsed.query.username;
    	console.log(userName, "33");
    	fs.readFile(`${userPath}/${userName}.json`, (err, result) => {
    		console.log(result, "red");
    		res.end(result);
    	})
    }else if(req.method === 'PUT'){
    	const userName = parsed.query.username;
    	console.log(userName , "40");
    	fs.open(`${userPath}/${userName}.json`, "r+", (err, fd) => {
    		console.log(fd, "update in put method");
				if(err)	console.error(err);
				fs.ftruncate( fd , (err) => {
					if(err) console.error(err);
					fs.writeFile( fd, JSON.stringify(data), (err) => {
						if(err) return res.end(err);
						fs.close(fd, (err) => {
							if(err) res.end(err)
							console.error(data, "checking json format");
							res.end(err)
						})
						console.log("success");
					})
				})
			})
    }else if(req.method === 'DELETE'){
    	const userName = parsed.query.username;
    	fs.unlink(`${userPath}/${userName}.json`, (err) => {
    		console.log(err, "delete error");
    		if(err) return res.end(err);
    		console.log("deleted");
    		res.end("deleted");
    	})
    }else {
    	var err = {
    		"typeError": "no object found"
    	}
    	console.log(err)
    	res.end(JSON.stringify(err))
    }
  })    	
});

server.listen(4000, () => {
  console.log("server started at port 4000");
})