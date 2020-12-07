<template>

    <div class="stretch stretch__flex cursor-resize-to-left absolute padding-left"
         v-if="value != null"
        @mousedown.stop="onMouseDown($event)"
        @mouseover.stop="onMouseOver"
        @mouseout.stop="onMouseOut"
        :key="updateComponentKey"

    >
        <div class="stretch"
           >
           Row {{ index }}
            <span v-show="hasHeight">
                Height
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

    @Prop()
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

    onMouseOver(borderComponent) {
        borderComponent.$emit('tableRowMouseOver', this.value)

    }

    onMouseOut(borderComponent) {
        borderComponent.$emit('tableRowMouseOut', this.value)
    }

    public onMouseDown(borderComponent, ev: MouseEvent)
    {
        borderComponent.$emit('tableRowMouseDown', ev)
    }


    created() {
        this.heightManager = new HeightProperty()

        // this.contextMenuName = this.contextMenuName.concat(this.value.uuid)
        // console.log(this.value.styleList)
    }
}
</script>
