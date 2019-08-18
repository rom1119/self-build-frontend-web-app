import {MutationTree, ActionTree, GetterTree} from 'vuex'
import Vue from 'vue'
import createUriFromObj from './functions'
import Token from "~/types/Token";
import TokenResponse from "~/types/response/TokenResponse";
import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import TokenResponseBuild from "~/src/ModelFromResponseBuilder/impl/TokenResponseBuild";
import _ from 'lodash'

let builder: ModelFromResponse<TokenResponse, Token> = new TokenResponseBuild()

interface TokenState {
  items: Token[]
    current: {}
}

const state = (): TokenState => {
  return {
      items: [],
      current: {}
  }
}

const actions: ActionTree<TokenState, TokenState> = {
  async create({ commit, state}, tokenResponse: TokenResponse) {
      // @ts-ignore
      let model = builder.build(tokenResponse)
        // console.log(model)
    let returnArray: Token[] = []

      commit('deleteAll')
      commit('insert', model)
    return _.cloneDeep(model)
  },


}

const mutations: MutationTree<TokenState> = {
    insert(state: TokenState, answer: Token) {
        // if (answer.hashCode && state.items[answer.hashCode]) {
        //     Object.assign(state.items[answer.hashCode], answer)
        // } else {
        //     // @ts-ignore
        // }
            Vue.set(state.items, state.items.length, answer)
    },
    delete(state: TokenState, userApplication: Token) {

        // Vue.delete(state.items, userApplication.hashCode)
    },
    deleteAll(state: TokenState) {
        Vue.set(state, 'items', [])
    }
}


const getters: GetterTree<TokenState, TokenState> = {
  all(state: TokenState) {
    return Object.values(state.items)
  },

  getOne(state: TokenState) {
      // console.log(state.items)
      if (state.items.length) {
          return state.items[0]

      }

      return null
  }
}

export {
  state,
  actions,
    mutations,
  getters
}
