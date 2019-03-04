<!--  -->
<template>
  <div class="leadermap">
    <ul>
      <li class="emptyline">
        <span></span>
        <span>空</span>
      </li>
      <li class="fullline">
        <span></span>
        <span>满</span>
      </li>
    </ul>
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
.leadermap {
  position: fixed;
  top: 21px; /* no */
  left: 18px;
  width: 70px;
  height: 80px;
  background-color: #fff;
  z-index: 9999;
  @include boxShadow(2px, 2px, 4px, #f5f5f5);
  @include borderRadius(5px);
  ul {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    @include sc(18px, #666666);
    .emptyline {
      margin-bottom: 2px;
      span:nth-child(1) {
        background-color: #03ae53;
        display: inline-block;
        @include wh(18px, 18px);
        @include borderRadius(50%);
        margin-right: 2px;
      }
    }
    .fullline {
      span:nth-child(1) {
        background-color: #f35734;
        display: inline-block;
        @include wh(18px, 18px);
        @include borderRadius(50%);
        margin-right: 2px;
      }
    }
  }
}
</style>