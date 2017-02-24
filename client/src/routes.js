import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import PhotoGrid from './components/PhotoGrid';
import View from './components/View';
import ViewReddit from './components/ViewReddit';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import UploadRecipe from './components/UploadRecipe';

export default (
	
	<Route path='/' component={App}>
		<IndexRoute component={PhotoGrid}/>
		<Route path='view/:id' component={View}/>
		<Route path='viewreddit/:id' component={ViewReddit}/>
		<Route path='register' component={Register}></Route>
		<Route path='login' component={Login}></Route>
		<Route path='logout' component={Logout}></Route>
		<Route path='upload' component={UploadRecipe}></Route>
	</Route>
);
	
