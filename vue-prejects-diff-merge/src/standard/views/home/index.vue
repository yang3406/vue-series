<template>
  <div class="home">
    <div class="header">
      <mt-swipe :auto="3000" :speed='200'>
        <mt-swipe-item v-for="imgItem in swipertopBannerImg" :key="imgItem.id" @click.native="_jumpURl(imgItem.detailurl)">
          <img :src="imgItem.imgurl">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <section>
      <nav class="tab-menu-area" v-if="tabimgList.length">
        <router-link :to="{path: tabItem.path}" v-for="tabItem in tabimgList" :key="tabItem.id" class="link_to_tab">
          <figure>
            <img v-if='tabItem.id == "parkingpay" && isploparking' :src="parkingpayurl">
            <img v-else :src="tabItem.url">
            <figcaption>{{tabItem.title}}</figcaption>
          </figure>
        </router-link>
      </nav>
    </section>
    <section class="feellesspay">
      <ul>
        <li>
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_feellesspay"></use>
          </svg>
          <span>开启无感支付</span>
        </li>
        <li @click="_operateSigning()">
          <span>{{signStatus ? "解绑" : "去绑定"}}</span>
          <svg fill="#ff801a">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
          </svg>
        </li>
      </ul>
    </section>

    <section class="swipercararea">
      <mt-swipe :auto="0">
        <mt-swipe-item v-for="(item,index) in swipercarnums" :key="index" @click.native="_jumpCarItem(item.carnumber)">
          <ul>
            <li v-if="!item.addflag">{{item.carnumber | splitCarNum}}</li>
            <li v-else class="addcarnumtext">{{item.carnumber}}</li>
            <li v-if="item.addflag">{{item.desc}}</li>
          </ul>
        </mt-swipe-item>
      </mt-swipe>
    </section>
    <section class="footer_swiper">
      <div @click="_jumpURl(bottomImg.detailurl)"><img :src="bottomImg.imgurl"></div>
    </section>
    <iframe ref="signiframe" class="signiframe" src=""></iframe>
  </div>
</template>

<script>
import { isNullorEmpty } from '@standard/common/js/util.js';
import { mapGetters } from 'vuex';
import { Swipe, SwipeItem } from 'mint-ui';
import { getBaseInfo, getSignStatus, bindSigning, unBindSigning } from '@standard/api';
import { imgdataobj } from '@standard/mock/swiper-loopimg/index.js'; //循坏滚动图片数据
import { tabMenuDataObj } from '@standard/common/localdata/tab-menu-data.js'; //首页tab目录展示

export default {
  name: 'home',
  components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem,
  },
  data() {
    return {
      imgList: imgdataobj.list, //默认图片
      tabimgList: tabMenuDataObj.list,
      swipertopBannerImg: [], //头部轮播图
      bottomImg: '',
      defaultBottomImg: require('@img/home_bottom.jpg'),
      parkingpayurl: require('@standard/common/localdata/img/tab-menu/parkpayment_ing.svg'),
      swipercarnums: [], //车辆轮播图
      signStatus: false, //签约状态 true已签约 false 未签约
      reqstatus: false, //是否请求过接口
      activatedflag: false, //判断是否是activated
      isploparking: false,
    };
  },
  computed: {
    ...mapGetters(['getmebID']),
  },
  //测试手机自带返回键只会触发mounted 不会触发activated
  mounted() {
    if (!this.reqstatus) {
      this.reqstatus = true;
      this._getBaseInfo();
      this._getSignStatus();
    }
  },
  activated() {
    if (!this.reqstatus) {
      this.reqstatus = true;
      this._getBaseInfo();
      this._getSignStatus();
    }
  },
  //keepalive会保存状态
  deactivated() {
    this.reqstatus = false;
    this.activatedflag = true;
  },
  methods: {
    _getBaseInfo() {
      var self = this;
      getBaseInfo({}).then(function(res) {
        //如果是keep-alive状态页面跳转的的 图片会保存 不需要再次渲染
        //0没有正在停车 1为有正在停车
        if (res.isploparking == 1) {
          self.isploparking = true;
        } else {
          self.isploparking = false;
        }
        if (!self.activatedflag) {
          //头部轮播图 数据
          if (res.bannerMap && res.bannerMap.length > 0) {
            self.swipertopBannerImg = [].concat(res.bannerMap);
          }
          //底部数据
          if (res.bannerMap1 && res.bannerMap1.length > 0) {
            self.bottomImg = res.bannerMap1[0];
          } else {
            self.bottomImg = { imgurl: self.defaultBottomImg, detailurl: '' };
          }
        }
        //车辆轮播图数据
        //判断是否达到最大的车牌数
        if (res.bindcount >= res.maxbind) {
          self.swipercarnums = [].concat(res.carinfo || []);
        } else {
          self.swipercarnums = []
            .concat(res.carinfo || [])
            .concat({ carnumber: '绑定车牌', desc: res.carnumtip, addflag: true });
        }
      });
    },
    /* 查看签约状态 */
    _getSignStatus() {
      let self = this;
      if (!isNullorEmpty(self.getmebID)) {
        getSignStatus().then(function(res) {
          //已签约
          if (res.status == 1) {
            self.signStatus = true;
            //未签约
          } else {
            self.signStatus = false;
          }
        });
      }
    },
    _operateSigning() {
      let self = this;
      if (!isNullorEmpty(self.getmebID)) {
        //已签约  解约
        if (self.signStatus) {
          self.$messagebox.confirm('您确定要关闭工商银行小额免密支付，取消停车场进出无感支付吗？').then(
            actions => {
              self._unBindSigning();
            },
            () => {
              return;
            },
          );
        } else {
          //未签约 签约
          self._bindSigning();
        }
      } else {
        //未登录
        self.$messagebox.confirm('执行此操作需要登录,是否登录?').then(
          actions => {
            self.$router.push('/useraccount/login');
          },
          () => {
            return;
          },
        );
      }
    },
    /* 签约 请求后台 跳入工行的地址*/
    _bindSigning() {
      let self = this;
      let returnurl = window.location.href;
      let params = { returnurl };
      bindSigning(params).then(function(res) {
        //触发跳转到 绑定免密支付
        let targetwindow = self.$refs.signiframe.contentWindow.document;
        targetwindow.body.innerHTML = res;
        if (targetwindow.forms['auto_submit_form']) {
          targetwindow.forms['auto_submit_form'].setAttribute('target', '_top');
          targetwindow.forms['auto_submit_form'].submit();
        } else if (targetwindow.forms.auto_submit_form) {
          targetwindow.forms.auto_submit_form.setAttribute('target', '_top');
          targetwindow.forms.auto_submit_form.submit();
        } else {
          this.$messagebox('提示', res);
        }
      });
    },
    /* 解约 */
    _unBindSigning() {
      let self = this;
      unBindSigning().then(function(res) {
        self._getSignStatus();
      });
    },
    _jumpURl(url) {
      if (!isNullorEmpty(url)) {
        window.location.href = url;
      }
    },
    _jumpCarItem(carnum) {
      if (carnum == '绑定车牌') {
        this.$router.push('/carnum/addcarnum');
      } else {
        this.$router.push('/carnum');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
