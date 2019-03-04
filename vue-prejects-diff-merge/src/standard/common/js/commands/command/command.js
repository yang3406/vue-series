/*
 * @Author: WangQiBiao
 * @Date: 2018-01-05 10:20:51
 * @Last Modified by: yangjs
 * @Last Modified time: 2018-12-25 17:11:33
 */
import { createXHR, setHeader, asyncRender, ajaxParamsRender, entryStringConversionArray } from './core';
import * as Utils from './utils';
import DefaultConfig from './default-config';

/**
 * Command主函数
 * @export
 * @param {string} [params=''] module service method值
 * @使用传值方式：'module/service/method'
 */
export default function Command(params = 'portal/Portal/access') {
  let entry = entryStringConversionArray(params);
  this.module = entry.module;
  this.service = entry.service;
  this.method = entry.method;
  this.success = function (res) { }; //成功
  this.error = function (err) { }; //失败
}
/**
 * 默认配置
 *
 * @param config.baseUrl 服务器地址
 * @param config.requestKey 加密key
 * @param data.ve ve值
 * @param data.clientType 请求的客户端类型
 * @param data.ms 时间戳
 */
Command.prototype.DEFAULT_CONFIG_PARAMS = DefaultConfig;
/**
 * 创建请求
 *
 * @param {*} params
 * @param sync 同步异步标识 sync=true异步，sync=false同步
 * @param methods 请求方式 post get ajax 默认是post请求
 */
Command.prototype._createdServe = function (params) {
  //请求参数合并
  let cmdObj = Utils.deepMerge(this.DEFAULT_CONFIG_PARAMS.data, this);
  //同步异步方式
  let sync = params.sync;
  //处理后的请求参数
  let ajaxParams = ajaxParamsRender(cmdObj, sync, this.DEFAULT_CONFIG_PARAMS);
  //发送数据
  let sendData = null;
  //请求地址
  let url = "";
  if (params.type == "imgClient") {
    url = this.DEFAULT_CONFIG_PARAMS.config.imageUrl;
  } else {
    url = this.DEFAULT_CONFIG_PARAMS.config.baseUrl;
  }
  //get请求
  if (params.methods === 'GET') {
    url += "?";
    sendData = null;
    url += ajaxParams;
  } else {
    //post请求
    sendData = ajaxParams;
  }
  //1、创建http
  let xhr = createXHR();
  //2、链接请求
  xhr.open(params.methods, url, sync);
  //3、设置头部
  setHeader(xhr);
  //4、发送请求数据
  xhr.send(sendData);
  //5、监听
  asyncRender({
    sync: sync,
    xhr: xhr,
    cmdObj: this,
  });
};
/**
 * get请求
 * @param {*} params
 * @param sync同步异步标识 sync=true异步，sync=false同步
 */
Command.prototype.get = function (params = { sync: true }) {
  this._createdServe({
    methods: 'GET',
    sync: params.sync,
  });
};
/**
 * post请求
 * @param {*} params
 * @param sync同步异步标识 sync=true异步，sync=false同步
 */
Command.prototype.post = function (params = { sync: true }) {
  this._createdServe({
    methods: 'POST',
    sync: params.sync,
  });
};
/**
 * ajax请求
 * @param {*} params
 * @param sync同步异步标识 sync=true异步，sync=false同步
 */
Command.prototype.ajax = function (params = { sync: true }) {
  this._createdServe({
    methods: 'POST',
    sync: params.sync,
  });
};

/* 图片访问 */
Command.prototype.imgClient = function (params = { sync: true }) {
  this._createdServe({
    methods: 'POST',
    sync: params.sync,
    type: 'imgClient'
  });
};

/**
 * 导入
 * @param {*} sync
 * @param sync同步异步标识 sync=true异步，sync=false同步
 */
Command.prototype.upClient = function (params = { sync: true }) {
  this.DEFAULT_CONFIG_PARAMS.config.baseUrl = this.DEFAULT_CONFIG_PARAMS.config.baseUrl.replace('data', 'upClient');
  this.post();
};

/**
 * 导出
 */
Command.prototype.downClient = function () {
  let baseUrl = this.DEFAULT_CONFIG_PARAMS.config.baseUrl.replace('data', 'downClient');
  let cmdObj = Object.assign({}, this.DEFAULT_CONFIG_PARAMS.data, this);
  let ajaxParams = ajaxParamsRender(cmdObj, true, this.DEFAULT_CONFIG_PARAMS);
  window.open(baseUrl + ajaxParams);
};
