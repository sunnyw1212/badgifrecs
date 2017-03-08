import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

//import { browserHistory } from 'react-router';

import { createRecipePost } from '../actions/';

import validator from 'validator';

import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';

import { Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import '../styles/UploadRecipe.scss';


class UploadRecipe extends Component{
	
	constructor(props){
		super(props)

		this.state = {
			
			recipe_gif: 'http://i.imgur.com/uHHH9cE.gif',
			recipe_title: '',
			recipe_description: '',
			recipe_instructions: '',
			err_recipe_gif: null,
			err_recipe_title: null

		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	dialogActions = [
		<RaisedButton
        label='Try Again'
        primary={true}
        onTouchTap={ ()=> {window.location.reload()} } //refresh page
     />
	];

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

	handleSelectChange = (inputElement, e, index , value) => {
		let newState = Object.assign({}, this.state);
		newState[inputElement] = value;
		this.setState(newState);
	}

	makeArrayFromString = ( string ) => {
		return string.split('\n')
	}

	checkIfEmpty = (reqFieldsObj) => {
		let errors = {};

		for(var keys in reqFieldsObj){
			if( validator.isEmpty(reqFieldsObj[keys]) ){
				errors[keys] = 'Required';
			}
		}

		return errors;
	}

	// showLoadingSpinner = ()=>{
	// 	let newState = Object.assign({}, this.state);
	// 	newState['loading'] = true;
	// 	this.setState(newState);
	// }
	
	handleSubmit = (e) => {
		e.preventDefault();
		const { recipe_gif, recipe_title, recipe_description, recipe_instructions } = this.state;
		
		//validate

		let requiredFields = {
			recipe_gif: recipe_gif,
			recipe_title: recipe_title
		};

		let emptyFields = this.checkIfEmpty(requiredFields);

		if( Object.keys(emptyFields).length > 0){
			console.log('Error', emptyFields);
			let newState = Object.assign({}, this.state);

			for(let keys in emptyFields){
				if(emptyFields.hasOwnProperty(keys)){

					//TO DO ADD ERROR TEXT
					let errField = `err_${keys}` 
					newState[errField] = 'This is a required field.'
				}
				
			}
			this.setState(newState);
			return false;
		}

		if( requiredFields['recipe_gif'] === 'http://i.imgur.com/uHHH9cE.gif'){
			let newState = Object.assign({}, this.state);
			let errField = 'err_recipe_gif';
			newState[errField] = 'Please submit a NEW Gif Recipe.' 
			this.setState(newState);
			return false;
		}

		let arr_recipe_instructions = this.makeArrayFromString(recipe_instructions);
		
		
		this.props.createRecipePost({
			user: this.props.currentUser.user,
			recipe_gif: recipe_gif,
			recipe_title: recipe_title,
			recipe_description: recipe_description,
			recipe_instructions: arr_recipe_instructions
		});
	} 

	render(){

		

		if(this.props.new.error){
			console.log('errors!', this.props.new)
			return(
				<Dialog
					title='Oops!'
					open={true}
					actions={this.dialogActions}
				>
					{this.props.new.error}
				</Dialog>
			)
		}

		else if(this.props.new.loading){
			console.log('this.props.new.loading', this.props.new.loading)
			return(
				<div className="spinner-holder">
        	<LinearProgress mode='indeterminate' />
        	<h2>Uploading Your Recipe Post...</h2>
      	</div>
			)
		}
		else{
			return(

				<form onSubmit={this.handleSubmit} encType='multipart/form-data'>
					
					<div className='row'>
						
						<div className='col-sm-6 col-sm-offset-3 --padlr0'>
							<Card>
								
								<Card>
									<CardHeader
										title={this.state.recipe_gif}
									>
									</CardHeader>
									<CardMedia className='uploadform__imgcontainer'>
										
											<img src={this.state.recipe_gif} alt='Recipe Gif' className='--height100'/>
										
										
									</CardMedia>
								</Card>

								<CardText>
									<TextField
										errorText={this.state.err_recipe_gif}
										
										floatingLabelText='Recipe GIF Link'
										value={this.state.recipe_gif}
										onChange={this.handleTextChange.bind(this, 'recipe_gif')}
										></TextField>
									<br/>
									<TextField
										errorText={this.state.err_recipe_title}
										hintText='Tomato Spaghetti'
										floatingLabelText='Recipe Title'
										value={this.state.recipe_title}
										onChange={this.handleTextChange.bind(this, 'recipe_title')}
										></TextField>
									<br/>
									<TextField
							      hintText='The classic tomato spaghetti dish.'
							      floatingLabelText='Recipe Description'
							      multiLine={true}
							      rows={1}
							      value={this.state.recipe_description}
							      onChange={this.handleTextChange.bind(this, 'recipe_description')}
							    ></TextField>
									<br/>
									<TextField
										fullWidth={true}
							      hintText='Write each instruction on its own line.'
							      floatingLabelText='Recipe Instructions'
							      floatingLabelFixed={true}
							      multiLine={true}
							      rows={1}
							      value={this.state.recipe_instructions}
							      onChange={this.handleTextChange.bind(this, 'recipe_instructions')}
							    ></TextField>
									<br/>

								</CardText>

								<RaisedButton primary={true} label='Upload Recipe' type='submit' className='--width100'></RaisedButton>
							</Card>

						</div>
					</div> 
					
					
				</form>	

			)//end return
		}

		
	} //end render


} //end class


function mapStateToProps( state ){
		console.log('map state to props', state)
		return { 
			new: state.recipeposts.new,
			currentUser: state.users.currentUser
		}
}

function mapDispatchToProps( dispatch ){
	return bindActionCreators( { createRecipePost: createRecipePost }, dispatch );
}


export default connect( mapStateToProps, mapDispatchToProps )( UploadRecipe );