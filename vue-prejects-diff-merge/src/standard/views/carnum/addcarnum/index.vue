/*
 * @Author: yangjs 
 * @Date: 2018-12-19 14:22:34 
 * @Last Modified by: yangjs
 * @Last Modified time: 2018-12-28 10:36:50
 */
<!-- 新增车牌 -->
<template>
  <div class="add_carnum_area carnumboard">
    <section>
      <div id="keyBoard"></div>
    </section>
  </div>
</template>

<script>
import PlateNumberInput from 'plate-number-input';
import { isVeriCarnum, bindCarnum } from '@standard/api';
import config from '@standard/common/js/config.js';
export default {
  name: 'addcarnum',
  data() {
    return {
      carnum: '',
      carnumtype: '',
    };
  },
  mounted() {
    this._initKeyBoard();
  },
  methods: {
    //初始化键盘
    _initKeyBoard() {
      var self = this;
      const input = new PlateNumberInput({
        el: '#keyBoard',
        defaultNumber: config.cityShort,
        isNewpower: false,
        onBtnSaveClick: function() {
          console.log(input.getNumberType()); //是否新能源汽车
          //新能源汽车
          if (input.getNumberType() && input.getNumber().length != 8) {
            return;
          }
          //非新能源汽车
          if (!input.getNumberType() && input.getNumber().length != 7) {
            return;
          }
          input.getNumberType() ? (self.carnumtype = 1) : (self.carnumtype = 0);
          self.carnum = input.getNumber();
          self._bindCarnum();
        },
      });
    },
    _bindCarnum() {
      var self = this;
      self.$indicator.open();
      let params = { carnum: self.carnum };
      isVeriCarnum(params).then(function(res) {
        let carparams = { carnum: self.carnum, isveri: res.isveri, carnumtype: self.carnumtype };
        bindCarnum(carparams).then(function(res) {
          self.$indicator.close();
          self.$router.go(-1);
        });
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.add_carnum_area {
  @include pageColor();
  #keyBoard {
    background-color: #fff;
  }
}
</style>