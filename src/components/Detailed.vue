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
    this.$store.commit("fetchTimeList");
    this.tableData = this.$store.state.timeList;
    for (let i = 0; i < this.tableData.length; i++) {
      this.tableData[i].createdAt = dayjs(this.tableData[i].createdAt).format(
        "YYYY年MM月DD日"
      );
    }
  },
  methods: {
    formatter(row, column) {
      return row.notes;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>