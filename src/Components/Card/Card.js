import React from 'react';
import Shape from '../Shape/Shape.js';
import './Card.css';

class Card extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			status: 'inactive'
		}

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		var newStatus = (this.state.status === 'active') ? 'inactive': 'active';
		// let cardNum = e.target.cardNum
		// console.log(e.target)
		this.props.onCardSelect(this.props.cardData.number);
		this.setState({status:newStatus});
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
			<div className={`card ${status}`} onClick={this.handleClick} cardNum={this.props.value}>
			        {this.getShapes()}
				
			</div>
		)
	}
};

export default Card;