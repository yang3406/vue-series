/*
 * @Author: yangjs 
 * @Date: 2019-02-26 15:49:41 
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-03-04 10:13:09
 */
<template>
  <div class="monthcard">
    <mt-loadmore class="wrapper" :top-method="_loadTop" ref="refresh">
      <section v-if="totalCount == 0">
        <no-data :iconname="'blank_month_card.svg'" :tips="'您还没办理过月卡哦'">
          <div class="ec_btn_model_submit handle_btn" @click="_handleCard">立即办理</div>
        </no-data>
      </section>
      <section v-else>

      </section>
    </mt-loadmore>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui';
import noData from '@standard/components/common/ec-no-data.vue';
export default {
  data() {
    return {
      totalCount: 0,
    };
  },

  components: {
    mtLoadmore: Loadmore,
    noData,
  },

  /* computed: {},

  mounted: {},
 */
  methods: {
    //下拉刷新
    _loadTop() {
      console.log('我是下拉刷新');
      this.$refs.refresh.onTopLoaded(); //重置位置
    },
    _handleCard() {
      //办理月卡 选择停车场
      this.$router.push({ name: 'searchplot' });
    },
  },
};
</script>
<style lang='scss' scoped>
.monthcard {
  overflow-y: scroll;
  @include pageColor();
  .handle_btn {
    margin-top: 120px;
    width: 90%;
  }
}
</style>