<!-- 意见反馈 -->
<template>
  <div>
    <section class="feedback">
      <textarea placeholder="欢迎吐槽和给予建议……" class="suggestion" @keyup="_validSubmit()" v-model="content" required>
      </textarea>
      <div :class="[btnflag ? 'ec_btn_model_submit': 'ec_btn_model_gray_submit','btn_submit']" @click="_addComplain()">提交</div>
    </section>
  </div>
</template>

<script>
import { addComplain } from '@standard/api';
import { MessageBox } from 'mint-ui';
export default {
  name: 'feedback',
  data() {
    return {
      content: '',
      btnflag: false,
    };
  },

  /*  components: {},

  computed: {},

  mounted: {},*/
  methods: {
    _validSubmit() {
      if (this.content.length > 0) {
        this.btnflag = true;
      } else {
        this.btnflag = false;
      }
    },
    _addComplain() {
      let self = this;
      if (this.btnflag) {
        let params = { content: self.content };
        addComplain(params).then(function(res) {
          MessageBox({
            title: '温馨提示',
            message: '你的意见反馈已提交成功，我们尽快为您处理',
            showCancelButton: false,
          }).then(actions => {
            self.$router.push('/mine');
          });
        });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.feedback {
  width: 90%;
  margin: 0 auto;
  .suggestion {
    margin-top: 60px;
    @include wh(100%, 500px);
    padding-left: 5px; /* no */
    padding-left: 5px; /* no */
    padding-top: 5px; /* no */
    padding-bottom: 5px; /* no */
    @include sc(26px);
  }
  .btn_submit {
    margin-top: 88px;
  }
}
</style>