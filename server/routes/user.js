const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//register new user
router.post('/register', function( req, res, next ){
	let controller = controllers['user'];

	controller.register(req, function(err, result){
		
		if (err){
			res.json({
		    	confirmation: 'fail',
		    	message: 'Invalid Resource'
			})
			return
		}

		// if (resource == 'profile'){	// install cookie!!
		// 	req.session.user = result.id
		// }
		

		res.json({
	    	confirmation: 'success',
	    	result: result
		})
		
	})
});

//login user
router.post('/login', function( req, res, next ){
	
	let controller = controllers['user'];
	
	controller.login( req, res, next );

	
});

//logout user

router.get('/logout', function(req, res, next){
	req.logout();
	res.redirect('/');
});

module.exports = router;