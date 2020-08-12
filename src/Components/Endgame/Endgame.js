import React from 'react';
import './Endgame.css';

import GameLogic from '../../utils/GameLogic.js';


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
		// return end-status div depending on whether
		// user was successful or if they quit the game
		if(this.props.userQuit){
			let endStatus = (
				<div className='end-status'>
					<p><b>You failed!</b></p>
					<p>Better luck next time. You can do it!</p>
				</div>
			)

			return endStatus;

		} else {
			let nSets = this.props.nSets;
			let msg = `You found all ${nSets} SETs`

			if(this.props.showTimer) {
				msg = msg.concat(` in ${GameLogic.timeStringFromMs(this.props.gameTime)}!`)
			} else {
				msg = msg.concat('!')
			}

			let endStatus = (
				<div className='end-status'>
					<p><b>Congratulations!</b></p>
					<p>{msg}</p>
				</div>
			)

			return endStatus;
		}

		
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
						<div className='end-status'>
							{this.renderEndMessage()}
						</div>
						<div className='end-replay'>
							<p>Play again?</p>
							<div className='end-newgame-btn' onClick={this.props.newGame}>
								<img src={newGameButtonSrc}/>
							</div>
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