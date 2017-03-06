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
import MyPosts from './components/MyPosts';
import EditRecipe from './components/EditRecipe';

export default (
	
	<Route path='/' component={App}>
		<IndexRoute component={PhotoGrid}/>
		<Route path='view/:id' component={View}/>
		<Route path='viewreddit/:id' component={ViewReddit}/>
		<Route path='register' component={Register}></Route>
		<Route path='login' component={Login}></Route>
		<Route path='logout' component={Logout}></Route>
		<Route path='upload' component={UploadRecipe}></Route>
		<Route path='myposts' component={MyPosts}></Route>
		<Route path='editrecipe/:id' component={EditRecipe}></Route>
	</Route>
);
	
