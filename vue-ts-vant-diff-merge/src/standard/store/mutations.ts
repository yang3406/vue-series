import * as types from './mutation-types';
//import Storages from '@/standard/common/js/storages';
import Storages from '../common/js/storages';

export default {
  [types.CHANGE_SHOWBAR](state: any, boolean: boolean) {
    state.isShowBar = boolean;
  },
  [types.CHANGE_MEBINFO](state: any, userInfoObj: object) {
    //if (userInfoObj && userInfoObj.mebid) {
    if (userInfoObj) {
      let mebid = "wrw";
      //let mebid = userInfoObj.mebId || userInfoObj.mebid;
      state.mebid = mebid;
      Storages.sessionStorage.set("mebid", mebid);
      Storages.cookie.set('u', mebid); //cookie存储用户id
      //退出登录
    } else {
      state.mebid = "";
      Storages.sessionStorage.set("mebid", "");
      Storages.cookie.set('u', "");
    }
  }
}