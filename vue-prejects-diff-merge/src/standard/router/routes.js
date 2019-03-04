import _import from './_import';

export const routes = [
  // keepAlive是否需要被缓存(已经没用了 用vue-navigation控制)  title页面标题 isAuth是否需要登录  isShowBar是否显示底部菜单 
  //footerActivedItem footer激活tab样式 home首页  nearby附近 mine我的
  //路由不匹配时
  {
    path: '*',
    component: _import('notmatch'),
    meta: { keepAlive: true, isAuth: false }
  },
  { path: '/', redirect: '/home' },
  {
    // 首页  keepAlive 启动方法放在activated中
    path: '/home',
    component: _import('home'),
    meta: { keepAlive: true, isAuth: false, isShowBar: true, footerActivedItem: 'home', title: '' }
  },
  {
    // 登录 login登录 register注册 forget忘记密码
    path: '/useraccount',
    component: _import('useraccount'),
    meta: { keepAlive: true, isAuth: false, isShowBar: false },
    children: [{
      path: 'login',
      component: _import('useraccount/login'),
      meta: { keepAlive: true, isAuth: false, isShowBar: false },
    },
    {
      path: 'register',
      component: _import('useraccount/register'),
      meta: { keepAlive: false, isAuth: false, isShowBar: false },
    },
    {
      path: 'forgetsecret',
      component: _import('useraccount/forgetsecret'),
      meta: { keepAlive: false, isAuth: false, isShowBar: false },
    },
    {
      path: 'resetpwd',
      component: _import('useraccount/resetpwd'),
      meta: { keepAlive: false, isAuth: false, isShowBar: false },
    },
    {
      // 登录 提示许可内容
      path: 'protocol',
      component: _import('useraccount/protocol'),
      meta: { keepAlive: true, isAuth: false, isShowBar: false }
    }
    ]
  },
  {
    //附近停车场 百度地图
    path: '/nearby',
    component: _import('nearby'),
    meta: { keepAlive: true, isAuth: false },
    children: [
      {
        path: 'overview',
        component: _import('nearby/overview'), //地图显示总览
        meta: { keepAlive: false, isAuth: false, isShowBar: true, footerActivedItem: 'nearby' },
      },
      {
        path: 'routemapguide',  //路线地图指引
        component: _import('nearby/routemapguide'),
        meta: { keepAlive: true, isAuth: false, isShowBar: false },
      },
      { //暂未用到
        path: 'routetextguide',  //路线文字指引
        component: _import('nearby/routetextguide'),
        meta: { keepAlive: true, isAuth: false, isShowBar: false },
      }
    ]
  },
  {
    //我的  keepAlive:true 启动方法放在activated中
    path: '/mine',
    component: _import('mine'),
    meta: { keepAlive: true, isAuth: false, isShowBar: true, footerActivedItem: 'mine' },
  },
  {
    path: '/mine/info', //个人详情页
    component: _import('mine/info'),
    meta: { keepAlive: false, isAuth: true, title: '个人信息' },
  },
  {
    path: '/mine/nickname', //修改用户名
    component: _import('mine/nickname'),
    meta: { keepAlive: false, isAuth: true, title: '修改昵称' },
  },
  {
    path: '/mine/changesecret', //修改密码
    component: _import('mine/changesecret'),
    meta: { keepAlive: false, isAuth: true, title: '修改密码' },
  },
  {
    path: '/mywallet',//我的钱包
    component: _import('mywallet'),
    meta: { keepAlive: false, isAuth: true, isShowBar: false }
  },
  /* {
    path: '/fastrecharge', //快速充值
    component: _import('fastrecharge'),
    meta: { keepAlive: false, isAuth: true, isShowBar: false }
  }, */
  {
    path: '/coupon', //我的优惠券
    component: _import('coupon'),
    meta: { keepAlive: false, isAuth: true, isShowBar: false }
  },
  {
    path: '/carnum', //我的车牌
    component: _import('carnum'),
    meta: { keepAlive: false, isAuth: true, isShowBar: false }
  },
  {
    path: '/carnum/addcarnum', //新增车牌
    component: _import('carnum/addcarnum'),
    meta: { keepAlive: false, isAuth: true, isShowBar: false }
  },
  {
    path: '/orderrecord',
    component: _import('orderrecord'),
    meta: { keepAlive: true, isAuth: true, isShowBar: false, title: '订单记录' },
    children: [
      {
        path: 'list', //订单记录 
        component: _import('orderrecord/list'),
        meta: { keepAlive: true, isAuth: true, isShowBar: false, title: '订单记录' },
      },
      {
        name: 'orderrecorddetail',
        path: 'detail', //订单详情
        component: _import('orderrecord/detail'),
        meta: { keepAlive: false, isAuth: true, isShowBar: false, title: '订单详情' },
      },
    ]
  },
  //我的月卡
  {
    path: '/monthcard',
    component: _import('monthcard'),
    meta: { keepAlive: true, isAuth: true, isShowBar: false, title: '月卡' },
    children: [
      {
        path: 'list', //月卡列表
        component: _import("monthcard/list"),
        meta: { keepAlive: false, isAuth: true, isShowBar: false, title: '月卡' },
      },
      {
        path: 'fillmessage', //办理月卡 填充相关信息
        component: _import("monthcard/handle/fillmessage"),
        meta: { keepAlive: false, isAuth: true, isShowBar: false, title: '办理月卡' },
      },
      {
        path: 'showmessage', //展示办理月卡信息
        component: _import("monthcard/handle/showmessage"),
        meta: { keepAlive: false, isAuth: true, isShowBar: false, title: '办理月卡' },
      },
    ]
  },
  //停车缴费
  {
    path: '/parkingpay',
    component: _import('parkingpay'),
    meta: { isAuth: true, isShowBar: false },
    children: [
      {
        path: 'list',
        component: _import('parkingpay/list'), //停车缴费列表
        meta: { isAuth: true, isShowBar: false, title: '停车缴费' },
      },
      {
        path: 'detail',
        component: _import('parkingpay/detail'), //缴费详情
        meta: { isAuth: true, isShowBar: false, title: '停车缴费详情' },
      }
    ]
  },
  //停车场
  {
    path: '/parkinglot',
    component: _import('parkinglot'),
    meta: { keepAlive: true, isAuth: false, isShowBar: false },
    children: [
      {
        path: 'list',
        component: _import('parkinglot/list'), //停车场列表
        meta: { keepAlive: true, isAuth: false, isShowBar: false },
      }, {
        path: 'detail',
        component: _import('parkinglot/detail'), //停车场详情
        meta: { keepAlive: false, isAuth: false, isShowBar: false },
      }
    ]
  },
  {
    path: '/feedback',//意见反馈
    component: _import('feedback'),
    meta: { keepAlive: false, isAuth: true, isShowBar: false, title: '意见反馈' }
  },
  {
    path: '/aboutus',//关于我们
    component: _import('aboutus'),
    meta: { keepAlive: true, isAuth: false, isShowBar: false, title: '关于我们' }
  },
  {
    name: 'searchplot',
    path: '/searchplot',//搜索停车场
    component: _import('searchplot'),
    meta: { keepAlive: false, isAuth: false, isShowBar: false, title: '' }
  },
  {
    path: '/payment',//支付
    component: _import('payment'),
    meta: { keepAlive: false, isAuth: true, isShowBar: false, title: '' },
    children: [
      {
        path: 'payway', //选择支付方式
        component: _import('payment/payway'),
        meta: { keepAlive: false, isAuth: true, isShowBar: false, title: '订单支付' },
      },
      {
        path: 'paysuccess', //支付成功
        component: _import('payment/paysuccess'),
        meta: { keepAlive: false, isAuth: true, isShowBar: false, title: '支付详情' },
      }
    ]
  },
];
