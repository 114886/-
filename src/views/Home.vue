<template>
  <el-container>
    <el-aside width="200px">
      <ol class="list" @click="routerClick">
        <li id="1" :class="{ activeStyle: '1' === show1 }">首页</li>
        <li id="2" :class="{ activeStyle: '2' === show1 }">计时器</li>
        <li id="3" :class="{ activeStyle: '3' === show1 }">计划</li>
        <li id="4" :class="{ activeStyle: '4' === show1 }">时长明细</li>
        <li id="5" :class="{ activeStyle: '5' === show1 }">奖励中心</li>
      </ol>
    </el-aside>
    <el-main>
      <First v-if="show1 === '1'"></First>
      <Time v-if="show1 === '2'"></Time>
      <Notes v-if="show1 === '3'"></Notes>
      <Detailed v-if="show1 === '4'"></Detailed>
    </el-main>
  </el-container>
</template>
<script>
const First = () => import("../components/First.vue");
const Time = () => import("../components/Time.vue");
const Detailed = () => import("../components/Detailed.vue");
const Notes = () => import("../components/Notes.vue");
export default {
  components: { First, Time, Detailed, Notes },
  name: "Home",
  data() {
    return {
      show1: "1",
    };
  },
  methods: {
    routerClick(e) {
      const id = e.target.id;
      if (id === "1") {
        this.show1 = "1";
      } else if (id === "2") {
        this.show1 = "2";
      } else if (id === "3") {
        this.show1 = "3";
      } else if (id === "4") {
        this.show1 = "4";
      } else {
        this.show1 = "5";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.activeStyle {
  color: rgb(0, 140, 255) !important;
}
.list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  > li {
    padding: 30px 0;
    font-size: 25px;
    color: rgb(245, 253, 255);
  }
  > li:hover {
    background: rgb(67, 74, 80);
    cursor: pointer;
  }
}
</style>