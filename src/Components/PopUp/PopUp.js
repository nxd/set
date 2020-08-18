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
		            numCards={this.props.numCards}
		            minSets={this.props.minSets}
		            easyMode={this.props.easyMode}
		            showTimer={this.props.showTimer}
		            showSettings={this.props.gameState.settings}
		            toggleSettings = {this.props.toggleSettings}
		            updateSettings = {this.props.updateSettings}
		         />
	          <Help 
	            showHelp={this.props.gameState.help}
	            toggleHelp = {this.props.toggleHelp}
	          />
	          <Endgame 
	            postgame={this.props.gameState.postgame}
	            newGame = {this.props.generateNewGame}
	            nSets={this.props.nSets}
	            showTimer={this.props.showTimer}
	            gameTime={this.props.time}
	            userQuit={this.props.gameState.solved}
	            showEnd = {this.props.showEnd}
            	hideEnd = {this.props.hideEnd}
	          />
			</div>
		);
	}
};

export default PopUp;