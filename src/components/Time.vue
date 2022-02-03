<template>
  <div class="container">
    <div class="top">
      <span>准备学习？</span>
      <!-- <span>开始学习</span> -->
      <!-- <span>结束学习</span> -->
    </div>
    <div class="center">
      <Miaobiao></Miaobiao>
    </div>
    <div class="foot">
      <span>语言</span>
      <span>成功书写</span>
    </div>
  </div>
</template>

<script>
const Miaobiao = () => import("../components/Miaobiao.vue");
export default {
  components: { Miaobiao },
  name: "Time",
  data() {
    return {
      value: false,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
}
.top,
.center,
.foot {
  padding: 65px 0;
}
</style>