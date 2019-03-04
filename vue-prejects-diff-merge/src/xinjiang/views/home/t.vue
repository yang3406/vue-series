<!--  -->
<template>
  <div class="test">测试sass能不能用wwwww</div>

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
.test {
  @include sc(10px, red);
}
</style>