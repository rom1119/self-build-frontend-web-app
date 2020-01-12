<template>

    <div class="stretch stretch__flex cursor-resize-to-left" :style="value.cssList" >
        <border-html-context-menu :value="value"  :ref="value.uuid" />
        <div class="stretch" 
            v-context-menu="value.uuid"
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
import Left from '~/src/Site/Left';
import HtmlTag from "~/src/Layout/HtmlTag";
import BorderLeft from '~/src/Layout/Border/BorderLeft';
import BorderComponent from './Border.vue';


@Component
export default class BorderLeftComponent extends BorderComponent {

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

<style scoped lang="scss">
    .stretch {
        align-content: stretch;
        &.stretch__flex {
            display: flex;
        }
    }
</style>
