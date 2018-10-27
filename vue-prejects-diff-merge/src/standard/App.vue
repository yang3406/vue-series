<template>
  <div id="app">
    <transition name="fade" mode="out-in" v-if='$route.meta.keepAlive'>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <transition name='fade' v-if="!$route.meta.keepAlive">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
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

