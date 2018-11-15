<!-- 修改密码 -->
<template>
  <div class="secret-area">
    <section class="input_container">
      <span>原密码：</span>
      <input type="password" v-focus v-model="oldsecret">
    </section>
    <section class="input_container new_secret-area">
      <span>新密码：</span>
      <input type="password" v-model="newsecret">
    </section>
    <section class="submit-area">
      <div @click="_changeSecret" class="ec_btn_model_submit">确认修改</div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldsecret: '',
      newsecret: '',
    };
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  /* components: {},

  computed: {},

  mounted: {}, */

  methods: {
    _changeSecret() {},
  },
};
</script>
<style lang='scss' scoped>
$sizeColor: #444;
.secret-area {
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
  .new_secret-area {
    margin-top: 40px;
  }
  .submit-area {
    margin: 100px auto;
  }
}
</style>
