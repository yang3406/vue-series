import Storages from '../common/js/storages';

const getMebId = (state: any) => {
  return state.mebid || Storages.sessionStorage.get("mebid") || Storages.cookie.get("u") || '';//本地保存u为默认登录
}
export { getMebId }