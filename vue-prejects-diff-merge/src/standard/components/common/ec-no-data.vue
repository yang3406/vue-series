<!-- 没查到数据显示页面和提示 -->
<template>
  <div>
    <ul class="no_data">
      <li><img :src=iconsrc></li>
      <li>{{tips}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'nodata',
  data() {
    return {};
  },
  /* iconname 图片名字 tips显示汉字 */
  props: { iconname: { type: String }, tips: { type: String, default: '暂无记录' } },
  /* components: {}, */
  computed: {
    iconsrc: function() {
      return './nodataimg/' + this.iconname.replace(/^s+|\s+$/gm, '') + '.png';
    },
  },
  /*mounted: {},
  methods: {}, */
};
</script>
<style lang='scss' scoped>
ul.no_data {
  margin-top: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include sc(28px, #666666);
  li {
    margin-bottom: 50px;
    img {
      @include wh(180px, 180px);
    }
  }
}
</style>