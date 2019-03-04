import * as types from './mutation-types';
export const changeRegisterStatus = ({ commit }, isRegister) => {
  commit(types.CHANGE_MEBINFO, isRegister);
};
