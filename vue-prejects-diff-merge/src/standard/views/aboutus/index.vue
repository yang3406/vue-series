<!-- 关于我们 -->
<template>
  <div class="aboutus">
    <section class="top">
      <ul>
        <li><img :src="topic_img"></li>
        <li>畅停e行 V1.0.1</li>
      </ul>
    </section>
    <section class="content">
      <ul class="outter_wrap">
        <li @click="_gotoGuide">
          <div>
            <span>操作指南</span>
            <span>
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
              </svg>
            </span>
          </div>
        </li>
        <li>
          <div>
            <span>客服电话</span>
            <a class="tel_no" :href="callTel">
              {{customTel}}
            </a>
          </div>
        </li>
        <li>
          <div>
            <span>官方信息</span>
            <span>
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
              </svg>
            </span>
          </div>
        </li>
        <!-- <li>
          <div>
            <span>检测更新</span>
            <span>
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
              </svg>
            </span>
          </div>
        </li> -->
      </ul>
    </section>
    <section class="logo">
      <ul>
        <li>{{author}}</li>
        <li>版权所有 Copyright ©2016</li>
      </ul>
    </section>
  </div>
</template>

<script>
import config from '@standard/common/js/config.js';
export default {
  name: 'aboutus',
  data() {
    return {
      topic_img: 'http://n.sinaimg.cn/news/1_img/upload/cf3881ab/66/w1000h666/20181122/fjoL-hmhswin7680191.jpg',
      customTel: config.telOfCustomer,
      author: config.authorizedSign,
    };
  },
  computed: {
    callTel() {
      return 'tel:' + this.customTel;
    },
  },
  /*  components: {},
  mounted: {}, */
  methods: {
    _gotoGuide() {
      this.$route.push('/guide');
    },
  },
};
</script>
<style lang='scss' scoped>
.aboutus {
  .top {
    ul {
      @include sc(32px, #8e8e92);
      @include wh(100%, 360px);
      background-color: #fff;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      li:nth-child(1) {
        @include wh(180px, 180px);
        img {
          @include wh(100%, 100%);
        }
        margin-bottom: 25px;
      }
    }
    margin-bottom: 20px; /* no */
  }
  .content {
    margin-bottom: 100px;
    @include wh(100%, 100%);
    background: #fff;
    .outter_wrap {
      margin-left: 30px;
      li:not(:last-child) {
        border-bottom-width: 1px; /* no */
        border-bottom-color: #eaeaea;
        border-bottom-style: solid;
      }
      li {
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 96px;
          span:nth-child(1) {
            @include sc(28px, #8e8e92);
          }
          span:nth-child(2) {
            margin-right: 15px;
            @include SvgIconColor(#c2c2c2, #c2c2c2);
            svg {
              @include wh(30px, 55px);
            }
          }
          .tel_no {
            @include sc(30px, $citySkinColor);
            margin-right: 24px;
          }
        }
      }
    }
  }
  .logo {
    position: fixed;
    bottom: 60px;
    width: 100%;
    ul {
      display: flex;
      flex-flow: column;
      align-items: center;
      li {
        @include sc(22px, #8e8e92);
        margin-bottom: 10px;
      }
    }
  }
}
</style>