<!--  -->
<template>
  <div class="maplabel">
    <section class="mapvaluedpanel" v-show="JSON.stringify(berthlabel) !== '{}'">
      <div class="parkcararea" @click="_gotoparkinglotdetail()">
        <ul class="parkareatop">
          <li>
            <span>{{berthlabel.name}}</span>
          </li>
          <li>
            <span>{{berthlabel.distance}}</span>
            <span>
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
              </svg>
            </span>
          </li>
        </ul>
        <ul class="parkareamiddle">
          <li>
            <span>空车位：</span>
            <span>{{berthlabel.rest}}</span>
          </li>
          <li>
            <span>总车位：</span>
            <span>{{berthlabel.total}}</span>
          </li>
          <li></li>
        </ul>

      </div>
      <div class="routerguide">
        <ul class="parkareabottom">
          <li @click="_showrouteline">
            <span><img :src="routerSvg"></span>
            <span>路线</span>
          </li>
          <li @click="_openmapnavigation">
            <span> <img :src="navigationSvg"></span>
            <span>导航</span>
          </li>
        </ul>
      </div>
    </section>
    <section class="mapemptypanel" v-show="JSON.stringify(berthlabel) === '{}'">
      <div>
        <h1 class="subtitle">温馨提示</h1>
        <label>亲爱的车主用户,此区域内暂时未有认证的停车路段和停车场...</label>
      </div>
    </section>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { CHANGE_AIMLOCATION } from '@standard/store/mutation-types.js';
import { isNullorEmpty, openmapGuide } from '@standard/common/js/util.js';
export default {
  data() {
    return {
      routerSvg: require('../svg/router.svg'),
      navigationSvg: require('../svg/navigation.svg'),
    };
  },
  computed: {
    ...mapState(['lng', 'lat']),
  },
  props: {
    berthlabel: {
      type: Object,
    },
  },
  methods: {
    ...mapMutations({ CHANGE_AIMLOCATION }),
    //驾车路线
    _showrouteline() {
      let self = this;
      if (!isNullorEmpty(self.lng) || !isNullorEmpty(self.lat)) {
        //定位成功的菜允许导航
        this.CHANGE_AIMLOCATION({ aimlng: this.berthlabel.longitude, aimlat: this.berthlabel.latitude });
        this.$router.push('/nearby/routemapguide');
      } else {
        this.$messagebox('提示', '定位当前位置失败,不能导航');
      }
    },
    //导航
    _openmapnavigation() {
      this._openMapApp(this.berthlabel.latitude, this.berthlabel.longitude);
    },
    _openMapApp(aimlatitude, aimlongitude) {
      let self = this;
      if (!isNullorEmpty(self.lng) || !isNullorEmpty(self.lat)) {
        //定位成功的菜允许导航
        openmapGuide(self.lat, self.lng, aimlatitude, aimlongitude);
      } else {
        self.$messagebox('提示', '定位当前位置失败,不能导航');
      }
    },
    //进入停车场 详情
    _gotoparkinglotdetail() {
      let self = this;
      if (!isNullorEmpty(self.berthlabel.id)) {
        self.$router.push({
          path: '/parkinglot/detail',
          query: { ploid: self.berthlabel.id, distance: self.berthlabel.distance },
        });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.maplabel {
  position: fixed;
  @include borderRadius(20px);
  @include setMapBottom();
  @include wh(90%, auto);
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  z-index: 9999;
  @include boxShadow(4px, 4px, 8px, #f5f5f5);
  .mapvaluedpanel {
    .parkcararea {
      margin: 0px 40px;
      .parkareatop {
        margin: 20px 0px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        li:nth-child(1) {
          @include sc(36px, #444444);
        }
        li:nth-child(2) {
          @include sc(24px, #999999);
          span:nth-child(2) {
            padding-left: 10px;
            svg {
              @include SvgIconColor(#c2c2c2, #c2c2c2);
              @include wh(24px, 24px);
            }
          }
        }
      }
      .parkareamiddle {
        margin-bottom: 20px;
        display: flex;
        flex-flow: row nowrap;
        @include sc(28px, #666666);
        li:nth-child(1) {
          margin-right: 40px;
          span:nth-child(2) {
            color: #ff890d;
          }
        }
      }
    }
    .routerguide {
      border-top-color: #eeeeee;
      border-top-style: solid;
      border-top-width: 1px; /* no */
      .parkareabottom {
        height: 85px;
        display: table;
        width: 100%;
        li {
          text-align: center;
          display: table-cell;
          vertical-align: middle;
          @include sc(24px, #666666);
          img {
            @include wh(30px, 30px);
          }
        }
        li:nth-child(1) {
          border-right-color: #eeeeee;
          border-right-style: solid;
          border-right-width: 1px; /* no */
        }
      }
    }
  }
  .mapemptypanel {
    margin: 10px 40px;
    .subtitle {
      @include sc(32px, #444444);
      padding: 15px 0px;
      text-align: center;
    }
    label {
      @include sc(25px, #666666);
      line-height: 150%;
    }
  }
}
</style>