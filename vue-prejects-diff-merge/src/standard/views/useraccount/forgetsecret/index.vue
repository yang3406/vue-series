/*
 * @Author: yangjs 
 * @Date: 2018-12-15 15:28:24 
 * @Last Modified by: yangjs
 * @Last Modified time: 2018-12-27 17:57:29
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
          <h1 class="nav-title">忘记密码</h1>
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
        </form>
        <section>
          <div :class="['loginbutton',isResetPwdbtn?'actbtn':'']" @click="_validUserSubmit">下一步</div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { checkPhoneNum, getVerfyCode, compareCode } from '@standard/api';
import imgVerfy from '../components/canvasverfy';
export default {
  name: 'resetpwd',
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
      isResetPwdbtn: false,
      isgetCode: false, //是否能点击获取验证码
      isGetverfyCode: false, //是否点击了获取验证码
      isCodeTimeOut: true, //当时间为0或大于num时 才能再次获取
      validphone: false, //重置密码验证手机号码是否通过
      validregimgcode: false, //是否是正确的图形验证码
      validverfycode: false, //忘记密码验证码是否通过
      businesstype: 3, //业务类型-必填 1-注册 2-重置密码 3-找回账号
    };
  },
  components: {
    imgVerfy,
  },
  /* 
  computed: {}, */

  mounted() {
    this._refreshImgCode();
  },
  methods: {
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
      if (this.isgetCode) {
        let self = this;
        self.securitycodeid = '';
        if (self.isgetCode) {
          checkPhoneNum({ userPhoneNum: self.phoneNumber }).then(function(res) {
            //判断是否注册 1未注册  2已注册
            if (res.isregistered === 2 || res.isregistered === '2') {
              let verfyCodeObj = { businesstype: self.businesstype, phonenum: self.phoneNumber };
              getVerfyCode(verfyCodeObj).then(function(res) {
                self.securitycodeid = res.securitycodeid;
                self._timeAni();
                self.isGetverfyCode = true;
              });
            } else {
              self.$messagebox('温馨提示', '账号未注册，请先注册');
            }
          });
        }
      }
    },
    //输入框验证
    _checkValue(field) {
      this.isResetPwdbtn = false;
      switch (field) {
        case 'phoneNumber':
          this.phoneNumber = this.phoneNumber.replace(/[^\d]/g, '');
          if (!/^1\d{10}$/.test(this.phoneNumber)) {
            //验证不通过
            this.validphone = false;
          } else {
            //验证通过
            this.validphone = true;
          }
          this._controlGetCode();
          this._controlResetPwdButton();
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
            //验证码长度为6位
            if (this.verfyCode.length > 4) {
              this.validverfycode = true;
            } else {
              this.validverfycode = false;
            }
          } else {
            this.validverfycode = false;
          }
          this._controlResetPwdButton();
          break;
      }
    },
    //控制能否点击获取验证码
    _controlGetCode() {
      if (this.validphone && this.validregimgcode && this.isCodeTimeOut) {
        this.isgetCode = true;
      } else {
        this.isgetCode = false;
      }
    },
    //控制注册按钮变色
    _controlResetPwdButton() {
      if (this.validphone && this.validverfycode) {
        this.isResetPwdbtn = true;
      } else {
        this.isResetPwdbtn = false;
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
    _validUserSubmit() {
      var self = this;
      if (this.isResetPwdbtn) {
        self.$indicator.open();
        let validParams = {
          businesstype: self.businesstype,
          securitycode: self.verfyCode,
          securitycodeid: self.securitycodeid,
          phonenum: self.phoneNumber,
        };
        //验证验证码
        compareCode(validParams).then(function(res) {
          self.$indicator.close();
          self.$router.push({ path: '/useraccount/resetpwd', query: { phonenum: self.phoneNumber } });
        });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
@import '../index.scss';
</style>