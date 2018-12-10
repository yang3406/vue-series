/*
 * @Author: yangjs 
 * @Date: 2018-12-07 17:26:42 
 * @Last Modified by: yangjs
 * @Last Modified time: 2018-12-07 18:50:31
 * 数据获取接口
 */
import { createdAxios } from '../common/js/http';

/* 测试接口 */
export function testRegister(params) {
  return createdAxios({
    entry: 'owner/User/login',
    reqParam: params,
    method: 'post',
    error: true
  });
}