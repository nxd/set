import React from 'react';
import './Help.css';
import shapePaths from '../../utils/ShapePaths.js'
import RandomSet from '../RandomSet/RandomSet.js';
import GameLogic from '../../utils/GameLogic.js';

const colorList = ['red-box', 'green-box', 'blue-box'];
const shapeList = ['diamond', 'oval', 'squiggle'];
const patternList = ['solid', 'outline', 'stripes'];
const numberList = ['&#9679;', '&#9679;&#9679;', '&#9679;&#9679;&#9679;'];


class Help extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			mainHelp:true,
			exampleSet:GameLogic.getRandomSet()
		}

		this.drawRandomSet = this.drawRandomSet.bind(this);
		this.toggleMainHelp = this.toggleMainHelp.bind(this);
	}

	getShape(shapeName, fillName, isCardShape=true){
		let viewBox = "0 0 83.061 161.749";
		let className = 'help-shape';

		if (!isCardShape){
			viewBox = "0 0 72 72";
			className = 'help-pattern-box';
		}

		return(
			<svg version="1.1" x="0px" y="0px" viewBox={viewBox}
		          className={className}>
		        {shapePaths[shapeName][fillName]}   
		    </svg>
		)
	}

	drawRandomSet() {
		// method draws a new matching set at random
		let randomSet = GameLogic.getRandomSet()
		this.setState({exampleSet:randomSet})

	}

	toggleMainHelp() {
		// method toggles main help on/off
		// method also generates a new random example
		let currentHelp = this.state.mainHelp
		this.setState({mainHelp:!currentHelp, exampleSet:GameLogic.getRandomSet()})
	}



	renderHelpWindow(){
		if(this.props.showHelp){
			return(
				<div className='help-container'>
					<div className='help-header'>
						<div className='exit-help-btn help-header-spacer'></div>
						<div className='help-title'><h3>How to play SET</h3></div>
						<div className='exit-help-btn' onClick={this.props.toggleHelp}>&#10005;</div>
					</div>

					{this.renderHelpContent()}
					
					<div className='about-game'>
						<div className=''><h3>About this game</h3></div>
						<p>This web app version of SET was created by Nicholas DeForest in 2020 using React js</p>
					</div>
					
				</div>
				
			)
		} else {
			return (null);
		};
	}

	renderHelpContent() {
		// if state mainHelp is true, return the content for the main help page
		// otherwise, return the SET matching details
		if(this.state.mainHelp){
			return (
				<div className='help-content' >
					<p className='help-text'>SET is a matching game. Each round, a random selection of cards is dealt. Find all SETs to win.</p>
					
					<p className='help-text'>Card have 4 attributes that come in 3 variations.</p>
					<ul className='help-ul'>
						<li className='help-li'>
							<div className='help-li-content'>
								<div className='attr-name'>color:</div>
								<div className='attr-values'>
									<div className='attr-val'><div className={`color-box ${colorList[0]}`}></div></div>| 
									<div className='attr-val'><div className={`color-box ${colorList[1]}`}></div></div>| 
									<div className='attr-val'><div className={`color-box ${colorList[2]}`}></div></div>
								</div>  
							</div>
						</li>
						<li className='help-li'>
							<div className='help-li-content'>
								<div className='attr-name'>shape:</div>
								<div className='attr-values'>
									<div className='attr-val'>{this.getShape(shapeList[0], 'solid')}</div>| 
									<div className='attr-val'>{this.getShape(shapeList[1], 'solid')}</div>| 
									<div className='attr-val'>{this.getShape(shapeList[2], 'solid')}</div>
								</div>    
							</div>
						</li>
						<li className='help-li'>
							<div className='help-li-content'>
								<div className='attr-name'>pattern:</div>
								<div className='attr-values'>
									<div className='attr-val'>{this.getShape('square', patternList[0], false)}</div>| 
									<div className='attr-val'>{this.getShape('square', patternList[1], false)}</div>| 
									<div className='attr-val'>{this.getShape('square', patternList[2], false)}</div>
								</div>   
							</div>
						</li>
						<li className='help-li'>
							<div className='help-li-content'>
								<div className='attr-name'>number:</div>
								<div className='attr-values'>
									<div className='attr-val'>{String.fromCharCode(9679).repeat(1)}</div>| 
									<div className='attr-val'>{String.fromCharCode(9679).repeat(2)}</div>|  
									<div className='attr-val'>{String.fromCharCode(9679).repeat(3)}</div>
								</div>   								
							</div>
						</li>
					</ul>
					<p className='help-text'>A valid SET contains 3 cards whose attributes match in a particular way:
					Either all the same, or all different, across all cards</p>
					<div className='help-toggle-btn' onClick={this.toggleMainHelp}>
						Learn more about matching
					</div>
					<p className='help-text'>The game difficulty and number of cards and SETs can be adjusted in 
					the settings menu
					</p>
				</div>
			)

		} else {
			let cardDims = this.state.exampleSet.cardDims
			let attrMatch = this.state.exampleSet.attrMatch

			return (
			<div className='help-content' >
				<p className='example-set-text'>Here is a random matching SET:</p>
				<div className='random-set-container'>
					< RandomSet setData={this.state.exampleSet}/>
				</div>
				<p className='example-set-text'>Here is why it's a SET:</p>
				<div>
					<ul className='example-ul'>
						<li className='example-set-li'>
							<div className='help-li-content'>
								<div className='attr-name'>color:</div>
								<div className='attr-values'>
									<div className='attr-val'><div className={`color-box ${colorList[cardDims[0][3]]}`}></div></div>| 
									<div className='attr-val'><div className={`color-box ${colorList[cardDims[1][3]]}`}></div></div>| 
									<div className='attr-val'><div className={`color-box ${colorList[cardDims[2][3]]}`}></div></div>
								</div>  
								<div className='attr-status'>{attrMatch[3] ? '(all the same)' : '(all different)'}</div>
							</div>
						</li>
						<li className='example-set-li'>
							<div className='help-li-content'>
								<div className='attr-name'>shape:</div>
								<div className='attr-values'>
									<div className='attr-val'>{this.getShape(shapeList[cardDims[0][1]], 'solid')}</div>| 
									<div className='attr-val'>{this.getShape(shapeList[cardDims[1][1]], 'solid')}</div>| 
									<div className='attr-val'>{this.getShape(shapeList[cardDims[2][1]], 'solid')}</div>
								</div> 
								<div className='attr-status'>{attrMatch[1] ? '(all the same)' : '(all different)'}</div>   
							</div>
						</li>
						<li className='example-set-li'>
							<div className='help-li-content'>
								<div className='attr-name'>pattern:</div>
								<div className='attr-values'>
									<div className='attr-val'>{this.getShape('square', patternList[cardDims[0][2]], false)}</div>| 
									<div className='attr-val'>{this.getShape('square', patternList[cardDims[1][2]], false)}</div>| 
									<div className='attr-val'>{this.getShape('square', patternList[cardDims[2][2]], false)}</div>
								</div>  
								<div className='attr-status'>{attrMatch[2] ? '(all the same)' : '(all different)'}</div> 
							</div>
						</li>
						<li className='example-set-li'>
							<div className='help-li-content'>
								<div className='attr-name'>number:</div>
								<div className='attr-values'>
									<div className='attr-val'>{String.fromCharCode(9679).repeat(cardDims[0][0]+1)}</div>| 
									<div className='attr-val'>{String.fromCharCode(9679).repeat(cardDims[1][0]+1)}</div>|  
									<div className='attr-val'>{String.fromCharCode(9679).repeat(cardDims[2][0]+1)}</div>
								</div>  
								<div className='attr-status'>{attrMatch[0] ? '(all the same)' : '(all different)'}</div> 								
							</div>
						</li>
					</ul>
				</div>

				<div className='help-toggle-btn' onClick={this.drawRandomSet}>
					New Example
				</div>
				<div className='help-btn' onClick={this.toggleMainHelp}>
					Go back
				</div>
			</div>
			)
		}
	}



	render(){
		return(this.renderHelpWindow());
	}
};

export default Help;