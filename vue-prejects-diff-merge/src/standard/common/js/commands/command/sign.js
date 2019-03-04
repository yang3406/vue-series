/*
 * @Author: WangQiBiao
 * @Date: 2018-02-26 10:38:41
 * @Last Modified by: WangTao
 * @Last Modified time: 2018-07-11 16:03:12
 */
import Md5 from './md5';
import * as Utils from './utils';
/**
 * sign参数
 *
 * @export
 * @param {any} params
 * @param {any} sync 同步异步请求 true=异步，false=同步
 */
export default function requestSign(params, defaultConfig) {
  return Md5(paramsEncode(params) + '&requestKey=' + defaultConfig.config.requestKey);
}
/**
 * 参数排序
 *
 * @param {any} cmdObj
 * @returns
 */
function paramsSort(cmdObj) {
  //要排序数组
  let keyArr = [];
  for (let variable in cmdObj) {
    if (cmdObj.hasOwnProperty(variable)) {
      keyArr.push(variable);
    }
  }
  //排序后新数组
  let newSortArray = Utils.arraySort(keyArr);
  return newSortArray;
}
/**
 * 参数编码并返回拼接好的字符串
 *
 * @param {any} cmdObj
 * @returns
 */
function paramsEncode(cmdObj) {
  let keyArr = paramsSort(cmdObj);
  let arr = [];
  for (let i = 0; i < keyArr.length; i++) {
    let item = keyArr[i];
    arr.push(encodeURIComponent(item) + '=' + encodeURIComponent(cmdObj[item]));
  }
  return arr.join('&');
}
