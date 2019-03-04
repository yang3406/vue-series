/*
 * @Author: WangQiBiao
 * @Date: 2018-01-10 15:08:25
 * @Last Modified by: WangTao
 * @Last Modified time: 2018-06-11 16:35:15
 */
/**
 * 两个对象深拷贝
 *
 * @export
 * @param {any} obj1
 * @param {any} obj2
 * @returns
 */
export function deepMerge(obj1, obj2) {
  let target = JSON.parse(JSON.stringify(obj1));
  for (var variable in obj2) {
    if (obj2.hasOwnProperty(variable)) {
      if (target[variable] && target[variable].toString() === '[object Object]') {
        target[variable] = deepMerge(target[variable], obj2[variable]);
      } else {
        target[variable] = obj2[variable];
      }
    }
  }
  return target;
}
/**
 * 数组排序
 *
 * @param {any} params
 * @returns 顺序: a b c ... y z
 */
export function arraySort(params) {
  //排序
  params.sort(function(a, b) {
    return a.split('=')[0] > b.split('=')[0] ? 1 : -1;
  });
  return params;
}
