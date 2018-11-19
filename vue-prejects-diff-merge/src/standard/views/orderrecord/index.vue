<!-- 定单记录 -->
<template>
  <div class="orderrecord">
    <section>
      <mt-loadmore class="wrapper" :top-method="_loadTop" @touchstart.native='needsclick' :bottom-method="_loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <!-- 没有记录 -->
        <section v-if="orderObj.list.length == 0">
          <ul class="no_order">
            <li><img src="./blank_order.png"></li>
            <li>没有记录</li>
          </ul>
        </section>
        <section v-else>
          <section v-for="(item,index) in orderObj.list" :key="index" class="order_detail_item" @click="_toOrderDetail(item.name)">
            <ul>
              <li class="sub_title">{{item.name}}</li>
              <li></li>
              <li :class="item.state == 0 ? 'color_pay':''">
                {{item.state == 0 ?"未缴费":'已缴费'}}
                <span class="link-item-svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
                </span>
              </li>
            </ul>
            <ul>
              <li class="gray-point">车牌号码</li>
              <li class="sub_title">{{item.carnum}}</li>
              <li></li>
            </ul>
            <ul>
              <li class="gray-point">计费时长</li>
              <li class="sub_title">{{item.time}}</li>
              <li></li>
            </ul>
            <ul>
              <li class="gray-point color_point">支付金额</li>
              <li class="sub_title">{{item.money}}</li>
              <li>{{item.date}}</li>
            </ul>
          </section>
        </section>
      </mt-loadmore>
    </section>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui';
export default {
  data() {
    return {
      allLoaded: false,
      orderObj: {
        list: [
          {
            name: '财富港停车',
            state: '1',
            carnum: '粤B123456',
            time: '2小时31分钟',
            money: '12.00元',
            date: '2017-06-30 15:12:16',
          },
          {
            name: '财富港停车',
            state: '0',
            carnum: '粤B123456',
            time: '2小时31分钟',
            money: '12.00元',
            date: '2017-06-30 15:12:16',
          },
          {
            name: '财富港停车',
            state: '1',
            carnum: '粤B123456',
            time: '2小时31分钟',
            money: '12.00元',
            date: '2017-06-30 15:12:16',
          },
          {
            name: '财富港停车',
            state: '0',
            carnum: '粤B123456',
            time: '2小时31分钟',
            money: '12.00元',
            date: '2017-06-30 15:12:16',
          },
          {
            name: '财富港停车',
            state: '1',
            carnum: '粤B123456',
            time: '2小时31分钟',
            money: '12.00元',
            date: '2017-06-30 15:12:16',
          },
          {
            name: '财富港停车',
            state: '0',
            carnum: '粤B123456',
            time: '2小时31分钟',
            money: '12.00元',
            date: '2017-06-30 15:12:16',
          },
        ],
      },
    };
  },
  components: {
    mtLoadmore: Loadmore,
  },
  /* computed: {}, */
  mounted() {
    /* 避免fastclick 在处理点击的时候 进入详情页面 回复原始点击事件 */
    this.$nextTick(() => {
      document.getElementsByClassName('wrapper')[0].addEventListener('touchstart', function(event) {
        event.target.classList.add('needsclick');
      });
    });
  },
  methods: {
    _loadTop() {
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded(); //重置位置
      }, 2000);
    },
    _loadBottom() {
      setTimeout(() => {
        this.allLoaded = true; //数据全部回去完毕
        this.$refs.loadmore.onBottomLoaded(); //重置位置
      }, 2000);
    },
    _toOrderDetail(item) {
      this.$router.push({ path: 'orderrecord/detail', query: { id: item } });
    },
  },
};
</script>
<style lang='scss' scoped>
.orderrecord {
  overflow: scroll;
  @include pageColor();
  ul.no_order {
    margin-top: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include sc(28px, #666666);
    li {
      margin-bottom: 50px;
      img {
        @include wh(180px, 180px);
      }
    }
  }
  .order_detail_item {
    border-bottom-width: 8px; /* no */
    border-bottom-color: #f2f2f2;
    border-bottom-style: solid;
    padding: 20px 33px;
    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      li {
        line-height: 48px;
        @include sc(24px, #999);
      }
      li:nth-child(2) {
        padding-left: 36px;
        flex-grow: 1;
      }
      li:nth-child(3) {
      }
      li.sub_title {
        color: #444;
        font-weight: 500;
      }
      .gray-point::before {
        display: inline-block;
        content: '';
        width: 0px;
        height: 0px;
        vertical-align: middle;
        border: 4px solid #999;
        @include borderRadius(50%);
        margin-right: 14px;
      }
      .color_point::before {
        border: 4px solid #ff801a;
      }
      .color_pay {
        color: #ff801a;
      }
    }

    .link-item-svg {
      @include SvgIconColor(#c2c2c2, #c2c2c2);
      svg {
        @include wh(22px, 22px);
      }
    }
  }
}
</style>