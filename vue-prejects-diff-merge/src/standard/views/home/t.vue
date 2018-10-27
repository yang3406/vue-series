<!--  -->
<template>
  <div>
    <div class="test">测试sass能不能用</div>
    <div class="tab">2</div>
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
.test {
  @include sc(75px, red);
}

.tab {
  @include wh(750px, 150px);
  border: 75px solid yellow;
}
</style>