import _import from './_import';

export const routes = [
  // keepAlive是否需要被缓存 title页面标题 isAuth是否需要登录  isShowBar是否显示底部菜单
  { path: '/', redirect: '/home' },
  { path: '/home', component: _import('home'), meta: { keepAlive: true, isAuth: false, isShowBar: true } },// 首页
  { path: '/useraccount/:id', component: _import('useraccount'), meta: { keepAlive: true, isAuth: false, isShowBar: false } },// 登录 id:login登录 register注册 forget忘记密码
  { path: '/userprotocol', component: _import('userprotocol'), meta: { keepAlive: true, isAuth: false, isShowBar: false } },// 登录 提示许可内容
  { path: '/art', component: _import('art'), meta: { keepAlive: false, isAuth: false, isShowBar: false } }
];
