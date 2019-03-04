import * as types from './mutation-types';
import Storages from '@standard/common/js/storages.js';

export default {
  //设置底部bar是否显示
  [types.CHANGE_SHOWBAR](state, boolean) {
    state.isShowBar = boolean;
  },
  /* 数值home图片轮循 */
  [types.ADD_BANNERIMG](state, barnnerobj) {
    state.topbanner = barnnerobj.topbanner || [];
    state.bottombanner = barnnerobj.bottombanner || [];
  },
  //登录或退出登录 设置登录状态
  [types.CHANGE_MEBINFO](state, userInfoObj) {
    if ((userInfoObj) && (userInfoObj.mebId || userInfoObj.mebid)) {
      let mebid = userInfoObj.mebId || userInfoObj.mebid;
      state.mebid = mebid;
      Storages.sessionStorage.set("mebid", mebid);
      Storages.cookie.set('u', mebid); //cookie存储用户id
    } else {
      //退出登录
      state.mebid = "";
      Storages.sessionStorage.set("mebid", "");
      sessionStorage.clear();
      Storages.sessionStorage.clear();
      Storages.cookie.clear(); //cookie删除存储用户id
    }
  },
  //电话号码 
  [types.CHANGE_TELNO](state, telno) {
    state.telpho = telno;
    Storages.sessionStorage.set("telpho", telno);
  },
  //昵称
  [types.CHANGE_NICKNAME](state, nickname) {
    state.nickname = nickname;
    Storages.sessionStorage.set("nickname", nickname);
  },
  //头像地址
  [types.CHANGE_AVATARICONURL](state, avatarIconUrl) {
    state.avatarIconUrl = avatarIconUrl;
    Storages.sessionStorage.set("avatarIconUrl", avatarIconUrl);
  },

  //增加车牌
  /*  addCarNum(state, carObj) {
     state.carnumList.push({ carnum: carObj.carNumber, isemergy: carObj.carType });
   }, */
  //删除车牌
  /*  deleteCarNum(state, carnum) {
     state.carnumList.splice(state.carnumList.findIndex(item => item.carnum === carnum), 1);
   }, */
  //修改用户所在的经纬度
  [types.CHANGE_LOCATION](state, locationObj) {
    state.lng = locationObj.lng;
    state.lat = locationObj.lat;
  },
  //修改用户目标地的经纬度
  [types.CHANGE_AIMLOCATION](state, locationObj) {
    state.aimlng = locationObj.aimlng;
    state.aimlat = locationObj.aimlat;
  }
};
