var express = require('express');
var router = express.Router();
var User = require('../models/User');
const bcrypt = require('bcrypt');
var multer  = require('multer');
// var upload = multer({ dest: '../uploads' });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})

// console.log(storage, "mul des...............");
 
var upload = multer({ storage: storage })
// console.log(User, "all users");

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find({}, (err, users) => {
		if(err) return next(err);
		console.log(users, "users");
	})
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
	// console.log(req.body, "user login data........................");
  res.render('signIn');
});

router.get('/register', function(req, res, next) {
	// console.log(req.body, "user register data........................");
  res.render('signUp');
});

router.post('/register', function(req, res, next) {
	console.log(req.body, "user register data........................");
	User.findOne({ email: req.body.email }, (err, user) => {
		if(err) return next(err);
		if(user){
			console.log(user, "user exist err resister..............................")
			return res.render('signUp', {user: "email already exist"});
		}
		if(!user){
			var newUser = { 
				email: req.body.email,
				strategies: ["local"],
				local: {
					// image: req.file.filename,
					name: req.body.name,
					password: req.body.password
				}
			}
			User.create(newUser
			, (err, user) => {
				if(err) return next(err);
				console.log(user, "user created..............................")
		  	res.redirect('/');
			})
		}
	})
});

// router.get('/edit-profile', function(req, res, next) {
// 	console.log(req.body, "user data........................");
//   res.send('respond with a resource');
// });

// router.get('/update-profile', function(req, res, next) {
// 	console.log(req.body, "user data........................");
//   res.send('respond with a resource');
// });


module.exports = router;
