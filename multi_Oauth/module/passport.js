var passport = require('passport');
var User = require('../models/User');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var keys = require('../keys');
const bcrypt = require('bcrypt');

passport.use(new GoogleStrategy({
    clientID: keys.google_Key.clientID,
    clientSecret: keys.google_Key.clientSecret,
    callbackURL: keys.google_Key.callback
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({email: profile.emails[0].value }, (err, user) => {
      if(err) { return done(err) }
      if(user){
        if(user.strategies.includes(profile.provider)){
          return done(null, user);
        }else {
          User.findOneAndUpdate({email: user.email},
            {
              $push: {strategies: profile.provider},
              google:
              {
                image: profile.photos[0].value,
                name: profile.displayName
              }
          },(err, user) => {
            if(err) return done(err)
            return done(null, user);
          })
        }
      }
    	if(!user) {
    		User.create({
    			email: profile.emails[0].value,
    			google: {
            image: profile.photos[0].value,
            name: profile.displayName
          },
          strategies: [profile.provider]
    		},(err, user) => {
    			if(err) { return done(err) };
    			done(null, user);
    		})
    	}	
    })
  }
));

// github login
passport.use(new GitHubStrategy({
    clientID: keys.github_Key.clientID,
    clientSecret: keys.github_Key.clientSecret,
    callbackURL: keys.github_Key.callback
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({email: profile.emails[0].value }, (err, user) => {
      if(err) { return done(null, null) }
      if(user){
        if(user.strategies.includes(profile.provider)){
          return done(null, user);
        }else {
          User.findOneAndUpdate({email: user.email},
            {
              $push: {strategies: profile.provider},
              github:
              {
                image: profile.photos[0].value,
                name: profile.displayName
              }
          },(err, user) => {
            if(err) return done(err)
            return done(null, user);
          })
        }
      }
      if(!user) {
        User.create({
          email: profile.emails[0].value,
          github: {
            image: profile.photos[0].value,
            name: profile.displayName
          },
          strategies: [profile.provider]
        },(err, user) => {
          if(err) { return done(err) };
          done(null, user);
        })
      } 
    })
  }
));

// local login
passport.use(new LocalStrategy(
  {usernameField: "email"},
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if(user){
        const result = bcrypt.compareSync(password, user.local.password);
        console.log(result);
        if(result){
          return done(null, user)
        }else{
          return done(null, null);
        }
      }
    });
  }
));

// serialize user
passport.serializeUser((user, done) => {
	done(null, user._id);
})

// // deserialize User
passport.deserializeUser((id, done) => {
	User.findById(id, function(err, user) {
    if(err) return done(err, null);
    done(null, user);
  });
})