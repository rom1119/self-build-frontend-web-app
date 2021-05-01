import {MutationTree, ActionTree, GetterTree} from 'vuex'
import Vue from 'vue'
import createUriFromObj from './functions'
import ProjectFrontendModel from "~/types/ProjectFrontendModel";
import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import _ from 'lodash'
import ProjectFrontendModelBuild from '~/src/ModelFromResponseBuilder/impl/ProjectFrontendModelBuild';
import ProjectFrontendResponse from '~/types/response/ProjectFrontendResponse';
import KeyFrameModel from '~/types/KeyFrameModel';
import KeyFrameResponse from '~/types/response/KeyFrameResponse';
import KeyFrameModelBuild from '~/src/ModelFromResponseBuilder/impl/KeyFrameModelBuild';

let builder: ModelFromResponse<KeyFrameResponse, KeyFrameModel> = new KeyFrameModelBuild()

interface KeyFrameState {
  items: ProjectFrontendModel[]
    current: {}
}

const state = (): KeyFrameState => {
  return {
      items: [],
      current: {}
  }
}

const actions: ActionTree<KeyFrameState, KeyFrameState> = {

  async findAllByProject({ commit, state}, {projectId = null}) {
    // @ts-ignore
    let response
    response = await this.$axios.$get(`/api/key-frame/project/${projectId}}`)

    commit('deleteAll')

    let returnArray: KeyFrameModel[] = []
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
  async create({ commit, state}, token: ProjectFrontendModel) {
      // @ts-ignore
      let model = builder.build(token)
        // console.log(model)
    let returnArray: ProjectFrontendModel[] = []

      commit('deleteAll')
      commit('insert', model)
    return _.cloneDeep(model)
  },

}

const mutations: MutationTree<KeyFrameState> = {
    insert(state: KeyFrameState, answer: ProjectFrontendModel) {
        // if (answer.id && state.items[answer.id]) {
        //     Object.assign(state.items[answer.id], answer)
        // } else {
        //     // @ts-ignore
        // }
            Vue.set(state.items, state.items.length, answer)
    },
    delete(state: KeyFrameState, userApplication: ProjectFrontendModel) {

        // Vue.delete(state.items, userApplication.hashCode)
    },
    deleteAll(state: KeyFrameState) {
        Vue.set(state, 'items', [])
    }
}


const getters: GetterTree<KeyFrameState, KeyFrameState> = {
  all(state: KeyFrameState) {
    return Object.values(state.items)
  },

  getOne(state: KeyFrameState) {
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
