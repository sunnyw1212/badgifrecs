	const Models = require('../models');
	const passport = require('passport');
	const LocalStrategy = require('passport-local').Strategy;
	
	const sendJsonResponse = function(res, status, content){
		res.status(status).json(content);
	}
	


	module.exports = {


														// CALLBACK FORMAT = callback(err, successResult)
		get: function( params, callback ){
			console.log('heres the req.params',params)
			
			//if ID is included in params find the one doc by ID
			if( params.id ){
				console.log('tried params id')
				Models.UserModel.findById( params.id, function(err, doc){
					
					if(err){
						callback({'success': false, 'message': 'Failed to find a User with the ' + params.id + ' ID'}, null);
						return;
					}

					if( doc === null){
						callback({'success': false, 'message': 'Failed to find a User with the ' +  params.id + ' ID'}, null);
						return;
					}

					callback(null, doc);




				} )
				return;
			}//end params.id if

			//if no params.id just return all the docs you find
			Models.UserModel.find( {}, function( err, docs ){
				console.log('here the err', err)
				if(err){
						callback({'success': false, 'message': 'Failed to find a User'}, null);
						return;
				}

	
				callback( null, docs);

			} );

		},


		register: function( req, res ){
			//CLEAN THIS UP 
			console.log('this is what the User infolooks like', req.body)
			let body = Object.assign({}, req.body);

			Models.UserModel.createUser(body, function(err, result){
					if(err){
							console.log('heres the rr in usernodel createuser callback', err)
							sendJsonResponse(res, 400, err);
							return;
					}
					console.log('heres the resut in usernmodel createuser callback', result)
					console.log('AND HERST TEH SUMMARY', result.summary())
					sendJsonResponse(res, 200, result.summary());
					
				
			});
	
			
		},

		login: function( req, res ){
			// Models.UserModel.comparePassword;
			//console.log('heres req.use', req.body.password)

			//refers to config/passport.js to check for authentication startegey and determine success/failure 
			//ARGUEMENTS ERR = WHEN PASSPROT JS HAS A TECHINCAL ERROR 
			//USER = USER OBJ INFO
			//authERRMESSAGE= authERRMESSAGE RETURNED WHEN INCORRECT PASSWORD OR USERNAME NOT FOUND 
			passport.authenticate('local', function(err, user, authErrMessage){
				console.log('heres what returns from passport.authenticate Err', err, 'USER', user, 'authErrMessage', authErrMessage)

				if(err){
					sendJsonResponse( res, 404, err);
					return;
				}
				if(!user){
					sendJsonResponse(res, 401, authErrMessage);
					return;
				}
				if(user){
					console.log('AND HERST TEH SUMMARY', user.summary())
					sendJsonResponse( res, 200, user.summary() );
				}

			} )( req, res )
			
		}

		












	}