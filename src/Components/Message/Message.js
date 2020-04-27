import React from 'react';
import './Message.css';


class Message extends React.Component {

	render(){
		return (
			<div className='messageBar'>
				<h3 className={this.props.message.type}>{this.props.message.content}</h3>
			</div>
		)
	}
};

export default Message;