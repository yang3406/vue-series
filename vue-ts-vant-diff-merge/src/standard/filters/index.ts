/*
 * @Author: yangjs 
 * @Date: 2019-04-18 15:24:54 
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-04-18 17:53:40
 */
import { isNullorEmpty } from '@standard/common/js/util.js';
/* 增加千分点 */
let addComma = value => {
  let number = value;
  if (isNullorEmpty(number) || Number.parseFloat(number) == 0) {
    return "0.00";
  }
  var num = number + "";
  num = num.replace(new RegExp(",", "g"), "");
  // 正负号处理
  var symble = "";
  if (/^([-+]).*$/.test(num)) {
    symble = num.replace(/^([-+]).*$/, "$1");
    num = num.replace(/^([-+])(.*)$/, "$2");
  }
  if (/^[0-9]+(\.[0-9]+)?$/.test(num)) {
    var num = num.replace(new RegExp("^[0]+", "g"), "");
    if (/^\./.test(num)) {
      num = "0" + num;
    }
    var decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, "$1");
    var integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, "$1");
    decimal = isNullorEmpty(decimal) ? ".00" : decimal;
    var re = /(\d+)(\d{3})/;
    while (re.test(integer)) {
      integer = integer.replace(re, "$1,$2");
    }
    return symble + integer + decimal;
  } else {
    return number;
  }
};

export { addComma };
