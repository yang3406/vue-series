/**
 * @Author: yangjiansu
 * @Date:   2018/10/24
 * @功能：公用方法
 */

export const isNullorEmpty = (str) => {
  if ((str == null || str == "null" || str == "" || str == " " || str == undefined || str == "undefined") && (str != 0 || str != "0"))
    return true;
  else
    return false;
};

//localStorage 相关操作
export const setStroe = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  } else {
    content = escape(content);
  }
  window.localStorage.setItem(name, content); //设置缓存
};

export const getStore = name => { //读取缓存
  if (!name) return;
  window.localStorage.getItem(name);
};

export const removeStore = name => { //移除某个缓存
  if (!name) return;
  window.localStorage.removeItem(name);
};

export const clearStore = () => { //清除所有缓存
  window.localStorage.clear();
};

//去除所有的空格
export const trimAll = function () {
  return this.replace(/\s*/, g);
};
