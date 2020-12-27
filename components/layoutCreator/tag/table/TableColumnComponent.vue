<template>

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
        <div class="stretch"
           >

            </br>
            <span v-show="hasWidth">
                Width {{ value.getWidthValue() }}
            </span>
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

    // currentElement: BorderModel = null

    timeout = null
    mouseDown = false

    widthManager: BaseComputedPropertyManager<Width>

    contextMenuName = 'cm-border'
    // abstract getSize() : number

    get updateComponentKey() {
        if (!this.value) {
            return 0
        }

        return this.value.updateComponentKey
    }

    get hasWidth() {
        return  this.widthManager.getProperty().active
    }

    onMouseClick() {
        // console.log('CLICK')
        // console.log(this.value)

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
        this.widthManager.init()

    }


    created() {
        this.widthManager = new WidthProperty()
        this.widthManager.setHtmlEl(this.value)
        // console.log('COLUMN CREATED');

        // this.widthManager.init()
        // this.contextMenuName = this.contextMenuName.concat(this.value.uuid)
        // console.log(this.value.styleList)
    }
}
</script>

<style>
    .tab-column {
        z-index: 999;
        color: white;
        display: inline-block;
        font-size: 12px !important;
        background: rgba(0,7,121,0.49);
        height: 35px;
    }

    .border {
        border: 1px solid gray;
    }
</style>
