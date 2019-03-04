<!-- 我的钱包 -->
<template>
  <div class="mywallet">
    <nav></nav>
    <section class="img-data" :style="dataArae">
      <section class="content-area">
        <div>0.00</div>
        <div>余额(元)</div>
      </section>
    </section>
    <div @click="_gotocharage">
      <div class="operate">去充值</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mywallet',
  data() {
    return {
      dataArae: {
        backgroundImage: 'url(' + require('@img/mine_wallet_money_bg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      },
    };
  },
  methods: {
    _gotocharage() {
      this.$messagebox('此功能暂未开放，敬请期待！');
      //this.$router.push('/fastrecharge');
    },
  },
  /*  components: {},

  computed: {},

  mounted: {},

   */
};
</script>
<style lang='scss' scoped>
.mywallet {
  min-height: 100%;
  @include linearGradient(#44515f, #29323d, 135deg);
  nav {
    height: 120px;
  }
  text-align: center;
  .img-data {
    margin: 0 auto;
    @include wh(600px, 612px);
    position: relative;
    .content-area {
      @include center();
      div:nth-child(1) {
        @include sc(120px, #ffffff);
      }
      div:nth-child(2) {
        @include sc(30px, #ffffff);
      }
    }
  }
  .operate {
    margin: 0 auto;
    letter-spacing: 2px;
    border-color: #508cee;
    border-style: solid;
    border-width: 2px; /* no */
    margin-top: 120px;
    @include wh(600px, 88px);
    @include borderRadius(44px);
    vertical-align: middle;
    line-height: 88px;
    @include sc(40px, #508cee);
  }
}
</style>