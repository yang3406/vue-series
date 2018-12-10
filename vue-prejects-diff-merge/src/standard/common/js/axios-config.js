/**
 * 默认参数
 * @param {string} params.module 模块
 * @param {string} params.service 服务
 * @param {string} params.method 服务
 * @param {number} params.ve ve
 * @param {string} params.clientType 端
 * @param {number} params.ms ms
 * @param {string} requestKey
 */
import { requestKey, baseURL } from '../../api/config';
const config = {
  params: {
    ve: 2,
    clientType: 'html',
    ms: new Date().getTime()
  },
  /* requestKey: 'D3029C73406221B02026B684BB00579C' */
};
/**
 * 请求参数 基本参数
 *  returns {object}
 */
export function getRequestConfig() {
  const userInfo = {};
  // comid
  if (sessionStorage.getItem('comid')) {
    userInfo.comid = sessionStorage.getItem('comid');
  }
  // 用户id
  if (sessionStorage.getItem('u')) {
    userInfo.u = sessionStorage.getItem('u');
  }
  // 异步
  if (sessionStorage.getItem('v')) {
    userInfo.v = sessionStorage.getItem('v');
  }
  return {
    ...userInfo,
    ...config.params
  };
}
/**
 * 请求requestkey
 */
export function getRequestKet() {
  return requestKey;
}
/**
 * 请求的baseURL
 */
export function getBaseURL() {
  return baseURL;
}
