import React from 'react';
import '../styles/Leader.scss'

const Leader = (props) => {


	return (
		
		<tr className="leader-tr">
			<td>{props.number}</td>
			<td className="text-left">
				<div>
					{props.leaderinfo.url}
				</div>
				<img src='/banner2.jpg' alt="leader profile" className="img leader-prof-img"/>
				
			</td>
			<td>{props.leaderinfo.recipe_imgs}</td>
			<td>{props.leaderinfo.size}</td>
		</tr>
		


	)
}

export default Leader;