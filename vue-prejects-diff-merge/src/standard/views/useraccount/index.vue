<!-- 登录页面 2018.10.30 -->
<template>
  <div>
    <div class="loginContainer">
      <header class="clear">
        <div class="left header-wrap">
          <img :src="[$route.params.id == 'login' ? iconcross : iconback]" @click="$route.params.id == 'login' ? toggleTab('login'):$router.go(-1)" />
        </div>
        <div v-show="$route.params.id == 'login'" class="right header-wrap ">
          <span class="register_word" @click="toggleTab('register')">注册</span>
        </div>
      </header>

      <!-- 登录 信息要全部缓存-->
      <div class="login_area" v-show="$route.params.id == 'login'">
        <nav>
          <h1 class="nav-title">欢迎登录</h1>
        </nav>
        <form class="loginform">
          <section class="input_container">
            <input placeholder="手机号" type="number" @keyup="_checkValue('phoneNumber')" class="show_clear_icon" required maxlength="11" v-model="loginPhoneNumber">
            <img class="clear_icon" :src="iconclear" @click="_clearData('loginPhoneNumber')" />
          </section>
          <section class="input_container">
            <input placeholder="密码" type="password" @keyup="_checkValue('userPassword')" class="show_clear_icon" v-model="loginUserPassword">
            <img class="clear_icon" :src="iconclear" @click="_clearData('loginUserPassword')" />
          </section>
        </form>
        <section>
          <div :class="['loginbutton',isbtn?'actbtn':'']" @click="_loginSubmit">登 录</div>
          <section class="footer_section">
            <router-link to='/useraccount/forget' class="footer_word">忘记密码?</router-link>
          </section>
        </section>
      </div>

      <!-- 注册和忘记密码 -->
      <div class="login_register" v-show="$route.params.id == 'register' || $route.params.id == 'forget'">
        <nav>
          <h1 class="nav-title">欢迎注册</h1>
        </nav>
        <form class="loginform">
          <section class="input_container">
            <input placeholder="手机号" type="number" @keyup="_checkValue('phoneNumber')" class="show_clear_icon" required maxlength="11" v-model="phoneNumber">
            <img class="clear_icon" :src="iconclear" @click="_clearData('phoneNumber')"></img>
          </section>
          <section class="input_container">
            <input placeholder="验证码" type="text" @keyup="_checkValue('verfyCode')" v-model="verfyCode">
            <span :class="['verfyCode',isregpho?'activeVerfycode':'']" @click="_getCode()">{{verfyCodeTips}}</span>
          </section>
          <section class="input_container">
            <input placeholder="密码" type="password" @keyup="_checkValue('userPassword')" class="show_clear_icon" v-model="userPassword">
            <img class="clear_icon" :src="iconclear" @click="_clearData('userPassword')"></img>
          </section>
        </form>
        <section>
          <div :class="['loginbutton',isRegbtn?'actbtn':'']" @click="_regSubmit">注 册</div>
          <section class="footer_section">
            <span class="footer_word">注册表示你已同意</span>
            <span @click="$router.push('/userprotocol')" class="protocol_word">《用户使用协议》</span>
          </section>
        </section>
      </div>

      <ec-alert-tip v-show="showAlertTip" @closeTip="_closeTip" :alertText="alertText" :alertType="alertType"></ec-alert-tip>
    </div>
  </div>
</template>

<script>
import iconcross from '@img/public_crooss@2x.png';
import iconback from '@img/public_return_ic.png';
import iconclear from '@img/clear.png';
import ecAlertTip from '@standard/components/common/ec-alert-tip.vue';
import { isNullorEmpty } from '@standard/common/js/util.js';
export default {
  name: 'login',
  watch: {
    $route(to, from) {
      /*  if (to.path == 'register') {
        to.meta.keepAlive = true;
      } else {
        to.meta.keepAlive = false;
      } */
    },
  },
  data() {
    return {
      loginOperate: '', //操作页面 login登录 register注册 forget忘记密码
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
  beforeRouteUpdate(to, from, next) {
    if (to.path == '/useraccount/register') {
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  },
  components: {
    ecAlertTip: ecAlertTip,
  },
  /* 
  computed: {}, */

  mounted() {},

  methods: {
    //清除数据
    _clearData(name) {
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
      if (this.$route.params.id == 'login') {
        this.isbtn = false;
        switch (type) {
          case 'phoneNumber':
            if (!/^1\d{10}$/.test(this.loginPhoneNumber)) {
              //验证不通过
              this.isloginpho = false;
            } else {
              //验证通过
              this.isloginpho = true;
              this._controlLoginButton();
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
            if (!/^1\d{10}$/.test(this.phoneNumber)) {
              //验证不通过
              this.isregpho = false;
            } else {
              //验证通过
              this.isregpho = true;
              this._controlRegButton();
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
            } else {
              this.isregverfycode = false;
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
    toggleTab(operate) {
      this.$router.push('/useraccount/' + operate);
    },
    _closeTip() {
      this.showAlertTip = false;
    },
  },
};
</script>
<style lang='scss' scoped>
@import './index.scss';
</style>