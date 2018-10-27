/**
 * @Author: yangjiansu
 * @Date:   2018/10/24
 * @依赖 axios 请求接口、md5加密
 * @功能：网络请求
 */
import axios from 'axios';
import Md5 from './md5';
import config from './config';

/**
 * 实例化 请求对象
 * paramsObj 请求的参数
 */
export default function $httpRequest(paramsObj) {
  return new Promise((resolve, reject) => {
    let fetch = new Fetch('wechat', 'StdWechat');
    Object.assign(fetch, paramsObj);
    return fetch._request(resolve, reject);
  });
};

/**
 * @主函数
 * @export
 * @param {any} module //模块
 * @param {any} service //服务
 * @param {any} method //方法
 * @param {any} loginFlag //是否是登录请求标识
 */
function Fetch(module, service, method) {
  this.module = module || 'wechat';
  this.service = service || 'StdWechat';
  this.method = method || 'checkOpenid_v2';
  this.appId = config.appId;
  this.ve = 2; //ve
  this.ms = new Date().getTime();
  this.clientType = 'html';

  /*this.u = localStorage.getItem('u') //用户
   this.v = localStorage.getItem('v')
   this.t = localStorage.getItem('t')*/
};

/**
 * @默认参数设置
 * @export
 */
Fetch.prototype._configParam = function () {
  var defConfig = {};
  defConfig.appHost = config.appHost; //服务器地址
  defConfig.appRoot = config.appRoot; //平台
  defConfig.protocol = 'http://'; //协议 默认http
  defConfig.stype = '/data'; //方法,导出导入数据请求，默认数据请求
  defConfig.type = 'post'; //请求方式,默认post请求
  return defConfig;
};

/**
 * @请求数据
 * @param {any} obj //请求类型
 * @export
 */
Fetch.prototype._dataRender = function () {
  var cmdObj = this;
  var dataObj = {};
  for (var key in cmdObj) {
    let keyType = typeof cmdObj[key];
    //值为是函数？跳过
    if (keyType === 'function') {
      continue;
    }
    //值为undefined默认为空
    if (keyType === 'undefined') {
      dataObj[key] = '';
      continue;
    }
    /*if (key === 't' && obj.async) {
     //异步不传t，只传v
     continue
     }
     if (key === 'v' && !obj.async) {
     //同步不传v，只传t
     continue
     }*/
    dataObj[key] = cmdObj[key];
  }
  dataObj['sign'] = this._sign();
  return dataObj;
};

/**
 * @加密数组
 * @export
 */
Fetch.prototype._getArray = function () {
  var spiltStr = new Array();
  spiltStr.push.apply(spiltStr, config.arrKey);
  return spiltStr;
};

/**
 * @拼接请求地址
 * @export
 * @param {any} obj //请求类型
 */
Fetch.prototype._sortUrl = function () {
  var cmdObj = this;
  var arr1 = [];
  for (var pro in cmdObj) {
    arr1.push(pro);
  }
  arr1.sort(function (a, b) {
    return a.split('=')[0] > b.split('=')[0] ? 1 : -1;
  });
  var arr2 = [];
  for (var i = 0; i < arr1.length; i++) {
    var key = arr1[i];
    var value = cmdObj[key];
    if (typeof value === 'undefined') {
      arr2.push(key + '=' + '');
      continue;
    }
    if (typeof value != 'function') {
      arr2.push(key + '=' + value); //加密前不需要编码
    }
  }
  return arr2.join('&');
};

/**
 * @参数加密
 * @export
 */
Fetch.prototype._sign = function () {
  var content = this._sortUrl();
  var newArr = [];
  var intArr = this._getArray();
  for (var i = 0; i < intArr.length; i++) {
    newArr.push(String.fromCharCode(intArr[i]));
  }
  content += newArr.join('');
  var sign = Md5(content);
  return sign;
};

/**
 * @成功回调
 * @export
 * @param {any} res //返回数据
 */
Fetch.prototype._success = function (res) {
  var cmdObj = this;
  // 没有登录状态，需要强制登录
  if (res.indexOf('0x04') !== -1 || res.indexOf('0x02') !== -1) {
    /*//去登陆
     this._goLogin()*/
  } else {
    if (typeof res === 'string') {
      res = JSON.parse(res);
    }
    // // 请求成功
    if (1 == res.state) {
      /*if (res.u) {
       // sessionStorage.setItem("u", res.u);
       localStorage.setItem('u', res.u)
       }
       if (res.t) {
       // sessionStorage.setItem("t", res.t);
       localStorage.setItem('t', res.t)
       }
       if (res.v) {
       // sessionStorage.setItem("v", res.v);
       localStorage.setItem('v', res.v)
       }*/
      if (typeof cmdObj.success === 'function') {
        cmdObj.success(res);
      }
    } else {
      this._error(res);
    }
  }
};

/**
 * @去登陆
 */
/*Fetch.prototype._goLogin = function() {
 var r = confirm('您的账号在别处登录？')
 if (r == true) {
 window.location.href = '/#login'
 }
 }*/

/**
 * @失败
 * @param {any} res //返回数据
 */
Fetch.prototype._error = function (res) {
  var cmdObj = this;
  if (typeof cmdObj.error === 'function') {
    cmdObj.error(res);
  }
  throw res.message;//抛出错误
};

/**
 * @获取url
 */
Fetch.prototype._getUrl = function (obj) {
  var defConfig = this._configParam();
  var url = defConfig.protocol + defConfig.appHost + defConfig.appRoot + (obj.stype != undefined && obj.stype != null ? obj.stype : defConfig.stype);
  return url;
};

/**
 * @网络请求
 */
Fetch.prototype._request = function (resolve, reject) {
  var _this = this;
  var defConfig = _this._configParam();
  var dataObj = _this._dataRender();
  var url = this._getUrl(dataObj);
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';  //不知什么原因，这种设置无效
  axios({
    method: defConfig.type, //请求方式
    url: url, //地址
    data: dataObj, //参数
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    transformRequest: [function (data) { //把json格式的参数转化成Object，因为接口对参数格式限制了，只能是对象类型
      let ret = '';
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
      }
      return ret.substring(0, ret.length - 1);
    }],
    transformResponse: [function (data) {
      return data;
    }],
    timeout: 5000, //请求超时时间5秒
    responseType: 'json' //返回值类型，不设置的话返回的data是个对象类型的字符串
  }).then(function (response) {
    resolve(response.data);
  }).catch(function (error) {
    reject(error);
  });
};

/**
 * @导出导入
 */
Fetch.prototype.downClient = function () {
  this._request({
    async: false,
    stype: '/downClient',
  });
};
