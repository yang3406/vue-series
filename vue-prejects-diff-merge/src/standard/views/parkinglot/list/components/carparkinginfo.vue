/*
 * @Author: yangjs 
 * @Date: 2019-01-04 14:49:52 
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-01-23 20:15:34
 */
<!-- 停车场 正在停车的信息 -->
<template>
  <div v-if='showflag' class="car_pannel">
    <section class="car_swiper_pannel">
      <div class="car_swiper_mt">
        <mt-swipe :auto="0" @change="_changecarswiper">
          <mt-swipe-item v-for="(carItem,index) in parkdata" :key="index">
            <section>
              <ul>
                <li></li>
                <li class="carnumber">
                  {{carItem.carnumber}}
                </li>
                <li class="parkingtime">{{Math.abs(carItem.parktime)+timeadd | secondToDate }}</li>
                <li class="paymoney">{{carItem.iscard == 1 ? '月卡畅行': carItem.payprice + "元"}}</li>
                <li>
                </li>
              </ul>
            </section>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="operateicon" @click="_tooglecarTab"><img :src="iconurl"></div>
      <section class="car-swipe-detail">
        <section>
          <ul>
            <li>应付金额</li>
            <li class="yellow">{{shouldpay}}</li>
          </ul>
          <ul>
            <li>车牌号码</li>
            <li class="textcr">{{carnum}}</li>
          </ul>
          <ul>
            <li>停车场</li>
            <li class="textcr">{{ploname}}</li>
          </ul>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
import { getMebPloParkingOrder } from '@standard/api';
import { Swipe, SwipeItem } from 'mint-ui';
export default {
  data() {
    return {
      showflag: false, //是否显示正在停车swiper
      parkdata: [],
      iconurl: '',
      timeaddfn: '',
      timeadd: 0, //接口 请求返回后 本地停车时间增长
      showcarparkingflag: false, //是否显示停车场  并不是真正意义上的隐藏 只是是否被遮盖
      pulldownicon: require('../../images/pulldown.svg'),
      pullupicon: require('../../images/pullup.svg'),
      shouldpay: '',
      carnum: '',
      ploname: '',
    };
  },

  mounted() {
    this.iconurl = this.pulldownicon;
    this._getMebPloParkingOrder();
  },
  components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem,
  },
  computed: {},
  /* 
  mounted: {}, */
  methods: {
    _getMebPloParkingOrder() {
      let self = this;
      getMebPloParkingOrder().then(res => {
        //有正在停车的 显示面板
        if (res.isparking === '1' || res.isparking === 1) {
          self.showflag = true;
          self.parkdata = [].concat(res.parkdata);
          self.timeaddfn = setInterval(() => {
            //每隔30m 重新请求
            if (self.timeadd == 30) {
              self.timeadd = 0;
              clearInterval(self.timeaddfn);
              self._getMebPloParkingOrder();
            }
            self.timeadd += 1;
          }, 1000);
          //给下面详情面板赋值
          let curritem = self.parkdata[0];
          self.shouldpay = curritem.iscard == 1 ? '月卡畅行' : curritem.payprice + '元';
          self.carnum = curritem.carnumber;
          self.ploname = curritem.ploname;
        } else {
          //隐藏面板
          self.showflag = false;
          self.parkdata = [].concat([]);
        }
      });
    },
    _tooglecarTab() {
      if (this.showcarparkingflag) {
        this.iconurl = this.pulldownicon;
      } else {
        this.iconurl = this.pullupicon;
      }
      //切换面板显示
      this.$emit('showdowntab', this.showcarparkingflag);
      this.showcarparkingflag = !this.showcarparkingflag;
    },
    //切换车辆面板 切换下面的信息
    _changecarswiper(index) {
      let self = this;
      let curritem = self.parkdata[index];
      self.shouldpay = curritem.iscard == 1 ? '月卡畅行' : curritem.payprice;
      self.carnum = curritem.carnumber;
      self.ploname = curritem.ploname;
      console.log(index);
    },
  },
  destroyed() {
    clearInterval(this.timeaddfn);
  },
};
</script>
<style lang='scss' scoped>
.car_pannel {
  .car_swiper_pannel {
    visibility: visible;
    height: 30vh;
    @include linearGradient(#c95459, #ffbc22);
    .car_swiper_mt {
      height: 27vh;
      section {
        height: 100%;
        ul {
          height: 100%;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-around;
          align-items: center;
          color: #ffffff;
          .carnumber {
            padding: 15px;
            border-style: solid;
            border-width: 1px; /* no */
            border-color: #ffffff;
            font-size: 35px;
            @include borderRadius(20px);
          }
          li.parkingtime {
            font-size: 48px;
          }
          li.paymoney {
            font-size: 40px;
            padding-bottom: 40px;
          }
        }
      }
    }
    .operateicon {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      height: 45px;
      img {
        @include wh(60%, 25px);
      }
    }
    .car-swipe-detail {
      /* left: 0;
      right: 0;
      position: fixed; */
      margin: 50px 30px;
      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include sc(30px, #999999);
        height: 100px;
        border-bottom-color: #eeeeee;
        border-block-end-style: solid;
        border-bottom-width: 1px; /* no */
        .yellow {
          @include sc(32px, #ff801a);
          font-weight: 500;
        }
        .textcr {
          @include sc(32px, #444444);
          font-weight: 500;
        }
      }
    }
  }
}
</style>