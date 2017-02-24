const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });


router.get('/', function(req, res, next) {

	
	const controller = controllers['recipepost'];
	if (controller == null){
		res.json({
	    	confirmation: 'fail',
	    	message: 'Invalid Resource'
		})
		return
	}

	controller.get(req.params, function(err, results){
		console.log('err', err)
		console.log('results', results)
		if (err){
			res.json({
		    	confirmation: 'fail',
		    	message: 'Invalid query'
			})
			return
		}

		res.json({
	    	confirmation: 'success',
	    	results: results
		})
	})
});

router.get('/:id', function(req, res, next) {

	
	const id = req.params.id

	const controller = controllers['recipepost']
	if (controller == null){
		res.json({
	    	confirmation: 'fail',
	    	message: 'Invalid Resource'
		})
		return
	}

	controller.get({id:id}, function(err, results){
		if (err){
			res.json({
		    	confirmation: 'fail',
		    	message: err.message
			})
			return
		}

		res.json({
	    	confirmation: 'success',
	    	results: [results]
		})
	})
});

//route to upload MULTIPLE FILES 
router.post('/', upload.array('recipe_imgs', 10), function(req, res, next) {
	console.log('these are the req files', req.files);
	console.log('this is the req body', req.body)

	const controller = controllers['recipepost']
	if (controller == null){
		res.json({
	    	confirmation: 'fail',
	    	message: 'Invalid Resource'
		})
		return
	}

	controller.post(req, function(err, result){
		
		if (err){
			res.json({
		    	confirmation: 'fail',
		    	message: 'Invalid Resource'
			})
			return
		}
		

		res.json({
	    	confirmation: 'success',
	    	result: result
		})
	})
});


module.exports = router;
