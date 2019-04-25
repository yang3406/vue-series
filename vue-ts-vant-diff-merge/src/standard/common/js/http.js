/*
 * @Author: WangQiBiao
 * @Date: 2018-01-08 14:20:59
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-04-17 18:26:10
 */
import Command from './commands/index';
import Storages from './storages';
import { MessageBox, Indicator } from 'mint-ui';
import store from '../../store/index';
import router from '../../router/index';
import { CHANGE_MEBINFO } from '../../store/mutation-types';
/**
 * 设置Cookie用户信息
 *
 * @export
 * @param {any} res
 */
export function setUserCookieInfo(res) {
  if (res.u) {
    Storages.cookie.set('u', res.u);
    Storages.sessionStorage.set("mebid", res.u);
  }
  if (res.t) {
    Storages.cookie.set('t', res.t);
  }
  if (res.v) {
    Storages.cookie.set('v', res.v);
  }
}
/**
 * 获取Cookie用户信息
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getUserCookieInfo() {
  let cmdObj = {};
  if (Storages.cookie.get('u')) {
    cmdObj['u'] = Storages.cookie.get('u');
  }
  if (Storages.cookie.get('t')) {
    cmdObj['t'] = Storages.cookie.get('t');
  }
  if (Storages.cookie.get('v')) {
    cmdObj['v'] = Storages.cookie.get('v');
  }
  return cmdObj;
}
/**
 * 去登陆
 *
 * @export
 * @param {any} params
 */
export function goLogin(res) {
  if (res.indexOf('0x04') != -1 || res.indexOf('0x02') != -1) {
    //您的账号在别处上线，请重新登录
    MessageBox.alert('您的账号已经在别处登录！').then(action => {
      store.commit(CHANGE_MEBINFO, {});
      router.push('/useraccount/login');
      //window.location.href = '/useraccount/login';
    });
  }
}
/**
 * 创建http请求
 *
 * @export
 * @param {any} params
 * @returns
 */
export function createHttpRequest(params, type) {
  //entry=入口，data=请求参数，methods=请求方式，sync=同步&异步
  params = Object.assign(
    {},
    { entry: 'ivr/H5ForWechat/getBaseInfo', data: {}, sync: true, methods: 'POST', error: false },
    params,
  );
  return new Promise((resolve, reject) => {
    let cmd = new Command(params.entry);
    Object.assign(cmd, params.data, getUserCookieInfo());
    cmd.success = function (res) {
      //账号是否在别处登录
      goLogin(res);
      //返回空 获取用户头像 为空
      if (!res) {
        res = '{"state" : 1,"imgurl":"noiocn" }';
      }
      //签约返回的是页面元素
      if (params.entry === 'ivr/H5ForWechat/contract') {
        resolve(res);
      } else {
        let json_res = JSON.parse(res);
        //是否是fs格式数字
        if (json_res.fs) {
          json_res = fsRender(json_res);
        }
        if (json_res.state == 1) {
          setUserCookieInfo(json_res);
          resolve(json_res);
        } else {
          Indicator.close();
          reject(json_res);
          if (params.error) {
            MessageBox('提示', json_res.message || json_res.resultmsg || '系统异常！');
          }
        }
      }
    };
    if (type === "imgClient") {
      cmd.imgClient({
        sync: params.sync,
      });
    } else if (params.methods === 'GET') {
      cmd.get({
        sync: params.sync,
      });
    } else {
      cmd.ajax({
        sync: params.sync,
      });
    }

  }).catch(err => {
    throw err;
  });
}

/**
 * fs格式返回值转换-json_data格式
 *
 * @param {any} res
 * @returns
 */
export function fsRender(res) {
  //返回结果对象
  let results = {
    data: [],
  };
  let fs = res.fs;
  let rs = res.rs;
  //解析fs、rs
  for (let i = 0; i < rs.length; i++) {
    let obj = {};
    for (let j = 0; j < fs.length; j++) {
      obj[fs[j].name] = rs[i][j];
    }
    results.data.push(obj);
  }
  //其他字段拼接
  for (let item in res) {
    if (res.hasOwnProperty(item)) {
      //过滤fs、rs字段
      if ("fs" === item || "rs" === item) {
        continue;
      }
      results[item] = res[item];
    }
  }
  return results;
}
/**
 * @提交文件路径
 * @export
 * @returns
 */
export function submitFileUrl() {
  return `${serviceImageUrl()}/upClient?method=upload&service=File&module=sys&file_path=ecaray_open`;
}
/**
 * @获取完整的数据库图片路径
 *
 * @export
 * @param fileName 图片文件名
 * @returns
 */
export function getFileUrl(fileName = '') {
  return `${serviceImageUrl()}/fs/image?module=sys&service=File&method=view&file_name=${fileName}`;
}
