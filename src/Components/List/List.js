import React from 'react';
import FoundCard from '../FoundCard/FoundCard.js';
import './List.css'


class List extends React.Component {

	renderFoundSets() {
		let foundSets = this.props.foundSets;
		var rowsFound = [];

		for (var j = 0; j < foundSets.length; j++){
			let foundSet = foundSets[j]

			let renderedSet = foundSet.map(cardNum => {
				return <FoundCard value={cardNum}/>
			});

			renderedSet = <div className='foundSet card-set'>{renderedSet}</div>

			rowsFound.push(renderedSet);
		}

		return rowsFound;
	}

	renderRemainingSets() {

		const nRemaining = this.props.nSets - this.props.foundSets.length
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
			<div className='setList'>
				<h3 className='found-status'>{this.props.foundSets.length} of {this.props.nSets} SETs found</h3>

				{this.renderFoundSets()}
				{this.renderRemainingSets()}

			</div>
		)
	}
};

export default List;

				