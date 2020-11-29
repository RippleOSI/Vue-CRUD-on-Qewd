const patient = {
  namespaced: true,
  state: () => ({
    selected_patient: { id: 1 }
  }),

  getters: {
    activePatient: (state) => state.selected_patient
  },

  mutations: {
    // eslint-disable-next-line no-return-assign
    setPatient: (state, data) => state.selected_patient = data
  },

  actions: {
    selectPatient ({ commit }, user) {
      commit('setPatient', user)
      return true
    }
  }

}

export default patient
