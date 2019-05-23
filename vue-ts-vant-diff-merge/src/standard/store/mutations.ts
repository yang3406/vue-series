import * as types from './mutation-types';
//import Storages from '@/standard/common/js/storages';
import Storages from '../common/js/storages';
import { MutationTree } from 'vuex';

const mutations: MutationTree<any> = {
  [types.CHANGE_SHOWLOGO](state: any, boolean: boolean): void {
    state.isShowBar = boolean;
  },
  [types.CHANGE_SHOWMENU](state: any, boolean: boolean): void {
    state.isShowBar = boolean;
  },
  [types.CHANGE_MEBINFO](state: any, userInfoObj: object): void {
    //if (userInfoObj && userInfoObj.mebid) {
    if (userInfoObj) {
      let mebid = "";
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

export default mutations;