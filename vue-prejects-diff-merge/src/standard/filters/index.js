/*
 * @Author: yangjs 
 * @Date: 2018-12-20 11:30:33 
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-01-23 20:02:19
 */
import { isNullorEmpty } from '@standard/common/js/util.js';

/* 全局过滤器 */
/* 把时间戳转为 2018-10-03 07:00:00格式 */
let timestampFormat = value => {
  if (isNullorEmpty(value)) {
    return "";
  };
  var int = new Date();
  int.setTime(value);
  var theMonths = (int.getMonth() + 1) < 10 ? ('0' + (int.getMonth() + 1)) : (int.getMonth() + 1);
  var theDates = (int.getDate()) < 10 ? ('0' + int.getDate()) : (int.getDate());
  var theHours = (int.getHours()) < 10 ? ('0' + int.getHours()) : (int.getHours());
  var theMinutes = (int.getMinutes()) < 10 ? ('0' + int.getMinutes()) : (int.getMinutes());
  var theSecends = (int.getSeconds()) < 10 ? ('0' + int.getSeconds()) : (int.getSeconds());
  return int.getFullYear() + '-' + theMonths + '-' + theDates + ' ' + theHours + ':' + theMinutes + ':' + theSecends;
};

/* 把秒转为00时:00分:00秒 名字取错了*/
let secondToDate = value => {
  value = Math.abs(value || 0);
  let s = value;
  var t;
  if (s > -1) {
    var hour = Math.floor(s / 3600);
    var min = Math.floor(s / 60) % 60;
    var sec = s % 60;
    if (hour < 10) {
      t = '0' + hour + ":";
    } else {
      t = hour + ":";
    }

    if (min < 10) { t += "0"; }
    t += min + ":";
    if (sec < 10) { t += "0"; }
    t += sec;
    //t += sec.toFixed(2);
  }
  return t;
};

/* 把秒转为 d天h小时m分 */
let secondsToDayTime = value => {
  let str = "";
  value = parseInt(value / 60);
  let m = value % 60;
  value = parseInt(value / 60);
  let h = value % 24;
  value = parseInt(value / 24);
  let d = value;
  if (d > 0) {
    str = d + "天" + h + "小时" + m + "分";
  } else if (h > 0) {
    str = h + "小时" + m + "分";
  } else {
    str = m + "分";
  }
  return str;
};

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

//分隔车牌  例如把新A67893 分成 新A·67893
let splitCarNum = value => {
  if (isNullorEmpty(value)) {
    return "";
  };
  let carArr = value.split("");
  carArr.splice(2, 0, ' · ');
  return carArr.join("");
};

export { timestampFormat, addComma, splitCarNum, secondToDate, secondsToDayTime };
