<template>
  <div class="container">
    <h1>我的计划列表</h1>
    <div class="xxx">
      <el-button
        id="start"
        @click="dialogFormVisible = true"
        type="primary"
        plain
        >添加计划</el-button
      >
      <el-button id="stop" @click="stop" type="danger" plain
        >清空计划</el-button
      >
      <el-dialog title="添加计划" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="计划内容" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="计划期限" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择计划期限">
              <el-option label="长期" value="changqi"></el-option>
              <el-option label="短期" value="duanqi"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="start">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="left-right">
      <ul>
        <li v-if="changqiList.length !== 0"><h1>长期计划列表</h1></li>
        <li v-for="item in changqiList" :key="item.id">
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
      <ul>
        <li v-if="duanqiList.length !== 0"><h1>短期计划列表</h1></li>
        <li v-for="item in duanqiList" :key="item.id">
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
  </div>
</template>

<script>
export default {
  name: "Notes",
  data() {
    return {
      todoList: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        name: "",
        region: "",
      },
    };
  },
  computed: {
    changqiList() {
      return this.todoList.filter((t) => t.type === "changqi");
    },
    duanqiList() {
      return this.todoList.filter((t) => t.type === "duanqi");
    },
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
      this.dialogFormVisible = false;
      this.$message({
        type: "success",
        message: "成功创建计划",
      });
      this.getTodo(this.form);
    },
    getTodo(form) {
      this.$store.commit("createTodo", { note: form.name, type: form.region });
      this.$store.commit("fetchTodo");
      this.todoList = this.$store.state.todoList;
    },
  },
};
</script>

<style lang="scss" scoped>
.left-right {
  display: flex;
  justify-content: space-between;
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
.elButton {
  transition: all 1.5s;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  > .xxx {
    padding: 30px 0;
    width: 250px;
    display: flex;
    justify-content: space-between;
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