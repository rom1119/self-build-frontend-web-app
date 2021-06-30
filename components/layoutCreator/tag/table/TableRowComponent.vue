<template>
    <div :class="{'visible': canVisible, 'unvisible' : !canVisible}">
        <div :id="idHiddenEl" class="hidden-box">

        </div>

        <div class="stretch tab-row border stretch__flex cursor-resize-to-bottom"
            @mousedown.stop="onMouseDown($event)"
            @mouseover.stop="onMouseOver"
            @mouseout.stop="onMouseOut"
            @click.stop="onMouseClick"
            :style="value.cssList"

            oncopy="return false"
            oncut="return false"
            onselectstart="return false"
        >
        <div class="rel">

        </div>
            <div class="stretch rel" style="height: 100%;" :class="{'red-bg': value.isOverflowContent}"
            >
                <div class="remove" @click.stop="onEmitRemove($event)">
                    X
                </div>
                
                <span v-show="hasHeight">
                    Height
                    </br>
                    {{ value.getHeightValue() }}
                </span>
            </div>
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

    @Prop({required:true})
    canVisible: boolean

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

    get idHiddenEl() {
        return this.value.IDHiddenEl
    }
    // a

    get updateComponentKey() {
        if (!this.value) {
            return 0
        }

        return this.value.updateComponentKey
    }

    onEmitRemove(event)
    {
        this.$emit('tagRemove', event)
    }

    onMouseClick(e) {
        let ev = {
            event: e,
            target: this.value
        }
        this.$emit('contentMouseClick', ev)
        this.$emit('anyElementMouseClick', ev)

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
        this.value.setHtmlElOutsiteHidden(document.getElementById(this.idHiddenEl))
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
<style scoped>
    .tab-row {
        padding: 2px;
        z-index: 999;
        color: white;
        display: inline-block;
        font-size: 12px !important;
        background: rgba(0,7,121,0.29);
    }
    .red-bg {
        background-color: red !important;
    }

    .visible {
        opacity: 1 !important;
    }
    .unvisible {
        opacity: 0 !important;
    }

    .hidden-box {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        visibility: hidden;
    }

    .border {
        border: 1px solid gray;
    }

    .remove {
        cursor: pointer;
        position: absolute;
        top: unset;
        bottom: 0;
        right: -5px;
        padding: 2px;
        border-radius: 100%;
        background-color: aqua;
        z-index: 99999999;
        border: 1px solid #998866;
        text-shadow: none;
        color: black;
        font-size: 0.8em;

    }
    .remove:hover {
        background-color: rgb(67, 184, 184);
    }
</style>
