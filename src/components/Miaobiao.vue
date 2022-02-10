<template>
  <div class="container">
    <h4 id="mytime">{{ str }}</h4>
    <div class="buttons">
      <el-button id="start" @click="start" type="primary" plain
        >开始计时</el-button
      >
      <el-button id="stop" @click="stop" type="primary" plain
        >暂停计时</el-button
      >
      <el-button id="reset" type="primary" plain @click="reset">重置</el-button>
      <el-button type="success" plain @click="getNote()">保存数据</el-button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "Miaobiao",
  data() {
    return {
      h: 0, //定义时，分，秒，毫秒并初始化为0；
      m: 0,
      s: 0,
      ms: 0,
      a: "",
      c: "",
      addtimes: 0,
      time: 0, //定时器
      str: "00:00:00",
      times: "0", //统计共多少秒时间
    };
  },
  methods: {
    getNote() {
      this.$prompt("如有备注，请输入", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "备注成功",
          });
          this.getTime(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    getTime(note) {
      this.$confirm("此操作将保存计时, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //操作
          this.$store.commit("createTime", { timeSecond: +this.times, note });
          //保存后删除数据
          clearInterval(this.time);
          this.h = 0;
          this.m = 0;
          this.ms = 0;
          this.s = 0;
          this.str = "00:00:00";
          this.$message({
            type: "success",
            message: "保存成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存",
          });
        });
    },
    start() {
      document.addEventListener("visibilitychange", this.watchTimes);
      //开始
      this.$message({
        showClose: true,
        message: "开始计时",
        type: "success",
        center: true,
      });
      this.time = setInterval(this.timer, 50);
    },

    stop() {
      //暂停
      document.removeEventListener("visibilitychange", this.watchTimes);
      this.$message({
        showClose: true,
        message: "暂停计时",
        type: "warning",
        center: true,
      });
      clearInterval(this.time);
    },

    reset() {
      //重置
      this.$confirm("此操作将重新置计时器, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "重置成功!",
          });
          clearInterval(this.time);
          this.h = 0;
          this.m = 0;
          this.ms = 0;
          this.s = 0;
          this.str = "00:00:00";
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置",
          });
        });
    },
    timer() {
      if (document.visibilityState === "hidden") {
        if (this.a === "") {
          this.c = dayjs(new Date());
        }
        this.a = "1";
      }
      if (this.a !== "" && document.visibilityState === "visible") {
        let b = dayjs(new Date());
        this.a = "";
        this.addtimes = Math.floor(b.diff(this.c) / 1000);
      }
      //定义计时函数

      //统计共看了多少秒
      if (this.addtimes !== 0) {
        this.times = this.s + this.m * 60 + this.h * 3600 + this.addtimes;
        let c = Math.floor(this.addtimes / 3600);
        let d = Math.floor(this.addtimes / 60);
        let e = Math.floor(this.addtimes);
        this.h += c;
        this.addtimes = this.addtimes - c * 3600000;
        this.m += d;
        this.addtimes = this.addtimes - d * 60000;
        this.s += e;
        this.str =
          this.toDub(this.h) +
          ":" +
          this.toDub(this.m) +
          ":" +
          this.toDub(this.s);
        this.addtimes = 0;
      } else {
        this.ms = this.ms + 50; //毫秒
        if (this.ms >= 1000) {
          this.ms = 0;
          this.s = this.s + 1; //秒
        }
        if (this.s >= 60) {
          this.s = 0;
          this.m = this.m + 1; //分钟
        }
        if (this.m >= 60) {
          this.m = 0;
          this.h = this.h + 1; //小时
        }
        this.str =
          this.toDub(this.h) +
          ":" +
          this.toDub(this.m) +
          ":" +
          this.toDub(this.s);
        this.times = this.s + this.m * 60 + this.h * 3600;
      }
    },
    toDub(n) {
      //补0操作
      if (n < 10) {
        return "0" + n;
      } else {
        return "" + n;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  font-size: 40px;
  > .buttons {
    padding-top: 10px;
  }
}
</style>