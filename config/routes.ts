export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/task',
    name: 'task',
    icon: 'BarsOutlined',
    component: './Task',
  },
  {
    path: '/file',
    name: 'file',
    icon: 'FolderOpenOutlined',
    component: './File',
  },
  {
    path: '/config',
    name: 'config',
    icon: 'form',
    component: './Config',
  },
  {
    path: '/account',
    name: 'account',
    icon: 'user',
    component: './File',
  },
  {
    path: '/auth',
    layout: false,
    routes: [
      {
        name: 'auth',
        path: '/auth/verify',
        component: './auth/verify',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/task',
  },
  {
    component: './404',
  },
];
