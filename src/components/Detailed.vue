<template>
  <div class="container">
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.notes.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
      :default-sort="{ prop: 'createdAt', order: 'descending' }"
    >
      <el-table-column prop="createdAt" label="日期" sortable width="180">
      </el-table-column>
      <el-table-column prop="times" label="时长" sortable width="180">
      </el-table-column>
      <el-table-column prop="notes" label="学习成果" :formatter="formatter">
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="remove(scope.row.id)"
            type="danger"
            plain
          >
            删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入备注中关键字搜索"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="addButton">
      <el-button @click="addTime()" type="success" plain>
        添加未记录数据
      </el-button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "Detailed",
  data() {
    return {
      tableData: [],
      search: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.commit("fetchTimeList");
      this.tableData = this.$store.state.timeList;
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].createdAt = dayjs(this.tableData[i].createdAt).format(
          "YYYY年MM月DD日"
        );
      }
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].times = this.formatTime(this.tableData[i].times);
      }
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
    addTime() {
      this.$prompt("请输入未记录的时长(单位:s)", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "成功输入时长",
          });
          this.addNote(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    addNote(times) {
      this.$prompt("请输入备注", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "成功备注",
          });
          this.$store.commit("createTime", { timeSecond: +times, note: value });
          this.init();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    remove(id) {
      this.$store.commit("removeTime", id);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    },
    formatter(row, column) {
      return row.notes;
    },
  },
};
</script>

<style lang="scss" scoped>
.addButton {
  padding-top: 30px;
}
</style>