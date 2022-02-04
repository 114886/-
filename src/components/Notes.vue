<template>
  <div class="container">
    <h1>我的计划列表</h1>
    <div>
      <el-button id="start" @click="start" type="primary" plain
        >添加计划</el-button
      >
      <el-button id="stop" @click="stop" type="danger" plain
        >清空计划</el-button
      >
    </div>
    <ul>
      <li v-for="item in todoList" :key="item.id">
        <span :class="{ liActive: item.completed }">{{ item.notes }}</span>
        <el-button
          type="success"
          icon="el-icon-check"
          class="elButton"
          circle
          v-if="item.completed === true"
          @click="show(item)"
        ></el-button>
        <el-button
          type="warning"
          class="elButton"
          icon="el-icon-close"
          circle
          v-if="item.completed === false"
          @click="show(item)"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          circle
          @click="removeTodo(item)"
        ></el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Notes",
  data() {
    return {
      todoList: [],
    };
  },
  mounted() {
    this.$store.commit("fetchTodo");
    this.todoList = this.$store.state.todoList;
  },
  methods: {
    show(item) {
      this.$store.commit("UpdateTodo", item.id);
    },
    removeTodo(item) {
      this.$store.commit("removeTodo", item.id);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    },
    stop() {
      this.$confirm("此操作将清空所有计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "清空成功!",
          });
          this.$store.commit("deleteTodo");
          this.todoList = [];
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    start() {
      this.$prompt("请输入计划", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "成功创建计划",
          });
          this.getTodo(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    getTodo(note) {
      this.$store.commit("createTodo", note);
      this.$store.commit("fetchTodo");
      this.todoList = this.$store.state.todoList;
    },
  },
};
</script>

<style lang="scss" scoped>
.elButton {
  transition: all 1.5s;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    padding: 30px 0;
    width: 250px;
    display: flex;
    justify-content: space-between;
  }
  > ul {
    display: flex;
    flex-direction: column;
    > li {
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 5px 30px;
      > span {
        width: 100%;
        padding-right: 30px;
      }
    }
  }
}
h1 {
  color: rgb(66, 185, 131);
}
.liActive {
  text-decoration: line-through;
  color: rgb(165, 165, 165);
}
</style>