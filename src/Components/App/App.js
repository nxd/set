import React from 'react';
import './App.css';

import Menu from '../Menu/Menu.js';
import StartBoard from '../StartBoard/StartBoard.js';
import Message from '../Message/Message.js';
import Board from '../Board/Board.js';
import List from '../List/List.js';
import PopUp from '../PopUp/PopUp.js';

import GameLogic from '../../utils/GameLogic.js';
import Helper from '../../utils/Helper.js';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // object indicating what state the game is in
      gameState: {
        pregame: true,
        active: false,
        paused: false,
        postgame: false,
        solved: false,
        settings: false,
        help: false
      },
      showHelp: false,
      showSettings: false,
      // default game settings for generating new games
      numCards: 9,
      minSets: 4,
      maxAttempts: 500,
      easyMode: false,
      showTimer: true,
      // state properties generated for each game
      // start off empty
      cardList: [0,0,0,0,0,0,0,0,0],
      cardData: [],
      allSets: [],
      nSets: 0,
      nFound: 0,
      foundSets: [],
      quitSets: [],
      selectedCards: [],
      // status message
      message: {
        type: 'empty-msg',
        content: 'empty'
      },
      // timer properties
      time: 0,
      isOn: false,
      start: 0
    };

    this.generateNewGame = this.generateNewGame.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.shuffleCards = this.shuffleCards.bind(this);
    this.solveGame = this.solveGame.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
  }

  generateNewGame() {
    var cardList;
    var allSets;
    var nSets = 0;
    var attempts = 0;

    while(nSets<this.state.minSets && attempts<this.state.maxAttempts) {
      console.log(`Generation attempt: ${attempts +1}`)
      cardList = GameLogic.dealCards(this.state.numCards, this.state.easyMode);
      allSets = GameLogic.findSets(cardList);
      nSets = allSets.length;
      attempts++
    }

    // define card meta data based on list of card numbers
    let cardData = GameLogic.defineCardData(cardList);

    // clear any existing messages
    var message = {
      type: 'empty-msg',
      content: 'empty'
    };

    this.setState({
      gameState: {
        pregame: false,
        active: true,
        paused: false,
        postgame: false,
        solved: false,
        settings: false,
        help: false
      },
      selectedCards: [],
      cardList:cardList,
      allSets:allSets,
      nSets:nSets,
      cardData:cardData,
      foundSets: [],
      quitSets: [],
      message: message,
      time: 0, 
      isOn: false
    }, this.startTimer);
  }

  togglePauseMulti(pauseType) {
    // this function toggles multiple pause modes:
    // for regular pause, settings, and help menus

    // 
    var currentGameState = this.state.gameState;

  }


  pauseGame(){
    //pause should not do anything in pregame, settings, or help mode
    if(this.state.gameState.pregame){
      return;
    }

    let pauseState = this.state.gameState.paused;
    let newMessage = {}
    //if game will be paused, set message to 'game is paused'
    if(!pauseState){
      newMessage = {
        type: 'neutral-msg',
        content: 'Your game is paused'
      };
    } else {
      newMessage = {
        type: 'empty-msg',
        content: 'empty'
      };
    }

    this.setState({gameState: {
        pregame: false,
        active: pauseState,
        paused: !pauseState,
        postgame: false,
        solved: false,
        settings: false,
        help: false
      },
      message: newMessage
    });

    if(pauseState) {
      //if going fro paused to unpaused, start timer
      this.startTimer();
    } else {
      // otherwise, stop timer
      this.stopTimer();
    }
    
  }

  toggleHelp(){
    // if game active, pause and active help
    // otherwise, hide help and unpause

    // check current help and postgame states
    var currentHelp = this.state.gameState.help;
    var currentPostgame = this.state.gameState.postgame;
    var currentQuit = this.state.gameState.solved;
    var newGameState = {}
    var timerCallback

    if(!currentHelp) {
      // if help not currently active
      // pause game, display help, don't change postgame or userQuit states
      newGameState = {
        pregame: false,
        active: false,
        paused: true,
        postgame: currentPostgame,
        solved: currentQuit,
        settings: false,
        help: true
      };
      timerCallback = this.stopTimer;
    } else {
      // if help is current open
      // close help, unpause game, don't change postgame or userQuit
      newGameState = {
        pregame: false,
        active: true,
        paused: false,
        postgame: currentPostgame,
        solved: currentQuit,
        settings: false,
        help: false
      };
      timerCallback = this.startTimer;
    }

    // set new gameState then call timer callback func
    this.setState({gameState:newGameState}, timerCallback)
  }

  toggleSettings(){
    // if game active, pause and active settings
    // otherwise, hide settings and unpause

    // check current help and postgame states
    var currentSettings = this.state.gameState.settings;
    var currentPostgame = this.state.gameState.postgame;
    var currentQuit = this.state.gameState.solved;
    var newGameState = {}
    var timerCallback

    if(!currentSettings) {
      // if help not currently active
      // pause game, display help, don't change postgame or userQuit states
      newGameState = {
        pregame: false,
        active: false,
        paused: true,
        postgame: currentPostgame,
        solved: currentQuit,
        settings: true,
        help: false
      };
      timerCallback = this.stopTimer;
    } else {
      // if help is current open
      // close help, unpause game, don't change postgame or userQuit
      newGameState = {
        pregame: false,
        active: true,
        paused: false,
        postgame: currentPostgame,
        solved: currentQuit,
        settings: false,
        help: false
      };
      timerCallback = this.startTimer;
    }

    // set new gameState then call timer callback func
    this.setState({gameState:newGameState}, timerCallback)
  }

  updateSettings(newSettings, doToggle){
    //updates numCards, minSets, easyMode, and/or showTimer
    //the starts a new game
    this.setState({
      numCards: newSettings['numCards'],
      minSets: newSettings['minSets'],
      easyMode: newSettings['easyMode'],
      showTimer: newSettings['showTimer'],
    }, () => {
      if(doToggle){
        this.toggleSettings();
      }
      this.generateNewGame();
    })
  }


  shuffleCards() {
    // function changes the order of already dealt cards
    let [newCardList, newCardData] = GameLogic.shuffleDealtCards(this.state.cardList, this.state.cardData);

    this.setState({
      cardList: newCardList,
      cardData: newCardData
    })
  }

  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start
    }), 1);
  }

  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }

  resetTimer() {
    this.setState({time: 0, isOn: false})
  }


  selectCard(cardNum) {
    // only proceed if game is active
    if(!this.state.gameState.active){
      return;
    }

    // initialize vars used
    var cardData = this.state.cardData;

    //reset message
    var message = {
      type: 'empty-msg',
      content: 'empty'
    };

    // change success and failure attributes of all cards
    for(var cc=0; cc<cardData.length; cc++) {
        cardData[cc].success = false
        cardData[cc].fail = false
    }

    // toggle active state of cardNum
    let cardIndex = Helper.findWithAttr(cardData, 'number', cardNum)
    if(cardIndex !== -1){
      cardData[cardIndex].active =! cardData[cardIndex].active;
      this.setState({cardData: cardData, message:message}, () => {

      });
    }

    // add or remove clicked card from selected card list
    let selectedCards = this.state.selectedCards

    const index = selectedCards.indexOf(cardNum);
    if (index > -1) {
      selectedCards.splice(index, 1);
    } else {
      selectedCards.push(cardNum)
    }
    
    this.setState({selectedCards: selectedCards}, ()=> {
      // if 3 cards selected, check for match
      if(this.state.selectedCards.length===3){
        // set all cards to inactive
        cardData = this.state.cardData;
        for(var cc=0; cc<cardData.length; cc++) {
          cardData[cc].active = false;
        }

        if(GameLogic.checkMatch(this.state.selectedCards)){
          //add match to found matches
          console.log('Match found')
          // console.log(this.state.selectedCards)
          // check if already found, otherwise add to found list
          let foundSets = this.state.foundSets;
          if(!GameLogic.isSetinArray(foundSets, selectedCards.sort())){
            foundSets.push(selectedCards.sort())
            console.log(`found sets = ${foundSets.length}`)
            // if founds Sets is complete, set endgame message
            if(foundSets.length===this.state.nSets){
              message = {
                type: 'complete-msg',
                content: 'All SETs found! Congratulations'
              };
              this.setState({
                message:message,
                gameState: {
                  pregame: false,
                  active: false,
                  paused: false,
                  postgame: true,
                  solved: false,
                  settings: false,
                  help: false
                }
              });
              this.stopTimer();
              return;
            }

            // set message for new match
            message = {
              type: 'success-msg',
              content: 'New SET found!'
            };
          } else {
            message = {
              type: 'duplicate-msg',
              content: 'SET already found!'
            };
          }

          // change success attribute of selected cards
          for(var cc=0; cc<cardData.length; cc++) {
            for(var ss=0; ss<selectedCards.length; ss++){
              // console.log(`Card: ${cardData[cc].number}, Select: ${selectedCards[ss]}`)
              if(cardData[cc].number===selectedCards[ss]){
                cardData[cc].success = true
              }
            }
          }
          // console.log(cardData)
          this.setState({
            selectedCards:[],
            foundSets: foundSets,
            cardData: cardData,
            message: message
          })
          //reset card selections

          //check if all matches found & end game
        } else {
          //reset card selection 
          console.log('No Match!')
          // console.log(this.state.selectedCards)

          //define failure message
          message = {
            type: 'failure-msg',
            content: 'Not a SET!'
          };

          // change fail attribute of selected cards
          for(var cc=0; cc<cardData.length; cc++) {
            for(var ss=0; ss<selectedCards.length; ss++){
              if(cardData[cc].number===selectedCards[ss]){
                cardData[cc].fail = true
              }
            }
          }

          this.setState({
            selectedCards:[],
            cardData: cardData,
            message: message
          })
        }
      }
    })
  }

  solveGame() {
    // function finds any remaining unfound sets
    // and switches game mode over to 'solved'
    let quitSets = GameLogic.findMissingSets(this.state.allSets, this.state.foundSets);

    this.setState({
      gameState: {
        pregame: false,
        active: false,
        paused: false,
        postgame: true,
        solved: true,
        settings: false,
        help: false
      },
      quitSets: quitSets,
      message: {
        type: 'failure-msg',
        content: 'Better Luck Next Time!'
      }

    })

    this.stopTimer();

  }


  render() {
    return(
      <div className="App">
        <Menu 
          newGame = {this.generateNewGame}
          pauseGame = {this.pauseGame}
          shuffleCards = {this.shuffleCards}
          solveGame = {this.solveGame}
          gameState = {this.state.gameState}
          toggleHelp = {this.toggleHelp}
          toggleSettings = {this.toggleSettings}
          showTimer = {this.state.showTimer}
          time = {this.state.time}
          isOn = {this.state.isOn}
          start = {this.state.start}
        />
        <StartBoard 
          pregame={this.state.gameState.pregame}
          updateSettings={this.updateSettings}
        />
        <div className='cards-container'>
          <PopUp 
            gameState = {this.state.gameState} 
            toggleSettings = {this.toggleSettings}
            updateSettings = {this.updateSettings}
            toggleHelp = {this.toggleHelp}
            generateNewGame = {this.generateNewGame}
            showTimer = {this.state.showTimer}
            time = {this.state.time}
            numCards = {this.state.numCards}
            nSets = {this.state.nSets}
            minSets = {this.state.minSets}
            easyMode = {this.state.easyMode}
          />
          <div className='left-panel'>
            <Message message={this.state.message}/>
            <Board 
              gameState = {this.state.gameState}
              cardDataList={this.state.cardData}
              cardList={this.state.cardList}
              onCardSelect={this.selectCard}
            />
          </div>
          <div className='right-panel'> 
            <List
              gameState = {this.state.gameState}
              nSets={this.state.nSets}
              foundSets={this.state.foundSets} 
              quitSets={this.state.quitSets} 
            />
          </div>
        </div>
      </div>
    )
  };

}

export default App;
