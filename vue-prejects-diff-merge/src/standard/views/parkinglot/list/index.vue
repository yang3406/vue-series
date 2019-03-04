/*
 * @Author: yangjs 
 * @Date: 2019-01-04 14:34:01 
 * @Last Modified by: yangjs
 * @Last Modified time: 2019-01-17 14:29:23
 */
<!--  -->
<template>
  <div>
    <car-parking-info @showdowntab="showtabfromchildren" class="carparkinginfo"></car-parking-info>
    <transition name="fade">
      <parking-lot-list class="parkinglotlist" ref="parkinglot" v-show="parkinglotshowflag"></parking-lot-list>
    </transition>
  </div>
</template>

<script>
import carParkingInfo from './components/carparkinginfo';
import parkingLotList from './components/parkinglotlist';
export default {
  data() {
    return {
      parkinglotshowflag: true,
    };
  },
  components: {
    carParkingInfo,
    parkingLotList,
  },
  methods: {
    showtabfromchildren(flag) {
      this.parkinglotshowflag = flag;
    },
  },
};
</script>
<style lang='scss' scoped>
/* .carparkinginfo {
  height: 40vh;
} */
.parkinglotlist {
  position: absolute;
  left: 0;
  right: 0;
}

.fade-enter-active {
  //类名：隐藏到显示过程所需要的时间
  animation: bounce-in 0.6s;
}
.fade-leave-active {
  //类名：显示到隐藏过程所需要的时间
  animation: bounce-in 0.6s reverse; //reverse表示和隐藏到显示动画相反
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0.6);
  }
  100% {
    transform: scale(1);
  }
}
</style>