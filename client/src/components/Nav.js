import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Link, browserHistory} from 'react-router';

import { white } from 'material-ui/styles/colors';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';



import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import SocialPersonOutline from 'material-ui/svg-icons/social/person-outline';

import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import Headroom from 'react-headroom';

import '../styles/Nav.scss';


class Nav extends Component{

	constructor(props){
		super(props);
		this.state = {open: false};
	}
	
	goToHome = () => browserHistory.push('/');
	
	handleToggle = () => {
		let newState = Object.assign({}, this.state );
		newState['open'] = !this.state.open; 
		this.setState(newState);
	};

	renderDrawer(){
		if(this.props.currentUser.user){
			return(
				<Drawer
					docked={false}
          open={this.state.open}
          onRequestChange={this.handleToggle}
					
				>
					<MenuItem onClick={this.handleToggle} className='text-right'>
						<IconButton>
							<NavigationClose></NavigationClose>
						</IconButton>
					</MenuItem>
					<Link to='/' onClick={this.handleToggle}>
						<MenuItem primaryText='Home' leftIcon={<ActionHome/>}>
							
						</MenuItem>
					</Link>
					<Link to='/upload' onClick={this.handleToggle}>
						<MenuItem primaryText='Upload' leftIcon={<FileUpload/>}>
							
						</MenuItem>
					</Link>
					<Link to='/logout' onClick={this.handleToggle}>
						<MenuItem primaryText='Logout' leftIcon={<SocialPersonOutline/>}>
							
						</MenuItem>
					</Link>

				</Drawer>
			)
			
		}
		else{
			return(

				<Drawer
					docked={false}
          open={this.state.open}
          onRequestChange={this.handleToggle}
				>
					<MenuItem onClick={this.handleToggle} className='text-right'>
						<IconButton>
							<NavigationClose></NavigationClose>
						</IconButton>
					</MenuItem>
					<Link to='/' onClick={this.handleToggle}>
						<MenuItem primaryText='Home' leftIcon={<ActionHome/>}>
							
						</MenuItem>
					</Link>
					<Link to='/upload' onClick={this.handleToggle}>
						<MenuItem primaryText='Upload' leftIcon={<FileUpload/>}>
						
						</MenuItem>
					</Link>
					<Link to='/register' onClick={this.handleToggle}>
						<MenuItem primaryText='Register' leftIcon={<SocialPersonAdd/>}>
							
						</MenuItem>
					</Link>
					<Link to='/login' onClick={this.handleToggle}>
						<MenuItem primaryText='Login' leftIcon={<ActionAccountBox/>}>
							
						</MenuItem>
					</Link>

				</Drawer>

			)//end return
		}//end else
	}//end func renderDrawer

	renderToolbar(){
		if(this.props.currentUser.user){
			return(
				<Toolbar className='hidden-sm hidden-md hidden-lg hidden-xl toolbar__container'>
					<ToolbarGroup firstChild={true}>
						<IconButton iconStyle={{color: white}} touch={true}>
							<NavigationArrowBack onClick={browserHistory.goBack}></NavigationArrowBack>
							
						</IconButton>
					</ToolbarGroup>
					<ToolbarGroup className='toolbar__toolbargroup'>
						<Link to='/' className='toolbar__link'>
							<IconButton iconStyle={{color: white}} touch={true}>
								<ActionHome></ActionHome>
							</IconButton>
							<span className='toolbar__label'>Home</span>
						</Link>
						<Link to='/upload' className='toolbar__link'>
							<IconButton iconStyle={{color: white}} touch={true}>
								<FileUpload></FileUpload>
							</IconButton>
							<span className='toolbar__label'>Upload</span>
						</Link>
						<Link to='/logout' className='toolbar__link'>
							<IconButton iconStyle={{color: white}} touch={true}>
								<SocialPersonOutline></SocialPersonOutline>
							</IconButton>
							<span className='toolbar__label'>Logout</span>
						</Link>
						
						
					</ToolbarGroup>
				</Toolbar>
			)
		}
		else{
			return(
				<Toolbar className='hidden-sm hidden-md hidden-lg hidden-xl toolbar__container'>
					<ToolbarGroup firstChild={true}>
						<IconButton iconStyle={{color: white}} touch={true}>
							<NavigationArrowBack onClick={browserHistory.goBack}></NavigationArrowBack>
							
						</IconButton>
					</ToolbarGroup>
					<ToolbarGroup className='toolbar__toolbargroup'>
						<Link to='/' className='toolbar__link'>
							<IconButton iconStyle={{color: white}} touch={true}>
								<ActionHome></ActionHome>
							</IconButton>
							<span className='toolbar__label'>Home</span>
						</Link>
						<Link to='/upload' className='toolbar__link'>
							<IconButton iconStyle={{color: white}} touch={true}>
								<FileUpload></FileUpload>
							</IconButton>
							<span className='toolbar__label'>Upload</span>
						</Link>
						<Link to='/register' className='toolbar__link'>
							<IconButton iconStyle={{color: white}} touch={true}>
								<SocialPersonAdd></SocialPersonAdd>
							</IconButton>
							<span className='toolbar__label'>Register</span>
						</Link>
						<Link to='/login' className='toolbar__link'>
							<IconButton iconStyle={{color: white}} touch={true}>
								<ActionAccountBox></ActionAccountBox>
							</IconButton>
							<span className='toolbar__label'>Login</span>
						</Link>
						
					</ToolbarGroup>
				</Toolbar>
			)
		}
	}

	render(){
		return(
			<div>
				
				<AppBar
					title={<span className='appbar__logo'>BadGifRecipes</span>}
					onTitleTouchTap={this.goToHome}
					onLeftIconButtonTouchTap={this.handleToggle}
					children={ this.props.currentUser.user ? <p className='appbar__loggedinp'>Logged in as {this.props.currentUser.user.name}</p> : null}
					className='hidden-xs'
				/>
				<Headroom>
					{this.renderToolbar()}
				</Headroom>

				{this.renderDrawer()}
			</div>
			
			

		)
	}//end render
}

function mapStateToProps(state){
	return {
		currentUser: state.users.currentUser
	}
}


export default connect(mapStateToProps)(Nav);











