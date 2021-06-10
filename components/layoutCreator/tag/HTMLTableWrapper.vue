<template>
    <base-html-component
        :value="value"
        :key="value.uuid"
        @contentMouseOver="onContentMouseOver"
         @contentMouseOut="onContentMouseOut"
         @contentMouseClick="onContentMouseClickChild($event)"
         @borderMouseClick="onBorderMouseClickChild($event)"
         @tagRemove="onEmitRemoveChild($event)"
         @borderMouseOver="onBorderMouseOver"
         @borderMouseOut="onBorderMouseOut"
         @paddingMouseOver="onPaddingMouseOver"
         @paddingMouseOut="onPaddingMouseOut"
         @marginMouseOver="onMarginMouseOver"
         @marginMouseOut="onMarginMouseOut"
         @contentMouseDown="onContentMouseDownChild($event)"
         @borderMouseDown="onBorderMouseDownChild($event)"
         @paddingMouseDown="onPaddingMouseDownChild($event)"
         @marginMouseDown="onMarginMouseDownChild($event)"
    >
    <template slot="middle-content">
    
        <div class="absolute"  style="top: -35px; width: 100%; display: flex;">
            <template v-for="column in value.columns">
                <table-column-component
                        @contentMouseOver="onContentMouseOver"
                        @contentMouseOut="onContentMouseOut"
                        @contentMouseClick="onContentMouseClickChild($event)"
                        @contentMouseDown="onContentMouseDown(column, $event)"
                        @tagRemove="onEmitRemove(column)"
                        :canVisible="true"
                        :value="column"
                        :key="column.updateComponentKey"
                    />
                    
                
            </template>
        
        </div>

        <div class="absolute"  style="left: -45px;  flex-direction: column; display: flex;">
            <template v-for="row in value.rows">
                <table-row-component
                        @contentMouseOver="onContentMouseOver"
                        @contentMouseOut="onContentMouseOut"
                        @contentMouseClick="onContentMouseClickChild($event)"
                        @contentMouseDown="onContentMouseDown(row, $event)"
                        @tagRemove="onEmitRemove(row)"
                        :canVisible="true"
                        :value="row"
                        :key="row.updateComponentKey"
                    />
            </template>
        
        </div>

 

            <span class="absolute" style="top: -50px; display: none;">
                Width {{ value.height }}
                rowTotalS {{ value.tableRowCalculator.rowTotalSize }}
                columnTotal {{ value.tableColumnCalculator.calculated }}
                rowTotal {{ value.tableRowCalculator.calculated }}
            
            </span>

    </template>
        <template slot="bottom-content">
            <div class="resize-content" :style="resizeContentCss"  @mousedown.stop="onContentMouseDown(value, $event)">
                cols: {{ value.columns.length }}
                rows: {{ value.rows.length }}
            </div>

        </template>
    </base-html-component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HtmlTag from '~/src/Layout/HtmlTag';
import HtmlTagFactory from "~/src/Layout/HtmlTagFactory";
import HTMLELEditable from './HTMLELEditable.vue';
import BorderModelFactory from '~/src/Layout/Border/BorderModelFactory';
import BorderModel from '~/src/Layout/Border/BorderModel';
import LayoutEl from "../../../src/LayoutEl";
import PaddingModelFactory from "~/src/Layout/Padding/PaddingModelFactory";
import PaddingBottom from '../../../src/Layout/Padding/PaddingBottom';
import PaddingModel from "~/src/Layout/Padding/PaddingModel";
import MarginModel from "~/src/Layout/Margin/MarginModel";
import MarginModelFactory from '../../../src/Layout/Margin/MarginModelFactory';
import HtmlTagRecalculator from "~/src/Recalculator/HtmlTagRecalculator";
import BorderRecalculate from "~/src/Recalculator/HtmlTagImpl/BorderRecalculate";
import MarginRecalculate from "~/src/Recalculator/HtmlTagImpl/MarginRecalculate";
import { PositionCss } from "../../../src/Css";
import TableTag from "~/src/Layout/tag/Table/TableTag";
import TableColumnComponent from '~/components/layoutCreator/tag/table/TableColumnComponent.vue'
import TableRowComponent from '~/components/layoutCreator/tag/table/TableRowComponent.vue'
import BaseHTMLWrapper from "~/components/layoutCreator/tag/BaseHTMLWrapper.vue";

@Component({
    components: {
        TableColumnComponent,
        TableRowComponent
    }
})
export default class HTMLTableWrapper extends BaseHTMLWrapper {
    @Prop()
    value: TableTag



    public mounted()
    {
        // @ts-ignore
        this.borderRecalculator = new BorderRecalculate()
        // @ts-ignore
        this.marginRecalculator = new MarginRecalculate()
        // var htmlEl = window.document.getElementById(this.value.uuid)
        // this.value.htmlEl = htmlEl
        // return
        this.value.setHtmlElHidden(document.getElementById(this.value.shortUUID + '-hidden-box'))

        this.value.setHtmlEl(this.$el)

        // this.value.updateModelComponent()
        // this.value.updateModelComponent()


        // console.log('11@@@@@@@@@@@@@11');

        if (this.value instanceof HtmlTag)  {
            this.value.realPositionCalculator.reInitDefaultPosition()

            this.value.recalculateRealComputedProperties()

        }

        // @ts-ignore
        this.borderRecalculator.recalculate(this.value)
        // @ts-ignore
        this.marginRecalculator.recalculate(this.value)

        this.value.updateTableStructure()
        this.value.updateRealView()
        // this.value.updateRows()
        // this.value.updateColumns()
        // this.value.updateModelComponent()

    }

}
</script>

<style lang="scss">

</style>
