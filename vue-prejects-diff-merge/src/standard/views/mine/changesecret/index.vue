<!-- 修改密码 -->
<template>
  <div class="secret-area">
    <section class="input_container ec_input_icon_delete_container">
      <!-- <span>原密码：</span> -->
      <input type="password" v-focus @keyup="_checkValid()" v-model="oldpwd" class="show_clear_icon" required maxlength="20" placeholder="原密码(6-20位字母,数字或符号组成)">
      <svg class="clear_icon" @click="_clearData('oldpwd')">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_clear"></use>
      </svg>
    </section>
    <section class="input_container new_secret-area ec_input_icon_delete_container">
      <!-- <span>新密码：</span> -->
      <input type="password" v-model="newpwd" @keyup="_checkValid()" class="show_clear_icon" required placeholder="新密码(6-20位字母,数字或符号组成)">
      <svg class="clear_icon" @click="_clearData('newpwd')">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_clear"></use>
      </svg>
    </section>
    <section class="submit-area">
      <div :class="[isvalidbtn?'ec_btn_model_submit':'ec_btn_model_gray_submit','submit-btn']" @click='_changeSecret'>确认</div>
    </section>
  </div>
</template>

<script>
import { changPwd } from '@standard/api';
import MD5 from '@standard/common/js/md5';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      oldpwd: '',
      newpwd: '',
      isvalidbtn: false, //是否通过验证
    };
  },
  computed: {
    ...mapGetters(['getTelPho']),
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  methods: {
    _changeSecret() {
      let self = this;
      if (this.isvalidbtn) {
        self.$indicator.open();
        let param = { newPassWord: MD5(self.newpwd), oldPassWord: MD5(self.oldpwd), userPhoneNum: self.getTelPho };
        changPwd(param).then(function(res) {
          self.$indicator.close();
          self.$router.go(-1);
        });
      }
    },
    _checkValid() {
      this.isvalidbtn = false;
      if (this.oldpwd.length > 5 && this.newpwd.length > 5) {
        this.isvalidbtn = true;
      } else {
        this.isvalidbtn = false;
      }
    },
    _clearData(name) {
      this[name] = '';
      this._checkValid(name);
    },
  },
};
</script>
<style lang='scss' scoped>
$sizeColor: #444;
.secret-area {
  @include fixCover();
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
    margin-top: 80px;
    .submit-btn {
      width: 90%;
    }
  }
}
</style>
