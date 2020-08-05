import React from 'react';
import './PopUp.css';

import Settings from '../Settings/Settings.js';
import Help from '../Help/Help.js';
import Endgame from '../Endgame/Endgame.js';


class PopUp extends React.Component {

	render(){
		return(
			<div>
				<Settings 
	            numCards={this.props.gameState.numCards}
	            minSets={this.props.gameState.minSets}
	            easyMode={this.props.gameState.easyMode}
	            showTimer={this.props.gameState.showTimer}
	            showSettings={this.props.gameState.showSettings}
	            toggleSettings = {this.props.toggleSettings}
	            updateSettings = {this.props.updateSettings}
	          />
	          <Help 
	            showHelp={this.props.gameState.showHelp}
	            toggleHelp = {this.props.toggleHelp}
	          />
	          <Endgame 
	            showEnd={this.props.gameState.gameStatus.postgame}
	            newGame = {this.props.generateNewGame}
	            nSets={this.props.gameState.nSets}
	            showTimer={false}
	            gameTime='99:99'
	            userQuit={this.props.gameState.gameStatus.solved}
	          />
			</div>
		);
	}
};

export default PopUp;