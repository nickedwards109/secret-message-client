import React, { Component } from 'react';
import './App.css';
import HTTPClient from './HTTPClient';
import Messages from './Messages';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.getMessages = this.getMessages.bind(this);
  }

  getMessages() {
    this.setState({messages: ['Getting messages...']})
    const httpClient = new HTTPClient();
    httpClient.getMessages().then(
      resolve => {
        const messages = httpClient.decryptHTTP(resolve);
        this.setState({ messages: messages });
      },
      reject => {
        const error_message = "There was an error! Something something 404 lulz. Nice try!"
        this.setState({ messages: [error_message] });
      }
    );
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.getMessages}>Get Secret Messages</button>
        <Messages messages={this.state.messages}/>
      </div>
    );
  }
}

export default App;
