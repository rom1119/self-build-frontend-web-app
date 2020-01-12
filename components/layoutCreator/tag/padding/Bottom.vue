<template>
    <div class="cursor-resize-to-bottom absolute padding-bottom" :style="value.cssList" >

        <div 
            @mousedown.stop="onMouseDown($event)"  
            @mouseover.stop="onMouseOver"
            @mouseout.stop="onMouseOut" 
            >
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";

import HtmlTag from "~/src/Layout/HtmlTag";
import BorderModel from '../../../../src/Layout/Border/BorderModel';
import PaddingComponent from './Padding.vue';

@Component
export default class PaddingBottomComponent extends PaddingComponent {

    contextMenuName = 'cm-create-html-element123'

    onMouseOver() {            
        super.onMouseOver(this)
    }

    onMouseOut() {
        super.onMouseOut(this)
    }
    
    onMouseDown(ev) {
        super.onMouseDown(this, ev)
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
