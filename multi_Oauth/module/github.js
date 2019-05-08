// var passport = require('passport');
// var GitHubStrategy = require('passport-github').Strategy;
// var User = require('../models/User');
// var keys = require('../keys');

// passport.use(new GitHubStrategy({
//     clientID: keys.github_Key.clientID,
//     clientSecret: keys.github_Key.clientSecret,
//     callbackURL: keys.github_Key.callback
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOne({email: profile.emails[0].value }, (err, user) => {
//       if(err) { return done(null, null) }
//       if(user){
//         // console.log(User,"..............................")
//         return done(null, user);
//       }
//     	if(!User) {
//     		// console.log(profile, "profile....................................")
//     		User.create({
//     			name: profile.displayName,
//     			email: profile.emails[0].value,
//     			image: profile.photos[0].value,
//     		},(err, User) => {
//     			if(err) { return done(err, null) };
//     			done(null, User);
//     		})
//     	}	
//     })
//   }
// ));

// // serialize user
// passport.serializeUser((User, done) => {
// 	done(null, User._id);
// })


// // // deserialize User
// passport.deserializeUser((id, done) => {
// 	// get User from loca database
// 	// return done(err, user)
// 	User.findById(id, function(err, User) {
//     if(err) return done(err, null);
//     // console.log(User,"User in deserializeuser..................................")
//     done(null, User);
//   });
// })