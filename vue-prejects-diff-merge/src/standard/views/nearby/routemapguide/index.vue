/*
 * @Author: yangjs 
 * @Date: 2019-01-02 17:32:19 
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-01-02 20:44:23
 */
<!--  -->
<template>
  <div class="mapguidewrap">
    <div id='guidemap'></div>
    <div id="maptextpanel"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      guidemap: '',
    };
  },
  computed: {
    ...mapState(['lng', 'lat', 'aimlng', 'aimlat']),
  },
  activated() {
    this._initmap();
  },
  methods: {
    _initmap() {
      if (!this.guidemap) {
        this.guidemap = new BMap.Map('guidemap');
      }
      this.guidemap.centerAndZoom(new BMap.Point(this.lng, this.lat), 18);
      var p1 = new BMap.Point(this.lng, this.lat);
      var p2 = new BMap.Point(this.aimlng, this.aimlat);
      var driving = new BMap.DrivingRoute(this.guidemap, {
        renderOptions: { map: this.guidemap, panel: 'maptextpanel', autoViewport: true },
      });
      driving.search(p1, p2);
    },
  },
};
</script>
<style lang='scss' scoped>
.mapguidewrap {
  @include wh(100%, 100%);
  #guidemap {
    @include wh(100%, 60%);
  }
  #maptextpanel {
    @include wh(100%, 45%);
    z-index: 9999;
    overflow-y: scroll;
  }
}
</style>