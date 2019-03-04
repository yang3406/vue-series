import apiConfig from '@standard/api/config';
/**
 * 默认参数设置
 * @param config 服务器配置
 * @param data.ve ve值
 * @param data.clientType 请求的客户端类型
 * @param data.ms 时间戳
 */
export default {
  config: apiConfig,
  data: {
    ve: 1, //1 为转码  2为不转码  新疆 （我现在不知道 哪个可以了 暂时为1）
    //clientType: 'html',
    clientType: apiConfig.clientType,
    //ms: new Date().getTime(),
    ts: new Date().getTime(),
    appId: apiConfig.appId,
    comid: apiConfig.stdComid,
  },
};
