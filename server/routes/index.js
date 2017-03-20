const express = require('express');
const router = express.Router();
const controller = require('../controllers')



//get all recipeposts
router.get('/recipeposts', controller.recipepost.getPosts);

//get recipepost by id
router.get('/recipeposts/:id', controller.recipepost.getPosts);

//post create new recipe
router.post('/recipeposts', controller.recipepost.createPost);

//put update recipe
router.put('/recipeposts/:id', controller.recipepost.editPost);

//delete recipe
router.delete('/recipeposts/:id', controller.recipepost.deletePost);

//post create new comment
router.post('/comment', controller.comment.createComment);

//post register new user
router.post('/register', controller.user.register);

//post login user
router.post('/login', controller.user.login);











module.exports = router;
