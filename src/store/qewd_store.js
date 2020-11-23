import { result, filter } from 'lodash'

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

      async deleteEntity ({ commit, state }, { id }) {
        return new Promise(resolve => {
          qewd.send({
            type: schema.summary.qewd.delete,
            params: {
              id: id
            }
          }, (reply) => {
            console.log(reply)
            const deleted = filter(state.summary, o => o.id !== id)
            resolve(deleted)
            commit('setSummary', deleted)
            return deleted
          })
        })
      },

      async fetchData ({ commit }) {
        return new Promise((resolve, reject) => {
          qewd.send({
            type: schema.summary.qewd.getSummary,
            params: {
              properties: schema.summary.data_properties
            }
          }, (reply) => {
            const resp = result(reply, 'message.summary', null)
            if (!resp) {
              return reject(reply)
            }
            commit('setSummary', resp)
            resolve(resp)
            return resp
          })
        })
      },

      async fetchDetails ({ commit }, id) {
        return new Promise((resolve, reject) => {
          qewd.send({
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
