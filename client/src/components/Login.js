import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {loginUser} from '../actions/';

import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class Login extends Component{

	constructor(props){
		super(props)

		this.state = {
			name: '',
			password: '',
			err_name: null,
			err_password: null
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	dialogActions = [
		<RaisedButton
        label='Try Again'
        primary={true}
        onTouchTap={ ()=> {window.location.reload()} } //refresh page
     />
	];

	handleTextChange = (inputElement, e)=>{
		let newState = Object.assign({}, this.state);

		//update Error text fields (remove errorText when user enters a value)
		let errTextField = `err_${inputElement}`;

		if(e.target.value && newState[errTextField] !== null){
			newState[errTextField] = null;
		}

		newState[inputElement] = e.target.value;
		this.setState(newState);
	}

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

		const {name, password} = this.state;

		let requiredFields = {
			name: name,
			password: password
		}

		let emptyFields = this.checkIfEmpty(requiredFields);

		if( Object.keys(emptyFields).length > 0){
			console.log('Error', emptyFields);
			const newState = Object.assign({}, this.state);

			for(let keys in emptyFields){
				
				//TO DO ADD ERROR TEXT
				var errField = `err_${keys}` 
				newState[errField] = 'This is a required field.'
				
			}
			this.setState(newState);
			return false;
		}

		console.log('Submitted', this.state)
		this.props.actions.loginUser({
			name: this.state.name,
			password: this.state.password
		});
	}

	render(){

		if(this.props.currentUser.error){
			console.log('errors!', this.props.currentUser)
			return(
				<Dialog
					title='Oops!'
					open={true}
					actions={this.dialogActions}
				>
					{this.props.currentUser.error}
				</Dialog>
			)
		}

		else if(this.props.currentUser.loading){

			console.log('this.props.currentUser.loading', this.props.currentUser)
			return(
				<div className="spinner-holder">
        	<LinearProgress mode='indeterminate' />
        	<h2>Logging in...</h2>
      	</div>
			)
		}

		else{
			return(

				<form onSubmit={this.handleSubmit}>
					<div className='row'>
						<div className='col-sm-8 col-sm-offset-2' style={{paddingLeft: 0, paddingRight: 0}}>
							<Card>
								<CardHeader
									title='Login'
								>
								</CardHeader>
								<CardText>
									<TextField
										errorText={this.state.err_name} 
										floatingLabelText='Username'
										value={this.state.name}
										onChange={this.handleTextChange.bind(this, 'name')}
										fullWidth={true}
									>
									</TextField>
									<br/>
									<TextField
										errorText={this.state.err_password}
										floatingLabelText='Password'
										value={this.state.password}
										type='password'
										onChange={this.handleTextChange.bind(this, 'password')}
										fullWidth={true}
									>
									</TextField>

								</CardText>
								<RaisedButton primary={true} label='Login' type='submit' style={{width: 100+ '%'}}></RaisedButton>
							</Card>
						</div>
					</div>
					
				</form>			
			)
		
		}//end else

	}//end render
}

function mapStateToProps(state){
	return {currentUser: state.users.currentUser}
}

function mapDispatchToProps(dispatch){
	return {
		actions:{
			loginUser: bindActionCreators(loginUser, dispatch)
		}
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( Login );