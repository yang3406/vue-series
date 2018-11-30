<!-- 新增车牌 -->
<template>
  <div class="add_carnum_area">
    <section>
      <div id="keyBoard"></div>
    </section>
  </div>
</template>

<script>
import PlateNumberInput from 'plate-number-input';
import config from '@standard/common/js/config.js';
import { mapMutations } from 'vuex';
export default {
  name: 'addcarnum',
  data() {
    return {};
  },
  mounted() {
    this._initKeyBoard();
  },
  /* components: {}, */

  /*  computed: {},*/
  methods: {
    ...mapMutations(['addCarNum']),
    //初始化键盘
    _initKeyBoard() {
      var _this = this;
      const input = new PlateNumberInput({
        el: '#keyBoard',
        defaultNumber: config.cityShort,
        isNewpower: false,
        onBtnSaveClick: function() {
          console.log(input.getNumber());
          console.log(input.getNumberType());
          _this.addCarNum({carNumber:input.getNumber(),carType:input.getNumberType()});
          _this.$indicator.open({
            spinnerType: 'fading-circle'
          });
          setTimeout(function(){
            _this.$indicator.close();
            _this.$router.push("/carnum");
          },1000);
        },
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