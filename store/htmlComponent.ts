import { MutationTree, ActionTree, GetterTree } from "vuex";
import Vue from 'vue';

interface VueComponentState {
    first: Object,
    second: Object,
    third: Object
}


export const resultElements = (): VueComponentState => ({
    first: {},
    second: {},
    third: {}
})

export const actions: ActionTree<VueComponentState, VueComponentState> = {
    setComparisonComponent({ commit, state }, componentEl: {}) {
        commit('insertFirst', componentEl);
    },


}


export const mutations: MutationTree<VueComponentState> = {
    insertFirst(state: VueComponentState, obj: Object) {
        Vue.set(state, 'first', obj)
    },

  }

// export const actions: ActionTree<TestState, TestState> = {
//     async fetchStages({ commit }) {
//         const stages: TestStage[] = await this.$axios.$get("questions")
//         commit("setStages", stages)
//     }
// }

export const getters: GetterTree<VueComponentState, VueComponentState> = {

    comparisonComponent(state: VueComponentState) {
        return state.first
    },

}

