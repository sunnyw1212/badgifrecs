import { GET_RECIPEPOSTS_LOAD, GET_RECIPEPOSTS_SUCCESS, GET_RECIPEPOSTS_FAIL,
	GET_RECIPEPOST_LOAD, GET_RECIPEPOST_SUCCESS, GET_RECIPEPOST_FAIL,
	GET_REDDITPOSTS_LOAD, GET_REDDITPOSTS_SUCCESS, GET_REDDITPOSTS_FAIL,
	GET_REDDITPOST_LOAD, GET_REDDITPOST_SUCCESS, GET_REDDITPOST_FAIL,
	CREATE_RECIPEPOST_LOAD, CREATE_RECIPEPOST_SUCCESS, CREATE_RECIPEPOST_FAIL} from '../actions/index';


const INITIAL_STATE = { 
	originalAll: {posts: [], error: null, loading: true },
	originalSingle:{ post: null, error: null, loading: true},
	redditAll: {posts: [], error: null, loading: true},
	redditSingle: {post: null, error: null, loading:true},
	new: {post: null, error: null, loading: false}
};

export default function( state=INITIAL_STATE, action ){
	console.log('got an action', action)

	let error;
	switch( action.type ){

		case GET_RECIPEPOSTS_LOAD:
			console.log('getRecipePostsLoad');
			return Object.assign({}, state, {
				originalAll: {
					posts: [],
					error: null,
					loading: true
				}
			});

		case GET_RECIPEPOSTS_SUCCESS: 
			return Object.assign({}, state, {
				originalAll: {
					posts: action.payload.data,
					error: null, 
					loading: false
				}
			});

		case GET_RECIPEPOSTS_FAIL:
			error = action.payload;
			return Object.assign({}, state, {
				originalAll: {
					posts: [],
					error: error,
					loading: false
				}
			});

		case GET_RECIPEPOST_LOAD:
			console.log('getRecipePostLoad SINGLE');
			return Object.assign({}, state, {
				originalSingle: {
					post: null,
					error: null,
					loading: true
				}
			});

		case GET_RECIPEPOST_SUCCESS: 
			return Object.assign({}, state, {
				originalSingle: {
					post: action.payload.data,
					error: null, 
					loading: false
				}
			});

		case GET_RECIPEPOST_FAIL:
			error = action.payload;
			return Object.assign({}, state, {
				originalSingle: {
					post: null,
					error: error,
					loading: false
				}
			});

		case GET_REDDITPOSTS_LOAD:
			console.log('getRedditPostsLoad');
			return Object.assign({}, state, {
				redditAll: {
					posts: [],
					error: null,
					loading: true
				}
			});

		case GET_REDDITPOSTS_SUCCESS: 
			console.log('getRedditPostsSuccess', action);
			return Object.assign({}, state, {
				redditAll: {
					posts: action.payload,
					error: null, 
					loading: false
				}
			});

		case GET_REDDITPOSTS_FAIL:
			error = action.payload;
			return Object.assign({}, state, {
				redditAll: {
					posts: [],
					error: error,
					loading: false
				}
			});

		case GET_REDDITPOST_LOAD:
			console.log('SINGLE getRedditPostLoad');
			return Object.assign({}, state, {
				redditSingle: {
					post: null,
					error: null,
					loading: true
				}
			});

		case GET_REDDITPOST_SUCCESS: 
			console.log('getRedditPostSuccess SINGLE ', action);
			return Object.assign({}, state, {
				redditSingle: {
					post: action.payload.data,
					error: null, 
					loading: false
				}
			});

		case GET_REDDITPOST_FAIL:
			error = action.payload;
			return Object.assign({}, state, {
				redditSingle: {
					post: null,
					error: error,
					loading: false
				}
			});

		
		case CREATE_RECIPEPOST_LOAD: 
			console.log('createRecipePostLoad')
			return Object.assign({}, state, {
				new:{
					post: null,
					error: null,
					loading: true
				}
			});

		case CREATE_RECIPEPOST_SUCCESS:
			console.log('heres the data for create recipe post', action.payload.data);
		
			return Object.assign({}, state, {
				new: {
					post: action.payload.data,
					error: null,
					loading: false
				}
			});

		case CREATE_RECIPEPOST_FAIL:
			console.log('failed createRecipePost ', action.payload)
			error = action.payload;

			return Object.assign({}, state, {
				new: {
					post: null,
					error: error,
					loading: false
				} 
			});

		default: 
			return state;
	}//end switch
}//end function