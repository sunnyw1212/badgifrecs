import React from 'react';
import Leader from './Leader.js'

const Leaders = (props) => {
	
	const renderLeaders = props.leaders.map( ( leader, i ) =>{
			console.log({leader})
			return <Leader key={i} leaderinfo={leader} number={i + 1}/>
		});

	return (
		
		<table className="table table-striped">
			<thead>
				<tr>
					<th>#</th>
					<th>Leader Name</th>
					<th>Points In The Last 30 Days</th>
					<th>All Time Points</th>
				</tr>
			</thead>
			<tbody>
				{renderLeaders}
			</tbody>
		</table>


	)
}

export default Leaders;