<template>

    <div :class="{'visible': canVisible, 'unvisible' : !canVisible}">
        <div :id="idHiddenEl" class="hidden-box">

        </div>

        <div class="stretch tab-column border stretch__flex cursor-resize-to-left"
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
            <div class="stretch rel"  :class="{'red-bg': value.isOverflowContent}"
            >
                <div class="remove" @click.stop="onEmitRemove($event)">
                    X
                </div>
                </br>
                <!-- 
                <span>col {{ value.index }} / ({{ value.allChildren.length }})</span>
                <span style="display: none;">hide - ({{ value.hiddenChildren.length }})</span>
                
                -->
                <span v-show="hasWidth">
                    Width {{ value.getWidthValue() }}
                    <br>
                    
                </span>
            </div>
        </div>
    </div>

</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { TableColumn } from "element-ui";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import Width from "~/src/Css/Size/Width";
import WidthProperty from "~/components/computedPropertyManagers/impl/ComputedProperty/Content/WidthProperty";
import TableColumnEl from "~/src/Layout/tag/Table/elements/TableColumnEl";
import HtmlTag from "~/src/Layout/HtmlTag";

@Component
export default class TableColumnComponent extends Vue {

    $refs: {

    }
    @Prop({required:true})
    value: TableColumnEl
    
    @Prop({required:false, default: true})
    canVisible: boolean

    // currentElement: BorderModel = null

    timeout = null
    mouseDown = false

    widthManager: BaseComputedPropertyManager<Width>

    contextMenuName = 'cm-border'

    get idHiddenEl() {
        return this.value.IDHiddenEl
    }
    // abstract getSize() : number
    onEmitRemove(event)
    {
        this.$emit('tagRemove', event)
    }

    get updateComponentKey() {
        if (!this.value) {
            return 0
        }

        return this.value.updateComponentKey
    }

    get hasWidth() {
        return  this.widthManager.getProperty().active
    }

    onMouseClick(e) {
        // console.log('CLICK')
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
        this.value.setHtmlEl(this.$el)
        this.value.setHtmlElOutsiteHidden(document.getElementById(this.idHiddenEl))

        if (this.value instanceof HtmlTag)  {
            this.value.realPositionCalculator.reInitDefaultPosition()

            // this.value.recalculateRealComputedProperties()

        }
        this.widthManager.init()

    }


    created() {
        this.widthManager = new WidthProperty()
        this.widthManager.setHtmlEl(this.value)
    }
}
</script>

<style scoped>
    .visible {
        opacity: 1 !important;
    }
    .unvisible {
        opacity: 0 !important;
    }
    .red-bg {
        background-color: red !important;
    }
    
    .tab-column {
        z-index: 999;
        color: white;
        display: inline-block;
        font-size: 12px !important;
        background: rgba(0,7,121,0.29);
        height: 35px;
    }

    .border {
        border: 1px solid gray;
    }

    .hidden-box {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        visibility: hidden;
    }

    .remove {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
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
