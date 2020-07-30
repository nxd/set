import React from 'react';
import './RandomSet.css';
import FoundCard from '../FoundCard/FoundCard.js';
import GameLogic from '../../utils/GameLogic.js';

class RandomSet extends React.Component {

	renderRandomSet() {

		let randomSet = GameLogic.getRandomSet()
		// randomMatchDims should instead be card numb
		
		// order random set by number
		randomSet = randomSet.sort(function(a, b){return a-b});

		let renderedSet = randomSet.map(cardNum => {
			return <FoundCard value={cardNum}/>
		});

		renderedSet = <div className='random-set card-set'>{renderedSet}</div>

		return renderedSet;
	}	

	render() {
		return (
			<div className='random-set-container'>
				
				{this.renderRandomSet()}

			</div>
		)
	}
};

export default RandomSet;