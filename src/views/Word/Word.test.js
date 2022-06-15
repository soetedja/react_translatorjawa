// import React from 'react';
// import ReactDOM from 'react-dom';
import Word from './Word';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Word />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
// import TestPage from "../TestPage";

const mockStore = configureMockStore();
const store = mockStore({});

describe('Word Page', () => {
  it('should render without throwing an error', () => {
    expect(
      shallow(
        <Provider store={store}>
          <Word />
        </Provider>
      ).exists('Word Management')
    ).toBe(true);
  });
});
