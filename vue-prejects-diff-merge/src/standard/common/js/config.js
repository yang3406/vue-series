/* export default {
  appHost: "192.168.9.103:8007",
  fsHost: "192.168.9.103:8007",
  appPort: "",
  appRoot: "/std",
  stdComid: "200000001",
  appName: "西安停车",
  appId: "883533702",
  arrKey: [38, 114, 101, 113, 117, 101, 115, 116, 75, 101, 121, 61, 68, 51, 48, 50, 57, 67, 55, 51, 52, 48, 54, 50, 50, 49, 66, 48, 50, 48, 50, 54, 66, 54, 56, 52, 66, 66, 48, 48, 53, 55, 57, 67],
  isAllowChooseCity: false, // 是否允许选择城市，true允许 ，false 不允许， 默认允许。
  payIndex: "0",  //支付宝多个账号的时候选择的账号下标，0是app支付，1是手机网站支付。
  isAllowPark: true,  // 是否允许申请停车
  cityShort: "陕",
  authorizedSign: "深圳市前海亿车科技有限公司提供技术支持",
  appLocation: { 'longitude': 108.93984, 'latitude': 34.34127 }, //西安的经、纬度
  appActivityType: 3,  //活动类型，0是无活动，1是优惠券，2是折扣，3是二者同时有。
  carnumTopTwoDefault: ["陕", "A"], //扫码输入车牌号查找停车订单去缴费时，车牌号前两位默认值。
  telOfScanCarnumPay: "0717-6232550" //扫码输入车牌号查找停车订单去缴费功能：订单详情页底部的客服电话。
} */

export default {
  appHost: '192.168.10.115:6081',
  fsHost: '192.168.10.115:6081',
  appPort: '',
  appRoot: '/std',
  stdComid: '200000030',
  openid: 'yiche',
  appName: '徐州停车',
  appDownloadUrl: 'http://a.app.qq.com/o/simple.jsp?pkgname:com.ecaray.epark.cq',
  appId: '004073402',
  arrKey: [38, 114, 101, 113, 117, 101, 115, 116, 75, 101, 121, 61, 101, 49, 48, 97, 100, 99, 51, 57, 52, 57, 98, 97, 53, 57, 97, 98, 98, 101, 53, 54, 101, 48, 53, 55, 102, 50, 48, 102, 56, 56, 52, 101],
  isAllowChooseCity: false, // 是否允许选择城市，true允许 ，false 不允许， 默认允许。
  payIndex: '0',  //支付宝多个账号的时候选择的账号下标，0是app支付，1是手机网站支付。
  isAllowPark: true,  // 是否允许申请停车
  cityShort: '粤',
  authorizedSign: '深圳市前海亿车科技有限公司提供技术支持',
  appLocation: { 'longitude': 116.153, 'latitude': 38.701 }, //任丘的经、纬度
  appActivityType: 2,  //活动类型，0是无活动，1是优惠券，2是折扣，3是二者同时有。
  carnumTopTwoDefault: ['粤', 'H'], //扫码输入车牌号查找停车订单去缴费时，车牌号前两位默认值。
  telOfScanCarnumPay: '0717-6232550', //扫码输入车牌号查找停车订单去缴费功能：订单详情页底部的客服电话。
};
