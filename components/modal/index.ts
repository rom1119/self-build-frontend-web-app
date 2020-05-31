import Vue from 'vue'

import SiteBoxModelElement from './BoxModel/SiteBoxModelElement.vue'
import BorderSiteModelElement from './BoxModel/BorderSiteModelElement.vue'
import TextShadowValueComponent from './Shadow/TextShadowValueComponent.vue'
import BoxShadowValueComponent from './Shadow/BoxShadowValueComponent.vue'

Vue.component('site-box-model-element', SiteBoxModelElement)
Vue.component('border-site-model-element', BorderSiteModelElement)
Vue.component('text-shadow-value-component', TextShadowValueComponent)
Vue.component('box-shadow-value-component', BoxShadowValueComponent)
