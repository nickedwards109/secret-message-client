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
    const response = httpClient.getMessage().then(response => {
      this.setState({ message: response.data.description });
    });
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
