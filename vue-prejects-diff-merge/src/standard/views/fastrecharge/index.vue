<!--快速充值  -->
<template>
  <div class="ouuter">
    <div class="recharge">
      <div class="tips">充值金额</div>
      <section class="money_area">
        <ul>
          <li @click="_chooseCash(500)">500元</li>
          <li></li>
          <li @click="_chooseCash(200)">200元</li>
        </ul>
        <ul>
          <li @click="_chooseCash(100)">100元</li>
          <li></li>
          <li @click="_chooseCash(50)">50元</li>
        </ul>
      </section>
      <section class="ec_input_icon_delete_container input_cash_area">
        <input type="number" placeholder="输入任意金额" @keyup="_checkValue('phoneNumber')" class="show_clear_icon" required v-model="cash">
        <svg class="clear_icon" @click="_clearData('cash')">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_clear"></use>
        </svg>
      </section>
      <div class="tips">请选择支付方式</div>
      <section class="payway">

      </section>
      <section class="recharge_submit">
        <div @click="_submitRecharge()" :class="submitClass">确定充值</div>
      </section>
    </div>
  </div>
</template>

<script>
import { isNullorEmpty } from '@standard/common/js/util.js';
export default {
  name: 'fastrecharge',
  data() {
    return {
      cash: '',
      submitClass: 'ec_btn_model_gray_submit',
    };
  },
  watch: {
    cash: function name(val) {
      this.submitClass = isNullorEmpty(val) ? 'ec_btn_model_gray_submit' : 'ec_btn_model_submit';
    },
  },
  /* components: {},

  computed: {},

  mounted: {}, */
  methods: {
    _chooseCash(cash) {
      this.cash = cash;
    },
    _clearData(name) {
      this[name] = '';
    },
    _submitRecharge() {},
  },
};
</script>
<style lang='scss' scoped>
.ouuter {
  @include pageColor(#fff);
  .recharge {
    padding-top: 30px;
    width: 80%;
    margin: 0 auto;
    .tips {
      @include sc(28px, #666);
    }
    .money_area {
      margin-top: 38px;

      ul {
        margin-top: 34px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          @include sc(48px, $citySkinColor);
          //@include wh(330px, 130px);
          @include wh(45%, 130px);
          line-height: 130px;
          border-style: solid;
          border-width: 2px; /* no */
          border-color: $citySkinColor;
          @include borderRadius(16px);
          text-align: center;
          white-space: nowrap;
        }
        li:nth-child(2) {
          width: 0px;
          border: none;
          flex-basis: 1 1 auto;
          padding: 0px 0px;
        }
      }
    }
    .input_cash_area {
      margin: 65px 0 70px 0;
      input {
        @include sc(48px, #444);
      }
    }
    .recharge_submit {
      margin-top: 88px;
    }
  }
}
</style>