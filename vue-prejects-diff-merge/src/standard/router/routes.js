import _import from './_import';

export const routes = [
  // keepAlive是否需要被缓存 title页面标题 isAuth是否需要登录  isShowBar是否显示底部菜单 
  //footerActivedItem footer激活tab样式 home首页  nearby附近 mine我的
  //路由不匹配时
  {
    path: '*',
    component: _import('notmatch'),
  },
  { path: '/', redirect: '/home' },
  {
    // 首页
    path: '/home',
    component: _import('home'),
    meta: { keepAlive: false, isAuth: false, isShowBar: true, footerActivedItem: 'home' }
  },
  {
    // 登录 id:login登录 register注册 forget忘记密码
    path: '/useraccount/:id',
    component: _import('useraccount'),
    meta: { keepAlive: true, isAuth: false, isShowBar: false }
  },
  {
    // 登录 提示许可内容
    path: '/userprotocol',
    component: _import('userprotocol'),
    meta: { keepAlive: true, isAuth: false, isShowBar: false }
  },
  {
    //附近停车场 百度地图
    path: '/nearby',
    component: _import('nearby'),
    meta: { keepAlive: false, isAuth: false, isShowBar: true, footerActivedItem: 'nearby' }
  },
  {
    //我的
    path: '/mine',
    component: _import('mine'),
    meta: { keepAlive: true, isAuth: false, isShowBar: true, footerActivedItem: 'mine' },
  },
  {
    path: '/mine/info', //个人详情页
    component: _import('mine/info'),
    meta: { keepAlive: false, isAuth: false, title: '个人信息' },
  },
  {
    path: '/mine/nickname', //修改用户名
    component: _import('mine/nickname'),
    meta: { keepAlive: false, isAuth: false, title: '修改昵称' },
  },
  {
    path: '/mine/changesecret', //修改密码
    component: _import('mine/changesecret'),
    meta: { keepAlive: false, isAuth: false, title: '修改密码' },
  },
  {
    path: '/mywallet',//我的钱包
    component: _import('mywallet'),
    meta: { keepAlive: false, isAuth: false, isShowBar: false }
  },
  {
    path: '/fastrecharge', //快速充值
    component: _import('fastrecharge'),
    meta: { keepAlive: false, isAuth: false, isShowBar: false }
  },
  {
    path: '/coupon', //我的优惠券
    component: _import('coupon'),
    meta: { keepAlive: false, isAuth: false, isShowBar: false }
  },
  {
    path: '/carnum', //我的车牌
    component: _import('carnum'),
    meta: { keepAlive: false, isAuth: false, isShowBar: false }
  },
  {
    path: '/carnum/addcarnum', //新增车牌
    component: _import('carnum/addcarnum'),
    meta: { keepAlive: false, isAuth: false, isShowBar: false }
  },
  {
    path: '/orderrecord',//定单记录  从详情页返回才保存
    component: _import('orderrecord'),
    meta: { keepAlive: false, isAuth: false, isShowBar: false, title: '定单记录' }
  },
  {
    path: '/orderrecord/detail',//定单详情
    component: _import('orderrecord/detail'),
    meta: { keepAlive: false, isAuth: false, isShowBar: false, title: '定单详情' }
  },
  {
    path: '/feedback',//意见反馈
    component: _import('feedback'),
    meta: { keepAlive: false, isAuth: false, isShowBar: false, title: '意见反馈' }
  },
  {
    path: '/aboutus',//关于我们
    component: _import('aboutus'),
    meta: { keepAlive: false, isAuth: false, isShowBar: false, title: '关于我们' }
  },
  {
    path: '/guide',//指南
    component: _import('guide'),
    meta: { keepAlive: false, isAuth: false, isShowBar: false, title: '使用指南' }
  },
];
