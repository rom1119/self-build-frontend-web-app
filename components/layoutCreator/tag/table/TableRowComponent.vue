<template>

    <div class="stretch tab-row border stretch__flex cursor-resize-to-bottom"
         @mousedown.stop="onMouseDown($event)"
         @mouseover.stop="onMouseOver"
         @mouseout.stop="onMouseOut"
         @click.stop="onMouseClick"
         :style="value.cssList"
         :key="value.updateComponentKey"
         oncopy="return false"
         oncut="return false"
         onselectstart="return false"
    >
        <div class="stretch"
        >
            Row {{ value.children.length }}
            </br>
            <span v-show="hasHeight">
                Height
                </br>
                {{ value.getHeightValue() }}
            </span>
        </div>
    </div>

</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import Left from '~/src/Site/Left';
import BorderModel from '../../../../src/Layout/Border/BorderModel';
import ActiveElController from "~/src/ActiveElController";
import { TableColumn } from "element-ui";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Height } from "~/src/Css";
import HeightProperty from "~/components/computedPropertyManagers/impl/ComputedProperty/Content/HeightProperty";
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
import TableRowEl from "~/src/Layout/tag/Table/elements/TableRowEl";
import HtmlTag from "~/src/Layout/HtmlTag";

@Component
export default class TableRowComponent extends Vue {

    $refs: {

    }
    @Prop({required:true})
    value: TableRowEl

    currentElement: BorderModel = null

    timeout = null
    mouseDown = false
    heightManager: BaseComputedPropertyManager<Height>

    // @Prop()
    index
    contextMenuName = 'cm-border'
    // abstract getSize() : number
    get hasHeight()
    {
        return  this.heightManager.getProperty().active
    }

    get updateComponentKey() {
        if (!this.value) {
            return 0
        }

        return this.value.updateComponentKey
    }

    onMouseClick() {
        console.log('CLICK')
        console.log(this.value)

    }

    onMouseOver() {
        this.$emit('contentMouseOver', this.value)

    }

    onMouseOut() {
        this.$emit('contentMouseOut', this.value)
    }

    public onMouseDown(ev: MouseEvent)
    {
        this.$emit('contentMouseDown', ev)
    }

    mounted()
    {
        this.value.setHtmlEl(this.$el)

        // this.value.updateModelComponent()
        // this.value.updateModelComponent()


        // console.log('COLUMN MOUNTED');

        if (this.value instanceof HtmlTag)  {
            this.value.realPositionCalculator.reInitDefaultPosition()

            // this.value.recalculateRealComputedProperties()

        }
        this.heightManager.init()

    }


    created() {
        this.heightManager = new HeightProperty()
        this.heightManager.setHtmlEl(this.value.tr)
        // this.contextMenuName = this.contextMenuName.concat(this.value.uuid)
        // console.log(this.value.styleList)
    }
}
</script>
<style>
    .tab-row {
        padding: 2px;
        z-index: 999;
        color: white;
        display: inline-block;
        font-size: 12px !important;
        background: rgba(0,7,121,0.49);
    }

    .border {
        border: 1px solid gray;
    }
</style>
