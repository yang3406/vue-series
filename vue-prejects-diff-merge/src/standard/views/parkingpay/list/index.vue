<!-- 停车缴费 -->
<template>
  <div class="parkingorder">
    <mt-loadmore class="wrapper" :top-method="_loadTop" ref="loadmore">
      <section v-if="!isexit">
        <!-- 没有记录 -->
        <no-data :iconname="'blank_parking.svg'" :tips="'停车看颜值，还没停车记录哦！'"></no-data>
      </section>
      <section v-else>
        <div class="parkingorderitem" v-for="(item,index) in parkdata" :key="index">
          <nav>{{item.ploname}}</nav>
          <ul class="outtter" @click="_gotoDetail(item)">
            <li>
              <ul>
                <li>
                  <span>车牌号码</span>
                  <span class="left_distance">{{item.carnumber}}</span>
                </li>
                <li>
                  <span>驶入时间</span>
                  <span class="left_distance">{{item.intime | timestampFormat}}</span>
                </li>
              </ul>
            </li>
            <!-- <li class="arrow_right_text">去缴费</li> -->
            <li class="arrow_right_text">详情</li>
            <li class="link-item-svg">
              <svg fill="#c2c2c2">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
              </svg>
            </li>
          </ul>
        </div>
      </section>
    </mt-loadmore>
  </div>
</template>

<script>
import { getMebPloParkingOrder } from '@standard/api';
import noData from '@standard/components/common/ec-no-data.vue';
import { Loadmore } from 'mint-ui';
export default {
  name: 'parkingpay',
  data() {
    return {
      isexit: false, //是否有进行中订单
      parkdata: [], //正常进行中订单数据
    };
  },

  components: {
    noData,
    mtLoadmore: Loadmore,
  },

  computed: {},

  mounted() {
    this.$indicator.open();
    this._getMebPloParkingOrder();
  },

  methods: {
    _getMebPloParkingOrder() {
      let self = this;
      getMebPloParkingOrder().then(res => {
        self.$indicator.close();
        //有正在停车的 显示面板
        if (res.isparking === '1' || res.isparking === 1) {
          self.isexit = true;
          self.parkdata = [].concat(res.parkdata);
        } else {
          //隐藏面板
          self.isexit = false;
        }
      });
    },
    _loadTop() {
      //下拉刷新
      var self = this;
      getMebPloParkingOrder().then(res => {
        //有正在停车的 显示面板
        if (res.isparking === '1' || res.isparking === 1) {
          self.isexit = true;
          self.parkdata = [].concat(res.parkdata);
        } else {
          //隐藏面板
          self.isexit = false;
        }
        self.$refs.loadmore.onTopLoaded(); //重置位置
      });
    },
    //进入停车缴费详情
    _gotoDetail(item) {
      if (item.carnumber != '') {
        this.$router.push({ path: '/parkingpay/detail', query: { item } });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.parkingorder {
  min-height: 100%;
  .parkingorderitem {
    margin-top: 15px;
    padding: 10px 5%;
    background-color: #ffffff;
    nav {
      @include sc(32px, #444444);
      margin: 12px 0px;
      font-weight: 500;
    }
    ul.outtter {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-content: center;
      align-items: center;
      @include sc(28px, #666666);
      .arrow_right_text {
        flex-grow: 1;
        text-align: right;
        @include sc(28px, #ff801a);
      }
      .link-item-svg {
        margin-left: 12px;
        @include wh(30px, 55px);
        @include SvgIconColor(#c2c2c2, #c2c2c2);
        svg {
          @include wh(100%, 100%);
        }
      }
      ul {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-content: center;
        li {
          margin-bottom: 6px;
          .left_distance {
            padding-left: 20px;
          }
        }
      }
    }
  }
}
</style>
