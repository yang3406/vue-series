/*
 * @Author: yangjs 
 * @Date: 2018-12-23 15:02:22 
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-01-22 15:29:35
 */
<!-- 百度地图导航 -->
<template>
  <div class='bmap'>
    <berth-full-flag></berth-full-flag>
    <div id='allmap'></div>
    <img src="./svg/moveLocation.svg" class="mapicon" alt="">
    <location-berth-label :locationlng='longitude' :locationlat='latitude' :berthlabel='berthlabel'></location-berth-label>
  </div>
</template>

<script>
import config from '@standard/common/js/config.js';
import berthFullFlag from './components/berthfullflag';
import locationBerthLabel from './components/locationberthlabel';
import { CHANGE_LOCATION } from '@standard/store/mutation-types.js';
import { getParkingLocation } from '@standard/api';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      map: {},
      onlytype: 2, //0全部 1 路段 2 停车场 3充电桩
      cenlongitude: '', //中心位置经度
      cenlatitude: '', //中心位置纬度
      longitude: '', //:当前位置经度
      latitude: '', //当前位置纬度
      indoorparkingemptysvg: require('./svg/indoorparkingempty.svg'),
      indoorparkingfullsvg: require('./svg/indoorparkingfull.svg'),
      autolocationsvg: require('./svg/autoLocation.svg'),
      berthlabel: {},
      markeremptyselected: new BMap.Icon(require('./svg/indoorparkingempty.svg'), new BMap.Size(60, 60)),
      markeremptyunselected: new BMap.Icon(require('./svg/indoorparkingempty.svg'), new BMap.Size(40, 40)),
      markerfullselected: new BMap.Icon(require('./svg/indoorparkingfull.svg'), new BMap.Size(60, 60)),
      markerfullunselected: new BMap.Icon(require('./svg/indoorparkingfull.svg'), new BMap.Size(40, 40)),
    };
  },

  components: {
    berthFullFlag,
    locationBerthLabel,
  },
  mounted() {
    this._initMap(); //初始化地图  获取当前
    //this._handleGetlocation(); // 手动定位当前位置
  },
  methods: {
    ...mapMutations({
      CHANGE_LOCATION,
    }),
    _initMap() {
      let self = this;
      self.map = new BMap.Map('allmap');
      var point = new BMap.Point(config.appLocation.longitude, config.appLocation.latitude);
      var autoLocationIcon = new BMap.Icon(self.autolocationsvg, new BMap.Size(30, 30)); //当前位置图标
      //var offsetY = 0; //Y轴偏移量，即地图可视区域中心点在Y轴的偏移量 和中心点图标偏移量 一样
      self.map.centerAndZoom(point, 16);
      self.map.enableScrollWheelZoom(true);
      //定位当前位置
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            //当前位置图标
            var autoLocationmk = new BMap.Marker(r.point, { icon: autoLocationIcon });
            self.CHANGE_LOCATION({ lng: r.point.lng, lat: r.point.lat });
            self.map.addOverlay(autoLocationmk);
            autoLocationmk.disableMassClear(); //mark不被清除
            autoLocationmk.setAnimation(BMAP_ANIMATION_BOUNCE);

            self.longitude = r.point.lng;
            self.latitude = r.point.lat;
            self.cenlongitude = r.point.lng;
            self.cenlatitude = r.point.lat;
            //将地图中心移动到可视区中点
            self.map.panTo(r.point);
            self._getParkingLocation();
            //监控地图拖动
            self.map.addEventListener('dragend', function() {
              //获得移动之后地图中心点的像素位置
              var point = self.map.getCenter();
              self.cenlongitude = point.lng;
              self.cenlatitude = point.lat;
              self._getParkingLocation();
            });
          } else {
            self.$messagebox('提示', '定位当前位置失败');
          }
        },
        { enableHighAccuracy: true }, //是否允许更高精确度
      );
      this._handleGetlocation();
    },

    //手动定位 当前位置
    _handleGetlocation() {
      let self = this;
      // 添加定位控件
      var geolocationControl = new BMap.GeolocationControl({
        offset: { width: 0, height: 250 },
        showAddressBar: false, //不显示定位后的地址
        locationIcon: { url: '', size: { width: 0, height: 0 } }, //自定义定位后的显示icon
      });
      geolocationControl.addEventListener('locationSuccess', function(e) {
        self.longitude = e.point.lng;
        self.latitude = e.point.lat;
        self.cenlongitude = e.point.lng;
        self.cenlatitude = e.point.lat;
        self._getParkingLocation();
      });
      geolocationControl.addEventListener('locationError', function(e) {
        // 定位失败事件
        self.$messagebox('提示', '获取移动位置坐标失败');
        self.latitude = config.appLocation.latitude;
        self.longitude = config.appLocation.longitude;
        self.cenlatitude = config.appLocation.latitude;
        self.cenlongitude = config.appLocation.longitude;
        self._getParkingLocation();
      });
      self.map.addControl(geolocationControl);
    },
    //获取选择范围内停车场的列表经纬度
    _getParkingLocation() {
      let self = this;
      let params = {
        cenlatitude: self.cenlatitude,
        cenlongitude: self.cenlongitude,
        isPage: 0, //是否分页 0不分页 1分页
        keyword: '',
        latitude: self.latitude,
        longitude: self.longitude,
        onlytype: self.onlytype,
        radius: 30000, //搜索范围 3000
      };
      getParkingLocation(params).then(function(res) {
        self._addMarker(res.data);
      });
    },
    //循环遍历 创建标注
    _addMarker(data) {
      let self = this;
      //清除 除了定位当前位置 地图上的图标
      self.map.clearOverlays();

      //向地图把查出来的点打印出来
      let i = 0,
        len = data.length;
      //默认给导航面板第一个值
      if (len > 0) {
        self.berthlabel = data[0];
      } else {
        self.berthlabel = {};
      }
      for (i; i < len; i++) {
        let _this = data[i];
        let point = { lat: _this.latitude, lng: _this.longitude };
        self._drawmarksvg(point, _this, i);
      }
    },
    _drawmarksvg(point, pointData, index) {
      let self = this;
      let markerselected = '';
      let markerunselected = '';
      if (pointData.rest > 0) {
        markerselected = self.markeremptyselected;
        markerunselected = self.markeremptyunselected;
      } else {
        markerselected = self.markerfullselected;
        markerunselected = self.markerfullunselected;
      }
      let indoorparkIcon = index == 0 ? markerselected : markerunselected;
      let indoorparkmk = new BMap.Marker(point, { icon: indoorparkIcon });
      indoorparkmk.enableMassClear(); //mark可以被清除
      self.map.addOverlay(indoorparkmk);
      indoorparkmk.addEventListener('click', function(e) {
        let markersarr = self.map.getOverlays(); //获取所有的marker
        for (let marker of markersarr) {
          let icon = marker.getIcon();
          if (icon.size.width === 60 || icon.size.width == '60') {
            marker.setIcon(markerunselected);
          }
        }
        //给label 面板赋值
        let selectedIcon = new BMap.Icon(self.indoorparkingemptysvg, new BMap.Size(60, 60));
        this.setIcon(selectedIcon);
        self.berthlabel = pointData;
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.bmap {
  @include wh(100%, 100%);
  #allmap {
    height: 100%;
  }
  .mapicon {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: 5px; /* no */
    transform: translateX(-50%) translateY(-50%);
    width: 30px; /* no */
    height: 50px; /* no */
  }
}
</style>