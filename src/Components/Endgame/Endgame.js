import React from 'react';
import './Endgame.css';

import GameLogic from '../../utils/GameLogic.js';


class Endgame extends React.Component {

	renderEndgame(){
		var newGameButtonSrc = process.env.PUBLIC_URL + 'icons/icon_refresh.png';

		// set message and img src if user has quit game
		if(this.props.userQuit){
			var endGameImgSrc = process.env.PUBLIC_URL + 'icons/icon_lose.png';
			var endGameExclaim = "You quit!"
			var endGameMsg = "Better luck next time. You can do it!"
		} else {
		// set message and img src if user wins

			var endGameImgSrc = process.env.PUBLIC_URL + 'icons/icon_win.png';
			var endGameExclaim = "Congratulations, Cactus!"
			var endGameMsg = `You found all ${this.props.nSets} SETs`
			
			// if timer is enabled, add total game time to message
			if(this.props.showTimer) {
				endGameMsg = endGameMsg.concat(` in ${GameLogic.timeStringFromMs(this.props.gameTime)}!`)
			} else {
				endGameMsg = endGameMsg.concat('!')
			}
		}

		// return html for endgame using content defined above
		// if in postgame, and showEnd option enabled
		if(this.props.postgame & this.props.showEnd){
			return(
				<div className={'end-container'}>
					<div className='end-header'>
						<div className='exit-end-btn' onClick={this.props.hideEnd}>&#10005;</div>
					</div>
					<div className='end-content'>
						<div className='end-img-div'>
							<div>
								<img className='end-img' src={endGameImgSrc} />
								<h3>{endGameExclaim}</h3>
							</div>
						</div>
						<div className='end-status'>
							<p>{endGameMsg}</p>
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
			// otherwise return null
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