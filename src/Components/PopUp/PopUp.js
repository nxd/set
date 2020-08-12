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
		            showSettings={this.props.gameState.settings}
		            toggleSettings = {this.props.toggleSettings}
		            updateSettings = {this.props.updateSettings}
		         />
	          <Help 
	            showHelp={this.props.gameState.help}
	            toggleHelp = {this.props.toggleHelp}
	          />
	          <Endgame 
	            showEnd={this.props.gameState.postgame}
	            newGame = {this.props.generateNewGame}
	            nSets={this.props.nSets}
	            showTimer={this.props.showTimer}
	            gameTime={this.props.time}
	            userQuit={this.props.gameState.solved}
	          />
			</div>
		);
	}
};

export default PopUp;