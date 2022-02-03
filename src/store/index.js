import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    timeList: [],
  },
  mutations: {
    fetchTimeList(state) {
      state.timeList = JSON.parse(window.localStorage.getItem('timeList') || '[]');
    },
    createTime(state, { timeSecond, note }) {
      store.commit('fetchTimeList')
      const timeItem = {}
      timeItem.createdAt = new Date()
      timeItem.times = timeSecond
      if (note === null) {
        note = '无备注'
      }
      timeItem.notes = note
      state.timeList.push(timeItem)
      store.commit('saveTime')
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
