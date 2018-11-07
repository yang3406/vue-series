<!-- 我的 -->
<template>
  <div class="mine-page">
    <header class="user-info" :style="headerStyle">
      <router-link to='/home' class="user-link">
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

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      mobile: '暂未登录',
      /* headerStyle: '', */
      headerStyle: {
        backgroundImage: 'url(' + require('@img/mine/headerbgi.jpg') + ')',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
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