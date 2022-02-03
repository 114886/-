<template>
  <div class="container">
    <div class="left">
      <div class="one">
        <span>累计学习时长</span>
        <span>{{ allTimes }}</span>
      </div>
      <div class="two">
        <span>本月学习时长</span>
        <span>{{ monthTimes }}</span>
      </div>
      <div class="three">
        <span>本周学习时长</span>
        <span>{{ weekTimes }}</span>
      </div>
    </div>
    <div class="right">
      <div class="up">
        <p>{{ NewDay }}</p>
        <p>距离考研还有</p>
        <span>xxx天</span>
      </div>
      <div class="down">每日一句</div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "First",
  data() {
    return {
      allTimes: "",
      monthTimes: "",
      weekTimes: "",
      monthTimeList: [],
      weekTimeList: [],
    };
  },
  computed: {
    NewDay() {
      return dayjs(new Date()).format("今天是YYYY年MM月DD日");
    },
  },
  mounted() {
    this.$store.commit("fetchTimeList");
    this.getAllTimes();
    this.getMonthTimes();
    this.getWeekTimes();
  },
  methods: {
    getAllTimes() {
      let AllT = 0;
      for (let i = 0; i < this.$store.state.timeList.length; i++) {
        AllT += this.$store.state.timeList[i].times;
      }
      this.allTimes = this.formatTime(AllT);
    },

    getMonthTimes() {
      for (let i = 0; i < this.$store.state.timeList.length; i++) {
        const current = this.$store.state.timeList[i];
        if (dayjs(new Date()).isSame(dayjs(current.createdAt), "month")) {
          this.monthTimeList.push(current);
        }
      }
      let AllT = 0;
      for (let i = 0; i < this.monthTimeList.length; i++) {
        AllT += this.monthTimeList[i].times;
      }
      this.monthTimes = this.formatTime(AllT);
    },

    getWeekTimes() {
      for (let i = 0; i < this.$store.state.timeList.length; i++) {
        const current = this.$store.state.timeList[i];
        if (dayjs(new Date()).isSame(dayjs(current.createdAt), "week")) {
          this.weekTimeList.push(current);
        }
      }
      let AllT = 0;
      for (let i = 0; i < this.weekTimeList.length; i++) {
        AllT += this.weekTimeList[i].times;
      }
      this.weekTimes = this.formatTime(AllT);
    },

    formatTime(seconds) {
      let hour =
        Math.floor(seconds / 3600) >= 10
          ? Math.floor(seconds / 3600)
          : "0" + Math.floor(seconds / 3600);
      seconds -= 3600 * hour;
      let min =
        Math.floor(seconds / 60) >= 10
          ? Math.floor(seconds / 60)
          : "0" + Math.floor(seconds / 60);
      seconds -= 60 * min;
      let sec = seconds >= 10 ? seconds : "0" + seconds;
      return hour + ":" + min + ":" + sec;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
  height: 90vh;
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  > div {
    display: flex;
    flex-direction: column;
    font-size: 30px;
    > span {
      padding: 10px 0;
    }
  }
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  > div {
    font-size: 30px;
  }
}
.up {
  > p {
    padding: 10px 0;
  }
  > :last-child {
    font-size: 40px;
  }
}
</style>