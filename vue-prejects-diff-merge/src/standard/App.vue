<template>
  <div id="app">
    <transition name="fade" mode="out-in">
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
/* @import url('./common/css/reset.scss');
@import url('./common/css/common.scss');
@import url('./common/css/mixin.scss'); */
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

