<!-- 我的钱包 -->
<template>
  <div :style="mywalletbg" class="mywallet">
    <nav></nav>
    <section class="img-data" :style="dataArae">
      <section class="content-area">
        <div>500.00</div>
        <div>余额(元)</div>
      </section>
    </section>
    <div class="operate">去充值</div>
  </div>
</template>

<script>
export default {
  name: 'mywallet',
  data() {
    return {
      mywalletbg: {
        backgroundImage: 'url(' + require('@img/mine_header_bg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
      dataArae: {
        backgroundImage: 'url(' + require('@img/mine_wallet_money_bg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      },
    };
  },

  /*  components: {},

  computed: {},

  mounted: {},

  methods: {}, */
};
</script>
<style lang='scss' scoped>
.mywallet {
  min-height: 100%;
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
        @include sc(120px, #fff);
      }
      div:nth-child(2) {
        @include sc(30px, #fff);
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