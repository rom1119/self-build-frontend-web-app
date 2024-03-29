import Vue from 'vue'

import FontFamilyValueComponent from './Font/FontFamilyValueComponent.vue'
import SiteBoxModelElement from './BoxModel/SiteBoxModelElement.vue'
import BorderSiteModelElement from './BoxModel/BorderSiteModelElement.vue'
import TextShadowValueComponent from './Shadow/TextShadowValueComponent.vue'
import BoxShadowValueComponent from './Shadow/BoxShadowValueComponent.vue'
import TransitionValueComponent from './Animation/TransitionValueComponent.vue'
import AnimationValueComponent from './Animation/AnimationValueComponent.vue'
import CubicBezierComponent from './Animation/CubicBezierComponent.vue'
import GradientValueComponent from './Gradient/GradientValueComponent.vue'
import LinearGradientDirectionComponent from './Gradient/LinearGradientDirectionComponent.vue'
import RadialGradientDirectionComponent from './Gradient/RadialGradientDirectionComponent.vue'
import StructureProjectItemComponent from './StructureProject/StructureProjectItemComponent.vue'
import DefaultAttrComponent from './HtmlAttr/DefaultAttrComponent.vue'
import MediaQueryValueComponent from './MediaQueryValueComponent.vue'

Vue.component('font-family-value-component', FontFamilyValueComponent)
Vue.component('site-box-model-element', SiteBoxModelElement)
Vue.component('border-site-model-element', BorderSiteModelElement)
Vue.component('text-shadow-value-component', TextShadowValueComponent)
Vue.component('box-shadow-value-component', BoxShadowValueComponent)
Vue.component('transition-value-component', TransitionValueComponent)
Vue.component('animation-value-component', AnimationValueComponent)
Vue.component('cubic-bezier-component', CubicBezierComponent)
Vue.component('gradient-value-component', GradientValueComponent)
Vue.component('linear-gradient-direction-component', LinearGradientDirectionComponent)
Vue.component('radial-gradient-direction-component', RadialGradientDirectionComponent)
Vue.component('media-query-value-component', MediaQueryValueComponent)
Vue.component('default-html-attr-component', DefaultAttrComponent)
Vue.component('structure-project-item-component', StructureProjectItemComponent)
