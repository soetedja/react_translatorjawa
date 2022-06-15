import React from 'react';
const Donor = React.lazy(() => import('../views/Donor/Donor'));
const DonorForm = React.lazy(() => import('../views/Donor/DonorForm'));

const routes = [
  {
    path: '/donor',
    exact: true,
    name: 'Donor',
    component: Donor
  },
  {
    path: '/donor/add',
    exact: true,
    name: 'Add',
    component: DonorForm
  },
  {
    path: '/donor/:id',
    exact: true,
    name: 'Edit',
    component: DonorForm
  }
];

export default routes;
