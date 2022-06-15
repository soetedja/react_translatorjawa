import React from 'react';
const Role = React.lazy(() => import('../views/Role/Role'));
const RoleForm = React.lazy(() => import('../views/Role/RoleForm'));

const routes = [
  {
    path: '/role',
    exact: true,
    name: 'Role',
    component: Role
  },
  {
    path: '/role/add',
    exact: true,
    name: 'Add',
    component: RoleForm
  },
  {
    path: '/role/:id',
    exact: true,
    name: 'Edit',
    component: RoleForm
  }
];

export default routes;
