import _import from './_import';

export const routes = [
  {
    path: '*',
    component: _import('notmatch'),
    meta: { title: "功能未开放", isAuth: true, isShowLogo: false, isShowMenu: false }
  },
  {
    path: '/useraccount',
    component: _import("useraccount"),
    meta: { isAuth: false, isShowLogo: false },
    children: [
      {
        path: 'login',
        component: _import("useraccount/login"),
        meta: { title: '用户登录', isAuth: false, isShowLogo: false },
      },
      {
        path: 'register',
        component: _import("useraccount/register"),
        meta: { title: '用户注册', isAuth: false, isShowLogo: false },
      }, {
        path: 'protocol',
        component: _import("useraccount/protocol"),
        meta: { title: "用户协议", isAuth: false, isShowLogo: false }
      }
    ]
  },
  {
    path: '/',
    redirect: '/gotopark'
  },
  {
    path: '/gotopark',
    component: _import('gotopark'),
    meta: { title: '去停车', isAuth: true, isShowLogo: false },
  },
];
