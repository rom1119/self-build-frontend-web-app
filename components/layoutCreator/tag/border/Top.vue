<template>

    <div >
        <border-html-context-menu :value="value"  :ref="value.uuid" />
        <div :style="value.cssList" v-context-menu="value.uuid"  @click="value.onClick(value)" @mouseover="value.onMouseOver(value)" @mouseout="value.onMouseOut(value)">
        </div>
    </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import Top from '~/src/Site/Top';
import HtmlTag from "~/src/Layout/HtmlTag";
import BorderModel from '../../../../src/Layout/Border/BorderModel';
import BorderComponent from './Border.vue';

@Component
export default class BorderTopComponent extends BorderComponent {

    contextMenuName = 'cm-create-html-element123'

    createH1Element(target, cm, a) {
        console.log(
        )

        // var el = this.htmlFactory.createH1()
        // console.log('qqqqq')

        // this.children.push(el)

    }

    createPElement(target, cm, a) {
        console.log(
        )
        // console.log(this.$children);
        // console.log(cm);
        // other actions...
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
    .border-top {
        
    }
#loadingDialog {
    .v-dialog {
    width: auto;
    }
}
</style>
