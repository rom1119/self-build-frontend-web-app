<template>

    <div class="stretch stretch__flex">
        <border-html-context-menu :value="value"  :ref="value.uuid" />
        <div class="stretch" :style="value.cssList" v-context-menu="value.uuid"  @click="value.onClick(value)" @mouseover="value.onMouseOver(value)" @mouseout="value.onMouseOut(value)">
        </div>
    </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import HtmlTag from "~/src/Layout/HtmlTag";
import Right from '~/src/Site/Right';
import BorderRight from '../../../../src/Layout/Border/BorderRight';
import BorderComponent from './Border.vue';


@Component
export default class BorderRightComponent extends BorderComponent {

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


<style scoped lang="scss">
    .stretch {
        align-content: stretch;
        &.stretch__flex {
            display: flex;
        }
    }
</style>