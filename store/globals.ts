import {MutationTree, ActionTree, GetterTree} from 'vuex'
import Vue from 'vue'
import createUriFromObj from './functions'
import ProjectFrontendModel from "~/types/ProjectFrontendModel";
import ModelFromResponse from "~/src/ModelFromResponseBuilder/ModelFromResponse";
import _ from 'lodash'
import ProjectFrontendModelBuild from '~/src/ModelFromResponseBuilder/impl/ProjectFrontendModelBuild';
import ProjectFrontendResponse from '~/types/response/ProjectFrontendResponse';


interface GlobalsState {
  sessionId: string
}

const state = (): GlobalsState => {
  return {
      sessionId: null
  }
}

const actions: ActionTree<GlobalsState, GlobalsState> = {

  async findAll({ commit, state}, sessionID) {

      commit('setSessionId', sessionID)
    // console.log(returnArray);
    
    return sessionID
  }


}

const mutations: MutationTree<GlobalsState> = {
  setSessionId(state: GlobalsState, sessionID: string) {
    state.sessionId = sessionID
    },

}


const getters: GetterTree<GlobalsState, GlobalsState> = {
  sessionId(state: GlobalsState) {
    return state.sessionId
  },

}

export {
  state,
  actions,
    mutations,
  getters
}
