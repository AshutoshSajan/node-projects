// var passport = require('passport');
// var User = require('../models/User');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// var keys = require('../keys');

// passport.use(new GoogleStrategy({
//     clientID: keys.google_Key.clientID,
//     clientSecret: keys.google_Key.clientSecret,
//     callbackURL: keys.google_Key.callback
//   },
//   function(accessToken, refreshToken, profile, done) {
//     console.log(profile.email);
//     // Check for email in local database received from profile
//     // if yes
//     // return User
//     // if no
//     // create User in local database based on info from profile, return it
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