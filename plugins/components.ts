import Vue from 'vue'
import '@/components/tables/index'
import '@/components/forms/index'
import '@/components/selects/index'
import '@/components/context-menu/index'
import '@/components/layoutCreator/index'
import '@/components/modal/index'
import vSelect from 'vue-select'
// import 'vue-select/dist/vue-select.css';

// import MainComponent from '~/components/comparison-component/index.vue'
import Pagination from '@/components/Pagination.vue'
import BaseModal from '@/components/BaseModal.vue'
import PseudoSelectorComponent from '@/components/PseudoSelectorComponent.vue'
import LayoutCreatorModeComponent from '@/components/LayoutCreatorModeComponent.vue'
import MediaQueryComponent from '@/components/MediaQueryComponent.vue'
import vuetifySelect2 from '@/components/vuetify-select2.vue'

Vue.component('vuetify-select2', vuetifySelect2)
Vue.component('base-modal', BaseModal)
Vue.component('pseudo-selector-component', PseudoSelectorComponent)
Vue.component('layout-creator-mode-component', LayoutCreatorModeComponent)
Vue.component('media-query-component', MediaQueryComponent)
Vue.component('pagination-component', Pagination)
// Vue.component('comparison-component', MainComponent)
// Vue.component('comparison-component', MainComponent)


Vue.component('v-select', vSelect)
