import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

interface State {
  isShowBar: boolean,
  mebid: string,
}

let state: State = {
  isShowBar: false,//是否显示底部menu
  mebid: '', //用户mebid  有就代表已经登录
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
