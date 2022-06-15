// import React from 'react';
import publicRoutes from './routes/publicRoutes';

// const Translate = React.lazy(() => import('./views/Translate/Translate'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // { path: '/t', exact: true, name: 'Translate' },
  // { path: '/translate', name: 'translate', component: Translate }
];

let combinedRoutes = [...routes, ...publicRoutes];
export default combinedRoutes;
