<!-- 图片轮播 swipeid 为父组件穿过来 标识Swiper对象的唯一性 不能传一样的-->
<template>
  <div class="swiper-container" :class="swipeid">
    <div class="swiper-wrapper">
      <!-- 存放轮播内容 -->
      <slot name="swiper-img-slot"></slot>
    </div>
    <!-- 分页器 -->
    <div v-show="showpagination" class="swiper-pagination"></div>
    <!--  <div :class="{'swiper-pagination':pagination}"></div> -->
  </div>
</template>

<script>
import Swiper from '@standard/plugins/swiper/swiper.min.js';
export default {
  props: {
    swipeid: {
      //当前轮循框class
      type: String,
      default: '',
    },
    effect: {
      type: String,
      default: 'slide',
    },
    loop: {
      type: Boolean,
      default: true,
    },
    direction: {
      type: String,
      default: 'horizontal',
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    paginationType: {
      type: String,
      default: 'bullets',
    },
    delay: {
      type: Number,
      default: 3000,
    },
    speed: {
      type: Number,
      default: 300,
    },
    imgLazy: {
      type: Boolean,
      default: false,
    },
    showpagination: {
      type: Boolean,
      default: true,
    },
    autoplay: {
      default: function() {
        return {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        };
      },
    },
  },
  data() {
    return {
      swiperObj: '',
    };
  },

  components: {},

  computed: {},

  mounted() {
    var that = this;
    this.swiperObj = new Swiper('.' + that.swipeid, {
      speed: that.speed, //转换到下一张图片的过度时间
      //是否循环切图
      loop: that.loop,
      //分页器
      pagination: {
        el: '.swiper-pagination',
        /* bulletClass: 'swiper-pagination-bullet', */
      },
      //分页类型
      //paginationType: that.paginationType,
      //是否自动播放
      autoplay: that.autoplay,
      direction: that.direction, //滑动方向
      effect: that.effect, //slide的切换效果
      lazy: {
        loadPrevNext: that.imgLazy, //是否预先加载下一张图片 imgLazy为true 懒加载时才有用
      },
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      roundLengths: true, //将slide的宽和高取整(四舍五入)以防止某些分辨率的屏幕上文字或边界(border)模糊。
    });
  },

  methods: {},
};
</script>
<style lang='scss' scoped>
@import '~@standard/plugins/swiper/swiper.min.css';
.swiper-container {
  @include wh(100%, 100%);
  .swiper-wrapper {
    @include wh(100%, 100%);
    * {
      @include wh(100%, 100%);
    }
  }
  /*  img {
    @include wh(100%, 100%);
  } */
}
/* .swiper-pagination-bullet-active {
  background: #fff;
}
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 1rem;
  width: 95%;
  text-align: right;
} */
</style>