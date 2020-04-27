import React from 'react';
import './Menu.css';


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
		if(this.props.gameStatus.paused){
			pauseButtonSrc = process.env.PUBLIC_URL + 'icons/icon_play.png';
			newButtonVis = 'btn-hidden';
			shuffleButtonVis = 'btn-hidden';
			solveButtonVis = 'btn-hidden';
		} else {
			pauseButtonSrc = process.env.PUBLIC_URL + 'icons/icon_pause.png';
		}

		// set new game icon to play if in pregame state
		if(this.props.gameStatus.pregame){
			newGameButtonSrc = process.env.PUBLIC_URL + 'icons/icon_play.png';
		}

		//determine button status and icons for postgame
		if(this.props.gameStatus.pregame || this.props.gameStatus.postgame){
			pauseButtonVis = 'btn-removed';
			shuffleButtonVis = 'btn-hidden';
			solveButtonVis = 'btn-hidden';
		}


		return (
			
			<div className='menu'>
				<div className='submenu-group'>
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
				<div className='submenu-group'>
					<h1 id='timerDisplay'>00:00</h1>
				</div>
				<div className={'submenu-group dropdown'}>
					
					<div className={`menu-button ${solveButtonVis}`}
						id='solveButton'
						onClick={this.props.newGame}
					>
						<img src={solveButtonSrc}/>
					</div>
					<div className={`menu-button ${helpButtonVis}`}
						id='helpButton'
					>
						<img src={helpButtonSrc}/>
					</div>
					<div id='settingsButton' className='menu-button'>
						<img src={menuButtonSrc}/>
						<div className='dropdown-content'>
							<div className='settings-row'>
								<p>game mode:</p>
								<button>+</button>
								<p>4</p>
								<button>-</button>
							</div>
							<div className='settings-row'>
								<p>cards:</p>
								<button>+</button>
								<p>4</p>
								<button>-</button>
							</div>
							<div className='settings-row'>
								<p>SETs:</p>
								<button>+</button>
								<p>4</p>
								<button>-</button>
							</div>
						</div>
					</div>
				</div>
				
			</div>

		)
	}
};

export default Menu;