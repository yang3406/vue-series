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

/**
 * 
 * @param {*} latitude  现在位置纬度
 * @param {*} longitude  现在位置经度
 * @param {*} aimlatitude  目的地位置纬度
 * @param {*} aimlongitude 目的地位置经度
 */
export const openmapGuide = function (latitude, longitude, aimlatitude, aimlongitude) {
  let path =
    'http://api.map.baidu.com/direction?origin=latlng:' +
    latitude +
    ',' +
    longitude +
    '|name:你的位置&destination=latlng:' +
    aimlongitude +
    ',' +
    aimlatitude +
    '|name:目的地&mode=driving&region=深圳&output=html&src=webapp.baidu.openAPIdemo';
  window.location.href = path;
};
