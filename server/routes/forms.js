const express = require('express');
const router = express.Router();
const controller = require('../controllers')
/*filemetadata route dependencies for file upload*/
const multer = require('multer');
const upload = multer();

/* GET home page. */
router.get('/', function( req, res, next ) {
  res.render('index');
});


/*GET RecipePost page*/
router.get('/recipepostform', function( req, res, next ){
	//render recipepost views pug page
	res.render('recipepost');
});

/*GET Comment page*/
router.get('/comment', function( req, res, next ){
	//render comment views pug page
	res.render('comment');
});

/*GET User register page*/
router.get('/userform', function( req, res, next ){
	//render user register views pug page
	res.render('user');
});

/*GET User login page*/
router.get('/loginform', function( req, res, next ){
	//render user login views pug page
	res.render('login');
});













module.exports = router;
