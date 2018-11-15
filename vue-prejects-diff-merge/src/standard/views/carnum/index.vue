<!-- 车牌号列表 -->
<template>
  <div class="carnum">
    <section class="carnum_area">
      <section v-for="(item,index) in carnumList" :key="index" :class="item.isemergy ? 'energy_car':''">
        <span>{{item.carnum}}</span>
      </section>
    </section>
    <section class="add_carnum" @click="_addCarNum()">
      <svg fill="#999" x="10" y="10">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#add"></use>
      </svg>
      <span>绑定车牌</span>
    </section>
  </div>
</template>
<script>
export default {
  name: 'carnum',
  data() {
    return {
      carnumList: [{ carnum: '苏A .12349', isemergy: false }, { carnum: '苏B .12349', isemergy: true }],
    };
  },
  /* components: {},

  computed: {},

  mounted: {},*/

  methods: {
    _addCarNum() {
      this.$router.push('/carnum/addcarnum');
    },
  },
};
</script>
<style lang='scss' scoped>
.carnum {
  @include absCover();
  padding: 60px;
  .carnum_area {
    section {
      background-color: #3caffb;
      @include linearGradient(#3598f7, #43c6ff, 45deg);
      text-align: center;
      @include wh(100%, 170px);
      line-height: 170px;
      @include sc(60px, #fff);
      @include borderRadius(16px);
      margin-bottom: 42px;
    }
    section.energy_car {
      background-color: #37dabe;
      @include linearGradient(#2ccac0, #41e9bc, 45deg);
    }
  }
  .add_carnum {
    background-color: #f2f2f2;
    @include borderRadius(40px);
    @include sc(32px, #666);
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      padding-right: 10px;
      @include wh(60px, 60px);
    }
  }
}
</style>