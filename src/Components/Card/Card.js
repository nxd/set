import React from 'react';
import Shape from '../Shape/Shape.js';
import './Card.css';

class Card extends React.Component {
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		this.props.onCardSelect(this.props.cardData.number);
	}

	getShapes() {
		let shapeList = []
		for(var i=0; i<=this.props.cardData.dims[0]; i++) {
			shapeList.push(<Shape cardDim={this.props.cardData.dims} />)
		}

		return shapeList;
	}

	render(){
		// set card status for styling
		var status
		if(this.props.gamePaused){
			status = 'paused';
		}
		else if(this.props.cardData.success){
			status = 'success';
		} else if(this.props.cardData.fail){
			status = 'fail';
		} else if(this.props.cardData.active){
			status = 'active';
		}else{
			status = 'inactive';
		}

		return (
			<div 
				className={`card ${status}`} 
				onClick={this.handleClick}
			>
				{this.getShapes()}
			</div>
		)
	}
};

export default Card;