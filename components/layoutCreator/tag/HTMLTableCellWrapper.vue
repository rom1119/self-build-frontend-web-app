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
            <span v-if="hasWidth">
                <!--<span v-if="value.isOverflowContent" style="background-color: red;" >
                    Width {{ value.getWidthValue() }}
                </span>
                <span v-else style="background-color: green;" >
                    Width {{ value.getWidthValue() }}
                </span>
                
                <span style="background:green;">
                    widthBoxCalc : {{ value.widthBoxCalc }}
                </span>
                <span v-if="value.columnElement" style="background:green;">
                     indexCol : {{ value.index }}
                </span>
                <span v-if="value.columnElement" style="background:green;">
                     contain Count : {{ value.containColumns.length }}
                </span>
                -->
            </span>
        </template>
        <template slot="top-content">
                
<!--            <div  class="wrapper__not-flex ">-->
                <!--            <p v-for="(col, key) in value.columns" :key="key" :index="key" :value="col" >{{ col.updateComponentKey }}</p>-->
                <table-column-component
                    @contentMouseOver="onContentMouseOver"
                    @contentMouseOut="onContentMouseOut"
                    @contentMouseClick="onContentMouseClickChild($event)"
                    @contentMouseDown="onContentMouseDown(value.columnElement, $event)"
                    @tagRemove="onEmitRemove(value.columnElement)"
                    v-if="value.rowIndex == 0"
                    v-show="value.getTable().toManage"
                    :value="value.columnElement"
                    :key="value.columnElement.updateComponentKey"
                />

            <table-row-component
                    @contentMouseOver="onContentMouseOver"
                    @contentMouseOut="onContentMouseOut"
                    @contentMouseClick="onContentMouseClickChild($event)"
                    @contentMouseDown="onContentMouseDown(value.rowElement, $event)"
                    @tagRemove="onEmitRemove(value.rowElement)"

                    :key="value.rowElement.updateComponentKey"

                    v-if="value.colIndex == 0"
                    v-show="value.getTable().toManage"
                    :value="value.rowElement" />

                <!--            <table-row-component v-for="(row, key) in value.rows" :key="key" :index="key" :value="row" />-->
<!--            </div>-->

        </template>
    </base-html-component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import TableColumnComponent from '~/components/layoutCreator/tag/table/TableColumnComponent.vue'
import TableRowComponent from '~/components/layoutCreator/tag/table/TableRowComponent.vue'
import BaseHTMLWrapper from "~/components/layoutCreator/tag/BaseHTMLWrapper.vue";
import BaseComputedPropertyManager from "~/components/computedPropertyManagers/BaseComputedPropertyManager";
import { Width } from "~/src/Css";
import WidthProperty from "~/components/computedPropertyManagers/impl/ComputedProperty/Content/WidthProperty";

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
