/*
 * @Author: yangjs 
 * @Date: 2019-02-26 16:47:01 
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-03-04 10:46:46
 */
<!--  -->
<template>
  <div class="search-wrapper">
    <section class="fix-input">
      <div class="top-contain">
        <i>
          <svg fill="#c0c0c0">
            <use xlink:href="#svg_search"></use>
          </svg>
        </i>
        <input type="search" placeholder="输入车场关键字" v-model="keyword">
      </div>
    </section>
    <section class="">
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
    };
  },

  /*  components: {},

  computed: {},

  mounted: {},

  methods: {}, */
};
</script>
<style lang='scss' scoped>
.search-wrapper {
  @include pageColor();
  $fixh: 100px;
  .fix-input {
    position: fixed;
    box-sizing: border-box;
    height: $fixh;
    width: 100%;
    @include placeholder(26px, #bbbaba);
    padding: 20px 0;
    top: 0;
    background-color: #d9d9d9;
    .top-contain {
      background-color: #ffff;
      width: 95%;
      margin: 0 auto;
      @include borderRadius(20px);
      height: 60px;
      display: flex;
      flex-flow: row nowrap;
      i {
        position: relative;
        height: 100%;
        display: inline-block;
        width: 60px;
        svg {
          @include centerY();
          padding: 0 10px 0 15px;
          @include wh(35px, 35px);
        }
      }
      input {
        height: 100%;
        line-height: 100%;
        @include sc(26px, #444444);
        -webkit-appearance: none;
        -moz-appearance: none;
        flex-grow: 1;
        padding: 0 10px;
      }
    }
  }
}
</style>