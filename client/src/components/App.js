import React, { Component } from 'react';
//import logo from '../../images/logo.svg';
import '../styles/App.scss';
import Nav from './Nav';


class App extends Component {
  
  

  render() {
    return (
      <div className='app-container'>
 
            <Nav/>
            
        
            <div className='content-container container'>
              {this.props.children}
            </div>
        
      </div>
    );
  }
}

export default App;
