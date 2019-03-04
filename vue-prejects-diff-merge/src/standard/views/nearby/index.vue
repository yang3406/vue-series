<!--  -->
<template>
  <div class="nearby-warp">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang='scss' scoped>
.nearby-warp {
  @include wh(100%, 100%);
}
</style>