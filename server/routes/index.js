const express = require('express');
const router = express.Router();
const controller = require('../controllers')
/*filemetadata route dependencies for file upload*/
// const multer = require('multer');
// const upload = multer({ dest: './uploads/'});


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
// //get all users
// router.get('/users', controller.user.getUsers);
// //get user by id
// router.get('/users/:id', controller.user.getUsers);










module.exports = router;
