import React from 'react';
import './Settings.css';


class Settings extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			numCards: 0,
			minSets: 0,
			easyMode: false,
			showTimer: false,
			initializedSettings: false
		}

		this.revertStateToProps = this.revertStateToProps.bind(this);
		this.toggleEasyMode = this.toggleEasyMode.bind(this);
		this.toggleTimer = this.toggleTimer.bind(this);
		this.cancelChanges = this.cancelChanges.bind(this);
		this.changeValue = this.changeValue.bind(this);
	}

	static getDerivedStateFromProps(props, state) {
	    //only update if settings have not been initialized
	    if(!state.initializedSettings){
	    	return {
	    		numCards: props.numCards,
				minSets: props.minSets,
				easyMode: props.easyMode,
				showTimer: props.showTimer,
				initializedSettings: true
	    	}
	    } else {
	    	return(null)
	    }
	}

	revertStateToProps() {
		//this function defines local state based on props
		//used to initially define state, and to revert if settings changes are canceled

		this.setState({
			numCards: this.props.numCards,
			minSets: this.props.minSets,
			easyMode: this.props.easyMode,
			showTimer: this.props.showTimer,
		})
	}

	renderCheckBox(optionName) {

		var optionValue;
		var onClickFunc;

		if(optionName==='easyMode'){
			optionValue = this.state.easyMode;
			onClickFunc = this.toggleEasyMode;
		} else if (optionName==='showTimer') {
			optionValue = this.state.showTimer;
			onClickFunc = this.toggleTimer;
		} else {
			return(null)
		}


		if(optionValue){
			console.log(` rendered easy mode enabled: ${this.state.easyMode}`)
			return <input type="checkbox" onClick={onClickFunc} checked/>
		} else {
			return <input type="checkbox" onClick={onClickFunc}/>
		}
	}

	toggleEasyMode(){
		let newEasyMode = !this.state.easyMode;
		console.log(`new easy mode enabled: ${newEasyMode}`)
		this.setState({easyMode:newEasyMode}, ()=>{console.log(this.state.easyMode)});

		console.log('clicked Easy Mode switch')
	}

	toggleTimer(){
		let currentTimer = this.state.showTimer;
		this.setState({showTimer:!currentTimer});

		console.log('clicked Timer switch')
	}

	cancelChanges(){
		// revert state back to props 
		this.revertStateToProps()
		// close settings window
		this.props.toggleSettings();
	}

	changeValue(stateValName, delta){
		//this function changes a state value by delta amount
		if(stateValName==='numCards'){
			let curVal = this.state.numCards;
			this.setState({numCards:(curVal + delta)});
		}
		if(stateValName==='minSets'){
			let curVal = this.state.minSets;
			this.setState({minSets:(curVal + delta)});
		}
	}

	renderSettingsWindow(){
		if(this.props.showSettings){
			return(
				<div className='settings-container'>
					<div >
							<h3 className='setting-title'>Game Options</h3>

							<div className='settings-row'>
								<div className='settings-row-section settings-label'>
									<p>Easy Mode:</p>
								</div>
								<div className='settings-row-section'>
									<label className="switch">
									  {this.renderCheckBox('easyMode')}
									  <span className="slider round"></span>
									</label>
								</div>
								
							</div>

							<div className='settings-row'>
								<div className='settings-row-section settings-label'>
									<p>Enable Timer:</p>
								</div>
								<div className='settings-row-section'>
									<label className="switch">
									  {this.renderCheckBox("showTimer")}
									  <span className="slider round"></span>
									</label>
								</div>
							</div>

							<div className='settings-row'>
								<div className='settings-row-section settings-label'>
									<p># of cards:</p>
								</div>
								<div className='settings-row-section up-down-selector'>
									<button onClick={() => this.changeValue('numCards', -1)}>-</button>
									<p>{this.state.numCards}</p>
									<button onClick={() => this.changeValue('numCards', 1)}>+</button>
								</div>
							</div>

							<div className='settings-row'>
								<div className='settings-row-section settings-label'>
									<p># of SETs:</p>
								</div>
								<div className='settings-row-section up-down-selector'>
									<button onClick={() => this.changeValue('minSets', -1)}>-</button>
									<p>{this.state.minSets}</p>
									<button onClick={() => this.changeValue('minSets', 1)}>+</button>
								</div>
							</div>

							<div className='settings-row'>
								<div 
									className='settings-btn settings-accept-btn'
									onClick={() => this.props.updateSettings(this.state, true)}
								>
									Apply Settings
								</div>
							</div>

							<div className='settings-row'>
								<div 
									className='settings-btn settings-cancel-btn'
									onClick={this.cancelChanges}
								>
									Cancel
								</div>
							</div>

						</div>
					

				</div>
			)
		} else {
			return (null);
		};
	}



	render(){
		return(this.renderSettingsWindow());
	}
};

export default Settings;