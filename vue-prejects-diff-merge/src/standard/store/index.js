import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  isLogin: false, //是否登录
  isShowBar: false,//是否显示底部menu
  activeIndex: 1, //footer底部选中样式
  mebid: '', //用户mebid
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  carnumList: [
    { carnum: '新A12341', isemergy: false },
    { carnum: '新B12342', isemergy: true },
    { carnum: '新A12343', isemergy: false },
    { carnum: '新B12344', isemergy: true },
    { carnum: '新A12345', isemergy: false },
  ],
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
