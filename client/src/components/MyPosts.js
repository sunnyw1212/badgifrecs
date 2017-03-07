import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import { getRecipePosts, deleteRecipePost } from '../actions/'; //Get USER recipe posts

import LinearProgress from 'material-ui/LinearProgress';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List'

import IconButton from 'material-ui/IconButton';

import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import '../styles/MyPosts.scss';


class MyPosts extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			open: false
		};
	}

	componentWillMount(){
																			//id  	//user name
		this.props.actions.getRecipePosts(null, this.props.currentUser.user.name);
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

	iconButtonElement = (
	  <IconButton
	    touch={true}
	    tooltip="more"
	    tooltipPosition="bottom-left"
	  >
	    <NavigationMoreVert />
	  </IconButton>
	);

	handleDeleteRecipePost = (id)=>{
		this.props.actions.deleteRecipePost(id);
	}
	
	renderMyRecipePosts() {
		
    //if error
    if( this.props.originalMyRecipePosts.error){
    	
    	console.log('errors!', this.props.originalMyRecipePosts)
			return(
				<Dialog
					title='Oops!'
					open={!this.state.open}
					actions={this.dialogActions}
					onRequestClose={this.handleToggle}
				>
					<p>{this.props.originalMyRecipePosts.error}</p>
				
				</Dialog>
			)
    }

    //if loading..
    if (!this.props.originalMyRecipePosts || !this.props.originalMyRecipePosts.posts ||this.props.originalMyRecipePosts.loading) {

    	
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
	    return this.props.originalMyRecipePosts.posts.map((post, index) => {
	    	// let img = post.recipe_thumb;
	    	// let imgpath;
	    	// console.log('IMG', img, 'post', post)
	    	// if(img){
	    	// 	imgpath = '/' + img.split('/').slice(2).join('/')
	    	// }
	    	// console.log('imgpath', imgpath)
	      return (

				
					<ListItem
						key={post._id}
						innerDivStyle={{paddingLeft: 85}}
						primaryText={<Link to={`/view/${post._id}`}>{post.recipe_title}</Link>}
						secondaryText={`Posted ${new Date(post.timestamp).toLocaleDateString()}`}
						leftIcon={
							<Link key={post._id} to={`/view/${post._id}`} className='postlist__thumbnailcontainer'>
								<img className='postlist__thumbnail' src={post.recipe_thumb} alt={post.recipe_title}/>
							</Link>
						}
						
						
					>
						<div className='postlist__btncontainer'>
							<Link key={post._id} to={`/editrecipe/${post._id}`} >
								<IconButton tooltip='Edit' touch={true} iconStyle={{color: 'rgb(117,117,117)'}}>
									<EditorModeEdit/>
								</IconButton>
					    </Link>
					    <IconButton tooltip='Delete' onTouchTap={this.handleDeleteRecipePost.bind(this, post._id)} touch={true} iconStyle={{color: 'rgb(117,117,117)'}}>
					    	<ActionDelete/>
					    </IconButton>
						</div>
								
						    
					</ListItem>
					
					
					

	      	
	        
	      )
	    });
    }

   
  }//end renderMyRecipePosts func


	render(){
		return(
			<div>
				<List className='row'>
					<div className="col-sm-6 col-sm-offset-3 --padlr0">
						<Subheader>My Posts</Subheader>
						<Divider className='--marb16'></Divider>
						<div className='postlist__container'>
							{this.renderMyRecipePosts()}
						</div>
						
					</div>
					

				</List>
			</div>
			
		)
	}
}

function mapStateToProps( state ){
	return {
		currentUser: state.users.currentUser,
		originalMyRecipePosts: state.recipeposts.originalMyRecipePosts
	}

}

function mapDispatchToProps( dispatch ){
	return {
		actions: {
			getRecipePosts: bindActionCreators(getRecipePosts, dispatch),
			deleteRecipePost: bindActionCreators( deleteRecipePost, dispatch)
		}
	}
	//return bindActionCreators( {getRecipePosts: getRecipePosts}, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )(MyPosts);