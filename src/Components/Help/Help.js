import React from 'react';
import './Help.css';


class Help extends React.Component {

	renderHelpWindow(){
		if(this.props.showHelp){
			return(
				<div className='help-container'>
					<h3>How to play SET</h3>
					<div className='exit-help-btn' onClick={this.props.toggleHelp}>x</div>
				</div>
			)
		} else {
			return (null);
		};
	}



	render(){
		return(this.renderHelpWindow());
	}
};

export default Help;