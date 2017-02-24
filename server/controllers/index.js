
const RecipePostController = require('./RecipePostController'); 
const CommentController = require('./CommentController');
const UserController = require('./UserController');

module.exports = {
	recipepost: RecipePostController,
	comment: CommentController,
	user: UserController
}