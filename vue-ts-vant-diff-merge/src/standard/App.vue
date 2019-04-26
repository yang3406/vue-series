<template>
  <div id="app">
    <transition>
      <navigation :name="transitionName">
        <router-view></router-view>
      </navigation>
    </transition>
    <ec-footer-tab v-show="isShowBar"></ec-footer-tab>
    <ec-svg-icon></ec-svg-icon>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ecFooterTab from './components/ec-footer';
import ecSvgIcon from './components/ec-svg';
export default {
  name: 'app',
  data() {
    return {
      transitionName: '',
    };
  },
  components: {
    ecFooterTab,
    ecSvgIcon,
  },
  computed: {
    /*  ...mapState({
      isShowBar: state => state.isShowBar,
    }), */
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
};
</script>

<style >
#app {
  width: 100%;
  height: 100%;
  min-width: 1280px;
  overflow-y: hidden;
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
</style>

