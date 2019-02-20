/*
 * @Author: yangjs 
 * @Date: 2018-12-07 17:26:42 
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-01-21 10:14:01
 * 数据获取接口
 */
import { createHttpRequest } from '../common/js/http';

//新疆正式
const baseReqURI = 'ivr/H5ForWechat/';
//宜昌测试 徐州 安卓app
//const baseReqURI = 'app/Std/';

/* 用户登录 */
export function login(params = {}, errFlag = true) {
  return createHttpRequest({
    entry: baseReqURI + 'appLogin',
    data: params,
    error: errFlag, //是否显示错误提示
  });
}

/* --------------注册 start----------- */
/* 检查手机号是否可以注册 */
export function checkPhoneNum(params = {}) {
  return createHttpRequest({
    entry: baseReqURI + 'checkPhoneNum',
    data: params,
    error: true,
  });
}

/* 获取验证码 */
export function getVerfyCode(params = {}) {
  return createHttpRequest({
    entry: baseReqURI + 'getSecurityCode',
    data: params,
    error: true, //是否显示错误提示
  });
}

//检查验证码是否正确
export function compareCode(params) {
  return createHttpRequest({
    entry: baseReqURI + 'compareCode',
    data: params,
    error: true, //是否显示错误提示
  });
}

/* 用户注册 */
export function registerMeb(params = {}) {
  return createHttpRequest({
    entry: baseReqURI + 'registerMeb',
    data: params,
    error: true, //是否显示错误提示
  });
}

/* -----------end----------- */
/* 用户找回密码 || 我的 -修改密码 */
export function changPwd(params = {}) {
  return createHttpRequest({
    entry: baseReqURI + 'resetPwd',
    data: params,
    error: true, //是否显示错误提示
  });
}

/* -------------------首页 start--------- */
/* 获取轮播图 车牌等 停车状态等 大部分数据 */
export function getBaseInfo(params) {
  return createHttpRequest({
    entry: baseReqURI + 'getBaseInfo',
    data: params,
    error: false
  });
}

/* 获取绑定状态 */
export function getSignStatus(params = {}) {
  return createHttpRequest({
    entry: baseReqURI + 'contractOpenedVerify',
    data: params,
    error: false
  });
}

/* 绑定签约接口 */
export function bindSigning(params = {}) {
  return createHttpRequest({
    entry: baseReqURI + 'contract',
    data: params,
    error: true,
    //methods: 'GET'
  });
}

/* 绑定解约 */
export function unBindSigning(params = {}) {
  return createHttpRequest({
    entry: baseReqURI + 'contractCancel',
    data: params,
    error: true
  });
}
/* -----------------------我的---------------------- */
/* 获取用户基本信息 */
export function getMebInfobyMebId(params = {}) {
  return createHttpRequest({
    entry: baseReqURI + 'getMebInfobyMebId',
    data: params,
    error: false
  });
}

/* 获取头像 */
/**
 * 
 * @param {  u:mebid+'.png'  type:png_app  nowtime:
 * } params 
 */
export function getHeaderIcon(params = {}) {
  return createHttpRequest({
    entry: 'sys/File/view',
    data: params,
    error: true
  }, "imgClient");
}

/* 上传头像 */
export function uploadAvatarIcon(params) {
  return createHttpRequest({
    entry: 'sys/File/upLoadImgForApp',
    data: params,
    error: true
  });
}

/* 修改密码 */
export function modifyNickName(params = {}) {
  return createHttpRequest({
    entry: baseReqURI + 'modifyNickName',
    data: params,
    error: true,
  });
}

/* 获取活动列表 */
export function getActShowList(params) {
  return createHttpRequest({
    entry: baseReqURI + 'getActShowList',
    data: params,
    error: false
  });
}
/* --------------------------end------------------------ */
/* 车牌 */
/* 获取车牌列表 */
export function getBindedCarnumList(params = {}) {
  return createHttpRequest({
    entry: baseReqURI + 'getBindedCarnumList',
    data: params,
    error: false
  });
}

/* 验证车牌 */
export function isVeriCarnum(params) {
  return createHttpRequest({
    entry: baseReqURI + 'isVeriCarnum',
    data: params,
    error: true
  });
}

/* 绑定车牌 */
export function bindCarnum(params = {}) {
  return createHttpRequest({
    entry: baseReqURI + 'bindCarnum',
    data: params,
    error: true
  });
}
/* 解绑车牌 */
export function unBindCarnum(params = {}) {
  return createHttpRequest({
    entry: baseReqURI + 'unBindCarnum',
    data: params,
    error: true
  });
}

/* -------------订单记录------------------ */
/* 获取停车场订单列表 接口 */
export function getPloOrderList(params) {
  return createHttpRequest({
    entry: baseReqURI + 'getPloOrderList',
    data: params,
    error: true
  });
}
/* 订单详情 */

/* ------------------------停车场信息--------------- */
/* 获取用户车辆正在停车的信息 */
export function getMebPloParkingOrder(params) {
  return createHttpRequest({
    entry: baseReqURI + 'getMebPloParkingOrder',
    data: params,
    error: true
  });
}

/* 意见反馈 */
export function addComplain(params = {}) {
  return createHttpRequest({
    entry: baseReqURI + 'addComplain',
    data: params,
    error: true
  });
}

/* 用户指南 */
export function getUserGuide(params) {
  return createHttpRequest({
    entry: baseReqURI + 'getAgreementAddressByType',
    data: params,
    error: true
  });
}

/* 获取地图数据 停车场*/
export function getParkingLocation(params = {}) {
  return createHttpRequest({
    entry: baseReqURI + 'getParkingLocationByR',
    //entry: 'app/Trinity/' + 'getParkingLocationByR',  //宜昌测试
    data: params,
    error: true
  });
}
/* 获取停车场信息详情 */
export function getParkingLotInfoById(params) {
  return createHttpRequest({
    entry: baseReqURI + 'getParkingLotInfoById',
    //entry: 'app/Std/' + 'getParkingLotInfoById',  //宜昌测试
    data: params,
    error: true
  });
}
