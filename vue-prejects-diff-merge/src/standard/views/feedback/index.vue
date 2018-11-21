<!-- 意见反馈 -->
<template>
  <div>
    <section class="feedback">
      <textarea placeholder="欢迎吐槽和给予建议……" class="suggestion">
      </textarea>
      <div class="ec_btn_model_submit btn_submit">提交</div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'feedback',
  data() {
    return {};
  },

  /*  components: {},

  computed: {},

  mounted: {},

  methods: {}, */
};
</script>
<style lang='scss' scoped>
.feedback {
  width: 90%;
  margin: 0 auto;
  .suggestion {
    margin-top: 60px;
    @include wh(100%, 500px);
    padding-left: 5px; /* no */
    padding-left: 5px; /* no */
    padding-top: 5px; /* no */
    padding-bottom: 5px; /* no */
    @include sc(26px);
  }
  .btn_submit {
    margin-top: 88px;
  }
}
</style>