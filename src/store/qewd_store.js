import { result } from 'lodash'

export default function buildQewdVuex (qewd, schema) {
  const qewdStore = {
    namespaced: true,
    state: () => ({
      summary: []
    }),

    getters: {
      summary: (state) => state.summary
    },

    mutations: {
      // eslint-disable-next-line no-return-assign
      setSummary: (state, data) => state.summary = data
    },
    actions: {
      async fetchData ({ commit }) {
        return new Promise((resolve, reject) => {
          this.$qewd.send({
            type: schema.summary.qewd.getSummary,
            params: {
              properties: schema.summary.data_properties
            }
          }, (reply) => {
            const resp = result(reply, 'message.response', null)
            if (!resp) {
              return reject(reply)
            }
            commit('setSummary', resp)
            return resolve(resp)
          })
        })
      },

      async fetchDetails ({ commit }, id) {
        return new Promise((resolve, reject) => {
          this.$qewd.send({
            type: schema.summary.qewd.getDetail,
            params: {
              id: id
            }
          }, (reply) => {
            const resp = result(reply, 'message.response', null)
            if (!resp) {
              return reject(reply)
            }
            commit('setSummary', resp)
            return resolve(resp)
          })
        })
      }
    }

  }
  return qewdStore
}
