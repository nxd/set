import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: false,
      runningTime: 0
    };
  }
  

  static getDerivedStateFromProps(props, state) {
    return {isRunning: props.isRunning };
  }

  handleClick = () => {
    this.setState(state => {
      if (state.status) {
        clearInterval(this.timer);
      } else {
        const startTime = Date.now() - this.state.runningTime;
        this.timer = setInterval(() => {
          this.setState({ runningTime: Date.now() - startTime });
        });
      }
      return { status: !state.status };
    });
  };

  handleReset = () => {
    this.setState({ runningTime: 0, status: false });
  };
  
  render() {
    const { status, runningTime } = this.state;
    return (
      <div>
        <p>{runningTime}ms</p>
        <button onClick={this.handleClick}>{status ? 'Stop' : 'Start'}</button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}