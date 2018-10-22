<!--  -->
<template>
  <div class="test">测试sass能不能用</div>

</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {},
};
</script>

<style lang='scss' scoped>
@import '../../common/css/mixin.scss';

.test {
  @include sc(10px, red);
}
</style>