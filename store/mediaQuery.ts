import {MutationTree, ActionTree, GetterTree} from 'vuex'
import Vue from 'vue'
import createUriFromObj from './functions'
import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import _ from 'lodash'
// import MediaQueryModelBuild from '~/src/ModelFromResponseBuilder/impl/MediaQueryModelBuild';
// import MediaQueryResponse from '~/types/response/MediaQueryResponse';
import MediaQueryModel from '~/types/MediaQueryModel';
import MediaQueryResponse from '~/types/response/MediaQueryResponse';
import MediaQueryModelBuild from '~/src/ModelFromResponseBuilder/impl/MediaQueryModelBuild';

let builder: ModelFromResponse<MediaQueryResponse, MediaQueryModel> = new MediaQueryModelBuild()

interface MediaQueryState {
  items: MediaQueryModel[]
    current: {}
}

const state = (): MediaQueryState => {
  return {
      items: [],
      current: {}
  }
}

const actions: ActionTree<MediaQueryState, MediaQueryState> = {

  async findAllByProject({ commit, state}, {projectId = null}) {
    // @ts-ignore
    let response
    response = await this.$axios.$get(`/api/media-query/project/${projectId}}`)

    commit('deleteAll')

    let returnArray: MediaQueryModel[] = []
    for (let answer of response.items) {
      let model = builder.build(answer)

      // console.log(model);
      commit('insert', model)
      returnArray.push(model)
    }
    // console.log(returnArray);
    
    return { ...response, data: returnArray }
  }, 
  async findOne({ commit, state }, id) {
    // @ts-ignore
    let response = await this.$axios.$get(`/api/html-project/${id}`)
    let model = builder.build(response)
    commit('insert', model)

    return model
  },
  async create({ commit, state}, token: MediaQueryModel) {
      // @ts-ignore
      let model = builder.build(token)
        // console.log(model)
    let returnArray: MediaQueryModel[] = []

      commit('deleteAll')
      commit('insert', model)
    return _.cloneDeep(model)
  },

}

const mutations: MutationTree<MediaQueryState> = {
    insert(state: MediaQueryState, answer: MediaQueryModel) {
        // if (answer.id && state.items[answer.id]) {
        //     Object.assign(state.items[answer.id], answer)
        // } else {
        //     // @ts-ignore
        // }
            Vue.set(state.items, state.items.length, answer)
    },
    delete(state: MediaQueryState, userApplication: MediaQueryModel) {

        // Vue.delete(state.items, userApplication.hashCode)
    },
    deleteAll(state: MediaQueryState) {
        Vue.set(state, 'items', [])
    }
}


const getters: GetterTree<MediaQueryState, MediaQueryState> = {
  all(state: MediaQueryState) {
    return Object.values(state.items)
  },

  getOne(state: MediaQueryState) {
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
