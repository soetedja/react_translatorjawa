import React from 'react';
const Donation = React.lazy(() => import('../views/Donation/Donation'));
const DonationForm = React.lazy(() => import('../views/Donation/DonationForm'));

const routes = [
  {
    path: '/donation',
    exact: true,
    name: 'Donation',
    component: Donation
  },
  {
    path: '/donation/add',
    exact: true,
    name: 'Add',
    component: DonationForm
  },
  {
    path: '/donation/:id',
    exact: true,
    name: 'Edit',
    component: DonationForm
  }
];

export default routes;
