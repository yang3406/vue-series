<template>
  <div id="app">
    <transition >
      <keep-alive>
        <router-view v-if='$route.meta.keepAlive'></router-view>
      </keep-alive>
    </transition>
    <transition :name="'name'">
      <router-view  v-if='!$route.meta.keepAlive'></router-view>
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

