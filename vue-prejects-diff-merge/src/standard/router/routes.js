import _import from './_import';

export const routes = [
  // keepAlive是否需要被缓存 title页面标题 isAuth是否需要登录  isShowBar是否显示底部菜单
  { path: '/', redirect: '/home' },
  { path: '/home', component: _import('home'), meta: { keepAlive: false, isAuth: true, isShowBar: false } },// 首页
  { path: '/login', component: _import('login'), meta: { keepAlive: false, isAuth: false, isShowBar: false } },// 登录
  { path: '/forget', component: _import('forget'), meta: { keepAlive: false, isAuth: false, isShowBar: false } },// 忘记密码
  { path: '/art', component: _import('art'), meta: { keepAlive: false, isAuth: false, isShowBar: false } },
];
