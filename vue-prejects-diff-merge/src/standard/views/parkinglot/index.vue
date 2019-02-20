/*
 * @Author: yangjs 
 * @Date: 2019-01-04 14:34:10 
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-01-08 18:18:08
 */
<!--  -->
<template>
  <div class="parking_lot_wrap">
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
.parking_lot_wrap {
  @include wh(100%, 100%);
  background-color: #ffffff;
}
</style>