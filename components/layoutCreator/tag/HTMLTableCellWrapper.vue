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
        <template slot="top-content">
<!--            <div  class="wrapper__not-flex ">-->
                <!--            <p v-for="(col, key) in value.columns" :key="key" :index="key" :value="col" >{{ col.updateComponentKey }}</p>-->
                <table-column-component
                    @contentMouseOver="onContentMouseOver"
                    @contentMouseOut="onContentMouseOut"
                    @contentMouseClick="onContentMouseClickChild($event)"
                    @contentMouseDown="onContentMouseDown(value.columnElement, $event)"
                    v-if="value.columnElement"
                    v-show="value.getTable().toManage"
                    :value="value.columnElement"
                    :key="value.columnElement.updateComponentKey"
                />

            <table-row-component
                    @contentMouseOver="onContentMouseOver"
                    @contentMouseOut="onContentMouseOut"
                    @contentMouseClick="onContentMouseClickChild($event)"
                    @contentMouseDown="onContentMouseDown(value.rowElement, $event)"
                    :key="value.rowElement.updateComponentKey"

                    v-if="value.rowElement"
                    v-show="value.getTable().toManage"
                    :value="value.rowElement" />

                <!--            <table-row-component v-for="(row, key) in value.rows" :key="key" :index="key" :value="row" />-->
<!--            </div>-->

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
export default class HTMLTableCellWrapper extends BaseHTMLWrapper {



}
</script>

<style lang="scss">

</style>
