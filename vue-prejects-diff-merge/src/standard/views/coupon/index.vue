<!-- 我的优惠券 -->
<template>
  <div class="coupon">
    <section>
      <mt-loadmore class="wrapper" :top-method="_loadTop" :bottom-all-loaded="allLoaded" ref="loadmore">
        <section v-if="dataList.length == 0">
          <!-- 没有记录 -->
          <no-data :iconname="'blank_coupon.svg'" :tips="'您暂时还没有优惠券'"></no-data>
        </section>
        <section v-else>
          <section :class="[item.expired ? 'expired':'','coupon_item']" v-for="(item,index) in dataList" :key="index" :style="item.expired ? expiredBGI:expiredBGI">
            <ul class="out_wrapper">
              <li>{{item.coupon}}</li>
              <li>
                <ul class="inner_wrapper">
                  <li>{{item.title}}</li>
                  <li>{{item.desc}}</li>
                  <li>{{item.pastTime}}</li>
                </ul>
              </li>
              <li v-show='!item.expired' :class="[item.status ? 'used':'']">立即使用</li>
              <li v-show='item.expired'><img :src=expiredIcon></li>
            </ul>
          </section>
        </section>
      </mt-loadmore>
    </section>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui';
import expiredIcon from '@img/mine_coupon_ic_expired.png';
import noData from '@standard/components/common/ec-no-data.vue';
export default {
  name: 'coupon',
  data() {
    return {
      expiredIcon: expiredIcon,
      dataList: [],
      /* dataList: [
        {
          coupon: '￥1',
          title: '满5元可用',
          desc: '仅限于手机App停车使用',
          pastTime: '2017.06.10过期',
          status: 0, //是否已使用 0 未使用 1已使用
          expired: false, //是否过期
        },
        {
          coupon: '￥2',
          title: '满15元可用',
          desc: '仅限于手机App停车使用',
          pastTime: '2017.06.10过期',
          status: 1,
          expired: true,
        },
        {
          coupon: '￥3',
          title: '满25元可用',
          desc: '仅限于手机App停车使用',
          pastTime: '2017.06.10过期',
          status: 1,
          expired: false,
        },
      ], */
      allLoaded: false,
      expiredBGI: {
        backgroundImage: 'url(' + require('@img/mine_coupon_bg_gray.png') + ')',
      },
      notexpiredBGI: {
        backgroundImage: 'url(' + require('@img/mine_coupon_bg_orange.png') + ')',
      },
    };
  },

  components: {
    mtLoadmore: Loadmore,
    noData: noData,
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      document.getElementsByClassName('wrapper')[0].addEventListener('touchstart', function(event) {
        event.target.classList.add('needsclick');
      });
    });
  },
  methods: {
    _loadTop() {
      setTimeout(() => {
        this.allLoaded = false; //充值上拉加载更多
        this.$refs.loadmore.onTopLoaded(); //重置位置
      }, 2000);
    },
    _loadBottom() {
      setTimeout(() => {
        this.allLoaded = true; //数据全部回去完毕
        this.$refs.loadmore.onBottomLoaded(); //重置位置
      }, 2000);
    },
  },
};
</script>
<style lang='scss' scoped>
.coupon {
  overflow: scroll;
  min-height: 100%;
  background-color: #ffffff;
  .coupon_item {
    margin: 30px;
    height: 220px;
    background-position: center center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .out_wrapper {
      height: 100%;
      display: flex;
      align-items: center;
      text-align: center;
      li:nth-child(1) {
        width: 20%;
        @include sc(72px, #ff791f);
      }
      li:nth-child(2) {
        width: 50%;
        .inner_wrapper {
          display: flex;
          flex-flow: column nowrap;
          justify-items: center;
          text-align: left;
          li {
            width: 100%;
            @include sc(24px, #8e8e92);
            line-height: 42px;
          }
          li:nth-child(1) {
            color: #ff791f;
          }
        }
      }
      li:nth-child(3) {
        flex-grow: 1;
        @include sc(32px, #20c2db);
      }
      li.used {
        @include sc(32px, #8e8e92);
        opacity: 0.5;
      }
    }
  }
  .expired {
    .out_wrapper {
      opacity: 0.5;
      li:nth-child(1) {
        color: #8e8e92;
      }
      li:nth-child(2) {
        .inner_wrapper {
          li:nth-child(1) {
            color: #8e8e92;
          }
        }
      }
      li:nth-child(4) {
        height: 100%;
        flex-grow: 1;
        position: relative;
        img {
          @include wh(75%, 75%);
          @include center();
        }
      }
    }
  }
}
</style>