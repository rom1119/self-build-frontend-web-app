<template>

    <div  class="cursor-resize-to-top">
        <border-html-context-menu :value="value"  :ref="value.uuid" />
        <div :style="value.cssList" 
        v-context-menu="value.uuid" 
            @mouseup="onMouseUp($event)" 
            @mousedown="onMouseDown($event)"  
            @mousemove="onMouseMove($event)" 
            @mouseover="onMouseOver"
            @mouseout="onMouseOut"
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
import YPositionDetector from "~/src/PositionDetector/YPositionDetector";

@Component
export default class BorderTopComponent extends PaddingComponent {

    contextMenuName = 'cm-create-html-element123'

    mouseDetector: YPositionDetector = new YPositionDetector()

    getMouseDetector() {
        return this.mouseDetector
    }

    getMouseAxisPosition(e)
    {
        return e.clientY
    }
    onMouseOver(borderComponent) {                
        super.onMouseOver(this)

    }

    onMouseOut(borderComponent) {
        super.onMouseOut(this)
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
