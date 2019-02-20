/*
 * @Author: yangjs 
 * @Date: 2019-01-06 15:56:29 
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-01-22 15:04:17
 */
<!--  -->
<template>
  <div class="prkinglot">
    <section>
      <mt-loadmore class="wrapper" :top-method="_loadTop" :auto-fill="false" :bottom-method="_loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <!-- 没有记录 -->
        <section v-if="totalCount == 0">
          <no-data :iconname="'black_parkinglot.svg'" :tips="'暂无停车场信息'"></no-data>
        </section>
        <section v-else>
          <section v-for="(item,index) in parkinglotlist" :key="index" class="parkinglot_item">
            <section class="parkinglot_left">
              <svg fill="#ffc535">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_parkinglot"></use>
              </svg>
            </section>
            <section class="parkinglot_center" @click="_goparkinglotdetail(item.id,item.distance)">
              <ul>
                <li>{{item.name}}</li>
                <li>
                  <span>{{item.address}}</span>
                  <span>{{item.distance}}</span>
                </li>
                <li>
                  <span>空位数：</span>
                  <span class="rest">{{item.rest}}</span>
                </li>
              </ul>
            </section>
            <section class="parkinglot_right" @click="_openmapnavigation(item.latitude,item.longitude)">
              <ul>
                <li>
                  <svg fill="#999999">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_navigation"></use>
                  </svg>
                </li>
                <li>导航</li>
              </ul>
            </section>
          </section>
        </section>
      </mt-loadmore>
    </section>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui';
import { getParkingLocation } from '@standard/api';
import { isNullorEmpty, openmapGuide } from '@standard/common/js/util.js';
import noData from '@standard/components/common/ec-no-data.vue';
import { mapState, mapMutations } from 'vuex';
import config from '@standard/common/js/config.js';
import { CHANGE_LOCATION } from '@standard/store/mutation-types.js';
export default {
  data() {
    return {
      onlytype: 2, //0全部 1 路段 2 停车场 3充电桩
      longitude: '', //:当前位置经度
      latitude: '', //当前位置纬度
      pageIndex: 1, //第几页
      pageSize: 8, //一页多少数据
      keyword: '', //关键字搜索
      totalCount: 0,
      parkinglotlist: [], //停车场
      allLoaded: false,
    };
  },
  mounted() {
    /* 避免fastclick 在处理点击的时候 进入详情页面 回复原始点击事件 */
    this.$nextTick(() => {
      document.getElementsByClassName('wrapper')[0].addEventListener('touchstart', function(event) {
        event.target.classList.add('needsclick');
      });
    });
    this._initlocation();
  },
  components: {
    mtLoadmore: Loadmore,
    noData,
  },
  computed: {
    ...mapState(['lng', 'lat']),
  },
  methods: {
    ...mapMutations({
      CHANGE_LOCATION,
    }),
    _loadTop() {
      this._getParkinglotList(true);
    },
    _loadBottom() {
      //下拉加载更多
      var self = this;
      ++self.pageIndex;
      let params = {
        cenlatitude: self.latitude,
        cenlongitude: self.longitude,
        isPage: 1, //是否分页 0不分页 1分页
        keyword: '',
        latitude: self.latitude,
        longitude: self.longitude,
        onlytype: self.onlytype,
        pageIndex: self.pageIndex,
        pageSize: self.pageSize,
      };
      getParkingLocation(params).then(function(res) {
        let currparkinglot = res.data || [];
        self.parkinglotlist = self.parkinglotlist.concat(currparkinglot);
        //全部加载完毕
        if (currparkinglot.length < self.pageSize) {
          self.allLoaded = true; //数据全部加载完毕
        }
        self.$refs.loadmore.onBottomLoaded(); //重置位置
      });
    },
    _getCurrPosition() {
      let self = this;
      //定位当前位置
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            self.longitude = r.point.lng;
            self.latitude = r.point.lat;
            self.CHANGE_LOCATION({ lng: r.point.lng, lat: r.point.lat });
          } else {
            self.$messagebox('提示', '定位当前位置失败');
            //用默认的中心城市
            self.longitude = config.appLocation.longitude;
            self.latitude = config.appLocation.latitude;
          }
          self._getParkinglotList();
        },
        { enableHighAccuracy: true }, //是否允许更高精确度
      );
    },
    _initlocation() {
      let self = this;
      //获取当前位置经纬度
      if (isNullorEmpty(self.lng) && isNullorEmpty(self.lat)) {
        self._getCurrPosition();
      } else {
        self.longitude = self.lng;
        self.latitude = self.lat;
        self._getParkinglotList();
      }
    },
    //flag true为下拉刷新
    _getParkinglotList(flag) {
      let self = this;
      self.pageIndex = 1;
      let params = {
        cenlatitude: self.latitude,
        cenlongitude: self.longitude,
        isPage: 1, //是否分页 0不分页 1分页
        keyword: '',
        latitude: self.latitude,
        longitude: self.longitude,
        onlytype: self.onlytype,
        pageIndex: self.pageIndex,
        pageSize: self.pageSize,
      };
      getParkingLocation(params).then(function(res) {
        self.totalCount = res.data.length;
        self.parkinglotlist = [].concat(res.data);
        //下拉刷新重置
        if (flag) {
          self.allLoaded = false; //重置上拉加载更多
          self.$refs.loadmore.onTopLoaded(); //重置位置
        }
      });
    },
    //打开地图导航
    _openmapnavigation(aimlatitude, aimlongitude) {
      let self = this;
      if (!isNullorEmpty(self.lng) || !isNullorEmpty(self.lat)) {
        //定位成功的菜允许导航
        openmapGuide(this.latitude, this.longitude, aimlatitude, aimlongitude);
      } else {
        this.$messagebox('提示', '定位当前位置失败,不能导航');
      }
    },
    _goparkinglotdetail(id, distance) {
      if (!isNullorEmpty(id)) {
        this.$router.push({ path: '/parkinglot/detail', query: { ploid: id, distance: distance } });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.prkinglot {
  min-height: 70vh;
  background-color: #ffffff;
  .parkinglot_item {
    display: flex;
    border-bottom-width: 1px; /* no */
    border-bottom-color: #eeeeee;
    border-bottom-style: solid;
    padding: 20px 0px;
    @include sc(26px, #666666);
    .parkinglot_left {
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        @include wh(40px, 40px);
      }
    }
    .parkinglot_center {
      flex: 1 1 0;
      ul {
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        li:nth-child(1) {
          @include sc(32px, #444444);
        }
        li:nth-child(2) {
          @include sc(26px, #999999);
          margin-top: 8px;
        }
        li:nth-child(3) {
          margin-top: 12px;
          @include sc(26px, #666666);
          .rest {
            color: #ff801a;
          }
        }
      }
    }
    .parkinglot_right {
      width: 130px;
      ul {
        height: 100%;
        display: flex;
        justify-content: left;
        align-items: center;
        li {
          svg {
            padding-right: 8px;
            @include wh(35px, 40px);
          }
        }
      }
    }
  }
}
</style>