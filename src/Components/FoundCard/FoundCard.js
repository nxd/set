import React from 'react';
import './FoundCard.css';
import Shape from '../Shape/Shape.js';
import GameLogic from '../../utils/GameLogic.js';

class FoundCard extends React.Component {

	getShapes() {
		if(this.props.value){
			let shapeList = []
			let dims = GameLogic.calcCardDim(this.props.value)
			for(var i=0; i<=dims[0]; i++) {
				shapeList.push(<Shape cardDim={dims} />)
			}

			return shapeList;
		} else {
			return 
		}
		

		
	}	

	render(){

		let status = this.props.empty ? 'empty' : 'found';

		return (
			<div className={`foundCard ${status}`}>
				{this.getShapes()}
			</div>
		)
	}
};

export default FoundCard;