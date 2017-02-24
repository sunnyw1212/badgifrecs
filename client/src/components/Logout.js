import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {logout} from '../actions/';

import {browserHistory} from 'react-router';




class Logout extends Component {
  
  constructor(props) {
    super(props);
  }

	componentWillMount(){
		this.props.actions.logout();
		browserHistory.push('/');
	}


  render() {
    return null;
  }//end render




}//end class Logout

function mapDispatchToProps(dispatch){
	return {
		actions:{
			logout: bindActionCreators(logout, dispatch)
		} 
	}
}

export default connect(null, mapDispatchToProps)(Logout)