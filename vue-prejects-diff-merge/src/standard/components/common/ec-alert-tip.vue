<!-- 弹出 提示框 -->
<template>
  <div class="alert_container">
    <section class="alert_wrapper">
      <div class="img_wrapper">
        <img :src="alertType == 'warning'? '':''" class="tip_img"></img>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="confrim" @click="_closeTip">确认</div>
    </section>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  props: {
    //提示框的字符
    alertText: {
      type: String,
      default: '',
    },
    //提示框的等级 分为warning error
    alertType: {
      type: String,
      default: 'warning',
    },
  },

  /*  components: {},

  computed: {},

  mounted: {}, */

  methods: {
    _closeTip() {
      this.$emit('closeTip');
    },
  },
};
</script>
<style lang='scss' scoped>
.alert_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  .alert_wrapper {
    @include center();
    background-color: #fff;
    border: 1px; /* no */
    @include wh(200px, 200px);
    .img_wrapper {
      height: 100px;
      position: relative;
      .tip_img {
        @include wh(100px, 100px);
        z-index: 11;
        @include center();
      }
    }
    .tip_text {
      text-align: center;
    }
    .confrim {
      text-align: center;
    }
  }
}
</style>