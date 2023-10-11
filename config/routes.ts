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
    name: 'Task',
    icon: 'BarsOutlined',
    component: './Task',
  },
  {
    path: '/file',
    name: 'File',
    icon: 'FolderOpenOutlined',
    component: './File',
  },
  {
    path: '/config',
    name: 'Config',
    icon: 'form',
    component: './Config',
  },
  {
    path: '/account',
    name: 'Account',
    icon: 'user',
    component: './File',
  },
  {
    path: '/',
    redirect: '/task',
  },
  {
    component: './404',
  },
];
