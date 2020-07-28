import React from 'react';
import './Endgame.css';


class Endgame extends React.Component {

	renderEndgame(){
		if(this.props.showEnd){
			return(
				<div className='help-container'>
						<div className='help-header'>
							<div className='exit-help-btn help-header-spacer'></div>
							<div className='help-title'><h3>end of game</h3></div>
							<div className='exit-help-btn'>&#10005;</div>
						</div>
				</div>
			);
		} else {
			return(null)
		}
	}

	render(){
		return(
			this.renderEndgame()
		);
	}
};

export default Endgame;