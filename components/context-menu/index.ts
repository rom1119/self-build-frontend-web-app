import Vue from 'vue'

import HtmlElementCm from './html-element-closing-tag-cm.vue'
import HtmlElementShortClosingTagContextMenu from './html-element-short-closing-tag-cm.vue'
import CreateHtmlElementCm from './create-html-element-cm.vue'
import BorderHtmlCm from './border-cm.vue'
import SelectUnitCm from './select-unit-cm.vue'
import SelectBoxSizingCm from './select-box-sizing-cm.vue'
import SelectTimingFunctionCm from './select-timing-function-cm.vue'
import SelectLinearGradientDirectionUnitContextMenu from './select-linear-gradient-direction-unit-cm.vue'

Vue.component('html-element-closing-tag-context-menu', HtmlElementCm)
Vue.component('html-element-short-closing-tag-context-menu', HtmlElementShortClosingTagContextMenu)
Vue.component('create-html-element-context-menu', CreateHtmlElementCm)
Vue.component('border-html-context-menu', BorderHtmlCm)
Vue.component('select-unit-context-menu', SelectUnitCm)
Vue.component('select-box-sizing-menu', SelectBoxSizingCm)
Vue.component('select-timing-function-menu', SelectTimingFunctionCm)
Vue.component('select-linear-gradient-direction-unit-menu', SelectLinearGradientDirectionUnitContextMenu)




