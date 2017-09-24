import React, { Component } from 'react';
import './App.css';
import HTTPClient from './HTTPClient';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
    this.getMessage = this.getMessage.bind(this);
  }

  getMessage() {
    const httpClient = new HTTPClient();
    httpClient.getMessage().then(
      resolve => {
        const message = httpClient.decryptHTTP(resolve);
        this.setState({ message: message });
      },
      reject => {
        const error_message = "There was an error! Something something 404 lulz. Nice try!"
        this.setState({ message: error_message });
      }
    );
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.getMessage}>Get a Secret Message</button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
