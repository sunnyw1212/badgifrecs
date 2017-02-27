import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import { getRecipePosts, createComment, resetNewComments } from '../actions/';

import LinearProgress from 'material-ui/LinearProgress';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class View extends Component{
	constructor(props){
		super(props)
		this.state = {
			open: false,
			text_body: '',
			err_text_body: ''
		};
	}

	componentWillMount(){
		console.log('Thisis the props in view  ', this.props)
		
		let currentUrl = window.location.href
		let recipePostId = currentUrl.split('/').pop(); 
		this.props.actions.getRecipePosts(recipePostId);
		this.props.actions.getRecipePosts();
	}

	componentWillUnmount(){
		//remove state remove props newCOmments
		this.props.actions.resetNewComments();
	}



	handleToggle = () => {
		let newState = Object.assign({}, this.state );
		newState['open'] = !this.state.open; 
		this.setState(newState);
	};

	handleTextChange = (inputElement, e) => {

		let newState = Object.assign({}, this.state);
		
		//update Error text fields (remove errorText when user enters a value)
		let errTextField = `err_${inputElement}`;

		if(e.target.value && newState[errTextField] ){
			newState[errTextField] = null;
		}

		newState[inputElement] = e.target.value;
		this.setState(newState);
	}

	handleNextRecipe = () =>{
		let {posts} = this.props.originalAll;
		let currentUrl = window.location.href
		let originalPostId = currentUrl.split('/').pop(); 
		
		//get current post's index in gifs array
		var currentPostIndex = posts.map((post)=>{
			return post._id
		}).indexOf(originalPostId);
		console.log('this is the currentPostIndex ', currentPostIndex)
		//get next recipe id 
		let nextRecipeId = posts[currentPostIndex + 1] ? posts[currentPostIndex + 1]._id : posts[0]._id
		console.log('heres the next page', nextRecipeId)

		
		//remove state remove props newCOmments
		this.props.actions.resetNewComments();

		browserHistory.push(`/view/${nextRecipeId}`);
		
		this.props.actions.getRecipePosts(nextRecipeId)
		this.props.actions.getRecipePosts();
		// window.location.href = 'localhost:3001' + nextRecipeId;
		// window.location.reload()

	};


	checkIfEmpty = (reqFieldsObj) => {
		let errors = {};

		for(var keys in reqFieldsObj){
			if(!reqFieldsObj[keys]){
				errors[keys] = 'Required';
			}
		}

		return errors;
	}

	handleSubmit = (e) =>{
		e.preventDefault();

		let currentUrl = window.location.href
		let originalPostId = currentUrl.split('/').pop(); 

		const {text_body} = this.state;

		let requiredFields = {
			text_body: text_body
		}

		let emptyFields = this.checkIfEmpty(requiredFields);

		if( Object.keys(emptyFields).length > 0){
			console.log('Error', emptyFields);
			let newState = Object.assign({}, this.state);

			for(let keys in emptyFields){
				
				//TO DO ADD ERROR TEXT
				var errField = `err_${keys}` 
				newState[errField] = 'This is a required field.'
				
			}
			this.setState(newState);
			return false;
		}

		console.log('Submitted', this.state)
		// this.props.actions.registerUser({
		// 	name: this.state.name,
		// 	password: this.state.password
		// });
		this.props.actions.createComment({
			user: this.props.currentUser.user,
			post_id: originalPostId,
			text_body: text_body
		});
		//clear out input text_body TextField
		let nextState = Object.assign({}, this.state);
		nextState.text_body = '';
		this.setState(nextState);

		
	}

	dialogActions = [
    <RaisedButton
			label='Cancel'
			primary={false}
			onTouchTap={this.handleToggle}
    />,
		<RaisedButton
        label='Try Again'
        primary={true}
        onTouchTap={ ()=> {window.location.reload()} } //refresh page
     />
	];

	renderDescription(){
		let {recipe_description} = this.props.originalSingle.post
		if(recipe_description.length < 1){
			return(
				<div style={{color: 'rgba(0, 0, 0, 0.541176)'}}>
					No Description Available
				</div>
			)
		}//end if
		else{
			return(
				<div style={{color: 'rgba(0, 0, 0, 0.541176)'}}>
					{recipe_description}
				</div>
			)
		}
	}

	renderInstructions(){
		//.slice() to clone array 
		let instructions = this.props.originalSingle.post.recipe_instructions.slice();
		if(instructions.length <= 1){
			return(
				<div style={{color: 'rgba(0, 0, 0, 0.541176)'}}>
					No Instructions Available
				</div>
			)
		}
		else{
			return instructions.map((instruction, index, array)=>{
				console.log('heres the instruciton', instruction)
				return(
					
					<div key={index}>
						<ListItem
							primaryText={instruction}
						>	
							
						</ListItem>
						<Divider></Divider>

					</div>
				)
				
			});//end map
		}
		
	}//end func renderIngredients
	renderNewComments(){

		if(this.props.newComments.error){
			console.log('errors!', this.props.newComments)
			return(
				<Dialog
					title='Oops!'
					open={true}
					actions={<RaisedButton
						        label='Try Again'
						        primary={true}
						        onTouchTap={ ()=> {window.location.reload()} } //refresh page
						     		/>
					}
				>
					{this.props.newComments.error}
				</Dialog>
			)
		}

		else if(this.props.newComments.loading){
			console.log('this.props.new.loading', this.props.newComments.loading)
			return(
				<div className="spinner-holder">
        	<LinearProgress mode='indeterminate' />
        	<h2>Submitting Your Comment</h2>
      	</div>
			)
		}
		
		else if(this.props.newComments.comments.length > 0){
			//.slice() to clone array 
			let newCommentsClone = this.props.newComments.comments.slice().reverse();
			return newCommentsClone.map((comment, index, array)=>{
				console.log('heres the comment', comment)
				return(
					
					<div key={index}>
						<ListItem
							primaryText={comment.text_body}
							secondaryTextLines={2}
							secondaryText={
								<div>
									<p>{comment.user.name}</p>
									<p>{`${new Date(comment.timestamp).toLocaleTimeString()} ${new Date(comment.timestamp).toLocaleDateString()}`}</p>
								</div>
								
								
							}
						>	
							
						</ListItem>
						<Divider></Divider>

					</div>
				)
				
			});//end map
		
		}//end else if 

		else{
			return null
		}
	}

	renderComments(){
		//.slice() to clone array 
		let comments = this.props.originalSingle.post.comment_ids.slice();
		return comments.map((comment, index, array)=>{
			console.log('heres the comment', comment)
			return(
				
				<div key={index}>
					<ListItem
						primaryText={comment.text_body}
						secondaryTextLines={2}
						secondaryText={
							<div>
								<p>{comment.user.name}</p>
								<p>{`${new Date(comment.timestamp).toLocaleTimeString()} ${new Date(comment.timestamp).toLocaleDateString()}`}</p>
							</div>
							
							
						}
					>	
						
					</ListItem>
					<Divider></Divider>

				</div>
			)
			
		});//end map
	}//end func renderIngredients

	renderNextRecipeBtn(){
		if(!this.props.originalAll || !this.props.originalAll.posts || this.props.originalAll.loading || this.props.originalAll.error){
			return null
		}

		else{
			return(
				<RaisedButton
					label='Next Recipe'
					style={{position: 'absolute', right: 5, top: 10}}
					primary={true}
					onClick={this.handleNextRecipe}
		    >	
		    </RaisedButton>
			)
		}
	}

	render(){
		
		//if error
		if(this.props.originalSingle.error){
			console.log('errors!', this.props.originalSingle)
			return(
				<Dialog
					title='Oops!'
					open={!this.state.open}
					actions={this.dialogActions}
					onRequestClose={this.handleToggle}
				>
					<p>{this.props.originalSingle.error}</p>
				
				</Dialog>
			)
		}

		//if loading
		else if (!this.props.originalSingle || !this.props.originalSingle ||this.props.originalSingle.loading) {

    	console.log('Loading... curent state:',this.props)
      return (
        <div className="spinner-holder">
          <LinearProgress mode='indeterminate' />
        </div>
      )

    }

		
		//if success
		else{
			console.log('THIS ISS THE ROINGAL SINGEL JK HERES PROPS', this.props)
			let { recipe_gif, recipe_title } = this.props.originalSingle.post;
			let { name } = this.props.originalSingle.post.user;

			console.log('this the new props in View', this.props)
			return(
				
				<Card style={{maxWidth:600}}>
					<Card >
						<CardMedia>
				      <img src={ recipe_gif } className='img-responsive'/>
				    </CardMedia>
					</Card>
					
					<Card>
						<CardHeader 
				    	title={recipe_title}
				    	subtitle={`Posted By ${name}`}
				    	children={this.renderNextRecipeBtn()}
				    >
				    	
				    </CardHeader>
				  
					</Card>

					<Card>
			    	<CardTitle
							title='Description'
							showExpandableButton={true}
							actAsExpander={true}
			    	>
			    		
			    	</CardTitle>
			    	<CardText
							expandable={true}
			    	>
			    		{this.renderDescription()}
			    	</CardText>
			    </Card>

			    <Card>
			    	<CardTitle
							title='Instructions'
							showExpandableButton={true}
							actAsExpander={true}
			    	>
			    		
			    	</CardTitle>
			    	<CardText
							expandable={true}
			    	>
			    		<List>
			    			{this.renderInstructions()}
			    		</List>
			    	</CardText>
			    </Card>

					<Card> 
						<CardTitle
							title='Comments'
							showExpandableButton={true}
							actAsExpander={true}
							
							
						>
							
							
						</CardTitle>
						
						<CardText
						expandable={true}
						>
							<List>
								{this.renderNewComments()}
								{this.renderComments()}
							</List>

							
							<Paper>
								<form onSubmit={this.handleSubmit} style={{padding: 15}}>
									<TextField
										errorText={this.state.err_text_body}
										fullWidth={true}
										floatingLabelText='Comment'
										value={this.state.text_body}
										onChange={this.handleTextChange.bind(this, 'text_body')}
									>
									</TextField>
									<RaisedButton style={{width: 100+'%'}} primary={true} label='Submit' type='submit'>
									</RaisedButton>
								</form>
								
							</Paper>
							
							
						</CardText>
						
					</Card>
			
				</Card>


			)//end return 
		}
		
		
	}//end render
}

function mapStateToProps(state){
	return{
		currentUser: state.users.currentUser,
		originalSingle: state.recipeposts.originalSingle,
		originalAll: state.recipeposts.originalAll,
		newComments: state.comment.newComments
	}
}

function mapDispatchToProps(dispatch){
	return {
		actions: {
			getRecipePosts: bindActionCreators( getRecipePosts, dispatch),
			createComment: bindActionCreators( createComment, dispatch),
			resetNewComments: bindActionCreators( resetNewComments, dispatch)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(View);