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
import KeyFrameModel from '../types/KeyFrameModel';
import KeyFrameResponse from '../types/response/KeyFrameResponse';
import KeyFrameModelBuild from '../src/ModelFromResponseBuilder/impl/KeyFrameModelBuild';
import ProjectFrontendModelBuildResponse from '~/src/ModelFromResponseBuilder/impl/ProjectFrontendModelBuildResponse';
import ResponseFromModel from '../src/ModelFromResponseBuilder/ResponseFromModel';

let builder: ModelFromResponse<ProjectFrontendResponse, ProjectFrontendModel> = new ProjectFrontendModelBuild()
let builderResponse: ResponseFromModel<ProjectFrontendModel, ProjectFrontendResponse> = new ProjectFrontendModelBuildResponse()
let mediaQueryBuilder: ModelFromResponse<MediaQueryResponse, MediaQueryModel> = new MediaQueryModelBuild()
let fontFaceBuilder: ModelFromResponse<FontFaceResponse, FontFaceModel> = new FontFaceModelBuild()
let keyFrameBuilder: ModelFromResponse<KeyFrameResponse, KeyFrameModel> = new KeyFrameModelBuild()

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
        mediaQueryArray.push(model)
    }
    
    let fontFaceQueryArray: FontFaceModel[] = []

    for (let fontFace of response.fontFaceList) {
        let modelFontFace = fontFaceBuilder.build(fontFace)
        fontFaceQueryArray.push(modelFontFace)
    }

    let keyFrameQueryArray: KeyFrameModel[] = []

    for (let keyFrame of response.keyFrameList) {
        let modelkeyFrame = keyFrameBuilder.build(keyFrame)

        // console.log(model);
        keyFrameQueryArray.push(modelkeyFrame)
    }

      return { model: _.cloneDeep(model), mediaQueryList:  mediaQueryArray, fontFaceList: fontFaceQueryArray, keyFrameList: keyFrameQueryArray}
  },
  async findOneSimple({ commit, state }, id) {
    // @ts-ignore
    let response = await this.$axios.$get(`/api/html-project/short-data/${id}`)
    let model = builder.build(response)
    commit('insert', model)


      return { model: _.cloneDeep(model)}
  },
  async save({ commit, state}, token: ProjectFrontendModel) {
      // @ts-ignore
    let res = builderResponse.build(token)
    var response
    if (res.id) {
      response = await this.$axios.$put(`/api/html-project/${res.id}`, res)
      
    } else {
      response = await this.$axios.$post(`/api/html-project`, res)

    }

        // console.log(model)
    let returnArray: ProjectFrontendModel[] = []

      // commit('deleteAll')
      // commit('insert', model)
    return _.cloneDeep(response)
  },
  
  async delete({ commit, state }, token: ProjectFrontendModel) {
      // @ts-ignore
    // let res = builderResponse.build(token)
    var response
    response = await this.$axios.delete(`/api/html-project/${token.id}`)

        // console.log(model)
    let returnArray: ProjectFrontendModel[] = []

      // commit('deleteAll')
      // commit('insert', model)
    return _.cloneDeep(response)
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
