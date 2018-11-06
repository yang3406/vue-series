<template>
  <div id="app">
    <transition name="fade" mode="out-in" v-if='$route.meta.keepAlive'>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <transition name='fade' v-else>
      <router-view/>
    </transition>
    <footer-tab v-show='isShowBar'></footer-tab>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import footer from '@standard/components/homesub/footer';
export default {
  name: 'app',
  components: {
    'footer-tab': footer,
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

