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

let RecipePost = module.exports = mongoose.model('RecipePost', RecipePostSchema);

// module.exports.saveURL = function( newURL, callback ){
// 	newURL.save(callback)
// }

// module.exports.findAll = function(query, callback){
// 	URL.find(query, callback)
// }