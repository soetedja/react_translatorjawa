import React from 'react';
const Language = React.lazy(() => import('../views/Language/Language'));
const LanguageForm = React.lazy(() => import('../views/Language/LanguageForm'));

const routes = [
  {
    path: '/language',
    exact: true,
    name: 'Language',
    component: Language
  },
  {
    path: '/language/add',
    exact: true,
    name: 'Add',
    component: LanguageForm
  },
  {
    path: '/language/:id',
    exact: true,
    name: 'Edit',
    component: LanguageForm
  }
];

export default routes;
