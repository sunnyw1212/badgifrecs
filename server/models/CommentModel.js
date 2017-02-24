const mongoose = require('mongoose');

//schema 
const CommentSchema = mongoose.Schema({
	user: {
		_id: {type : mongoose.Schema.ObjectId, ref: 'User'}, 
		name: {type : String, ref: 'User', default: 'Anon'}
	},
	post_id: { type : mongoose.Schema.ObjectId, ref: 'RecipePost' }, //post to which comment belongs
	timestamp: { type: Date, default: Date.now},
	text_body: { type: String, trim: true }
});

let Comment = module.exports = mongoose.model('Comment', CommentSchema);

// module.exports.saveURL = function( newURL, callback ){
// 	newURL.save(callback)
// }

// module.exports.findAll = function(query, callback){
// 	URL.find(query, callback)
// }