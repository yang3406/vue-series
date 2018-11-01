/**
 * @Author: yangjiansu
 * @Date:   2018/10/24
 * @功能：公用方法
 */
import config from './config';

export const isNullorEmpty = (str) => {
  if ((str == null || str == "null" || str == "" || str == " " || str == undefined || str == "undefined") && (str != 0 || str != "0"))
    return true;
  else
    return false;
};

//sessionStorage 相关操作
export const setSessionStroe = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  } else {
    content = escape(content);
  }
  window.sessionStorage.setItem(config.appId + name, content); //设置缓存
};

export const getSessionStroe = name => { //读取缓存
  if (!name) return;
  window.sessionStorage.getItem(config.appId + name);
};

export const removeSessionStore = name => {
  if (!name) return;
  window.sessionStorage.removeItem(config.appId + name);
};
//localStorage 相关操作
export const setLocalStroe = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  } else {
    content = escape(content);
  }
  window.localStorage.setItem(config.appId + name, content); //设置缓存
};

export const getLocalStroe = name => { //读取缓存
  if (!name) return;
  window.localStorage.getItem(config.appId + name);
};

export const removeLocalStroe = name => {
  if (!name) return;
  window.localStorage.removeItem(config.appId + name);
};

//去除所有的空格
export const trimAll = function () {
  return this.replace(/\s*/, g);
};
