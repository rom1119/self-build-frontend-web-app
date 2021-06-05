import Vue from 'vue'

import LayoutCreatorContainer from './LayoutCreatorContainer.vue'
import HTMLWrapper from './tag/HTMLWrapper.vue'
import BaseHTMLWrapper from './tag/BaseHTMLWrapper.vue'
import HTMLTableWrapper from './tag/HTMLTableWrapper.vue'
import HTMLTableCellWrapper from './tag/HTMLTableCellWrapper.vue'
import HTMLEL from './tag/HTMLEL.vue'
import HTMLTextNode from './tag/HTMLTextNode.vue'
import HTMLELEditable from './tag/HTMLELEditable.vue'

import RowspanContainerComponent from './tag/table/RowspanContainerComponent.vue'

import BorderMainComponent from './tag/border/Border.vue'
import BorderRight from './tag/border/Right.vue'
import BorderLeft from './tag/border/Left.vue'
import BorderTop from './tag/border/Top.vue'
import BorderBottom from './tag/border/Bottom.vue'

import PaddingMainComponent from './tag/padding/Padding.vue'
import PaddingRight from './tag/padding/Right.vue'
import PaddingLeft from './tag/padding/Left.vue'
import PaddingTop from './tag/padding/Top.vue'
import PaddingBottom from './tag/padding/Bottom.vue'


import MarginRight from './tag/margin/Right.vue'
import MarginLeft from './tag/margin/Left.vue'
import MarginTop from './tag/margin/Top.vue'
import MarginBottom from './tag/margin/Bottom.vue'



Vue.component('layout-creator-container', LayoutCreatorContainer)
Vue.component('html-component', HTMLWrapper)
Vue.component('base-html-component', BaseHTMLWrapper)
Vue.component('html-table-component', HTMLTableWrapper)
Vue.component('html-table-cell-component', HTMLTableCellWrapper)
Vue.component('html-el', HTMLEL)
Vue.component('html-text-node', HTMLTextNode)
Vue.component('html-el-editable', HTMLELEditable)
Vue.component('rowspan-container-component', RowspanContainerComponent)

// Vue.component('table-column-component', TableColumnComponent)
// Vue.component('table-row-component', TableRowComponent)

// Borders
// Vue.component('border-main-component', BorderMainComponent)
Vue.component('border-right', BorderRight)
Vue.component('border-left', BorderLeft)
Vue.component('border-top', BorderTop)
Vue.component('border-bottom', BorderBottom)

// Paddings
// Vue.component('padding-main-component', PaddingMainComponent)
Vue.component('padding-right', PaddingRight)
Vue.component('padding-left', PaddingLeft)
Vue.component('padding-top', PaddingTop)
Vue.component('padding-bottom', PaddingBottom)


// Margins
Vue.component('margin-right', MarginRight)
Vue.component('margin-left', MarginLeft)
Vue.component('margin-top', MarginTop)
Vue.component('margin-bottom', MarginBottom)
