import React from 'react';
const WordType = React.lazy(() => import('../views/WordType/WordType'));
const WordTypeForm = React.lazy(() => import('../views/WordType/WordTypeForm'));

const routes = [
  {
    path: '/wordType',
    exact: true,
    name: 'WordType',
    component: WordType
  },
  {
    path: '/wordType/add',
    exact: true,
    name: 'Add',
    component: WordTypeForm
  },
  {
    path: '/wordType/:id',
    exact: true,
    name: 'Edit',
    component: WordTypeForm
  }
];

export default routes;
