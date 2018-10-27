<template>
  <div>
    <header>
      <!-- 轮播图 -->
      <div class="header">
        <!-- swipeid为当前轮循图片的class -->
        <ec-swipe swipeid="header-swipe" :delay='3000' :speed='600' effect="slide" :imgLazy="imgLazy">
          <div @click="_jumpURl(imgItem.url)" v-for="imgItem in imgList" :key="imgItem.id" class="swiper-slide" slot="swiper-img-slot">
            <div v-if="!imgLazy"><img :src="imgItem.src"></div>
            <!-- 图片懒加载 -->
            <div v-else>
              <img :data-src="imgItem.src" class="swiper-lazy">
              <div class="swiper-lazy-preloader"></div>
            </div>
          </div>
        </ec-swipe>
      </div>
    </header>

    <section>
      <div class="car-meassage-area">
        <car-item :carList="carList"></car-item>
      </div>

      <div class="add-car-area">
          
      </div>
    </section>
  </div>
</template>

<script>
import { _getMebInfobyMebId } from '@standard/common/js/getData.js';
import { isNullorEmpty } from '@standard/common/js/util.js';
import ecSwiper from '@standard/components/common/ec-swiper-loops';
import carItme from '@standard/components/homesub/caritem';
import { imgdataobj } from '@standard/mock/swiper-loopimg/index.js';
import { carList } from '@standard/mock/homemock/testdata.js';
export default {
  name: 'home',
  components: {
    'ec-swipe': ecSwiper,
    'car-item': carItme,
  },
  data() {
    return {
      imgLazy: true, //图片是否延迟加载
      imgList: imgdataobj.list,
      carList: carList.list,
    };
  },
  mounted() {
    this._getMebInfobyMebId();
  },
  methods: {
    _getMebInfobyMebId() {
      let paramsObj = {
        mebid: '1000001',
      };
      _getMebInfobyMebId(paramsObj).then(res => {});
    },
    _jumpURl(url) {
      if (!isNullorEmpty(url)) {
        window.location.href = url;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
/* @import '~@standard/common/css/multi.switch.scss';
.car-message-list ul {
  margin: 2% 5%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  .div-inline-block {
    vertical-align: middle;
    display: inline-block;
    box-sizing: border-box;
  }
  .circle-out {
    position: relative;
    border: 2px solid #c95e63;
    background: #e99e98;
    @include wh(60px, 60px);
    @include borderRadius(50%);
    .circle-in {
      position: absolute;
      @include wh(50px, 50px);
      @include borderRadius(50%);
      background-color: #fff;
      border: 2px solid #c95e63;
      text-align: center;
      margin: auto;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      .circle-word {
        @include sc(25px);
        @include center();
      }
    }
  }
  .mui-switch {
  }
} */
</style>
