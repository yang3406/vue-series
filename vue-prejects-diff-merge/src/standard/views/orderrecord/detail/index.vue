<!-- 订单详情 -->
<template>
  <div class="order_deatail">
    <section v-if='orderObjDetail' class="order_deatail_section">
      <section>
        <ul class="header_nav">
          <li>{{name}}</li>
          <li>{{orderObjDetail.status}}</li>
        </ul>
      </section>
      <section>
        <ul>
          <li>泊位编号</li>
          <li>{{orderObjDetail.no}}</li>
        </ul>
        <ul>
          <li>驶入时间</li>
          <li>{{orderObjDetail.innerTime}}</li>
        </ul>
        <ul>
          <li>计费时间</li>
          <li>{{orderObjDetail.coutTime}}</li>
        </ul>
        <ul>
          <li>驶出时间</li>
          <li>{{orderObjDetail.innerTime}}</li>
        </ul>
        <ul>
          <li>计费时长</li>
          <li>{{orderObjDetail.status}}</li>
        </ul>
        <ul>
          <li>应付金额</li>
          <li>{{orderObjDetail.status}}</li>
        </ul>

        <ul>
          <li>折扣优惠</li>
          <li class="special_word">{{orderObjDetail.discnt}}</li>
        </ul>
        <ul>
          <li>用券优惠</li>
          <li class="special_word">{{orderObjDetail.paymoney}}</li>
        </ul>
      </section>
      <section>
        <ul>
          <li>实付金额</li>
          <li class="special_word">{{orderObjDetail.paymoney}}</li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'orderDeatail',
  data() {
    return {
      name: '',
      orderObjDetail: {
        no: '19999000',
        status: '已完成',
        innerTime: '2017-06-30 15:12:16',
        coutTime: '2017-06-30 15:12:16',
        outterTime: '2017-06-30 15:12:16',
        discnt: '-2.00元',
        paymoney: '10.00元',
      },
    };
  },
  mounted() {
    this.name = this.$route.query.id;
  },
  /* components: {},

  computed: {},

  mounted: {},

  methods: {}, */
};
</script>
<style lang='scss' scoped>
.order_deatail {
  padding: 0px 33px;
  background-color: #fff;
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
      li:nth-child(1) {
        @include sc(28px, #999);
      }
      li:nth-child(2) {
        @include sc(28px, #444);
        margin-left: 30px;
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