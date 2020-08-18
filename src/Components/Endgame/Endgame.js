import React from 'react';
import './Endgame.css';

import GameLogic from '../../utils/GameLogic.js';


class Endgame extends React.Component {

	renderEndMessage() {
		// return end-status div depending on whether
		// user was successful or if they quit the game
		if(this.props.userQuit){
			let endStatus = (
				<div className='end-status'>
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
					<p>{msg}</p>
				</div>
			)

			return endStatus;
		}

		
	}

	renderEndImage() {
		// return end-game image based on win/lose status
		// user was successful or if they quit the game
		if(this.props.userQuit){
			var endGameImgSrc = process.env.PUBLIC_URL + 'icons/icon_lose.png';
			var endGameExclaim = "You quit!"
		} else {
			var endGameImgSrc = process.env.PUBLIC_URL + 'icons/icon_win.png';
			var endGameExclaim = "Congratulations!"
		}

		return (
			<div>
				<img className='end-img' src={endGameImgSrc} />
				<h3>{endGameExclaim}</h3>
			</div>

		)
	}

	renderEndgame(){
		var newGameButtonSrc = process.env.PUBLIC_URL + 'icons/icon_refresh.png';

		if(this.props.postgame & this.props.showEnd){
			return(
				<div className={'end-container'}>
					<div className='end-header'>
						<div className='exit-end-btn' onClick={this.props.hideEnd}>&#10005;</div>
					</div>
					<div className='end-content'>
						<div className='end-img-div'>
							{this.renderEndImage()}
						</div>
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