<template>

    <div class="stretch stretch__flex cursor-resize-to-left"
        @mousedown.stop="onMouseDown($event)"
        @mouseover.stop="onMouseOver"
        @mouseout.stop="onMouseOut"

    >
        <div class="stretch"
           >
            Col {{ index }}
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

    @Prop()
    index

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

    onMouseOver(borderComponent) {
        borderComponent.$emit('tableColumnMouseOver', this.value)

    }

    onMouseOut(borderComponent) {
        borderComponent.$emit('tableColumnMouseOut', this.value)
    }

    public onMouseDown(borderComponent, ev: MouseEvent)
    {
        borderComponent.$emit('tableColumnMouseDown', ev)
    }


    created() {
        this.widthManager = new WidthProperty()
        this.widthManager.setHtmlEl(this.value)


        // this.contextMenuName = this.contextMenuName.concat(this.value.uuid)
        // console.log(this.value.styleList)
    }
}
</script>
