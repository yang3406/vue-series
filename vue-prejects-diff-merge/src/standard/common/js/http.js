/*
 * @Author: yangjs 
 * @Date: 2018-12-07 16:20:51 
 * @Last Modified by: yangjs
 * @Last Modified time: 2018-12-07 19:12:44
 */
import axios from 'axios';
import MessageBox from 'mint-ui';
import { getRequestConfig, getRequestKet, getBaseURL } from './axios-config';
import sign from './sign';

/**
 * 出错提示
 * @param {string} message 提示信息
 */
function ErrorTips(message = '服务器开小差了~稍后重试') {
  MessageBox({
    title: '提示',
    message,
  })
};

/**
 * post请求参数编码
 * @param {object} data 请求你参数
 * return {string}
 */
function reqParamsEncodeURIComponent(data) {
  let newData = [];
  for (let k in data) {
    newData.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]));
  }
  return newData.join('&');
};

/**
 * sign参数生成
 * @param {object} data 请求参数
 *
 * return {object}
 */
function setSign(data) {
  return sign({
    data: data,
    requestKey: getRequestKet()
  });
};

/**
 * 请求失败
 * @param {object} res 返回值
 */
function requestFail(err) {
  ErrorTips(err.message || '请求失败');
  return err;
}

/**
 * fs格式化成json格式 后台数据返回fs[]数组中
 * @param {array} res
 */
function fsOrRsHandleObject(res) {
  let rs = res.rs;
  let fs = res.fs;
  let data = [];
  let newRes = {};
  for (var variable in res) {
    if (res.hasOwnProperty(variable)) {
      if (variable !== 'fs' && variable !== 'rs') {
        newRes[variable] = res[variable];
      }
    }
  }
  for (var i = 0; i < rs.length; i++) {
    let chidlrenRs = rs[i];
    let newObj = {};
    for (var j = 0; j < chidlrenRs.length; j++) {
      newObj[fs[j].name] = chidlrenRs[j];
    }
    data.push(newObj);
  }
  return {
    data: data,
    ...newRes
  };
};

/**
 * 请求成功
 * @param {object} res 返回值
 */
function requestSucess(res) {
  res = JSON.parse(res);
  if (res.state === 0 || res.num === 0) {
    requestFail(res);
    return;
  }
  if (res.fs) {
    return fsOrRsHandleObject(res);
  }
  return res;
};

/**
 * 
 * @param {object} interfaceParams 请求所带的对象
 */
export function createdAxios(interfaceParams) {
  let instance = axios.create();
  instance.defaults.baseURL = getBaseURL() + interfaceParams.entry;
  instance.defaults.params = Object.assign(getRequestConfig(), interfaceParams.reqParam);
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  //是否支持跨域
  instance.defaults.withCredentials = true;
  //post 对参数编码
  instance.defaults.transformRequest = [
    function (data) {
      return reqParamsEncodeURIComponent(data);
    }
  ];
  instance.defaults.transformResponse = [
    function (res) {
      return requestSucess(res);
    }
  ];
  instance.interceptors.request.use(function (config) {
    if (config.method.toLowerCase() === 'get') {
      config.params['sign'] = setSign(config.params);
    } else {
      config.params['sign'] = setSign({
        ...config.params,
        ...config.data
      });
    }
    //超出时间
    config.timeout = 5000;
    return config;
  });
  instance.interceptors.response.use(function success(res) {
    return res;
  }, function error(err) {
    if (interfaceParams.error) {
      requestFail(err);
    }
  });
  return instance;
};
/**
 * 
 * @param {object} params 请求参数
 */
export function createdFormDataAxios(params) {
  let formData = new FormData();
  for (var variable in params) {
    if (params.hasOwnProperty(variable)) {
      formData.append(variable, params[variable]);
    }
  }
  return axios.post(`${baseURL}upClient`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}