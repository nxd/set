import React from 'react';
import './RandomSet.css';
import FoundCard from '../FoundCard/FoundCard.js';
import GameLogic from '../../utils/GameLogic.js';

class RandomSet extends React.Component {

	renderRandomSet() {
		// extract random set from props
		let randomSet = this.props.setData;

		// if set is not null, render the cards
		if(randomSet){
			// order random set by number
			randomSet = randomSet.cardNums.sort(function(a, b){return a-b});

			let renderedSet = randomSet.map(cardNum => {
				return <FoundCard value={cardNum}/>
			});

			renderedSet = <div className='random-set card-set'>{renderedSet}</div>

			return renderedSet;
		} else {
			return null;
		}
		
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