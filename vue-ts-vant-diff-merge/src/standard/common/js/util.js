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

//去除所有的空格
export const trimAll = function () {
  return this.replace(/\s*/, g);
};
