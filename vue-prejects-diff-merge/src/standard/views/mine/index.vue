<!-- 我的 -->
<template>
  <div>
    <div class="mine-page">
      <header class="user-info" :style="headerStyle">
        <router-link to='/mine/info' class="user-link">
          <!-- 登录后的头像 -->
          <img src='' class="user-img" v-if="getIsLogin">
          <!-- 未登录默认头像 -->
          <span class="user-img" v-else>
            <svg class="user-img-svg">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
            </svg>
          </span>
          <span class="user-number"> {{mobile}} </span>
          <span class="arrow">
            <svg class="arrow-svg" fill="#fff">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </router-link>
      </header>

      <section class="user-menu">
        <section class="mine">
          <router-link to="/mywallet" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>我的钱包</span>
              <span class="order-money">28.0</span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
            </div>
          </router-link>

          <router-link to="/mycoupon" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>我的优惠券</span>
              <span>3张</span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
            </div>
          </router-link>

          <router-link to="/mydiscount" class="link-item">
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
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
            </div>
          </router-link>

          <router-link to="/mydiscount" class="link-item">
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
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
            </div>
          </router-link>

        </section>

        <section class="service split-area">
          <router-link to="/carnum" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>车牌绑定</span>
              <span>可查看实时停车情况，自主缴费</span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
            </div>
          </router-link>

          <router-link to="/eleinvoice" class="link-item">
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
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
            </div>
          </router-link>

          <router-link to="/parkrecord" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>停车记录</span>
              <span></span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
            </div>
          </router-link>

          <router-link to="/offlinemap" class="link-item">
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
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
            </div>
          </router-link>
        </section>

        <section class="userback split-area">
          <router-link to="/feedback" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>意见反馈</span>
              <span></span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
            </div>
          </router-link>
          <router-link to="/aboutus" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>关于我们</span>
              <span></span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
            </div>
          </router-link>
        </section>
        <section class="setting split-area">
          <router-link to="/setting" class="link-item">
            <aside>
              <svg fill="#4aa5f0">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
              </svg>
            </aside>
            <div class="link-item-content">
              <span>设置</span>
              <span></span>
              <span class="link-item-svg">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
              </span>
            </div>
          </router-link>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'mine',
  data() {
    return {
      minePageShow: true,
      mobile: '暂未登录',
      headerStyle: {
        backgroundImage: 'url(' + require('@img/mine_header_bg.png') + ')',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%,100%',
      },
    };
  },
  computed: {
    ...mapGetters({ getIsLogin: 'getIsLogin' }),
  },
  /* components: {},
  mounted: {},

  methods: {}, */
};
</script>
<style lang='scss' scoped>
@import './index.scss';
</style>