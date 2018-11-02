import _import from './_import';

export const routes = [
  // keepAlive是否需要被缓存 title页面标题 isAuth是否需要登录  isShowBar是否显示底部菜单
  { path: '/', redirect: '/home' },
  { path: '/home', component: _import('home'), meta: { keepAlive: true, isAuth: true, isShowBar: false } },// 首页
  { path: '/useraccount/:id', component: _import('login'), meta: { keepAlive: true, isAuth: false, isShowBar: false } },// 登录 id:login登录 register注册 forget忘记密码
  { path: '/useraccount/:id/userprotocol', component: _import('userprotocol'), meta: { keepAlive: false, isAuth: false, isShowBar: false } },// 登录 提示许可
  { path: '/forget', component: _import('forget'), meta: { keepAlive: false, isAuth: false, isShowBar: false } },// 忘记密码
  { path: '/art', component: _import('art'), meta: { keepAlive: false, isAuth: false, isShowBar: false } },
  { path: '/userprotocol', component: _import('userprotocol'), meta: { keepAlive: false, isAuth: false, isShowBar: false } },
];
