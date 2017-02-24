const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Models = require('../models');

//config passport
passport.use( new LocalStrategy( {
  usernameField: 'name'
},function(username, password, done){
  Models.UserModel.findOne( {name: username}, function(err, user){
    console.log('heres the user', user)
    if(err){
      return done(err);
    }
    if(!user){
      return done(null, false, {message: 'Username not found'});
    }
    Models.UserModel.comparePassword(password, user.password, function(err, isMatch){
    	if(err){
    		return done(null, false, {message: 'Incorrect password.'});
    	}
    	if(!isMatch){
    		return done(null, false, {message: 'Incorrect password.'});
    	}
    	return done(null, user)
    });
    
  });//end findOne 
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});