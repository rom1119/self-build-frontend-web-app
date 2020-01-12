<template>

    <div  class="cursor-resize-to-top absolute padding-top" :style="value.cssList" >
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
import Top from '~/src/Site/Top';
import HtmlTag from "~/src/Layout/HtmlTag";
import PaddingModel from '../../../../src/Layout/Padding/PaddingModel';
import PaddingComponent from './Padding.vue';

@Component
export default class BorderTopComponent extends PaddingComponent {

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
    .border-top {
        
    }
#loadingDialog {
    .v-dialog {
    width: auto;
    }
}
</style>
