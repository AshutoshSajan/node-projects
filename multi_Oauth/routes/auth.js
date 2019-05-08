var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/')
  })


router.get('/github', passport.authenticate('github', {scope: ['profile', 'email']}));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/')
  })


router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/users/register' }),
  function(req, res) {
    res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;