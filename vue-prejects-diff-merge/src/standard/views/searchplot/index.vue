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
      <form action="javascript:return true" @submit.prevent="formSubmit">
        <div class="top-contain">
          <i>
            <svg fill="#c0c0c0">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_search"></use>
            </svg>
          </i>
          <input type="search" placeholder="输入车场关键字" @keyup.enter="searchPlot" v-model="keyword">
          <i @click="_cleardata()">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_clear"></use>
            </svg>
          </i>
        </div>
      </form>
    </section>
    <section class="plot_area">
      <mt-loadmore :auto-fill="false" :bottom-method="_loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <!-- 没有记录 -->
        <section v-if="totalCount == 0">
          <no-data :iconname="'blank_parkinglot.svg'" :tips="'附近没有停车场哦!'"></no-data>
        </section>

        <section v-else>

        </section>
      </mt-loadmore>
    </section>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui';
import noData from '@standard/components/common/ec-no-data.vue';
export default {
  data() {
    return {
      keyword: '',
      totalCount: 0, //总条数
      pageSize: 10, //每次请求多少条
      pageIndex: 1, //第几页
      allLoaded: false, //是否全部加载完
      parkingplotobj: {
        list: [],
      },
    };
  },
  components: {
    mtLoadmore: Loadmore,
    noData,
  },
  /* 
  computed: {},
 */
  mounted() {
    this.$indicator.open();
    this._initParkingLot();
  },

  methods: {
    formSubmit() {
      return false;
    },
    searchPlot() {
      alert('正在搜索');
    },
    _cleardata() {
      this.keyword = '';
    },
    //加载更多
    _loadBottom() {},
    //初始化停车场列表
    _initParkingLot() {
      this.$indicator.close();
    },
  },
};
</script>
<style lang='scss' scoped>
.search-wrapper {
  @include pageColor();
  $fixh: 100px;
  .fix-input {
    position: fixed;
    z-index: 1001;
    box-sizing: border-box;
    height: $fixh;
    width: 100%;
    @include placeholder(26px, #bbbaba);
    padding: 20px 0;
    top: 0;
    background-color: #d9d9d9;
    .top-contain {
      background-color: #fff;
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
          display: inline-block;
          @include centerY();
          padding: 0 10px 0 15px;
          @include wh(35px, 35px);
        }
      }
      input {
        height: 100%;
        line-height: 100%;
        @include sc(26px, #444);
        -webkit-appearance: none;
        -moz-appearance: none;
        flex-grow: 1;
        padding: 0 10px;
      }
      input[type='search']::-webkit-search-cancel-button {
        display: none;
      }
    }
  }
  .plot_area {
    padding-top: $fixh;
  }
}
</style>