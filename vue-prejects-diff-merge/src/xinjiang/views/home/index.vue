<template>
  <div class="hello">
    我是standard
    <t></t>
    <router-link to="/art" class="test">点击我跳转</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import { _getMebInfobyMebId } from '@/standard/common/js/getData.js';
import t from './t';
export default {
  components: {
    t,
  },
  data() {
    return {
      msg: 'Welcome to Ecaray',
    };
  },
  mounted() {
    this._getMebInfobyMebId();
  },
  methods: {
    _getMebInfobyMebId() {
      let paramsObj = {
        mebid: '1000001',
      };
      _getMebInfobyMebId(paramsObj).then(res => {
        debugger;
      });
    },
  },
};
</script>
<style  scoped>
.hello {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
</style>
