import axios from 'axios';
import { browserHistory } from 'react-router';
//recipepost constants
export const GET_RECIPEPOSTS = 'GET_RECIPEPOSTS';
export const GET_RECIPEPOSTS_LOAD = 'GET_RECIPEPOSTS_LOAD';
export const GET_RECIPEPOSTS_SUCCESS = 'GET_RECIPEPOSTS_SUCCESS';
export const GET_RECIPEPOSTS_FAIL = 'GET_RECIPEPOSTS_FAIL';

export const GET_RECIPEPOST_LOAD = 'GET_RECIPEPOST_LOAD';
export const GET_RECIPEPOST_SUCCESS = 'GET_RECIPEPOST_SUCCESS';
export const GET_RECIPEPOST_FAIL = 'GET_RECIPEPOST_FAIL';

export const GET_MYRECIPEPOSTS_LOAD = 'GET_MYRECIPEPOSTS_LOAD';
export const GET_MYRECIPEPOSTS_SUCCESS = 'GET_MYRECIPEPOSTS_SUCCESS';
export const GET_MYRECIPEPOSTS_FAIL = 'GET_MYRECIPEPOSTS_FAIL';

export const CREATE_RECIPEPOST = 'CREATE_RECIPEPOST';
export const CREATE_RECIPEPOST_LOAD = 'CREATE_RECIPEPOST_LOAD';
export const CREATE_RECIPEPOST_SUCCESS = 'CREATE_RECIPEPOST_SUCCESS';
export const CREATE_RECIPEPOST_FAIL = 'CREATE_RECIPEPOST_FAIL';

export const EDIT_RECIPEPOST = 'EDIT_RECIPEPOST';
export const EDIT_RECIPEPOST_LOAD = 'EDIT_RECIPEPOST_LOAD';
export const EDIT_RECIPEPOST_SUCCESS = 'EDIT_RECIPEPOST_SUCCESS';
export const EDIT_RECIPEPOST_FAIL = 'EDIT_RECIPEPOST_FAIL';

export const DELETE_RECIPEPOST = 'DELETE_RECIPEPOST';
export const DELETE_RECIPEPOST_LOAD = 'DELETE_RECIPEPOST_LOAD';
export const DELETE_RECIPEPOST_SUCCESS = 'DELETE_RECIPEPOST_SUCCESS';
export const DELETE_RECIPEPOST_FAIL = 'DELETE_RECIPEPOST_FAIL';

export const GET_REDDITPOSTS = 'GET_REDDITPOSTS';
export const GET_REDDITPOSTS_LOAD = 'GET_REDDITPOSTS_LOAD';
export const GET_REDDITPOSTS_SUCCESS = 'GET_REDDITPOSTS_SUCCESS';
export const GET_REDDITPOSTS_FAIL = 'GET_REDDITPOSTS_FAIL';

export const GET_REDDITPOST = 'GET_REDDITPOST';
export const GET_REDDITPOST_LOAD = 'GET_REDDITPOST_LOAD';
export const GET_REDDITPOST_SUCCESS = 'GET_REDDITPOST_SUCCESS';
export const GET_REDDITPOST_FAIL = 'GET_REDDITPOST_FAIL';

//comment constants
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_COMMENT_LOAD = 'CREATE_COMMENT_LOAD';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAIL = 'CREATE_COMMENT_FAIL';

//for removing new comments on component unmount
export const RESET_NEW_COMMENTS = 'RESET_NEW_COMMENTS';

//user constants
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_LOAD = 'REGISTER_USER_LOAD';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_LOAD = 'LOGIN_USER_LOAD';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

export const LOGOUT = 'LOGOUT';

//API config

let ROOT_URL = 'http://localhost:3000';
if (window.location.hostname === 'badgifrecipes.herokuapp.com') {
  ROOT_URL = 'https://badgifrecipes.herokuapp.com';
}
if (window.location.hostname === 'www.badgifrecipes.club') {
  ROOT_URL = 'www.badgifrecipes.club';
}


//CLEAN ALL THIS UP WRITE IT ALL USING REDUX THUNKS

export function getRecipePosts( id = '', name = '' ){
	if( id ){
		return (dispatch) => {
			dispatch(getRecipePostLoad());
			axios.get(`${ROOT_URL}/api/recipeposts/${id}`).then(
				//recipepost arg = array of recipeposts returned from axios get 
				recipepost => {
					dispatch(getRecipePostSuccess(recipepost));
				},
				error => {
					console.log('error in action getrecipepost', error);
					dispatch(getRecipePostFail('We can\'t get this Recipe from our servers right now.'));
				}
			);//end .then()
		}//end thunk 
	}
	//if name is present
	else if( name ){
		return (dispatch) => {
			dispatch(getMyRecipePostsLoad());
			axios.get(`${ROOT_URL}/api/recipeposts?name=${name}`).then(
				//recipepost arg = array of recipeposts returned from axios get 
				myrecipeposts => {
					dispatch(getMyRecipePostsSuccess(myrecipeposts));
				},
				error => {
					console.log('error in action getmyrecipeposts', error);
					dispatch(getMyRecipePostsFail('We can\'t get these Recipes from our servers right now.'));
				}
			);//end .then()
		}//end thunk 
	}
	else{
		return (dispatch) => {
			dispatch(getRecipePostsLoad());
			axios.get(`${ROOT_URL}/api/recipeposts/`).then(
				//recipeposts arg = array of recipeposts returned from axios get 
				recipeposts => {
					dispatch(getRecipePostsSuccess(recipeposts));
				},
				error => {
					console.log('error in action getrecipeposts', error);
					dispatch(getRecipePostsFail('We can\'t get Recipes from our servers right now.'));
				}
			);//end .then()
		}//end thunk 
	}
	
	
}

function getRecipePostLoad(){
	return{
		type: GET_RECIPEPOST_LOAD
	}
}

function getRecipePostSuccess(recipepost){
	return{
		type: GET_RECIPEPOST_SUCCESS,
		payload: recipepost
	}
}

function getRecipePostFail(errMessage){
	return {
		type: GET_RECIPEPOST_FAIL,
		payload: errMessage
	}
}

function getMyRecipePostsLoad(){
	return{
		type: GET_MYRECIPEPOSTS_LOAD
	}
}

function getMyRecipePostsSuccess(myrecipeposts){
	return {
		type: GET_MYRECIPEPOSTS_SUCCESS,
		payload: myrecipeposts
	}
}

function getMyRecipePostsFail(errMessage){
	return {
		type: GET_MYRECIPEPOSTS_FAIL,
		payload: errMessage
	}
}

function getRecipePostsLoad(){
	return{
		type: GET_RECIPEPOSTS_LOAD
	}
}

function getRecipePostsSuccess(recipeposts){
	return {
		type: GET_RECIPEPOSTS_SUCCESS,
		payload: recipeposts
	}
}

function getRecipePostsFail(errMessage){
	return {
		type: GET_RECIPEPOSTS_FAIL,
		payload: errMessage
	}
}

const REDDITPOSTS_URL_1 = 'https://www.reddit.com/r/shittygifrecipes/new.json?limit=1000';
const REDDITPOSTS_URL_2 = 'https://www.reddit.com/r/shittygifrecipes/new.json?limit=1000&after=t3_57mjbl';

function getRedditUrl1(){
	return axios.get(`${REDDITPOSTS_URL_1}`);
}

function getRedditUrl2(){
	return axios.get(`${REDDITPOSTS_URL_2}`);
}

//GET REDDIT POSTS
export function getRedditPosts(){
	return (dispatch) => {
		dispatch(getRedditPostsLoad());

		axios.all([getRedditUrl1(), getRedditUrl2()]).then(
			//redditpots arg = array of redditposts returned from axios get
			axios.spread(
				(redditposts1, redditposts2) =>{
					console.log(redditposts1, redditposts2)
					let allredditposts = [...redditposts1.data.data.children, ...redditposts2.data.data.children]
					dispatch(getRedditPostsSuccess(allredditposts));
				}
			)//end spread
		).catch((err)=>{ //end then
			console.log('error in action getredditposts', err);
			dispatch(getRedditPostsFail('We can\'t get Recipes from Reddit right now.'));
		});//end .catch()
	}//end thunk 
	
}

function getRedditPostsLoad(){
	return{
		type: GET_REDDITPOSTS_LOAD
	}
}

function getRedditPostsSuccess(redditposts){
	return {
		type: GET_REDDITPOSTS_SUCCESS,
		payload: redditposts
	}
}

function getRedditPostsFail(errMessage){
	return {
		type: GET_REDDITPOSTS_FAIL,
		payload: errMessage
	}
}

//GET SINGLE REDDIT POST

const REDDITPOST_URL = 'https://www.reddit.com/r/shittygifrecipes/comments/';

export function getRedditPost(id){
	if(id){
		return (dispatch)=>{
			let fullRedditUrl = `${REDDITPOST_URL}${id}.json`;

			dispatch(getRedditPostLoad());
			
			axios.get(`${fullRedditUrl}`).then(
				redditpost=>{
					dispatch(getRedditPostSuccess(redditpost));
				},
				err=>{
					console.log('error in action getredditpost', err);
					dispatch(getRedditPostFail('We can\'t get the data for this Recipe from Reddit right now.'));
				}
			);//end then()
		}//end dispatch
	}//end if id
}

function getRedditPostLoad(){
	return{
		type: GET_REDDITPOST_LOAD
	}
}

function getRedditPostSuccess(redditpost){
	return {
		type: GET_REDDITPOST_SUCCESS,
		payload: redditpost
	}
}

function getRedditPostFail(errMessage){
	return{
		type: GET_REDDITPOST_FAIL,
		payload: errMessage
	}
}

//for loading
export function createRecipePost( data ){
	//return dispatch (this is redux thunk format of writing action creators--allows you to return functions instead of pure actions)
	return (dispatch) => {
		dispatch(createRecipePostLoad());
		axios.post(`${ROOT_URL}/api/recipeposts`, data).then(
			//on sucessful post, change route and dispatch the success action to reducer
			newRecipePost =>{
				browserHistory.push('/');
				dispatch(createRecipePostSuccess(newRecipePost))
			},
			//on failed psot, catch response adn dispatch failed action to reducer
			error=>{
				console.log('error in action createRecipePost', error)
				dispatch( createRecipePostFail('There was a problem while Creating your Recipe. Please try again.') );
			}//end error promise handler function
		);//end .then()
	};//end thunk dispatch function
	
	
}//end createRecipePost

function createRecipePostLoad(){
	return{
		type: CREATE_RECIPEPOST_LOAD
	}
}

//for successful creation of recipepost
function createRecipePostSuccess(newRecipePost){
	return {
		type: CREATE_RECIPEPOST_SUCCESS,
		payload: newRecipePost
	}
}

function createRecipePostFail(errMessage){
	return {
		type: CREATE_RECIPEPOST_FAIL,
		payload: errMessage
	}
}

export function editRecipePost( id = '', data){
	if(id){
		return (dispatch)=>{
			dispatch(editRecipePostLoad());
			axios.put(`${ROOT_URL}/api/recipeposts/${id}`, data).then(
				editedrecipepost =>{
					browserHistory.push(`/view/${id}`);
					dispatch(editRecipePostSuccess(editedrecipepost));
				},
				error =>{
					console.log('error in action editedrecipepost', error);
					dispatch(editRecipePostFail('We can\'t update your Recipe right now.'));
				}
			)//end .then()
		}//end thunk
	}
	//if no id return fail
	else{
		return (dispatch)=>{
			console.log('no id present in edit request')
			dispatch(editRecipePostFail('We can\'t update your Recipe right now.'));
		}
	}
}

function editRecipePostLoad(){
	return{
		type: EDIT_RECIPEPOST_LOAD
	}
}

function editRecipePostSuccess(editedRecipePost){
	return{
		type: EDIT_RECIPEPOST_SUCCESS,
		payload: editedRecipePost
	}
}

function editRecipePostFail(errMessage){
	return{
		type: EDIT_RECIPEPOST_FAIL,
		payload: errMessage
	}
}

export function deleteRecipePost( id = '' ){
	if( id ){
		return (dispatch) => {
			dispatch(deleteRecipePostLoad());
			axios.delete(`${ROOT_URL}/api/recipeposts/${id}`).then(
				//recipepost arg = array of recipeposts returned from axios get 
				recipepost => {
					dispatch(deleteRecipePostSuccess(recipepost));
				},
				error => {
					console.log('error in action delteRecipePost', error);
					dispatch(deleteRecipePostFail('We can\'t delete this Recipe right now.'));
				}
			);//end .then()
		}//end thunk 
	}
	//if no id then reutrn fail
	else{
		return(dispatch)=>{
			console.log('no id present in delete request')
			dispatch(deleteRecipePostFail('We can\'t delete this Recipe right now.'))
		}
	}
}

function deleteRecipePostLoad(){
	return{
		type: DELETE_RECIPEPOST_LOAD
	}
}

function deleteRecipePostSuccess(deletedPost){
	return{
		type: DELETE_RECIPEPOST_SUCCESS,
		payload: deletedPost
	}
}

function deleteRecipePostFail(errMessage){
	return{
		type: DELETE_RECIPEPOST_FAIL,
		payload: errMessage
	}
}

//create comment actions
export function createComment( data ){
	return( dispatch )=>{
		dispatch( createCommentLoad() );
		axios.post(`${ROOT_URL}/api/comment`, data).then(
			//on sucessful post add comment and dispatch sucess action to reducer
			newComment=>{
				dispatch( createCommentSuccess(newComment) );
			},
			//on failed post, catch response and dispatch failed action to reducer
			error=>{
				console.log('error in action createComment', error);
				dispatch( createCommentFail('There was a problem while Creating your Comment. Please try again.') );
			}//end error promise handler

		);//end then()

	}//end thunk dispatch func
}//end createComment func 

function createCommentLoad(){
	return {
		type: CREATE_COMMENT_LOAD
	}
}

function createCommentSuccess(newComment){
	return{
		type: CREATE_COMMENT_SUCCESS,
		payload: newComment
	}
}

function createCommentFail(errMessage){
	return{
		type: CREATE_COMMENT_FAIL,
		payload: errMessage
	}
}

export function resetNewComments(){
	return{
		type: RESET_NEW_COMMENTS
	}
}


//register user acitons
export function registerUser( userData ){
	return (dispatch) => {
		dispatch(registerUserLoad());
		axios.post(`${ROOT_URL}/api/register`, userData).then(
			//on successful creation of user register, redirect to homepage and dispatch sucess actoin to reducer
			newUserData=>{
				browserHistory.push('/');
				dispatch(registerUserSuccess(newUserData));
			},
			error=>{
				console.log('error in action registerUser', error)
				dispatch(registerUserFail('There was a problem while Registering your Account. Please choose a different Username.'));
			}
			
		);//end then()
	}//end thunk dispatch
}//end register user

function registerUserLoad(){
	return{
		type: REGISTER_USER_LOAD
	}
}

function registerUserSuccess(newUserData){
	return{
		type: REGISTER_USER_SUCCESS,
		payload: newUserData
	}
}

function registerUserFail(errMessage){
	return{
		type: REGISTER_USER_FAIL,
		payload: errMessage
	}
}

export function loginUser( userData ){
	return(dispatch)=>{
		dispatch(loginUserLoad());

		axios.post(`${ROOT_URL}/api/login`, userData).then(
			//on successful login of user, redirect to login page and dispatch sucess actoin to reducer
			loggedInUserData=>{
				browserHistory.push('/');
				dispatch(loginUserSuccess(loggedInUserData));
			},
			error=>{
				console.log('error in action loginUser', error);
				dispatch(loginUserFail('There was a problem while Logging In. Please make sure you have entered the correct Username and Password.'));
			}

		);//end then()
	}//end thunk dispatch
}//end loginuser

function loginUserLoad(){
	return{
		type: LOGIN_USER_LOAD
	}
}

function loginUserSuccess(loggedInUserData){
	return{
		type: LOGIN_USER_SUCCESS,
		payload: loggedInUserData
	}
}

function loginUserFail(errMessage){
	return{
		type: LOGIN_USER_FAIL,
		payload: errMessage
	}
}



//logout actions
export function logout(){
	return{
		type: LOGOUT
	}
}



























