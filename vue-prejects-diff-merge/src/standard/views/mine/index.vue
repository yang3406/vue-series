<!-- 我的 -->
<template>
  <div>
    <div class="mine-page">
      <header class="user-info" :style="headerStyle">
        <router-link to='/mine/info' class="user-link">
          <!-- 登录后的头像 -->
          <img :src='avatarUrl' class="user-img" v-if="avatarIcon">
          <!-- 未登录默认头像 -->
          <span class="user-img" v-else>
            <svg class="user-img-svg">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_default_car"></use>
            </svg>
          </span>
          <span class="user-number"> {{nickname}} </span>
          <span class="arrow">
            <svg class="arrow-svg" fill="#fff">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
            </svg>
          </span>
        </router-link>
      </header>

      <section class="user-menu">
        <section class="mine">
          <router-link to="/mywallet" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_wallet"></use>
              </svg>
            </aside>
            <div class="link-item-content border_split">
              <span>我的钱包</span>
              <span class="order-money">{{balance}}</span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
                </svg>
              </span>
            </div>
          </router-link>

          <router-link to="/coupon" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_coupon"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>我的优惠券</span>
              <span>{{couponCount}}</span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
                </svg>
              </span>
            </div>
          </router-link>

          <!--  <router-link to="/mydiscount" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>我的折扣活动</span>
              <span>0分</span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
                </svg>
              </span>
            </div>
          </router-link> -->

          <!-- <router-link to="/mydiscount" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>我的积分</span>
              <span>0分</span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
                </svg>
              </span>
            </div>
          </router-link> -->

        </section>

        <section class="service split-area">
          <router-link to="/carnum" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_carnum"></use>
              </svg>
            </aside>
            <div class="link-item-content border_split">
              <span>车牌绑定</span>
              <span>可查看实时停车情况，自主缴费</span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
                </svg>
              </span>
            </div>
          </router-link>

          <!-- <router-link to="/eleinvoice" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>电子发票</span>
              <span></span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
                </svg>
              </span>
            </div>
          </router-link> -->

          <router-link to="/orderrecord/list" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_oreder_recorder"></use>
              </svg>
            </aside>
            <div class="link-item-content border_split">
              <span>订单记录</span>
              <span></span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
                </svg>
              </span>
            </div>
          </router-link>

          <router-link to="/monthcard/list" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xlink:href="#svg_month_card"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>我的月卡</span>
              <span></span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
                </svg>
              </span>
            </div>
          </router-link>

          <!--  <router-link to="/offlinemap" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>离线地图</span>
              <span></span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
                </svg>
              </span>
            </div>
          </router-link> -->
        </section>

        <section class="userback split-area">
          <router-link to="/feedback" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_feedback"></use>
              </svg>
            </aside>
            <div class="link-item-content border_split">
              <span>意见反馈</span>
              <span></span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
                </svg>
              </span>
            </div>
          </router-link>
          <router-link to="/aboutus" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_aboutus"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>关于我们</span>
              <span></span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
                </svg>
              </span>
            </div>
          </router-link>
        </section>
        <!-- <section class="setting split-area">
          <router-link to="/setting" class="link-item">
            <aside>
              <svg fill="#508cee">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_settting"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>设置</span>
              <span></span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg_arrow_right"></use>
                </svg>
              </span>
            </div>
          </router-link>
        </section> -->
      </section>
    </div>
  </div>
</template>

<script>
import { getMebInfobyMebId, getHeaderIcon } from '@standard/api';
import { isNullorEmpty } from '@standard/common/js/util';
import { mapGetters, mapMutations } from 'vuex';
import { CHANGE_TELNO, CHANGE_NICKNAME, CHANGE_AVATARICONURL } from '@standard/store/mutation-types';
export default {
  name: 'mine',
  data() {
    return {
      balance: '', // 钱包余额
      couponCount: '', // 我的优惠券
      avatarIcon: false, //显示个性化头像
      avatarUrl: '',
      nickname: '暂未登录',
      reqstatus: false, //是否请求过接口
      headerStyle: {
        backgroundImage: 'url(' + require('@img/mine_header_bg.png') + ')',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%,100%',
      },
    };
  },
  computed: {
    ...mapGetters(['getmebID']),
  },
  mounted() {
    if (!isNullorEmpty(this.getmebID)) {
      if (!this.reqstatus) {
        this.reqstatus = true;
        this._getMebInfobyMebId();
        this._getHeaderIcon();
      }
    }
  },
  activated() {
    if (!isNullorEmpty(this.getmebID)) {
      if (!this.reqstatus) {
        this.reqstatus = true;
        this._getMebInfobyMebId();
        this._getHeaderIcon();
      }
    }
  },
  deactivated() {
    this.reqstatus = false;
  },
  methods: {
    ...mapMutations([CHANGE_TELNO, CHANGE_NICKNAME, CHANGE_AVATARICONURL]),
    _getMebInfobyMebId() {
      var self = this;
      getMebInfobyMebId().then(function(res) {
        //self.balance = res.balance || 0;
        //self.couponCount = res.couponCount || 0;
        self.nickname = res.nickname || res.tel;
        self.CHANGE_TELNO(res.tel);
        self.CHANGE_NICKNAME(res.nickname);
      });
    },
    _getHeaderIcon() {
      let self = this;
      let mebId = this.getmebID;
      if (isNullorEmpty(mebId)) {
        return;
      }
      return; /* undo 暂时没做 头像 */
      let time = new Date().getTime();
      let fileName = mebId + '.png';
      let regObj = { type: 'png_app', nowtime: time, fileName: fileName };
      getHeaderIcon(regObj).then(function(res) {
        self.avatarIcon = true;
        self.avatarUrl = res.url;
        self.CHANGE_AVATARICONURL(self.avatarUrl);
      });
    },
  },
};
</script>
<style lang='scss' scoped>
@import './index.scss';
</style>