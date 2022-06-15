import React from 'react';
const AppSetting = React.lazy(() => import('../views/AppSetting/AppSetting'));
const AppSettingForm = React.lazy(() =>
  import('../views/AppSetting/AppSettingForm')
);

const routes = [
  {
    path: '/appSetting',
    exact: true,
    name: 'AppSetting',
    component: AppSetting
  },
  {
    path: '/appSetting/add',
    exact: true,
    name: 'Add',
    component: AppSettingForm
  },
  {
    path: '/appSetting/:id',
    exact: true,
    name: 'Edit',
    component: AppSettingForm
  }
];

export default routes;
