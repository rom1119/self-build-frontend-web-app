import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
        sessionId: null
    }),
    mutations: {
      setSessionId (state, sessionID) {
        state.sessionId = sessionID
      }
    },
    getters: {
        session(state) {
            return state.sessionId
    }
    }
  })
}

export const strict = false


export default createStore