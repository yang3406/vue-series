<!-- 停车计费详情 -->
<template>
  <div class="detailwrapper">
    <section class="gap"></section>
    <section class="detali_pannel">
      <section class="top_pannel">
        <ul>
          <li>车牌号码</li>
          <li>停车费用</li>
        </ul>
        <ul>
          <li>{{payDetail.carnumber}}</li>
          <li v-if="payDetail.iscard == 1">
            月卡畅行
          </li>
          <li v-else>
            {{payDetail.payprice | addComma }}元
          </li>
        </ul>
      </section>

      <section class="mid_pannel">
        <ul>
          <li>停车场</li>
          <li>{{payDetail.ploname}}</li>
        </ul>
        <ul>
          <li>驶入时间</li>
          <li>{{payDetail.intime | timestampFormat}}</li>
        </ul>
        <ul>
          <li>停车时长</li>
          <li>{{payDetail.parktime | secondsToDayTime}}</li>
        </ul>
      </section>
    </section>

    <section class="money_pannel">
      <ul>
        <li>应付金额</li>
        <li v-if="payDetail.iscard == 1">
          0.00元
        </li>
        <li v-else>
          {{payDetail.payprice | addComma }}元
        </li>
      </ul>
    </section>
    <section class="telno">如有疑问，请联系客服：
      <a :href="callTel">{{telno}}</a>
    </section>
  </div>
</template>

<script>
import config from '@standard/common/js/config.js';
export default {
  data() {
    return {
      payDetail: '',
      telno: '',
    };
  },
  components: {},

  computed: {
    callTel() {
      return 'tel:' + this.telno;
    },
  },

  mounted() {
    this.telno = config.telOfCustomer;
    this._initData();
  },

  methods: {
    _initData() {
      this.payDetail = this.$route.query.item;
    },
  },
};
</script>
<style lang='scss' scoped>
.detailwrapper {
  .gap {
    height: 20px;
  }
  .detali_pannel {
    margin: 0px 20px;
    padding: 25px 30px 25px 30px;
    background-color: #ffffff;
    .top_pannel {
      margin-bottom: 50px;
      ul {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
      }
      ul:nth-child(1) {
        @include sc(30px, #999999);
        margin-bottom: 8px;
      }
      ul:nth-child(2) {
        @include sc(50px, #444444);
      }
    }
    .mid_pannel {
      ul {
        display: table-row;
        li {
          line-height: 250%;
          display: table-cell;
        }
        li:nth-child(1) {
          @include sc(28px, #999999);
          padding-right: 50px;
        }
        li:nth-child(2) {
          @include sc(30px, #444444);
        }
      }
    }
  }
  .money_pannel {
    margin: 30px 20px;
    padding: 25px 30px 25px 30px;
    background-color: #ffffff;
    ul {
      display: table-row;
      li {
        display: table-cell;
      }
      li:nth-child(1) {
        @include sc(28px, #999999);
        padding-right: 50px;
      }
      li:nth-child(2) {
        @include sc(30px, #ff801a);
      }
    }
  }
  .telno {
    @include sc(30px, #8e8e92);
    position: fixed;
    text-align: center;
    bottom: 80px;
    width: 100%;
  }
}
</style>