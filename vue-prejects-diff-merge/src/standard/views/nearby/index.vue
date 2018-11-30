<!-- 百度地图 附近停车场-->
<template>
  <div class="bm_container">
    <baidu-map class="bm_view" :center="center" :zoom="zoom" @ready="handler" :ak="ak">
      <!-- <bm-geolocation anchor="BMAP_ANCHOR_TOP_RIGHT" :showAddressBar="true" :locationIcon="{url: require('./svg/location.svg'), size: {width: 18, height: 18}}" :autoLocation="true" @locationSuccess="getLocationSccess" @locationError="getLocationError"></bm-geolocation> -->
      <!-- 自定义定位图标覆盖物 -->
      <!-- <bm-marker id="union444" :position="autoLocationPoint" :dragging="true" :icon="{url: require('./svg/location.svg'), size: {width: 18, height: 18}}">
      </bm-marker>
       -->
      <bm-marker :position="autoLocationPoint" :scroll-wheel-zoom="true" :dragging="true" :raiseOnDrag="true" animation="BMAP_ANIMATION_BOUNCE"  v-if="initLocation">
      </bm-marker>

    </baidu-map>
  </div>
</template>

<script>
import { BaiduMap, GmGeolocation, BmLabel, BmMarker } from 'vue-baidu-map';
import config from '@standard/common/js/config.js';
export default {
  name: 'nearby',
  data() {
    return {
      center: { lng: config.appLocation.longitude || 0, lat: config.appLocation.latitude || 0 },
      zoom: 18,
      ak: 'o7R0tflUIV5jBoN5hRs4T7cj',
      initLocation: false,
      /* autoLocationPoint: { lng: config.appLocation.longitude || 0, lat: config.appLocation.latitude || 0 }, */
      autoLocationPoint: {},
    };
  },

  components: {
    BaiduMap,
    GmGeolocation,
    BmMarker,
    BmLabel,
  },

  /*computed: {},

  mounted: {},*/

  methods: {
    handler({ BMap, map }) {
      //获取当前定位
      let _this = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          _this.center = { lng: r.point.lng, lat: r.point.lat }; // 设置center属性值
          _this.autoLocationPoint = { lng: r.point.lng, lat: r.point.lat }; // 自定义实时定位覆盖物
          _this.initLocation = true;
        },
        function(error) {
          alert('定位失败');
        },
        { enableHighAccuracy: true }, //是否允许更高精确度
      );
    },
    getLocationSccess(location) {
      /* console.dir('定位成功' + location.longitude);
      this.center = location; */
    },
    getLocationError() {
      console.dir('error');
    },
  },
};
</script>
<style lang='scss' scoped>
.bm_container {
  .bm_view {
    width: 100%;
    height: 100vh;
    .anchorBL {
      display: none;
    }
  }
}
</style>