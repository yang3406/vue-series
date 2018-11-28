<!-- 百度地图 附近停车场-->
<template>
  <div class="baidu-map">
    <baidu-map :center="center" :zoom="zoom" @ready="handler" :ak="ak"></baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
export default {
  name: 'nearby',
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      ak: 'o7R0tflUIV5jBoN5hRs4T7cj',
    };
  },

  components: { BaiduMap },

  /*computed: {},

  mounted: {},*/

  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },
  },
};
</script>
<style lang='scss' scoped>
.bm-view {
  width: 100%;
  height: 300px;
}
</style>