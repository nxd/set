import React from 'react';
import './App.css';

import Menu from '../Menu/Menu.js';
import Message from '../Message/Message.js';
import Board from '../Board/Board.js';
import List from '../List/List.js';
import Settings from '../Settings/Settings.js';
import Help from '../Help/Help.js';
import StartBoard from '../StartBoard/StartBoard.js';

import GameLogic from '../../utils/GameLogic.js';
import Helper from '../../utils/Helper.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStatus: {
        pregame: true,
        active: false,
        paused: false,
        postgame: false,
        solved: false
      },
      numCards: 9,
      minSets: 4,
      maxAttempts: 500,
      easyMode: true,
      showHelp: false,
      showSettings: false,
      showTimer: true,
      cardList: [0,0,0,0,0,0,0,0,0],
      cardData: [],
      allSets: [],
      nSets: 0,
      nFound: 0,
      foundSets: [],
      quitSets: [],
      selectedCards: [],
      message: {
        type: 'empty-msg',
        content: 'empty'
      }
    };

    this.generateNewGame = this.generateNewGame.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.shuffleCards = this.shuffleCards.bind(this);
    this.solveGame = this.solveGame.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
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
      gameStatus: {
        pregame: false,
        active: true,
        paused: false,
        postgame: false,
        solved: false
      },
      selectedCards: [],
      cardList:cardList,
      allSets:allSets,
      nSets:nSets,
      cardData:cardData,
      foundSets: [],
      quitSets: [],
      message: message
    });
  }


  pauseGame(){
    //pause should not do anything is pregame, settings, or help mode
    if(this.state.gameStatus.pregame){
      return;
    }

    let pauseState = this.state.gameStatus.paused;
    this.setState({gameStatus: {
        pregame: false,
        active: pauseState,
        paused: !pauseState,
        postgame: false,
        solved: false
    }});
  }

  toggleHelp(){
    // if game active, pause and active help
    // otherwise, hide help and unpause
    this.pauseGame();
    var currentHelp = this.state.showHelp;
    this.setState({showHelp:!currentHelp})
  }

  toggleSettings(){
    // if game active, pause and active help
    // otherwise, hide help and unpause
    this.pauseGame();
    var currentSettings = this.state.showSettings;
    this.setState({showSettings:!currentSettings})
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

    let [newCardList, newCardData] = GameLogic.shuffleDealtCards(this.state.cardList, this.state.cardData);

    this.setState({
      cardList: newCardList,
      cardData: newCardData
    })
  }


  selectCard(cardNum) {
    // only proceed if game is active
    if(!this.state.gameStatus.active){
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
                gameStatus: {
                  pregame: false,
                  active: false,
                  paused: false,
                  postgame: true,
                  solved: false
                }
              });
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

    let quitSets = GameLogic.findMissingSets(this.state.allSets, this.state.foundSets);

    this.setState({
      gameStatus: {
        pregame: false,
        active: false,
        paused: false,
        postgame: true,
        solved: true
      },
      quitSets: quitSets,
      message: {
        type: 'failure-msg',
        content: 'Better Luck Next Time!'
      }

    })

  }


  render() {
    return(
      <div className="App">
        <Menu 
          newGame = {this.generateNewGame}
          pauseGame = {this.pauseGame}
          shuffleCards = {this.shuffleCards}
          solveGame = {this.solveGame}
          gameStatus = {this.state.gameStatus}
          toggleHelp = {this.toggleHelp}
          toggleSettings = {this.toggleSettings}
        />
        <StartBoard 
          pregame={this.state.gameStatus.pregame}
          updateSettings={this.updateSettings}
        />
        <div className='cards-container'>
          <Settings 
            numCards={this.state.numCards}
            minSets={this.state.minSets}
            easyMode={this.state.easyMode}
            showTimer={this.state.showTimer}
            showSettings={this.state.showSettings}
            toggleSettings = {this.toggleSettings}
            updateSettings = {this.updateSettings}
          />
          <Help 
            showHelp={this.state.showHelp}
            toggleHelp = {this.toggleHelp}
          />
          <div className='left-panel'>
            <Message message={this.state.message}/>
            <Board 
              gameStatus = {this.state.gameStatus}
              cardDataList={this.state.cardData}
              cardList={this.state.cardList}
              onCardSelect={this.selectCard}
            />
          </div>
          <div className='right-panel'> 
            <List
              gameStatus = {this.state.gameStatus}
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
