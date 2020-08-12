import React from 'react';
import FoundCard from '../FoundCard/FoundCard.js';
import './List.css'


class List extends React.Component {

	isPregame() {
		// this method returns an additional classname
		// to hide the SETs found text if in pregame state
		if(this.props.gameState.pregame){
			return 'status-hidden';
		}
	}

	renderFoundSets() {
		let foundSets = this.props.foundSets;
		var rowsFound = [];

		for (var j = 0; j < foundSets.length; j++){
			let foundSet = foundSets[j].sort(function(a, b){return a-b});

			let renderedSet = foundSet.map(cardNum => {
				return <FoundCard value={cardNum}/>
			});

			renderedSet = <div className='foundSet card-set'>{renderedSet}</div>

			rowsFound.push(renderedSet);
		}

		return rowsFound;
	}

	renderQuitSets() {
		let quitSets = this.props.quitSets;
		var rowsQuit = [];

		for (var j = 0; j < quitSets.length; j++){
			let quitSet = quitSets[j].sort(function(a, b){return a-b});

			let renderedSet = quitSet.map(cardNum => {
				return <FoundCard value={cardNum} quit={true}/>
			});

			renderedSet = <div className='foundSet card-set'>{renderedSet}</div>

			rowsQuit.push(renderedSet);
		}

		return rowsQuit;
	}

	renderRemainingSets() {

		const nRemaining = this.props.nSets - this.props.foundSets.length - this.props.quitSets.length
		var rowsRemaining = [];

		const emptyRow = (
			<div className='remainingSet card-set'>
				<FoundCard empty={true}/>
				<FoundCard empty={true}/>
				<FoundCard empty={true}/>
			</div>
		);

		for (var i = 0; i < nRemaining; i++){
			rowsRemaining.push(emptyRow)
		}

		return rowsRemaining;
	}

	render(){
		return (
			<div className={`setList ${this.isPregame()}`}>
				<h3 className={`found-status ${this.isPregame()}`}>{this.props.foundSets.length} of {this.props.nSets} SETs found</h3>

				{this.renderFoundSets()}
				{this.renderRemainingSets()}
				{this.renderQuitSets()}

			</div>
		)
	}
};

export default List;

				