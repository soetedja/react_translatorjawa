import React from 'react';
import ReactDOM from 'react-dom';
import WordType from './WordType';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WordType />, div);
  ReactDOM.unmountComponentAtNode(div);
});
