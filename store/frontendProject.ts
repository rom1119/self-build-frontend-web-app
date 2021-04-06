import {MutationTree, ActionTree, GetterTree} from 'vuex'
import Vue from 'vue'
import createUriFromObj from './functions'
import ProjectFrontendModel from "~/types/ProjectFrontendModel";
import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import _ from 'lodash'
import ProjectFrontendModelBuild from '~/src/ModelFromResponseBuilder/impl/ProjectFrontendModelBuild';
import ProjectFrontendResponse from '~/types/response/ProjectFrontendResponse';
import MediaQueryModel from "~/types/MediaQueryModel";
import MediaQueryResponse from "~/types/response/MediaQueryResponse";
import MediaQueryModelBuild from "~/src/ModelFromResponseBuilder/impl/MediaQueryModelBuild";
import FontFaceModel from '../types/FontFaceModel';
import FontFaceResponse from '../types/response/FontFaceResponse';
import FontFaceModelBuild from '../src/ModelFromResponseBuilder/impl/FontFaceModelBuild';

let builder: ModelFromResponse<ProjectFrontendResponse, ProjectFrontendModel> = new ProjectFrontendModelBuild()
let mediaQueryBuilder: ModelFromResponse<MediaQueryResponse, MediaQueryModel> = new MediaQueryModelBuild()
let fontFaceBuilder: ModelFromResponse<FontFaceResponse, FontFaceModel> = new FontFaceModelBuild()

interface FrontendProjectState {
  items: ProjectFrontendModel[]
    current: {}
}

const state = (): FrontendProjectState => {
  return {
      items: [],
      current: {}
  }
}

const actions: ActionTree<FrontendProjectState, FrontendProjectState> = {

  async findAll({ commit, state}, {paginator = {page: 1, items_per_page: 5}, order = {}, filter = {}, search = ''}) {
    // @ts-ignore
    let response
    if (search === '') {
        response = await this.$axios.$get(`/api/html-project${createUriFromObj({ ...paginator, ...order, ...filter })}`)
    } else {
        response = await this.$axios.$get(`/api/html-project${createUriFromObj({ ...paginator, ...order, ...filter, search })}`)

    }
    commit('deleteAll')

    let returnArray: ProjectFrontendModel[] = []
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
    let mediaQueryArray: MediaQueryModel[] = []

    for (let answer of response.mediaQueryList) {
        let model = mediaQueryBuilder.build(answer)

        // console.log(model);
        mediaQueryArray.push(model)
    }
    
    let fontFaceQueryArray: FontFaceModel[] = []

      for (let fontFace of response.fontFaceList) {
          let modelFontFace = fontFaceBuilder.build(fontFace)

          // console.log(model);
          fontFaceQueryArray.push(modelFontFace)
      }

      return { model: model, mediaQueryList:  mediaQueryArray, fontFaceList: fontFaceQueryArray}
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

const mutations: MutationTree<FrontendProjectState> = {
    insert(state: FrontendProjectState, answer: ProjectFrontendModel) {
        // if (answer.id && state.items[answer.id]) {
        //     Object.assign(state.items[answer.id], answer)
        // } else {
        //     // @ts-ignore
        // }
            Vue.set(state.items, state.items.length, answer)
    },
    delete(state: FrontendProjectState, userApplication: ProjectFrontendModel) {

        // Vue.delete(state.items, userApplication.hashCode)
    },
    deleteAll(state: FrontendProjectState) {
        Vue.set(state, 'items', [])
    }
}


const getters: GetterTree<FrontendProjectState, FrontendProjectState> = {
  all(state: FrontendProjectState) {
    return Object.values(state.items)
  },

  getOne(state: FrontendProjectState) {
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
