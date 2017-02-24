//helper function to load state from LocalStorage
export function loadState(){
	try{
		const serializedState = localStorage.getItem('state');
		
		if(!serializedState){
			console.log('no serialized state in localStorage')
			return undefined;
		}//end if !serializedState
		
		return JSON.parse(serializedState);
	}//end try()

	catch(err){
		console.log('err in loadState', err);
		return undefined;
	}
}

//helper to save state to LocalStorage
export function saveState(state){
	try{
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	}//end try 
	catch(err){
		console.log('err in saveState to localStorage', err);
	}
}