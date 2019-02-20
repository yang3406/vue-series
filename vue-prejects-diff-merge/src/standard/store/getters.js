import Storages from '@standard/common/js/storages.js';

//判断是否登录 u就是mebid
export const getmebID = state => {
  return (state.mebid || Storages.sessionStorage.get("mebid") || Storages.cookie.get("u") || ''); //本地保存了"u"默认已经登录
  //
};

//获取昵称
export const getNickName = state => {
  return state.nickname || Storages.sessionStorage.get("nickname") || '';
};

//获取手机号码
export const getTelPho = state => {
  return state.telpho || Storages.sessionStorage.get("telpho") || '';
};

//获取头像地址
export const getAvatarIco = state => {
  return state.avatarIconUrl || Storages.sessionStorage.get("avatarIconUrl");
};
