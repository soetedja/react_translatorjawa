import React from 'react';
const ContactUs = React.lazy(() => import('../views/ContactUs/ContactUs'));

const routes = [
  {
    path: '/contactUs',
    exact: true,
    name: 'ContactUs',
    component: ContactUs
  }
];

export default routes;
