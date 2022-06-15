import React from 'react';
const Status = React.lazy(() => import('../views/Status/Status'));
const StatusForm = React.lazy(() => import('../views/Status/StatusForm'));

const routes = [
  {
    path: '/status',
    exact: true,
    name: 'Status',
    component: Status
  },
  {
    path: '/status/add',
    exact: true,
    name: 'Add',
    component: StatusForm
  },
  {
    path: '/status/:id',
    exact: true,
    name: 'Edit',
    component: StatusForm
  }
];

export default routes;
