<!-- 修改昵称 -->
<template>
  <div class="nickname">
    <section class="input_container">
      <span>昵称：</span>
      <input v-focus v-model="nickname">
    </section>
    <section class="submit-area">
      <div @click="_changeNickName">确认修改</div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: '',
    };
  },

  /*   components: {},

  computed: {},

  mounted: {}, */
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  methods: {
    _changeNickName() {},
  },
};
</script>
<style lang='scss' scoped>
$sizeColor: #444;
.nickname {
  @include absCover();
  .input_container {
    margin: 0 auto;
    margin-top: 15%;
    display: flex;
    align-items: center;
    width: 90%;
    height: 80px;
    border-bottom-color: #eee;
    border-bottom-width: 1px; /*no*/
    border-bottom-style: solid;
    span {
      padding-right: 20px;
      @include sc(34px, #7c7c7c);
    }
    input {
      height: 100%;
      flex-grow: 1;
      @include sc(34px, $sizeColor);
      &:active,
      &:focus {
        @include inputcaret($citySkinColor);
      }
    }
  }
  .submit-area {
    margin: 100px auto;
    div {
      background-color: $citySkinColor;
      width: 90%;
      height: 100px;
      line-height: 100px;
      @include sc(32px, #fff);
      margin: 0 auto;
      text-align: center;
      letter-spacing: 1px;
    }
  }
}
</style>
