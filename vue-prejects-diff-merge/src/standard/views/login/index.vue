<!-- 登录页面 2018.10.30 -->
<template>
  <div class="loginContainer">
    <header class="clear">
      <div class="left header-wrap">
        <img :src="[isLoginOperate ? iconcross : iconback]" @click="isLoginOperate ? $router.go(-1) : toggleTab(true)">
      </div>
      <div v-show="isLoginOperate" class="right header-wrap ">
        <span class="register_word" @click="toggleTab(false)">注册</span>
      </div>
    </header>

    <nav>
      <h1 v-show="isLoginOperate" class="nav-title">欢迎登录</h1>
      <h1 v-show="!isLoginOperate" class="nav-title">手机号注册</h1>
    </nav>

    <form class="loginform" v-if="isLoginOperate" key="loginform">
      <section class="input_container">
        <input placeholder="手机号" type="text" @keyup="_checkValue('phoneNumber')" class="show_clear_icon" required maxlength="11" v-model="loginPhoneNumber">
        <img class="clear_icon" :src="iconclear" @click="_clearData('loginPhoneNumber')"></img>
      </section>
      <section class="input_container">
        <input placeholder="密码" type="password" @keyup="_checkValue('userPassword')" class="show_clear_icon" v-model="loginUserPassword">
        <img class="clear_icon" :src="iconclear" @click="_clearData('loginUserPassword')"></img>
      </section>
    </form>

    <form class="loginform" v-else key="registerform">
      <section class="input_container">
        <input placeholder="手机号" type="text" @keyup="_checkValue('phoneNumber')" class="show_clear_icon" required maxlength="11" v-model="phoneNumber">
        <img class="clear_icon" :src="iconclear" @click="_clearData('phoneNumber')"></img>
      </section>
      <section class="input_container">
        <input placeholder="验证码" type="text" @keyup="_checkValue('verfyCode')" v-model="verfyCode">
        <span class="verfyCode" @click="_getCode()">{{verfyCodeTips}}</span>
      </section>
      <section class="input_container">
        <input placeholder="密码" type="password" @keyup="_checkValue('userPassword')" class="show_clear_icon" v-model="userPassword">
        <img class="clear_icon" :src="iconclear" @click="_clearData('userPassword')"></img>
      </section>
    </form>

    <section v-if="isLoginOperate">
      <div :class="['loginbutton',isbtn?'actbtn':'']" @click="_loginSubmit">登录</div>
    </section>
    <section v-else="isLoginOperate">
      <div :class="['loginbutton',isRegbtn?'actbtn':'']" @click="_regSubmit">注册</div>
    </section>
    <section class="forget_section" v-if="isLoginOperate">
      <router-link to='/forget' class="to_forget">忘记密码</router-link>
    </section>
    <section v-else>
      <div>注册表示你已同意
        <router-link to="/userprotocol">
          <<用户使用协议>>
        </router-link>
      </div>
    </section>
    <alertTip v-show="showAlertTip" @closeTip="_closeTip" :alertText="alertText" :alertType="alertType"></alertTip>
  </div>
</template>

<script>
import iconcross from '@img/public_announcement_cross_gray@3x.png';
import iconback from '@img/public_return_ic.png';
import iconclear from '@img/clear.png';
import alertTip from '@standard/components/common/alertTip.vue';
import { isNullorEmpty } from '@standard/common/js/util.js';
export default {
  name: 'login',
  data() {
    return {
      isLoginOperate: true, //操作页面 true登录操作 false注册操作
      loginPhoneNumber: '', //登录用户名
      loginUserPassword: '', //登录密码
      phoneNumber: '', //手机号
      userPassword: '', //密码
      verfyCode: '', //验证码
      verfyCodeTips: '获取验证码', //验证码提示
      iconcross: iconcross,
      iconback: iconback,
      iconclear: iconclear,
      showAlertTip: false, //控制提示框提示与否
      alertText: '', //提示内容
      alertType: '', //提示等级
      timeLimit: 10,
      time: null, //定时器
      isbtn: false, //登录按钮显示灰色
      isRegbtn: false, //注册按钮显示灰色
      isGetverfyCode: false, //是否点击了获取验证码
      isCodeTimeOut: true, //当时间为0或大于num时 才能再次获取
      isloginpho: false, //登录验证手机号码是否通过
      isloginpwd: false, //登录验证密码是否通过
      isregpho: false, //注册验证手机号码是否通过
      isregpwd: false, //注册验证密码是否通过
      isregverfycode: false, //注册验证验证码是否通过
    };
  },

  components: {
    alertTip: alertTip,
  },
  /* 
  computed: {},

  mounted: {}, */

  methods: {
    //清除数据
    _clearData(name) {
      console.log(this[name]);
      this[name] = '';
      this._checkValue(name);
    },
    //获取验证码
    _getCode() {
      if (this.isCodeTimeOut && this.isregpho) {
        //undo 接口获取验证码 成功在调用下面方法
        this._timeAni();
        this.isGetverfyCode = true;
      }
    },
    //输入框验证
    _checkValue(type) {
      //登录页面
      if (this.isLoginOperate) {
        this.isbtn = false;
        switch (type) {
          case 'phoneNumber':
            if (this.loginPhoneNumber.length == 11) {
              if (!/^1\d{10}$/.test(this.loginPhoneNumber)) {
                //验证不通过
                this.isloginpho = false;
              } else {
                //验证通过
                this.isloginpho = true;
                this._controlLoginButton();
              }
            }
            break;
          case 'userPassword':
            //密码长度大于5
            if (this.loginUserPassword.length > 5) {
              this.isloginpwd = true;
              this._controlLoginButton();
            } else {
              this.isloginpwd = false;
            }
            break;
        }
      } else {
        //注册页面
        this.isRegbtn = false;
        switch (type) {
          case 'phoneNumber':
            if (this.phoneNumber.length == 11) {
              if (!/^1\d{10}$/.test(this.phoneNumber)) {
                //验证不通过
                this.isregpho = false;
              } else {
                //验证通过
                this.isregpho = true;
                this._controlRegButton();
              }
            }
            break;
          //验证码
          case 'verfyCode':
            if (this.isGetverfyCode) {
              //验证码长度暂定为1
              if (this.verfyCode.length > 1) {
                this.isregverfycode = true;
                this._controlRegButton();
              } else {
                this.isregverfycode = false;
              }
            }
            break;
          case 'userPassword':
            //密码长度大于5
            if (this.userPassword.length > 5) {
              this.isregpwd = true;
              this._controlRegButton();
            } else {
              this.isregpwd = false;
            }
            break;
        }
      }
    },
    //控制登录按钮变色
    _controlLoginButton() {
      if (this.isloginpho && this.isloginpwd) {
        this.isbtn = true;
      }
    },
    //控制注册按钮变色
    _controlRegButton() {
      if (this.isregpho && this.isregverfycode && this.isregpwd) {
        this.isRegbtn = true;
      }
    },
    //验证码倒计时
    _timeAni() {
      if (this.timeLimit == 0) {
        this.isCodeTimeOut = true;
        this.verfyCodeTips = '重新获取';
        this.timeLimit = 10;
        clearTimeout(this.time);
      } else {
        this.isCodeTimeOut = false;
        this.verfyCodeTips = '重新获取' + this.timeLimit + 's';
        this.timeLimit -= 1;
        this.time = setTimeout(() => {
          this._timeAni();
        }, 1000);
      }
    },
    _loginSubmit() {
      let mobileReg = /^1\d{10}$/;
      if (isNullorEmpty(this.phoneNumber)) {
        this.alertText = '请输入手机号';
        this.showAlertTip = true;
        return;
      } else if (!mobileReg.test(this.phoneNumber)) {
        this.alertText = '请输入正确的手机号';
        this.showAlertTip = true;
        return;
      }
      if (isNullorEmpty(this.userPassword) || this.userPassword.length < 6) {
        this.alertText = '请输入位数大于6的密码!';
        this.showAlertTip = true;
        return;
      }
    },
    _regSubmit() {},
    //切换登录注册tab
    toggleTab(boolean) {
      this.isLoginOperate = boolean;
    },
    _closeTip() {
      this.showAlertTip = false;
    },
  },
};
</script>
<style lang='scss' scoped>
$sizeColor: #444;
.loginContainer {
  margin: 20px 70px;
  .header-wrap {
    position: relative;
    @include wh(auto, 48px);
    vertical-align: middle;
    img {
      @include wh(32px, 32px);
      @include centerY();
    }
    .register_word {
      @include sc(32px, $sizeColor);
    }
  }
  .nav-title {
    margin-top: 106px;
    @include sc(60px, $sizeColor);
  }
  .loginform {
    margin-top: 60px;
    .input_container {
      position: relative;
      margin-bottom: 4px; /*no*/
      @include placeholder(28px, #999);
      input {
        @include sc(34px, $sizeColor);
        padding: 20px 2px;
        border-bottom-color: #ddd;
        border-bottom-width: 1px; /*no*/
        border-bottom-style: solid;
        width: 100%;
        &:active,
        &:focus {
          @include inputcaret($loginbgColor);
          //@include inputcaret(red);
          border-bottom-color: $loginbgColor;
          border-bottom-width: 2px; /*no*/
        }
        &:active + .verfyCode,
        &:focus + .verfyCode {
          color: $loginbgColor;
        }
      }
      /* 设置输入框是否显示清除按钮 */
      .clear_icon {
        display: none;
        @include centerY();
        @include wh(28px, 28px);
        right: 4px;
      }
      /* 验证码 */
      .verfyCode {
        @include centerY();
        @include sc(34px, #9999);
        right: 4px;
      }
      .show_clear_icon {
        &::-ms-clear {
          display: none;
        }
        &:focus:valid + .clear_icon {
          display: inline-block;
        }
      }
    }
  }
  .loginbutton {
    text-align: center;
    vertical-align: middle;
    margin-top: 88px;
    width: 100%;
    background-color: #d0d3d4;
    height: 88px;
    line-height: 88px;
    @include sc(36px, #fff);
    @include borderRadius(44px);
  }
  .actbtn {
    background-color: #508cee;
  }
  .forget_section {
    text-align: center;
    .to_forget {
      display: inline-block;
      margin-top: 56px;
      text-align: center;
      @include sc(34px, #9999);
    }
  }
}
</style>