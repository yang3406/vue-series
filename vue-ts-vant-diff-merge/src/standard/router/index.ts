import Vue from "vue";
import Router from "vue-router";
import store from '../store';
import { CHANGE_SHOWLOGO, CHANGE_SHOWMENU } from '../store/mutation-types';
import { Toast } from 'vant';

Vue.use(Router);

import { routes } from "./routes";

const router = new Router({
  mode: 'history',
  routes,
  /* 记录缓存位置 */
  scrollBehavior(to, from, savedPosition) {
    //浏览器自带的返回页面 回到原来地方
    if (savedPosition) {
      return savedPosition;
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ x: 0, y: 0 });
        }, 0);
      });
    }
  }
});

/* 全局路由钩子 */
router.beforeEach((to, from, next) => {
  Toast.clear();

  //设置标题
  document.title = to.meta.title ? to.meta.title : "";

  //是否显示文字logo
  to.meta.isShowLogo ? store.commit(CHANGE_SHOWLOGO, true) : store.commit(CHANGE_SHOWLOGO, false);
  //是否显示底部menu
  to.meta.isShowMenu ? store.commit(CHANGE_SHOWMENU, true) : store.commit(CHANGE_SHOWMENU, false);

  //避免陷入死循环 进入登录注册页面
  /* if (to.meta.startWith("/useraccount")) {
    next();
    return;
  } */

  console.log(store.getters.getMebId + "==mebid");

  if (store.getters.getMebId) {
    //已登录
    next();
  } else {
    if (to.matched.some(m => m.meta.isAuth)) {
      //未登录 且需要登录权限
      next('/useraccount/login');
    } else {
      next();
    }
  }

});

export default router;
