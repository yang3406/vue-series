<!--  -->
<template>
  <div class="parkinglot_warp">
    <div class="parkinglot_detail">
      <section class="top_img">
        <img :src="bgimgurl">
      </section>
      <section class="parking_lot_info">
        <ul>
          <li>{{parkinglotdata.ploname}}</li>
          <li>{{parkinglotdata.address}}</li>
          <li>{{distance}}</li>
        </ul>
      </section>
      <section class="parking_lot_berth">
        <nav>车位使用情况</nav>
        <section class="model_table">
          <div class="table-cell">
            <p class="rest_num">
              <countTo :endVal='parseInt(parkinglotdata.rest)' :duration='3000'></countTo>
            </p>
            <p>剩余车位</p>
          </div>
          <div class="table-cell">
            <p class="total_num">
              <countTo :endVal='parseInt(parkinglotdata.total)' :duration='3000'></countTo>
            </p>
            <p>车位总数</p>
          </div>
        </section>
      </section>
      <section class="parking_lot_fee">
        <div class="sub_title">收费参考</div>
        <ul class="t_header">
          <li>时间</li>
          <li>收费金额</li>
        </ul>
        <ul v-for="(item,index) in timepricelist" :key="index">
          <li>{{item.time}}</li>
          <li>{{item.price}}</li>
        </ul>
        <div class="sub_title" style="margin-top:10px">收费详情：
          <span>{{parkinglotdata.chargerule}}</span>
        </div>
      </section>
    </div>
    <div>
      <section class="navigation">
        <div class="model_table">
          <div class="table-cell" @click="_openmapnavigation(false)">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_router"></use>
            </svg>
            <span>路线</span>
          </div>
          <div class="table-cell" @click="_openmapnavigation(true)">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_navigation"></use>
            </svg>
            <span>导航</span>
          </div>
        </div>
      </section>
    </div>

  </div>
</template>

<script>
import { getParkingLotInfoById } from '@standard/api';
import { CHANGE_LOCATION, CHANGE_AIMLOCATION } from '@standard/store/mutation-types.js';
import { mapState, mapMutations } from 'vuex';
import { isNullorEmpty, openmapGuide } from '@standard/common/js/util.js';
import countTo from 'vue-count-to';
export default {
  data() {
    return {
      ploid: '',
      parkinglotdata: {},
      timepricelist: [],
      distance: '',
      bgimgurl: require('../images/parking_lot_detail.png'),
      longitude: '',
      latitude: '',
    };
  },

  components: { countTo },
  computed: {
    ...mapState(['lng', 'lat']),
  },
  mounted() {
    this.ploid = this.$route.query.ploid;
    this.distance = this.$route.query.distance;
    this._getParkingLotInfoById();
  },

  methods: {
    ...mapMutations({
      CHANGE_LOCATION,
      CHANGE_AIMLOCATION,
    }),
    _getParkingLotInfoById() {
      let self = this;
      let params = {
        ploid: self.ploid,
      };
      getParkingLotInfoById(params).then(function(res) {
        self.parkinglotdata = res.data;
        self.timepricelist = [].concat(self.parkinglotdata.timeprice);
      });
    },
    _getCurrPosition(flag) {
      let self = this;
      //定位当前位置
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            self.longitude = r.point.lng;
            self.latitude = r.point.lat;
            self.CHANGE_LOCATION({ lng: r.point.lng, lat: r.point.lat });
            if (flag) {
              //true 打开导航
              self._openmap();
            } else {
              self._showrouteline(); //驾车路线
            }
          } else {
            self.$messagebox('提示', '定位当前位置失败,不能导航');
          }
        },
        { enableHighAccuracy: true }, //是否允许更高精确度
      );
    },
    _initlocation(flag) {
      let self = this;
      //获取当前位置经纬度
      if (isNullorEmpty(self.lng) && isNullorEmpty(self.lat)) {
        self._getCurrPosition(flag);
      } else {
        self.longitude = self.lng;
        self.latitude = self.lat;
        if (flag) {
          //true 打开导航
          self._openmap();
        } else {
          //false为驾车路线
          self._showrouteline(); //驾车路线
        }
      }
    },
    _openmapnavigation(flag) {
      this._initlocation(flag);
    },
    //驾车路线
    _showrouteline() {
      this.CHANGE_AIMLOCATION({ aimlng: this.parkinglotdata.longitude, aimlat: this.parkinglotdata.latitude });
      this.$router.push('/nearby/routemapguide');
    },
    //导航
    _openmap() {
      openmapGuide(this.latitude, this.longitude, this.parkinglotdata.latitude, this.parkinglotdata.longitude);
    },
  },
};
</script>
<style lang='scss' scoped>
.parkinglot_warp {
  .parkinglot_detail {
    overflow-y: scroll;
    min-height: 100%;
    background-color: #ffffff;
    padding-bottom: 110px;
    .top_img {
      @include wh(100%, 300px);
      img {
        @include wh(100%, 100%);
      }
    }
    .parking_lot_info {
      padding: 15px 25px;
      border-bottom-color: #eeeeee;
      border-bottom-style: solid;
      border-bottom-width: 4px; /* no */
      ul {
        display: flex;
        flex-flow: column nowrap;

        li:nth-child(1) {
          @include sc(32px, #444444);
        }
        li:nth-child(2) {
          @include sc(26px, #999999);
        }
        li:nth-child(3) {
          margin-top: 8px;
          @include sc(24px, #999999);
        }
      }
    }
    .parking_lot_berth {
      padding: 25px 0px;
      border-bottom-color: #eeeeee;
      border-bottom-style: solid;
      border-bottom-width: 4px; /* no */
      nav {
        padding-left: 25px;
        @include sc(24px, #444444);
        margin-bottom: 15px;
      }
      .model_table {
        display: table;
        width: 100%;
        .table-cell {
          text-align: center;
          display: table-cell;
          p {
            @include sc(28px, #999999);
          }
          .rest_num {
            @include sc(54px, #ff801a);
            line-height: 120%;
          }
          .total_num {
            @include sc(54px, #666666);
            line-height: 120%;
          }
        }
      }
    }
    .parking_lot_fee {
      padding: 25px 0px;
      padding-left: 25px;
      .sub_title {
        @include sc(24px, #444444);
        margin-bottom: 15px;
      }

      ul {
        display: table;
        width: 100%;
        border-bottom-color: #eeeeee;
        border-bottom-style: solid;
        border-bottom-width: 1px; /* no */
        padding: 10px 0px;
        li {
          display: table-cell;
          @include sc(28px, #666666);
          text-align: center;
          width: 50%;
        }
        li:nth-child(2) {
          text-align: center;
        }
      }
      ul.t_header {
        li {
          @include sc(28px, #444444);
        }
      }
    }
  }
  .navigation {
    position: fixed;
    bottom: 0;
    height: 100px;
    background-color: #ffffff;
    left: 0;
    right: 0;
    border-top-color: #eeeeee;
    border-top-style: solid;
    border-top-width: 1px; /* no */
    .model_table {
      width: 100%;
      height: 100%;
      display: table;
      .table-cell {
        height: 100%;
        text-align: center;
        display: table-cell;
        vertical-align: middle;
        @include sc(32px, #508cee);
        border-right-color: #eeeeee;
        border-right-style: solid;
        border-right-width: 1px; /* no */
        svg {
          @include wh(35px, 35px);
          @include SvgIconColor(#508cee, #508cee);
        }
      }
    }
  }
}
</style>