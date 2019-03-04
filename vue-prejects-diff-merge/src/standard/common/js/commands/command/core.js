/*
 * @Author: WangQiBiao
 * @Date: 2018-01-05 10:48:09
 * @Last Modified by: yangjs
 * @Last Modified time: 2018-12-19 17:49:42
 */
import requestSign from './sign';

/**
 * 入口
 *
 * @export
 * @param {any} params
 * @param  module 模块
 * @param  service 服务
 * @param  method 方法
 * @returns 对象
 */
export function entryStringConversionArray(params) {
  //入口必须存在
  if (params.length < 0) {
    throw '入口不能空！';
  }
  //入口字符串转数组
  let arr = params.split('/');
  return {
    module: arr[0],
    service: arr[1],
    method: arr[2],
  };
}
/**
 * 过滤参数
 *
 * @export
 * @param {any} params 过滤参数
 * @param {any} sync 同步异步标识 默认为true即异步方式
 * @returns
 */
export function filterParams(params, sync) {
  let cmdObj = params;
  //存储过滤后新对象
  let newCmdObj = {};
  for (var variable in cmdObj) {
    if (cmdObj.hasOwnProperty(variable)) {
      //过滤函数
      if (typeof cmdObj[variable] === 'function') {
        continue;
      }
      //过滤null
      if (cmdObj[variable] == null) {
        continue;
      }
      //异步请求，过滤t
      if (sync && variable == 't') {
        continue;
      }
      //同步请求，过滤v
      if (!sync && variable == 'v') {
        continue;
      }
      newCmdObj[variable] = cmdObj[variable];
    }
  }
  return newCmdObj;
}
/**
 * 请求参数
 *
 * @export
 * @param {any} params 请求参数
 * @param {any} sync 同步异步标识
 * @param {any} defaultConfig 默认配置项
 * @returns 字符串
 */
export function ajaxParamsRender(params, sync, defaultConfig) {
  //参数过滤
  let cmdObj = filterParams(params, sync);
  //加密sign获取
  cmdObj['sign'] = requestSign(cmdObj, defaultConfig);

  //存储过滤后数组
  let newAjax = [];
  for (var variable in cmdObj) {
    if (cmdObj.hasOwnProperty(variable)) {
      //请求参数编码
      newAjax.push(encodeURIComponent(variable) + '=' + encodeURIComponent(cmdObj[variable]));
    }
  }
  return newAjax.join('&');
}
/**
 * 请求类型数据处理
 *
 * @export
 * @param {any} params.methods 请求方式 post get ajax
 * @param {any} ajaxParams 请求参数
 * @returns 返回请求的url 和send发送数据
 */
export function ajaxDataRender(params, ajaxParams) {
  if (params.methods === 'GET') {
    sendData = null;
    url += ajaxParams;
  } else {
    sendData = ajaxParams;
  }
  return {
    url: url,
    sendData: sendData,
  };
}

/**
 * 创建XHR对象
 *
 * @export
 * @returns
 */
export function createXHR() {
  let xhr = null;
  try {
    if (window.XMLHttpRequest) {
      //标准浏览器 ie9+
      xhr = new XMLHttpRequest();
    } else {
      //ie
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
  } catch (e) {
    throw '创建xhr失败';
  }
  return xhr;
}
/**
 * 设置请求头部
 *
 * @param {any} xhr 创建的xhr的对象
 */
export function setHeader(xhr) {
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
}
/**
 * 异步同步请求对应操作
 *
 * @export
 * @param {any} params.sync 同步异步方式，默认异步
 * @param {any} params.xhr 创建的xhr的对象
 * @param {any} params.cmdObj command参数
 */
export function asyncRender(params) {
  if (params.sync) {
    //异步
    params.xhr.onreadystatechange = function () {
      callbackRender(params.xhr, params.cmdObj);
    };
  } else {
    //同步
    callbackRender(params.xhr, params.cmdObj);
  }
}
/**
 * 请求成功回调
 *
 * @export
 * @param {any} xhr 创建的xhr的对象
 * @param {any} cmdObj command参数
 */
export function callbackRender(xhr, cmdObj) {
  let res = xhr.responseText;
  if (xhr.readyState === 4 && xhr.status === 200) {
    //成功
    if (cmdObj.success) {
      cmdObj.success(res);
    }
  } else {
    //失败
    if (cmdObj.error) {
      cmdObj.error(res);
    }
  }
}
