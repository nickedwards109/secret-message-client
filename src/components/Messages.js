import React, { Component } from 'react';
import '../styles/Messages.css';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.messagesList = this.messagesList.bind(this);
  }

  messagesList(props) {
    const messages = props.messages;
    const listItems = messages.map((message, index) => {
      return <li key={index}>{message}</li>
    });
    return listItems;
  }

  render() {
    return (
      <ul>{this.messagesList(this.props)}</ul>
    )
  }
}

export default Messages;
