import Vue from 'vue';
import store from './store';
import App from './App';
import router from './router';
import FastClick from 'fastclick';
import MintUi from 'mint-ui';
import Navigation from 'vue-navigation';//使用vue-navigation做缓存和控制前进后退
import 'mint-ui/lib/style.css';
//用淘宝的lib-flexible做移动端自适应
import 'lib-flexible';
//重置样式
import './common/css/reset.scss';
import * as globalFilters from '@standard/filters';

//处理移动端300ms延迟
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
};

Object.keys(globalFilters).forEach(key => {
  Vue.filter(key, globalFilters[key]);
});

Vue.use(MintUi); //全局注入 在.vue中可以用this.$message()调用

Vue.use(Navigation, { router, store });//用Navigation会向 store注册一个Module 管理前进后退

Vue.config.productionTip = false; //阻止vue相关提示

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
