import React from 'react';
import './Timer.css';

import GameLogic from '../../utils/GameLogic.js';

class Timer extends React.Component {

  render() {
    let timerDisplayStatus = null;
    if((!this.props.showTimer)||(this.props.gameState.pregame)){
    	timerDisplayStatus = 'hidden-timer'; 
    }
    return(
      <div className={`timer-container ${timerDisplayStatus}`}>
        <h3>{GameLogic.timeStringFromMs(this.props.time)}</h3>
      </div>
    )
  }
}

export default Timer;