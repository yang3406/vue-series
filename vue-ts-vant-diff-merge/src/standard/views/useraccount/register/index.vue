
/*
 * @Author: yangjs 
 * @Date: 2018-12-15 15:28:24 
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-05-21 18:19:12
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
      <div class="login_register">
        <nav>
          <h1 class="nav-title">欢迎注册</h1>
        </nav>
        <form class="loginform">
          <section class="input_container">
            <input placeholder="手机号" type="tel" @keyup="_checkValue('phoneNumber')" class="show_clear_icon" required maxlength="11" v-model="phoneNumber">
            <svg class="clear_icon" @click="_clearData('phoneNumber')">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_clear"></use>
            </svg>
          </section>
          <section class="input_container">
            <input placeholder="图形码" type="tel" @keyup="_checkValue('imgVerfyCode')" v-model="imgVerfyCode">
            <div class="verfyCode" @click="_refreshImgCode()">
              <img-verfy :identifyCode='randNumCode'></img-verfy>
            </div>
          </section>
          <section class="input_container">
            <input placeholder="验证码" type="text" @keyup="_checkValue('verfyCode')" v-model="verfyCode">
            <span :class="['verfyCode',isgetCode?'activeVerfycode':'']" @click="_getCode()">{{verfyCodeTips}}</span>
          </section>
          <section class="input_container">
            <input placeholder="密码（6-20位字母，数字或符号组成）" type="password" @keyup="_checkValue('userPassword')" required class="show_clear_icon" v-model="userPassword">
            <svg class="clear_icon" @click="_clearData('userPassword')">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_clear"></use>
            </svg>
          </section>
        </form>
        <section>
          <div :class="['loginbutton',isRegbtn?'actbtn':'']" @click="_regSubmit">注 册</div>
          <section class="footer_section">
            <span class="footer_word">注册表示您已同意</span>
            <span @click="$router.push('/useraccount/protocol')" class="protocol_word">《用户使用协议》</span>
          </section>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { checkPhoneNum, getVerfyCode, registerMeb, compareCode } from '@standard/api';
import MD5 from '@standard/common/js/commands/command/md5';
import { mapMutations } from 'vuex';
import { CHANGE_MEBINFO } from '@standard/store/mutation-types';
import imgVerfy from '../components/canvasverfy';
export default {
  name: 'register',
  data() {
    return {
      phoneNumber: '', //手机号
      userPassword: '', //密码
      verfyCode: '', //验证码
      securitycodeid: '', //后台返回的验证码id
      imgVerfyCode: '', //图形码
      randNumLen: 4, //随机生成的数字验证码的长度
      randNumCode: '', //随机生成的数字验证码
      verfyCodeTips: '获取验证码', //验证码提示
      timeLimit: 60,
      time: null, //定时器
      isRegbtn: false, //注册按钮显示灰色
      isgetCode: false, //是否能点击获取验证码
      isGetverfyCode: false, //是否点击了获取验证码
      isCodeTimeOut: true, //当时间为0或大于num时 才能再次获取
      validregpho: false, //注册验证手机号码是否通过
      validregpwd: false, //注册验证密码是否通过
      validregimgcode: false, //是否是正确的图形验证码
      validregverfycode: false, //注册验证码是否通过
      businesstype: 1, //业务类型-必填 1-注册 2-重置密码 3-找回账号
      openid: '',
    };
  },
  components: {
    imgVerfy,
  },

  mounted() {
    this._refreshImgCode();
  },
  methods: {
    ...mapMutations({ CHANGE_MEBINFO }),

    //清除数据
    _clearData(name) {
      this[name] = '';
      this._checkValue(name);
    },
    //创建 刷新图形验证码
    _refreshImgCode() {
      let tempRandNum = '';
      for (let i = 0; i < this.randNumLen; i++) {
        tempRandNum += parseInt(Math.random() * 10);
      }
      this.randNumCode = tempRandNum;
      this._checkValue('imgVerfyCode');
    },
    //获取验证码
    _getCode() {
      let self = this;
      self.securitycodeid = '';
      //先判断是否已经注册
      if (self.isgetCode) {
        checkPhoneNum({ userPhoneNum: self.phoneNumber }).then(function(res) {
          //isregistered 1未注册  2已注册
          if (res.isregistered === 1 || res.isregistered === '1') {
            let verfyCodeObj = {
              businesstype: self.businesstype,
              phonenum: self.phoneNumber,
            };
            getVerfyCode(verfyCodeObj).then(function(res) {
              self.securitycodeid = res.securitycodeid;
              //接口获取验证码 成功在调用下面方法
              self._timeAni();
              self.isGetverfyCode = true;
            });
          } else {
            self.$messagebox('温馨提示', res.message);
          }
        });
      }
    },
    //输入框验证
    _checkValue(field) {
      this.isRegbtn = false;
      switch (field) {
        case 'phoneNumber':
          this.phoneNumber = this.phoneNumber.replace(/[^\d]/g, '');
          if (!/^1\d{10}$/.test(this.phoneNumber)) {
            //验证不通过
            this.validregpho = false;
          } else {
            //验证通过
            this.validregpho = true;
          }
          this._controlGetCode();
          this._controlRegButton();
          break;
        //图形验证码
        case 'imgVerfyCode':
          if (this.imgVerfyCode == this.randNumCode) {
            this.validregimgcode = true;
          } else {
            this.validregimgcode = false;
          }
          this._controlGetCode();
          break;
        //验证码
        case 'verfyCode':
          if (this.isGetverfyCode) {
            //验证码长度暂定大于4
            if (this.verfyCode.length > 4) {
              this.validregverfycode = true;
            } else {
              this.validregverfycode = false;
            }
          } else {
            this.validregverfycode = false;
          }
          this._controlRegButton();
          break;
        case 'userPassword':
          //密码长度大于5
          if (this.userPassword.length > 5) {
            this.validregpwd = true;
          } else {
            this.validregpwd = false;
          }
          this._controlRegButton();
          break;
      }
    },
    //控制能否点击获取验证码
    _controlGetCode() {
      if (this.validregpho && this.validregimgcode && this.isCodeTimeOut) {
        this.isgetCode = true;
      } else {
        this.isgetCode = false;
      }
    },
    //控制注册按钮变色
    _controlRegButton() {
      if (this.validregpho && this.validregverfycode && this.validregpwd) {
        this.isRegbtn = true;
      } else {
        this.isRegbtn = false;
      }
    },
    //验证码倒计时
    _timeAni() {
      if (this.timeLimit == 0) {
        this.isCodeTimeOut = true;
        this.verfyCodeTips = '重新获取';
        this.timeLimit = 60;
        clearTimeout(this.time);
      } else {
        this.isCodeTimeOut = false;
        this.verfyCodeTips = '重新获取' + this.timeLimit + 's';
        this.timeLimit -= 1;
        this.time = setTimeout(() => {
          this._timeAni();
        }, 1000);
      }
      this._controlGetCode();
    },
    _regSubmit() {
      var self = this;
      if (self.isRegbtn) {
        self.$indicator.open();
        //先进行校验
        let validParams = {
          businesstype: self.businesstype,
          securitycode: self.verfyCode,
          securitycodeid: self.securitycodeid,
          phonenum: self.phoneNumber,
        };
        compareCode(validParams).then(function(res) {
          let regParam = {
            userPhoneNum: self.phoneNumber,
            userPwd: MD5(self.userPassword),
            weixinid: self.openid,
            // 新注册参数 weixinid 工行环境才传 否则传空 userPhoneNum userPwd comid
          };
          registerMeb(regParam).then(function(res) {
            self.$indicator.close();
            self.CHANGE_MEBINFO(res);
            self.$router.push('/mine');
          });
        });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
@import '../index.scss';
</style>