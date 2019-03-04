<!-- 没查到数据显示页面和提示 -->
<template>
  <div class="no_data-wrap">
    <ul class="no_data">
      <li><img :src=iconsrc></li>
      <li>{{tips}}</li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'nodata',
  data() {
    return {};
  },
  /* iconname 图片名字 tips显示汉字 */
  props: { iconname: { type: String, default: 'blank_order.svg' }, tips: { type: String, default: '暂无记录' } },
  /* components: {}, */
  computed: {
    iconsrc: function() {
      return require('./nodataimg/' + this.iconname.replace(/^s+|\s+$/gm, ''));
    },
  },
  /*mounted: {},
  methods: {}, */
};
</script>
<style lang='scss' scoped>
.no_data-wrap {
  height: 100vh;
  background: #ffffff;
  ul.no_data {
    padding-top: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include sc(28px, #666666);
    li {
      margin-bottom: 50px;
      img {
        @include wh(200px, 200px);
      }
    }
  }
}
</style>