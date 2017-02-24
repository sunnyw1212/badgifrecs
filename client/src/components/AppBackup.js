import React, { Component } from 'react';
//import logo from '../../images/logo.svg';
import '../styles/App.scss';
import Nav from './Nav';
import Leaders from './Leaders';
import axios from 'axios';
import gifshot from 'gifshot';


class App extends Component {
  constructor( props ){
    super(props);

    this.state = {
      'allTimeLeaders': [],
      'last30DayLeaders': [],
      'currentView': 'allTimeLeaders'
    };

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e){
    console.log('now change state of App to: ',e.target.value);
    this.setState({
      currentView: e.target.value
    });
  }

  fetchAllTimeLeaders(){
    return axios.get('http://localhost:3000/recipepost');
  }

  fetchlast30DayLeaders(){
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  }
  
  componentWillMount(){
    
    axios.all( [ this.fetchAllTimeLeaders(), this.fetchlast30DayLeaders() ] )
      .then(axios.spread( (allTimeLeaders, last30DayLeaders) => {
        console.log(allTimeLeaders.data)
        
        this.setState({
          allTimeLeaders: allTimeLeaders.data.results,
          last30DayLeaders: last30DayLeaders.data
        });
        

        for(var i = 0; i < this.state.allTimeLeaders.length; i++ ){
          var imggif = [];

          [...this.state.allTimeLeaders[i].recipe_imgs].map(function(curv){
            curv = '/' + curv.split('/').slice(3).join('/');
            console.log(curv)
            imggif.push(curv)
          });
          console.log('asdfsdafsa', imggif)
           gifshot.createGIF({
              'images': imggif
          },function(obj) {
              if(!obj.error) {
                  var image = obj.image,
                  animatedImage = document.createElement('img');
                  animatedImage.src = image;
                  document.body.appendChild(animatedImage);
              }
          });
        }
        
        
      }));




  }

  render() {
    return (
      <div className='app-container'>
            
            <Nav/>

            <div className='header-row'>
              
              
            
              <h4>Currently Showing {this.state.currentView}</h4>
           

              <div className='col-xl-12'>
                <button onClick={this.handleClick} value='allTimeLeaders' className='btn btn-info show-leader-btn'>Show All Time Leaders</button>
                <button onClick={this.handleClick} value='last30DayLeaders' className='btn btn-info show-leader-btn'>Show Last 30 Days Leaders</button>
              </div>
              
            </div>{/* end inner row containing h1 and buttons div */}
            

            <Leaders leaders={this.state[this.state.currentView]}/>
        
            <div className='content-container text-center'>
              {this.props.children}
            </div>
        
      </div>
    );
  }
}

export default App;
