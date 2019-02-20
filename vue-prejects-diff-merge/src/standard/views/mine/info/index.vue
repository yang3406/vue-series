<!-- 我的详情 -->
<template>
  <div>
    <div class="user-detail">
      <section>
        <section class="row headImg bottom-line">
          <!-- <input type="file" class="img-upload" @change="_uploadHeaderIcon" accept="image/*"> -->
          <!-- <div class="img-upload" id='pick-avatar'></div> -->
          <h2>头像</h2>
          <div class="row-right">
            <span class="header-right-img row-right-text">
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink " xlink:href="#svg_default_car"></use>
              </svg>
            </span>
            <span class="row-right-arrow"></span>
          </div>
        </section>
        <router-link to='/mine/nickname'>
          <section class="row bottom-line ">
            <h2>昵称</h2>
            <div class="row-right ">
              <span class="row-right-word ">
                {{nickname}}
              </span>
              <span class="row-right-arrow ">
                <svg fill="#d8d8d8 ">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink " xlink:href="#svg_arrow_right "></use>
                </svg>
              </span>
            </div>
          </section>
        </router-link>

        <section class="row ">
          <h2>账号</h2>
          <div class="row-right ">
            <span class="row-right-word ">
              {{phoneNum}}
            </span>
            <span class="row-right-arrow ">
            </span>
          </div>
        </section>

        <div class="split-area "></div>

        <router-link to="/mine/changesecret">
          <section class="row ">
            <h2>密码修改</h2>
            <div class="row-right">
              <span class="row-right-word ">
              </span>
              <span class="row-right-arrow ">
                <svg fill="#d8d8d8 ">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink " xlink:href="#svg_arrow_right "></use>
                </svg>
              </span>
            </div>
          </section>
        </router-link>
      </section>
    </div>
    <section class="login-out ">
      <div @click="_exitLogin() " class="ec_btn_model_submit ">退出登录</div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { CHANGE_MEBINFO } from '@standard/store/mutation-types.js';
import reqpath from '@standard/api/config';
import { getUserCookieInfo } from '@standard/common/js/http';
import apiConfig from '@standard/api/config';
export default {
  name: 'userdetail',
  data() {
    return {
      nickname: '',
      phoneNum: '',
      uploadOBj: {},
      upLoadURL: reqpath.upLoadUrl,
      outputOptions: {
        width: 600,
        height: 600,
      },
    };
  },

  computed: {
    ...mapGetters(['getNickName', 'getTelPho', 'getAvatarIco']),
  },
  components: {},
  mounted() {
    this.nickname = this.getNickName;
    this.phoneNum = this.getTelPho;
  },
  methods: {
    ...mapMutations({ CHANGE_MEBINFO }),
    //上传图片
    _submitIcon() {
      let params = { img_type: 'png', method: 'upLoadImgForApp', module: 'sys', service: 'File' };
      let userParam = {
        ve: 1,
        clientType: apiConfig.clientType,
        ts: new Date().getTime(),
        appId: apiConfig.appId,
        comid: apiConfig.stdComid,
      };
      let obj = Object.assign(params, userParam, getUserCookieInfo());
      //this.uploadFormName = getUserCookieInfo().u;
      this.uploadOBj = obj;
      this.upLoadURL =
        reqpath.upLoadUrl +
        'ClientType=android&appId=&comid=200000015&img_type=png&method=upLoadImgForApp&module=sys&service=File&ts=' +
        userParam.ts +
        '&u=' +
        getUserCookieInfo().u +
        '&v=' +
        getUserCookieInfo() +
        '&ve=' +
        userParam.ve;
    },
    //退出登录
    _exitLogin() {
      this.CHANGE_MEBINFO();
      this.$router.push('/useraccount/login');
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
    .avatar-label {
      position: absolute;
      @include wh(0, 0);
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
}
.login-out {
  margin: 0 auto;
  margin-top: 60px;
  width: 90%;
}
</style>
