import { Mutation } from 'vuex';
import Vue from "vue";
import Router from "vue-router";
import store from '../store/index'
import * as types from '../store/mutation-types';

Vue.use(Router);

import { routes } from "./routes";
import { Promise } from "core-js";

const router = new Router({
  mode: 'history', //去掉项目中的#
  routes,
  scrollBehavior(to, from, savedPosition) {
    //浏览器的自带返回的上个页面 保持原有位置
    if (savedPosition) {
      return savedPosition;
    }
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 0);
    })
  }
});
//登录成功或者是进入登录页面
if (store.getters.mebid)
  router.beforeEach((to, from, next) => {
    //设置title
    to.meta.title ? document.title = to.meta.title : document.title = "";

    //是否显示footer menu框
    to.meta.showFooterBar ? store.commit(types.CHANGE_SHOWBAR, true) : store.commit(types.CHANGE_SHOWBAR, false);

    //判断是否登录 和是否需要登录 避免进入用户 进入死循环 
    if (!store.getters.getMebId && to.meta.auth) {
      //避免进入用户 进入死循环
      if (to.path.indexOf("/useraccount") != -1) {
        next();
      } else {
        next('/useraccount/login');
      }
    } else {
      next();
    }
  })



export default router;
