import Vue from 'vue'

import LayoutCreatorContainer from './LayoutCreatorContainer.vue'
import HTMLWrapper from './tag/HTMLWrapper.vue'
import HTMLEL from './tag/HTMLEL.vue'
import HTMLELEditable from './tag/HTMLELEditable.vue'

Vue.component('layout-creator-container', LayoutCreatorContainer)
Vue.component('html-component', HTMLWrapper)
Vue.component('html-el', HTMLEL)
Vue.component('html-el-editable', HTMLELEditable)