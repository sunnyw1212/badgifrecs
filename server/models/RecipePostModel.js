const mongoose = require('mongoose');

//schema 
const RecipePostSchema = mongoose.Schema({
	recipe_gif: { type: String, default: '' },
	recipe_thumb: {type: String, default: ''},
	recipe_title: { type: String, trim: true, default: 'N/A' },
	recipe_description: { type: String, trim: true, default: 'N/A' },
	recipe_instructions: { type: Array },
	recipe_imgs: Array,
	recipe_likes: Number,
	// user: { username: {type: String, trim: true, default: 'Anonymous'} },
	user: {
		_id: {type : mongoose.Schema.ObjectId, ref: 'User'}, 
		name: {type : String, ref: 'User', trim: true, default: 'Anon'}
	},
	comment_ids: [{ type : mongoose.Schema.ObjectId, ref: 'Comment' }],
	// comments: [ {user: String, timestamp: Date, body: String } ],
	timestamp: { type: Date, default: Date.now }
});


RecipePostSchema.pre('remove', function(next){
	
	console.log('hey youre removing a recipepostschema')
	//update to remove recipepost id from User model
	this.model('User').update(
		{recipepost_ids: this._id},
		{ $pull: {recipepost_ids: this._id}},
		{multi: true},
		next
	);
	//update to remove comment id from User model
	this.model('User').update(
		{},//query
		{ $pull: {comment_ids: { $in: this.comment_ids } } },//update
		{multi: true},//option
		next//callback
	);
	
	//delete comments that belong to the recipe post being deleted
	this.model('Comment').remove({post_id: this._id}).exec();
});

let RecipePost = module.exports = mongoose.model('RecipePost', RecipePostSchema);

// module.exports.saveURL = function( newURL, callback ){
// 	newURL.save(callback)
// }

// module.exports.findAll = function(query, callback){
// 	URL.find(query, callback)
// }