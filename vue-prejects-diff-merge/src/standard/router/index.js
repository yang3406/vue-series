import Vue from "vue";
import Router from "vue-router";
import { Indicator } from 'mint-ui';
import store from '../store';
import { CHANGE_SHOWBAR, CHANGE_MEBINFO } from '../store/mutation-types';
import { getLocalStroe, isNullorEmpty } from '../common/js/util';

Vue.use(Router);

import { routes } from "./routes";

const router = new Router({
  mode: 'history', //去掉路径中的#
  routes,
});

/*自动登录 */
const _autoLogin = (username, password) => {
  store.commit(CHANGE_MEBINFO, {});
};

/* 全局路由钩子 */
router.beforeEach((to, from, next) => {
  Indicator.close();

  //设置标题
  to.meta.title ? document.title = to.meta.title : document.title = "";

  //是否显示footer菜单
  to.meta.isShowBar ? store.commit(CHANGE_SHOWBAR, true) : store.commit(CHANGE_SHOWBAR, false);

  //避免陷入死循环
  if (to.path === "/login") {
    next();
    return;
  };

  if (store.getters.getIsLogin) {
    //已经登录
    next();
  } else {
    let username = getLocalStroe("username");
    let password = getLocalStroe("password");
    //自动登录
    if (!isNullorEmpty(username) && !isNullorEmpty(password)) {
      _autoLogin(username, password);
    }

    //可能自动登录成功了 判断是否需要登录权限
    if (!store.getters.getIsLogin) {
      if (to.matched.some(m => m.meta.isAuth)) {
        //未登录 且需要登录权限
        next('/login');
      } else {
        next();
      }
    } else {
      next();
    };
  };

});

export default router;
