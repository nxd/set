import React from 'react';
import './Menu.css';

import Timer from '../Timer/Timer.js';


class Menu extends React.Component {
	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		gameStatus: {}
	// 	}
	// }

	// static getDerivedStateFromProps(props, state) {
	//     if (props.gameStatus !== state.gameStatus) {
	//       return {
	//         	gameStatus: props.gameStatus
	// 	    };
	//     }
	// }

	render() {

		//set static button icon locations
		var newGameButtonSrc = process.env.PUBLIC_URL + 'icons/icon_refresh.png';
		var shuffleButtonSrc = process.env.PUBLIC_URL + 'icons/icon_shuffle.png';
		var helpButtonSrc = process.env.PUBLIC_URL + 'icons/icon_help.png';
		var solveButtonSrc = process.env.PUBLIC_URL + 'icons/icon_solve.png';
		var menuButtonSrc = process.env.PUBLIC_URL + 'icons/icon_menu.png';
		var pauseButtonSrc;
		var pauseButtonVis;
		var newButtonVis;
		var shuffleButtonVis;
		var helpButtonVis;
		var solveButtonVis;

		//determine button status and icons for pregame

		//determine button status and icons for paused game
		if(this.props.gameState.paused){
			pauseButtonSrc = process.env.PUBLIC_URL + 'icons/icon_play.png';
			newButtonVis = 'btn-hidden';
			shuffleButtonVis = 'btn-hidden';
			solveButtonVis = 'btn-hidden';
		} else {
			pauseButtonSrc = process.env.PUBLIC_URL + 'icons/icon_pause.png';
		}

		// set new game icon to play if in pregame state
		if(this.props.gameState.pregame){
			newGameButtonSrc = process.env.PUBLIC_URL + 'icons/icon_play.png';
		}

		//determine button status and icons for postgame
		if(this.props.gameState.pregame || this.props.gameState.postgame){
			pauseButtonVis = 'btn-removed';
			shuffleButtonVis = 'btn-hidden';
			solveButtonVis = 'btn-hidden';
		}


		return (
			
			<div className='menu'>
				<div className='submenu-group button-group'>
					<div className={`menu-button ${pauseButtonVis}`}
						id='pauseButton'
						onClick={this.props.pauseGame}
					>
						<img src={pauseButtonSrc}/>
					</div>
					<div className='menu-button'
						id='refreshButton'
						onClick={this.props.newGame}
					>
						<img src={newGameButtonSrc}/>
					</div>
					<div className={`menu-button ${shuffleButtonVis}`}
						id='shuffleButton'
						onClick={this.props.shuffleCards}
					>
						<img src={shuffleButtonSrc}/>
					</div>
				</div>


				<div className='submenu-group timer-group'>
					<Timer 
						gameState = {this.props.gameState}
						showTimer = {this.props.showTimer}
						time = {this.props.time}
						isOn = {this.props.isOn}
						start = {this.props.start}
					/>
				</div>


				<div className='submenu-group button-group button-group-right'>
					
					<div className={`menu-button ${solveButtonVis}`}
						id='solveButton'
						onClick={this.props.solveGame}
					>
						<img src={solveButtonSrc}/>
					</div>

					<div className={`menu-button ${helpButtonVis}`}
						id='helpButton'
						onClick={this.props.toggleHelp}
					>
						<img src={helpButtonSrc}/>
					</div>

					<div 
						id='settingsButton' 
						className='menu-button dropdown'
						onClick={this.props.toggleSettings}
					>
						<img src={menuButtonSrc}/>
					</div>
				
				</div>
			</div>

		)
	}
};

export default Menu;