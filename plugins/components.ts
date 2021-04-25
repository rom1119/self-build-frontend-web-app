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
import AnimationToolSidebar from '@/components/AnimationToolSidebar.vue'
import LayoutTagToolSidebar from '@/components/LayoutTagToolSidebar.vue'
import MediaQueryComponent from '@/components/MediaQueryComponent.vue'
import vuetifySelect2 from '@/components/vuetify-select2.vue'

import AnimationManageComponent from '~/components/manageComponent/component/AnimationManageComponent.vue'
import BackgroundManageComponent from '~/components/manageComponent/component/BackgroundManageComponent.vue'
import BorderManageComponent from '~/components/manageComponent/component/BorderManageComponent.vue'
import BoxModelManageComponent from '~/components/manageComponent/component/BoxModelManageComponent.vue'
import DisplayManageComponent from '~/components/manageComponent/component/DisplayManageComponent.vue'
import GradientManageComponent from '~/components/manageComponent/component/GradientManageComponent.vue'
import HtmlAttrManageComponent from '~/components/manageComponent/component/HtmlAttrManageComponent.vue'
import ImgManageComponent from '~/components/manageComponent/component/ImgManageComponent.vue'
import ShadowManageComponent from '~/components/manageComponent/component/ShadowManageComponent.vue'
import SvgManageComponent from '~/components/manageComponent/component/SvgManageComponent.vue'
import TextManageComponent from '~/components/manageComponent/component/TextManageComponent.vue'

Vue.component('animation-manage-component', AnimationManageComponent)
Vue.component('background-manage-component', BackgroundManageComponent)
Vue.component('border-manage-component', BorderManageComponent)
Vue.component('box-model-manage-component', BoxModelManageComponent)
Vue.component('display-manage-component', DisplayManageComponent)
Vue.component('gradient-manage-component', GradientManageComponent)
Vue.component('html-attr-manage-component', HtmlAttrManageComponent)
Vue.component('img-manage-component', ImgManageComponent)
Vue.component('shadow-manage-component', ShadowManageComponent)
Vue.component('svg-manage-component', SvgManageComponent)
Vue.component('text-manage-component', TextManageComponent)

Vue.component('vuetify-select2', vuetifySelect2)
Vue.component('base-modal', BaseModal)
Vue.component('pseudo-selector-component', PseudoSelectorComponent)
Vue.component('layout-creator-mode-component', LayoutCreatorModeComponent)
Vue.component('media-query-component', MediaQueryComponent)
Vue.component('pagination-component', Pagination)
Vue.component('animation-tool-sidebar', AnimationToolSidebar)
Vue.component('layout-tag-tool-sidebar', LayoutTagToolSidebar)
// Vue.component('comparison-component', MainComponent)
// Vue.component('comparison-component', MainComponent)


Vue.component('v-select', vSelect)
