import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Link, browserHistory} from 'react-router';

import { cyan500, cyan700, pinkA200, grey100, grey300, grey400, grey500, white, darkBlack, fullBlack,} from 'material-ui/styles/colors';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';



import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import SocialPersonOutline from 'material-ui/svg-icons/social/person-outline';

import Headroom from 'react-headroom';


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
				<Toolbar className='hidden-sm hidden-md hidden-lg hidden-xl' style={{display: 'block', backgroundColor: pinkA200, boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px' }}>
					<ToolbarGroup style={{alignContent: 'space-between'}}>
						<Link to='/' style={{position: 'relative'}}>
							<IconButton iconStyle={{color: white}} touch={true}>
								<ActionHome></ActionHome>
							</IconButton>
							<span style={{position:'absolute', bottom:0, left:8, fontSize:12, color: white}}>Home</span>
						</Link>
						<Link to='/upload' style={{position: 'relative'}}>
							<IconButton iconStyle={{color: white}} touch={true}>
								<FileUpload></FileUpload>
							</IconButton>
							<span style={{position:'absolute', bottom:0, left:5, fontSize:12, color: white}}>Upload</span>
						</Link>
						<Link to='/logout' style={{position: 'relative'}}>
							<IconButton iconStyle={{color: white}} touch={true}>
								<SocialPersonOutline></SocialPersonOutline>
							</IconButton>
							<span style={{position:'absolute', bottom:0, left:5, fontSize:12, color: white}}>Logout</span>
						</Link>
						
						
					</ToolbarGroup>
				</Toolbar>
			)
		}
		else{
			return(
				<Toolbar className='hidden-sm hidden-md hidden-lg hidden-xl' style={{display: 'block' , backgroundColor: pinkA200, boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px' }}>
					<ToolbarGroup style={{alignContent: 'space-between'}}>
						<Link to='/' style={{position: 'relative'}}>
							<IconButton iconStyle={{color: white}} touch={true}>
								<ActionHome></ActionHome>
							</IconButton>
							<span style={{position:'absolute', bottom:0, left:8, fontSize:12, color: white}}>Home</span>
						</Link>
						<Link to='/upload' style={{position: 'relative'}}>
							<IconButton iconStyle={{color: white}} touch={true}>
								<FileUpload></FileUpload>
							</IconButton>
							<span style={{position:'absolute', bottom:0, left:5, fontSize:12, color: white}}>Upload</span>
						</Link>
						<Link to='/register' style={{position: 'relative'}}>
							<IconButton iconStyle={{color: white}} touch={true}>
								<SocialPersonAdd></SocialPersonAdd>
							</IconButton>
							<span style={{position:'absolute', bottom:0, left:5, fontSize:12, color: white}}>Register</span>
						</Link>
						<Link to='/login' style={{position: 'relative'}}>
							<IconButton iconStyle={{color: white}} touch={true}>
								<ActionAccountBox></ActionAccountBox>
							</IconButton>
							<span style={{position:'absolute', bottom:0, left:5, fontSize:12, color: white}}>Login</span>
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
					title={<span className='nav__logo'>BadGifRecipes</span>}
					onTitleTouchTap={this.goToHome}
					onLeftIconButtonTouchTap={this.handleToggle}
					children={ this.props.currentUser.user ? <p>Logged in as {this.props.currentUser.user.name}</p> : null}
					style={{boxShadow: 0}}
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











