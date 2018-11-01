import { getSessionStroe, isNullorEmpty } from '../common/js/util.js';

//判断是否登录
export const getIsLogin = state => {
  return (state.isLogin || getSessionStroe("isLogin")) && (!isNullorEmpty(state.mebid) || getSessionStroe("mebid"));
};

//获取mebid
export const getMebID = state => {
  return state.mebid || getSessionStroe("mebid");
};
