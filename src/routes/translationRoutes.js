import React from 'react';
const Translation = React.lazy(() =>
  import('../views/Translation/Translation')
);
// const TranslationForm = React.lazy(() =>
//   import('../views/Translation/TranslationForm')
// );

const routes = [
  {
    path: '/translation',
    exact: true,
    name: 'Translation',
    component: Translation
  }
  // {
  //   path: '/translation/add',
  //   exact: true,
  //   name: 'Add',
  //   component: TranslationForm
  // },
  // {
  //   path: '/translation/:id',
  //   exact: true,
  //   name: 'Edit',
  //   component: TranslationForm
  // }
];

export default routes;
