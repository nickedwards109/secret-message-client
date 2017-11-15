import React from 'react';
import ReactDOM from 'react-dom';
import Messages from '../../components/Messages';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Messages messages={['message stub', 'another stub']}/>, div);
});

it('renders its props in the UI', () => {
  const messages = ['message stub', 'another stub'];
  const messagesContainer = shallow(<Messages messages={messages} />);
  expect(messagesContainer.text()).toContain('message stub');
  expect(messagesContainer.text()).toContain('another stub');
});
