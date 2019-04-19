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
 * @param u 服务器配置 mebid
 */
//const baseApi = 'http://work.ecaray.com:19006'; //宜昌测试 19000000060   y123456  19000000062 123456
//const baseApi = 'http://192.168.163.146:6084'; //景波测试
//const baseApi = 'http://192.168.10.104:6084'; //新疆测式   19000000086   123456  http://work.ecaray.com:46084
//const baseApi = 'http://work.ecaray.com:46084'; //新疆测式   19000000086   123456 
const baseApi = 'https://work-wlmqroad.ecaray.com'; //新疆测式   19000000086   123456  https
//const baseApi = 'https://sys.wlmqparking.com:9070'; //新疆正式  19000000086  123456  13246739013  123456
//const baseApi = 'http://192.168.10.115:6081';  //徐州测试18720918917    a123456

export default {
  baseApi: baseApi,
  //baseUrl: `${baseApi}/std/data`, //宜昌测式   `${baseApi}/system/data`, 现在也是下面的  徐州
  baseUrl: `${baseApi}/system/data`,// 新疆测试 正式  测试
  upLoadUrl: `${baseApi}/system/upClient?`, //上传图片地址
  exportUrl: `${baseApi}/std/downClient?`,
  importUrl: `${baseApi}/std/dClient?`,
  imageUrl: `${baseApi}/fs/image?`,
  //宜昌测式
  /* requestKey: 'ae8d9539e95c6e52ef6479bb0bc0ad78',
  stdComid: '200000015',
  appId: '000832058',
  clientType: 'android', */
  //新疆测试式
  requestKey: '802ec4adf17dfca0e83ec3da44c1c843',
  stdComid: '200000041',
  appId: '000646096',
  clientType: 'html',
  //徐州测试环境 安卓的
  /* requestKey: 'S302FDSFSDF4DSFDSFD43543DSFSD490',
  stdComid: '200000030',
  appId: '432445545',
  clientType: 'android', */
  //新疆正式
  /* requestKey: '8bb3d1e30de69aa301e7cafa634ecdc1',
  stdComid: '200000041',
  appId: '000832012',
  clientType: 'html', */
};
