import * as types from './mutation-types';
import { setSessionStroe, removeSessionStore } from '@standard/common/js/util.js';

export default {
  //设置底部bar是否显示
  [types.CHANGE_SHOWBAR](state, boolean) {
    state.isShowBar = boolean;
  },
  //登录或退出登录 设置登录状态
  [types.CHANGE_MEBINFO](state, userInfoObj) {
    if (userInfoObj && userInfoObj.mebid) {
      state.isLogin = true;
      setSessionStroe("isLogin", true);
      state.mebid = userInfoObj.mebid;
      setSessionStroe("mebid", state.mebid);
    } else {
      state.isLogin = false;
      removeSessionStore("isLogin");
      state.mebid = "";
      removeSessionStore("mebid");
    }
  }
};
