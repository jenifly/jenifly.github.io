import Vue from 'vue'
import Vuex from 'vuex'
import './assets/base.scss'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: false,
    durl: ''
  },
  mutations: {
  },
  actions: {
    setNotes (context) {
      this._vm.doGet('https://api.github.com/repos/jenifly/jenifly.github.io/contents/notes', res => context.state.notes = res)
    }
  }
})
