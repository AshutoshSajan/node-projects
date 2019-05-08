// var passport = require('passport');
// var User = require('../models/User');
// var keys = require('../keys');
// var LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ name: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       // if (!user.verifyPassword(password)) { return done(null, false); }
//       if(!user){
//       	User.create({
//     			name: profile.displayName,
//     			email: profile.emails[0].value,
//     			image: profile.photos[0].value,
//     		},(err, User) => {
//     			if(err) { return done(err, null) };
//     			done(null, User);
//     		})
//       }
//       // return done(null, user);
//     });
//   }
// ));

// // passport.use('local-signup', new LocalStrategy({
// //     usernameField: 'email',
// //     passwordField: 'password',
// //     //are there other options?
// //     //emailField did not seem to do anything
// //     passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
// // },
// // function(req, email, password, done) {
// //     //check if email not already in database
// //         //create new user using "email" and "password"
// //         //I want an additional parameter here "name"
// // }));

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