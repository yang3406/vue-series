import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  isShowBar: false,//是否显示底部menu
  activeIndex: 1, //footer底部选中样式
  mebid: '', //用户mebid  有就代表已经登录
  nickname: '', //昵称
  telpho: '',//手机号码
  avatarIconUrl: '',//头像地址
  lng: '', // 当前位置经度
  lat: '', // 当前位置纬度
  aimlng: '',//目的地位置经度度
  aimlat: '',//目的地位置纬度
  topbanner: [],//顶部轮循广告图片 
  bottombanner: [{ imgurl: '' }] //底部广告图片
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
