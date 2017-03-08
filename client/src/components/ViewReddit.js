import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import classnames from 'classnames';

import {getRedditPost, getRedditPosts} from '../actions/';

import LinearProgress from 'material-ui/LinearProgress';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import ActionLaunch from 'material-ui/svg-icons/action/launch';

import {StickyContainer, Sticky} from 'react-sticky';

import '../styles/ViewReddit.scss';

class ViewReddit extends Component{


	constructor(props){
		super(props)
		this.state = {
			open: false,
			imgLoaded: false
		};
		this.handleNextRecipe = this.handleNextRecipe.bind(this);
		
	}

	componentWillMount(){
		console.log('Thisis the props in view reddit ', this.props.redditSingle)
		
		let currentUrl = window.location.href
		let redditPostId = currentUrl.split('/').pop(); 
		this.props.actions.getRedditPost(redditPostId)
		this.props.actions.getRedditPosts();
	}

	componentWillReceiveProps(nextProps){
		if(this.props.location.pathname !== nextProps.location.pathname){
			console.log(this.props.location.pathname, ' and next is', nextProps.location.pathname)
			let currentUrl = window.location.href
			let recipePostId = currentUrl.split('/').pop(); 
			this.props.actions.getRedditPost(recipePostId);
			this.props.actions.getRedditPosts();
			
		}
		
	}

	handleToggle = () => {
		let newState = Object.assign({}, this.state );
		newState['open'] = !this.state.open; 
		this.setState(newState);
	};

	handleImgLoaded = () => {
		let newState = Object.assign({}, this.state );
		newState['imgLoaded'] = true; 
		this.setState(newState);
	}

	handleImgLoadFailed = (backupLinkUrl, thumbnail, title)=>{
		
		let a = document.createElement('a');
		a.setAttribute('href', backupLinkUrl);
		
		let img = document.createElement('img')
		img.setAttribute('src', thumbnail)
		img.setAttribute('alt', title)
		img.className = 'cardmedia__backupimg'
		
		a.append(img)

		document.getElementById('backup').append(a)

		// let iframe = document.createElement('iframe');
		// iframe.setAttribute('src', backupLinkUrl)
		// iframe.className = 'cardmedia__backupimg'
		// document.getElementById('backup').append(iframe)
		
		let newState = Object.assign({}, this.state );
		newState['imgLoaded'] = false; 
		this.setState(newState);		
		
	}

	handleNextRecipe = () =>{
		let {posts} = this.props.redditAll;
		let currentUrl = window.location.href
		let redditPostId = currentUrl.split('/').pop(); 
		
		//only return posts with actual gif sources
		let gifs = posts.filter((post, index, array )=>{
			if(post.data.preview && post.data.preview.images[0] && post.data.preview.images[0].variants && post.data.preview.images[0].variants.gif && post.data.preview.images[0].variants.gif.source){
				return post
			}
			return null;
		});
		console.log('GIFS', gifs)
		//get current post's index in gifs array
		var currentGifIndex = gifs.map((gif)=>{
			return gif.data.id
		}).indexOf(redditPostId);
		

		//get next recipe id 
		let nextRecipeId = gifs[currentGifIndex + 1] ? gifs[currentGifIndex + 1].data.id : gifs[0].data.id

		
		console.log('heres the next page', nextRecipeId)


		browserHistory.push(`/viewreddit/${nextRecipeId}`);
		
		this.props.actions.getRedditPost(nextRecipeId)
		this.props.actions.getRedditPosts();
		// window.location.href = 'localhost:3001' + nextRecipeId;
		// window.location.reload()

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

	

	renderRedditPostComments(){
		let comments = this.props.redditSingle.post[1].data.children;
		return comments.map((comment, index, array)=>{
			// console.log('heres the cmmnet', comment.data.body)
			return(
				
				<div key={index}>
					<ListItem
						secondaryText={`u/${comment.data.author}`}
						primaryText={comment.data.body}
					>	
						
					</ListItem>
					<Divider></Divider>

				</div>
			)
			
		});//end map
	}//end func renderRedditPostComments

	renderNextRecipeBtn(){
		if(!this.props.redditAll || !this.props.redditAll.posts || this.props.redditAll.loading || this.props.redditAll.error){
			return null
		}

		else{
			// let {posts} = this.props.redditAll;
			// let currentUrl = window.location.href
			// let redditPostId = currentUrl.split('/').pop(); 
			
			// //only return posts with actual gif sources
			// let gifs = posts.filter((post, index, array )=>{
			// 	if(post.data.preview && post.data.preview.images[0] && post.data.preview.images[0].variants && post.data.preview.images[0].variants.gif && post.data.preview.images[0].variants.gif.source){
			// 		return post
			// 	}
			// 	return null;
			// });
			// console.log('GIFS', gifs)
			// //get current post's index in gifs array
			// var currentGifIndex = gifs.map((gif)=>{
			// 	return gif.data.id
			// }).indexOf(redditPostId);
			
			
			// //get next recipe id 
			// let nextRecipe = gifs[currentGifIndex + 1] ? gifs[currentGifIndex + 1].data : gifs[0].data

			// //preload next recipe img gif
			// let preloadImg = new Image();
			// preloadImg.src = nextRecipe.preview.images[0].variants.gif.source.url;
			return(
				<RaisedButton
					label='Next Recipe'
					className='__nextrecipebtn'
					primary={true}
					onClick={this.handleNextRecipe}
		    >	
		    </RaisedButton>
			)
		}
	}

	render(){
		let gifImgClass = classnames({
			'--height100': true,
			'hidden': !this.state.imgLoaded
		});

		let backupClass = classnames({
			'hidden': this.state.imgLoaded
		});

		let loadingTextClass = classnames({
			'--unavailable': true,
			'hidden': this.state.imgLoaded
		})

    //if error
		if(this.props.redditSingle.error){
			console.log('errors!', this.props.redditSingle)
			return(
				<Dialog
					title='Oops!'
					open={!this.state.open}
					actions={this.dialogActions}
					onRequestClose={this.handleToggle}
				>
					<p>{this.props.redditSingle.error}</p>
				
				</Dialog>
			)
		}

		//if loading
		else if (!this.props.redditSingle || !this.props.redditSingle.post || this.props.redditSingle.loading) {

    	console.log('Loading... curent state:',this.props)
      return (
        <div className="spinner-holder">
          <LinearProgress mode='indeterminate' />
        </div>
      )

    }

		
		//if success
		else{
			let backupLinkUrl = this.props.redditSingle.post[0].data.children[0].data.url
			let { url } = this.props.redditSingle.post[0].data.children[0].data.preview.images[0].variants.gif.source;
			let { title, author, thumbnail } = this.props.redditSingle.post[0].data.children[0].data;
			

			console.log('this the new props in viewReddit', this.props)
			return(
				<div className='row'>
					<StickyContainer>
						<div className='col-sm-6 col-sm-offset-1 --padlr0'>
							<Card>
								<Sticky>
									<Card>
										<CardMedia className='cardmedia__imgcontainer'>
											<span className={loadingTextClass}>Loading...</span>
											<div id='backup' className={backupClass}>
												<ActionLaunch className='backup__icon' onClick={()=>{window.location.href = backupLinkUrl}}></ActionLaunch>
												
											</div>
								      <img id='gifImg' src={ url } onLoad={this.handleImgLoaded} onError={this.handleImgLoadFailed.bind( this, backupLinkUrl, thumbnail, title)} className={gifImgClass} alt={title}/>
								    </CardMedia>
									</Card>
								</Sticky>
							</Card>	
							<Card>
								<CardHeader 
						    	title={title}
						    	subtitle={`Posted By u/${author}`}
									children={this.renderNextRecipeBtn()}
						    >
						    
						    </CardHeader>
						   
							</Card>
						</div>
						<div className='col-sm-4 --padlr0'>
							<div className='viewtext__container'>
								<Card>
									<CardTitle
										title='Comments'
									>
										
										
									</CardTitle>
									
									<CardText
										
									>
										<List>
											{this.renderRedditPostComments()}
										</List>
										
									</CardText>
								
								</Card>
							</div>
						</div>
					</StickyContainer>
					
					
				</div>

				
				


			)//end return 
		}
		
		
	}//end render
}

function mapStateToProps(state){
	return{
		currentUser: state.users.currentUser,
		redditSingle: state.recipeposts.redditSingle,
		redditAll: state.recipeposts.redditAll
	}
}

function mapDispatchToProps(dispatch){
	return {
		actions: {
			getRedditPost: bindActionCreators( getRedditPost, dispatch),
			getRedditPosts: bindActionCreators( getRedditPosts, dispatch)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewReddit);