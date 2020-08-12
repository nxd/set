import React from 'react';
import Card from '../Card/Card.js';
import './Board.css';



class Board extends React.Component {

	render(){
		return (
			<div className='gameBoard'>
				
				{this.props.cardDataList.map((cardData) => (
					<Card 
						gamePaused={this.props.gameState.paused}
						cardData={cardData}
						onCardSelect={this.props.onCardSelect}
					/>
			    ))}

			</div>
		)
	}
};

export default Board;