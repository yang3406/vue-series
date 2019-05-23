<!-- 没找到匹配路由 -->
<template>
  <div class="notopen">
    <img :src="smileIcon">
    <h2>此功能稍后开放！</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smileIcon: require('./img/smile.svg'),
    };
  },
};
</script>
<style lang='scss' scoped>
.notopen {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  img {
    @include wh(200px, 200px);
  }
  h2 {
    margin-top: 20px;
    @include sc(25px, #444444);
  }
}
</style>