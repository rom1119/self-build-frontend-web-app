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
import HtmlTag from "~/src/Layout/HtmlTag";
import BorderRecalculate from "~/src/Recalculator/HtmlTagImpl/BorderRecalculate";
import MarginRecalculate from "~/src/Recalculator/HtmlTagImpl/MarginRecalculate";

@Component({
    components: {
        TableColumnComponent,
        TableRowComponent
    }
})
export default class HTMLTableCellWrapper extends BaseHTMLWrapper {

public mounted()
    {
        this.value.setLayoutMode(this.$layoutCreatorMode)

        this.borderRecalculator = new BorderRecalculate()
        this.marginRecalculator = new MarginRecalculate()
        // var htmlEl = window.document.getElementById(this.value.uuid)
        // this.value.htmlEl = htmlEl
        // return
        // console.log('CREA - COMP - BASE')
        // console.log(BaseMediaQueryComponent.accessorStatic)
        // console.log(this.$layoutCreatorMode)
        // console.log(document.getElementById(this.value.shortUUID + '-hidden-outsite-box'))
        // console.log('CREA - COMP - BASE END')

        this.runWithTimeoutrRandNumber((this) => {

            this.value.setHtmlEl(this.$el)
            this.value.setHtmlElHidden(document.getElementById(this.value.shortUUID + '-hidden-box'))
            this.value.setHtmlContentEl(document.getElementById(this.value.attrIdHtmlEl))
            this.value.setHtmlElOutsiteHidden(document.getElementById(this.value.shortUUID + '-hidden-outsite-box'))

            // this.value.updateModelComponent()

            if (this.value instanceof HtmlTag)  {
                this.value.realPositionCalculator.reInitDefaultPosition()

                this.value.recalculateRealComputedProperties()

            }

            this.borderRecalculator.recalculate(this.value)
            this.marginRecalculator.recalculate(this.value)

            this.value.updateRealView()

            this.$nextTick(() => {
                this.value.updateLastWidth()
                this.value.updateLastHeight()

            })

            // console.log('BEFORE CREATOR MODE SET');
            // console.log('AFTER CREATOR MODE SET');

            this.widthManager.init()
        })
        // this.value.updateModelComponent()

    }
}
</script>

<style lang="scss">

</style>
