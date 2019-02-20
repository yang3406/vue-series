/*
 * @Author: yangjs 
 * @Date: 2018-12-07 16:23:39 
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-01-09 15:10:28
 */
<template>
  <div id="app">
    <!-- <transition>
      <keep-alive>
        <router-view v-if='$route.meta.keepAlive'></router-view>
      </keep-alive>
    </transition>
    <router-view v-if='!$route.meta.keepAlive'></router-view> -->
    <transition :name="transitionName">
      <navigation>
        <router-view></router-view>
      </navigation>
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
  data() {
    return {
      transitionName: '',
    };
  },
  created() {
    //前进
    this.$navigation.on('forward', (to, from) => {
      console.log('forward');
      this.transitionName = 'slide-right';
    });
    //回退
    this.$navigation.on('back', (to, from) => {
      console.log('back');
      this.transitionName = 'slide-left';
    });
  },
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

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s;
}
.slide-right-enter,
.slide-right-leave-to {
  transition: all 0.5s;
  transform: translate3d(-100%, 0, 0);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s;
  opacity: 0.8;
}
.slide-left-enter,
.slide-left-leave-to {
  transition: all 0.5s;
  transform: translate3d(100%, 0, 0);
  opacity: 0.8;
}

.clear:after {
  content: '';
  display: block;
  clear: both;
}

.clear {
  zoom: 1;
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
//设置轮播图的颜色
.mint-swipe-indicator {
  border-width: 1px; /* no */
  border-color: #000;
  border-style: solid;
}

.car_swiper_pannel {
  .mint-swipe-indicators {
    .mint-swipe-indicator.is-active {
      opacity: 1;
      border-color: #fff;
    }
  }
}
/* 百度地图*/
/* -----start------------ */
//不能去掉 会把定位的按钮也去掉
/* .anchorBL { 
  display: none;
} */

//控住内嵌图的大小
.BMap_Marker {
  img {
    @include wh(100%, 100%);
  }
}

#maptextpanel .suggest-plan-des + a {
  display: none;
}
</style>

