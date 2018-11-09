import _import from './_import';

export const routes = [
  // keepAlive是否需要被缓存 title页面标题 isAuth是否需要登录  isShowBar是否显示底部菜单 
  //footerActivedItem footer激活tab样式 home首页  nearby附近 mine我的
  { path: '/', redirect: '/home' },
  { path: '/home', component: _import('home'), meta: { keepAlive: true, isAuth: false, isShowBar: true, footerActivedItem: 'home' } },// 首页
  { path: '/useraccount/:id', component: _import('useraccount'), meta: { keepAlive: true, isAuth: false, isShowBar: false } },// 登录 id:login登录 register注册 forget忘记密码
  { path: '/userprotocol', component: _import('userprotocol'), meta: { keepAlive: true, isAuth: false, isShowBar: false } },// 登录 提示许可内容
  { path: '/art', component: _import('art'), meta: { keepAlive: false, isAuth: false, isShowBar: false } },
  { path: '/nearby', component: _import('nearby'), meta: { keepAlive: false, isAuth: false, isShowBar: false } }, //附近停车场 百度地图
  { path: '/mine', component: _import('mine'), meta: { keepAlive: false, isAuth: false, isShowBar: true, footerActivedItem: 'mine' } },   //我的
  { path: '/mywallet', component: _import('mywallet'), meta: { keepAlive: false, isAuth: false, isShowBar: false } },   //我的钱包

];
