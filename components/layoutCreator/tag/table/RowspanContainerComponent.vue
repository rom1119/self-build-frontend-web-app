<template>

        <div class="rowspan-container"
            :style="value.cssList"
            :key="value.updateComponentKey"
            oncopy="return false"
            oncut="return false"
            onselectstart="return false"
        >
            <rowspan-item-component v-for="item in value.children" :value="item" :key="item.uuid" />
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
import RowspanContainer from '../../../../src/Layout/tag/Table/RowspanContainer';
import RowspanItemComponent from './RowspanItemComponent.vue';
import BaseHTMLWrapper from "../BaseHTMLWrapper.vue";

@Component({
    components: {
        RowspanItemComponent
    }
})export default class RowspanContainerComponent extends BaseHTMLWrapper {

    $refs: {

    }
    @Prop({required:true})
    value: RowspanContainer

    // currentElement: BorderModel = null

    timeout = null
    mouseDown = false

    widthManager: BaseComputedPropertyManager<Width>

    contextMenuName = 'cm-border'


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
        // this.value.setHtmlElOutsiteHidden(document.getElementById(this.idHiddenEl))

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
        visibility: visible !important;
    }
    .unvisible {
        visibility: hidden !important;
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
