import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Link, browserHistory} from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import NavigationClose from 'material-ui/svg-icons/navigation/close';


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
						<MenuItem>
							Explore
						</MenuItem>
					</Link>
					<Link to='/upload' onClick={this.handleToggle}>
						<MenuItem>
							Upload
						</MenuItem>
					</Link>
					<Link to='/logout' onClick={this.handleToggle}>
						<MenuItem>
							Logout
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
						<MenuItem>
							Explore
						</MenuItem>
					</Link>
					<Link to='/upload' onClick={this.handleToggle}>
						<MenuItem>
							Upload
						</MenuItem>
					</Link>
					<Link to='/register' onClick={this.handleToggle}>
						<MenuItem>
							Register
						</MenuItem>
					</Link>
					<Link to='/login' onClick={this.handleToggle}>
						<MenuItem>
							Login
						</MenuItem>
					</Link>

				</Drawer>

			)//end return
		}//end else
	}//end func renderDrawer

	render(){
		return(
			<div>
				<AppBar
					title={<span className='nav__logo'>BadGifRecipes</span>}
					onTitleTouchTap={this.goToHome}
					onLeftIconButtonTouchTap={this.handleToggle}
					children={ this.props.currentUser.user ? <p>Logged in as {this.props.currentUser.user.name}</p> : null}
				/>
				
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











