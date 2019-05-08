var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bookstore' });
});

router.get('/admin', function(req, res, next) {
	var names = ["sajan", "srijan", "sashi", "suraj"];
	
  res.render('admin', {title: "This is admin page", names: names});
});

router.get('/profile', function(req, res, next) {
  res.render('profile');
});


module.exports = router;
