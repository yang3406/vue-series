import Vue from "vue";
import Router from "vue-router";
import { Indicator } from 'mint-ui';
import store from '../store';
import { CHANGE_SHOWBAR } from '../store/mutation-types';
Vue.use(Router);

import { routes } from "./routes";

const router = new Router({
  mode: 'history', //去掉路径中的#
  routes,
  //base: '/embedh5/',   //正式环境会有问题
  //记录缓存位置
  scrollBehavior(to, from, savedPosition) {
    //浏览器自带的返回 上个页面保持原有位置
    if (savedPosition) {
      return savedPosition;
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 1 });
      }, 0);
    });
  }
});

/* 全局路由钩子 */
router.beforeEach((to, from, next) => {
  Indicator.close();

  //设置标题
  to.meta.title ? document.title = to.meta.title : document.title = "";

  //是否显示footer菜单
  to.meta.isShowBar ? store.commit(CHANGE_SHOWBAR, true) : store.commit(CHANGE_SHOWBAR, false);

  //避免陷入死循环
  if (to.path.startsWith("/useraccount")) {
    next();
    return;
  };
  if (store.getters.getmebID) {
    //已经登录
    next();
  } else {
    if (to.matched.some(m => m.meta.isAuth)) {
      //未登录 且需要登录权限
      next('/useraccount/login');
    } else {
      next();
    }
  };
});

export default router;
