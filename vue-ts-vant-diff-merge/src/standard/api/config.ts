/**
 * 默认参数设置 请求参数配置
 * @param baseApi 服务器配置-基本地址
 * @param baseUrl 服务器配置-服务器请求地址
 * @param upLoadUrl 服务器配置-服务器上传地址
 * @param exportUrl 服务器配置-服务器导出地址
 * @param importUrl 服务器配置-服务器导入地址
 * @param imageUrl 服务器配置-服务器图片地址
 * @param requestKey 服务器配置-加密key
 * @param stdComid 服务器配置-城市对应代码
 * @param appId 服务器配置-匹配id 要和服务器相匹配
 * @param clientType 客户端请求类型 html  android
 */

const baseApi = 'https://sys.wlmqparking.com:9070';
const requestKey = "8bb3d1e30de69aa301e7cafa634ecdc1";
const stdComid = "200000041";
const appId = "000832012";
const clientType = "html";

export default {
  baseUrl: `${baseApi}/system/data`,
  upLoadUrl: `${baseApi}/system/upClient?`,
  exportUrl: `${baseApi}/std/downClient?`,
  importUrl: `${baseApi}/std/dClient?`,
  imageUrl: `${baseApi}/fs/image?`,
  requestKey: `${requestKey}`,
  stdComid: `${requestKey}`,
  appId: `${appId}`,
  clientType: `${clientType}`
}