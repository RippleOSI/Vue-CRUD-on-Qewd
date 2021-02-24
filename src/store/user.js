const user = {
  namespaced: true,
  state: () => ({
    user_obj: {}
  }),
  mutations: {
    // eslint-disable-next-line no-return-assign
    setUser: (state, data) => state.user_obj = data
  },
  actions: {
    putUserObject ({ commit }, user) {
      commit('setUser', user)
      return true
    }
  },
  getters: { }
}

export default user
