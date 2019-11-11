<template>
    <div  v-if="value != null">
        <border-html-context-menu :value="value"  :ref="value.uuid" />

        <div :style="value.cssList" v-context-menu="value.uuid"  @click="value.onClick(value)" @mouseover="value.onMouseOver(value)" @mouseout="value.onMouseOut(value)">
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

    contextMenuName = 'cm-create-html-element123'
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
