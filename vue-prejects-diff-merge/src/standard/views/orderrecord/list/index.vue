<!-- 订单记录 -->
<template>
  <div class="orderrecord">
    <section>
      <mt-loadmore class="wrapper" :top-method="_loadTop" :auto-fill="false" :bottom-method="_loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <!-- 没有记录 -->
        <section v-if="totalCount == 0">
          <no-data :iconname="'blank_order.svg'" :tips="'没有记录'"></no-data>
        </section>
        <section v-else>
          <section v-for="(item,index) in orderObj.list" :key="index" class="order_detail_item" @click="_toOrderDetail(item)">
            <ul>
              <li class="sub_title">{{item.ploname}}</li>
              <li></li>
              <!-- <li :class="item.undo == 0 ? 'color_pay':''">
                {{item.undo == 0 ?"未缴费":'已缴费'}}
                <span class="link-item-svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
                  </svg>
                </span>
              </li> -->
              <li>
                已完成
                <span class="link-item-svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
                  </svg>
                </span>
              </li>
            </ul>
            <ul>
              <li class="gray-point">车牌号码</li>
              <li class="sub_title">{{item.carplate}}</li>
              <li></li>
            </ul>
            <ul>
              <li class="gray-point">计费时长</li>
              <li class="sub_title">{{item.duration}}</li>
              <li></li>
            </ul>
            <ul>
              <li class="gray-point color_point">支付金额</li>
              <li class="sub_title">{{item.actualpay | addComma}}元</li>
              <li>{{item.outtime | timestampFormat}}</li>
            </ul>
          </section>
        </section>
      </mt-loadmore>
    </section>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui';
import noData from '@standard/components/common/ec-no-data.vue';
import { getPloOrderList } from '@standard/api';
export default {
  data() {
    return {
      allLoaded: false,
      pageIndex: 1, //第几页
      pageSize: 8, //每页的数据条数
      isroad: 1, //0路边订单1停车场订单
      totalCount: 0, //返回的列表总条数
      orderObj: {
        list: [],
      },
    };
  },
  components: {
    mtLoadmore: Loadmore,
    noData,
  },
  /* computed: {}, */
  mounted() {
    /* 避免fastclick 在处理点击的时候 进入详情页面 回复原始点击事件 */
    this.$nextTick(() => {
      document.getElementsByClassName('wrapper')[0].addEventListener('touchstart', function(event) {
        event.target.classList.add('needsclick');
      });
    });
    this.$indicator.open();
    this._getPloOrderList();
  },
  methods: {
    _loadTop() {
      //下拉刷新
      var self = this;
      self.pageIndex = 1;
      var params = { pageIndex: self.pageIndex, pageSize: self.pageSize, isroad: self.isroad };
      getPloOrderList(params).then(function(res) {
        self.totalCount = res.totalCount;
        let tempdata = res.data;
        self.orderObj.list = [].concat(tempdata);
        self.allLoaded = false; //重置上拉加载更多
        self.$refs.loadmore.onTopLoaded(); //重置位置
      });
    },
    _loadBottom() {
      //下拉加载更多
      var self = this;
      ++self.pageIndex;
      var params = { pageIndex: self.pageIndex, pageSize: self.pageSize, isroad: self.isroad };
      //全部加载完
      getPloOrderList(params).then(function(res) {
        self.$indicator.close();
        self.totalCount = res.totalCount;
        let tempdata = res.data;
        self.orderObj.list = self.orderObj.list.concat(tempdata);
        //全加载完毕
        if (self.totalCount == self.orderObj.list.length) {
          self.allLoaded = true; //数据全部回去完毕
        }
        self.$refs.loadmore.onBottomLoaded(); //重置位置
      });
    },
    _toOrderDetail(item) {
      this.$router.push({ name: 'orderrecorddetail', params: { itemobj: item } });
    },
    //获取停车场订单列表
    _getPloOrderList() {
      var self = this;
      self.pageIndex = 1;
      var params = { pageIndex: self.pageIndex, pageSize: self.pageSize, isroad: self.isroad };
      getPloOrderList(params).then(function(res) {
        self.totalCount = res.totalCount;
        let tempdata = res.data;
        self.orderObj.list = [].concat(tempdata);
        self.$indicator.close();
      });
    },
  },
  //进入列表页面改为keep-alive状态 回到其他页面改为非keep-alvie状态
  /* beforeRouteLeave(to, from, next) {
    if (to.path == '/orderrecord/detail') {
      from.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
      //销毁vue实例
      this.$destroy();
    }
    next();
  }, */
};
</script>
<style lang='scss' scoped>
.orderrecord {
  overflow: scroll;
  @include pageColor();
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
        line-height: 50px;
        @include sc(28px, #999);
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