/* *
* 所有的请求接口 都放在这里面
*/
import $httpRequest from './fetch'; 
import config from './config';

export const _getMebInfobyMebId = (paramsObj) => {
  var setObj = {
    method: 'getMebInfobyMebId',
    comid: config.stdComid
  };
   Object.assign(paramsObj, setObj);
  return $httpRequest(paramsObj);
};
