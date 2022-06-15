import React from 'react';
const Word = React.lazy(() => import('../views/Word/Word'));
const WordForm = React.lazy(() => import('../views/Word/WordForm'));

const routes = [
  { path: '/word', exact: true, name: 'Word', component: Word },
  {
    path: '/word/add',
    exact: true,
    name: 'Add',
    component: WordForm
  },
  {
    path: '/word/:id',
    exact: true,
    name: 'Edit',
    component: WordForm
  }
];

export default routes;
