<!-- 订单详情 -->
<template>
  <div class="order_deatail">
    <section>
      <section class="order_deatail_section">
        <section>
          <ul class="header_nav">
            <li>{{orderObjDetail.ploname}}</li>
            <li>已完成</li>
          </ul>
        </section>
        <section>
          <ul>
            <li>车牌号码</li>
            <li>{{orderObjDetail.carplate}}</li>
          </ul>
          <ul>
            <li>驶入时间</li>
            <li>{{orderObjDetail.intime | timestampFormat}}</li>
          </ul>
          <ul>
            <li>驶出时间</li>
            <li>{{orderObjDetail.outtime | timestampFormat}}</li>
          </ul>
          <ul>
            <li>计费时长</li>
            <li>{{orderObjDetail.duration}}</li>
          </ul>
          <ul>
            <li>应付金额</li>
            <li>{{orderObjDetail.shouldpay | addComma}}元</li>
          </ul>
          <ul>
            <li>支付方式</li>
            <li class="special_word">{{paymentWayName}}</li>
          </ul>
        </section>
        <section>
          <ul>
            <li>实付金额</li>
            <li class="special_word">{{orderObjDetail.actualpay | addComma}}元</li>
          </ul>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'orderDeatail',
  data() {
    return {
      orderObjDetail: {},
      paymentway: 0,
      actualpay: 0.0,
      paymentWayName: '',
    };
  },
  mounted() {
    this.orderObjDetail = Object.assign({}, this.$route.params.itemobj);
    this.paymentway = this.orderObjDetail.paymentway || 0;
    this.actualpay = this.orderObjDetail.actualpay || 0.0;
    this.paymentWayName = this.orderObjDetail.paymentwayname || '';
    this._getpaymentWayName();
  },
  methods: {
    _getpaymentWayName() {
      let paymentWayName = '';
      if (this.paymentWayName) {
        paymentWayName = this.paymentWayName;
      } else {
        if (1 == this.paymentway) {
          if (0 == this.actualpay) {
            paymentWayName = '免费支付';
          } else {
            paymentWayName = '钱包支付';
          }
        } else if (2 == this.paymentway) {
          paymentWayName = '现金支付';
        } else if (3 == this.paymentway) {
          paymentWayName = '月卡支付';
        } else if (4 == this.paymentway) {
          paymentWayName = '免费支付';
        }
      }
      this.paymentWayName = paymentWayName;
    },
  },
  /* beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true; // 让列表页缓存
    next();
  }, */
};
</script>
<style lang='scss' scoped>
.order_deatail {
  padding: 0px 33px;
  background-color: #fff;
  overflow: scroll;
  .order_deatail_section {
    section {
      padding: 30px 0px 20px 0px;
      border-bottom-color: #eeeeee;
      border-bottom-style: solid;
      border-bottom-width: 1px; /* no */
    }
    section:last-child {
      border: none;
    }
    ul {
      display: flex;
      align-content: center;
      justify-content: flex-start;
      li {
        line-height: 60px;
        @include sc(30px, #999);
      }
      li:nth-child(2) {
        color: #444;
        margin-left: 46px;
      }
      li.special_word {
        color: #ff801a;
      }
    }
    ul.header_nav {
      justify-content: space-between;
      li:nth-child(1) {
        @include sc(32px, #444);
      }
      li:nth-child(2) {
        @include sc(28px, #999);
      }
    }
  }
}
</style>