import Vue from 'vue';
import store from './store';
import App from './App';
import router from './router';
import FastClick from 'fastclick';
//用淘宝的lib-flexible做移动端自适应
import 'lib-flexible';
//重置样式
import './common/css/reset.scss';

//处理移动端300ms延迟
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
};

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
