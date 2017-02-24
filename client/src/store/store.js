import { createStore, combineReducers, compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';


import rootReducer from '../reducers';

//get data from server via axios and set to state

const store = createStore(
	combineReducers({
		...rootReducer, 
		routing: routerReducer
		
	}) 
);

export const history = syncHistoryWithStore( browserHistory, store );

export default store;