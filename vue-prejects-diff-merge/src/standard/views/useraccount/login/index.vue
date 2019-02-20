/*
 * @Author: yangjs 
 * @Date: 2018-12-15 15:05:21 
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-01-09 11:54:22
 */
<!-- 登录页面 2018.10.30 -->
<template>
  <div class="useraccount">
    <div class="loginContainer">
      <header>
        <div class="header-wrap">
          <div class="clear">
            <div class="left header-svg">
              <!-- <svg fill="gray">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_close"></use>
              </svg> -->
            </div>
            <div class="right">
              <span class="register_word" @click="_toggleTab('register')">注册</span>
            </div>
          </div>
        </div>
      </header>

      <!-- 登录 信息要全部缓存-->
      <div class="login_area">
        <nav>
          <h1 class="nav-title">欢迎登录</h1>
        </nav>
        <form class="loginform">
          <section class="input_container">
            <input placeholder="手机号" type="tel" @keyup="_checkValue('loginPhoneNumber')" class="show_clear_icon" required maxlength="11" v-model="loginPhoneNumber">
            <svg class="clear_icon" @click="_clearData('loginPhoneNumber')">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_clear"></use>
            </svg>
          </section>
          <section class="input_container">
            <input placeholder="密码" type="password" @keyup="_checkValue('loginUserPassword')" class="show_clear_icon" required v-model="loginUserPassword">
            <svg class="clear_icon" @click="_clearData('loginUserPassword')">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_clear"></use>
            </svg>
          </section>
        </form>
        <section>
          <div :class="['loginbutton',isLoginbtn?'actbtn':'']" @click="_loginSubmit">登 录</div>
          <section class="footer_section">
            <router-link to='/useraccount/forgetsecret' class="footer_word">忘记密码?</router-link>
          </section>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { CHANGE_MEBINFO } from '@standard/store/mutation-types.js';
import { login } from '@standard/api';
import MD5 from '@standard/common/js/md5';
export default {
  name: 'login',
  data() {
    return {
      loginOperate: '', //操作页面 login登录 register注册 forget忘记密码
      loginPhoneNumber: '', //登录用户名
      loginUserPassword: '', //登录密码
      isLoginbtn: false, //登录按钮显示灰色
      isloginpho: false, //登录验证手机号码是否通过
      isloginpwd: false, //登录验证密码是否通过
    };
  },
  /* beforeRouteEnter(to, from, next) {
    if (from.path.includes('useraccount')) {
      to.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
    }
    next(vm => {
      vm.loginUserPassword = '';
      if (from.path.includes('resetpwd')) {
        vm.loginPhoneNumber = vm.$router.query.phonenum;
      }
    });
  }, */
  mounted() {},
  methods: {
    ...mapMutations({ CHANGE_MEBINFO }),
    //清除数据
    _clearData(name) {
      this[name] = '';
      this._checkValue(name);
    },
    //输入框验证
    _checkValue(field) {
      //登录页面
      this.isLoginbtn = false;
      switch (field) {
        case 'loginPhoneNumber':
          this.loginPhoneNumber = this.loginPhoneNumber.replace(/[^\d]/g, '');
          if (!/^1\d{10}$/.test(this.loginPhoneNumber)) {
            //验证不通过
            this.isloginpho = false;
          } else {
            //验证通过
            this.isloginpho = true;
          }
          this._controlLoginButton();
          break;
        case 'loginUserPassword':
          //密码长度大于5
          if (this.loginUserPassword.length > 5) {
            this.isloginpwd = true;
          } else {
            this.isloginpwd = false;
          }
          this._controlLoginButton();
          break;
      }
    },
    //控制登录按钮变色
    _controlLoginButton() {
      if (this.isloginpho && this.isloginpwd) {
        this.isLoginbtn = true;
      }
    },
    _loginSubmit() {
      let self = this;
      if (self.isLoginbtn) {
        let loginParam = {
          userPhoneNum: self.loginPhoneNumber,
          userPwd: MD5(self.loginUserPassword),
        };
        self.$indicator.open();
        login(loginParam).then(function(res) {
          self.$indicator.close();
          self.CHANGE_MEBINFO(res);
          self.$router.push('/mine');
        });
      }
    },
    //切换登录注册tab
    _toggleTab(operate) {
      this.$router.push('/useraccount/' + operate);
    },
  },
};
</script>
<style lang='scss' scoped>
@import '../index.scss';
</style>