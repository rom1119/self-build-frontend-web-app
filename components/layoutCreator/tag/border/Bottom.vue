<template>
    <div  v-if="value != null" style="opacity: 0 !important;" class="cursor-resize-to-bottom absolute" 
        v-show="value.isActive()"
        @mousedown.stop="onMouseDown($event)"  
        @mouseover.stop="onMouseOver"
        @mouseout.stop="onMouseOut" 
        :style="value.cssList"
        :key="value.updateComponentKey"
        >
        <!-- <border-html-context-menu :value="value"  :ref="contextMenuName" /> -->

        <div  
            
            >
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";

import HtmlTag from "~/src/Layout/HtmlTag";
import BorderModel from '../../../../src/Layout/Border/BorderModel';
import BorderComponent from './Border.vue';

@Component
export default class BorderBottomComponent extends BorderComponent {

    contextMenuName = 'cm-border-bottom-component-'
    
    onMouseOver() {            
        super.onMouseOver(this)
    }

    onMouseOut() {
        super.onMouseOut(this)
    }
    
    onMouseDown(ev) {
        super.onMouseDown(this, ev)
    }
    onDoubleClick(e) 
    {
        this.value.onClick(e)
        let compStyles = window.getComputedStyle(e.target);
        var heightTable = compStyles.getPropertyValue('height')

        // console.log(heightTable);    

    }
    created() {
        this.contextMenuName = this.contextMenuName.concat(this.value.uuid)
        // console.log(this.value.styleList)
        
        
    }


}
</script>

<style lang="scss">
    .border-bottom {
            
    }
</style>
