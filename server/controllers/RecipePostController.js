	const Models = require('../models');
	const fs = require('fs');
	const async = require('async');
	const gm = require('gm');
	const imageMagick = gm.subClass({ imageMagick: true });
	const validator = require('validator');
	const cloudinary = require('cloudinary');

	const sendJsonResponse = function(res, status, content){
		res.status(status).json(content);
	}


	module.exports = {


	
		getPosts: function( req, res ){
	
			let params = req.params;
			//if ID is included in params find the one doc by ID
			if( params.id ){
				console.log('id present in req.params')
				Models.RecipePostModel
					.findById(params.id)
					//populate comment ids to get full ref to comment object model from id path=path to obj ref options=sort by timestamp
					.populate( {path: 'comment_ids', options: { sort: {'timestamp': -1} } } )
					.exec((err, doc)=>{
						if(err){
							sendJsonResponse(res, 400, err);
							return;
						}
						if(!doc){
							console.log('No such doc exists')
							sendJsonResponse(res, 400, err);
							return;
						}
						sendJsonResponse(res, 200, doc);
					})
					return;
			}//end params.id if

			//if no params.id just return all the docs you find
			Models.RecipePostModel
				.find({})
				.sort({timestamp:-1})
				.exec((err, docs)=>{
					if(err){
						sendJsonResponse(res, 400, err);
						return;
					}
					sendJsonResponse(res, 200, docs);
				})
				return;
				
		},
		//make a new recipepost (requires a SINGLE gif NOT an array of imgs)
		createPost: function( req, res ){
			console.log('this os the req.body',req.body)
			
			
			
			//copy recipe info body
			let body = Object.assign({}, req.body);

			//save thumbnail to folder
			//upload to cloudinary
			//get result from cloudinary 
			//reassign body[recupe thumb] to coloudinaryurl
			//delete thumbnail from folder
			//save body to mongo

			//TODO SAVE THUMBNAIL TO CLOUDINARY 
			//ON SUCCESS SAVE SECURE CLOUDINARY URL TO body['recipe_thumb'] 
			
			
			
			function saveThumbnailToFolder( file, folderPath, callback ){

				function getRandomNumberString( num ){
					return Math.floor((Math.random() * num ) + 1).toString()
				}
				//TODO CRETE A FUNCTION TO GENERATE A UNIFORM FILENAME
				function createFilename( folderPath){
					
					return folderPath + getRandomNumberString(1000);
				}
				//rename file
				let filename = createFilename( folderPath);
				console.log('this is the filename', filename)
				let thumbFilename = filename + '.jpg';
				console.log( 'heres thumbfilename', thumbFilename)
				
				
				
				//save thumbnail
				imageMagick(file)
					.selectFrame(0)
					.setFormat('jpg')
					.write(thumbFilename, function(err){
						if(err){
							console.log('soemthing happened', err)
							sendJsonResponse(res, 400, err)
							return;
						}
						console.log('thumbnail saved')
						//upload to cloudinary
						cloudinary.uploader.upload(thumbFilename, function(result){
							console.log('heres cloudinary result', result)
							if(result.error){
								console.log('err in unlink thumbFilename', result.error)
								sendJsonResponse(res, 400, result.error)
								return
							}
							//assign body[recipe_thumb] to cloudinary result secure url
							body['recipe_thumb'] = result.secure_url;
							console.log('hers body agai n with recipethumb included',body)

							//delete tmp file jpg
							fs.unlink(thumbFilename, function(err){
								if(err){
									console.log('err in unlink thumbFilename', err)
									sendJsonResponse(res, 400, err)
									return
								}
								console.log('deleted temp path')
								callback();
							});//end unlink

						});//end clouidnary uplloader upload
						
						
					})//end imageMacgick write
	
			}//end func saveThumbnailToFolder

			let folderPath = './public/uploads/';

			let promiseToSaveThumbnail = new Promise( function( resolve, reject ){
				saveThumbnailToFolder( body['recipe_gif'], folderPath, resolve );
			});

			promiseToSaveThumbnail.then(
				function(){
					console.log('prmise suceeded' )


					//save body to db
					Models.RecipePostModel.create(body, (err, result)=>{
						if(err){
							sendJsonResponse(res, 400, err);
							return;
						}
						//update userModel by pushing recipepost id to user[recipepost_ids]
						let query = {name: result.user.name};

						Models.UserModel.update(query,
							{$push: {recipepost_ids: result._id}},
							{upsert: true},
							function(err, numAff){
								if(err){
									sendJsonResponse(res, 400, err)
									return;
								}
								//sucessfully updated UserModel
								console.log('Successfully updated UserModel. Number Affected By Update: ', numAff);
							}
						);//end update
						sendJsonResponse(res, 200, result);
					
					});//end save

				}//end resolve func
			)//end then()
			.catch(
				function(err){
					console.log('err in my promis',err)
					sendJsonResponse(res, 400, err)
					return;
				}
			)
			

			
			
		},
		//FOR lATER REFERENCEgdf
		saveImgsToMakeGif: function( newRecipeInfos, callback ){
			console.log('this is what the post req looks like', newRecipeInfos.body)
			console.log('this is the req. file', newRecipeInfos.files)
			
			let files = [...newRecipeInfos.files]; //copy files array
			let newRecipeInfoData = Object.assign({}, newRecipeInfos.body); //copy recipe info body
			//copy global req.user info into newRecipeInfoData.user 
			newRecipeInfoData['user'] = newRecipeInfos.user;
			let folderPath = './client/public/uploads/'


			function saveFilesToFolder( files, folderPath ){

				async.each(files, function(file){

					let filename = folderPath + file.filename+'-' + file.originalname;
					addRecipeImgToNewRecipeInfo(filename);
					
					fs.readFile(file.path, function( err, data ){
						if(err){
							callback( {'success': false, 'message': 'Failed to readFile Recipe Post.' + err.message}, null );
							return;
						}
						//read file success
						fs.writeFile( filename, data, function(err){
							if(err){
								callback( {'success': false, 'message': 'Failed to writeFile Recipe Post.' + err.message}, null );
								return;
							}
							//write file success
							console.log('File saved!')
						});//end write file
					});//end read file
				});//end async each
			}

			function addRecipeImgToNewRecipeInfo(filename){
				
				if( !newRecipeInfoData.recipe_imgs ){
					newRecipeInfoData.recipe_imgs = [];
					newRecipeInfoData.recipe_imgs.push(filename);
				}
				else{
					newRecipeInfoData.recipe_imgs.push(filename);
				}
			}

			saveFilesToFolder(files, folderPath);
			

			
			//save to db
			Models.RecipePostModel.create( newRecipeInfoData , function(err, result){
				if(err){
						callback({ 'success': false, 'message': 'Failed to save Recipe Post. ' + err.message }, null);
						return;
				}

				let query = {name: result.user.name}
				
				Models.UserModel.update(query, {$push: {recipepost_ids: result._id}}, {upsert:true},function(err, numAff ){
					if(err){
						callback({'success': false, 'message': 'Failed to update User Model comment_ids' + err.message}, null);
						return;
					}
					console.log('numaff by update to Usermodel recipepost ids', numAff)
					
				});



				
				callback(null, { 'success': true, 'result': result });
				return;
			});



			


			
		},

		put: function(){},

		delete: function(){}
	}


















