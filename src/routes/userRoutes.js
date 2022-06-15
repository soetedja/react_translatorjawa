import React from 'react';
const User = React.lazy(() => import('../views/User/User'));
const UserForm = React.lazy(() => import('../views/User/UserForm'));

const routes = [
  { path: '/user', exact: true, name: 'User', component: User },
  {
    path: '/user/add',
    exact: true,
    name: 'Add',
    component: UserForm
  },
  {
    path: '/user/:id',
    exact: true,
    name: 'Edit',
    component: UserForm
  }
];

export default routes;
