import React from 'react';
import './Endgame.css';


class Endgame extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			endDisplayStatus: null
		}

		this.hideEndgame = this.hideEndgame.bind(this);
	}

	hideEndgame() {
		this.setState({
			endDisplayStatus: 'endgame-hidden'
		})
	}

	renderEndMessage() {

		let nSets = this.props.nSets;
		let msg = `You found all ${nSets} SETs`

		if(this.props.showTimer) {
			msg = msg.concat(` in ${this.props.gameTime}!`)
		} else {
			msg = msg.concat('!')
		}

		return msg;
	}

	renderEndgame(){
		var newGameButtonSrc = process.env.PUBLIC_URL + 'icons/icon_refresh.png';

		if(this.props.showEnd){
			return(
				<div className={`end-container ${this.state.endDisplayStatus}`}>
						<div className='end-header'>
							<div className='exit-end-btn' onClick={this.hideEndgame}>&#10005;</div>
						</div>
						<div className='end-content'>
							<p>Congratulations!</p>
							<p>{this.renderEndMessage()}</p>
							<p>Play again?</p>
							<div className='end-newgame-btn' onClick={this.props.newGame}>
								<img src={newGameButtonSrc}/>
							</div>
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