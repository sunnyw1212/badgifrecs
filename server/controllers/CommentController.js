	const Models = require('../models');

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
				Models.CommentModel.findById( params.id, function(err, doc){
					
					if(err){
						callback({'success': false, 'message': 'Failed to find a Comment with the ' + params.id + ' ID'}, null);
						return;
					}

					if( doc === null){
						callback({'success': false, 'message': 'Failed to find a Comment with the ' +  params.id + ' ID'}, null);
						return;
					}

					callback(null, doc);




				})
				return;
			}//end params.id if

			//if no params.id just return all the docs you find
			Models.CommentModel.find( {}, function( err, docs ){
				console.log('here the err', err)
				if(err){
						callback({'success': false, 'message': 'Failed to find a Comment'}, null);
						return;
				}

	
				callback( null, docs);

			} );

		},

		createComment: function( req, res ){
			console.log('this is what the comment infolooks like', req)
			let comment = Object.assign({}, req.body);
			
			//comment['user'] = newCommentInfo.user;
			console.log('this is what the comment infolooks like', comment)
			Models.CommentModel.create( comment , function(err, result){
				if(err){
						sendJsonResponse(res, 400, err);
						return;
				}
				console.log('herees the result', result)
				let query = {name: result.user.name}
				
				Models.UserModel.update(query, {$push: {comment_ids: result._id}}, {upsert:true},function(err, numAff ){
					if(err){
						sendJsonResponse(res, 400, err);
						
						return;
					}
					console.log('numaff by update to Usermodel comment ids', numAff)
					
				});
				
					
				let recipePostQuery = { _id : result.post_id};

				Models.RecipePostModel.update(recipePostQuery, {$push: {comment_ids: result._id}}, {upsert:true},function(err, numAff ){
					if(err){
						sendJsonResponse(res, 400, err);
						
						return;
					}
					console.log('numaff by update to RecipePostModel comment ids', numAff)
					
				});

				sendJsonResponse( res, 200, result );
				return
			});
		}//end createComment
	}