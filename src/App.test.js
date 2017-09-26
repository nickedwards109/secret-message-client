import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('calls getMessages() when the button is clicked', () => {
  const spy = sinon.spy(App.prototype, 'getMessages');
  const app = shallow(<App />);
  const button = app.find('button');
  expect(spy.notCalled).toEqual(true);
  button.simulate('click');
  expect(spy.calledOnce).toEqual(true);
});

it('sets messages state when getMessages() is called', () => {
  const app = shallow(<App />);
  expect(app.state().messages.length).toEqual(0);
  app.instance().getMessages();
  expect(app.state().messages.length).not.toEqual(0);
});

it('sets props in its children when messages state is set', () => {
  const app = mount(<App />);
  const messages = ["message stub", "another stub"];
  app.setState({ messages: messages });
  const messagesContainer = app.find('Messages');
  expect(messagesContainer.props().messages).toEqual(messages);
});
