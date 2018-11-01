import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  isLogin: false, //是否登录
  isShowBar: false,//是否显示底部menu
  mebid: '', //用户mebid
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
