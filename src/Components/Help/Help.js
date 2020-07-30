import React from 'react';
import './Help.css';
import shapePaths from '../../utils/ShapePaths.js'
import RandomSet from '../RandomSet/RandomSet.js';


class Help extends React.Component {

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

	renderHelpWindow(){
		if(this.props.showHelp){
			return(
				<div className='help-container'>
					<div className='help-header'>
						<div className='exit-help-btn help-header-spacer'></div>
						<div className='help-title'><h3>How to play SET</h3></div>
						<div className='exit-help-btn' onClick={this.props.toggleHelp}>&#10005;</div>
					</div>

					<div className='help-content' >
						<p>SET is a matching game. Each round, a random selection of cards is dealt. Find all SETs to win.</p>
						
						<p>Card have 4 attributes that come in 3 variations.</p>
						<ul className='help-ul'>
							<li className='help-li'>
								<div className='help-li-content'>
									<div className='attr-name'>color:</div>
									<div className='attr-values'>
										<div className='attr-val'><div className='color-box red-box'></div></div>| 
										<div className='attr-val'><div className='color-box green-box'></div></div>| 
										<div className='attr-val'><div className='color-box blue-box'></div></div>
									</div>  
								</div>
							</li>
							<li className='help-li'>
								<div className='help-li-content'>
									<div className='attr-name'>shape:</div>
									<div className='attr-values'>
										<div className='attr-val'>{this.getShape('diamond', 'solid')}</div>| 
										<div className='attr-val'>{this.getShape('oval', 'solid')}</div>| 
										<div className='attr-val'>{this.getShape('squiggle', 'solid')}</div>
									</div>    
								</div>
							</li>
							<li className='help-li'>
								<div className='help-li-content'>
									<div className='attr-name'>pattern:</div>
									<div className='attr-values'>
										<div className='attr-val'>{this.getShape('square', 'solid', false)}</div>| 
										<div className='attr-val'>{this.getShape('square', 'outline', false)}</div>| 
										<div className='attr-val'>{this.getShape('square', 'stripes', false)}</div>
									</div>   
								</div>
							</li>
							<li className='help-li'>
								<div className='help-li-content'>
									<div className='attr-name'>number:</div>
									<div className='attr-values'>
										<div className='attr-val'>&#9679;</div>| 
										<div className='attr-val'>&#9679;&#9679;</div>|  
										<div className='attr-val'>&#9679;&#9679;&#9679;</div>
									</div>   								
								</div>
							</li>
						</ul>
						<p>A valid SET contains 3 cards whose attributes match in a particular way:
						Either all the same, or all different, across all cards</p>
						<p></p>
						<p>The game difficulty and number of cards and SETs can be adjusted in 
						the settings menu
						</p>
					</div>
					<div className='about-game'>
						<div className=''><h3>About this game</h3></div>
						<p>This web app version of SET was created by Nicholas DeForest in 2020 using React js</p>
					</div>
					< RandomSet />
				</div>
				
			)
		} else {
			return (null);
		};
	}



	render(){
		return(this.renderHelpWindow());
	}
};

export default Help;