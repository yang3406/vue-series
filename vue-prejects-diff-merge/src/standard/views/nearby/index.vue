<!-- 百度地图 附近停车场-->
<template>
  <div class="bm_container">
    <baidu-map class="bm_view" :center="center" :zoom="zoom" @ready="handler" :ak="ak">
      <!-- 定位当前地址 -->
      <bm-geolocation anchor="BMAP_ANCHOR_TOP_RIGHT" :showAddressBar="false" :autoLocation="true" :offset="{height:80}" @locationSuccess="getLocationSccess" :locationIcon="locationIconObj" @locationError="getLocationError"></bm-geolocation>
      <!-- 自定义可移动覆盖物 -->
      <bm-marker :position="moveIconObj" :dragging="true" :raiseOnDrag="true" :icon="moveIconObj" animation="BMAP_ANIMATION_BOUNCE" v-if="initLocation">
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import { BaiduMap, BmLabel, BmMarker } from 'vue-baidu-map';
import BmGeolocation from 'vue-baidu-map/components/controls/Geolocation.vue';
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
      moveIconObj:{
        url: require('./svg/location.svg'),
        size: {width:30,height:30},
        opts: {
          anchor: {width:30,height:30},
          imageOffset: {width:0,height:0},
          imageSize: {width:30,height:30},
          /* infoWindowAnchor: size,
          printImageUrl: imgurl, */
         }
      },
      locationIconObj:{
        url: require('./svg/circle.svg'),
        size: {width:15,height:15},
        opts: {
          anchor: {width:15,height:15},
          imageOffset: {width:0,height:0},
          imageSize: {width:15,height:15},
          /* infoWindowAnchor: size,
          printImageUrl: imgurl, */
         }
      }
    };
  },

  components: {
    BaiduMap,
    BmGeolocation,
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
    getLocationSccess(point,AddressComponent,marker) {
      console.dir(location);
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
  }
}
</style>