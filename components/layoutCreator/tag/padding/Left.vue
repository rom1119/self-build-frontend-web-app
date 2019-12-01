<template>

    <div class="stretch stretch__flex cursor-resize-to-left" >
        <border-html-context-menu :value="value"  :ref="value.uuid" />
        <div class="stretch" 
        :style="value.cssList"
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
import Left from '~/src/Site/Left';
import HtmlTag from "~/src/Layout/HtmlTag";
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import PaddingComponent from './Padding.vue';
import XPositionDetector from "~/src/PositionDetector/XPositionDetector";


@Component
export default class PaddingLeftComponent extends PaddingComponent {

    contextMenuName = 'cm-create-html-element123'

    mouseDetector: XPositionDetector = new XPositionDetector()

    getMouseDetector() {
        return this.mouseDetector
    }

    getMouseAxisPosition(e)
    {
        return e.clientX
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

<style scoped lang="scss">
    .stretch {
        align-content: stretch;
        &.stretch__flex {
            display: flex;
        }
    }
</style>
