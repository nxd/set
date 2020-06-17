import React from 'react';
import './Shape.css';
import shapePaths from '../../utils/ShapePaths.js'


const shapeNames = ['diamond', 'oval', 'squiggle'];
const fillNames = ['solid', 'outline', 'stripes'];
const colorNames = ['red', 'green', 'blue'];

class Shape extends React.Component {

	render() {
		let shapeName = shapeNames[this.props.cardDim[1]];
		let fillName = fillNames[this.props.cardDim[2]];
		let colorName = colorNames[this.props.cardDim[3]];

		return (
			<svg version="1.1" x="0px" y="0px" viewBox="0 0 83.061 161.749"
	          className={colorName}>
	        {shapePaths[shapeName][fillName]}   
	        </svg>

		)

	}
};

export default Shape;