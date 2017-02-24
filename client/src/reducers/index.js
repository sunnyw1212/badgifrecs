import { combineReducers } from 'redux';
import RecipePostsReducer from './recipeposts_reducer';
import UsersReducer from './users_reducer';
import CommentReducer from './comment_reducer';

const rootReducer = combineReducers({
	recipeposts: RecipePostsReducer,
	users: UsersReducer,
	comment: CommentReducer
});

export default rootReducer;