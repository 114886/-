import Vue from 'vue'
import Vuex from 'vuex'
import createId from './createId';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    timeList: [],
    todoList: [],
  },
  mutations: {
    UpdateTodo(state, id) {
      let index = -1;
      for (let i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.todoList[index].completed = !state.todoList[index].completed
        store.commit('saveTodo')
      } else {
        alert('操作失败,请联系qq:1148864234,备注:计划网页失效')
      }
    },
    removeTodo(state, id) {
      let index = -1;
      for (let i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.todoList.splice(index, 1);
        store.commit('saveTodo')
      } else {
        alert('操作失败,请联系qq:1148864234,备注:计划网页失效')
      }
    },
    fetchTodo(state) {
      state.todoList = JSON.parse(window.localStorage.getItem('todoList') || '[]');
    },
    deleteTodo(state) {
      state.todoList = []
      store.commit('saveTodo')
    },
    createTodo(state, note) {
      store.commit('fetchTodo')
      const todoItem = {}
      if (note === null) {
        note = '未详细说明'
      }
      const id = createId().toString();
      todoItem.id = id
      todoItem.notes = note
      todoItem.completed = false
      state.todoList.push(todoItem)
      store.commit('saveTodo')
    },
    saveTodo(state) {
      window.localStorage.setItem('todoList', JSON.stringify(state.todoList));
    },
    fetchTimeList(state) {
      state.timeList = JSON.parse(window.localStorage.getItem('timeList') || '[]');
    },
    createTime(state, { timeSecond, note }) {
      store.commit('fetchTimeList')
      const timeItem = {}
      const id = createId().toString();
      timeItem.id = id
      timeItem.createdAt = new Date()
      timeItem.times = timeSecond
      if (note === null) {
        note = '无备注'
      }
      timeItem.notes = note
      state.timeList.push(timeItem)
      store.commit('saveTime')
    },
    removeTime(state, id) {
      let index = -1;
      for (let i = 0; i < state.timeList.length; i++) {
        if (state.timeList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.timeList.splice(index, 1);
        store.commit('saveTime')
      } else {
        alert('操作失败,请联系qq:1148864234,备注:时长网页失效')
      }
    },
    saveTime(state) {
      window.localStorage.setItem('timeList', JSON.stringify(state.timeList));
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store;
