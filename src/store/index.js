import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import patient from './patient'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: user,
    patient: patient
  }
})
