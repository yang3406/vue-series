<template>
  <div>
    <header>
      <!-- 轮播图 -->
      <div class="header">
        <!-- swipeid为当前轮循图片的class -->
        <ec-swipe swipeid="header-swipe" :delay='3000' :speed='600' effect="slide" :imgLazy="imgLazy">
          <div @click="_jumpURl(imgItem.url)" v-for="imgItem in imgList" :key="imgItem.id" class="swiper-slide" slot="swiper-img-slot">
            <div v-if="!imgLazy"><img :src="getImgPath('',imgItem.src)"></div>
            <!-- 图片懒加载 -->
            <div v-else>
              <img :data-src="getImgPath('',imgItem.src)" class="swiper-lazy">
              <div class="swiper-lazy-preloader"></div>
            </div>
          </div>
        </ec-swipe>
      </div>
    </header>

    <section>
      <!-- <div class="car-meassage-area">
        <car-item :carList="carList"></car-item>
      </div> -->

      <div class="add-car-area"></div>

      <nav class="tab-menu-area" v-if="tabimgList.length">
        <router-link :to="{path: tabItem.path}" v-for="tabItem in tabimgList" :key="tabItem.id" class="link_to_tab">
          <figure>
            <img :src="tabItem.url">
            <figcaption>{{tabItem.title}}</figcaption>
          </figure>
        </router-link>
      </nav>
    </section>

  </div>
</template>

<script>
import { _getMebInfobyMebId } from '@standard/common/js/getData.js';
import { isNullorEmpty } from '@standard/common/js/util.js';
import { getImgPath } from '@standard/common/js/mixin.js';
import ecSwiper from '@standard/components/common/ec-swiper-loops';
import carItme from '@standard/components/homesub/caritem';
import { imgdataobj } from '@standard/mock/swiper-loopimg/index.js'; //循坏滚动图片数据
import { tabMenuDataObj } from '@standard/common/localdata/tab-menu-data.js'; //首页tab目录展示
/* import { carList } from '@standard/mock/homemock/testdata.js'; */

export default {
  name: 'home',
  components: {
    'ec-swipe': ecSwiper,
    'car-item': carItme,
  },
  mixins: [getImgPath],
  data() {
    return {
      imgLazy: true, //图片是否延迟加载
      imgList: imgdataobj.list,
      /* carList: carList.list, */
      tabimgList: tabMenuDataObj.list,
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
@import './index.scss';
</style>
