<!-- 我的详情 -->
<template>
  <div class="user-detail">
    <section>
      <section class="row headImg bottom-line">
        <input type="file" class="img-upload" @change="_uploadHeaderIcon">
        <h2>头像</h2>
        <div class="row-right">
          <span class="header-right-img row-right-text">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_avatar_default"></use>
            </svg>
          </span>
          <span class="row-right-arrow">

          </span>
        </div>
      </section>

      <router-link to='/mine/nickname'>
        <section class="row bottom-line">
          <h2>昵称</h2>
          <div class="row-right">
            <span class="row-right-word">
              {{nickname}}
            </span>
            <span class="row-right-arrow">
              <svg fill="#d8d8d8">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
              </svg>
            </span>
          </div>
        </section>
      </router-link>

      <section class="row">
        <h2>账号</h2>
        <div class="row-right">
          <span class="row-right-word">
            {{phoneNum}}
          </span>
          <span class="row-right-arrow">
          </span>
        </div>
      </section>

      <div class="split-area"></div>

      <router-link to="/mine/changesecret">
        <section class="row">
          <h2>密码修改</h2>
          <div class="row-right">
            <span class="row-right-word">
            </span>
            <span class="row-right-arrow">
              <svg fill="#d8d8d8" >
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
              </svg>
            </span>
          </div>
        </section>
      </router-link>
    </section>
    <section class="login-out">
      <div @click="_exitLogin()" class="ec_btn_model_submit">退出登录</div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'userdetail',
  data() {
    return {
      nickname: '木易',
      phoneNum: '17520460188',
    };
  },

  /*  components: {},

  computed: {},

  mounted: {}, */

  methods: {
    _uploadHeaderIcon() {
      //上传图片
    },
    _exitLogin() {
      //退出登录
    },
  },
};
</script>
<style lang='scss' scoped>
.user-detail {
  background-color: #fff;
  .row {
    position: relative;
    @include wh(auto, 95px);
    background-color: #fff;
    display: flex;
    margin-left: 30px;
    justify-content: center;
    justify-content: space-between;
    .img-upload {
      position: absolute;
      @include wh(100%, 100%);
      display: block;
      opacity: 0;
    }
    h2 {
      display: flex;
      align-items: center;
      @include sc(32px, #7c7c7c);
    }
    .row-right {
      padding-right: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      .header-right-img {
        display: inline-block;
        @include wh(118px, 118px);
        svg,
        img {
          @include wh(100%, 100%);
          @include borderRadius(50%);
        }
      }
      .row-right-word {
        display: inline-block;
        @include sc(26px, #8e8e92);
      }
      .row-right-arrow {
        margin-left: 16px;
        @include wh(30px, 55px);
        display: inline-block;
        svg {
          @include wh(100%, 100%);
        }
      }
    }
  }
  .bottom-line {
    border-bottom-color: #eaeaea;
    border-bottom-width: 1px; /* no */
    border-bottom-style: solid;
  }
  .headImg {
    @include wh(auto, 160px);
  }
  .split-area {
    background-color: #f2f2f2;
    height: 20px;
  }
  .login-out {
    width: 100%;
    position: fixed;
    bottom: 30px;
  }
}
</style>