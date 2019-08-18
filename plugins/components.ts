import Vue from 'vue'
import '@/components/tables/index'
import '@/components/forms/index'
import '@/components/selects/index'
import vSelect from 'vue-select'
// import 'vue-select/dist/vue-select.css';

// import MainComponent from '~/components/comparison-component/index.vue'
import Pagination from '@/components/Pagination.vue'
import AddPublicationComponent from '@/pages/add-publication.vue'
import vuetifySelect2 from '@/components/vuetify-select2.vue'

Vue.component('vuetify-select2', vuetifySelect2)
Vue.component('pagination-component', Pagination)
// Vue.component('comparison-component', MainComponent)
// Vue.component('comparison-component', MainComponent)


Vue.component('v-select', vSelect)
