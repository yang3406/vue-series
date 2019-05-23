import Vue from 'vue';
import * as  Vant from 'vant';
import * as FastClick from 'fastclick';
import router from './router';
import store from './store';
import App from './App.vue';
/* import Navigation from 'vue-navigation';//控制路由前进后退效果 */
import { globalFilters } from './filters/index';
import 'vant/lib/index.css';
//用淘宝的lib-flexible做移动端自适应
import 'lib-flexible/flexible.js';

Vue.config.productionTip = false;

//处理移动端300ms延迟
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
};

Vue.use(Vant);

//Vue.use(Navigation, { router, store });//用Navigation会向 store注册一个Module 管理前进后退

//全局注入filter
Object.keys(globalFilters).forEach(key => {
  Vue.filter(key, globalFilters[key]);
});

/* eslint-disable no-new */
const app: Vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

export default app;
