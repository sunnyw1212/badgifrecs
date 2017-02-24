const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
// const communityController = require('../controllers/CommunityController')
// const profileController = require('../controllers/ProfileController')
// const postController = require('../controllers/PostController')
// const controllers = {
// 	community: communityController,
// 	profile: profileController,
// 	post: postController
// }


router.get('/:resource', function(req, res, next) {

	const resource = req.params.resource
	let controller = controllers[resource]
	console.log('heres the controllseer resourcce', controller)
	if (controller == null){
		res.json({
	    	confirmation: 'fail',
	    	message: 'Invalid Resource'
		})
		return
	}

	controller.get(req.params.resource, function(err, results){
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

router.get('/:resource/:id', function(req, res, next) {

	const resource = req.params.resource
	const id = req.params.id

	let controller = controllers[resource]
	if (controller == null){
		res.json({
	    	confirmation: 'fail',
	    	message: 'Invalid Resource'
		})
		return
	}

	controller.get({id:id}, function(err, result){
		if (err){
			res.json({
		    	confirmation: 'fail',
		    	message: err.message
			})
			return
		}

		res.json({
	    	confirmation: 'success',
	    	result: result
		})
		
	})
});


router.post('/:resource', function(req, res, next) {
// console.log('hey look ast wwwme ', res.locals.user)
	const resource = req.params.resource
	let controller = controllers[resource]
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

		// if (resource == 'profile'){	// install cookie!!
		// 	req.session.user = result.id
		// }
		

		res.json({
	    	confirmation: 'success',
	    	result: result
		})
		
	})
});


module.exports = router;
