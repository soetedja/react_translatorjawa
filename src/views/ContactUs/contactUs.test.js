// import React from 'react';
// import ReactDOM from 'react-dom';
// import ContactUs from './ContactUs';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<ContactUs />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// // import React from 'react';
// // import ReactDOM from 'react-dom';
// // import Language from './Language';

// // it('renders without crashing', () => {
// //   const div = document.createElement('div');
// //   ReactDOM.render(<Language />, div);
// //   ReactDOM.unmountComponentAtNode(div);
// // });

import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ContactUs from './ContactUs';

const mockStore = configureMockStore();
const store = mockStore({});

describe('ContactUs Page', () => {
  it('should render without throwing an error', () => {
    expect(
      shallow(
        <Provider store={store}>
          <ContactUs />
        </Provider>
      ).exists(<strong> Contact Us </strong>)
    ).toBe(true);
  });
});
