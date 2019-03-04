/*
 * @Author: yangjs 
 * @Date: 2018-12-15 15:28:24 
 * @Last Modified by: yangjs
 * @Last Modified time: 2018-12-23 12:02:25
 */
<template>
  <div class="useraccount">
    <div class="loginContainer">
      <header>
        <div class="header-wrap">
          <div class="clear">
            <div class="left header-svg" @click="$router.go(-1)">
              <svg fill="gray">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_back"></use>
              </svg>
            </div>
          </div>
        </div>
      </header>
      <div>
        <nav>
          <h1 class="nav-title">设置新密码</h1>
        </nav>
        <form class="loginform">
          <section class="input_container">
            <input placeholder="密码（6-20位字母，数字或符号组成）" type="password" @keyup="_checkValue('userPassword')" required class="show_clear_icon" v-model="userPassword">
            <svg class="clear_icon" @click="_clearData('userPassword')">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_clear"></use>
            </svg>
          </section>
        </form>
        <section>
          <div :class="['loginbutton',isbtn?'actbtn':'']" @click="_resetPwdSubmit">确认</div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { changPwd } from '@standard/api';
import MD5 from '@standard/common/js/md5';
export default {
  name: 'resetpwd',
  data() {
    return {
      phonenum: '',
      userPassword: '', //密码
      isbtn: false, //按钮显示灰色
    };
  },
  mounted() {
    this.phonenum = this.$route.query.phonenum;
  },
  methods: {
    //清除数据
    _clearData(name) {
      this[name] = '';
      this._checkValue(name);
    },

    //输入框验证
    _checkValue(field) {
      this.isbtn = false;
      switch (field) {
        case 'userPassword':
          //密码长度大于5
          if (this.userPassword.length > 5) {
            this.isbtn = true;
          } else {
            this.isbtn = false;
          }
          break;
      }
    },
    _resetPwdSubmit() {
      var self = this;
      if (this.isbtn) {
        self.$indicator.open();
        let resetParam = {
          userPhoneNum: self.phonenum,
          newPassWord: MD5(self.userPassword),
        };
        changPwd(resetParam).then(function(res) {
          self.$indicator.close();
          self.$router.push({ path: '/useraccount/login', query: { phonenum: self.phoneNumber } });
        });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
@import '../index.scss';
</style>