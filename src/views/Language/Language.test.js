// import React from 'react';
// import ReactDOM from 'react-dom';
// import Language from './Language';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Language />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Language from './Language';

const mockStore = configureMockStore();
const store = mockStore({});

describe('Language Page', () => {
  it('should render without throwing an error', () => {
    expect(
      shallow(
        <Provider store={store}>
          <Language />
        </Provider>
      ).exists(<strong> Language </strong>)
    ).toBe(true);
  });
});
