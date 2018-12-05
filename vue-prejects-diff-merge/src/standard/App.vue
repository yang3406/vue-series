<template>
  <div id="app">
    <transition>
      <keep-alive>
        <router-view v-if='$route.meta.keepAlive'></router-view>
      </keep-alive>
    </transition>
    <transition :name="'name'">
      <router-view v-if='!$route.meta.keepAlive'></router-view>
    </transition>
    <ec-footer-tab v-show='isShowBar'></ec-footer-tab>
    <ec-svg-icon></ec-svg-icon>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ecFooterTab from '@standard/components/common/ec-footer';
import ecSvgIcon from '@standard/components/common/ec-svg';
export default {
  name: 'app',
  components: {
    ecFooterTab,
    ecSvgIcon,
  },
  computed: {
    ...mapState({
      isShowBar: state => state.isShowBar,
    }),
  },
};
</script>

<style lang='scss'>
#app {
  width: 100%;
  height: 100%;
}

/* .fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
} */

.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}

/* 更改模拟键盘的样式 */
.carnumboard {
  #inputboxWrapper {
    padding-top: 80px;
    background-color: #fff;
    background-image: linear-gradient(#fff, #fff);
  }
  #keyboardWrapper .keyboard-row:not(:first-child) .keyboard-item {
    @include sc(28px, #2e2e2e);
    height: 80px;
  }
  #inputboxWrapper .container-info {
    @include sc(28px, #999);
  }
  #inputboxWrapper .container-input {
    margin-top: 30px;
    height: auto;
  }

  #inputboxWrapper .container-input span {
    height: 88px;
    line-height: 88px;
    @include sc(42px, #444);
  }
  #inputboxWrapper .container-input span.focus {
    border-color: $citySkinColor;
  }
  #inputboxWrapper .container-input span.focus + span {
    border-left-color: $citySkinColor;
  }
  #inputboxWrapper .container-save-button {
    margin-top: 80px;
    height: 88px;
  }
  #inputboxWrapper .container-save-button .btnbind {
    line-height: 88px;
    background-color: $cityUnableOperateClr;
    letter-spacing: 5px;
    @include sc(36px, #fff);
  }
  #inputboxWrapper .container-save-button .btnbind.active {
    background-color: $citySkinColor;
  }

  #keyboardWrapper .keyboard-row:first-child span.keyboard-item {
    color: $citySkinColor;
  }
  #inputboxWrapper .container-switch-button {
    @include sc(30px, #666);
    line-height: 60px;
    margin-top: 50px;
  }
  #inputboxWrapper .container-switch-button::before {
    @include wh(60px, 60px);
  }
  .bar_bindcarnum {
    display: none;
  }
  #inputboxWrapper .container-input span:last-child.focus {
    border-right-color: $citySkinColor;
  }
}
/* 百度地图 去掉logo */
.anchorBL {
      display: none;
 }
</style>

