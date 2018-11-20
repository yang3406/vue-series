<template>
  <div id="app">
    <transition v-if='$route.meta.keepAlive'>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <transition v-else>
      <router-view></router-view>
    </transition>
    <footer-tab v-show='isShowBar'></footer-tab>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import footerTab from '@standard/components/common/footer';
import svgIcon from '@standard/components/common/svg';
export default {
  name: 'app',
  components: {
    footerTab,
    svgIcon,
  },
  computed: {
    ...mapState({
      isShowBar: state => state.isShowBar,
    }),
  },
};
</script>

<style >
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
</style>

