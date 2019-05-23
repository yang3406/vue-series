<template>
  <div id="app">
    <transition :name="transitionName">
      <!-- <navigation :name="transitionName"> -->
      <router-view></router-view>
      <!-- </navigation> -->
    </transition>
    <ec-footer-tab v-show="isShowBar"></ec-footer-tab>
    <ec-svg-icon></ec-svg-icon>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { State } from 'vuex-class';
import ecFooterTab from './components/ec-footer.vue';
import ecSvgIcon from './components/ec-svg.vue';
@Component({
  components: {
    ecFooterTab,
    ecSvgIcon,
  },
})
export default class App extends Vue {
  @State isShowBar: boolean;
  transitionName: string = 'slide-right';
  /*  created() {
    //前进
    this.$navigation.on('forward', (to: object, from: object) => {
      console.log('forward');
      this.transitionName = 'slide-right';
    });
    //回退
    this.$navigation.on('back', (to: object, from: object) => {
      console.log('back');
      this.transitionName = 'slide-left';
    });
  } */
}
</script>

<style >
#app {
  width: 100%;
  height: 100%;
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

