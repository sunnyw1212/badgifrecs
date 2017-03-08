import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import { getRecipePosts, getRedditPosts } from '../actions/';

import LinearProgress from 'material-ui/LinearProgress';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';

import '../styles/PhotoGrid.scss';


class PhotoGrid extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			open: false
		};
	}

	componentWillMount(){
		this.props.actions.getRecipePosts();
		this.props.actions.getRedditPosts();
	}

	handleToggle = () => {
		let newState = Object.assign({}, this.state );
		newState['open'] = !this.state.open; 
		this.setState(newState);
	};

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
	
	renderOriginalPosts() {
		
    //if error
    if( this.props.originalAll.error){
    	
    	console.log('errors!', this.props.originalAll)
			return(
				<Dialog
					title='Oops!'
					open={!this.state.open}
					actions={this.dialogActions}
					onRequestClose={this.handleToggle}
				>
					<p>{this.props.originalAll.error}</p>
				
				</Dialog>
			)
    }

    //if loading..
    if (!this.props.originalAll || !this.props.originalAll.posts ||this.props.originalAll.loading) {

    	
    	console.log('Loading... curent state:',this.props)
      return (
        <div className="spinner-holder">
          <LinearProgress mode='indeterminate' />
        </div>
      )
    

    	
    }
    //loaded posts successfully
    else{
    	console.log('Loaded! curent state:',this.props)
	    return this.props.originalAll.posts.map((post, index) => {
	    	// let img = post.recipe_thumb;
	    	// let imgpath;
	    	// console.log('IMG', img, 'post', post)
	    	// if(img){
	    	// 	imgpath = '/' + img.split('/').slice(2).join('/')
	    	// }
	    	// console.log('imgpath', imgpath)
	      return (
					<Link key={post._id} to={`/view/${post._id}`}>
						<ListItem
							innerDivStyle={{paddingLeft: 85}}
							primaryText={post.recipe_title}
							secondaryText={`Posted By ${post.user.name}`}
							leftIcon={<img className='postlist__thumbnail' src={post.recipe_thumb} alt={post.recipe_title}/>}
							
						>
							
						</ListItem>
					</Link>
					
					

	      	
	        
	      )
	    });
    }

   
  }//end renderOriginalPosts func

  renderRedditPosts(){
  	//if loading..
    if ( !this.props.redditAll || this.props.redditAll === undefined || !this.props.redditAll.posts || this.props.redditAll.loading ) {

    	
    	console.log('Loading... curent state:',this.props)
      return (
        <div className="spinner-holder">
          <LinearProgress mode='indeterminate' />
        </div>
      )
    

    	
    }//end loading if

    //if error
    else if( this.props.redditAll.error){
    	
    	console.log('errors!', this.props.redditAll)
			return(
				<Dialog
					title='Oops!'
					open={!this.state.open}
					actions={this.dialogActions}
					onRequestClose={this.handleToggle}
				>

					<p>{this.props.redditAll.error}</p>
					
				</Dialog>
			)
    }//end error else if
    //successly load redditposts
    else{
			console.log('Loaded RedditPosts! curent state:',this.props)
			
			let {posts} = this.props.redditAll;
			console.log('posts', posts)

			let gifs = posts.filter((post, index, array )=>{
				if(post.data.preview && post.data.preview.images[0] && post.data.preview.images[0].variants && post.data.preview.images[0].variants.gif && post.data.preview.images[0].variants.gif.source){
					return post
				}
				return null;
			});
			console.log('heres th gifs with gif previews', gifs)

			return gifs.map((post, index)=>{
				//preload the first 10 gifs
				// if( index < 5){
				// 	let preloadImg = new Image();
				// 	preloadImg.src = post.data.preview.images[0].variants.gif.source.url;
				// }
				
				return(

					<Link key={post.data.id} to={`/viewreddit/${post.data.id}`}>
						<ListItem
							innerDivStyle={{paddingLeft: 85}} 
							primaryText={post.data.title}
							secondaryText={`Posted By u/${post.data.author}`}
							leftIcon={<img className='postlist__thumbnail' src={post.data.thumbnail} alt='{post.data.title}'/>}
						>
							
						</ListItem>
					</Link>

				)//end gridtile
			})//end gif.map
    }//end else sucess load redit posts


  }

	render(){
		return(
			<div>
				<List className='row'>
					<div className="col-md-6">
						<Subheader> BadGifRecipes Originals</Subheader>
						<Divider className='--marb16'></Divider>
						<div className='postlist__container'>
							{this.renderOriginalPosts()}
						</div>
						
					</div>
					<div className="col-md-6" >
						<Subheader>Courtesy of r/ShittyGifRecipes</Subheader>
						<Divider className='--marb16'></Divider>
						<div className='postlist__container'>
							{this.renderRedditPosts()}
						</div>
						
					</div>

					<div className='hidden-xl hidden-lg hidden-md hidden-sm floatactbtn__container--fixed'>
						<Link to='/upload'>
							<FloatingActionButton mini={true}>
								<FileUpload></FileUpload>
							</FloatingActionButton>
						</Link>
						
					</div>
					

				</List>
			</div>
			
		)
	}
}

function mapStateToProps( state ){
	return {
		currentUser: state.users.currentUser,
		originalAll: state.recipeposts.originalAll,
		redditAll: state.recipeposts.redditAll 
	}

}

function mapDispatchToProps( dispatch ){
	return {
		actions: {
			getRecipePosts: bindActionCreators(getRecipePosts, dispatch),
			getRedditPosts: bindActionCreators(getRedditPosts, dispatch)
		}
	}
	//return bindActionCreators( {getRecipePosts: getRecipePosts}, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )(PhotoGrid);