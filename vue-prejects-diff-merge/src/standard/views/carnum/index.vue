<!-- 车牌号列表 -->
<template>
  <div class="carnum">
    <section class="carnum_area">
      <section @click="_unbindcarnum(item.carnumber)" v-for="(item,index) in carnumList" :key="index" :class="item.carnumtype == 1 ? 'energy_car':''">
        <span>{{item.carnumber}}</span>
      </section>
    </section>
    <section class="add_carnum" @click="_addCarNum()">
      <svg fill="#999" x="10" y="10" v-show='isbindcarflag'>
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_add"></use>
      </svg>
      <span>{{bindcartext}}</span>
    </section>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { getBindedCarnumList, unBindCarnum } from '@standard/api';
export default {
  name: 'carnum',
  data() {
    return {
      carnumList: [],
      backmine: false, //是否返回我的主页
      bindcartext: '', //汉字显示能否绑定车牌
      isbindcarflag: false, //能否绑定车牌标识
    };
  },
  computed: {},
  /* components: {},

  computed: {},*/

  mounted() {
    this._getBindedCarnumList();
  },
  beforeRouteEnter(to, from, next) {
    //从增加车牌返回
    if (from.path.includes('addcarnum')) {
      next(vm => {
        vm.backmine = true;
        vm._getBindedCarnumList();
      });
    } else {
      next();
    }
  },
  methods: {
    _getBindedCarnumList() {
      var self = this;
      self.$indicator.open();
      getBindedCarnumList().then(function(res) {
        self.$indicator.close();
        if (parseInt(res.bindcount) > 0) {
          self.carnumList = res.data;
          //判断是否达到最大的车牌数
          if (res.bindcount >= res.maxcount) {
            self.bindcartext = '最多能绑定' + res.maxcount + '个车牌';
            self.isbindcarflag = false;
          } else {
            self.bindcartext = '绑定车牌';
            self.isbindcarflag = true;
          }
        } else {
          //如果没有 进入绑定页面
          if (self.backmine) {
            self.$router.push('/mine');
          } else {
            self.$router.push('/carnum/addcarnum');
          }
        }
      });
    },
    _addCarNum() {
      if (this.isbindcarflag) {
        this.$router.push('/carnum/addcarnum');
      }
    },
    _unbindcarnum(carnum) {
      let self = this;
      MessageBox.confirm('解绑后，部分停车数据将丢失，</br>确定解绑?', '温馨提示').then(action => {
        let params = { carnum: carnum };
        unBindCarnum(params).then(function(res) {
          self._getBindedCarnumList();
        });
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.carnum {
  @include pageColor();
  padding: 60px;
  .carnum_area {
    section {
      background-color: #3caffb;
      @include linearGradient(#3598f7, #43c6ff, 45deg);
      text-align: center;
      @include wh(100%, 170px);
      line-height: 170px;
      @include sc(60px, #fff);
      @include borderRadius(16px);
      margin-bottom: 42px;
    }
    section.energy_car {
      background-color: #37dabe;
      @include linearGradient(#2ccac0, #41e9bc, 45deg);
    }
  }
  .add_carnum {
    background-color: #f2f2f2;
    @include borderRadius(40px);
    @include sc(32px, #666);
    margin-bottom: 40px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      padding-right: 10px;
      @include wh(60px, 60px);
    }
  }
}
</style>