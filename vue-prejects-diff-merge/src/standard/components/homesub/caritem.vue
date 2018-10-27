<!-- home页面 用户车辆 列表展示 包含车牌 认证  是否自动支付 switch滑动选择 -->
<template>
  <div class="car-message-list">
    <div v-for="item in carList" :key="item.id">
      <ul>
        <li>
          <div class="div-inline-block circle-out">
            <div class="div-inline-block circle-in">
              <span class="circle-word">{{item.carname}}</span>
            </div>
          </div>
          <div class="div-inline-block">
            <span>{{item.carnum}}</span>
          </div>
          <div class="div-inline-block">
            <span>{{item.issure == 0 ? "未认证":"认证"}}</span>
          </div>
        </li>
        <li>
          <div class="div-inline-block">
            <span>自动支付</span>
          </div>
          <div class="div-inline-block">
            <label><input class="mui-switch" type="checkbox" :checked="item.isautopay == true"></label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'caritem',
  props: ['carList'],
  data() {
    return {};
  },
};
</script>
<style lang='scss' scoped>
@import '~@standard/common/css/multi.switch.scss';
.car-message-list ul {
  margin: 2% 5%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  .div-inline-block {
    vertical-align: middle;
    display: inline-block;
    box-sizing: border-box;
  }
  .circle-out {
    position: relative;
    border: 2px solid #c95e63;
    background: #e99e98;
    @include wh(60px, 60px);
    @include borderRadius(50%);
    .circle-in {
      position: absolute;
      @include wh(50px, 50px);
      @include borderRadius(50%);
      background-color: #fff;
      border: 2px solid #c95e63;
      text-align: center;
      margin: auto;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      .circle-word {
        @include sc(25px);
        @include center();
      }
    }
  }
  /* .mui-switch {
    @include wh(45px, 25px);
    @include borderRadius($radius);
    &:before {
      @include wh(30px, 20px);
      @include borderRadius($radius);
    }
  } */
}
</style>